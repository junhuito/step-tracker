export const localeStringOptions = {
  timeZone: "Asia/Kuala_Lumpur",
  hour12: false,
  year: "numeric",
  month: "2-digit",
  day: "2-digit",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
};

export type IDayName = "Mon" | "Tue" | "Wed" | "Thu" | "Fri" | "Sat" | "Sun" | "";

export enum DayCode {
  Monday = 1,
  Tuesday = 2,
  Wednesday = 3,
  Thursday = 4,
  Friday = 5,
  Saturday = 6,
  Sunday = 7,
  Sunday2 = 0,
}

export function getTodayDayName(offSet: number = 8): IDayName {
  const nowInGMT8 = new Date();
  nowInGMT8.setUTCHours(nowInGMT8.getUTCHours() + offSet);
  return getDayName(nowInGMT8.getDay());
}
  
export function getDayName(day: number): IDayName {
  switch (day) {
    case DayCode.Monday:
      return "Mon";
    case DayCode.Tuesday:
      return "Tue";
    case DayCode.Wednesday:
      return "Wed";
    case DayCode.Thursday:
      return "Thu";
    case DayCode.Friday:
      return "Fri";
    case DayCode.Saturday:
      return "Sat";
    case DayCode.Sunday:
    case DayCode.Sunday2:
      return "Sun";
    default:
      return "";
  }
}

export function getDateBefore(numOfDay:number = 0): string {
  const now = new Date();
  now.setDate(now.getDate() - numOfDay);

  const prepareDate = now.toLocaleString("en-US", {
    timeZone: "Asia/Kuala_Lumpur",
    hour12: false,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  const [date,] = prepareDate.split(',');
  const [month, day, year] = date.split('/');
  const resetDateTimeToDayStart = `${year}-${month}-${day}T00:00:00.000Z`;
  return resetDateTimeToDayStart;
}