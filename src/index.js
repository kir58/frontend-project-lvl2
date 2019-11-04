import fs from 'fs';
import _ from 'lodash';

const genDiff = (pathToFile1, pathToFile2) => {
  const firstFile = JSON.parse(fs.readFileSync(pathToFile1));
  const secondFile = JSON.parse(fs.readFileSync(pathToFile2));
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
  return `{ \n${result}}`;
};
export default genDiff;
