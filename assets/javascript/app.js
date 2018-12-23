// rock n roll giftastic javascript

$(document).ready(function(){
var rocks = ["Foo Fighters", "Cheap Trick", "Aerosmith", "Billy Idol","Blue Oyster Cult", "Metallica", "Eric Clapton"];
topics = "";

// data api to retreive gifs with rating and images
$(document).on('click', 'button',  function() {
    $('#topics').empty(); 
    var newButton = $(this).attr('data-name');
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + newButton + "&api_key=qP4BH5lvl6StTmL8FKSBmCpudPr8znL0&limit=10";
    console.log(queryURL);

    $.ajax({
        url: queryURL,
        method: 'GET'
    })
    .then(function(response){
        var results = response.data;
        for (var i = 0; i < results.length; i++) {
            var divGif = $('<div class="item">');
            var rating = results[i].rating;
            var textRating = $('<p>').text("Rating: " + rating);
            var images = $('<img>');

            images.attr('src',results[i].images.fixed_height_still.url).attr('data-still',results[i].images.fixed_height_still.url).attr('data-animate',results[i].images.fixed_height.url).attr('data-state',"still").addClass("playPause");
            divGif.append(images).append(textRating);

            $('#topics').prepend(divGif);
            console.log(results);
        }
    });
});

// play the gifs toggle on or off
$(document).on('click', '.playPause',  function() {
    var state = $(this).data("state");
    if (state == "still") {
        $(this).attr('src', $(this).data('animate')).data('state', 'animate');
    } else {
        $(this).attr('src', $(this).data('still')).data('state', 'still');   
    }
});

// buttons
function renderButtons() {
    $("#renButtons").empty();
    for (var i = 0; i < rocks.length; i++) {
        var newButton = $("<button>");
        newButton.addClass("rock");
        newButton.attr("data-name", rocks[i]);
        newButton.text(rocks[i]);
        $("#renButtons").append(newButton);
    }
}

// render buttons
renderButtons();

// add new buttons
$("#add-rock").on('click', function() {
    event.preventDefault();
    var rock = $("#rock-input").val().trim();
    rocks.push(rock);
    renderButtons();
});

});
