import moment from "moment";

export default {
  date: (date) => {
    return moment(date).format("DD/MM/YYYY");
  },
  dateTime: (date) => {
    return moment(date).format("DD/MM/YYYY HH:MM");
  },
};
