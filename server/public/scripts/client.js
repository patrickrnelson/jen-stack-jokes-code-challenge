console.log('client.js sourced');

$(document).ready(onReady);

function onReady() {
  console.log('DOM ready');
  // If there are any jokes in the server on load, append them to DOM
  getJokes();
  // listen for a click on the button
  $(document).on('click', '#addJokeButton', onAddJoke);
}

// get the 'jokes' array from the server
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
    <div class="joke">
    <h3>${joke.jokeQuestion}</h3>
    <p>${joke.punchLine}</p>
    <p class="jokeAuthor">By: ${joke.whoseJoke}
    </div>`);
  }
}

function onAddJoke() {
  // console.log('onAddJoke');
  // grab the inputs
  let whoseJoke = $('#whoseJokeIn').val();
  let jokeQuestion = $('#questionIn').val();
  let punchLine = $('#punchlineIn').val();
  // if any inputs are blank, show an alert
  if (whoseJoke === '' || jokeQuestion === '' || punchLine === '') {
    alert('Need ALL inputs, please!');
  }
  // if all inputs are filled in
  // define a newJoke object...
  else {
    let newJoke = {
      whoseJoke: whoseJoke,
      jokeQuestion: jokeQuestion,
      punchLine: punchLine,
    };
    console.log('New Joke:', newJoke);
    // ...and POST that object to the server
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
}
