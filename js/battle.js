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
                    <h3 class="player-label">Player One</h3>
                    <div class="row bg-light">
                        <div class="player-info">
                            <img src="${obj.avatar_url}" alt="Profile of %desc%" class="avatar-small">
                            <a href="${obj.html_url}" class="link">${obj.name}</a>
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

  return {
    getValue1,
    getValue2,
    displayUserName,
  };
})();
const controller = (function () {
  const state = {
    userNames: {},
  };

  document.getElementById("player-1").addEventListener("submit", (e) => {
    e.preventDefault();
    handleControllerOne();
  });
  document.getElementById("player-2").addEventListener("submit", (e) => {
    e.preventDefault();
    handleControllerTwo();
  });

  const handleControllerOne = async function () {
    // 1. get the  username value
    const userName = viewController.getValue1();
    // 2. save in state
    state.userNames.firstName = userName;
    // 3. Make the fetch request and get the data
    const data1 = await searchController.getResults(state.userNames.firstName);
    // 4. Hide the form from UI
    document.getElementById("player-1").style.display = "none";

    // 5. render the UI
    viewController.displayUserName(data1, "player1", 1);
  };
  const handleControllerTwo = async function () {
    // 1. get the  username value
    const userName = viewController.getValue2();
    // 2. save in state
    state.userNames.secondName = userName;
    // 3. Make the fetch request and get the data
    const data2 = await searchController.getResults(state.userNames.secondName);
    // 4. Hide the form from UI
    document.getElementById("player-2").style.display = "none";

    // 5. render the UI
    viewController.displayUserName(data2, "player2", 2);
  };
})();
