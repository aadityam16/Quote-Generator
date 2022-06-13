const quoteContainer = document.querySelector(".quote-container");
const quoteText = document.querySelector("#quote");
const quoteAuthor = document.querySelector("#author");
const twitterButton = document.querySelector("#b1");
const newButton = document.querySelector("#b2");
const loader = document.getElementById("loader");

let apiQuotes = [];

// Loading Spinner Shown
function showLoadingSpinner() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}

// Remove Loading Spinner
function removeLoadingSpinner() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}

function newQuote() {
  showLoadingSpinner();
  let n = Math.floor(Math.random() * apiQuotes.length);
  quoteText.textContent = apiQuotes[n].text;
  if (!apiQuotes[n].author) {
    quoteAuthor.textContent = "Unknown";
  } else {
    quoteAuthor.textContent = apiQuotes[n].author;
  }
  if (apiQuotes[n].text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  removeLoadingSpinner();
}
// Get Quotes From API
async function getQuotes() {
  showLoadingSpinner();
  const apiUrl = "https://type.fit/api/quotes";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    // Catch Error Here
  }
}

// Tweet Quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
  window.open(twitterUrl, "_blank");
}

newButton.addEventListener("click", newQuote);
twitterButton.addEventListener("click", tweetQuote);

getQuotes();