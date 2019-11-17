import {
  OLD, NEW, UNCHAGE, UPDATE, NESTED,
} from '../constants';

const stringify = (obj, depth) => {
  if (!(obj instanceof Object)) {
    return obj;
  }
  const spaceBefore = ' '.repeat((depth + 1) * 4);
  const spaceAfter = ' '.repeat(depth * 4);
  const props = Object
    .keys(obj)
    .map((key) => `${spaceBefore}${key}: ${stringify(obj[key], depth + 1)}\n`)
    .join(',');
  return `{\n${props}${spaceAfter}}`;
};

const render = (ast, depth = 1) => {
  const space = ' '.repeat(depth * 4);
  const spaceChange = ' '.repeat(depth * 4 - 2);
  const startSpace = ' '.repeat((depth - 1) * 4);

  const result = ast.reduce((acc, node) => {
    if (node.type === NESTED) {
      return `${acc}\n${space}${node.name}: ${render(node.children, depth + 1)}`;
    }
    if (node.type === UNCHAGE) {
      return `${acc}\n${space}${node.name}: ${stringify(node.value, depth)}`;
    }
    if (node.type === NEW) {
      return `${acc}\n${spaceChange}+ ${node.name}: ${stringify(node.value, depth)}`;
    }
    if (node.type === OLD) {
      return `${acc}\n${spaceChange}- ${node.name}: ${stringify(node.value, depth)}`;
    }
    if (node.type === UPDATE) {
      const newValue = `\n${spaceChange}+ ${node.name}: ${stringify(node.newValue, depth)}`;
      const oldValue = `\n${spaceChange}- ${node.name}: ${stringify(node.oldValue, depth)}`;
      return `${acc}${oldValue}${newValue}`;
    }
    return acc;
  }, '{');
  return `${result}\n${startSpace}}`;
};
export default render;
