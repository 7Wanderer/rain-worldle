export function getColorClass(status) {
  switch (status) {
    case 'correct':
      return 'bg-green-500 text-white';
    case 'close':
    case 'partial':
      return 'bg-orange-400 text-white';
    case 'incorrect':
    default:
      return 'bg-gray-300 text-black';
  }
}
