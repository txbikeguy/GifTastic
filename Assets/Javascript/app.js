$(document).ready(function() {


var terms = ["Mountain Biking", "Corgis", "Vanlife", "Kangaroos", "Skydiving", "Ryan Gosling", "Muscle Cars", "Fishing", "Hiking", "Star Wars"];

// Creating our buttons based on the Terms
function renderButtons() {
  $("#buttons").empty();

  for (var i = 0; i < terms.length; i++) {
          var termBtn = $("<button>");
          termBtn.addClass("btn btn-danger");
          termBtn.attr("data-term", terms[i]);
          termBtn.text(terms[i]);
          $("#buttons").prepend(termBtn);
        };





$("button").on("click", function() {
      console.log("clicked");
      // Empty the Gif Div with every new button click
      $("#gifs-appear-here").empty();

      // In this case, the "this" keyword refers to the button that was clicked
      var term = $(this).attr("data-term");

      // Constructing a URL to search Giphy for the term 
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        term + "&api_key=p66We0BqZULNuvkRD46b8qDJk0Cyutpt&limit=10";

      // Performing our AJAX GET request
      $.ajax({
          url: queryURL,
          method: "GET"
        })
        // After the data comes back from the API
        .done(function(response) {
          // Storing an array of results in the results variable
          var results = response.data;
          console.log(response);


          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item card'>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating.toUpperCase());

              // Creating an image tag
              var termImage = $("<img>");

              termImage.attr("src", results[i].images.original_still.url);
              termImage.attr("data-still", results[i].images.original_still.url);
              termImage.attr("data-animate", results[i].images.original.url);
              termImage.attr("data-state", "still");
              termImage.addClass("gif");


              gifDiv.append(termImage);
              gifDiv.append(p);

              $("#gifs-appear-here").prepend(gifDiv);
            }
          }
        });
    });
};

$("#add-gif").on("click", function(event) {
        event.preventDefault();

        // This line grabs the input from the textbox
        var newGif = $("#gif-input").val().trim();

        // Adding term from the textbox to our array
        terms.push(newGif);
        console.log(terms);
        renderButtons();
        $("#gif-input").val("");
      });

$("#gifs-appear-here").on("click", ".gif", function() {
          console.log("clicked");
          var state = $(this).attr("data-state");
            if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
      });


renderButtons();
});