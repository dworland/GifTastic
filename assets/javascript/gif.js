$(document).ready(function() {

	var disneyMovies = ["Frozen", "The Little Mermaid", "Aladdin", "Cinderella", "Sleeping Beauty", "Tangled", "The Fox and the Hound", "Pocahontas", "Snow White", "The Incredibles", "Moana", "Monsters Inc", "Up", "Brave"];

	renderButtons();

	$("button").on("click", function() {

		var movie = $(this).attr("data-name");
		var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + movie + "&api_key=a9ce13a440414be398837a2d69dfbba5&limit=10";

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
          		movieImage.addClass("Play");
          		movieImage.data("gifData", results[i]);
          		movieImage.attr("src", results[i].images.fixed_height_still.url);
          		console.log(movieImage);

          		gifDiv.append(p);
          		gifDiv.append(movieImage);

          		$("#gifs-appear-here").prepend(gifDiv);
			}

	    });
	});

	
	$(document).on("click", ".Play", function() {

		var imgData = $("img").data();
		console.log(imgData);

		var state = $("img").attr("src");
		console.log(state);

		var still = imgData.gifData.images.fixed_height_still.url;
		console.log(still);

		var animate = imgData.gifData.images.fixed_height.url;
		console.log(animate);

 		if (state === still) {
			console.log("animate");
			$(this).attr("src", animate);
			console.log(state);
			$(this).attr("gifData", animate);
		} else {
			console.log("still");
			$(this).attr("src", still);
			console.log(state);
			$(this).attr("gifData", still);
		}

	});


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





