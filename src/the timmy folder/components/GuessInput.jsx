import { useState } from 'react';

function GuessInput({ options, onGuess, disabled }) {
  const [input, setInput] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);

  // Filter strikers based on user input
  const filteredOptions = options.filter((item) =>
    item.Name.toLowerCase().includes(input.toLowerCase())
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    onGuess(input);
    setInput('');
    setShowDropdown(false);
  };

  const handleSelect = (name) => {
    setInput(name);
    onGuess(name);
    setShowDropdown(false);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 relative">
      <input
        type="text"
        value={input}
        onChange={(e) => {
          setInput(e.target.value);
          setShowDropdown(true);
        }}
        disabled={disabled}
        className="border px-2 py-1 rounded w-full"
        placeholder="Enter a name..."
        autoComplete="off"
      />

      {/* Custom dropdown */}
      {showDropdown &&
        input.trim() !== '' &&
        filteredOptions.length > 0 &&
        !disabled && (
          <ul
            style={{ listStyleType: 'none' }}
            className="absolute z-10 bg-white border border-gray-300 rounded mt-1 w-full max-h-40 overflow-y-auto shadow list-none p-0"
          >
            {filteredOptions.slice(0, 10).map((item) => (
              <li
                key={item.Name}
                onClick={() => handleSelect(item.Name)}
                className="px-2 py-1 hover:bg-blue-100 cursor-pointer"
              >
                {item.Name}
              </li>
            ))}
          </ul>
        )}

      <button
        type="submit"
        className="mt-2 bg-blue-500 text-white px-3 py-1 rounded w-full"
        disabled={disabled}
      >
        Guess
      </button>
    </form>
  );
}

export default GuessInput;
