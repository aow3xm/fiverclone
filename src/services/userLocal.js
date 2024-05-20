export const userLocal = {
  set: (inforUser) => {
    const json = JSON.stringify(inforUser);
    localStorage.setItem("USER_INFO", json);
  },
  get: () => {
    let json = localStorage.getItem("USER_INFO");
    if (json) {
      return JSON.parse(json);
    } else {
      return null;
    }
  },
};
