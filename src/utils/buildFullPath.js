
import path from 'path';

export default (filePath) => path.join(process.cwd(), '__tests__/__fixtures__', filePath);
