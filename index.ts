import fs from "fs";
import path from "path";
import parser from "./parser.ts";

// Import the default export from parser.ts

// Get the directory path from CLI args
const dirPath = process.argv[2];
if (!dirPath) {
  console.error("Usage: node index.js <directory-path>");
  process.exit(1);
}

// Recursively find all JSON files in a directory
function findJsonFiles(dir: string): string[] {
  let results: string[] = [];
  const list = fs.readdirSync(dir);
  list.forEach((file) => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    if (stat && stat.isDirectory()) {
      results = results.concat(findJsonFiles(filePath));
    } else if (file.endsWith(".json")) {
      results.push(filePath);
    }
  });
  return results;
}

// Main execution
const jsonFiles = findJsonFiles(dirPath);
const bigList: string[] = [];
jsonFiles.forEach((file) => {
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  bigList.push(...parser(data));
});
fs.writeFileSync("output.txt", bigList.join("\n"), "utf8");
