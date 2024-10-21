import Head from 'next/head'
import { Link, WideImage } from '@md/components/next'
import { Paper, PaperContainer, PaperTexture } from '@md/components/textures';
import { Form, Header, Input, Section, Select, TextContainer } from '@md/components'
import { useState } from 'react'
import { TStepCoordinate } from '@/components/footstep'
import { PageTitle, PlainText } from '@md/components'
import { Loading } from '@md/components'

// Starts from center
const steps: TStepCoordinate[] = [];
let imagesLoadedCount = 0;

export default function Home() {
  // LOADING
  const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(false);
  const [isAllImagesLoaded, setIsAllImagesLoaded] = useState(false);

  const handleImageLoaded = () => {
    imagesLoadedCount++;
    if (imagesLoadedCount >= 3) {
      setIsAllImagesLoaded(true);
    }
  }

  const handleFirstImageLoaded = () => {
    setIsFirstImageLoaded(true);
  }

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
          <Header $zIndex='alert'>
            <Link href={'/blog'}>Blog</Link>
          </Header>

          {/* Page 1 With Big Picture */}
          <Section $sectionSize='full' $direction='vertical'>
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

          {/* Page 2, About US */}
          {isAllImagesLoaded && (
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
                <Form onSubmit={console.log}>
                  <Input name='Test' />
                  <Select name='numbers' id='1' value='1' options={[{ value: "1", text: 'One 1' }, { value: "2", text: 'Two 2' }]} />
                </Form>
              </TextContainer>
            </Section>
          )}
        </PaperContainer>
      </main>
    </>
  )
}
