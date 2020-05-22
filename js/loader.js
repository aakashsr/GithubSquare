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
