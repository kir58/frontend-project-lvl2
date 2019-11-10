import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const beforeJson = path.join(__dirname, '__fixtures__/before.json');
const afterJson = path.join(__dirname, '__fixtures__/after.json');

const beforeYaml = path.join(__dirname, '__fixtures__/before.yaml');
const afterYaml = path.join(__dirname, '__fixtures__/after.yaml');

const beforeIni = path.join(__dirname, '__fixtures__/before.ini');
const afterIni = path.join(__dirname, '__fixtures__/after.ini');

const resultJson = path.join(__dirname, '__fixtures__/resultJson.txt');

const result = fs.readFileSync(resultJson, 'utf8');
test('genDiff', () => {
  expect(genDiff(beforeJson, afterJson)).toBe(result);
  expect(genDiff(beforeYaml, afterYaml)).toBe(result);
  expect(genDiff(beforeIni, afterIni)).toBe(result);
});
