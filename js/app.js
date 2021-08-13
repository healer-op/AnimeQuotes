/*
     API FETCHER BY 
       HEALER OP
  Github.com/healer-op
*/

const apiUrl = "https://animechan.vercel.app/api";

const searchButton = document.querySelector('#search-button');

let currentPage = 1;

// fetch data from API
function fetch (url, callback) {
    var xhr = new XMLHttpRequest();
  
    xhr.addEventListener('load', function () {
      if (xhr.status === 200) {
        var response = JSON.parse(xhr.responseText);
        return callback(response);
      }else{
        alert('There is no Results');
      }
    });
  
    xhr.open('GET', url);
    xhr.send();
}

// get quotes from API
function getQuotes(key,page, searchType){

    let url = `${apiUrl}/quotes`;

    if(searchType === "anime"){
        url = `${apiUrl}/quotes/${searchType}?title=${key}&page=${page}`;
    }else if(searchType === "character"){
        url = `${apiUrl}/quotes/${searchType}?name=${key}&page=${page}`;
    }

    fetch(url,(response) => {
        showQuotes(response);
   
    });

}


// show quotes in DOM
function showQuotes(quotes){
    const list = document.querySelector('#quots-list');

    list.innerHTML = '';

    quotes.forEach(q => {
        
        const p = document.createElement('p');
        p.textContent = q.quote;
        p.classList.add('quote');

        const author = document.createElement('cite');
        author.innerHTML = `<strong>${q.character}</strong> from <strong>${q.anime}</strong>`;
        author.classList.add('author');

        const quote = document.createElement('div');
        quote.classList.add('quote-card');
        quote.appendChild(p);
        quote.appendChild(author);
        list.appendChild(quote);

    });

    const previusButton = document.createElement('button');
    previusButton.classList.add('previous');
    previusButton.id = "previous-button";
    previusButton.textContent = "< Previous";
    previusButton.onclick = () => {
        previusPage();
    };

    const nextButton = document.createElement('button');
    nextButton.classList.add('next');
    nextButton.id = "next-button";
    nextButton.textContent = "Next >";
    nextButton.onclick = () => {
        nextPage();
    };

    const paginationDiv = document.querySelector('#pagination');
    paginationDiv.innerHTML = '';
    paginationDiv.appendChild(previusButton);
    paginationDiv.appendChild(nextButton);

}


// search for quotes
const search = () => {
    const titleType = document.querySelector('#title-type').value;
    const title = document.querySelector('#title').value;

    getQuotes(title,currentPage,titleType);
}

// go to next page
function nextPage(){
    currentPage++;

    search();
}

// go to prevuis page
function previusPage(){
    if(currentPage !== 1){
        currentPage--;
    }

    search();
}

searchButton.addEventListener('click',(e) => {
    e.preventDefault();

    currentPage = 1;

    search();
});



var modal = document.getElementById("myModal");

var btn = document.getElementById("modal-btn");

btn.onclick = function() {
    modal.style.display = "block";

    const url = `${apiUrl}/random`;

    modal.innerHTML = '';

    fetch(url, (response) =>{

        showSingleQuote(response,modal);
    
    });
}


function showSingleQuote(q,modal){

    const span = document.createElement('span');
    span.classList.add('close');
    span.textContent = 'X';
    span.onclick = () => {
        modal.style.display = "none";
    }

    const p = document.createElement('p');
    p.textContent = q.quote;
    p.classList.add('quote');

    const author = document.createElement('cite');
    author.innerHTML = `<strong>${q.character}</strong> from <strong>${q.anime}</strong>`;
    author.classList.add('author');

    const quote = document.createElement('div');
    quote.classList.add('quote-card');

    quote.appendChild(span);
    quote.appendChild(p);
    quote.appendChild(author);

    modal.appendChild(quote);


}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}