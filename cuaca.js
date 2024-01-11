//{"coord":{"lon":109.2167,"lat":-7.3},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10n"}],"base":"stations","main":{"temp":19.85,"feels_like":20.4,"temp_min":19.85,"temp_max":19.85,"pressure":1012,"humidity":96,"sea_level":1012,"grnd_level":903},"visibility":10000,"wind":{"speed":0.82,"deg":174,"gust":1.83},"rain":{"1h":2.3},"clouds":{"all":100},"dt":1704807938,"sys":{"country":"ID","sunrise":1704753241,"sunset":1704798315},"timezone":25200,"id":1649595,"name":"Baturaden","cod":200}

//to call apis
const apisKey = '7008f3c5b7b1ec4ce7e080fa9cf9d291';
const apisUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='

const weatherCard = document.querySelector('.weather-card')
const weatherIcon = document.querySelector('.weather-icon')
const searchBox = document.querySelector('.search input')
const searchBtn = document.querySelector('.search button')
const error = document.querySelector('.eror')

//make fuction weather

async function weatherConditional(city){
    const response = await fetch(apisUrl+ city + `&appid=${apisKey}`);

    if(response.status == 404){
       error.style.display = 'block'
       weatherCard.style.display = 'none'
       
       setTimeout(function(){
           error.style.display = 'none' 
       }, 2000)

    }else{

    var data = await response.json();
    //to appear data
    document.querySelector('.city').innerHTML = data.name;
    document.querySelector('.temp').innerHTML = Math.round(data.main.temp)+ ' °c';
    document.querySelector('.humidity').innerHTML = data.main.humidity+ ' %';
    document.querySelector('.wind').innerHTML = data.wind.speed+ ' km/h'

    //statement 
    if(data.weather[0].main == 'Clouds'){
        weatherIcon.src = 'img/clouds.png'
    }
    else if(data.weather[0].main == 'Rain'){
        weatherIcon.src = 'img/rain.png'
    }
    else if(data.weather[0].main == 'Drizzle'){
        weatherIcon.src = 'img/drizzle.png'
    }
    else if(data.weather[0].main == 'Mist'){
        weatherIcon.src = 'img/mist.png'
    }
    else if(data.weather[0].main == 'Clear'){
        weatherIcon.src = 'img/clear.png'
    }
    else if(data.weather[0].main == 'Snow'){
        weatherIcon.src = 'img/snow.png'
    }
    

    document.querySelector('.weather-card').style.display= 'block'
    document.querySelector('.error').style.display = 'none'
}
}

searchBtn.addEventListener('click', function(){
    const wrong = searchBox.value.trim()
    
    if(wrong == ''){
         deleteTrim('Invalid city')
    }else{
        weatherConditional(wrong)
    }

    setTimeout(function(){
        searchBox.value = null
    }, 500)
 
})

searchBox.addEventListener('keydown', function(enter){
    if(enter.key == 'Enter'){
        enter.preventDefault()
    const wrong = searchBox.value.trim() 

    if(wrong == ''){
         deleteTrim('Invalid city')
    }else{
        weatherConditional(wrong)
    }
       setTimeout(function(){
          searchBox.value = null
       }, 500)
    }


})

function deleteTrim(){
      error.style.display = 'block'
      weatherCard.style.display = 'none'

      setTimeout(function(){
        error.style.display = 'none' 
      }, 2000)
}

