
// Astronomy Article Data
$.ajax({
  headers: {
    "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
    "x-rapidapi-key": "6bb1f7d518mshee6c717c3746b3ap119550jsned3e9335e862"
  },
  url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=10&q=Astronomy&safeSearch=false",
  method: "GET",
  success: handleGetDataSuccess,
  error: handleGetDataError
})


// < div class="article-box mt-2" >
//   <h3 class="article-headline font-weight-bold text-left">What does the Future of Astronomy Hold? We'll Find Out
//         Soon - Discovery Magazine</h3>
//   <p class="article-text">What does the Future of Astronomy Hold? We'll Find Out
//         Soon - Discover Magazine</p>
//   <p class="article-published-date font-weight-bold">Aug 14, 2020 at 4:30 pm</p>
//     </div >


function renderArticle(articleData) {
  const articlesContainer = document.querySelector('.articles-container');
  // console.log(articleData);
  // Next to do
  // set textcontent & set styles for provider span

  for (let i = 0; i < articleData.value.length; i++) {
    const articleBox = document.createElement('div');
    articleBox.classList.add('article-box', 'mt-2');

    // // url
    const articleUrl = document.createElement('a');
    articleUrl.setAttribute('href', articleData.value[i].url);

    // //title
    const articleTitle = document.createElement('h3');
    articleTitle.classList.add('article-title', 'font-weight-bold', 'text-left');
    articleTitle.innerText = articleData.value[i].title;

    // //description
    const articleDescription = document.createElement('p');
    articleDescription.classList.add('article-description');
    articleDescription.textContent = articleData.value[i].description;

    // // provider
    const articleProvider = document.createElement('span');
    articleProvider.textContent = articleData.value[i].provider.name;

    // // date
    const articleDate = document.createElement('p');
    articleDate.classList.add('article-published-date', 'font-weight-bold');
    articleDate.textContent = articleData.value[i].datePublished;

    articleDescription.appendChild(articleProvider);
    articleBox.append(articleTitle, articleDescription, articleDate);
    articleUrl.appendChild(articleBox);
    console.log(articleUrl);
    // console.log('url', articleUrl);
    // console.log('title', articleTitle);
    // console.log('description', articleDescription);
    // console.log('provider', articleProvider);
    // console.log('date published', articleDate);

    // console.log('title', articleData.value[i].title);
    // console.log('description', articleData.value[i].description);
    // console.log('provider', articleData.value[i].provider);
    // console.log('date published', articleData.value[i].datePublished);
    // console.log('url', articleData.value[i].url);
    articlesContainer.append(articleUrl);
  }
}


function handleGetDataSuccess(response) {
  // console.log(response);
  renderArticle(response);

}

function handleGetDataError(error) {
  console.log(error);
}



// Astronomy Images
// $.ajax({
//   url: "https://pixabay.com/api/?key=17998490-32e95c98e4b0f331d6dd541fb&q=astronomy&image_type=photo",
//   method: "GET",
//   success: handleGetHubbleImgSuccess,
//   error: handleGetHubbleImgError
// })

// function handleGetHubbleImgSuccess(response) {
//   const heroSpaceImg = document.querySelector('.banner-img');
//   const randomSpaceImg = Math.round((Math.random() * 20)) + 1;
//   for (let i = 0; response.hits.length; i++) {
//     console.log(response.hits[i]);
//     if (!response) {
//       heroSpaceImg.style.backgroundImage = 'url("images/default-hero-img.jpg")';
//       return;
//     } else {
//       heroSpaceImg.style.backgroundImage = "url(" + response.hits[randomSpaceImg].webformatURL + ")";
//       return;
//     }

//   }
// }


// function handleGetHubbleImgError(error) {
//   console.log(error);
// }
