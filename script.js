const API_KEy = "5e3e31f777de460480213ee5f904cb6f";
const url = "https://newsapi.org/v2/everything?q=";

// while loading the page there should be some news which have to load.

// so during load add one event listner to call a callback function. and in call back function it will load news of India.

window.addEventListener("load", () => fetchNews("India"));

function reload () {
    window.location.reload();
}

async function fetchNews (query) {
   const res = await fetch(`${url}${query}&apiKey=${API_KEy}`);
   const data = await res.json();
   console.log(data);

    // now bind the data. data is in array format with name articles.

    bindData(data.articles);
}

// after binding data in template (after cloning every template) append it in container of main.

function bindData (articles) {
    const cardsContainer = document.getElementById("cards-container");
    const newsCardTemplate = document.getElementById("template-news-card")
    

    // to empty card container on each load. otherwise it will store old 100 cards then new 100, new 100 and so on.
    
    cardsContainer.innerHTML = '';

    articles.forEach(article => {
        if(!article.urlToImage) return;

        // now after eliminating article without image, make clone of template.

        const cardClone = newsCardTemplate.content.cloneNode(true);
        fillDataInCard(cardClone, article);
        cardsContainer.appendChild(cardClone);
    });
}

//function to fill data before appending card in cardsContainer.

function fillDataInCard (cardClone, article) {
    const newsImg = cardClone.querySelector('#news-image');
    const newsTitle = cardClone.querySelector('#news-tittle');
    const newsSource = cardClone.querySelector('#news-source');
    const newsdesc = cardClone.querySelector('#news-desc');

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsdesc.innerHTML = article.description;

    //to show date, after converting it in human readable format and as per the timezone of asia.

    const date = new Date (article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    // on click the page should take you to the news url(original url.)

    cardClone.firstElementChild.addEventListener('click', () => {
        window.open(article.url,("_blank"))
    })
}

// for nav link click and color change on click

//i passed search function id because id and search function is same. and i haven't define the seacrh fuction separately.  

let curSelectedNav = null;

function onNavItemClick (id) {
    fetchNews(id);

    const navItem = document.getElementById(id);
    curSelectedNav?.classList.remove("active");
    curSelectedNav = navItem;
    curSelectedNav.classList.add("active");
}

// for input

const searchButton = document.getElementById('search-button');
const searchText = document.getElementById('search-text');

searchButton.addEventListener( 'click', () => {
   const query = searchText.value;
   if(!query) return;
   fetchNews(query);
   curSelectedNav?.classList.remove("active");
   curSelectedNav = null;
})