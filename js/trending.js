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

  Search.prototype.developersByCategories = async function (language) {
    try {
      const developersData = await axios(
        `https://ghapi.huchen.dev/developers?language=${language}&since=daily`
      );
      this.developers = developersData.data;
      console.log(developersData.data);
      return this.developers.data;
    } catch (e) {
      return `We've an error here: ${e}`;
    }
  };

  Search.prototype.repositoriesByDuration = async function (
    language,
    duration
  ) {
    let endpoint;
    if (language === "All Languages") {
      console.log("all languages");
      if (duration === "Today") {
        endpoint = `https://ghapi.huchen.dev/repositories?since=daily`;
      } else if (duration === "This Week") {
        endpoint = `https://ghapi.huchen.dev/repositories?since=weekly`;
      } else {
        endpoint = `https://ghapi.huchen.dev/repositories?since=monthly`;
      }
    } else {
      console.log("particular languages");
      if (duration === "Today") {
        endpoint = `https://ghapi.huchen.dev/repositories?language=${language}&since=daily`;
      } else if (duration === "This Week") {
        endpoint = `https://ghapi.huchen.dev/repositories?language=${language}&since=weekly`;
      } else {
        endpoint = `https://ghapi.huchen.dev/repositories?language=${language}&since=monthly`;
      }
    }

    try {
      const reposData = await axios(endpoint);
      this.repos = reposData.data;
      return reposData.data;
    } catch (e) {
      return `We've an error here: ${e}`;
    }
  };

  Search.prototype.DevelopersByDuration = async function (language, duration) {
    let endpoint;
    if (language === "All Languages") {
      console.log("all languages");
      if (duration === "Today") {
        endpoint = `https://ghapi.huchen.dev/developers?since=daily`;
      } else if (duration === "This Week") {
        endpoint = `https://ghapi.huchen.dev/developers?since=weekly`;
      } else {
        endpoint = `https://ghapi.huchen.dev/developers?since=monthly`;
      }
    } else {
      console.log("particular languages");
      if (duration === "Today") {
        endpoint = `https://ghapi.huchen.dev/developers?language=${language}&since=daily`;
      } else if (duration === "This Week") {
        endpoint = `https://ghapi.huchen.dev/developers?language=${language}&since=weekly`;
      } else {
        endpoint = `https://ghapi.huchen.dev/developers?language=${language}&since=monthly`;
      }
    }

    try {
      const developersData = await axios(endpoint);
      this.developers = developersData.data;
      console.log(developersData.data);
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
    console.log(e.target);
    console.log(e.target.closest(".opt-lan"));
    // console.log(e.target.closest(".opt-lan")).textContent;
    console.log(e.target.textContent.trim());
    return e.target.textContent.trim();
  }

  function addClass(e) {
    const navLinks = document.querySelectorAll(".nav-link");
    if (e.target.classList.contains("nav-link")) {
      navLinks.forEach(function (cur) {
        cur.classList.remove("active");
        e.target.classList.add("active");
      });
    }
  }

  function clearPreviousResult() {
    document.querySelector(".grid").innerHTML = "";
  }

  const showSelectedOption = function (data) {
    document.querySelector(".selected-language").textContent = "";
    document.querySelector(".selected-language").textContent = data;
  };

  const showSelectedDuration = function (data) {
    document.querySelector(".selected-duration").textContent = "";
    document.querySelector(".selected-duration").textContent = data;
  };

  function applyBgColor(language) {
    if (language === "Shell") {
      return "#89e051";
    } else if (language === "HTML") {
      return "#e34c26";
    } else if (language === "Go") {
      return "#00ADD8";
    } else if (language === "TypeScript") {
      return "#2b7489";
    } else if (language === "Assembly") {
      return "#6E4C13";
    } else if (language === "C++") {
      return "#f34b7d";
    } else if (language === "C") {
      return "#555555";
    } else if (language === "JavaScript") {
      return "#f1e05a";
    } else if (language === "Python") {
      return "#3572A5";
    } else if (language === "Vue") {
      return "#2c3e50";
    } else if (language === "Java") {
      return "#b07219";
    } else if (language === "PHP") {
      return "#4F5D95";
    } else if (language === "Jupyter Notebook") {
      return "#DA5B0B";
    }
  }

  function displayRepos(array) {
    array.forEach(function (obj) {
      let html = `
    <div class="repoCard">
                <div class="card__header">
                    <div class="card__logo">
                        <img class='repoImage' src="${
                          obj.avatar
                        }" width='20px' height='20px' alt="">
                    </div>
                    <div class="card__content">
                        <h5>${obj.author}</h5>
                    </div>
                </div>
                <div class="card__main">
                    <div class="card__name">${obj.name}</div>
                    <div class="card__about">
                        <div class="card__about--language">
                          <span class='circle' style='background-color:${applyBgColor(
                            obj.language
                          )}'></span>
                            ${obj.language}
                        </div>
                        <div class="card__about--developers">
                            <span class="card__about--text">Built by</span>
                            <span class="card__about--images">
                            ${obj.builtBy
                              .map(function (cur, i = 0) {
                                let newText = `<a class='card__about--developer${i}' href="#"><img class='teamImage' src=${cur.avatar} alt=""></a>`;
                                i++;
                                return newText;
                              })
                              .join("")}
                            </span>
                        </div>
                    </div>
                    <div class="card__description">
                        <p>${
                          obj.description.length > 120
                            ? obj.description.substr(0, 120) + "..."
                            : obj.description
                        }</p>
                    </div>
                    <div class="card__ratings">
                         <div class='git-info'>
                <ul>
                    <li class="followers">
                      <span class="followers-text small"><img class='color-star' src='./img/starfilled.png'></span>
                      <div class='followers-count'>${
                        obj.stars
                      }</div>                       
                    </li>
                    <li class="stars">
                      <span class="forked-text small"><img class='color-forked' src='./img/forked.svg'></span>
                      <div class='stars-count'>${
                        obj.forks
                      }</div>                    
                    </li>
                    <li class="forked">
                      <span class="stars-text small"><img class='color-issues' src='./img/alert.svg'></span>
                      <div class='forked-count'>${obj.forks}</div>
                    
                    </li>
                </ul>
            </div>
                    </div>
                </div>
            </div>
    `;
      document.querySelector(".grid").insertAdjacentHTML("beforeend", html);
    });
  }

  function displayDevelopers(array) {
    array.forEach(function (obj) {
      let html = `
    <div class="repoCard developerCard ">
                <div class="card__header developers__header">
                    <div class="card__logo developer__logo">
                        <img class='developerImage' src="${obj.avatar}" alt="">
                    </div>
                    <div class="repoCard__content">
                        <h5 class='margin-0 developer__name'>${obj.name}</h5>
                        <span class='developer__username'>${obj.username}</span>
                    </div>
                </div>
                <div class="developer__main">
                    <div class="developers__about">
                      <div class="repoCard__name developerRepo__name"><a href=${
                        obj.url
                      }>${
        obj.repo.name.length > 11
          ? obj.repo.name.substr(0, 11) + "..."
          : obj.repo.name
      }</a></div>
                      <div class='developer__status'>
                        <div class='repoCard__status--img'>
                          <img class="status__img" src="../img/trendingdev.svg" />
                        </div>
                        <div class='repoCard__text'>Popular</div>
                      </div>
                    </div>
                    
                    <div class="repoCard__description">
                        <p>${
                          obj.repo.description.length > 70
                            ? obj.repo.description.substr(0, 70) + "..."
                            : obj.repo.description
                        }</p>
                    </div>
                </div>
            </div>
    `;
      document.querySelector(".grid").insertAdjacentHTML("beforeend", html);
    });
  }

  return {
    getValue,
    addClass,
    clearPreviousResult,
    displayRepos,
    displayDevelopers,
    displayDevelopers,
    showSelectedOption,
    showSelectedDuration,
  };
})();

// main controller module
const controller = (function () {
  // state
  const state = {};

  // set data into local storage
  const setData = function () {
    localStorage.setItem("trendingData", JSON.stringify(state.type));
  };

  // get data from local storage
  const getStoredData = function () {
    const storedData = JSON.parse(localStorage.getItem("trendingData"));
    return storedData;
  };

  const loadData = function () {
    const storedData = getStoredData();
    if (storedData) {
      // 1. create a new object with the help of saved data
      state.type = new searchController.Search(storedData.query);
      // 2. update the query property of local state
      state.type.query = storedData.query;
      if (storedData.query === "Repositories") {
        console.log("LS REPO");
        // 3. if query is 'repositories' , update the repos property with the stored data
        state.type.repos = storedData.repos;

        // 4. render on UI
        viewController.displayRepos(state.type.repos);
      } else if (storedData.query === "Developers") {
        console.log("LS DEV");
        // 3. if query is 'developers' , update the developers property with the stored data
        state.type.developers = storedData.developers;

        // 4. render on UI
        if (state.type.developers !== "") {
          viewController.displayDevelopers(state.type.developers);
        }
      } else {
        // update the selected property of state
        if (storedData.selected) {
          state.type.selected = storedData.selected;

          // show the updated text
          viewController.showSelectedOption(state.type.selected);
        }

        if (storedData.selectedDuration) {
          // update the selectedDuration property of state
          state.type.selectedDuration = storedData.selectedDuration;
          // show the updated duration text
          viewController.showSelectedDuration(state.type.selectedDuration);
        }
      }
    }
  };

  // Event listeners

  // To toggle select menu
  document.querySelector(".selected-language").addEventListener("click", () => {
    document.querySelector(".lan-opt-container").classList.toggle("active");
  });

  document.querySelector(".selected-duration").addEventListener("click", () => {
    document.querySelector(".dur-opt-container").classList.toggle("active");
  });

  // repositories or developers listener
  document.querySelector(".categories").addEventListener("click", (e) => {
    // Reset languages selected option
    document.querySelector(".languages .selected").textContent =
      "All Languages";
    // Reset duration selected option
    document.querySelector(".duration .selected").textContent = "Today";
    handleMain(e);
  });

  const all = document.querySelectorAll(".opt-lan");

  // languages select menu listener
  document.querySelectorAll(".opt-lan").forEach((item) => {
    item.addEventListener("click", (e) => {
      document.querySelector(
        ".selected-language"
      ).innerHTML = item.querySelector("label").innerHTML;
      document.querySelector(".lan-opt-container").classList.remove("active");

      handleCategories(e);
      // handleMain(e);
    });
  });

  // duration select menu listener
  document.querySelectorAll(".opt-duration").forEach((item) => {
    item.addEventListener("click", (e) => {
      document.querySelector(
        ".selected-duration"
      ).innerHTML = item.querySelector("label").innerHTML;
      document.querySelector(".dur-opt-container").classList.remove("active");

      handleDuration(e);
      // handleMain(e);
    });
  });

  document.querySelector;

  let query;

  // duration select menu listener

  async function handleMain(e) {
    // 1. get the query
    console.log(e.target);

    query = viewController.getValue(e);

    // 2. Add the class active
    viewController.addClass(e);

    // 2. create an object and save into state
    state.type = new searchController.Search(query);

    // 3. clear previous results
    viewController.clearPreviousResult();

    // 4. Render the loader
    renderLoader(document.querySelector(".loader-container"));

    if (query === "Repositories") {
      // 5. make the request(search)
      let data1 = await state.type.repositoriesByMain();

      // 6. Clear loader
      clearLoader();

      // 7. Display the result
      viewController.displayRepos(state.type.repos);

      // 8. save data into LS
      setData();
    } else if (query === "Developers") {
      // 5. make the request(search)
      let data2 = await state.type.developersByMain();

      // 6. Clear loader
      clearLoader();

      // 7. Display the result
      viewController.displayDevelopers(state.type.developers);

      // 8. save data into LS
      setData();
    } else if (e.target.parentNode.classList.contains("opt-lan")) {
      console.log("handle categorees");
      handleCategories(query);
    } else if (e.target.parentNode.classList.contains("opt-duration")) {
      console.log("handle duration");
      handleDuration(query);
    }
  }

  async function handleCategories(e) {
    query = viewController.getValue(e);

    // 3. clear previous results
    viewController.clearPreviousResult();

    // 4. Render the loader
    renderLoader(document.querySelector(".loader-container"));
    console.log("inside handle categories");

    // checking which request is active
    if (document.querySelector(".btn-repo").classList.contains("active")) {
      // 5. make the request(search)
      let data = await state.type.repositoriesByCategories(query);
      console.log(state.type.repos);

      // 6. Clear loader
      clearLoader();

      // // 7. save the selected text content
      // const selectedOption = document.querySelector(".selected-language")
      //   .textContent;
      // state.type.selected = selectedOption;
      // console.log(selectedOption);

      // 7. Display the result
      console.log(state.type.repos);
      viewController.displayRepos(state.type.repos);

      // 8. save data into LS
      setData();
    } else {
      // 5. make the request(search)
      let data = await state.type.developersByCategories(query);

      // 6. Clear loader
      clearLoader();

      // 7. save the selected text content
      const selectedOption = document.querySelector(".selected").textContent;
      state.type.selected = selectedOption;
      console.log(selectedOption);

      // 7. Display the result
      viewController.displayDevelopers(state.type.developers);

      // 8. save data into LS
      setData();
    }
  }

  async function handleDuration(e) {
    query = viewController.getValue(e);

    // 3. clear previous results
    viewController.clearPreviousResult();

    console.log("inside handle duration");
    // 4. Render the loader
    renderLoader(document.querySelector(".loader-container"));

    // checking which request is active
    if (document.querySelector(".btn-repo").classList.contains("active")) {
      let selected = document.querySelector(".languages .selected").textContent;
      console.log(selected);

      // 5. make the request(search)
      let data = await state.type.repositoriesByDuration(selected, query);
      console.log(data);

      // 6. Clear loader
      clearLoader();

      // 7. save the selected duration content
      const selectedDuration = document.querySelector(".selected-duration")
        .textContent;
      state.type.selectedDuration = selectedDuration;

      // 7. Display the result
      viewController.displayRepos(state.type.repos);

      // 8. save data into LS
      setData();
    } else {
      let selected = document.querySelector(".languages .selected").textContent;

      // 5. make the request(search)
      let data = await state.type.DevelopersByDuration(selected, query);

      // 6. Clear loader
      clearLoader();

      // 7. save the selected duration content
      const selectedDuration = document.querySelector(".selected-duration")
        .textContent;
      state.type.selectedDuration = selectedDuration;

      // 7. Display the result
      viewController.displayDevelopers(state.type.developers);

      // 8. save data into LS
      setData();
    }
  }

  return {
    loadData,
  };
})();

controller.loadData();
// localStorage.clear();
