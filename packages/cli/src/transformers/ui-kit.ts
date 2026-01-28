import { Project, SyntaxKind } from "ts-morph";

export async function pruneUiKitConfig(
    configPath: string,
    selectedPackages: string[]
) {
    const project = new Project({
        skipAddingFilesFromTsConfig: true
    });
    const sourceFile = project.addSourceFileAtPath(configPath);

    // 1. Find `sections` variable
    const sectionsVar = sourceFile.getVariableDeclaration("sections");
    if (!sectionsVar) return; // Should warn?

    const arrayLiteral = sectionsVar.getInitializerIfKind(SyntaxKind.ArrayLiteralExpression);
    if (!arrayLiteral) return;

    // 2. Iterate elements
    const elements = arrayLiteral.getElements();

    // Iterate backwards to safely remove
    for (let i = elements.length - 1; i >= 0; i--) {
        const element = elements[i];
        if (element.getKind() !== SyntaxKind.ObjectLiteralExpression) continue;

        const obj = element.asKind(SyntaxKind.ObjectLiteralExpression);
        const nameProp = obj?.getProperty("name");

        if (nameProp && nameProp.getKind() === SyntaxKind.PropertyAssignment) {
            // Get 'name' value: "@md/components/keystone"
            const nameValue = nameProp.asKind(SyntaxKind.PropertyAssignment)
                ?.getInitializerIfKind(SyntaxKind.StringLiteral)
                ?.getLiteralValue();

            if (!nameValue) continue;

            // Logic:
            if (nameValue.startsWith("@md/")) {
                // Check if selected
                const isSelected = selectedPackages.some(pkg => nameValue.includes(pkg));

                // Always keep @md/components (default) if not explicitly deselected (or we assume it's core)
                // User logic: "if not selected AND not default" -> remove
                if (!isSelected && nameValue !== "@md/components") {
                    arrayLiteral.removeElement(i);
                }
            }
        }
    }

    await sourceFile.save();
}
