const searchController = (function () {
  function Search(query) {
    this.query = query;
  }

  Search.prototype.displayResults = async function (endpoint) {
    try {
      const reposData = await axios(`https://ghapi.huchen.dev/repositories`);
      const developersData = await axios(`https://ghapi.huchen.dev/developers`);
      console.log(reposData.data);
      console.log(developersData.data);
      this.repos = reposData.data;
      this.developers = developersData.data;
      console.log(reposData.data);
      console.log(developersData.data);
      return reposData.data;
    } catch (e) {
      return `We've an error here: ${e}`;
    }
  };

  return {
    Search,
  };
})();
const viewController = (function () {})();

// main controller module
const controller = (function () {
  // state
  const state = {};
  // Event listeners

  document
    .querySelector(".categories")
    .addEventListener("click", (e) => handleMain(e));

  // To toggle select menu
  document.querySelector(".selected").addEventListener("click", () => {
    document.querySelector(".options-container").classList.toggle("active");
  });

  // To update select menu
  document.querySelectorAll(".option").forEach((item) => {
    item.addEventListener("click", () => {
      document.querySelector(".selected").innerHTML = item.querySelector(
        "label"
      ).innerHTML;
      document.querySelector(".options-container").classList.remove("active");

      handleCategories(item);
    });
  });

  async function handleMain(e) {
    console.log("handlecommon");
  }

  async function handleCategories(item) {
    // 1. get the query
    let query = item.querySelector("label").innerHTML;

    // 2. create a new object and save in state
    state.trending = new searchController.Search(query);

    // 3. make the request(search)
    await state.trending.displayResults();

    // console.log(state);
  }
})();
