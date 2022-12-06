import fs from 'fs';
import path from 'path';
import parseData from './parsers.js';
import makeDifferenceTree from './makeDifferenceTree.js';
import formatData from './formatters/index.js';

const readFile = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');
const getExtension = (filename) => path.extname(filename).split('.')[1];

const genDiff = (file1, file2, format = 'stylish') => {
  const data1 = parseData(readFile(file1), getExtension(file1));
  const data2 = parseData(readFile(file2), getExtension(file2));
  const ast = makeDifferenceTree(data1, data2);
  return formatData(ast, format);
};

export default genDiff;
