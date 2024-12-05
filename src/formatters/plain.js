import formatValue from '../formatValue.js';

export default function plain(diff, parent = '') {
    const lines = Object.entries(diff).map(([key, value]) => {
      const { status, ...rest } = value;
      const fullKey = parent ? `${parent}.${key}` : key;
  
      switch (status) {
        case 'added':
          return `Property '${fullKey}' was added with value: ${formatValue(rest.value)}`;
        case 'removed':
          return `Property '${fullKey}' was removed`;
        case 'changed':
          return `Property '${fullKey}' was updated. From ${formatValue(rest.oldValue)} to ${formatValue(rest.newValue)}`;
        case 'nested':
          return plain(rest.children, fullKey);
        default:
          return '';
      }
    });
  
    return lines.filter(Boolean).join('\n');
  }