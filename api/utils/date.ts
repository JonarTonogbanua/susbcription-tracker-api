import {
	format,
	setDate,
	getDaysInMonth,
	getTime,
	isBefore,
	addMonths,
} from "date-fns";

export const validRemindAt = (recurringEvery: number, force = false) => {
  const cutoff = setDate(new Date(), recurringEvery);
  const today = new Date();
  let currentMonthLastDay: number;
  let currentMonth: Date;

  if (isBefore(cutoff, today) || force) {
    const temp = addMonths(setDate(today, 1), 1);
    currentMonthLastDay = getDaysInMonth(temp);
    currentMonth = temp;
  } else {
    currentMonthLastDay = getDaysInMonth(today);
    currentMonth = today;
  }

  recurringEvery =
    recurringEvery > currentMonthLastDay
      ? currentMonthLastDay
      : recurringEvery;
  const newCutoff = getTime(currentMonth.setDate(recurringEvery));

  return newCutoff;
}