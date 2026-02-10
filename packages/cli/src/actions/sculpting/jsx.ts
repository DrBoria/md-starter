import { SourceFile, SyntaxKind, JsxOpeningElement, JsxSelfClosingElement, Node } from 'ts-morph';

export function removeJsxElements(sourceFile: SourceFile, tagNames: string[]) {
    if (tagNames.length === 0) return;

    const nodesToRemove: Node[] = [];

    sourceFile.forEachDescendant(node => {
        if (node.getKind() === SyntaxKind.JsxSelfClosingElement) {
            const el = node as JsxSelfClosingElement;
            const tagName = el.getTagNameNode().getText();
            if (tagNames.includes(tagName)) {
                nodesToRemove.push(node);
            }
        } else if (node.getKind() === SyntaxKind.JsxElement) {
            const el = node as JsxSelfClosingElement;
            const opening = (el as unknown as { getOpeningElement(): JsxOpeningElement }).getOpeningElement();
            if (opening && tagNames.includes(opening.getTagNameNode().getText())) {
                nodesToRemove.push(node);
            }
        }
    });

    nodesToRemove.sort((a, b) => b.getStart() - a.getStart());

    for (const node of nodesToRemove) {
        try {
            if (!node.wasForgotten()) {
                node.replaceWithText('null');
            }
        } catch {
            // Node already removed by parent removal
        }
    }
}
