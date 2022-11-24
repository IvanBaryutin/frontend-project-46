import formatDataToStylish from './stylish.js';
import formatDataToPlain from './plane.js';
import formatDataToJSON from './json.js';

const formatData = (ast, format) => {
  if (format === 'stylish') {
    // console.log(ast);
    return formatDataToStylish(ast);
  }
  if (format === 'plain') {
    return formatDataToPlain(ast);
  }
  if (format === 'json') {
    return formatDataToJSON(ast);
  }
  throw new Error(`Not supported format'${format}'`);
};

export default formatData;
