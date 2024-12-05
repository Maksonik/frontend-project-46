import readFile from './fileParser.js';
import buildDiff from './buildDiff.js';
import formatters from './formatters/index.js';

export default function generateDiff(filePath1, filePath2, formatType = 'stylish') {
  const data1 = readFile(filePath1);
  const data2 = readFile(filePath2);
  const diff = buildDiff(data1, data2);

  return formatters[formatType](diff);
}
