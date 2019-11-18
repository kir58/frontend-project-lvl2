import rendnerDefault from './rednerDefault';
import renderPlain from './plain';

const renders = {
  txt: rendnerDefault,
  plain: renderPlain,
  json: JSON.stringify,
};

export default (format) => {
  const render = renders[format];
  if (!render) {
    throw new Error('invalid format');
  }
  return render;
};
