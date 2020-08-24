const articlesContainer = document.querySelector('.articles-container');
const footLinks = document.querySelectorAll('.foot-box');
let selectedUrl = null;

const urls = {
  'astronomy': "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=20&q=Astronomy%20cosmology2020%20articles2020&safeSearch=false",

  'discoveries': "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=20&q=cosmology%20discoveries2020&20safeSearch=false",

  'exoplanets': "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=20&q=exo%20planets2020%20NASA%20articles2020&safeSearch=false",

  'meteors': "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=20&q=meteor%20showers2020%20articles2020&safeSearch=false"

}



function start() {
  // loading spinner function goes here

  for (let i = 0; i < footLinks.length; i++) {
    footLinks[i].addEventListener('click', renderNewPage);
  }
  selectedUrl = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=20&q=Astronomy%20cosmology2020%20articles2020&safeSearch=false";
  $.ajax({
    headers: {
      "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
      "x-rapidapi-key": webSearchApiKey
    },
    async: true,
    crossDomain: true,
    method: "GET",
    url: selectedUrl,
    success: handleGetDataSuccess,
    error: handleGetDataError
  })
}

// Astronomy Article Data
function renderNewPage(e) {
  articlesContainer.innerHTML = '';

  // loading spinner function goes here

  let dataQueryId = e.target.getAttribute('data-query-id');
  // if e.target.attribute of element === id of element clicked, set url for ajax call
  selectedUrl = urls[dataQueryId];
  $.ajax({
    headers: {
      "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
      "x-rapidapi-key": webSearchApiKey
    },
    async: true,
    crossDomain: true,
    method: "GET",
    url: selectedUrl,
    success: handleGetDataSuccess,
    error: handleGetDataError
  })
}




function renderArticle(articleData) {


  for (let i = 0; i < articleData.value.length; i++) {
    const articleBox = document.createElement('div');
    articleBox.classList.add('article-box', 'mt-2');

    // // url
    const articleUrl = document.createElement('a');
    articleUrl.setAttribute('href', articleData.value[i].url);
    articleUrl.classList.add('article-headline');

    // //title
    const articleTitle = document.createElement('h3');
    articleTitle.classList.add('article-title', 'font-weight-bold', 'text-left');
    articleTitle.textContent = articleData.value[i].title.replace(/(<([^>]+)>)/ig, '');


    // //description
    const articleDescription = document.createElement('p');
    articleDescription.classList.add('article-description', 'my-3');
    articleDescription.textContent = articleData.value[i].description.replace(/(<([^>]+)>)/ig, '');

    // // provider
    const articleProvider = document.createElement('span');
    articleProvider.classList.add('text-uppercase');
    articleProvider.textContent = ' - ' + articleData.value[i].provider.name;

    // // date
    const d = new Date(articleData.value[i].datePublished);
    const articleDate = document.createElement('p');
    articleDate.classList.add('article-published-date', 'font-weight-bold');
    articleDate.textContent = d;

    articleDescription.appendChild(articleProvider);
    articleBox.append(articleTitle, articleDescription, articleDate);
    articleUrl.appendChild(articleBox);
    articlesContainer.append(articleUrl);
  }
}


function handleGetDataSuccess(response) {
  renderArticle(response);
  renderImage();

}

function handleGetDataError(error) {
  console.log(error);
}




function renderImage() {
  // Astronomy Images
  $.ajax({
    async: true,
    crossDomain: true,
    url: "https://pixabay.com/api/?key=" + pixebayApiKey + "&per_page=50&q=astronomy&image_type=photo",
    method: "GET",
    success: handleGetHubbleImgSuccess,
    error: handleGetHubbleImgError
  })

}

function handleGetHubbleImgSuccess(response) {

  const heroSpaceImg = document.querySelector('.banner-img');
  const randomSpaceImg = Math.floor((Math.random() * response.hits.length + 1));
  if (!response || response.hits[randomSpaceImg].webformatURL === heroSpaceImg.style.backgroundImage) {
    console.log(response.hits[randomSpaceImg].webformatURL);
    return heroSpaceImg.style.backgroundImage = 'url("images/default-hero-img.jpg")';
  }
  return heroSpaceImg.style.backgroundImage = "url(" + response.hits[randomSpaceImg].webformatURL + ")";
}


function handleGetHubbleImgError(error) {
  console.log(error);
}



start();
