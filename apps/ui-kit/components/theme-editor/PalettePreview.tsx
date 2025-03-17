import React from 'react';
import { BasicSection, Button, SectionTitle, SubTitle, Switch, Tabs, TokenInputField } from "@md/components";

const PalettePreview: React.FC<{ palette: any }> = ({ palette }) => (
    <BasicSection>
        <SectionTitle>Preview</SectionTitle>
        <Tabs
            tabs={[
                {
                    label: 'Buttons',
                    content: (
                        <>
                            <SubTitle $offsetBottom>Sub Title</SubTitle>
                            <Button text="Positive" tone="positive" />
                            <Button text="Warning" tone="warning" />
                            <Button text="Negative" tone="negative" />
                        </>
                    ),
                },
                {
                    label: 'Form Elements',
                    content: (
                        <>
                            <TokenInputField
                                field={{ label: 'API Token', path: 'apiToken', description: 'Enter your API Token' }}
                                value="secret-token-123"
                                onChange={(value) => console.log('Token changed:', value)}
                            />
                            <Switch
                                checked={false}
                                onChange={(checked) => console.log('Switch toggled:', checked)}
                            />
                        </>
                    ),
                },
            ]}
        />
    </BasicSection>
);

export { PalettePreview };
