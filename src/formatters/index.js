import rendnerDefault from './rednerDefault';
import renderPlain from './plain';

const renders = {
  txt: rendnerDefault,
  plain: renderPlain,
};

export default (format) => {
  return renders[format];
};
