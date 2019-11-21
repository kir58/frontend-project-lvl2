import fs from 'fs';
import buildFixturePath from '../src/utils/buildFixturePath';
import genDiff from '../src';

const beforeJson = buildFixturePath('before.json');
const afterJson = buildFixturePath('after.json');

const beforeYaml = buildFixturePath('before.yaml');
const afterYaml = buildFixturePath('after.yaml');

const beforeIni = buildFixturePath('before.ini');
const afterIni = buildFixturePath('after.ini');
const resultDefault = fs.readFileSync(buildFixturePath('resultDefault.txt'), 'utf8');
const resultPlain = fs.readFileSync(buildFixturePath('resultPlain.txt'), 'utf8');
const resultJSON = fs.readFileSync(buildFixturePath('resultJson.json'), 'utf8');

test('genDiff default format', () => {
  expect(genDiff(beforeJson, afterJson)).toBe(resultDefault);
  expect(genDiff(beforeYaml, afterYaml)).toBe(resultDefault);
  expect(genDiff(beforeIni, afterIni)).toBe(resultDefault);
});
test('genDiff inputs formats', () => {
  expect(genDiff(beforeIni, afterIni, 'json')).toBe(resultJSON);
  expect(genDiff(beforeIni, afterIni, 'plain')).toBe(resultPlain);
});
