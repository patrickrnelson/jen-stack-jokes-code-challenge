console.log('client.js sourced');

$(document).ready(onReady);

function onReady() {
  console.log('DOM ready');
  getJokes();
  $(document).on('click', '#addJokeButton', onAddJoke);
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
  // clear anything that's already in the DOM
  $('#outputDiv').empty();
  // console.log('in appendListOfJokes', array);
  // loop through incoming array and append jokes to DOM
  for (let joke of array) {
    $('#outputDiv').append(`
    <h3>${joke.jokeQuestion}</h3>
    <p>${joke.punchLine}</p>
    <p class="jokeAuthor">By: ${joke.whoseJoke}`);
  }
}

function onAddJoke() {
  // console.log('onAddJoke');
  // grab the inputs, put them in an object
  let newJoke = {
    whoseJoke: $('#whoseJokeIn').val(),
    jokeQuestion: $('#questionIn').val(),
    punchLine: $('#punchlineIn').val(),
  };
  console.log('New Joke:', newJoke);

  function postNewJoke() {
    $.ajax({
      type: 'POST',
      url: '/incomingJoke',
      data: {
        new_joke: newJoke,
      },
    })
      .then(function (response) {
        console.log('Successful POST', response);
      })
      .catch(function (error) {
        console.log('ERROR:', error);
      });
  }
  // call the POST function to send the newJoke object to the server
  postNewJoke();
  // get the updated array from the server
  // this will also append the new joke to the DOM
  getJokes();
}
