const searchController = (function () {
  function Search(query) {
    this.query = query;
  }

  Search.prototype.getResults = async function () {
    try {
      const reposData = await axios(
        `https://api.github.com/users/${this.query}/repos`
      );
      const userData = await axios(
        `https://api.github.com/users/${this.query}`
      );
      this.username = userData.data;
      this.repos = reposData.data;
      return userData.data;
    } catch (e) {
      return `We've an error here: ${e}`;
    }
  };

  return {
    Search,
  };
})();
const viewController = (function () {
  function getValue() {
    return document.querySelector(".username").value;
  }

  return {
    getValue,
  };
})();

const controller = (function () {
  state = {};

  document.getElementById("player-1").addEventListener("submit", (e) => {
    e.preventDefault();
    handleSearch();
  });

  const handleSearch = async function () {
    // 1. get input value(username)
    let username = viewController.getValue();

    // 2. create a new object and save in state
    state.search = new searchController.Search(username);

    // 3. make the request(search)
    const data = await state.search.getResults();
  };
})();
