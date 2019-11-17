import fs from 'fs';
import path from 'path';
import parsers from './parsers';
import buildAst from './ast';
import render from './formatters';

const genDiff = (pathToFile1, pathToFile2, format = 'txt') => {
  const firstExtname = path.extname(pathToFile1);
  const firstFile = parsers(firstExtname)(fs.readFileSync(pathToFile1, 'utf8'));
  const secondExtname = path.extname(pathToFile2);
  const secondFile = parsers(secondExtname)(fs.readFileSync(pathToFile2, 'utf8'));
  const ast = buildAst(firstFile, secondFile);
  return render(format)(ast);
};
export default genDiff;
