import type { Request, Response } from "express";
import express from "express";
import fs from "fs/promises";
import path from "path";
import cors from "cors";
import { Project, SyntaxKind } from "ts-morph";
import type { PropertyAssignment, SourceFile } from "ts-morph";

const app = express();
const PORT = process.env.PORT || 6063;
const THEMES_REL_PATH = "../../packages/styles/themes";

app.use(cors({ origin: "http://localhost:6060", methods: ["GET", "POST"], credentials: true }));
app.use(express.json());

// Retrieve the list of color themes from colors.ts
const getColorThemes = async (): Promise<string[]> => {
  const colorsPath = path.join(__dirname, THEMES_REL_PATH, "colors.ts");
  const colorsContent = await fs.readFile(colorsPath, "utf-8");
  const themeNames = colorsContent
    .split("\n")
    .filter((line) => line.includes("export { default as "))
    .map((line) => line.match(/export { default as (\w+) }/)?.[1])
    .filter((name): name is string => !!name);
  return themeNames;
};

type ThemeData = Record<string, string | Record<string, string>>;

// Extract theme data from file content
const extractThemeData = (fileContent: string): ThemeData | null => {
  const match = fileContent.match(/export\s+default\s+\{([\s\S]*)/);
  if (!match) return null;
  const objectBody = match[1]
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("..."));
  try {
    const parseObject = (lines: string[]): ThemeData => {
      const result: ThemeData = {};
      let currentKey = "";
      for (const line of lines) {
        if (line.includes(":") && !line.includes("{")) {
          const [key, value] = line.split(":").map((part) => part.trim().replace(/,$/, ""));
          const cleanedValue = value.split("//")[0].trim().replace(/^['"]|['"]$/g, "").replace("',", "");
          if (currentKey) {
            (result[currentKey] as Record<string, string>)[key] = cleanedValue;
          } else {
            result[key] = cleanedValue;
          }
        } else if (line.includes(":") && line.includes("{")) {
          currentKey = line.split(":")[0].trim();
          result[currentKey] = {};
        } else if (line.includes("}")) {
          currentKey = "";
        }
      }
      return result;
    };
    return parseObject(objectBody);
  } catch (error) {
    console.error("Failed to parse theme object:", error);
    return null;
  }
};

// Load all themes and shared sections
const loadThemeFiles = async () => {
  const themes: Record<string, ThemeData> = {};

  // Load color themes into "colors"
  const colorThemeNames = await getColorThemes();
  themes["colors"] = {};
  for (const themeName of colorThemeNames) {
    const themeFile = `${themeName}.ts`;
    const themePath = path.join(__dirname, THEMES_REL_PATH, themeFile);
    try {
      const fileContent = await fs.readFile(themePath, "utf-8");
      const themeData = extractThemeData(fileContent);
      if (themeData) {
        const colors = themes["colors"] as Record<string, ThemeData>;
        colors[themeName] = themeData;
      }
    } catch (err) {
      console.error(`Error loading theme file: ${themeFile}`, err);
    }
  }

  // Load shared sections
  const sharedFiles = ["offsets.ts", "border.ts", "elements.ts", "font.ts", "zIndexes.ts"];
  for (const file of sharedFiles) {
    const filePath = path.join(__dirname, THEMES_REL_PATH, file);
    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      const data = extractThemeData(fileContent);
      if (data) {
        const sectionName = path.basename(file, ".ts");
        themes[sectionName] = data;
      }
    } catch (err) {
      console.error(`Error loading shared file: ${file}`, err);
    }
  }

  return themes;
};

// Update theme file
async function updateThemeFile(filePath: string, updates: Record<string, unknown>) {
  try {
    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(filePath);
    const applyUpdates = (updatesMap: Record<string, unknown>, parentPath = "") => {
      for (const [key, value] of Object.entries(updatesMap)) {
        const currentPath = parentPath ? `${parentPath}.${key}` : key;
        if (typeof value === "object" && value !== null) {
          applyUpdates(value as Record<string, unknown>, currentPath);
        } else {
          const pathSegments = currentPath.split(".");
          let currentNode: PropertyAssignment | SourceFile | undefined = sourceFile;
          for (const segment of pathSegments) {
            if (!currentNode) break;
            // ts-morph types are complex for traversal but valid at runtime
            currentNode = currentNode
              .getDescendantsOfKind(SyntaxKind.PropertyAssignment)
              .find((node: PropertyAssignment) => node.getName() === segment);
          }
          if (currentNode && 'setInitializer' in currentNode && typeof currentNode.setInitializer === "function") {
            const valStr = String(value);
            const shouldQuote =
              typeof value === "string" && !/^\d+(\.\d+)?$/.test(valStr) && !valStr.includes("basicOffset");
            const newValue = shouldQuote ? `'${valStr}'` : valStr;
            currentNode.setInitializer(newValue);
          }
        }
      }
    };
    applyUpdates(updates);
    await fs.writeFile(filePath, sourceFile.getFullText(), "utf-8");
  } catch (error) {
    console.error(`Failed to update ${filePath}:`, error);
    throw error;
  }
}

// GET request to retrieve themes
app.get("/themes", async (req: Request, res: Response) => {
  try {
    const themes = await loadThemeFiles();
    res.json(themes);
  } catch (error) {
    console.error("Error loading themes:", error);
    res.status(500).json({ error: "Failed to load themes" });
  }
});

// POST request to update themes
app.post("/themes", async (req: Request, res: Response) => {
  const updatedData = req.body as Record<string, Record<string, unknown>>;
  try {
    for (const [section, updates] of Object.entries(updatedData)) {
      if (section === "colors") {
        for (const [themeName, themeUpdates] of Object.entries(updates as Record<string, unknown>)) {
          const themeFile = `${themeName}.ts`;
          const themePath = path.join(__dirname, THEMES_REL_PATH, themeFile);
          await updateThemeFile(themePath, themeUpdates as Record<string, unknown>);
        }
      } else {
        const sectionFile = `${section}.ts`;
        const sectionPath = path.join(__dirname, THEMES_REL_PATH, sectionFile);
        await updateThemeFile(sectionPath, updates);
      }
    }
    res.send("Themes updated successfully");
  } catch (error) {
    res.status(500).json({ error: "Failed to update themes" });
  }
});

// POST request to create a new theme
app.post("/themes/new", async (req: Request, res: Response) => {
  const { name: nameToParse, data } = req.body as { name: string, data: Record<string, string> };
  if (!nameToParse || !data) {
    return res.status(400).json({ error: "Theme name and data are required" });
  }
  const name = nameToParse
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "");

  const newThemeFile = `${name}.ts`;
  const newThemePath = path.join(__dirname, THEMES_REL_PATH, newThemeFile);
  const indexPath = path.join(__dirname, THEMES_REL_PATH, "colors.ts");

  try {
    // Include the theme name in the exported object
    const themeContent = `export default {\n  theme: '${name}',\n${Object.entries(data)
      .map(([key, value]) => `  ${key}: '${value}',`)
      .join("\n")}\n};\n`;
    await fs.writeFile(newThemePath, themeContent, "utf-8");

    let indexContent = await fs.readFile(indexPath, "utf-8");
    if (!indexContent.includes(`export { default as ${name} } from './${name}'; `)) {
      indexContent += `export { default as ${name} } from './${name}'; \n`;
      await fs.writeFile(indexPath, indexContent, "utf-8");
    }

    res.send("New theme successfully created");
  } catch (error) {
    console.error("Error creating new theme:", error);
    res.status(500).json({ error: "Error during theme creation" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
