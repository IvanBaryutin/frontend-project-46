import formatStylish from './stylish.js';
import formatPlain from './plane.js';

const formatData = (ast, format) => {
  switch (format) {
    case 'stylish': {
      return formatStylish(ast);
    }
    case 'plain': {
      return formatPlain(ast);
    }
    case 'json': {
      return JSON.stringify(ast);
    }
    default:
      throw new Error(`Not supported format'${format}'`);
  }
};

export default formatData;
