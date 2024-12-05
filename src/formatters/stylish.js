function formatValue(value, depth) {
  if (value === null) {
    return 'null';
  }
  if (typeof value === 'object') {
    const indentSize = 4;
    const currentIndent = ' '.repeat(depth * indentSize);
    const nextIndent = ' '.repeat((depth + 1) * indentSize);
    const lines = Object.entries(value).map(([key, val]) => `${nextIndent}${key}: ${formatValue(val, depth + 1)}`);
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

  return Object.entries(diff)
    .map(([key, value]) => {
      const { status } = value;
      const children = status === 'nested' ? formatStylish(value.children, depth + 1) : undefined;

      switch (status) {
        case 'added':
          return `${currentIndent}  + ${key}: ${formatValue(value.value, depth + 1)}`;
        case 'removed':
          return `${currentIndent}  - ${key}: ${formatValue(value.value, depth + 1)}`;
        case 'changed':
          return [
            `${currentIndent}  - ${key}: ${formatValue(value.oldValue, depth + 1)}`,
            `${currentIndent}  + ${key}: ${formatValue(value.newValue, depth + 1)}`,
          ];
        case 'nested':
          return `${currentIndent}    ${key}: {\n${children}\n${nextIndent}}`;
        case 'unchanged':
          return `${currentIndent}    ${key}: ${formatValue(value.value, depth + 1)}`;
        default:
          console.warn(`Unknown status: ${status}`);
          return '';
      }
    })
    .flat()
    .filter(Boolean)
    .join('\n');
}

export default function stylish(diff) {
  return `{\n${formatStylish(diff)}\n}`;
}
