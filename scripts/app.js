document.addEventListener('DOMContentLoaded', function(){
    
    const cityForm = document.querySelector('form');
    const card = document.querySelector('.card');
    const details = document.querySelector('.details');
    const time = document.querySelector('img.time');
    const icon = document.querySelector('.icon img');

    const updateData = (cityData)=>{

        const {cityDets, weather} = cityData;
        console.log(cityData);
        
        details.innerHTML = `
            <h5 class="my-3">${cityDets.EnglishName}</h5>
            <div class="my-3">${weather.WeatherText}</div>
            <div class="display-4 my-4">
                <span>${weather.Temperature.Metric.Value}</span>
                <span>&deg;C</span>
            </div>
        `
        if(card.classList.contains('d-none')){
            card.classList.remove('d-none');
        }

        const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
        icon.setAttribute('src', iconSrc);

        const timeSrc = weather.IsDayTime ? 'img/day.svg' : 'img/night.svg';
        time.setAttribute('src', timeSrc);
    }


    const updateCity = async (city) => {
        const cityDets = await getCity(city);
        const weather = await getWeather(cityDets.Key);
        return {
            cityDets: cityDets,
            weather: weather
        }
    }
    
    cityForm.addEventListener('submit', e=>{
        e.preventDefault(); // Doesnt refresh the page
    
        const cityValue = cityForm.city.value.trim();
        cityForm.reset();
        updateCity(cityValue)
        .then(data=>updateData(data))
        .catch(err=>console.log(err));
    });

});
