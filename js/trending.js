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
    navLinks.forEach(function (cur) {
      cur.classList.remove("active");
      e.target.classList.add("active");
    });
  }

  function displayDevelopers(cur) {
    return `<a class='repocard__about--developer1' href="#">
          <img src="${cur.avatar}" alt="">
       </a>`;
  }

  function displayRepos(array) {
    console.log(array);
    document.querySelector(".grid").innerHTML = "";
    array.forEach(function (obj) {
      let html = `
    <div class="repoCard">
                <div class="repoCard__header">
                    <div class="repoCard__logo">
                        <img class='repoImage' src="${
                          obj.avatar
                        }" width='20px' height='20px' alt="">
                    </div>
                    <div class="repoCard__content">
                        <h5>${obj.author}</h5>
                    </div>
                </div>
                <div class="repoCard__main">
                    <div class="repoCard__name">${obj.name}</div>
                    <div class="repoCard__about">
                        <div class="repoCard__about--language">
                            ${obj.language}
                        </div>
                        <div class="repoCard__about--developers">
                            <span class="repoCard__about--text">Built by</span>
                            <span class="repoCard__about--images">
                            ${obj.builtBy
                              .map(function (cur, i = 0) {
                                let newText = `<a class='repocard__about--developer${i}' href="#"><img class='teamImage' src=${cur.avatar} alt=""></a>`;
                                i++;
                                return newText;
                              })
                              .join("")}
                            </span>
                        </div>
                    </div>
                    <div class="repoCard__description">
                        <p>${obj.description}</p>
                    </div>
                    <div class="repoCard__ratings">
                        <a href="" class="repoCard__ratings--stars">
                            <span class="followers-text small">${
                              obj.stars
                            }<img class='color-star'
                                    src='./img/starfilled.png'></span>
                        </a>
                        <a href="" class="repoCard__ratings--forks">
                            <span class="forked-text small">${
                              obj.forks
                            }<img class='color-forked' src='./img/forked.svg'></span>
                        </a>
                        <a href="" class="repoCard__ratings--starsRecent">
                            <span class="stars-text small">${
                              obj.currentPeriodStars
                            }<img class='color-issues' src='./img/alert.svg' </span>
                        </a>
                    </div>
                </div>
            </div>
    `;
      document.querySelector(".grid").insertAdjacentHTML("beforeend", html);
    });
  }

  function displayDevelopers(array) {
    document.querySelector(".grid").innerHTML = "";
    array.forEach(function (obj) {
      let html = `
    <div class="repoCard developerCard ">
                <div class="repoCard__header">
                    <div class="repoCard__logo developer__logo">
                        <img class='developerImage' src="${obj.avatar}" alt="">
                    </div>
                    <div class="repoCard__content">
                        <h5 class='margin-0'>${obj.name}</h5>
                        <span>${obj.username}</span>
                    </div>
                </div>
                <div class="repoCard__main">
                    <div class="repoCard__about">
                      <div class="repoCard__name">${obj.repo.name}</div>
                      <div class='repoCard__status'>
                        <div class='repoCard__status--img'>
                          <img width="50px" height="50px" src="../img/trendingdev.svg" />
                        </div>
                        <div class='repoCard__text'>Popular</div>
                      </div>
                    </div>
                    
                    <div class="repoCard__description">
                        <p>${obj.repo.description}</p>
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
  document
    .querySelector(".categories")
    .addEventListener("click", (e) => handleMain(e));

  const all = document.querySelectorAll(".opt-lan");
  console.log(all);

  // languages select menu listener
  document.querySelectorAll(".opt-lan").forEach((item) => {
    item.addEventListener("click", () => {
      console.log("yes");
      console.log(item.querySelector("label").innerHTML);
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
      console.log(item.querySelector("label").innerHTML);
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
    console.log(query);

    // 2. Add the class active
    viewController.addClass(e);

    // 2. create andobject and save into state
    state.type = new searchController.Search(query);

    // 5. make the request(search)
    if (query === "Repositories") {
      let data1 = await state.type.repositoriesByMain();
      viewController.displayRepos(state.type.repos);
    } else if (query === "Developers") {
      let data2 = await state.type.developersByMain();
      console.log(state.type.developers);
      viewController.displayDevelopers(state.type.developers);
    }

    // 6. show the lists
    // console.log(state.type.repos);

    // state.type.repos.forEach(function (cur) {
    //   console.log(cur.builtBy.length);
    // });
    // viewController.displayDevelopers(state.type.repos);

    console.log(state);
  }

  async function handleCategories(item) {
    console.log(handleCategories);
    // 1. get the query
    let query = item.querySelector("label").innerHTML;

    // 2. create a new object and save in state
    state.type = new searchController.Search(query);

    // 3. make the request(search) based on which request is active
    if (document.querySelector(".btn-repo").classList.contains("active")) {
      let data = await state.type.repositoriesByCategories(query);
      console.log(state.type.developers);
      viewController.displayRepos(state.type.repos);
    } else {
      console.log("no");
      let data = await state.type.DevelopersForCategories(query);
    }
    console.log(state);
  }

  async function handleDuration(item) {
    // 1. get the query
    let query = item.querySelector("label").innerHTML;

    // 2. create a new object and save in state
    state.type = new searchController.Search(query);

    // 3. make the request(search) based on which request is active
    if (document.querySelector(".btn-repo").classList.contains("active")) {
      let data = await state.type.repositoriesByDuration(query);
      viewController.displayRepos(state.type.repos);
    } else {
      console.log("no");
      let data = await state.type.DevelopersByDuration(query);
    }
    console.log(state);
  }
})();
