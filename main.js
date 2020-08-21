// $.ajax({
//   // url: "https://holidayapi.com/v1/holidays?pretty&key=9c40cd28-12d7-45c8-aecc-00c4d2a5e54c&country=" + countryCode + "&year=2019",
//   // headers: {
//   //   "x-rapidapi-host": "newscatcher.p.rapidapi.com",
//   //   "x-rapidapi-key": "6bb1f7d518mshee6c717c3746b3ap119550jsned3e9335e862"
//   // },
//   headers: {
//     "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
//     "x-rapidapi-key": "6bb1f7d518mshee6c717c3746b3ap119550jsned3e9335e862"
//   },
//   url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=10&q=Astronomy&safeSearch=false",
//   method: "GET",
//   success: handleGetHolidaySuccess,
//   error: handleGetHolidayError
// })



// function handleGetHolidaySuccess(response) {
//   console.log(response.value[0].title);
//   console.log(response.value[0].url)
//   for (let i = 0; i < response.value.length; i++) {
//     console.log(response.value[i].title)
//   }
// }


// function handleGetHolidayError(error) {
//   console.log(error);
// }
