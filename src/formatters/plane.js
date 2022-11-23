const stringify = (value) => {
  if (typeof value === 'object' && value !== null) {
    return '[complex value]';
  }
  if (typeof value === 'string') {
    return `'${value}'`;
  }
  return value;
};

const formatDataToPlain = (tree) => {
  // tree.filter((el) => el.type !== 'notModified');
  const iter = (data, ancestry) => {
    // console.log(ancestry);
    // console.log(data);
    const lines = data.map((node) => {
      // console.log(ancestry);
      // console.log(node);
      const newAncestry = ancestry.length > 0 ? `${ancestry}.${node.key}` : node.key;
      switch (node.type) {
        case 'added':
          return `Property '${newAncestry}' was added with value: ${stringify(node.value)}`;
        case 'removed':
          return `Property '${newAncestry}' was removed`;
        case 'notModified':
          return null;
        case 'modified':
          return `Property '${newAncestry}' was updated. From ${stringify(node.firstValue)} to ${stringify(node.secondValue)}`;
        case 'nested': {
          // console.log(ancestry);
          // const newAncestry = (ancestry == '') ? node.key : `${ancestry}.${node.key}`;
          // const newAncestry = `test`;
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
export default formatDataToPlain;
