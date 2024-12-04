export default function stylish(diff, depth = 0) {
    const indent = '    '.repeat(depth);
    const lines = Object.entries(diff).map(([key, value]) => {
      const { status, ...rest } = value;
      const getValue = (val, d) => (typeof val === 'object' ? stylish(val, d + 1) : JSON.stringify(val));
  
      switch (status) {
        case 'added':
          return `${indent}  + ${key}: ${getValue(rest.value, depth + 1)}`;
        case 'removed':
          return `${indent}  - ${key}: ${getValue(rest.value, depth + 1)}`;
        case 'changed':
          return [
            `${indent}  - ${key}: ${getValue(rest.oldValue, depth + 1)}`,
            `${indent}  + ${key}: ${getValue(rest.newValue, depth + 1)}`,
          ].join('\n');
        case 'nested':
          return `${indent}    ${key}: {\n${stylish(rest.children, depth + 1)}\n${indent}    }`;
        case 'unchanged':
          return `${indent}    ${key}: ${getValue(rest.value, depth + 1)}`;
        default:
          return '';
      }
    });
  
    return lines.join('\n');
  }