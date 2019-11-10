import fs from 'fs';
import _ from 'lodash';
import path from 'path';
import parsers from './parsers';

const genDiff = (pathToFile1, pathToFile2) => {
  const firstExtname = path.extname(pathToFile1);
  const firstFile = parsers(firstExtname)(fs.readFileSync(pathToFile1, 'utf8'));
  const secondExtname = path.extname(pathToFile2);
  const secondFile = parsers(secondExtname)(fs.readFileSync(pathToFile2, 'utf8'));

  const allKeys = [...new Set(Object.keys(firstFile).concat(Object.keys(secondFile)))];
  const result = allKeys.reduce((acc, key) => {
    if (_.has(firstFile, key) && _.has(secondFile, key)) {
      if (firstFile[key] === secondFile[key]) {
        return `  ${acc}${key}:${firstFile[key]}\n`;
      }
      return `${acc}- ${key}:${firstFile[key]}\n+ ${key}:${secondFile[key]}\n`;
    }
    if (_.has(firstFile, key)) {
      return `${acc}- ${key}: ${firstFile[key]}\n`;
    }
    if (_.has(secondFile, key)) {
      return `${acc}+ ${key}: ${secondFile[key]}\n`;
    }
    return acc;
  }, '');
  return `{\n${result}}`;
};
export default genDiff;
