// layout.jsx
import { Paper, PaperContainer, PaperTexture } from '@md/components/textures';
import { Metadata } from 'next';
import StyledComponentsRegistry from './StyledComponentsRegistry';

export const metadata: Metadata = {
    title: 'My Page Title',
};

export default function RootLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body>
                <StyledComponentsRegistry>
                    <PaperContainer>
                        <PaperTexture />
                        <Paper />
                        {children}
                    </PaperContainer>
                </StyledComponentsRegistry>
            </body>
        </html>
    );
}
