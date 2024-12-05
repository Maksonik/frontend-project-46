export default function buildDiff(data1, data2) {
  const keys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])].sort();
  const diff = {};

  keys.forEach((key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!(key in data1)) {
      diff[key] = { status: 'added', value: value2 };
    } else if (!(key in data2)) {
      diff[key] = { status: 'removed', value: value1 };
    } else if (value1 !== null && typeof value1 === 'object' && value2 !== null && typeof value2 === 'object') {
      // Рекурсивно строим различия для вложенных объектов
      diff[key] = { status: 'nested', children: buildDiff(value1, value2) };
    } else if (value1 !== value2) {
      diff[key] = { status: 'changed', oldValue: value1, newValue: value2 };
    } else {
      diff[key] = { status: 'unchanged', value: value1 };
    }
  });
  return diff;
}
