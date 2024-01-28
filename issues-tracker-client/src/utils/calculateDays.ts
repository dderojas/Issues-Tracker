export const calculateDaysFunc = (dueDate: string) => {
  let todaysDate = new Date()
  let deadline = new Date(dueDate);
  let formattedDeadline = deadline.toDateString()

  let differenceInTime = deadline.getTime() - todaysDate.getTime();
  let differenceInDays = Math.round(differenceInTime / (1000 * 3600 * 24));

  return { differenceInDays, formattedDeadline }
}