import moment from "moment";

export function getDateFromTimestamp(time: number) {
  const date = moment.unix(time).format("DD/MM/YYYY");

  return date;
}

export function getDayAndMonth(time: number) {
  const day = moment.unix(time).day();
  const month = moment.unix(time).month();

  return {
    day,
    month,
  };
}
