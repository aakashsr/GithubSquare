const searchController = (function () {
  function Search(query) {
    this.query = query;
  }

  Search.prototype.displayResults = async function () {
    const res = await axios(endpoint);
    this.result = res.data.items;
  };
})();

const viewController = (function () {})();

const controller = (function () {
  const eventListeners = function () {
    document
      .querySelector(".languages-container")
      .addEventListener("click", (e) => {
        const languages = [
          "All",
          "JavaScript",
          "Ruby",
          "Java",
          "C++",
          "CSS",
          "Python",
          "Go",
        ];
        languages.forEach(function (cur) {
          if (e.target.textContent === cur) {
            handleResults(e);
          }
        });
      });
  };

  const handleResults = function (e) {
    console.log("Running");
  };

  return {
    init: function () {
      eventListeners();
    },
  };
})();
controller.init();
