export default {
  setCurrentUser: (user) => {
    localStorage.setItem("user", JSON.stringify(user));
  },
  loggout: () => {
    localStorage.clear();
  },
  getCurrentUser: () => {
    const user = JSON.parse(localStorage.getItem("user"));

    return user;
  },
};
