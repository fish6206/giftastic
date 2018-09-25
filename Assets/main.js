//array of original buttons
var athletesArray = ["Ladainian Tomlinson", "Ray Lewis", "Khalil Mack", "Philip Rivers", "Terrell Suggs"];

//makes buttons out of array when page loads
$(document).ready(function() {
    for (var i = 0; i < athletesArray.length; i++) {
        $("#athlete-buttons").append("<button type='button' onclick='searchGif(\"" + athletesArray[i] + "\")' class='btn btn-primary' value=' " + athletesArray[i] + "'> " + athletesArray[i] + " </button>");
    }
});

//stores user input
function athleteButtonClicked() {
    var userInput = $('#athlete-input').val();
    searchGif(userInput);
}

//creates new button once submit button clicked
function submitButtonClicked() {
    var userInput = $('#athlete-input').val();

    if (userInput) {
        $('#athlete-buttons').append("<button type='button' onclick='searchGif(\"" + userInput + "\")' class='btn btn-primary' value=' " + userInput + "'> " + userInput + " </button>");
    }
}

//search gif function. pulls gif name and adds to giphy API for search
function searchGif(gifName) {
    $.ajax({
            url: 'https://api.giphy.com/v1/gifs/search?q= ' + gifName + ' &api_key=dc6zaTOxFJmzC',
            type: 'GET',
        })
        .done(function(response) {
            displayGif(response);
        })
}

function displayGif(response) {
    //clears div that holds gifs
    $('#athletes').empty();
    for (var i = 0; i < response.data.length; i++) {
        var rating = "<div class='ratings'> Rating:  " + (response.data[i].rating) + " </div>";
        var image = rating + '<img src= " ' + response.data[i].images.fixed_height_still.url +
            '" data-still=" ' + response.data[i].images.fixed_height_still.url +
            ' " data-animate=" ' + response.data[i].images.fixed_height.url + '" data-state="still" class="movImage" style= "width:250px; height:250px">';
        //creates div for new gifs
        image = '<div class="col-md-4">' + image + "</div>";
        //appends new gifs to html
        $('#athletes').append(image);
    }
    //makes gif move or stay still when clicked
    $('.movImage').on('click', function() {
        var state = $(this).attr('data-state');
        if (state == 'still') {
            //changes attribute to move if still when clicked
            $(this).attr('src', $(this).attr("data-animate"));
            $(this).attr('data-state', 'animate');
        } else {
            //changes attribute to still if clicked while moving
            $(this).attr('src', $(this).attr("data-still"));
            $(this).attr('data-state', 'still');
        }

    });
}