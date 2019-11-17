import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const beforeJson = path.join(__dirname, '__fixtures__/before.json');
const afterJson = path.join(__dirname, '__fixtures__/after.json');

const beforeYaml = path.join(__dirname, '__fixtures__/before.yaml');
const afterYaml = path.join(__dirname, '__fixtures__/after.yaml');

const beforeIni = path.join(__dirname, '__fixtures__/before.ini');
const afterIni = path.join(__dirname, '__fixtures__/after.ini');

const resultDefault = fs.readFileSync(path.join(__dirname, '__fixtures__/resultDefault.txt'), 'utf8');
const resultPlain = fs.readFileSync(path.join(__dirname, '__fixtures__/resultPlain.txt'), 'utf8');

test('genDiff', () => {
  expect(genDiff(beforeIni, afterIni, 'plain')).toBe(resultPlain);
  expect(genDiff(beforeJson, afterJson)).toBe(resultDefault);
  expect(genDiff(beforeYaml, afterYaml)).toBe(resultDefault);
  expect(genDiff(beforeIni, afterIni)).toBe(resultDefault);
});
