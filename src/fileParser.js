import fs from 'fs';
import path from 'path';
import yaml from 'js-yaml';

export function readFile(filePath) {
  const ext = path.extname(filePath).toLowerCase();
  const content = fs.readFileSync(filePath, 'utf-8');
  if (ext === '.json') {
    return JSON.parse(content);
  }
  if (ext === '.yaml' || ext === '.yml') {
    return yaml.load(content);
  }

  throw new Error(`Unsupported file format: ${ext}`);
}