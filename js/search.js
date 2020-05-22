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

  const clearInput = function () {
    document.querySelector(".username").value = "";
  };

  const clearPrevResults = function () {
    document.querySelector(".top-content").innerHTML = "";
  };

  const displayUserInfo = function (obj) {
    let html;

    html = `
     <div id='card-big' class="card-content top-content user-card white-bg text-black">
        <div class='user-col' class='user-image-container'>
                <img src="${obj.avatar_url}" alt="" class="user-image">
                <div class='user-info'>
                <h2 class='info-1'>${obj.name}</h2>
                <p class='info-2'>${obj.location}</p>
                <p class='info-3'>${obj.bio}</p>
            </div>
            </div>
            
            <div class='git-info'>
                <ul class='user-col' class='row'>
                    <li class="user-row git-info-1">
                        <div class='git-inf-desc medium'>${obj.login}</div>
                        <span class="git-info-text regular">Username</span>
                    </li>
                    <li class="user-row git-info-1">
                        <div class='git-inf-desc medium'>${obj.company}</div>
                        <span class="git-info-text regular">Company</span>
                    </li>
                    <li class="user-row git-info-1">
                        <div class='git-inf-desc medium'>${obj.blog}</div>
                        <span class="git-info-text regular">Website</span>
                    </li>
                    <li class="user-row git-info-1">
                        <div class='git-inf-desc medium'>${obj.followers}</div>
                        <span class="git-info-text regular">Followers</span>
                    </li>
                    <li class="user-row git-info-2 border">
                        <div class='git-inf-desc medium'>${obj.following}</div>
                        <span class="git-info-text regular">Total Stars</span>
                    </li>
                    <li class="user-row git-info-3">
                        <div class='git-inf-desc medium'>${obj.created_at.substring(
                          0,
                          10
                        )}</div>
                        <span class="git-info-text regular">Times Forked</span>
                    </li>
                     <button class='brk-btn mt-big'><a href='${
                       obj.html_url
                     }'>Profile</a></button>
                </ul>
            </div>
            </div>`;

    document
      .querySelector(".top-content")
      .insertAdjacentHTML("beforeend", html);
  };

  return {
    getValue,
    clearInput,
    clearPrevResults,
    displayUserInfo,
  };
})();

// base
const base = (function () {
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
    renderLoader,
    clearLoader,
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

    // 3.  clear the input field and prev Results
    viewController.clearInput();
    viewController.clearPrevResults();

    // 4. Render the loader
    base.renderLoader(document.querySelector(".loader-container"));

    // 5. make the request(search)
    const data = await state.search.getResults();

    // 6. Clear loader
    base.clearLoader();

    // 7. render the userinfo on UI
    viewController.displayUserInfo(state.search.username);
  };
})();
