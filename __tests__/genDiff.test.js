import fs from 'fs';
import path from 'path';
import genDiff from '../src';

const buildFixturePath = (filePath) => path.join(process.cwd(), '__tests__', '__fixtures__', filePath);

const beforeJson = buildFixturePath('before.json');
const afterJson = buildFixturePath('after.json');

const beforeYaml = buildFixturePath('before.yaml');
const afterYaml = buildFixturePath('after.yaml');

const beforeIni = buildFixturePath('before.ini');
const afterIni = buildFixturePath('after.ini');

let resultDefault;
let resultJson;
let resultPlain;

beforeAll(() => {
  resultPlain = fs.readFileSync(buildFixturePath('resultPlain.txt'), 'utf8');
  resultJson = fs.readFileSync(buildFixturePath('resultJson.json'), 'utf8');
  resultDefault = fs.readFileSync(buildFixturePath('resultTxt.txt'), 'utf8');
});


test('genDiff default format', () => {
  expect(genDiff(beforeJson, afterJson)).toBe(resultDefault);
  expect(genDiff(beforeYaml, afterYaml)).toBe(resultDefault);
  expect(genDiff(beforeIni, afterIni)).toBe(resultDefault);
});
test('genDiff inputs formats', () => {
  expect(genDiff(beforeIni, afterIni, 'json')).toBe(resultJson);
  expect(genDiff(beforeIni, afterIni, 'plain')).toBe(resultPlain);
});
