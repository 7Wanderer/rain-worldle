import GuessRow from './GuessRow';
import GuessHeader from './GuessHeader';

function GameBoard({ guesses }) {
  return (
    <div className="mt-4">
      <GuessHeader />
      {guesses.map((guess, index) => (
        <GuessRow key={index} guess={guess} />
      ))}
    </div>
  );
}

export default GameBoard;
