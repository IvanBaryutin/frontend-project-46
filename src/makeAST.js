import _ from 'lodash';

const makeAST = (oldData, newData) => {
  const oldKeys = Object.keys(oldData);
  const newKeys = Object.keys(newData);
  // const sortedKeys = _.union(oldKeys, newKeys).sort();
  const sortedKeys = _.sortBy(_.union(oldKeys, newKeys).sort());

  const result = sortedKeys.map((key) => {
    // Значение одного и того же ключа в обеих структурах — объект, строим children
    if (typeof oldData[key] === 'object' && typeof newData[key] === 'object') {
      return {
        key,
        type: 'nested',
        children: makeAST(oldData[key], newData[key]),
      };
    }
    // Нет ключа в исходной структуре: добавлено
    if (key in oldData === false) {
      return {
        key,
        type: 'added',
        value: newData[key],
      };
    }
    // Нет ключа в новой структуре: удалено
    if (key in newData === false) {
      return {
        key,
        type: 'removed',
        value: oldData[key],
      };
    }
    // Значения по ключу отличаются
    if (oldData[key] !== newData[key]) {
      return {
        key,
        type: 'modified',
        firstValue: oldData[key],
        secondValue: newData[key],
      };
    }
    // Иначе значение не менялось, добавляем как есть.
    return {
      key,
      type: 'notModified',
      value: oldData[key],
    };
  });
  return result;
};

export default makeAST;
