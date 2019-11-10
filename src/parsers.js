import { safeLoad } from 'js-yaml';


const parsers = {
  '.json': JSON.parse,
  '.yaml': safeLoad,
};

export default (format) => parsers[format];
