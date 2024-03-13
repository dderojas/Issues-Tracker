import { DateTime } from 'luxon';

export const calculateDaysFunc = (dueDate: string) => {
  // let todaysDate = new Date()
  // let deadline = new Date(dueDate);
  // console.log(new Date(), 'DATE??????')
  // // console.log('DueDate:', dueDate, 'Todays Date:', todaysDate, 'Deadline:', deadline)
  // let formattedDeadline = deadline.toDateString()

  // let differenceInTime = deadline.getTime() - todaysDate.getTime();
  // let differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));

  // return { differenceInDays, formattedDeadline }

    // Convert the input dueDate string to a Luxon DateTime object
    const deadline = DateTime.fromISO(dueDate);

    // Get the current date and time using Luxon
    const todaysDate = DateTime.now();
  
    // Format the deadline to a string representation
    const formattedDeadline = deadline.toFormat('cccc, LLLL d, yyyy');
  
    // Calculate the difference in days
    const differenceInDays = deadline.diff(todaysDate, 'days').toObject().days;
  
    return { differenceInDays, formattedDeadline };
}