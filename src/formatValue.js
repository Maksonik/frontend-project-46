export default function formatValue(value) {
    if ( value === null) {
        return 'null'
    }
    if (typeof value === 'object') {
      return '[complex value]';
    }
    if (typeof value === 'string') {
      return `'${value}'`;
    }
    return String(value);
  }