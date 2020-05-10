const url = "https://covid19.mathdro.id/api/countries/chile";
const request = document.getElementById("search");

const result = fetch(url);
result
  .then(data => {
    return data.json();
  })
  .then(({ confirmed }) => {
    //  let count = data.confirmed
    renderizar(confirmed.value);
  });

const renderizar = number => {
  console.log(`La cantidad de casos confirmados es de: ${number}`);
};

request.addEventListener("click", () => {
  alert("prueba");
});
renderizar();

console.log("Probando ");
