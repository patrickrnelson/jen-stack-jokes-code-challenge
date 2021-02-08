console.log('client.js sourced');

$(document).ready(onReady);

function onReady() {
  console.log('DOM ready');
  getJokes();
}

function getJokes() {
  $.ajax({
    type: 'GET',
    url: '/listOfJokes',
  }).then(function (response) {
    console.log('Succesful GET of Jokes');
    //append the incoming array to the DOM
    appendListOfJokes(response);
  });
}

function appendListOfJokes(array) {
  console.log('in appendListOfJokes', array);
  for (let joke of array) {
    $('#outputDiv').append(`
    <h3>${joke.jokeQuestion}</h3>
    <p>${joke.punchLine}</p>
    <p class="jokeAuthor">By: ${joke.whoseJoke}`);
  }
}
