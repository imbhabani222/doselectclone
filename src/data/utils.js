import clsx from "clsx";
import moment from "moment";

export const getDuration = (seconds, addZero) => {
  const duration = moment.duration(seconds * 1000);
  if (addZero) {
    return {
      hours: ("0" + duration.hours()).substr(-2),
      minutes: ("0" + duration.minutes()).substr(-2),
      seconds: ("0" + duration.seconds()).substr(-2)
    };
  } else {
    return {
      hours: duration.hours(),
      minutes: duration.minutes(),
      seconds: duration.seconds()
    };
  }
};

export const formatDateTime = (date) => {
  const _date = moment(date);
  return {
    date: _date.format("DD MMM YYYY"),
    time: _date.format("h:MM A")
  };
};

export const getTimeDiff = (time) => {
  const currentTime = moment().valueOf();
  return (time - currentTime) / 1000;
};
export const stringFiller = (str, data) => {
  Object.keys(data).forEach((key) => (str = str.replace(`%${key}%`, data[key])));
  return str;
};
