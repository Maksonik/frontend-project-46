export default function buildDiff(data1, data2) {
    const keys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])];
    const sortedKeys = keys.slice().sort();
    const diff = sortedKeys.reduce((acc, key) => {
      const value1 = data1[key];
      const value2 = data2[key];
  
      if (!(key in data1)) {
        acc[key] = { status: 'added', value: value2 };
      } else if (!(key in data2)) {
        acc[key] = { status: 'removed', value: value1 };
      } else if (value1 !== null && typeof value1 === 'object' && value2 !== null && typeof value2 === 'object') {
        acc[key] = { status: 'nested', children: buildDiff(value1, value2) };
      } else if (value1 !== value2) {
        acc[key] = { status: 'changed', oldValue: value1, newValue: value2 };
      } else {
        acc[key] = { status: 'unchanged', value: value1 };
      }
  
      return acc;
    }, {});
    return diff;
  }
  