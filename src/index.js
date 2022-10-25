import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const readFile = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');

const genDiff = (oldFile, newFile) => {
  // Читаем файлы
  const oldData = JSON.parse(readFile(oldFile));
  const newData = JSON.parse(readFile(newFile));

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
