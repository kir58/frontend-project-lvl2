import {
  OLD, NEW, UNCHAGE, UPDATED, NESTED,
} from '../constants';

const NUMBER_OF_SPACE = 4;

const stringify = (data, depth) => {
  if (!(data instanceof Object)) {
    return data;
  }
  const tabStart = ' '.repeat((depth + 1) * NUMBER_OF_SPACE);
  const tabEnd = ' '.repeat(depth * NUMBER_OF_SPACE);

  const props = Object
    .keys(data)
    .map((key) => `${tabStart}${key}: ${stringify(data[key], depth + 1)}\n`)
    .join(',');
  return `{\n${props}${tabEnd}}`;
};

const render = (ast, depth = 1) => {
  const tab = ' '.repeat(depth * NUMBER_OF_SPACE);
  const tabChangeNode = ' '.repeat(depth * NUMBER_OF_SPACE - 2);
  const tabEnd = ' '.repeat((depth - 1) * NUMBER_OF_SPACE);

  const result = ast.reduce((acc, node) => {
    if (node.type === NESTED) {
      return `${acc}\n${tab}${node.name}: ${render(node.children, depth + 1)}`;
    }
    if (node.type === UNCHAGE) {
      return `${acc}\n${tab}${node.name}: ${stringify(node.value, depth)}`;
    }
    if (node.type === NEW) {
      return `${acc}\n${tabChangeNode}+ ${node.name}: ${stringify(node.value, depth)}`;
    }
    if (node.type === OLD) {
      return `${acc}\n${tabChangeNode}- ${node.name}: ${stringify(node.value, depth)}`;
    }
    if (node.type === UPDATED) {
      const newValue = `\n${tabChangeNode}+ ${node.name}: ${stringify(node.newValue, depth)}`;
      const oldValue = `\n${tabChangeNode}- ${node.name}: ${stringify(node.oldValue, depth)}`;
      return `${acc}${oldValue}${newValue}`;
    }
    return acc;
  }, '{');
  return `${result}\n${tabEnd}}`;
};
export default render;
