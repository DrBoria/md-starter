import React, { useState } from 'react';
import { View, Image, ScrollView } from 'react-native';
import styled from 'styled-components/native';
import { useQueryListItem } from '@md/api/graphql'; // Import your hook here
import { useRoute } from '@react-navigation/native'; // Import useRoute for accessing route parameters
import { PaperContainer, PaperTexture, Paper } from '@md/components/textures'; // Adjust accordingly

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

const ContentView = styled(View)`
  padding: 20px;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
`;

const TextContent = styled.Text`
  font-size: 16px;
`;

export default function PostPage() {
    const route = useRoute(); // Get route object
    const postId = route.params.id; // Get the ID from the route parameters

    const { data, loading } = useQueryListItem({
        listName: "Post",
        selectedFields: 'id name textContent', // Adjust fields as needed
        itemId: postId,
    });

    const [isImageLoaded, setIsImageLoaded] = useState(false);

    const handleImageLoaded = () => {
        setIsImageLoaded(true);
    };

    return (
        <Container>
            <PaperTexture />
            <Paper />
            <ContentContainer>
                <StyledImage
                    source={{ uri: "/main/background-clear-blur.jpg" }}
                    onLoad={handleImageLoaded}
                />
                {!loading && data?.post && (
                    <ContentView>
                        <Title>{data.post.name}</Title>
                        <TextContent>{data.post.textContent}</TextContent>
                    </ContentView>
                )}
            </ContentContainer>
        </Container>
    );
}
