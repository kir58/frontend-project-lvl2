import fs from 'fs';
import buildFullPath from '../src/utils/buildFullPath';
import genDiff from '../src';

const beforeJson = buildFullPath('before.json');
const afterJson = buildFullPath('after.json');

const beforeYaml = buildFullPath('before.yaml');
const afterYaml = buildFullPath('after.yaml');

const beforeIni = buildFullPath('before.ini');
const afterIni = buildFullPath('after.ini');
const resultDefault = fs.readFileSync(buildFullPath('resultDefault.txt'), 'utf8');
const resultPlain = fs.readFileSync(buildFullPath('resultPlain.txt'), 'utf8');
const resultJSON = fs.readFileSync(buildFullPath('resultJson.json'), 'utf8');

test('genDiff default format', () => {
  expect(genDiff(beforeJson, afterJson)).toBe(resultDefault);
  expect(genDiff(beforeYaml, afterYaml)).toBe(resultDefault);
  expect(genDiff(beforeIni, afterIni)).toBe(resultDefault);
});
test('genDiff inputs formats', () => {
  expect(genDiff(beforeIni, afterIni, 'json')).toBe(resultJSON);
  expect(genDiff(beforeIni, afterIni, 'plain')).toBe(resultPlain);
});
