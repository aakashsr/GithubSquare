const searchController = (function () {})();
const viewController = (function () {
  function getValue() {
    return document.querySelector(".username").value;
  }

  return {
    getValue,
  };
})();

const controller = (function () {
  document.getElementById("player-1").addEventListener("submit", (e) => {
    e.preventDefault();
    handleSearch();
  });

  const handleSearch = function () {
    // 1. get input value(username)
    let username = viewController.getValue();
  };
})();
