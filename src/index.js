import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parsers from './parsers';
import ast from './ast';
import render from './redner';

const genDiff = (pathToFile1, pathToFile2) => {
  const firstExtname = path.extname(pathToFile1);
  const firstFile = parsers(firstExtname)(fs.readFileSync(pathToFile1, 'utf8'));
  const secondExtname = path.extname(pathToFile2);
  const secondFile = parsers(secondExtname)(fs.readFileSync(pathToFile2, 'utf8'));
  const result = ast(firstFile, secondFile);
  return render(result);
};
export default genDiff;
