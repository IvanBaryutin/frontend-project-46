const replacer = ' ';
const valueIndent = (depth) => replacer.repeat(4 * depth + 2);
const bracketIndent = (depth) => replacer.repeat(4 * depth);

const stringify = (value, depth) => {
  if (typeof value !== 'object' || value === null) {
    return value;
  }
  const lines = Object.keys(value)
    .map((key) => `${valueIndent(depth)}  ${key}: ${stringify(value[key], depth + 1)}`);
  return [
    '{',
    ...lines,
    `${bracketIndent(depth)}}`,
  ].join('\n');
};

const formatDataToStylish = (tree) => {
  const iter = (data, depth) => {
    // console.log(depth);
    // console.log(data);
    const lines = data.map((node) => {
      switch (node.type) {
        case 'added':
          return `${valueIndent(depth)}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'removed':
          return `${valueIndent(depth)}- ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'notModified':
          return `${valueIndent(depth)}  ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'modified':
          return [
            `${valueIndent(depth)}- ${node.key}: ${stringify(node.firstValue, depth + 1)}`,
            `${valueIndent(depth)}+ ${node.key}: ${stringify(node.secondValue, depth + 1)}`,
          ].join('\n');
        case 'nested':
          return `${valueIndent(depth)}  ${node.key}: ${iter(node.children, depth + 1)}`;
        default:
          throw new Error(`Unsupported node type: '${node.type}'`);
      }
    });
    return [
      '{',
      ...lines,
      `${bracketIndent(depth)}}`,
    ].join('\n');
  };

  return iter(tree, 0);
};
export default formatDataToStylish;
