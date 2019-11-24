import {
  deleted, added, unchanged, updated, nested,
} from '../constants';

const buildTab = (count) => `${'  '.repeat(count * 2)}`;

const stringify = (data, depth) => {
  if (data instanceof Object) {
    const tabStart = buildTab(depth + 2);
    const tabEnd = buildTab(depth + 1);
    const props = Object
      .keys(data)
      .map((key) => `${tabStart}${key}: ${stringify(data[key], depth + 1)}`)
      .join(', ');
    return `{\n${props}\n${tabEnd}}`;
  }
  return data;
};

const render = (ast, depth = 0) => {
  const tab = buildTab(depth);

  const buildsNode = {
    [nested]: (node) => `${tab}    ${node.name}: ${render(node.children, depth + 1)}`,
    [unchanged]: (node) => `${tab}    ${node.name}: ${stringify(node.value, depth)}`,
    [added]: (node) => `${tab}  + ${node.name}: ${stringify(node.value, depth)}`,
    [deleted]: (node) => `${tab}  - ${node.name}: ${stringify(node.value, depth)}`,
    [updated]: (node) => [`${tab}  - ${node.name}: ${stringify(node.deletedValue, depth)}`,
      `${tab}  + ${node.name}: ${stringify(node.addedValue, depth)}`].join('\n'),
  };

  const result = ast.map((node) => {
    const buildNode = buildsNode[node.type];
    return buildNode(node);
  }).join('\n');
  return `{\n${result}\n${tab}}`;
};
export default render;
