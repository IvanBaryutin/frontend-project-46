import fs from 'fs';
import path from 'path';
import _ from 'lodash';
import parseData from './parsers.js';

const readFile = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');
const getFileExt = (filename) => filename.split('.').pop();

const makeAST = (oldData, newData) => {
  const oldKeys = Object.keys(oldData);
  const newKeys = Object.keys(newData);
  const sortedKeys = _.union(oldKeys, newKeys).sort();

  const result = sortedKeys.map((key) => {
    // Нет ключа в исходной структуре: добавлено
    if (key in oldData === false) {
      return {
        key,
        type: 'added',
        value: newData[key],
      };
    }
    // Нет ключа в новой структуре: удалено
    if (key in newData === false) {
      return {
        key,
        type: 'removed',
        value: oldData[key],
      };
    }
    // Значения по ключу отличаются
    if (oldData[key] !== newData[key]) {
      return {
        key,
        type: 'modified',
        firstValue: oldData[key],
        secondValue: newData[key],
      };
    }
    // Значение одного и того же ключа в обеих структурах — объект, строим children
    if (typeof oldData[key] === 'object' && typeof newData[key] === 'object') {
      return {
        key,
        type: 'nested',
        children: makeAST(oldData[key], newData[key]),
      };
    }
    // Иначе значение не менялось, добавляем как есть.
    return {
      key,
      type: 'notModified',
      value: oldData[key],
    };
  });
  return result;
};

const genDiff = (oldFile, newFile) => {
  // Парсим файлы
  const oldData = parseData(readFile(oldFile), getFileExt(oldFile));
  // console.log(oldData);
  const newData = parseData(readFile(newFile), getFileExt(newFile));
  // console.log(newData);

  console.log(makeAST(oldData, newData));

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

export default genDiff;
