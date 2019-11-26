import rendnerTxt from './txt';
import renderPlain from './plain';

const renders = {
  txt: rendnerTxt,
  plain: renderPlain,
  json: JSON.stringify,
};

export default (format) => {
  const render = renders[format];
  if (!render) {
    throw new Error(`${format} is invalid format`);
  }
  return render;
};
