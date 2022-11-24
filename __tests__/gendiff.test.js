import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
// import _ from 'lodash';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

test('test two json files', () => {
  const expected = readFile('testStylishResult.txt');
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'));
  expect(actual).toEqual(expected);
});

test('test two yaml files', () => {
  const expected = readFile('testStylishResult.txt');
  const actual = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'));
  expect(actual).toEqual(expected);
});

test('test two json files with plain output', () => {
  const expected = readFile('testPlainResult.txt');
  const actual = genDiff(getFixturePath('file1.json'), getFixturePath('file2.json'), 'plain');
  expect(actual).toEqual(expected);
});

test('test two yaml files with plain output', () => {
  const expected = readFile('testPlainResult.txt');
  const actual = genDiff(getFixturePath('file1.yml'), getFixturePath('file2.yml'), 'plain');
  expect(actual).toEqual(expected);
});
