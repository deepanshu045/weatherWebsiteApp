const temperature = document.querySelector(".temp")
const city = document.querySelector(".city")
const humid = document.querySelector(".humidity")
const wind = document.querySelector(".wind")
const searchField = document.querySelector("input")
const searchButton = document.querySelector("button")
const imageCondt = document.querySelector("#hero")

//Getting User Nearest City
fetch("https://ipinfo.io/json?token={Your api Key}")  \\Your api key
    .then(response => response.json())
    .then(data => {
        search(data.city)
    })
    .catch(error => console.error("Error fetching city:", error));

//Function of Weather Api
  function search(cityname) {
    const apikey = 'Your api key' \\your api key
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${cityname}&units=metric&appid=${apikey}`
    
    fetch(url)
        .then(response => response.json())
        .then(data => {
            temperature.innerHTML = `${data.main.temp} &deg;C`;
            city.textContent = `${data.name}`;
            humid.textContent = `${data.main.humidity}%`;
            wind.textContent = `${data.wind.speed} km/h`;


            if (data.main.temp > 25) {
                imageCondt.setAttribute("src", "images/clear.png");
            } else if (data.main.temp < 25 && data.main.temp > 5) {
                imageCondt.setAttribute("src", "images/clouds.png");
            }
            else if (data.main.temp < 5 && data.main.temp > -100) {
                imageCondt.setAttribute("src", "images/snow.png");
            }
           else if (data.clouds.all > 80) {
                imageCondt.setAttribute("src", "images/rain.png");
            }

        }
        )
        .catch(error => {
             console.log("error",error)
             });

}


searchButton.addEventListener("click", () => {
    if (searchField.value != '') {
      
        search(searchField.value);

    } 
})
