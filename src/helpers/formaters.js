import moment from "moment";
moment.locale("pt-br");

export default {
  date: (date) => {
    return new Date(date)
      .toISOString()
      .replace(/T.*/, "")
      .split("-")
      .reverse()
      .join("/"); //moment(date).format("l");
  },
  dateTime: (date) => {
    return moment(date).format("DD/MM/YYYY HH:MM");
  },
};
