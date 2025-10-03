export function getDailyAnswerIndex(listLength, date = new Date()) {
  const dateStr = date.toISOString().split('T')[0]; // e.g., '2025-10-01'
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0; // Convert to 32bit integer
  }
  return Math.abs(hash) % listLength;
}
/* usage 
 const index = getDailyAnswerIndex(strikerList.length);
const dailyAnswer = strikerList[index];
*/
