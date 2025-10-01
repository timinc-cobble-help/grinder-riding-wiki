import fs from "fs";
import path from "path";
import parser from "./parser.ts";

const dirPath = process.argv[2];
if (!dirPath) {
  console.error("Usage: node index.js <directory-path>");
  process.exit(1);
}

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

const jsonFiles = findJsonFiles(dirPath);
const bigList: ParsedLine[] = [];
jsonFiles.forEach((file) => {
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  bigList.push(...parser(data));
});
fs.writeFileSync(
  "output.txt",
  bigList
    .filter((item) => !item.empty)
    .sort((a, b) => a.dex - b.dex)
    .map((item) => item.line)
    .join("\n"),
  "utf8"
);
