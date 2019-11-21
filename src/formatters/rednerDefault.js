import {
  deleted, added, unchanged, updated, nested,
} from '../constants';

const tabSize = 4;

const stringify = (data, depth) => {
  if (!(data instanceof Object)) {
    return data;
  }
  const tabStart = ' '.repeat((depth + 1) * tabSize);
  const tabEnd = ' '.repeat(depth * tabSize);

  const props = Object
    .keys(data)
    .map((key) => `${tabStart}${key}: ${stringify(data[key], depth + 1)}\n`)
    .join(',');
  return `{\n${props}${tabEnd}}`;
};

const render = (ast, depth = 1) => {
  const tab = ' '.repeat(depth * tabSize);
  const tabChangeNode = ' '.repeat(depth * tabSize - 2);
  const tabEnd = ' '.repeat((depth - 1) * tabSize);

  const result = ast.reduce((acc, node) => {
    if (node.type === nested) {
      return `${acc}\n${tab}${node.name}: ${render(node.children, depth + 1)}`;
    }
    if (node.type === unchanged) {
      return `${acc}\n${tab}${node.name}: ${stringify(node.value, depth)}`;
    }
    if (node.type === added) {
      return `${acc}\n${tabChangeNode}+ ${node.name}: ${stringify(node.value, depth)}`;
    }
    if (node.type === deleted) {
      return `${acc}\n${tabChangeNode}- ${node.name}: ${stringify(node.value, depth)}`;
    }
    if (node.type === updated) {
      const addedValue = `\n${tabChangeNode}+ ${node.name}: ${stringify(node.addedValue, depth)}`;
      const deletedValue = `\n${tabChangeNode}- ${node.name}: ${stringify(node.deletedValue, depth)}`;
      return `${acc}${deletedValue}${addedValue}`;
    }
    return acc;
  }, '{');
  return `${result}\n${tabEnd}}`;
};
export default render;
