const searchController = (function () {})();
const viewController = (function () {})();

// main controller module
const controller = (function () {
  // Event listeners

  // To toggle select menu
  document.querySelector(".selected").addEventListener("click", () => {
    document.querySelector(".options-container").classList.toggle("active");
  });

  // To update select menu
  document.querySelectorAll(".option").forEach((item) => {
    item.addEventListener("click", () => {
      document.querySelector(".selected").innerHTML = item.querySelector(
        "label"
      ).innerHTML;
      document.querySelector(".options-container").classList.remove("active");

      handleResult(item);
    });
  });

  function handleResult(item) {
    // 1. get the query
    let query = item.querySelector("label").innerHTML;
    console.log(query);
  }
})();
