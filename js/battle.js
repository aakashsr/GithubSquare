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

  const removeElement = function (id) {
    const element = document.getElementById(id);
    element.parentNode.removeChild(element);
  };

  return {
    getValue1,
    getValue2,
    displayUserName,
    removeElement,
  };
})();

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

  const handleControllerOne = async function () {
    // 1. get the  username value
    const userName = viewController.getValue1();
    // 2. save in state
    state.userNames.firstName = userName;
    // 3. Make the fetch request and get the data
    const data1 = await searchController.getResults(state.userNames.firstName);
    // 4. Hide the form from UI
    document.getElementById("player-1").style.display = "none";

    // 5. render the playerone UI
    viewController.displayUserName(data1, "player1", 1);

    //  6. Add event listener to remove button
    document
      .querySelector(".player-container-1")
      .addEventListener("click", (e) => {
        if (e.target.classList.contains("close-1")) {
          handleToggle(e, "firstName");
        }
      });
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

    // 5. render the playertwo UI
    viewController.displayUserName(data2, "player2", 2);

    // 6. Show the battle btn
    document.getElementById("btn-battle").style.display = "inline-block";

    //  7. Add event listener to remove button
    document
      .querySelector(".player-container-2")
      .addEventListener("click", (e) => {
        if (e.target.classList.contains("close-2")) {
          handleToggle(e, "secondName");
        }
      });

    // Add event listener to battle button if it exist
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

    // 4. clearing loader
    clearLoader();

    // 5. adding a new container to the page
    searchViewController.displayContainer();
  };
})();
