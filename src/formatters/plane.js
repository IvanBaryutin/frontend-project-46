const stringify = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const formatPlain = (tree) => {
  const iter = (data, ancestry) => {
    const lines = data.map((node) => {
      const newAncestry = ancestry.length > 0 ? `${ancestry}.${node.key}` : node.key;
      switch (node.type) {
        case 'added':
          return `Property '${newAncestry}' was added with value: ${stringify(node.value)}`;
        case 'removed':
          return `Property '${newAncestry}' was removed`;
        case 'unChanged':
          return null;
        case 'changed':
          return `Property '${newAncestry}' was updated. From ${stringify(node.value1)} to ${stringify(node.value2)}`;
        case 'nested': {
          return iter(node.children, newAncestry);
        }
        default:
          throw new Error(`Unsupported node type: '${node.type}'`);
      }
    });
    return lines
      .filter((el) => el !== null)
      .join('\n');
  };

  return iter(tree, '');
};
export default formatPlain;
