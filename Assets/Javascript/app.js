$("button").on("click", function() {
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

          // Looping over every result item
          for (var i = 0; i < results.length; i++) {

            // Only taking action if the photo has an appropriate rating
            if (results[i].rating !== "r" && results[i].rating !== "pg-13") {
              // Creating a div with the class "item"
              var gifDiv = $("<div class='item'>");

              // Storing the result item's rating
              var rating = results[i].rating;

              // Creating a paragraph tag with the result item's rating
              var p = $("<p>").text("Rating: " + rating);

              // Creating an image tag
              var termImage = $("<img>");

              // Giving the image tag an src attribute of a proprty pulled off the
              // result item
              termImage.attr("src", results[i].images.fixed_height.url);

              // Appending the paragraph and personImage we created to the "gifDiv" div we created
              gifDiv.append(p);
              gifDiv.append(termImage);

              // Prepending the gifDiv to the "#gifs-appear-here" div in the HTML
              $("#gifs-appear-here").prepend(gifDiv);
            }
          }
        });
    });