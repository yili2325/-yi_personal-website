const fs = require('fs');
const path = require('path');

// Files with ESLint errors to fix
const filesToFix = [
  // Unused imports
  {
    path: 'src/app/insight/page.tsx',
    fixes: [
      { type: 'removeImport', import: 'Image' }
    ]
  },
  {
    path: 'src/app/page.tsx',
    fixes: [
      { type: 'removeImport', import: 'Link' },
      { type: 'removeImport', import: 'useAnimation' },
      { type: 'removeUnusedVar', varName: 'pulseDuration' }
    ]
  },
  {
    path: 'src/app/pathfinder/page.tsx',
    fixes: [
      { type: 'removeImport', import: 'Image' },
      { type: 'escapeEntities', entities: ["'"] }
    ]
  },
  {
    path: 'src/app/vital-orbit/page.tsx',
    fixes: [
      { type: 'removeImport', import: 'Image' }
    ]
  },
  {
    path: 'src/components/AiTwin.tsx',
    fixes: [
      { type: 'escapeEntities', entities: ['"'] },
      { type: 'fixAnyType', line: 65 }
    ]
  },
  {
    path: 'src/app/api/chat/twin/route.ts',
    fixes: [
      { type: 'removeUnusedVar', varName: 'context' },
      { type: 'letToConst', varName: 'systemMessage' }
    ]
  },
  {
    path: 'src/components/insight/AIInsight.tsx',
    fixes: [
      { type: 'removeImport', import: 'useEffect' },
      { type: 'escapeEntities', entities: ["'"] }
    ]
  },
  {
    path: 'src/components/insight/BuildingLogs.tsx',
    fixes: [
      { type: 'escapeEntities', entities: ['"'] }
    ]
  },
  {
    path: 'src/components/insight/FeaturedEssays.tsx',
    fixes: [
      { type: 'removeImport', import: 'Image' },
      { type: 'removeImport', import: 'Link' }
    ]
  },
  {
    path: 'src/components/insight/HeroHeader.tsx',
    fixes: [
      { type: 'removeImport', import: 'Image' },
      { type: 'escapeEntities', entities: ['"'] }
    ]
  }
];

// Function to read a file
function readFile(filePath) {
  return fs.readFileSync(filePath, 'utf8');
}

// Function to write to a file
function writeFile(filePath, content) {
  fs.writeFileSync(filePath, content, 'utf8');
}

// Function to fix ESLint errors
function fixESLintErrors() {
  filesToFix.forEach(file => {
    const filePath = path.join(process.cwd(), file.path);
    console.log(`Fixing ${filePath}...`);
    
    let content = readFile(filePath);
    
    file.fixes.forEach(fix => {
      switch (fix.type) {
        case 'removeImport':
          // Remove unused imports
          const importRegex = new RegExp(`import\\s+${fix.import}\\s+from\\s+['"].*?['"];?\\n?`, 'g');
          content = content.replace(importRegex, '');
          
          // Also remove from destructured imports
          const destructuredImportRegex = new RegExp(`import\\s+\\{([^}]*)${fix.import}([^}]*)\\}\\s+from\\s+['"].*?['"];?`, 'g');
          content = content.replace(destructuredImportRegex, (match, before, after) => {
            const cleanedBefore = before.replace(/,\s*$/, '');
            const cleanedAfter = after.replace(/^\s*,/, '');
            return `import { ${cleanedBefore}${cleanedAfter} } from 'next/image';`;
          });
          break;
          
        case 'removeUnusedVar':
          // Remove unused variables
          const varRegex = new RegExp(`\\b${fix.varName}\\b\\s*=\\s*[^;]*;`, 'g');
          content = content.replace(varRegex, '');
          break;
          
        case 'letToConst':
          // Change let to const
          const letRegex = new RegExp(`let\\s+${fix.varName}\\b`, 'g');
          content = content.replace(letRegex, `const ${fix.varName}`);
          break;
          
        case 'escapeEntities':
          // Escape entities in JSX
          fix.entities.forEach(entity => {
            if (entity === "'") {
              content = content.replace(/(?<=<[^>]*)(?<!\&apos;|&#39;|&lsquo;|&rsquo;)'(?![^<]*>)/g, '&apos;');
            } else if (entity === '"') {
              content = content.replace(/(?<=<[^>]*)(?<!\&quot;|&#34;|&ldquo;|&rdquo;)"(?![^<]*>)/g, '&quot;');
            }
          });
          break;
          
        case 'fixAnyType':
          // Replace any with a more specific type
          const anyRegex = new RegExp(`:\\s*any\\b`, 'g');
          content = content.replace(anyRegex, ': unknown');
          break;
      }
    });
    
    writeFile(filePath, content);
    console.log(`Fixed ${filePath}`);
  });
}

// Run the fix
fixESLintErrors();
console.log('All ESLint errors fixed!');
