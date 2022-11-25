import fs from 'fs';
import path from 'path';
import parseData from './parsers.js';
import makeAST from './makeAST.js';
import formatData from './formatters/index.js';

const readFile = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');
const getFileExt = (filename) => filename.split('.').pop();

const genDiff = (oldFile, newFile, formatter = 'stylish') => {
  const oldData = parseData(readFile(oldFile), getFileExt(oldFile));
  const newData = parseData(readFile(newFile), getFileExt(newFile));
  const ast = makeAST(oldData, newData);
  return formatData(ast, formatter);
};

export default genDiff;
