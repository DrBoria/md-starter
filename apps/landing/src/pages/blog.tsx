import Head from 'next/head'
import { WideImage } from '@md/components/next'
import { Paper, PaperContainer, PaperTexture } from '@md/components/textures';
import { Card, Section } from '@md/components'
import { useState } from 'react'
import { TStepCoordinate } from '@/components/footstep'
import { PageTitle, PlainText } from '@md/components'
import { Loading } from '@md/components'
import Link from 'next/link'

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
                                <Card title='Card Name 1' />
                                <Card title='Card Name 2' />
                            </>)}

                        <Loading hidden={isAllImagesLoaded} />
                    </Section>
                </PaperContainer>
            </main>
        </>
    )
}
