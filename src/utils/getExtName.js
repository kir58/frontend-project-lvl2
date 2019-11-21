import path from 'path';

export default (filePath) => path.extname(filePath).slice(1);
