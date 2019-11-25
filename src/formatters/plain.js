import {
  deleted, added, updated, nested, unchanged,
} from '../constants';

const getFullpath = (path, node) => [...path, node].join('.');
const getValue = (value) => (value instanceof Object ? '\'[complex value]\'' : `'${value}'`);

const renderPlain = (ast, path = []) => {
  const buildsNode = {
    [nested]: (item) => renderPlain(item.children, [...path, item.name]),
    [added]: (item) => `Property '${getFullpath(path, item.name)}' was added with value: ${getValue(item.value)}`,
    [deleted]: (item) => `Property '${getFullpath(path, item.name)}' was removed`,
    [updated]: (item) => `Property '${getFullpath(path, item.name)}' was updated. From ${getValue(item.deletedValue)} to ${getValue(item.addedValue)}`,
  };
  return ast
    .filter((node) => node.type !== unchanged)
    .map((node) => {
      const buildNode = buildsNode[node.type];
      return buildNode(node);
    }).join('\n');
}
export default renderPlain;
