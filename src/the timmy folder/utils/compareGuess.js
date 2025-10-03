export function compareGuess(guess, answer) {
  return {
    name: guess.Name === answer.Name,
    generation: compareNumber(guess.Cost, answer.Cost),
    types: compareStaggerNumber(guess.Stagger, answer.Stagger),
    height: compareStatsNumber(guess.Power, answer.Power),
    weight: compareStatsNumber(guess.Speed, answer.Speed),
    baseStats: compareHeightNumber(guess.Height, answer.Height),
    birthday: compareBirthday(guess.Birthday, answer.Birthday),
    team: compareSimple(guess.Team, answer.Team),
  };
}

// Simple string/enum check
function compareSimple(a, b) {
  return a === b ? 'correct' : 'incorrect';
}

// Cost - up to 20000 difference
function compareNumber(guess, answer) {
  if (guess === answer) return 'correct';
  const diff = Math.abs(guess - answer);
  if (diff <= 20000) return 'close';
  return 'incorrect';
}

// Power / Speed - up to 5 difference
function compareStatsNumber(guess, answer) {
  if (guess === answer) return 'correct';
  const diff = Math.abs(guess - answer);
  if (diff <= 5) return 'close';
  return 'incorrect';
}

// Height - up to 15 difference
function compareHeightNumber(guess, answer) {
  if (guess === answer) return 'correct';
  const diff = Math.abs(guess - answer);
  if (diff <= 15) return 'close';
  return 'incorrect';
}

// Stagger - up to 100 difference
function compareStaggerNumber(guess, answer) {
  if (guess === answer) return 'correct';
  const diff = Math.abs(guess - answer);
  if (diff <= 100) return 'close';
  return 'incorrect';
}

// Birthday comparison with direction and closeness
function compareBirthday(guessDateStr, answerDateStr) {
  const guess = new Date(guessDateStr);
  const answer = new Date(answerDateStr);

  const guessMonth = guess.getMonth(); // 0-11
  const guessDay = guess.getDate();

  const answerMonth = answer.getMonth();
  const answerDay = answer.getDate();

  if (guessMonth === answerMonth && guessDay === answerDay) {
    return { status: 'correct', direction: null };
  }

  const guessDOY = getDayOfYear(guess);
  const answerDOY = getDayOfYear(answer);
  const diff = guessDOY - answerDOY;

  if (Math.abs(diff) <= 30) {
    return {
      status: 'close',
      direction: diff < 0 ? 'up' : 'down',
    };
  }

  return {
    status: 'incorrect',
    direction: diff < 0 ? 'up' : 'down',
  };
}

function getDayOfYear(date) {
  const start = new Date(date.getFullYear(), 0, 0);
  const diff =
    date -
    start +
    (start.getTimezoneOffset() - date.getTimezoneOffset()) * 60 * 1000;
  return Math.floor(diff / (1000 * 60 * 60 * 24));
}
