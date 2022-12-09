import yaml from 'js-yaml';

const parse = (content, format) => {
  switch (format) {
    case 'json':
      return JSON.parse(content);
    case 'yml':
    case 'yaml':
      return yaml.load(content);
    default:
      throw new Error(`Формат ${format} не поддерживается!`);
  }
};

export default parse;
