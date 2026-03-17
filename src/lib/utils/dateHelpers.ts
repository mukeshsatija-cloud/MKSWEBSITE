import { isWeekend, setHours, setMinutes, setSeconds, isAfter, isBefore, addDays, startOfDay } from 'date-fns';

/**
 * Validates supply change requests.
 * Rule 1: No requests on Sat & Sun.
 * Rule 2: Next day supply changes must be made before 10:30 AM of the previous day.
 */
export function isValidSupplyRequest(currentTime = new Date()): { isValid: boolean; reason?: string } {
  // 1. No requests on Sat & Sun
  if (isWeekend(currentTime)) {
    return { 
      isValid: false, 
      reason: 'Support office is closed on weekends. No requests accepted on Saturday or Sunday.' 
    };
  }

  // 2. Before 10:30 AM cutoff
  const cutoffTime = setSeconds(setMinutes(setHours(startOfDay(currentTime), 10), 30), 0);
  
  if (isAfter(currentTime, cutoffTime)) {
    return { 
      isValid: false, 
      reason: 'Daily cutoff time (10:30 AM) has passed. Requests must be placed earlier for next-day delivery.' 
    };
  }

  return { isValid: true };
}
