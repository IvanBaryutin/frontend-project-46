console.log(1111);
import fs from 'fs';
import _ from 'lodash';

console.log(process.cwd());

const readFile = (filepath) => fs.readFileSync(process.cwd() + filepath, 'utf-8');

const getExtension = (filename) => filename.split('.')[fileName.length - 1];

const filePath1 = '/file1.json';
const filePath2 = '/file2.json';

const data1 = JSON.parse(readFile(filePath1));
const data2 = JSON.parse(readFile(filePath2));

console.log(data1);
console.log(data2);



/*
const file1 = 
{
  "host": "hexlet.io",
  "timeout": 50,
  "proxy": "123.234.53.22",
  "follow": false
}

const file2 = 
{
  "timeout": 20,
  "verbose": true,
  "host": "hexlet.io"
}

const gendiff = (file1, file2) => {
    //const obj1 = JSON.parse(file1);
    //const obj2 = JSON.parse(file2);
    //console.log(JSON.parse(file1));
    console.log(JSON.parse(file2));        
};
*/

//gendiff(file1, file2);
