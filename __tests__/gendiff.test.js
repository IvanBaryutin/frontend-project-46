import fs from 'fs';
import path, { dirname } from 'path';
import { fileURLToPath } from 'url';
// import _ from 'lodash';
import genDiff from '../src/index.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const getFixturePath = (filename) => path.join(__dirname, '..', '__fixtures__', filename);
const readFile = (filename) => fs.readFileSync(getFixturePath(filename), 'utf-8');

// const dsd = readFile('testResult1.txt');

// console.log(dsd);

test('test two json files', () => {
  const expected = readFile('testResult1.txt');
  const actual = genDiff(getFixturePath('testFile1.json'), getFixturePath('testFile2.json'));
  expect(actual).toEqual(expected);
});

test('test two yaml files', () => {
  const expected = readFile('testResult2.txt');
  const actual = genDiff(getFixturePath('testFile1.yml'), getFixturePath('testFile2.yml'));
  expect(actual).toEqual(expected);
});

