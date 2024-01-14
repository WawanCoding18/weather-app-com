//{"coord":{"lon":109.2167,"lat":-7.3},"weather":[{"id":501,"main":"Rain","description":"moderate rain","icon":"10n"}],"base":"stations","main":{"temp":19.85,"feels_like":20.4,"temp_min":19.85,"temp_max":19.85,"pressure":1012,"humidity":96,"sea_level":1012,"grnd_level":903},"visibility":10000,"wind":{"speed":0.82,"deg":174,"gust":1.83},"rain":{"1h":2.3},"clouds":{"all":100},"dt":1704807938,"sys":{"country":"ID","sunrise":1704753241,"sunset":1704798315},"timezone":25200,"id":1649595,"name":"Baturaden","cod":200}

//to call apis
const apisKey = '7008f3c5b7b1ec4ce7e080fa9cf9d291';
const apisUrl = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q='

const body = document.getElementById('All')
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
    document.querySelector('.wind').innerHTML = data.wind.speed+ ' km/h';
    document.querySelector('.pressure').innerHTML = data.main.pressure+ ' m/b'

    //statement jika data cuaca nya menentukan cuaca yg dituju maka gambar nya akan  muncul sesuai cuaca yang data tuju
    if(data.weather[0].main == 'Clouds'){
        weatherIcon.src = 'img/clouds.png'
        
        body.classList.remove('cerah')
        body.classList.remove('hujan')
        body.classList.remove('salju')
        body.classList.add('cuaca')
    }
    else if(data.weather[0].main == 'Rain'){
        weatherIcon.src = 'img/rain.png'

        body.classList.remove('cerah')
        body.classList.remove('cuaca')
        body.classList.remove('salju')
        body.classList.add('hujan')
    }
    else if(data.weather[0].main == 'Drizzle'){
        weatherIcon.src = 'img/drizzle.png'

        body.classList.remove('cerah')
        body.classList.remove('cuaca')
        body.classList.remove('salju')
        body.classList.add('hujan')
    }
    else if(data.weather[0].main == 'Mist'){
        weatherIcon.src = 'img/mist.png'

        body.classList.remove('cerah')
        body.classList.remove('cuaca')
        body.classList.remove('salju')
        body.classList.add('hujan')
    }
    else if(data.weather[0].main == 'Clear'){
        weatherIcon.src = 'img/clear.png'

        body.classList.remove('hujan')
        body.classList.remove('cuaca')
        body.classList.remove('salju')
        body.classList.add('cerah')
    }
    else if(data.weather[0].main == 'Snow'){
        weatherIcon.src = 'img/snow.png'

        body.classList.remove('cerah')
        body.classList.remove('cuaca')
        body.classList.remove('hujan')
        body.classList.add('salju')
    }
    

    document.querySelector('.weather-card').style.display= 'block'
    document.querySelector('.error').style.display = 'none'
}
}
// if click, so result the asnwer in searchbox you want
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
// if enter, so result the asnwer in searchbox you want
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

//selection about scroll event moment
const scrollMain = document.querySelector('.gallery1')
const scrolLeft = document.getElementById('arrow-left-circle')
const scrolRight = document.getElementById('arrow-right-circle')
const cardUpcoming = document.querySelector('.weather-upcoming')


//jika mouse di scroll atas bawah maka akan bergerak
scrollMain.addEventListener('wheel', function(e){
     const move = 30
     if (e.deltaY > 0)// <= scrol rigth
       scrollMain.scrollLeft += move
    else // <= scrol left
        scrollMain.scrollLeft -= move
        e.preventDefault()
})

//jika dipencet tanda panah nya yg kanan ato kiri maka akan ngescroll
scrollMain.addEventListener("wheel", (e) => {
    e.preventDefault()
    scrollMain.scrollLeft += e.deltaY
    scrollMain.style.scrollBehavior = 'auto'
})

scrolLeft.addEventListener("click", ()=>{
    scrollMain.style.scrollBehavior = 'smooth'
    scrollMain.scrollLeft -= 1000;
})

scrolRight.addEventListener("click", ()=>{
    scrollMain.style.scrollBehavior = 'smooth'
    scrollMain.scrollLeft += 1000;
})

// let pressed = false;
// let cursorX;
// scrollMain.addEventListener('mousedown', function (e){
//     pressed = true
//     cursorX = e.offsetX - cardUpcoming.offsetXLeft;
//     scrollMain.style.cursor = 'grabbling'
// })

// scrollMain.addEventListener('mousemove', (e) =>{
//     if(!pressed) return;
//     e.preventDefault()
//     cardUpcoming.style.left = `${e.offsetX - cursorX}px`
// })

//






