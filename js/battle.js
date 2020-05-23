// --------------- SEARCH CONTROLLER ------------------ //
const searchController = (function () {
  async function getResults(username) {
    try {
      const res = await axios(`https://api.github.com/users/${username}`);
      return res.data;
    } catch (e) {
      return `We have an error here: ${e}`;
    }
  }

  async function getRepos(username) {
    try {
      const res = await axios(`https://api.github.com/users/${username}/repos`);
      return res.data;
    } catch (e) {
      return `We have an error here: ${e}`;
    }
  }

  return {
    getResults,
    getRepos,
  };
})();

// --------------- VIEW CONTROLLER ------------------ //
const viewController = (function () {
  function getValue1() {
    const value1 = document.querySelector(".username1").value;
    return value1;
  }
  function getValue2() {
    const value2 = document.querySelector(".username2").value;
    return value2;
  }

  function displayUserName(obj, player, num) {
    let html;
    html = `<div id='togglePlayer-${num}' class="column player player-sm">
                    <h3 class="player-label">Player ${
                      num === 1 ? "One" : "Two"
                    }</h3>
                    <div class="row bg-light">
                        <div class="player-info">
                            <img src="${
                              obj.avatar_url
                            }" alt="Profile of %desc%" class="avatar-small">
                            <a href="${obj.html_url}" class="link">${
      obj.name
    }</a>
                             <button class="btn-clear flex-center">
                            <img src='img/close.png' class='close close-${num}'>
                        </button>
                        </div>
                       
                    </div>`;

    // insert into the DOM
    if (player === "player1") {
      document
        .querySelector(".player-container-1")
        .insertAdjacentHTML("afterbegin", html);
    } else {
      document
        .querySelector(".player-container-2")
        .insertAdjacentHTML("afterbegin", html);
    }
  }

  function displayContainer() {
    let html;
    html = `
    <div class='results-container'>
        <div id='results' class="results grid center container-sm"></div>
         <div class='reset-container center'><a onClick="window.location.reload();" id="btn-reset"
                class="btn-reset brk-btn dark-btn btn-space" href="#">Reset</a>
        </div>
    </div>
    `;
    document.querySelector(".container").insertAdjacentHTML("beforeend", html);
  }

  function displayResult(obj, score, result, player) {
    console.log(obj.name);
    let html;
    html = `
     <div class="card-content top-content user-card">
        <div class='${
          result === "WINNER!" ? "success " : "defeat "
        }user-result'>${result}</div>
        <div class='user-image-container'>
                <img src="${obj.avatar_url}" alt="" class="user-image">
  
            </div>
            <div class='user-info'>
                <h2 class='info-1'>${score}</h2>
                <p class='info-2'><a href='${obj.html_url}' class='link'>${
      obj.login
    }</a></p>
       
            </div>
            <div class='git-info'>
                <ul class='column pad-md'>
		    <li class="git-info-1 reverse">
                        <div class='git-inf-desc medium'>${obj.name}</div>
                        <span class="git-info-text small">NAME</span>
                    </li>
                    <li class="git-info-2 reverse">
                        <div class='git-inf-desc medium'>${obj.location}</div>
                        <span class="git-info-text small">LOCATION</span>
                    </li>
                    <li class="git-info-3 reverse">
                        <div class='git-inf-desc medium'>${obj.followers}</div>
                        <span class="git-info-text small">FOLLOWERS</span>
                    </li>
                    <li class="git-info-4 reverse">
                        <div class='git-inf-desc medium'>${obj.following}</div>
                        <span class="git-info-text small">FOLLOWING</span>
                    </li>
                     <li class="git-info-5 reverse">
                        <div class='git-inf-desc medium'>${
                          obj.public_repos
                        }</div>
                        <span class="git-info-text small">PUBLIC REPOS</span>
                    </li>
                     <li class="git-info-6 reverse">
                        <div class='git-inf-desc medium'>${obj.blog}</div>
                        <span class="git-info-text small">WEBSITE</span>
                    </li>
                </ul>
            </div>
            </div>`;

    if (player === "player1") {
      document.querySelector(".results").insertAdjacentHTML("afterbegin", html);
    } else {
      document.querySelector(".results").insertAdjacentHTML("beforeend", html);
    }
  }

  function removeElement(id) {
    const element = document.getElementById(id);
    element.parentNode.removeChild(element);
  }

  return {
    getValue1,
    getValue2,
    displayUserName,
    removeElement,
    displayResult,
    displayContainer,
  };
})();

// --------------- MAIN CONTROLLER ------------------ //

const controller = (function () {
  // STATE
  const state = {
    userNames: {},
  };

  // EVENT LISTENERS
  function init() {
    document.getElementById("player-1").addEventListener("submit", (e) => {
      e.preventDefault();
      handleControllerOne();
    });
    document.getElementById("player-2").addEventListener("submit", (e) => {
      e.preventDefault();
      handleControllerTwo();
    });
  }
  // EVENT LISTENER FOR CLOSE BUTTON
  function handleToggle(e, playerName) {
    const deleteElementId =
      e.target.parentNode.parentNode.parentNode.parentNode.id;
    viewController.removeElement(deleteElementId);
    if (playerName === "firstName") {
      // removing the query from state too
      state.userNames.firstName = "";
      // display the form element again
      document.getElementById("player-1").style.display = "block";
    } else if (playerName === "secondName") {
      state.userNames.secondName = "";
      document.getElementById("player-2").style.display = "block";
    }
  }

  // HANDLER FOR INPUT ONE
  const handleControllerOne = async function () {
    // 1. get the  username value
    const userName = viewController.getValue1();
    // 2. save in state
    state.userNames.firstName = userName;
    // 3. Make the fetch request and get the data
    const data1 = await searchController.getResults(state.userNames.firstName);

    // 4. show error if we get error
    var element = document.querySelector(".player-container-1 .error");
    if (typeof data1 === "string") {
      element.style.display = "block";
      return false;
    } else {
      element.style.display = "none";
    }

    // 5. Hide the form from UI
    document.getElementById("player-1").style.display = "none";

    // 6. render the playerone UI
    viewController.displayUserName(data1, "player1", 1);

    // 7. Add event listener to remove button
    document
      .querySelector(".player-container-1")
      .addEventListener("click", (e) => {
        if (e.target.classList.contains("close-1")) {
          handleToggle(e, "firstName");
        }
      });
  };

  // HANDLER FOR INPUT TWO
  const handleControllerTwo = async function () {
    // 1. get the  username value
    const userName = viewController.getValue2();
    // 2. save in state
    state.userNames.secondName = userName;
    // 3. Make the fetch request and get the data
    const data2 = await searchController.getResults(state.userNames.secondName);

    // 4. show error if we get error
    var element = document.querySelector(".player-container-2 .error");
    if (typeof data2 === "string") {
      element.style.display = "block";
      return false;
    } else {
      element.style.display = "none";
      // 5. Show the battle btn only if we get data back from api
      document.getElementById("btn-battle").style.display = "inline-block";
    }

    // 6. Hide the form from UI
    document.getElementById("player-2").style.display = "none";

    // 7. render the playertwo UI
    viewController.displayUserName(data2, "player2", 2);

    // 8. Add event listener to remove button
    document
      .querySelector(".player-container-2")
      .addEventListener("click", (e) => {
        if (e.target.classList.contains("close-2")) {
          handleToggle(e, "secondName");
        }
      });

    // 9. add event listener to battle button if it exist
    battleBtn = document.querySelector(".btn-battle");
    if (battleBtn) {
      battleBtn.addEventListener("click", (e) => {
        e.preventDefault();
        controlSearch();
      });
    } else {
      console.log("does not exist");
    }
  };

  // HANDLER FOR BATTLE BUTTON
  const controlSearch = async function () {
    // 1. remove the content container element(containing instructions and both form elements)from UI
    viewController.removeElement("content-container");

    // 2.Show the loader
    renderLoader(document.querySelector(".loader-container"));

    // 3. Make two async request for both users
    if (state.userNames.firstName !== "" && state.userNames.secondName !== "") {
      var result1 = await searchController.getResults(
        state.userNames.firstName
      );
      var result2 = await searchController.getResults(
        state.userNames.secondName
      );
    } else {
      alert("Please enter the query!");
      // make input fields red and showing a message  - 'please enter a valid github username'
    }

    // 4. Make two async request for repos info for both users
    let repos1 = await searchController.getRepos(state.userNames.firstName);
    let repos2 = await searchController.getRepos(state.userNames.secondName);

    // 4. clearing loader
    clearLoader();

    // 5. adding a new container to the page
    viewController.displayContainer();

    // 6. Get stars count , calculate score and decide winner
    let score1, score2, matchResult1, matchResult2;
    const getStars = function (repos) {
      let stars = 0;
      repos.forEach(function (cur) {
        stars += cur.stargazers_count;
      });
      return stars;
    };

    (function getResult() {
      let userOneStars = getStars(repos1);
      let userTwoStars = getStars(repos2);
      score1 = result1.followers * 3 + userOneStars;
      score2 = result2.followers * 3 + userTwoStars;
      if (score1 > score2) {
        matchResult1 = "WINNER!";
        matchResult2 = "LOSER";
      } else if (score2 > score1) {
        matchResult2 = "WINNER!";
        matchResult1 = "LOSER";
      } else {
        matchResult1 = "TIE";
        matchResult2 = "TIE";
      }
    })();

    // 7. Appending the cards to above container and passing scores too
    viewController.displayResult(result1, score1, matchResult1, "player1");
    viewController.displayResult(result2, score2, matchResult2, "player2");

    // 8. display the reset button
    document.getElementById("btn-reset").style.display = "inline-block";
  };
  return {
    init,
  };
})();

controller.init();
