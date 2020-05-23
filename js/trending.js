const searchController = (function () {
  function Search(query) {
    this.query = query;
  }

  Search.prototype.repositoriesByMain = async function () {
    try {
      const reposData = await axios(`https://ghapi.huchen.dev/repositories`);
      this.repos = reposData.data;
      return reposData.data;
    } catch (e) {
      return `We've an error here: ${e}`;
    }
  };

  Search.prototype.developersByMain = async function () {
    try {
      const developersData = await axios(`https://ghapi.huchen.dev/developers`);
      this.developers = developersData.data;
      return developers.data;
    } catch (e) {
      return `We've an error here: ${e}`;
    }
  };

  Search.prototype.repositoriesByCategories = async function (language) {
    try {
      const reposData = await axios(
        `https://ghapi.huchen.dev/repositories?language=${language}&since=daily`
      );
      this.repos = reposData.data;
      return reposData.data;
    } catch (e) {
      return `We've an error here: ${e}`;
    }
  };

  Search.prototype.developersByCategories = async function () {
    try {
      const developersData = await axios(
        `https://ghapi.huchen.dev/developers?language=${language}&since=daily`
      );
      this.developers = developersData.data;
      return developers.data;
    } catch (e) {
      return `We've an error here: ${e}`;
    }
  };

  Search.prototype.repositoriesByDuration = async function (language) {
    try {
      const reposData = await axios(
        `https://ghapi.huchen.dev/repositories?language=${language}&since=${duration}`
      );
      this.repos = reposData.data;
      return reposData.data;
    } catch (e) {
      return `We've an error here: ${e}`;
    }
  };

  Search.prototype.DevelopersByDuration = async function (language) {
    try {
      const developersData = await axios(
        `https://ghapi.huchen.dev/developers?language=${language}&since=${duration}`
      );
      this.developers = developersData.data;
      return developersData.data;
    } catch (e) {
      return `We've an error here: ${e}`;
    }
  };

  return {
    Search,
  };
})();
const viewController = (function () {
  function getValue(e) {
    return e.target.textContent;
  }

  function addClass(e) {
    const navLinks = document.querySelectorAll(".nav-link");
    console.log(navLinks);
    navLinks.forEach(function (cur) {
      console.log(cur.classList);
      cur.classList.remove("active");
      e.target.classList.add("active");
    });
  }

  return {
    getValue,
    addClass,
  };
})();

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
    // 1. get the query

    let query = viewController.getValue(e);

    // 2. Add the class active
    viewController.addClass(e);

    // 2. create and object and save into state
    state.type = new searchController.Search(query);

    // 5. make the request(search)
    if (query === "Repositories") {
      let data1 = await state.type.repositoriesByMain();
    } else if (query === "Developers") {
      let data2 = await state.type.developersByMain();
    }

    console.log(state);
  }

  async function handleCategories(item) {
    // 1. get the query
    let query = item.querySelector("label").innerHTML;

    // 2. create a new object and save in state
    state.type = new searchController.Search(query);

    // 3. make the request(search) based on which request is active
    if (document.querySelector(".btn-repo").classList.contains("active")) {
      let data = await state.type.repositoriesByCategories(query);
    } else {
      console.log("no");
      let data = await state.type.DevelopersForCategories(query);
    }
    console.log(state);
  }
})();
