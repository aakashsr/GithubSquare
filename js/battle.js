const searchController = (function () {
  async function getResults(username) {
    try {
      const res = await axios(`https://api.github.com/users/${username}`);
      return res.data;
    } catch (e) {
      return `We have an error here: ${e}`;
    }
  }

  async function getRepos(username) {
    try {
      const res = await axios(`https://api.github.com/users/${username}/repos`);
      return res.data;
    } catch (e) {
      return `We have an error here: ${e}`;
    }
  }

  return {
    getResults,
    getRepos,
  };
})();

const viewController = (function () {
  function getValue1() {
    const value1 = document.querySelector(".username1").value;
    return value1;
  }
  function getValue2() {
    const value2 = document.querySelector(".username2").value;
    return value2;
  }

  return {
    getValue1,
    getValue2,
  };
})();
const controller = (function () {
  const state = {
    userNames: {},
  };

  document.getElementById("player-1").addEventListener("submit", (e) => {
    e.preventDefault();
    handleControllerOne();
  });
  document.getElementById("player-2").addEventListener("submit", (e) => {
    e.preventDefault();
    handleControllerTwo();
  });

  const handleControllerOne = async function () {
    // 1. get the  username value
    const userName = viewController.getValue1();
    // 2. save in state
    state.userNames.firstName = userName;
    // 3. Make the fetch request and get the data
    const data1 = await searchController.getResults(state.userNames.firstName);
    console.log(data1);
  };
  const handleControllerTwo = async function () {
    // 1. get the  username value
    const userName = viewController.getValue2();
    // 2. save in state
    state.userNames.secondName = userName;
    // 3. Make the fetch request and get the data
    const data2 = await searchController.getResults(state.userNames.secondName);
    console.log(data2);
  };
})();
