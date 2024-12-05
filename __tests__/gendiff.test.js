import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import gendiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('gendiff stylish format', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = readFile('expected_stylish.txt');
  expect(gendiff(file1, file2, 'stylish')).toBe(expected);
});

test('gendiff plain format', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');
  const expected = readFile('expected_plain.txt');
  expect(gendiff(file1, file2, 'plain')).toBe(expected);
});

test('gendiff json format', () => {
  const file1 = getFixturePath('file1.json');
  const file2 = getFixturePath('file2.json');

  const expected = readFile('expected_json.json');
  expect(gendiff(file1, file2, 'json')).toBe(expected);
});