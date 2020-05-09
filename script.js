const rootElem = document.getElementById("root");
  //Create search feature;
rootElem.innerHTML = `
<section id="header-section">
  <h1>Where in the World?</h1><br>
  <div class="search-bar">            
      <input type="search" id="country-search"
        placeholder="Search for country"
      />
    <select name="" id="" class="select-box">
        <option value=""> All region</option>
        <option value="Europe"> Europe</option>
        <option value="Asia"> Asia</option>
        <option value="Americas">America </option>
        <option value="Africa"> Africa</option>
        <option value="Oceania"> Oceania</option>
    </select>
  </div>
</section>
<div id="Container">
</div>`; 
        
function setup() {
    fetch(`https://restcountries.eu/rest/v2/all`)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        displayBoxesForCountries(data);    
      });   
}

function displayBoxesForCountries(countryList) {
  let countries = document.getElementById("Container");
  countries.innerHTML = createAllCountriesBox(countryList);
  //Search Field

  let searchEntry = document.getElementById("country-search");
  searchEntry.addEventListener("keyup", function () {
    let filteredCountry = countryList.filter(
      (country) => country.name.toLowerCase().includes(searchEntry.value)
    );
    countries.innerHTML = createAllCountriesBox(filteredCountry);
  });
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

window.onload = setup();