import fs from 'fs';
import getParser from './parse';
import buildAst from './ast';
import getRender from './formatters';
import getExtName from './utils/getExtName';

const genDiff = (pathToFile1, pathToFile2, format = 'txt') => {
  const extname1 = getExtName(pathToFile1);
  const file1 = getParser(extname1)(fs.readFileSync(pathToFile1, 'utf8'));
  const extname2 = getExtName(pathToFile2);
  const file2 = getParser(extname2)(fs.readFileSync(pathToFile2, 'utf8'));
  const ast = buildAst(file1, file2);
  return getRender(format)(ast);
};
export default genDiff;
