import React, { useState } from "react";
import { Button } from "./index";
import { useToasts } from "@md/components/default/feedback/Toasts";

interface CopyButtonProps {
    value: string;
    listName?: string;
    size?: "small" | "medium" | "large" | "icon";
}

export const CopyButton: React.FC<CopyButtonProps> = ({ value, listName, size = "small" }) => {
    const { add } = useToasts();
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(value);
            add({ title: "Copied!", description: `Copied ${listName || value} to clipboard` });
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            add({ title: "Error", description: "Failed to copy", tone: "negative" });
        }
    };

    return (
        <Button
            size={size}
            icon={copied ? "Check" : "Copy"}
            onClick={handleCopy}
            tone="passive"
            weight="none"
        />
    );
};
