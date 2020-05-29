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

  function toggleActive(e) {
    const allButtons = document.querySelectorAll(".flex-center button");
    allButtons.forEach(function (cur) {
      cur.classList.remove("active");
    });
    e.target.classList.toggle("active");
  }

  function getEndpoint() {
    endpoint = `https://api.github.com/search/repositories?q=stars:>1+language:${language}&sort=stars&order=desc&type=Repositories`;
    return endpoint;
  }

  function showList(array, pageNumber = 1) {
    let resultPerPage = 12;
    let lower = (pageNumber - 1) * resultPerPage;
    let upper = pageNumber * resultPerPage;
    array.slice(lower, upper).forEach((obj) => {
      let html = `
     <div class="card-content card-small top-content user-card">
        <div class='user-image-container image-container-small'>
                <a class='white' href=${obj.svn_url}><img src="${obj.owner.avatar_url}" alt="" class="user-image img-small"></a>
            </div>
            <div class='user-info'>
                <h2 class='name mb-medium'><a href=${obj.svn_url}>${obj.name}</a></h2>
            </div>
            <div class='git-info'>
                <ul>
                    <li class="followers">
                        <div class='followers-count medium'>${obj.stargazers_count}</div>
                        <span class="followers-text small"><img class='color-star' src='./img/starfilled.png'></span>
                    </li>
                    <li class="stars">
                        <div class='stars-count medium'>${obj.forks}</div>
                        <span class="forked-text small"><img class='color-forked' src='./img/forked.svg'></span>
                    </li>
                    <li class="forked">
                        <div class='forked-count medium'>${obj.open_issues}</div>
                         <span class="stars-text small"><img class='color-issues' src='./img/alert.svg'</span>
                    </li>
                </ul>
            </div>
            </div>`;
      base.elements.grid.insertAdjacentHTML("beforeend", html);
    });
  }

  const showLanguages = function (data) {
    base.elements.languagesContainer.insertAdjacentHTML("afterbegin", data);
  };

  const showNavigation = function () {
    let html = ` <button id='pagination-1' class='brk-btn pagination selected'>1</button>
            <button id='pagination-2' class='brk-btn pagination'>2</button>
            <button id='pagination-3' class='brk-btn pagination'>3</button>`;
    base.elements.navigation.insertAdjacentHTML("afterbegin", html);
  };

  return {
    getValue,
    toggleActive,
    getEndpoint,
    showList,
    showLanguages,
    showNavigation,
  };
})();

const base = (function () {
  const elements = {
    loaderContainer: document.querySelector(".loader-container"),
    loader: document.querySelector(".loader"),
    languagesContainer: document.querySelector(".languages-container"),
    grid: document.querySelector(".grid"),
    navigation: document.querySelector(".navigation"),
  };

  return {
    elements,
  };
})();

const controller = (function () {
  // State of app
  const state = {};

  // save 'search' object into local storage
  const setData = function () {
    localStorage.setItem("data", JSON.stringify(state.search));
  };

  // get 'search' object from local storage
  const getStoredData = function () {
    const storedData = JSON.parse(localStorage.getItem("data"));
    return storedData;
  };

  // get data from local storage and render on UI on refresh or app startup
  const loadData = function () {
    // 1. getting stored data from local storage
    const data = getStoredData();
    if (data) {
      // 1. creating a new object with help of saved data and saving into local state
      state.search = new searchController.Search(data.query);
      // 2. updating search's result property of local state
      state.search.result = data.result;
      // 3. updating search's lanugage property of local state
      state.search.languages = data.languages;
      // 4. rendering data from local state on UI on app startup
      viewController.showList(state.search.result);

      // -------- rendering lanuguages on app startup ------------- //
      // 1. clearing previous data
      base.elements.languagesContainer.innerHTML = "";
      // 2. updating languages on refresh or startup
      viewController.showLanguages(state.search.languages);

      // -------- rendering navigation on app startup ------------- //
      // i) clearing the buttons added previously
      base.elements.navigation.innerHTML = "";
      // ii) rendering the buttons( we haven't saved our buttons into state because we don't have any state attached to our buttons.Whenever we are refreshing , we just need to show all the three buttons because we always get the first page on refresh.We can't save 2nd or 3rd page result in localstorage)
      viewController.showNavigation(state.search.navigationContent);
    }
  };

  const eventListeners = function () {
    base.elements.languagesContainer.addEventListener("click", (e) => {
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

    // setting event listener for navigation buttons
    base.elements.navigation.addEventListener("click", (e) =>
      handleNavigation(e)
    );
  };

  // Listener for languages buttons
  const handleResults = async function (e) {
    // 1. get the query
    let query = viewController.getValue(e);

    // 2. toggle the active class on buttons
    viewController.toggleActive(e);

    // 3. get the endpoint
    let endpoint = viewController.getEndpoint();

    // 4. Create object and save it in state
    state.search = new searchController.Search(query);

    // 5. clear previous result
    base.elements.grid.innerHTML = "";

    // 6. clearning navigation
    base.elements.navigation.innerHTML = "";

    // 7.render the loader only if there is not any loader already
    if (base.elements.loaderContainer.innerHTML.trim() === "") {
      renderLoader(base.elements.loaderContainer);
    }

    // 8. make the search by calling method saved on object's prototype
    await state.search.displayResults(endpoint);

    // 9. Clear loader
    clearLoader();

    // 10. Save all the languages
    const languages = base.elements.languagesContainer.innerHTML;
    state.search.languages = languages;

    // 11. render the results once the data has come
    viewController.showList(state.search.result);

    // 12. show navigation only if there is not any navigation already
    if (base.elements.navigation.innerHTML.trim() === "") {
      viewController.showNavigation();
    }

    // 13. Saving data into Local Storage
    setData();
  };

  // listener for navigation
  const handleNavigation = function (e) {
    // highlighting the selected button
    const allButtons = document.querySelectorAll(".navigation .pagination");
    allButtons.forEach(function (cur) {
      cur.classList.remove("selected");
    });
    e.target.classList.toggle("selected");

    // clearning prev results of page when user clicks on navigatoin btns"
    base.elements.grid.innerHTML = "";

    let pageNumber = parseInt(e.target.textContent);
    viewController.showList(state.search.result, pageNumber);

    // Saving data into Local Storage
    setData();
  };

  //   On first app load , fetching the data and rendering on UI . Also rendering the navigation
  (async function onFirstLoad() {
    // If it's very first load i,e local storage is null  -
    // 1) create 'search' object
    // 2) call 'displayResults' by passing 'all' into the endpoint
    // 3) call 'showList' method to render items on UI.
    // 4) Also show navigation and call event handler on it.

    // NOTE: If you will only make api call and show items on UI using 'showList' then our navigation buttons will not be functional because they involved 'state.search.result' .So it'll say "can't find result of undefined"
    if (localStorage.getItem("data") === null) {
      state.search = new searchController.Search("all");
      const endpoint = `https://api.github.com/search/repositories?q=stars:>1+language:All&sort=stars&order=desc&type=Repositories`;

      // render loader
      renderLoader(document.querySelector(".loader-container"));

      await state.search.displayResults(endpoint);

      // clear loader
      clearLoader();

      viewController.showList(state.search.result);
      viewController.showNavigation();
      handleNavigation();
    }
  })();

  return {
    init: function () {
      eventListeners();
    },
    loadData,
  };
})();
controller.init();
controller.loadData();
localStorage.clear();
