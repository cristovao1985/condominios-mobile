import moment from "moment";
moment.locale("pt-br");

export default {
  date: (date) => {
    return new Date(date)
      .toISOString()
      .replace(/T.*/, "")
      .split("-")
      .reverse()
      .join("/"); //
  },
  dateTime: (date) => {
    return moment(date).format("DD/MM/YYYY HH:MM");
  },
  receiptDate: (date) => {
    return moment(date).format("DD/MM/YYYY");
  },
  textTodate: (date) => {
    return moment(date, "DD/MM/YYYY").format("YYYY-MM-DD");
  },
};
