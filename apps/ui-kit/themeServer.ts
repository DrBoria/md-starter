import express, { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors';
import { Project, SyntaxKind } from 'ts-morph';

const app = express();
const PORT = process.env.PORT || 6061;
const themesPath = '../../packages/styles/themes';
const themeFiles = [
  'offsets.ts',
  'basic.ts',
  'border.ts',
  'dark.ts',
  'elements.ts',
  'font.ts',
  'index.ts',
  'light.ts',
  'zIndexes.ts',
];

app.use(cors({ origin: 'http://localhost:6060', methods: ['GET', 'POST'], credentials: true }));
app.use(express.json());

const loadThemeFiles = async () => {
  const themes: Record<string, any> = {};
  for (const file of themeFiles) {
    const themePath = path.join(__dirname, themesPath, file);
    try {
      const fileContent = await fs.readFile(themePath, 'utf-8');
      const themeData = extractThemeData(fileContent);
      if (themeData) {
        themes[file.replace('.ts', '')] = themeData;
      }
    } catch (err) {
      console.error(`Error loading theme file: ${file}`, err);
    }
  }
  return themes;
};

const extractThemeData = (fileContent: string) => {
  const match = fileContent.match(/export\s+default\s+\{([\s\S]*)/);
  if (!match) return null;
  const objectBody = match[1]
    .split('\n')
    .map((line) => line.trim())
    .filter((line) => line.length > 0 && !line.startsWith('...'));
  try {
    const parseObject = (lines: string[]): any => {
      const result: Record<string, any> = {};
      let currentKey = '';
      for (const line of lines) {
        if (line.includes(':') && !line.includes('{')) {
          const [key, value] = line.split(':').map((part) => part.trim().replace(/,$/, ''));
          const cleanedValue = value.split('//')[0].trim().replace(/^['"]|['"]$/g, '').replace("',", '');
          if (currentKey) {
            result[currentKey][key] = cleanedValue;
          } else {
            result[key] = cleanedValue;
          }
        } else if (line.includes(':') && line.includes('{')) {
          currentKey = line.split(':')[0].trim();
          result[currentKey] = {};
        } else if (line.includes('}')) {
          currentKey = '';
        }
      }
      return result;
    };
    return parseObject(objectBody);
  } catch (error) {
    console.error('Failed to parse theme object:', error);
    return null;
  }
};

async function updateThemeFile(filePath: string, updates: Record<string, any>) {
  try {
    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(filePath);
    const applyUpdates = (updates: Record<string, any>, parentPath = '') => {
      for (const [key, value] of Object.entries(updates)) {
        const currentPath = parentPath ? `${parentPath}.${key}` : key;
        if (typeof value === 'object' && value !== null) {
          applyUpdates(value, currentPath);
        } else {
          const pathSegments = currentPath.split('.');
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
              typeof value === 'string' && !/^\d+(\.\d+)?$/.test(value) && !value.includes('basicOffset');
            const newValue = shouldQuote ? `'${value}'` : value;
            // @ts-ignore
            matchingNode.setInitializer(newValue);
          }
        }
      }
    };
    applyUpdates(updates);
    await fs.writeFile(filePath, sourceFile.getFullText(), 'utf-8');
  } catch (error) {
    console.error(`Failed to update ${filePath}:`, error);
    throw error;
  }
}

app.get('/themes', async (req: Request, res: Response) => {
  try {
    const themes = await loadThemeFiles();
    res.json(themes);
  } catch (error) {
    console.error('Error loading themes:', error);
    res.status(500).json({ error: 'Failed to load themes' });
  }
});

app.post('/themes', async (req: Request, res: Response) => {
  const updatedData = req.body;
  try {
    for (const [themeName, updates] of Object.entries(updatedData)) {
      const themeFile = `${themeName}.ts`;
      if (themeFiles.includes(themeFile)) {
        const themePath = path.join(__dirname, themesPath, themeFile);
        // @ts-ignore
        await updateThemeFile(themePath, updates);
      }
    }
    res.send('Themes updated successfully');
  } catch (error) {
    res.status(500).json({ error: 'Failed to update themes' });
  }
});

app.post('/themes/new', async (req: Request, res: Response) => {
  const { name: nameToParse, data } = req.body;
  if (!nameToParse || !data) {
    return res.status(400).json({ error: 'Theme name and data is required' });
  }
  const name = nameToParse
    .replace(/\s+/g, "_") // space to _
    .replace(/[^a-zA-Z0-9_]/g, ""); // remove all except number letter and _ 

  const newThemeFile = `${name}.ts`;
  const newThemePath = path.join(__dirname, themesPath, newThemeFile);
  const indexPath = path.join(__dirname, themesPath, 'colors.ts');

  try {
    // Creating new theme file
    const themeContent = `export default {\n ${Object.entries(data)
      .map(([key, value]) => `  ${key}: '${value}',`)
      .join('\n')}\n};\n`;
    await fs.writeFile(newThemePath, themeContent, 'utf-8');

    // Update colors.ts file
    let indexContent = await fs.readFile(indexPath, 'utf-8');
    if (!indexContent.includes(`export { default as ${name} } from './${name}';`)) {
      indexContent += `export { default as ${name} } from './${name}';\n`;
      await fs.writeFile(indexPath, indexContent, 'utf-8');
    }

    // Update list of files
    if (!themeFiles.includes(newThemeFile)) {
      themeFiles.push(newThemeFile);
    }

    res.send('Новая тема успешно создана');
  } catch (error) {
    console.error('Error creating new theme:', error);
    res.status(500).json({ error: 'Error during a theme creation' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
