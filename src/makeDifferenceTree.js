import _ from 'lodash';

const makeDifferenceTree = (data1, data2) => {
  const keys1 = Object.keys(data1);
  const keys2 = Object.keys(data2);
  const sortedKeys = _.sortBy(_.union(keys1, keys2));

  const result = sortedKeys.map((key) => {
    // Значение одного и того же ключа в обеих структурах — объект, строим children
    if (_.isPlainObject(data1[key]) && _.isPlainObject(data2[key])) {
      return {
        key,
        type: 'nested',
        children: makeDifferenceTree(data1[key], data2[key]),
      };
    }
    // Нет ключа в исходной структуре: добавлено
    if (!_.has(data1, key)) {
      return {
        key,
        type: 'added',
        value: data2[key],
      };
    }
    // Нет ключа в новой структуре: удалено
    if (!_.has(data2, key)) {
      return {
        key,
        type: 'removed',
        value: data1[key],
      };
    }
    // Значения по ключу отличаются
    if (!_.isEqual(data1[key], data2[key])) {
      return {
        key,
        type: 'changed',
        value1: data1[key],
        value2: data2[key],
      };
    }
    // Иначе значение не менялось, добавляем как есть.
    return {
      key,
      type: 'unChanged',
      value: data1[key],
    };
  });
  return result;
};

export default makeDifferenceTree;
