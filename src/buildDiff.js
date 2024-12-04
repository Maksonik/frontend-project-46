export default function buildDiff(data1, data2) {
    const keys = [...new Set([...Object.keys(data1), ...Object.keys(data2)])].sort();
    const diff = {};
  
    keys.forEach((key) => {
      if (!(key in data1)) {
        diff[key] = { status: 'added', value: data2[key] };
      } else if (!(key in data2)) {
        diff[key] = { status: 'removed', value: data1[key] };
      } else if (typeof data1[key] === 'object' && typeof data2[key] === 'object') {
        diff[key] = { status: 'nested', children: buildDiff(data1[key], data2[key]) };
      } else if (data1[key] !== data2[key]) {
        diff[key] = { status: 'changed', oldValue: data1[key], newValue: data2[key] };
      } else {
        diff[key] = { status: 'unchanged', value: data1[key] };
      }
    });
  
    return diff;
  }