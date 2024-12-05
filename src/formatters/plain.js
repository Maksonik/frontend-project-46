import formatValue from '../formatValue.js';

export default function plain(diff, parent = '') {
  const lines = Object.entries(diff).map(([key, value]) => {
    const status = value.status;
    const fullKey = parent ? `${parent}.${key}` : key;

    switch (status) {
      case 'added':
        return `Property '${fullKey}' was added with value: ${formatValue(value.value)}`;
      case 'removed':
        return `Property '${fullKey}' was removed`;
      case 'changed':
        return `Property '${fullKey}' was updated. From ${formatValue(value.oldValue)} to ${formatValue(value.newValue)}`;
      case 'nested':
        return plain(value.children, fullKey);
      default:
        return '';
    }
  });

  return lines.filter(Boolean).join('\n');
}
