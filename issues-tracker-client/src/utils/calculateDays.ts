import { DateTime } from 'luxon';

export const calculateDaysFunc = (dueDate: string) => {
    if (!dueDate) return {}

    const deadline = DateTime.fromISO(dueDate);
    const todaysDate = DateTime.now();
  
    const formattedDeadline = deadline.toFormat('cccc, LLLL d, yyyy');
  
    const differenceInDays = deadline.diff(todaysDate, 'days').toObject().days;
  
    return { differenceInDays, formattedDeadline };
}