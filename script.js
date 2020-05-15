const rootElem = document.getElementById("root");
  //Create search feature;
rootElem.innerHTML += `
<div id="container">
  <section id="header-section">
    <div class="top-bar">
      <h1>Where in the World?</h1>
      <button id="mode" type="button">Dark Mode</button>
    </div>
    <div class="search-bar">            
        <input type="search" id="country-search"
          placeholder="Search for country"
        />
      <select name="" id="region-search" class="select-box">
          <option value=""> All regions</option>
          <option value="Europe"> Europe</option>
          <option value="Asia"> Asia</option>
          <option value="Americas">America </option>
          <option value="Africa"> Africa</option>
          <option value="Oceania"> Oceania</option>
      </select>
    </div>
  </section>
  
  <div id="country-container" class="container-hide">
  </div>
<div>`; 

const URLCountries = "https://restcountries.eu/rest/v2/all"
        
function setup() {
    fetch(URLCountries)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        displayBoxesForCountries(data);    
      });   
}

function displayBoxesForCountries(countryList) {
  let countriesContainer = document.getElementById("country-container");
  countriesContainer.innerHTML = createAllCountriesBox(countryList);
  
  //Search By Country
  let searchEntry = document.getElementById("country-search");
  searchEntry.addEventListener("keyup", function () {
    let filteredCountry = countryList.filter(
      (country) => country.name.toLowerCase().includes(searchEntry.value)
    );
    countriesContainer.innerHTML = createAllCountriesBox(filteredCountry);
  });

  //Filter By Region
  let filterRegion = document.querySelector("#region-search");
  filterRegion.addEventListener("change", function (event) {
    let regionValue = event.target.value;
    let countriesFilteredByRegion = countryList.filter((country) => {
      return country.region === regionValue;
    });
    countriesContainer.innerHTML = createAllCountriesBox(countriesFilteredByRegion);
  });

  //Brings country info on click on flag
  document.querySelectorAll(".flag").forEach((item) =>
    item.addEventListener("click", function() {
      let filterOnFlagClick = countryList.find((country) => {
        if( country.flag === item.src);
        return country
      });
      showCountryDetails(filterOnFlagClick);
   
    } )
  )
        
}
function createAllCountriesBox(countryObjects) {
    return countryObjects.map(function (country){
     
       return `<div class="country">
          <img class="flag" src=${country.flag}>
          <div class="countryInfo">
            <h1 class="countryName">${country.name}</h1>
            <p><b>Population :</b> ${country.population}</p>
            <p><b>Region :</b> ${country.region}</p>
            <p><b>Capital :</b> ${country.capital}</p>
          </div>
        </div>`
        
    })
    .join("")
}


function showCountryDetails(country){
  
  let countryDetails = document.querySelector("#flag-country-details")
  countryDetails.innerHTML = createNewCountryDetailsBox(country)
  let countryContainer = document.querySelector("#country-container");
  countryContainer.classList.remove("hide")

  let backButton = document.querySelector(".back")
  backButton.addEventListener("click",function () {
    countryContainer.classList.add("hide")
  });
}

function createNewCountryDetailsBox(country) {
  return `
        <img id="detail-flag" src=${country.flag}  alt=country flag />
        <h2>${country.name}</h2>
        <p><b>Native Name:</b>
            ${country.nativeName} </p>
        <p><b>Population:</b>
            ${country.population}</p>
        <p><b>Region:</strong>
                    ${country.region}</p>
        <p> <b>Sub Region:</b>
            ${country.subregion} </p>
        <p><b>Capital:</b>
            ${country.capital} </p>
        <p><b>Top Level Domain:</b>
            ${country.topLevelDomain}</p>
        <p>
        <b>Currencies:</b>
        ${country.currencies.map((currency) => currency.code)}
        </p>
        <p>
            <strong>Languages:</b>
            ${country.languages.map((language) => language.name)}
        </p>
    `;
}
window.onload = setup();