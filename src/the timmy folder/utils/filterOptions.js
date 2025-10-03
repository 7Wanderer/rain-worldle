export function filterOptions(input, list) {
  return list.filter((item) =>
    item.name.toLowerCase().includes(input.toLowerCase())
  );
}
