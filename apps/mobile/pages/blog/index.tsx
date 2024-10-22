import React, { useState } from 'react';
import { ScrollView, Image } from 'react-native';
import styled from 'styled-components/native';
import { useQueryList } from '@md/api/graphql'; // Adjust the import according to your setup
import { Card } from '@md/components'; // Ensure Card is a React Native component
import { PaperContainer, PaperTexture, Paper } from '@md/components/textures'; // Adjust acc    ordingly

const Container = styled(PaperContainer)`
  flex: 1;
  align-items: center;
`;

const StyledImage = styled(Image)`
  width: 100%;
  height: 200px; // Adjust height as needed
`;

const ContentContainer = styled(ScrollView)`
  flex-grow: 1;
  align-items: center;
`;

export default function Home() {
    const [isFirstImageLoaded, setIsFirstImageLoaded] = useState(false);
    const [isAllImagesLoaded, setIsAllImagesLoaded] = useState(false);

    const { data, loading } = useQueryList({
        listName: "Post",
        selectedFields: 'id name',
    });

    const handleImageLoaded = () => {
        if (++imagesLoadedCount >= 3) {
            setIsAllImagesLoaded(true);
        }
    };

    const handleFirstImageLoaded = () => {
        setIsFirstImageLoaded(true);
    };

    return (
        <Container>
            <PaperTexture />
            <Paper />
            <ContentContainer>
                <StyledImage
                    source={{ uri: "/main/background-clear-blur.jpg" }}
                    onLoad={handleFirstImageLoaded}
                    onLoadEnd={handleImageLoaded}
                />
                {isFirstImageLoaded && data?.items.map((item) => (
                    <Card
                        key={item.id}
                        title={item.name}
                        description="A short description goes here." // Replace with actual description if available
                        link={`/blog/${item.id}`}
                    />
                ))}
            </ContentContainer>
        </Container>
    );
}
