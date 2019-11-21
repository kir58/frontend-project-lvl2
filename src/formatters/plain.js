import {
  deleted, added, updated, nested,
} from '../constants';

const getFullpath = (path, node) => [...path, node].join('.');
const getValue = (value) => (value instanceof Object ? '\'[complex value]\'' : `'${value}'`);

const renderPlain = (ast, path = []) => ast.reduce((acc, node) => {
  if (node.type === nested) {
    return `${acc}${renderPlain(node.children, [...path, node.name])}`;
  }
  if (node.type === updated) {
    return `${acc}\nProperty '${getFullpath(path, node.name)}' was updated. From ${getValue(node.deletedValue)} to ${getValue(node.addedValue)}`;
  }
  if (node.type === deleted) {
    return `${acc}\nProperty '${getFullpath(path, node.name)}' was removed`;
  }
  if (node.type === added) {
    return `${acc}\nProperty '${getFullpath(path, node.name)}' was added with value: ${getValue(node.value)}`;
  }
  return acc;
}, '');

export default renderPlain;
