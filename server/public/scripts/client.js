console.log('client.js sourced');

$(document).ready(onReady);

function onReady() {
  console.log('DOM ready');
}

function getJokes() {
  $.ajax({
    type: 'GET',
    url: '/listOfJokes'
  }).then(function, (response) {
    console.log('Succesful GET of Jokes');
    //append the incoming array to the DOM
    appendListOfJokes(response);
  })
};

appendListOfJokes
