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
      console.log(reposData.data);
      return reposData.data;
    } catch (e) {
      return `We've an error here: ${e}`;
    }
  };

  Search.prototype.DevelopersByDuration = async function (language, duration) {
    try {
      const developersData = await axios(
        `https://ghapi.huchen.dev/developers?language=${language}&since=${duration}`
      );
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
    return e.target.textContent;
  }

  function addClass(e) {
    const navLinks = document.querySelectorAll(".nav-link");
    navLinks.forEach(function (cur) {
      cur.classList.remove("active");
      e.target.classList.add("active");
    });
  }

  function clearPreviousResult() {
    document.querySelector(".grid").innerHTML = "";
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
  };
})();

// main controller module
const controller = (function () {
  // state
  const state = {};
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
    item.addEventListener("click", () => {
      document.querySelector(
        ".selected-language"
      ).innerHTML = item.querySelector("label").innerHTML;
      document.querySelector(".lan-opt-container").classList.remove("active");

      handleCategories(item);
    });
  });

  // duration select menu listener
  document.querySelectorAll(".opt-duration").forEach((item) => {
    item.addEventListener("click", () => {
      document.querySelector(
        ".selected-duration"
      ).innerHTML = item.querySelector("label").innerHTML;
      document.querySelector(".dur-opt-container").classList.remove("active");

      handleDuration(item);
    });
  });

  document.querySelector;

  // duration select menu listener

  async function handleMain(e) {
    // 1. get the query

    let query = viewController.getValue(e);

    // 2. Add the class active
    viewController.addClass(e);

    // 2. create andobject and save into state
    state.type = new searchController.Search(query);

    // 3. clear previpus results
    viewController.clearPreviousResult();

    if (query === "Repositories") {
      // 4. Render the loader
      renderLoader(document.querySelector(".loader-container"));

      // 5. make the request(search)
      let data1 = await state.type.repositoriesByMain();

      // 6. Clear loader
      clearLoader();

      // 7. Display the result
      viewController.displayRepos(state.type.repos);
    } else if (query === "Developers") {
      // 4. Render the loader
      renderLoader(document.querySelector(".loader-container"));

      // 5. make the request(search)
      let data2 = await state.type.developersByMain();

      // 6. Clear loader
      clearLoader();

      // 7. Display the result
      viewController.displayDevelopers(state.type.developers);
    }
  }

  async function handleCategories(item) {
    // 1. get the query
    let query = item.querySelector("label").innerHTML;
    console.log(query);

    // 2. create a new object and save in state
    state.type = new searchController.Search(query);

    // 3. clear previpus results
    viewController.clearPreviousResult();

    // checking which request is active
    if (document.querySelector(".btn-repo").classList.contains("active")) {
      // 4. Render the loader
      renderLoader(document.querySelector(".loader-container"));

      // 5. make the request(search)
      let data = await state.type.repositoriesByCategories(query);

      // 6. Clear loader
      clearLoader();

      // 7. Display the result
      viewController.displayRepos(state.type.repos);
    } else {
      // 4. Render the loader
      renderLoader(document.querySelector(".loader-container"));

      // 5. make the request(search)
      let data = await state.type.developersByCategories(query);

      // 6. Clear loader
      clearLoader();

      // 7. Display the result
      viewController.displayDevelopers(state.type.developers);
    }
  }

  async function handleDuration(item) {
    // 1. get the query
    let query = item.querySelector("label").innerHTML;

    // 2. create a new object and save in state
    state.type = new searchController.Search(query);

    // 3. clear previpus results
    viewController.clearPreviousResult();

    // checking which request is active
    if (document.querySelector(".btn-repo").classList.contains("active")) {
      let selected = document.querySelector(".languages .selected").textContent;
      // 4. Render the loader
      renderLoader(document.querySelector(".loader-container"));

      // 5. make the request(search)
      let data = await state.type.repositoriesByDuration(selected, query);

      // 6. Clear loader
      clearLoader();

      // 7. Display the result
      viewController.displayRepos(state.type.repos);
    } else {
      // 4. Render the loader
      renderLoader(document.querySelector(".loader-container"));

      // 5. make the request(search)
      let data = await state.type.DevelopersByDuration(query);
      // 6. Clear loader
      clearLoader();
      // 7. Display the result
      viewController.displayDevelopers(state.type.developers);
    }
  }
})();
