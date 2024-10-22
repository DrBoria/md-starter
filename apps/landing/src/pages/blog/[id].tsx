import Head from 'next/head';
import { WideImage } from '@md/components/next';
import { Paper, PaperContainer, PaperTexture } from '@md/components/textures';
import { useQueryListItem } from '@md/api/graphql'; // Import your hook here
import { useRouter } from 'next/router'; // Import useRouter
import { useState } from 'react';
import type { Lists } from '@md/types';

export default function PostPage() {
    const router = useRouter(); // Initialize the router

    // Fetch the specific post based on the ID from the URL
    const { data, loading } = useQueryListItem<{ post: Lists.Post.Item }>({
        listName: "Post",
        selectedFields: 'id name textContent', // Adjust fields as needed
        itemId: router.query.id as string, // Get the ID from the URL
    });

    // LOADING STATE
    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleImageLoaded = () => {
        setIsImageLoaded(true);
    };
    console.log(data);
    return (
        <>
            <Head>
                <title>{loading ? "Loading..." : data?.post?.name}</title>
                <meta name="description" content="Official Empire of Games portal" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <main>
                <PaperContainer>
                    {/* PAPER */}
                    <PaperTexture />
                    <Paper />

                    {/* Render a background image or any static content here */}
                    <WideImage
                        src="/main/background-clear-blur.jpg"
                        alt="Post Background"
                        width={2040}
                        height={1152}
                        hidden={isImageLoaded} // Hide until loaded
                        onLoad={handleImageLoaded}
                        priority
                        blured
                    />

                    {/* Check loading state and data availability */}
                    {
                        data?.post && (
                            <div>
                                <h1>{data.post.name}</h1>
                                <div dangerouslySetInnerHTML={{ __html: data.post.textContent }} />
                            </div>
                        )
                    }
                </PaperContainer>
            </main>
        </>
    );
}
