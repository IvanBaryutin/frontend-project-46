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
  // console.log(JSON.stringify(ast, null, 2));
  return formatData(ast, formatter);
};
/*
const genDiff = (oldFile, newFile) => {
  // Парсим файлы
  const oldData = parseData(readFile(oldFile), getFileExt(oldFile));
  // console.log(oldData);
  const newData = parseData(readFile(newFile), getFileExt(newFile));
  // console.log(newData);

  console.log(JSON.stringify(makeAST(oldData, newData), null, 2));

  // Берем собираем ключи
  const oldKeys = Object.keys(oldData);
  const newKeys = Object.keys(newData);

  // Делаем один массив уникальных ключей и сортируем
  const sortedKeys = _.union(oldKeys, newKeys).sort();

  const result = sortedKeys.reduce((str, key) => {
    let res = '';
    if (key in oldData === false) {
      res = `${str}  + ${key}: ${newData[key]}\n`;
    }
    if (key in oldData) {
      // Значение по ключу не изменилось
      if (oldData[key] === newData[key]) {
        res = `${str}    ${key}: ${newData[key]}\n`;
      } else if (key in newData === false) {
        // Нет ключа в новом файле
        res = `${str}  - ${key}: ${oldData[key]}\n`;
      } else {
        res = `${str}  - ${key}: ${oldData[key]}\n  + ${key}: ${newData[key]}\n`;
      }
    }
    return res;
  }, '');

  return `{\n${result}}`;
};
*/

export default genDiff;
