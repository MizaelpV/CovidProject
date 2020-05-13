const confirmado = document.getElementById("confirmados");
const muerte = document.getElementById("fallecidos");
const recuperado = document.getElementById("recuperados");
const hero = document.getElementById("hero");
const searchCountry = document.getElementById("searchCountry");
const search = document.getElementById("search");
const url = "https://covid19.mathdro.id/api/";

let formatNumber = {
  separador: ".",
  sepDecimal: ",",
  formatear: function(num) {
    num += "";
    let splitStr = num.split(".");
    let splitLeft = splitStr[0];
    let splitRight = splitStr.length > 1 ? this.sepDecimal + splitStr[1] : "";
    let regx = /(\d+)(\d{3})/;
    while (regx.test(splitLeft)) {
      splitLeft = splitLeft.replace(regx, "$1" + this.separador + "$2");
    }
    return this.simbol + splitLeft + splitRight;
  },
  new: function(num, simbol) {
    this.simbol = simbol || "";
    return this.formatear(num);
  }
};

//functions to request Data
function recoveredData() {
  try {
    fetch(url)
      .then(data => {
        return data.json();
      })
      .then(({ recovered }) => {
        let r = formatNumber.new(recovered.value);
        render(recuperado, r);
      });
  } catch (error) {
    return console.error(error);
  }
}

recoveredData();

function confirmedData() {
  try {
    fetch(url)
      .then(data => {
        return data.json();
      })
      .then(({ confirmed }) => {
        let c = formatNumber.new(confirmed.value);
        render(confirmado, c);
      });
  } catch (error) {
    return console.error(error);
  }
}

confirmedData();

function deathsData() {
  try {
    fetch(url)
      .then(data => {
        return data.json();
      })
      .then(({ deaths }) => {
        let d = formatNumber.new(deaths.value);
        render(muerte, d);
      });
  } catch (error) {
    return console.error(error);
  }
}

function render(type, value) {
  return (type.innerText = `La cantidad de casos\n ${type.id} es de\n${value} personas\n a nivel mundial`);
}

deathsData();

function getWeekDay(date) {
  let weekdays = [
    "Domingo",
    "Lunes",
    "Martes",
    "Miercoles",
    "Jueves",
    "Viernes",
    "Sábado"
  ];
  let day = date.getDay();
  return weekdays[day];
}

function getMonthString(date) {
  let months = [
    "Enero",
    "Febrero",
    "Marzo",
    "Abril",
    "Mayo",
    "Junio",
    "Julio",
    "Agosto",
    "Septiembre",
    "Octubre",
    "Noviembre",
    "Diciembre"
  ];
  let month = date.getMonth();
  return months[month];
}

function setDateNow() {
  let date = new Date();
  let day = getWeekDay(date);
  let numberDay = date.getDate();
  let month = getMonthString(date);
  let year = date.getFullYear();
  hero.innerText = `Hoy es ${day} ${numberDay} de ${month} de ${year}`;
}

setDateNow();

const urlCountries = "https://covid19.mathdro.id/api/countries";
const fetchCountryConfirmed = (async = country => {
  try {
    fetch(`${urlCountries}/${country}`).then(async data => {
      const { confirmed } = await data.json();
      let confirm = formatNumber.new(confirmed.value);
      let modified =
        country.substring(0, 1).toUpperCase() + country.substring(1);
      console.log(
        `La cantidad de casos confirmados en ${modified} es de ${confirm} personas`
      );
    });
  } catch (error) {
    console.error(error);
  }
});

const renderCountry = event => {
  event.preventDefault();
  if (searchCountry.value) {
    let country = searchCountry.value.toLowerCase();
    fetchCountryConfirmed(country);
    searchCountry.value = "";
  } else {
    console.log("No puede estar vacío");
  }
};

search.addEventListener("click", renderCountry);
