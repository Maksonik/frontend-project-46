function formatValue(value, depth) {
    if (value === null) {
      return 'null';
    }
    if (typeof value === 'object') {
      const indentSize = 4;
      const currentIndent = ' '.repeat(depth * indentSize);
      const nextIndent = ' '.repeat((depth + 1) * indentSize);
      const lines = Object.entries(value).map(([key, val]) => {
        return `${nextIndent}${key}: ${formatValue(val, depth + 1)}`;
      });
      return `{\n${lines.join('\n')}\n${currentIndent}}`;
    }
    if (typeof value === 'string') {
      return value; 
    }
    return String(value);
  }
  
  function formatStylish(diff, depth = 0) {
    const indentSize = 4;
    const currentIndent = ' '.repeat(depth * indentSize);
    const nextIndent = ' '.repeat((depth + 1) * indentSize);
    let lines = [];
  
    for (const [key, value] of Object.entries(diff)) {
      const { status } = value;
      let children;
      switch (status) {
        case 'added':
          lines.push(`${currentIndent}  + ${key}: ${formatValue(value.value, depth + 1)}`);
          break;
        case 'removed':
          lines.push(`${currentIndent}  - ${key}: ${formatValue(value.value, depth + 1)}`);
          break;
        case 'changed':
          lines.push(`${currentIndent}  - ${key}: ${formatValue(value.oldValue, depth + 1)}`);
          lines.push(`${currentIndent}  + ${key}: ${formatValue(value.newValue, depth + 1)}`);
          break;
        case 'nested':
          children = formatStylish(value.children, depth + 1);
          lines.push(`${currentIndent}    ${key}: {\n${children}\n${nextIndent}}`);
          break;
        case 'unchanged':
          lines.push(`${currentIndent}    ${key}: ${formatValue(value.value, depth + 1)}`);
          break;
      }
    }
  
    return lines.join('\n');
  }
  
  export default function stylish(diff) {
    return `{\n${formatStylish(diff)}\n}`;
  }