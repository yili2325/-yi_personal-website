const fs = require('fs');
const path = require('path');

// Path to the route.ts file
const routeFilePath = path.join(process.cwd(), 'src/app/api/chat/twin/route.ts');

// Read the file content
let content = fs.readFileSync(routeFilePath, 'utf8');

// Fix the 'context' variable issue - if it exists in the file
// This replaces "const { message, context }" with "const { message }"
content = content.replace(/const\s*{\s*message\s*,\s*context\s*}\s*=\s*body/, 'const { message } = body');

// Fix the 'let systemMessage' issue - if it exists in the file
// This replaces "let systemMessage" with "const systemMessage"
content = content.replace(/let\s+systemMessage/, 'const systemMessage');

// Write the changes back to the file
fs.writeFileSync(routeFilePath, content, 'utf8');

console.log('Fixed ESLint errors in route.ts file');
