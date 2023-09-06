const path = require("path");
const fs = require("fs");
const execSync = require("child_process").execSync;

const [, , filename] = process.argv;

if (!filename) {
  console.error("Please provide a TypeScript filename to run.");
  process.exit(1);
}

const filePath = path.resolve(__dirname, `../src/${filename}.ts`);

if (!fs.existsSync(filePath)) {
  console.error(`File "${filename}" does not exist.`);
  process.exit(1);
}

try {
  execSync(`ts-node ${filePath}`, { stdio: "inherit" });
} catch (error) {
  console.error(`Error running "${filename}":`, error);
  process.exit(1);
}
