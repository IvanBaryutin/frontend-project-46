import fs from 'fs';
import path from 'path';
import _ from 'lodash';

const getExtension = (filename) => filename.split('.')[fileName.length - 1];

const readFile = (filepath) => fs.readFileSync(path.resolve(process.cwd(), filepath), 'utf-8');

const genDiff = (oldFile, newFile) => {
  // Читаем файлы
  const oldData = JSON.parse(readFile(oldFile));
  const newData = JSON.parse(readFile(newFile));

  // Берем собираем ключи
  const oldKeys= Object.keys(oldData);
  const newKeys = Object.keys(newData);

  // Делаем один массив уникальных ключей и сортируем
  const sortedKeys = _.union(oldKeys, newKeys).sort();

  let res = '{\n';

  sortedKeys.map((key) => {
    let str = '';
    // ключа нет в старом файле
    if (key in oldData === false) {
      str = `\t+ ${key}: ${newData[key]}\n`;
    }
    if (key in oldData) {
      // Значение по ключу не изменилось
      if (oldData[key] === newData[key]) {
        str = `\t  ${key}: ${newData[key]}\n`;
      } else {
        if (key in newData === false) {
          // Нет ключа в новом файле
          str = `\t- ${key}: ${oldData[key]}\n`;
        } else {
          str = `\t- ${key}: ${oldData[key]}\n\t+ ${key}: ${newData[key]}\n`;
        }
      }
    }
    res += str;
  });

  res += '}';

  return res;
}

export default genDiff;
