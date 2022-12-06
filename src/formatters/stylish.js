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

const formatStylish = (tree) => {
  const iter = (data, depth) => {
    const lines = data.map((node) => {
      switch (node.type) {
        case 'added':
          return `${valueIndent(depth)}+ ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'removed':
          return `${valueIndent(depth)}- ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'unChanged':
          return `${valueIndent(depth)}  ${node.key}: ${stringify(node.value, depth + 1)}`;
        case 'changed':
          return [
            `${valueIndent(depth)}- ${node.key}: ${stringify(node.value1, depth + 1)}`,
            `${valueIndent(depth)}+ ${node.key}: ${stringify(node.value2, depth + 1)}`,
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
export default formatStylish;
