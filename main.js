const articlesContainer = document.querySelector('.articles-container');
const footerContainer = document.querySelector('.footer-nav');
const loader = document.querySelector('#loader');
const icons = document.querySelectorAll('.icons');
const astronautIcon = document.querySelector('.fa-user-astronaut');
const sideNavMobile = document.querySelector('.side-nav-mobile');
const mobileMenuIcon = document.querySelector(".mobile-menu-icon");
const sideModalOverlay = document.querySelector('.side-modal-overlay');
let headerTitle = document.querySelector('.top-nav-title');
let currentPage = null;
let selectedUrl = null;

sideNavMobile.addEventListener('click', renderNewPage);
mobileMenuIcon.addEventListener('click', sideNavClass);





const urls = {
  'astronomy': "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=20&q=new%20astronomy%20cosmology%20news%20articles2020&safeSearch=false",

  'A.I. discoveries': "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=20&q=AI%20artificial%20intelligence%20articles2020&safeSearch=false",

  'exoplanets': "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=20&q=exoplanets2020%20NASA%20plantetary%20science%20seti%20articles2020&safeSearch=false",

  'meteors': "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=20&q=meteor%20showers2020%20articles2020&safeSearch=false",

  "astrobiology": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=20&q=astrobiology%20news2020%20articles2020&safeSearch=false",

  "quantum": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=20&q=quantum%20physics%20mechanics%20news2020%20articles2020&safeSearch=false",

  "gravity": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=20&q=gravity%20physics%20waves%20science%20news2020%20articles2020&safeSearch=false",

  'seti': "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=20&q=SETI%20physics%20astrobiology%20exoplanets%20seti%20org%20%20news2020%20articles2020&safeSearch=false",

  "cern": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=20&q=CERN%20physics%20particle%20collider%20hydron%20news2020%20articles2020&safeSearch=false",

  "d-wave": "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=20&q=D-Wave%20quantum%20computing%20cern%20news2020%20articles2020&safeSearch=false"

}

const headerTitles = {
  "astronomy": "Astronomy News",
  "A.I. discoveries": 'Artificial Intelligence',
  "exoplanets": "Exoplanets",
  "meteors": "Meteor Showers",
  "astrobiology": "Astrobiology",
  "quantum": "Quantum Physics",
  "gravity": "Gravity",
  "seti": "SETI",
  "cern": "CERN",
  "d-wave": "Quantum Computing"
}



function start() {
  renderImage();
  currentPage = "astronomy";
  selectedUrl = "https://contextualwebsearch-websearch-v1.p.rapidapi.com/api/Search/NewsSearchAPI?autoCorrect=false&pageNumber=1&pageSize=20&q=new%20astronomy%20cosmology%20news%articles%202020&safeSearch=false";
  astronautIcon.classList.add('on-current-page');

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
  console.log(e.currentTarget)
  if (e.target.dataset.queryId === currentPage) {
    return;
  }

  footerContainer.removeEventListener('click', renderNewPage, false);
  sideNavMobile.removeEventListener('click', renderNewPage, false);

  sideModalOverlay.classList.remove('sideNav');
  addCurrentPageClass(e);
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

  if (headerTitle.textContent === "Quantum Computing" || headerTitle.textContent === "Artificial Intelligence") {
    headerTitle.classList.add('quantum-font');
  }

  loader.classList.remove('hidden');
  articlesContainer.innerHTML = '';

}


function handleGetDataSuccess(response) {
  renderArticle(response);

}

function handleGetDataError(error) {
  sideNavMobile.addEventListener('click', renderNewPage);
  footerContainer.addEventListener('click', renderNewPage);
  loader.classList.add('hidden');
  const errorText = document.createElement('h2');
  errorText.textContent = "An Error has Occurred. Please try again.";
  errorText.classList.add('error-text');
  articlesContainer.append(errorText);
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
  const randomSpaceImg = Math.floor((Math.random() * response.hits.length));
  if (!response || response.hits[randomSpaceImg].webformatURL === heroSpaceImg.style.backgroundImage) {
    return heroSpaceImg.style.backgroundImage = 'url("images/default-hero-img.jpg")';
  }
  return heroSpaceImg.style.backgroundImage = "url(" + response.hits[randomSpaceImg].webformatURL + ")";
}


function handleGetHubbleImgError(error) {
  console.log(error);
}



function renderArticle(articleData) {

  for (let i = 0; i < articleData.value.length; i++) {
    const articleSectionTitle = document.createElement('h2');
    const articleBox = document.createElement('div');
    const articleUrl = document.createElement('a');
    const articleTitle = document.createElement('h3');
    const articleDescription = document.createElement('p');
    const articleProvider = document.createElement('span');
    const articleDate = document.createElement('p');
    const d = new Date(articleData.value[i].datePublished);

    articleSectionTitle.textContent = "ARTICLE";
    articleSectionTitle.classList.add('article-section-title', 'mt-5', 'font-weight-bold');
    articleBox.classList.add('article-box', 'mt-2', 'text-decoration-none');

    articleUrl.setAttribute('href', articleData.value[i].url);
    articleUrl.classList.add('article-headline', 'pb-5');

    articleTitle.classList.add('article-title', 'font-weight-bold', 'text-left', 'mt-3');
    articleTitle.textContent = articleData.value[i].title.replace(/(<([^>]+)>)/ig, '');

    articleDescription.classList.add('article-description', 'mb-3', 'mt-4', 'text-decoration-none');
    articleDescription.textContent = articleData.value[i].description.replace(/(<([^>]+)>)/ig, '');

    articleProvider.classList.add('text-uppercase');
    articleProvider.textContent = ' - ' + articleData.value[i].provider.name;

    articleDate.classList.add('article-published-date', 'font-weight-bold', 'mb-5');
    articleDate.textContent = d;

    articleDescription.appendChild(articleProvider);
    articleBox.append(articleTitle, articleDescription, articleDate);
    articleUrl.appendChild(articleBox);
    articlesContainer.append(articleSectionTitle, articleUrl)
  }

  loader.classList.add('hidden');
  footerContainer.addEventListener('click', renderNewPage);
  sideNavMobile.addEventListener('click', renderNewPage);
  greetModal();
}


function addCurrentPageClass(e) {
  const newsPaperIcon = document.querySelector('.fa-newspaper');
  const globeIcon = document.querySelector('.fa-globe');
  const meteorIcon = document.querySelector('.fa-meteor');

  for (let i = 0; i < icons.length; i++) {
    icons[i].classList.remove('on-current-page');
  }

  if (e.target.dataset.queryId === 'astronomy') {
    astronautIcon.classList.add('on-current-page');
  } else if (e.target.dataset.queryId === 'A.I. discoveries') {
    newsPaperIcon.classList.add('on-current-page');
  } else if (e.target.dataset.queryId === 'exoplanets') {
    globeIcon.classList.add('on-current-page');
  } else if (e.target.dataset.queryId === 'meteors') {
    meteorIcon.classList.add('on-current-page');
  } else {
    return;
  }
}


setTimeout(function () {
  return footerContainer.addEventListener('click', renderNewPage);
}, 4000);


function greetModal() {
  let modal = document.querySelector('.modal-overlay-greet');
  modal.classList.add('hidden');
}

function sideNavClass() {
  if (sideModalOverlay.classList.contains('sideNav')) {
    sideModalOverlay.classList.remove('sideNav');
  } else {
    sideModalOverlay.classList.add('sideNav');
  }
}


start();
