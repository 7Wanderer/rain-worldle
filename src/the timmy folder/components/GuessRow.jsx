import { getColorClass } from '../utils/colourMap';

function GuessRow({ guess }) {
  const { data, result } = guess;

  return (
    <div className="grid grid-cols-8 gap-2 mb-2 text-sm">
      <Tile value={data.Name} status={result.name ? 'correct' : 'incorrect'} />
      <Tile value={data.Cost} status={result.Cost} />
      <Tile value={data.Stagger} status={result.Stagger} />
      <Tile value={data.Power} status={result.Power} />
      <Tile value={data.Speed} status={result.Speed} />
      <Tile value={data.Height} status={result.Height} />
      <BirthdayTile value={data.Birthday} result={result.Birthday} />
      <Tile value={data.Team} status={result.Team} />
    </div>
  );
}

function Tile({ value, status }) {
  return (
    <div className={`rounded p-2 text-center ${getColorClass(status)}`}>
      {value}
    </div>
  );
}

function BirthdayTile({ value, result }) {
  const arrow =
    result?.direction === 'up'
      ? '⬆️'
      : result?.direction === 'down'
      ? '⬇️'
      : '';
  return (
    <div className={`rounded p-2 text-center ${getColorClass(result?.status)}`}>
      {value} {arrow}
    </div>
  );
}

export default GuessRow;
