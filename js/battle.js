const searchController = (function () {})();
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
  const state = {};

  document.getElementById("player-1").addEventListener("submit", (e) => {
    e.preventDefault();
    handleControllerOne();
  });
  document.getElementById("player-2").addEventListener("submit", (e) => {
    e.preventDefault();
    handleControllerTwo();
  });

  const handleControllerOne = function () {
    // 1. get the  username value
    const username = viewController.getValue1();
    // 2. save in state
    state.userNames.firstName = userName;
  };
  const handleControllerTwo = function () {
    // 1. get the  username value
    const username = viewController.getValue2();
    // 2. save in state
    state.userNames.secondName = userName;
  };
})();
