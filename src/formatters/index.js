import formatStylish from './stylish.js';
import formatPlain from './plane.js';

const format = (ast, outFormat) => {
  switch (outFormat) {
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
      throw new Error(`Not supported format '${outFormat}'`);
  }
};

export default format;
