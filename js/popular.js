const searchController = (function () {
  function Search(query) {
    this.query = query;
  }

  Search.prototype.displayResults = async function (endpoint) {
    const res = await axios(endpoint);
    this.result = res.data.items;
  };

  return {
    Search,
  };
})();

const viewController = (function () {
  let endpoint, language;
  function getValue(e) {
    language = e.target.textContent;
    return language;
  }

  function getEndpoint() {
    endpoint = `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`;
    return endpoint;
  }

  return {
    getValue,
    getEndpoint,
  };
})();

const controller = (function () {
  const state = {};

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

  const handleResults = async function (e) {
    // 1. get the query
    let query = viewController.getValue(e);
    // 2. get the endpoint
    let endpoint = viewController.getEndpoint();
    // 3. Create object and save it in state
    state.search = new searchController.Search(query);
    // 4. make the search by calling method saved on object's prototype
  };

  return {
    init: function () {
      eventListeners();
    },
  };
})();
controller.init();
