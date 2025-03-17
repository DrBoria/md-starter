import express, { Request, Response } from "express";
import fs from "fs/promises";
import path from "path";
import cors from "cors";
import { Project, SyntaxKind } from "ts-morph";

const app = express();
const PORT = process.env.PORT || 6061;
const themesPath = "../../packages/styles/themes";

app.use(cors({ origin: "http://localhost:6060", methods: ["GET", "POST"], credentials: true }));
app.use(express.json());

// Получение списка цветовых тем из colors.ts
const getColorThemes = async (): Promise<string[]> => {
  const colorsPath = path.join(__dirname, themesPath, "colors.ts");
  const colorsContent = await fs.readFile(colorsPath, "utf-8");
  const themeNames = colorsContent
    .split("\n")
    .filter((line) => line.includes("export { default as "))
    .map((line) => line.match(/export { default as (\w+) }/)?.[1])
    .filter((name): name is string => !!name);
  return themeNames;
};

// Загрузка всех тем и общих секций
const loadThemeFiles = async () => {
  const themes: Record<string, any> = {};

  // Загрузка цветовых тем в "colors"
  const colorThemeNames = await getColorThemes();
  themes["colors"] = {};
  for (const themeName of colorThemeNames) {
    const themeFile = `${themeName}.ts`;
    const themePath = path.join(__dirname, themesPath, themeFile);
    try {
      const fileContent = await fs.readFile(themePath, "utf-8");
      const themeData = extractThemeData(fileContent);
      if (themeData) {
        themes["colors"][themeName] = themeData;
      }
    } catch (err) {
      console.error(`Ошибка при загрузке файла темы: ${themeFile}`, err);
    }
  }

  // Загрузка общих секций
  const sharedFiles = ["offsets.ts", "border.ts", "elements.ts", "font.ts", "zIndexes.ts"];
  for (const file of sharedFiles) {
    const filePath = path.join(__dirname, themesPath, file);
    try {
      const fileContent = await fs.readFile(filePath, "utf-8");
      const data = extractThemeData(fileContent);
      if (data) {
        const sectionName = path.basename(file, ".ts");
        themes[sectionName] = data;
      }
    } catch (err) {
      console.error(`Ошибка при загрузке общего файла: ${file}`, err);
    }
  }

  return themes;
};

// Извлечение данных из файла темы
const extractThemeData = (fileContent: string) => {
  const match = fileContent.match(/export\s+default\s+\{([\s\S]*)/);
  if (!match) return null;
  const objectBody = match[1]
    .split("\n")
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith("..."));
  try {
    const parseObject = (lines: string[]): any => {
      const result: Record<string, any> = {};
      let currentKey = "";
      for (const line of lines) {
        if (line.includes(":") && !line.includes("{")) {
          const [key, value] = line.split(":").map((part) => part.trim().replace(/,$/, ""));
          const cleanedValue = value.split("//")[0].trim().replace(/^['"]|['"]$/g, "").replace("',", "");
          if (currentKey) {
            result[currentKey][key] = cleanedValue;
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
    console.error("Не удалось разобрать объект темы:", error);
    return null;
  }
};

// Обновление файла темы
async function updateThemeFile(filePath: string, updates: Record<string, any>) {
  try {
    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(filePath);
    const applyUpdates = (updates: Record<string, any>, parentPath = "") => {
      for (const [key, value] of Object.entries(updates)) {
        const currentPath = parentPath ? `${parentPath}.${key}` : key;
        if (typeof value === "object" && value !== null) {
          applyUpdates(value, currentPath);
        } else {
          const pathSegments = currentPath.split(".");
          let matchingNode = sourceFile;
          for (const segment of pathSegments) {
            // @ts-ignore
            matchingNode = matchingNode
              .getDescendantsOfKind(SyntaxKind.PropertyAssignment)
              .find((node) => node.getName() === segment);
            if (!matchingNode) break;
          }
          if (matchingNode) {
            const shouldQuote =
              typeof value === "string" && !/^\d+(\.\d+)?$/.test(value) && !value.includes("basicOffset");
            const newValue = shouldQuote ? `'${value}'` : value;
            // @ts-ignore
            matchingNode.setInitializer(newValue);
          }
        }
      }
    };
    applyUpdates(updates);
    await fs.writeFile(filePath, sourceFile.getFullText(), "utf-8");
  } catch (error) {
    console.error(`Не удалось обновить ${filePath}:`, error);
    throw error;
  }
}

// GET-запрос для получения тем
app.get("/themes", async (req: Request, res: Response) => {
  try {
    const themes = await loadThemeFiles();
    res.json(themes);
  } catch (error) {
    console.error("Ошибка при загрузке тем:", error);
    res.status(500).json({ error: "Не удалось загрузить темы" });
  }
});

// POST-запрос для обновления тем
app.post("/themes", async (req: Request, res: Response) => {
  const updatedData = req.body;
  try {
    for (const [section, updates] of Object.entries(updatedData)) {
      if (section === "colors") {
        for (const [themeName, themeUpdates] of Object.entries(updates as Record<string, any>)) {
          const themeFile = `${themeName}.ts`;
          const themePath = path.join(__dirname, themesPath, themeFile);
          await updateThemeFile(themePath, themeUpdates);
        }
      } else {
        const sectionFile = `${section}.ts`;
        const sectionPath = path.join(__dirname, themesPath, sectionFile);
        await updateThemeFile(sectionPath, updates as Record<string, any>);
      }
    }
    res.send("Темы успешно обновлены");
  } catch (error) {
    res.status(500).json({ error: "Не удалось обновить темы" });
  }
});

// POST-запрос для создания новой темы
app.post("/themes/new", async (req: Request, res: Response) => {
  const { name: nameToParse, data } = req.body;
  if (!nameToParse || !data) {
    return res.status(400).json({ error: "Требуются имя темы и данные" });
  }
  const name = nameToParse
    .replace(/\s+/g, "_")
    .replace(/[^a-zA-Z0-9_]/g, "");

  const newThemeFile = `${name}.ts`;
  const newThemePath = path.join(__dirname, themesPath, newThemeFile);
  const indexPath = path.join(__dirname, themesPath, "colors.ts");

  try {
    const themeContent = `export default {\n ${Object.entries(data)
      .map(([key, value]) => `  ${key}: '${value}',`)
      .join("\n")}\n};\n`;
    await fs.writeFile(newThemePath, themeContent, "utf-8");

    let indexContent = await fs.readFile(indexPath, "utf-8");
    if (!indexContent.includes(`export { default as ${name} } from './${name}';`)) {
      indexContent += `export { default as ${name} } from './${name}';\n`;
      await fs.writeFile(indexPath, indexContent, "utf-8");
    }

    res.send("Новая тема успешно создана");
  } catch (error) {
    console.error("Ошибка при создании новой темы:", error);
    res.status(500).json({ error: "Ошибка при создании темы" });
  }
});

app.listen(PORT, () => {
  console.log(`Сервер запущен на http://localhost:${PORT}`);
});
