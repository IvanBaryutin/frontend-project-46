import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

const expectedStylishResult = readFile('stylishResult.txt');
const expectedPlainResult = readFile('plainResult.txt');
const expectedJsonResult = readFile('jsonResult.txt');

describe('test different genDiff options', () => {
  test.each([
    ['file1.json', 'file2.json', expectedStylishResult, 'stylish'],
    ['file1.yml', 'file2.yml', expectedStylishResult, 'stylish'],
    ['file1.json', 'file2.json', expectedPlainResult, 'plain'],
    ['file1.yml', 'file2.yml', expectedPlainResult, 'plain'],
    ['file1.yml', 'file2.yml', expectedJsonResult, 'json'],
    ['file1.json', 'file2.json', expectedJsonResult, 'json'],
    ['file1.json', 'file2.json', expectedStylishResult, undefined],
    ['file1.yml', 'file2.yml', expectedStylishResult, undefined],
  ])('genDiff compares file1 and file2 using %s formatter and compares to expected result', (file1, file2, expectedResult, format) => {
    expect(genDiff(getFixturePath(file1), getFixturePath(file2), format)).toBe(expectedResult);
  });
});
