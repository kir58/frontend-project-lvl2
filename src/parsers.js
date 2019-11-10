import { safeLoad } from 'js-yaml';
import { parse } from 'ini';


const parsers = {
  '.json': JSON.parse,
  '.yaml': safeLoad,
  '.ini': parse,
};

export default (format) => parsers[format];
