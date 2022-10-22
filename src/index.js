import fs from 'fs';
import _ from 'lodash';

console.log(process.cwd());

const readFile = (filepath) => fs.readFileSync(process.cwd() + filepath, 'utf-8');

const getExtension = (filename) => filename.split('.')[fileName.length - 1];

const filePath1 = '/file1.json';
const filePath2 = '/file2.json';

const data1 = JSON.parse(readFile(filePath1));
const data2 = JSON.parse(readFile(filePath2));

console.log(data1.host);
console.log(data2.host);


const keys1 = Object.keys(data1);
const keys2 = Object.keys(data2);

const sortedKeys = _.union(keys1, keys2).sort();

let res = '{\n';

sortedKeys.map((key) => {
  // console.log(data1[key]);
  let str = '';
  if (key in data1 === false) {
    str = ` + ${key}: ${data2[key]}\n`;
  }
  if (key in data1) {
    if (data1[key] === data2[key]) {
      str = `   ${key}: ${data2[key]}\n`;
    } else {
      if (key in data2 === false) {
        str = ` - ${key}: ${data1[key]}\n`;
      } else {
        str = ` - ${key}: ${data1[key]}\n + ${key}: ${data2[key]}\n`;
      }
    }
  }
  res += str;
});

res += '}';

console.log(res);
