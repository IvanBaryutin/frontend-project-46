import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylishResult = readFile('testStylishResult.txt');
const expectedPlainResult = readFile('testPlainResult.txt');
const expectedJsonResult = readFile('testJsonResult.txt');

describe('test different genDiff options', () => {
  test.each([
    ['stylish', getFixturePath('file1.json'), getFixturePath('file2.json'), expectedStylishResult],
    ['stylish', getFixturePath('file1.yml'), getFixturePath('file2.yml'), expectedStylishResult],
    ['plain', getFixturePath('file1.json'), getFixturePath('file2.json'), expectedPlainResult],
    ['json', getFixturePath('file1.yml'), getFixturePath('file2.yml'), expectedJsonResult],
  ])('genDiff compares file1 and file2 using %s formatter and compares to expected result', (format, file1, file2, expectedResult) => {
    expect(genDiff(file1, file2, format)).toBe(expectedResult);
  });
});
