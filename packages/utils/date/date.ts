import moment from "moment";

const getDateFromNow = (date: Date) => {
  const serverDate = moment(date);
  const relativeTime = serverDate.fromNow();
  return relativeTime;
};

export { getDateFromNow };
