
     class Project {
        constructor(){
        this.countries =[]
        }
        fetchData = () => {
            fetch('https://restcountries.eu/rest/v2/all').then(res=> res.json())
            .then(data=> this.countries = data )
            }
        }
        const myProject = new Project;
        function setup (){
            myProject.fetchData();
        }
    window.onload = setup;
     

    
    function onload() {
    fetch(`https://restcountries.eu/rest/v2/all`)
      .then((response) => response.json())
      .then((allCountries) => {
          
        allCountries.map((country) => {
          const countryDiv = makeCountry(country);
          const countryList = document.getElementById(`countryList`);
          countryList.appendChild(countryDiv);
          
        });
        searchCountriesInput.addEventListener("search", getSearchedCountry(allCountries))
      });
  }

  function makeCountry(countryObj) {
    const countryDiv = document.createElement(`div`);
    countryDiv.className = `country`;
    const flag = document.createElement(`img`);
    flag.className = `flag`;
    flag.src = countryObj.flag;
    countryDiv.appendChild(flag);
    const countryInfo = document.createElement(`div`);
    countryInfo.className = `countryInfo`;
    countryDiv.appendChild(countryInfo);
    const countryNameElement = document.createElement(`h1`);
    countryInfo.appendChild(countryNameElement);
    countryNameElement.className = `countryName`;
    countryNameElement.textContent = countryObj.name;
    countryInfo.appendChild(getCountryInfoSentence(`Population`, countryObj.population));
    countryInfo.appendChild(getCountryInfoSentence(`Region`, countryObj.region));
    countryInfo.appendChild(getCountryInfoSentence(`Capital`, countryObj.capital));
    return countryDiv;
  }

  function SearchedCountry(countryObj){
    const countryDiv = document.createElement(`div`);
    countryDiv.className = `country`;
    const flag = document.createElement(`img`);
    flag.className = `flag`;
    flag.src = countryObj.flag;
    countryDiv.appendChild(flag);
    const countryInfo = document.createElement(`div`);
    countryInfo.className = `countryInfo`;
    countryDiv.appendChild(countryInfo);
    const countryNameElement = document.createElement(`h1`);
    countryInfo.appendChild(countryNameElement);
    countryNameElement.className = `countryName`;
    countryNameElement.textContent = countryObj.name;
    countryInfo.appendChild(getCountryInfoSentence(`Population`, countryObj.population));
    countryInfo.appendChild(getCountryInfoSentence(`Region`, countryObj.region));
    countryInfo.appendChild(getCountryInfoSentence(`Capital`, countryObj.capital));
    return countryDiv;
  }

  function getCountryInfoSentence(infoTitle, value) {
    const sentenceElement = document.createElement(`p`);
    sentenceElement.innerHTML = `<b>${infoTitle}</b> : ${value}`;
    return sentenceElement;
  }

  const searchCountriesInput = document.querySelector(".searchCountries");
//   Search Button function
  function getSearchedCountry(allCountries){
    const x = searchCountriesInput.value.toLowerCase() 
    console.log(x)
    allCountries.forEach((country)=>{
        if (country.name.toLowerCase()  == x){SearchedCountry(country);}
    })
    console.log(x)
    
    };
  window.onload = onload();