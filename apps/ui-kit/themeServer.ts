import express, { Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import cors from 'cors'; // Importing the cors package

const app = express();
const PORT = process.env.PORT || 6061;
const themesPath = '../../packages/styles/themes';
const themeFiles = ['baseTheme.ts', 'basic.ts', 'dark.ts', 'light.ts'];

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

// Helper function to extract only the local properties from the default export object
const extractThemeData = (fileContent: string) => {
  // Match the object inside `export default {...}` while ignoring spread imports
  const match = fileContent.match(/export\s+default\s+\{([^]+?)\};?/);
  
  if (!match) return null;

  const objectBody = match[1]
    .split('\n')
    .filter(line => !line.includes('...'))  // Exclude spread syntax
    .join('\n');

  // Parse the extracted object body as JSON-like data
  try {
    const themeObject = eval(`({${objectBody}})`);
    return themeObject;
  } catch (error) {
    console.error('Failed to parse theme object:', error);
    return null;
  }
};

// Endpoint to get all theme variables
app.get('/themes', async (req: Request, res: Response) => {
  try {
    const themes = await loadThemeFiles();
    console.log(themes);
    res.json(themes);
  } catch (error) {
    console.error('Error loading themes:', error);
    res.status(500).json({ error: 'Failed to load themes' });
  }
});

// Utility function to update specific lines in the file content
async function updateThemeFile(filePath: string, updates: Record<string, string>) {
  try {
    // Read the file contents
    let fileContent = await fs.readFile(filePath, 'utf-8');
    
    // For each property to update, replace its value in the file content
    for (const [key, value] of Object.entries(updates)) {
      const regex = new RegExp(`(${key}:\\s*)['"]#([a-fA-F0-9]{6})['"]`, 'g');
      fileContent = fileContent.replace(regex, `$1'${value}'`);
    }

    // Write the updated content back to the file
    await fs.writeFile(filePath, fileContent);
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
