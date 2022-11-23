import formatDataToStylish from './stylish.js';
import formatDataToPlain from './plane.js';

const formatData = (ast, format) => {
  if (format === 'stylish') {
    console.log(ast);
    return formatDataToStylish(ast);
  }
  if (format === 'plain') {
    return formatDataToPlain(ast);
  }
  throw new Error('Not supported format');
};

export default formatData;
