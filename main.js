
// Astronomy Article Data
function renderNewPage(e) {
  console.log(e.target);
}

const footLinks = document.querySelectorAll('.foot-box');
console.log(footLinks);

for (let i = 0; i < footLinks.length; i++) {
  footLinks[i].addEventListener('click', renderNewPage);
}


let id = true;

// if e.target.attribute of element === id of element clicked, set url for ajax call
let selectedUrl = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=20&q=meteor%20showers2020%20articles2020&safeSearch=true";

// let urlArr = {

// }

if (id) {

  $.ajax({
    headers: {
      "x-rapidapi-host": "contextualwebsearch-websearch-v1.p.rapidapi.com",
      "x-rapidapi-key": webSearchApiKey
    },
    async: true,
    crossDomain: true,

    // Astronomy
    // url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=20&q=Astronomy%20cosmology2020%20articles2020&safeSearch=false",

    // Discoveries
    // url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=20&q=cosmology%20discoveries2020&20safeSearch=false",

    // Exoplanets
    // url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=20&q=exo%20planets2020%20NASA%20articles2020&safeSearch=false",


    // url: "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=20&q=meteor%20showers2020%20articles2020&safeSearch=false",

    method: "GET",
    url: selectedUrl,
    success: handleGetDataSuccess,
    error: handleGetDataError
  })

}


function renderArticle(articleData) {
  const articlesContainer = document.querySelector('.articles-container');
  // console.log(articleData);

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
    console.log(articleUrl);
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
$.ajax({
  async: true,
  crossDomain: true,
  url: "https://pixabay.com/api/?key=" + pixebayApiKey + "&q=astronomy&image_type=photo",
  method: "GET",
  success: handleGetHubbleImgSuccess,
  error: handleGetHubbleImgError
})

function handleGetHubbleImgSuccess(response) {

  const heroSpaceImg = document.querySelector('.banner-img');
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
