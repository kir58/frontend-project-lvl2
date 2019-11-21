import fs from 'fs';
import parse from './parse';
import buildAst from './ast';
import getRender from './formatters';
import getExtName from './utils/getExtName';

const genDiff = (pathToFile1, pathToFile2, format = 'txt') => {
  const firstExtname = getExtName(pathToFile1);
  const firstFile = parse(firstExtname)(fs.readFileSync(pathToFile1, 'utf8'));
  const secondExtname = getExtName(pathToFile2);
  const secondFile = parse(secondExtname)(fs.readFileSync(pathToFile2, 'utf8'));
  const ast = buildAst(firstFile, secondFile);
  return getRender(format)(ast);
};
export default genDiff;
