export default {
  setCurrentUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  },
  loggout: () => {
    localStorage.clear();
  },
};
