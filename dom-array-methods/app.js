const main = document.getElementById("main");
const addUserBtn = document.getElementById("add_user");
const doubleBtn = document.getElementById("double");
const showMillionairesBtn = document.getElementById("show_millionaires");
const sortBtn = document.getElementById("sort");
const calculateWealthBtn = document.getElementById("calculate_wealth");

let data = [];

// fetch random user and add money
async function getRandomUser() {
  try {
    const res = await fetch("https://randomuser.me/api/");
    if (!res.ok) {
      throw Error(res.statusText);
    }
    const data = await res.json();
    const user = data.results[0];
    const newUser = {
      name: `${user.name.first} ${user.name.last}`,
      money: Math.floor(Math.random() * 1000000),
      img: `${user.picture.thumbnail}`,
    };
    addData(newUser);
  } catch (err) {
    alert(`Oops something went wrong. ${err}. Please try again`);
  }
}

// Add new user obj to data array
function addData(obj) {
  data.push(obj);

  updateDOM();
}

// Update DOM
function updateDOM(providedData = data) {
  // clear main div
  main.innerHTML = `<h2><strong>Person</strong> Wealth</h2>`;

  providedData.forEach((item) => {
    const element = document.createElement("div");
    element.classList.add("person");
    element.innerHTML = `<div><img src="${
      item.img
    }" alt="profile pic" /> <strong>${item.name}</strong></div><p>${formatMoney(
      item.money
    )}</p>`;
    main.appendChild(element);
  });
}

// Format number as money
function formatMoney(number) {
  return `$` + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
}

// Double money
function doubleMoney() {
  data = data.map((user) => {
    return { ...user, money: user.money * 2 };
  });

  updateDOM();
}

// Sort by richest
function sortByRichest() {
  data.sort((a, b) => b.money - a.money);

  updateDOM();
}

getRandomUser();
getRandomUser();
getRandomUser();

// Event Listeners
addUserBtn.addEventListener("click", getRandomUser);
doubleBtn.addEventListener("click", doubleMoney);
sortBtn.addEventListener("click", sortByRichest);
