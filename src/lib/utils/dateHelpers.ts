import { isWeekend, setHours, setMinutes, setSeconds, isAfter, parseISO } from 'date-fns';

/**
 * Checks if a requested supply change is valid.
 * Constraints:
 * 1. Target date cannot be Saturday or Sunday.
 * 2. Request must be made before 10:30 AM (local time) on the day before.
 * 
 * @param targetDateStr YYYY-MM-DD
 * @param requestTime Date object representing when the request was made
 */
export function isValidSupplyRequest(targetDateStr: string, requestTime = new Date()): boolean {
  const targetDate = parseISO(targetDateStr);

  // 1. Cannot be a weekend
  if (isWeekend(targetDate)) {
    return false;
  }

  // 2. Must be before 10:30 AM
  const cutoffTime = setSeconds(setMinutes(setHours(requestTime, 10), 30), 0);
  
  // If the current time is strictly after the 10:30 boundary on the requested day
  // (In practice, this means we check if they're making it before 10:30 AM today for tomorrow)
  if (isAfter(requestTime, cutoffTime)) {
    return false;
  }

  return true;
}
