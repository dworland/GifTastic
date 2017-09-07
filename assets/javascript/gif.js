$(document).ready(function() {

	var disneyMovies = ["Frozen", "The Little Mermaid", "Aladdin", "Cinderella", "Sleeping Beauty", "Tangled", "The Fox and the Hound", "Pocahontas", "Snow White", "The Incredibles", "Moana", "Monsters Inc", "Up", "Brave"];

	renderButtons();

	$("button").on("click", function() {

		var movie = $(this).attr("data-name");
		var queryURL = "http://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=a9ce13a440414be398837a2d69dfbba5&limit=10";

		$.ajax({
	      url: queryURL,
	      method: 'GET'
	    })
	    .done(function(response) {
			console.log(response);

			var results = response.data;

			for (var i = 0; i < results.length; i++) {
				var rating = results[i].rating;

          		var gifDiv = $("<div class=gifs>");

          		var p = $("<p>").text("Rating: " + rating);

          		var movieImage = $("<img>");
          		movieImage.attr("src", results[i].images.fixed_height.url);

          		gifDiv.append(p);
          		gifDiv.append(movieImage);

          		$("#gifs-appear-here").prepend(gifDiv);
			}

	    });
	});

	
	$("img").on("click", function() {

		var state = $(this).attr("data-state");
		var still = results[i].images.fixed_height_still.url;
		var animate = results[i].images.fixed_height.url;

		if (state === "still") {
			$(this).attr(animate);
			$(this).attr("data-state", "animate");
		} else {
	        $(this).attr(still);
	        $(this).attr("data-state", "still");
		}
	})


	function renderButtons() {

	    $("#movieButtons").empty();

	    for (var i = 0; i < disneyMovies.length; i++) {

	      var btn = $("<button>");

	      btn.addClass("movie-buttons");

	      btn.attr("data-name", disneyMovies[i]);

	      btn.text(disneyMovies[i]);

	      $("#movieButtons").append(btn);
	    }
	}


  	$("#addMovie").on("click", function(event) {
    	event.preventDefault();

        var newMovie = $("#movie-input").val().trim();

        disneyMovies.push(newMovie);

        renderButtons();
      });

});





