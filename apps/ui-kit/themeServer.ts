import express, { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors'; // Importing the cors package
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

// Middleware to enable CORS
app.use(cors({
  origin: 'http://localhost:6060', // Allow requests from your React app
  methods: ['GET', 'POST'], // Allow specific methods
  credentials: true, // Include credentials with requests
}));

// Middleware to parse JSON request bodies
app.use(express.json());

// Utility function to load and parse theme files
const loadThemeFiles = async () => {
  const themes: Record<string, any> = {};

  for (const file of themeFiles) {
    const themePath = path.join(__dirname, themesPath, file);

    try {
      // Read the file content as text
      const fileContent = await fs.readFile(themePath, 'utf-8');
      
      // Match and extract the default export object without imported spreads like "...basic"
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
  // Match the object inside `export default {...}` while ignoring spread imports
  const match = fileContent.match(/export\s+default\s+\{([\s\S]*)/);

  if (!match) return null;

  // Extract the body of the default export object
  const objectBody = match[1]
    .split('\n')
    .map(line => line.trim())
    .filter(line => line.length > 0 && !line.startsWith('...')); // Exclude spread syntax and empty lines

  try {
    // Create a recursive function to parse the object into the desired structure
    const parseObject = (lines: string[]): any => {
      const result: Record<string, any> = {};
      let currentKey = '';

      for (const line of lines) {
        if (line.includes(':') && !line.includes('{')) {
          // Handle key-value pairs
          const [key, value] = line.split(':').map(part => part.trim().replace(/,$/, ''));

          // Check if the value is a multiplication expression and format accordingly
          const cleanedValue = value.split('//')[0].trim().replace(/^['"]|['"]$/g, '').replace('\',','');
          if (currentKey) {
            result[currentKey][key] = cleanedValue; // Store multiplication expression as a string
          } else {
            result[key] = cleanedValue; // Store cleaned value
          }
        } else if (line.includes(':') && line.includes('{')) {
          // Start of a nested object
          currentKey = line.split(':')[0].trim();
          result[currentKey] = {};
        } else if (line.includes('}')) {
          currentKey = '';
        }
      }

      return result;
    };

    // Parse the top-level object
    return parseObject(objectBody);
  } catch (error) {
    console.error('Failed to parse theme object:', error);
    return null;
  }
};

// Endpoint to get all theme variables
app.get('/themes', async (req: Request, res: Response) => {
  try {
    const themes = await loadThemeFiles();
    res.json(themes);
  } catch (error) {
    console.error('Error loading themes:', error);
    res.status(500).json({ error: 'Failed to load themes' });
  }
});

async function updateThemeFile(filePath: string, updates: Record<string, any>) {
  try {
    const project = new Project();
    const sourceFile = project.addSourceFileAtPath(filePath);

    // Utility function to recursively apply updates
    const applyUpdates = (updates: Record<string, any>, parentPath = '') => {
      for (const [key, value] of Object.entries(updates)) {
        const currentPath = parentPath ? `${parentPath}.${key}` : key;

        if (typeof value === 'object' && value !== null) {
          // If the update is nested, recurse deeper
          applyUpdates(value, currentPath);
        } else {
          // Locate the corresponding AST node and apply the update
          const matchingNode = sourceFile.getDescendantsOfKind(SyntaxKind.PropertyAssignment)
            .find(node => {
              const name = node.getName();
              return currentPath.endsWith(name);
            });

            if (matchingNode) {
              const shouldQuote =
                typeof value === 'string' &&
                !/^\d+(\.\d+)?$/.test(value) &&    // Ignore pure numeric values
                !value.includes("basicOffset");    // Ignore strings containing "basicOffset"
            
              // Set the initializer, adding quotes only if necessary
              const newValue = shouldQuote ? `'${value}'` : value;
              matchingNode.setInitializer(newValue);
            }
        }
      }
    };

    // Apply the updates to the AST
    applyUpdates(updates);

    // Write the updated content back to the file
    await fs.writeFile(filePath, sourceFile.getFullText(), 'utf-8');
  } catch (error) {
    console.error(`Failed to update ${filePath}:`, error);
    throw error;
  }
}

// Endpoint to update all theme variables at once
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


app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
