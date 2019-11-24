import fs from 'fs';
import getParser from './parse';
import buildDiffAst from './ast';
import getRender from './formatters';
import getExtName from './utils/getExtName';

const parseFile = (path) => {
  const extname = getExtName(path);
  const parse = getParser(extname);
  const data = fs.readFileSync(path, 'utf8');
  return parse(data);
};

const genDiff = (path1, path2, format = 'txt') => {
  const obj1 = parseFile(path1);
  const obj2 = parseFile(path2);
  const diffAst = buildDiffAst(obj1, obj2);
  return getRender(format)(diffAst);
};
export default genDiff;
