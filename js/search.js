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
      return reposData.data;
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
    document.querySelector(".bottom-grid").innerHTML = "";
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

  const displayReposInfo = function (obj) {
    // clear previous result first
    document.querySelector(".bottom-grid").innerHTML = "";

    obj.forEach(function (cur) {
      let html = `
     <div class="card-content top-content repo-card">
            <div class='user-info'>
                <h2 class='name small'><a href=${cur.svn_url}>${cur.full_name}</a></h2>
                <p class='tag-line'>${cur.description}</p>
            </div>
            <div class='git-info'>
                <ul>
                    <li class="git-inf-1">
                        <div class='git-inf-desc medium'>${cur.stargazers_count}</div>
                        <span class="git-info-test small"><img class='color-star' src='../img/starfilled.png'></span>
                    </li>
                    <li class="git-info-2 border">
                        <div class='git-inf-desc medium'>${cur.forks}</div>
                        <span class="git-info-test small"><img class='color-forked' src='./img/forked.svg'></span>
                    </li>
                    <li class="git-info-3">
                        <div class='git-inf-desc medium'>${cur.language}</div>
                        <span class="git-info-test small"><img class='color-language' src='./img/code2.svg'></span>
                    </li>
                </ul>
            </div>
      </div>`;
      document
        .querySelector(".bottom-grid")
        .insertAdjacentHTML("beforeend", html);
    });
  };

  const displayHeading = function () {
    let html = `<h4>Latest Repos</h4>`;
    document.querySelector(".bottom-content").innerHTML = "";
    document
      .querySelector(".bottom-content")
      .insertAdjacentHTML("afterbegin", html);
  };

  return {
    getValue,
    clearInput,
    clearPrevResults,
    displayUserInfo,
    displayHeading,
    displayReposInfo,
  };
})();

const controller = (function () {
  state = {};

  // set data into local storage
  const setData = function () {
    localStorage.setItem("data", JSON.stringify(state.search));
  };

  // get data from local storage
  const getStoredData = function () {
    const storedData = JSON.parse(localStorage.getItem("data"));
    return storedData;
  };

  const loadData = function () {
    const data = getStoredData();
    if (data) {
      state.search = new searchController.Search(data.query);
      state.search.query = data.query;
      state.search.repos = data.repos;
      state.search.username = data.username;
      viewController.displayUserInfo(state.search.username);
      viewController.displayHeading();
      viewController.displayReposInfo(state.search.repos);
    }
  };

  document
    .querySelector(".username1")
    .addEventListener("input", async function (e) {
      e.preventDefault();
      console.log(e.target.value);
      let data = await axios(`https://api.github.com/users/sdras`);
      console.log(data);
    });

  document.getElementById("player-1").addEventListener("submit", function (e) {
    e.preventDefault(e);
    handleSearch(e);
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
    renderLoader(document.querySelector(".loader-container"));

    // 5. make the request(search)
    data = await state.search.getResults();

    // 6. Show error if we didn't get data back
    var element = document.querySelector(".error");
    if (typeof data === "string") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }

    // // 7. Clear loader
    clearLoader();

    // 8. render the userinfo on UI
    viewController.displayUserInfo(state.search.username);

    // 9. render heading of bottom content
    viewController.displayHeading();

    // 10. render the result of repos
    viewController.displayReposInfo(state.search.repos);
    console.log(state.search.repos);

    // 11. Save the data into local storage
    setData();
  };

  return {
    loadData,
  };
})();

controller.loadData();
localStorage.clear();
