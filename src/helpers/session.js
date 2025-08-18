export default {
  setCurrentUser: (user) => {
    console.log(user);
    
    localStorage.setItem("morador", JSON.stringify(user));
  },
  loggout: () => {
    localStorage.clear();
  },
  getCurrentUser: async () => {
    const user = JSON.parse(localStorage.getItem("morador"));

    return user;
  },
};
