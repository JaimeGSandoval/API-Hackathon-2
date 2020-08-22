$.ajax({
  // url: "https://holidayapi.com/v1/holidays?pretty&key=9c40cd28-12d7-45c8-aecc-00c4d2a5e54c&country=" + countryCode + "&year=2019",
  // headers: {
  //   "x-rapidapi-host": "newscatcher.p.rapidapi.com",
  //   "x-rapidapi-key": "6bb1f7d518mshee6c717c3746b3ap119550jsned3e9335e862"
  // },
  headers: {
    "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
    "x-rapidapi-key": "6bb1f7d518mshee6c717c3746b3ap119550jsned3e9335e862"
  },
  url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=10&q=Astronomy&safeSearch=false",
  method: "GET",
  success: handleGetHolidaySuccess,
  error: handleGetHolidayError
})



function handleGetHolidaySuccess(response) {
  console.log(response);
  for (let i = 0; i < response.value.length; i++) {
    console.log('title', response.value[i].title);
    console.log('description', response.value[i].description);
    console.log('provider', response.value[i].provider);
    console.log('date published', response.value[i].datePublished);
    console.log('url', response.value[i].url);
  }

}

function handleGetHolidayError(error) {
  console.log(error);
}




$.ajax({
  url: "https://pixabay.com/api/?key=17998490-32e95c98e4b0f331d6dd541fb&q=astronomy&image_type=photo",
  method: "GET",
  success: handleGetHubbleImgSuccess,
  error: handleGetHubbleImgError
})

const heroSpaceImg = document.querySelector('.banner-img');
function handleGetHubbleImgSuccess(response) {
  const randomSpaceImg = Math.round((Math.random() * 20)) + 1;
  for (let i = 0; response.hits.length; i++) {
    console.log(response.hits[i]);
    if (!response) {
      heroSpaceImg.style.backgroundImage = 'url("images/default-hero-img.jpg")';
      return;
    } else {
      heroSpaceImg.style.backgroundImage = "url(" + response.hits[randomSpaceImg].webformatURL + ")";
      return;
    }

  }
}


function handleGetHubbleImgError(error) {
  console.log(error);
}
