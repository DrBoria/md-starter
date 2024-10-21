import Head from 'next/head'
import { WideImage } from '@md/components/next'
import { ICloudProps, Paper, PaperContainer, PaperTexture } from '@md/components/textures';
import { Section, TextContainer } from '@md/components'
import { useEffect, useRef, useState } from 'react'
import { CoordinatesGenerator, Footstep, TStepCoordinate } from '@/components/footstep'
import { debounce, useIsMobile } from '@md/utils'
import {Carousel, PageTitle, PlainText } from '@md/components'
import { Loading } from '@md/components'
import Link from 'next/link'

const listOfClouds: ICloudProps[] = [
  // isinitial Clouds
  { size: 'small', position: ['top', 'right'], $isinitial: true },
  { size: 'small', position: ['top'], $isinitial: true },
  { size: 'big', position: ['bottom'], $isinitial: true },

  // Infinitie Clouds
  { size: 'big', position: ['top', 'right'] },
  { size: 'small', position: ['top'] },
  { size: 'big', position: ['bottom'] },
];

// Starts from center
const steps: TStepCoordinate[] = [];
let imagesLoadedCount = 0;

export default function Home() {
  // LOADING
  const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(false);
  const [isAllImagesLoaded, setIsAllImagesLoaded] = useState(false);
  const isMobile = useIsMobile();

  const handleImageLoaded = () => {
    imagesLoadedCount++;
    if (imagesLoadedCount >= 3) {
      setIsAllImagesLoaded(true);
    }
  }

  const handleFirstImageLoaded = () => {
    setIsFirstImageLoaded(true);
  }

  // STEPS AND OTHERS
  let scrollPosition = 0;
  const layer1Ref = useRef<(HTMLDivElement | null)[]>([]);
  const layer3Ref = useRef<(HTMLDivElement | null)[]>([]);
  const [currentItems, setCurrentItems] = useState<TStepCoordinate[]>([]);
  const [isBigScreen, setIsBigScreen] = useState(false);

  useEffect(() => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    const isBigScreenLocal = width > 1900;
    const stepWidth = isBigScreenLocal ? 64 : 32;
    const turnHeight = isBigScreenLocal ? 310 : 155;
    const turnWidth = isBigScreenLocal ? 310 : 155;
    const smallScreenCorrection = width / 2 < turnWidth * 2 - stepWidth ? stepWidth * 2 : 0;

    setIsBigScreen(isBigScreenLocal);
    
    if (!currentItems.length && isMobile !== null) {
      const firstPage = new CoordinatesGenerator([
        { id: 1, x: 0, y: 0, r: 0 },
        { id: 2, x: 0, y: 0.75, r: 0 }
      ], isBigScreenLocal, 'down')
        .down(Math.ceil(height * 0.1))
        .turnRight()                                                                                                              // ↲
        .left(isMobile ? Math.ceil(width * 0.5 - turnWidth * 2 + stepWidth * 2 + smallScreenCorrection) : Math.ceil(width * 0.4 - turnWidth * 2))                         // ←
        .turnLeft()                                                           // ⬐
        .down(Math.ceil(height * 0.65 - turnHeight * 2 - stepWidth))          // ↓ 
        .turnLeft()                                                           // ↳
        .right(isMobile ? Math.ceil(width - turnWidth * 2  + stepWidth * 2 + smallScreenCorrection) : Math.ceil(width * 0.6 - turnWidth * 2))                       // →
        .getCoordinates();

      const secondPage = new CoordinatesGenerator([
        firstPage[firstPage.length - 2],
        firstPage[firstPage.length - 1],
      ], isBigScreenLocal, 'right')
        .turnRight()                                                          // ⬎
        .down(Math.ceil(height * 0.75 - turnHeight * 2 + stepWidth * 2))      // ↓
        .turnRight()                                                          // ↲
        .left(isMobile ? Math.ceil(width - turnWidth * 2  + stepWidth * 2 + smallScreenCorrection) : Math.ceil(width * 0.4 - turnWidth * 2 + stepWidth * 2))         // ← - turnHeight
        .getCoordinates().slice(2);  // remove first 2, cause they are duplicates of previous page

      const thirdPage = new CoordinatesGenerator([
        secondPage[secondPage.length - 2],
        secondPage[secondPage.length - 1],
      ], isBigScreenLocal, 'left')
        .turnLeft()                                                            // ⬐
        .down(Math.ceil(height * 0.75 - turnHeight * 2 + stepWidth * 4))       // ↓    
        .turnLeft()                                                            // ↳
        .right(isMobile ? Math.ceil(width * 0.5 - turnWidth * 2  + stepWidth * 2 + smallScreenCorrection) : Math.ceil(width * 0.4 - turnWidth * 2 + stepWidth * 2))         // →
        .getCoordinates().slice(2);  // remove first 2, cause they are duplicates of previous page

      const fourthPage = new CoordinatesGenerator([
        thirdPage[thirdPage.length - 2],
        thirdPage[thirdPage.length - 1],
      ], isBigScreenLocal, 'right')
        .turnRight()                                                 // ⬎
        .down(Math.ceil(height * 0.375 - turnHeight * 2 + stepWidth * 4))               // ↓    
        .getCoordinates().slice(2);  // remove first 2, cause they are duplicates of previous page

      steps.push(...firstPage, ...secondPage, ...thirdPage, ...fourthPage);
    }

    let lastMouseEvent: any = null;
    // to be used for animation purposes
    const updateAnimation = () => {
      if (lastMouseEvent) {
        mouseParallax(lastMouseEvent);
        lastMouseEvent = null;
      }
      requestAnimationFrame(updateAnimation);
    };

    requestAnimationFrame(updateAnimation);

    const mouseMoveHandler = (event: MouseEvent) => {
      lastMouseEvent = event;
    };

    // Virtual map of elements to render
    let displayedElements: TStepCoordinate[] = [];
    const timeoutsAdd: any[] = [];
    const timeoutsRemove: any[] = [];

    const handleScroll = debounce(() => {
      const position = window.pageYOffset;
      const ammountOfPages = 5; // behaviour is better when 4 pages + 1 to display steps in the middle of the page

      // second level of debounce
      if (Math.abs(position - scrollPosition) < 50) return;

      // on scroll down
      if (scrollPosition < position) {
        const expectedRenderCount = Math.min(Math.ceil((position - 250) * steps.length / ammountOfPages / height) * 2, steps.length);
        const elementsToAdd = steps.slice(displayedElements.length, expectedRenderCount);

        if (elementsToAdd.length) {
          // fix of bug with random applying elements to array
          timeoutsAdd.forEach(timeout => clearTimeout(timeout));
          timeoutsRemove.forEach(timeout => clearTimeout(timeout));

          timeoutsAdd.length = 0;
          timeoutsRemove.length = 0;
        }

        elementsToAdd.forEach((element, index) => {
          timeoutsAdd.push(setTimeout(() => {
            displayedElements = [...displayedElements, element];
            setCurrentItems(displayedElements);
          }, 50 * index));
        });

        // on scroll up
      } else {
        const expectedRenderCount = Math.min(Math.ceil(steps.length * (position - 500) / ammountOfPages / height), steps.length);
        const elementsToRemoveCount = displayedElements.length - expectedRenderCount;

        if (elementsToRemoveCount > 0) {
          // fix of bug with random applying elements to array
          timeoutsAdd.forEach(timeout => clearTimeout(timeout));
          timeoutsRemove.forEach(timeout => clearTimeout(timeout));

          timeoutsAdd.length = 0;
          timeoutsRemove.length = 0;
        }

        for (let i = 0; i < elementsToRemoveCount; i++) {
          timeoutsRemove.push(setTimeout(() => {
            displayedElements = displayedElements.slice(0, displayedElements.length - 1);
            setCurrentItems(displayedElements);
          }, 50 * i));
        }
      }

      // Update scroll position value
      scrollPosition = position;
    }, 50);

    document.addEventListener('mousemove', mouseMoveHandler);
    document.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      document.removeEventListener('mousemove', mouseMoveHandler);
      window.removeEventListener('scroll', handleScroll);
    };
  }, [isMobile]);

  const mouseParallax = (event: MouseEvent) => {
    const cursorX = event.clientX;
    const cursorY = event.clientY;

    const layers = [...layer1Ref.current, ...layer3Ref.current];

    layers.forEach((layer, index) => {
      const depthXY = 0.1 * (index * 4 + 1);
      const offsetX = ((cursorX * depthXY) / 8);
      const offsetY = ((cursorY * depthXY) / 8);
      if (layer?.style) {
        layer.style.transform = `translate(calc(-52% + ${offsetX}px), calc(-55% + ${offsetY}px))`;
      }
    });
  };

  return (
    <>
      <Head>
        <title>Empire of Games</title>
        <meta name="description" content="Official Empire of Games portal" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <PaperContainer>
          {/* PAPER */}
          <PaperTexture />
          <Paper />

          {/* Page 1 With Big Picture */}
          <Section $sectionSize='full' $direction='vertical'>
            {/* {listOfClouds.map((cloudProps, index: number) => (
                <Cloud
                  key={index}
                  size={cloudProps.size}
                  position={cloudProps.position}
                  $isinitial={cloudProps.$isinitial}
                />
              ))} */}

            <WideImage
              src="/main/background-clear-blur.jpg"
              alt="Next.js Logo"
              width={2040}
              height={1152}
              hidden={isAllImagesLoaded}
              onLoad={handleFirstImageLoaded}
              priority
              blured
            />

            {isFirstImageLoaded && (
              <>
                <WideImage
                  src="/main/background-clear.jpg"
                  alt="Mountains and sea on background"
                  width={2040}
                  height={1152}
                  hidden={!isAllImagesLoaded}
                  onLoad={handleImageLoaded}
                  layer='back'
                />

                <WideImage
                  src="/main/monster.png"
                  alt="Ouruboros"
                  width={2040}
                  height={1152}
                  alignment='center'
                  hidden={!isAllImagesLoaded}
                  onLoad={handleImageLoaded}
                  zIndex='content'
                />

                <WideImage
                  src="/main/man.png"
                  alt="Hero in rocks"
                  width={2040}
                  height={1152}
                  hidden={!isAllImagesLoaded}
                  onLoad={handleImageLoaded}
                  zIndex='alert'
                  layer='front'
                />
              </>)}

            <Loading hidden={isAllImagesLoaded} />
          </Section>

          {isAllImagesLoaded && (
            <>
              {/* FOOTSTEPS */}
              <Section $sectionSize='footsteps' $direction='vertical'>
                {
                  currentItems.map((coordinates, index) => (
                    <Footstep $isBigScreen={isBigScreen} data-id={coordinates.id} key={coordinates.id} $x={coordinates.x} $y={coordinates.y} $r={coordinates.r} $direction={index % 2 === 0 ? 'right' : 'left'} />
                  ))
                }
              </Section>

              {/* Page 2, About US */}
              <Section $sectionSize='medium' $direction='vertical' style={{ paddingTop: 'calc(155px + 12%)' }}>
                <WideImage
                  src="/main/rock-flip.png"
                  alt="flipped rocks"
                  width={2040}
                  height={1152}
                  priority
                  zIndex='content'
                  alignment='top'
                />
                <TextContainer>
                  <PageTitle offsetBottom>About Us</PageTitle>
                  <PlainText offsetBottom>Empire of Games is union of players who want to play games just for fun, rather then stats or earning money</PlainText>
                  <PlainText>Join us if you are looking for friends and fun!</PlainText>
                </TextContainer>
              </Section>

              {/* Page 3, Games we Play */}
              <Section $sectionSize='medium' $direction='vertical'>
                <Carousel slides={[
                  { title: 'Our Games', text: 'Here is a list of games, that we are playing in. \n Follow the link to join our commynity', url: '/games-we-play/we-are-playing.png' }, 
                  { title: 'Diablo 4', text: <>Our <Link href='https://discord.gg/NbUTkkUQyf'>discord</Link> community</>, url: '/games-we-play/diablo.png' }, 
                  { title: 'Tribes of Midgard', text: <>Our <Link href='https://discord.gg/NbUTkkUQyf'>discord</Link> community</>, url: '/games-we-play/tribes-of-midgard.png' }]} 
                  />
              </Section>

              {/* Page 4, Recomendations */}
              <Section $sectionSize='medium' $direction='vertical'>
                <Carousel reversed slides={[{ title: 'Recommendations', text: 'Here will be our youtube channel with recomendations, streams and so on... \n For now, just look at happy minotaur', url: '/recommends.png' }]} />
              </Section>

              {/* Page 5, Waiting For */}
              <Section $sectionSize='medium' $direction='vertical'>
                <WideImage
                  src="/main/rock-flip.png"
                  alt="flipped rocks"
                  width={2040}
                  height={1152}
                  priority
                  zIndex='animatedElements'
                  alignment='bottom'
                />
                <div style={{ height: '75%' }}>
                  <Carousel slides={[
                    { title: 'We are waiting', text: 'Here is a list of games that we are waiting for. \n If you want to play together join our community \n and let\'s wait together', url: '/waiting/waiting.png' }, 
                    { title: 'Last Epoch', text: <>Here is a steam <Link href='https://store.steampowered.com/app/899770/Last_Epoch/'>link</Link> <br/> Estimated release date is February 21, 2024</> , url: '/waiting/last-epoch.png' },
                    { title: 'Corepunk', text: <>Official <Link href='https://corepunk.com/'>site</Link> <br/> Estimated release date unknown <br/> But <Link href='https://www.releases.com/p/corepunk/-/us'>here</Link> you can check all news about future betas, releases </> , url: '/waiting/corepunk.png' },
                    { title: 'Tarisland', text: <>Official <Link href='https://tarisglobal.com/'>site</Link> <br/> Estimated release date Q1 2024 <br/> But <Link href='https://www.releases.com/p/tarisland/-/us'>here</Link> you can check all news about future betas, releases </> , url: '/waiting/tarisland.png' },
                    { title: 'Throne and Liberty', text: <>Steam <Link href='https://store.steampowered.com/app/2429640/THRONE_AND_LIBERTY//'>link</Link> <br/> Estimated release 2024 <br/> But <Link href='https://www.releases.com/p/throne-and-liberty/-/us'>here</Link> you can check all news about future betas, releases </> , url: '/waiting/throne.png' },
                  ]}
                  />
                </div>
              </Section>
            </>
          )}
        </PaperContainer>
      </main>
    </>
  )
}
