const articlesContainer = document.querySelector('.articles-container');
const footerContainer = document.querySelector('.footer-nav');
const loader = document.querySelector('#loader');
const icons = document.querySelectorAll('.icons');
const starIcon = document.querySelector('.fa-star');
const newsPaperIcon = document.querySelector('.fa-newspaper');
const globeIcon = document.querySelector('.fa-globe');
const meteorIcon = document.querySelector('.fa-meteor');
let headerTitle = document.querySelector('.top-nav-title');
let currentPage = null;
let selectedUrl = null;

footerContainer.addEventListener('click', renderNewPage);


const mobileMenuIcon = document.querySelector(".mobile-menu-icon");
const modalOverlay = document.querySelector('.modal-overlay');



// function hiddenClass() {
//   if (modalOverlay.classList.contains('hidden')) {
//     modalOverlay.classList.remove('hidden');
//   } else {
//     modalOverlay.classList.add('hidden');
//   }
// }

function sideNavClass() {
  if (modalOverlay.classList.contains('sideNav')) {
    modalOverlay.classList.remove('sideNav');
  } else {
    modalOverlay.classList.add('sideNav');
  }
}

mobileMenuIcon.addEventListener('click', sideNavClass);




const urls = {
  'astronomy': "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=20&q=Astronomy%20cosmology2020%20articles2020&safeSearch=false",

  'discoveries': "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=20&q=cosmology%20discoveries2020&20safeSearch=false",

  'exoplanets': "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=20&q=exo%20planets2020%20NASA%20articles2020&safeSearch=false",

  'meteors': "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=20&q=meteor%20showers2020%20articles2020&safeSearch=false"

}

const headerTitles = {
  "astronomy": "Astronomy News",
  "discoveries": 'Discoveries',
  "exoplanets": "Exoplanets",
  "meteors": "Meteor Showers"
}

const activeIcon = {
  "astronomy": "fa star",
  "discoveries": 'fa newspaper',
  "exoplanets": "fa globe",
  "meteors": "fa meteor"
}



function start() {
  renderImage();
  currentPage = "astronomy";
  selectedUrl = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=20&q=Astronomy%20cosmology2020%20articles2020&safeSearch=false";
  starIcon.classList.add('on-current-page');

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

  headerTitle.textContent = 'Astronomy News';
}



function renderNewPage(e) {
  if (e.target.dataset.queryId === currentPage) {
    return;
  }

  addCurrentPageClass(e);
  footerContainer.removeEventListener('click', renderNewPage, false);
  renderImage();

  let dataQueryId = e.target.getAttribute('data-query-id');
  let title = e.target.dataset.queryId;
  currentPage = dataQueryId;



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

  headerTitle.textContent = headerTitles[title];
  loader.classList.remove('hidden');
  articlesContainer.innerHTML = '';
}


function renderArticle(articleData) {
  for (let i = 0; i < articleData.value.length; i++) {
    const articleBox = document.createElement('div');
    const articleUrl = document.createElement('a');
    const articleTitle = document.createElement('h3');
    const articleDescription = document.createElement('p');
    const articleProvider = document.createElement('span');
    const articleDate = document.createElement('p');
    const d = new Date(articleData.value[i].datePublished);

    articleBox.classList.add('article-box', 'mt-2');

    articleUrl.setAttribute('href', articleData.value[i].url);
    articleUrl.classList.add('article-headline');

    articleTitle.classList.add('article-title', 'font-weight-bold', 'text-left');
    articleTitle.textContent = articleData.value[i].title.replace(/(<([^>]+)>)/ig, '');

    articleDescription.classList.add('article-description', 'my-3');
    articleDescription.textContent = articleData.value[i].description.replace(/(<([^>]+)>)/ig, '');

    articleProvider.classList.add('text-uppercase');
    articleProvider.textContent = ' - ' + articleData.value[i].provider.name;

    articleDate.classList.add('article-published-date', 'font-weight-bold');
    articleDate.textContent = d;

    articleDescription.appendChild(articleProvider);
    articleBox.append(articleTitle, articleDescription, articleDate);
    articleUrl.appendChild(articleBox);
    articlesContainer.append(articleUrl)
  }

  loader.classList.add('hidden');
  footerContainer.addEventListener('click', renderNewPage);
}


function handleGetDataSuccess(response) {
  renderArticle(response);
}

function handleGetDataError(error) {
  console.log(error);
}


function renderImage() {
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
    return heroSpaceImg.style.backgroundImage = 'url("images/default-hero-img.jpg")';
  }
  return heroSpaceImg.style.backgroundImage = "url(" + response.hits[randomSpaceImg].webformatURL + ")";
}


function handleGetHubbleImgError(error) {
  console.log(error);
}

function addCurrentPageClass(e) {

  for (let i = 0; i < icons.length; i++) {
    icons[i].classList.remove('on-current-page');
  }

  if (e.target.dataset.queryId === 'astronomy') {
    starIcon.classList.add('on-current-page');
  } else if (e.target.dataset.queryId === 'discoveries') {
    newsPaperIcon.classList.add('on-current-page');
  } else if (e.target.dataset.queryId === 'exoplanets') {
    globeIcon.classList.add('on-current-page');
  } else {
    meteorIcon.classList.add('on-current-page');
  }
}


start();
