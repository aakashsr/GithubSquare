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

  function showList(array) {
    array.forEach((obj) => {
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
      document.querySelector(".grid").insertAdjacentHTML("beforeend", html);
    });
  }

  return {
    getValue,
    getEndpoint,
    showList,
  };
})();

const base = (function () {
  const elements = {
    loaderContainer: document.querySelector(".loader-container"),
  };

  const renderLoader = function (parent) {
    const loader = `
    <div class='loader'>
      <svg>
        <use href='./img/icons.svg#icon-cw'></use>
      </svg>
    </div>
    `;
    parent.insertAdjacentHTML("afterbegin", loader);
  };

  const clearLoader = function () {
    const loader = document.querySelector(".loader");
    if (loader) {
      loader.parentNode.removeChild(loader);
    }
  };
  return {
    elements,
    renderLoader,
    clearLoader,
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
    // 4. clear previous result
    document.querySelector(".grid").innerHTML = "";
    // 5.render the loader
    base.renderLoader(base.elements.loaderContainer);
    // 6. make the search by calling method saved on object's prototype
    await state.search.displayResults(endpoint);
    console.log(state.search);
    // 7. render the results once the data has come
    viewController.showList(state.search.result);
  };

  return {
    init: function () {
      eventListeners();
    },
  };
})();
controller.init();
