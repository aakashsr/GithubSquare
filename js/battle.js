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
  document.getElementById("player-1").addEventListener("submit", (e) => {
    e.preventDefault();
    handleControllerOne();
  });
  document.getElementById("player-2").addEventListener("submit", (e) => {
    e.preventDefault();
    handleControllerTwo();
  });

  const handleControllerOne = function () {
    const value1 = viewController.getValue1();
    console.log(value1);
  };
  const handleControllerTwo = function () {
    const value2 = viewController.getValue2();
    console.log(value2);
  };
})();
