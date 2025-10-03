function GuessHeader() {
  const labels = [
    'Name',
    'Cost',
    'Stagger',
    'Power',
    'Speed',
    'Height',
    'Birthday',
    'Team',
  ];
  return (
    <div className="flex flex-row justify-between items-center gap-4 px-4 py-2 bg-gray-200 text-sm font-semibold">
      {labels.map((label) => (
        <div key={label} className="w-24 text-center">
          {label}
        </div>
      ))}
    </div>
  );
}

export default GuessHeader;
