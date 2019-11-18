import {
  OLD, NEW, UPDATED, NESTED,
} from '../constants';

const getFullpath = (path, node) => [...path, node].join('.');
const getValue = (value) => (value instanceof Object ? '\'[complex value]\'' : `'${value}'`);

const renderPlain = (ast, path = []) => ast.reduce((acc, node) => {
  if (node.type === NESTED) {
    return `${acc}${renderPlain(node.children, [...path, node.name])}`;
  }
  if (node.type === UPDATED) {
    return `${acc}\nProperty '${getFullpath(path, node.name)}' was updated. From ${getValue(node.oldValue)} to ${getValue(node.newValue)}`;
  }
  if (node.type === OLD) {
    return `${acc}\nProperty '${getFullpath(path, node.name)}' was removed`;
  }
  if (node.type === NEW) {
    return `${acc}\nProperty '${getFullpath(path, node.name)}' was added with value: ${getValue(node.value)}`;
  }
  return acc;
}, '');

export default renderPlain;
