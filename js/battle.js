const searchController = (function () {})();
const veiwController = (function () {})();
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
    console.log("handle1");
  };
  const handleControllerTwo = function () {
    console.log("handle2");
  };
})();
