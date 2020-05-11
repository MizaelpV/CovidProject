const confirmado = document.getElementById("confirmed");
const muerte = document.getElementById("deaths");
const recuperado = document.getElementById("recovery");
const hero = document.getElementById("hero");

//functions to request Data
function recoveredData() {
  const url = "https://covid19.mathdro.id/api/";
  try {
    fetch(url)
      .then(data => {
        return data.json();
      })
      .then(({ recovered }) => {
        render(recuperado, recovered.value);
      });
  } catch (error) {
    console.error(error);
  }
}

recoveredData();

function confirmedData() {
  const url = "https://covid19.mathdro.id/api/";
  try {
    fetch(url)
      .then(data => {
        return data.json();
      })
      .then(({ confirmed }) => {
        render(confirmado, confirmed.value);
      });
  } catch (error) {
    console.error(error);
  }
}

confirmedData();

function deathsData() {
  const url = "https://covid19.mathdro.id/api/";
  try {
    fetch(url)
      .then(data => {
        return data.json();
      })
      .then(({ deaths }) => {
        render(muerte, deaths.value);
      });
  } catch (error) {
    console.error(error);
  }
}

function render(type, value) {
  return (type.innerText = `La cantidad de ${type.id} es de:\n${value}\n a nivel mundial`);
}

deathsData();

function getWeekDay(date) {
  let weekdays = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday"
  ];
  let day = date.getDay();
  return weekdays[day];
}

let date = new Date();
let day = getWeekDay(date);
let numberDay = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();

hero.innerText = `Today is ${day}, ${month}/${numberDay}/${year}`;
console.log(`Today is ${day}, ${month}/${numberDay}/${year}`);
