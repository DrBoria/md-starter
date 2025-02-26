import { Paper, PaperContainer, PaperTexture } from '@md/components/textures';
import { Metadata } from 'next';
import StyledThemeProvider from './StyledThemeProvider';

export const metadata: Metadata = {
    title: 'My Page Title',
};

export default function RootLayout({
    // Layouts must accept a children prop.
    // This will be populated with nested layouts or pages
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body>
                <StyledThemeProvider>
                    <PaperContainer>
                        {/* PAPER */}
                        <PaperTexture />
                        <Paper />
                        {children}
                    </PaperContainer>
                </StyledThemeProvider>
            </body>
        </html>
    )
}
