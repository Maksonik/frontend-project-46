export default function buildDiff(data1, data2) {
  const keys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])];

  const sortedKeys = keys.reduce((acc, key) => {
    let inserted = false;
    for (let i = 0; i < acc.length; i++) {
      if (key < acc[i]) {
        acc.splice(i, 0, key);
        inserted = true;
        break;
      }
    }
    if (!inserted) acc.push(key);
    return acc;
  }, []);

  const diff = sortedKeys.reduce((acc, key) => {
    const value1 = data1[key];
    const value2 = data2[key];

    if (!(key in data1)) {
      return { ...acc, [key]: { status: 'added', value: value2 } };
    } if (!(key in data2)) {
      return { ...acc, [key]: { status: 'removed', value: value1 } };
    } if (value1 !== null && typeof value1 === 'object' && value2 !== null && typeof value2 === 'object') {
      return { ...acc, [key]: { status: 'nested', children: buildDiff(value1, value2) } };
    } if (value1 !== value2) {
      return { ...acc, [key]: { status: 'changed', oldValue: value1, newValue: value2 } };
    }
    return { ...acc, [key]: { status: 'unchanged', value: value1 } };
  }, {});
  return diff;
}
