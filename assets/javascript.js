// VARIABLES

var animals = ["shark","fish","octopus","starfish","mermaid","killer whale","clownfish","dolphin","staryu", "scuba diver", "lapras", "seal", "walrus"];


// FUNCTIONS

$( document ).ready(function() {
    for(i=0;i<animals.length;i++){
    	var newButton = $("<button class='button' id='"+animals[i]+"'>");
    	newButton.text(animals[i]);
    	$("#buttons").append(newButton);
    }

});

$("#submit").on("click", function() {

	var newAnimals =[];
	var input = $("#inputbox").val().trim();
	newAnimals.push(input);

    for(i=0;i<newAnimals.length;i++){
    	var newButton = $("<button class='button' id='"+newAnimals[i]+"'>");
    	newButton.text(newAnimals[i]);
    	$("#buttons").append(newButton);
    }

	return false;
});

$(document.body).on('click', '.button', function(){
    var query = $(this).attr("id");
    console.log(query);

    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + query + "&limit=10&api_key=dCUgDLIgM18At73NimMzbZrnznkRjmGV"; 
             //ajax function
    		$.ajax({
            url: queryURL,
            method: 'GET'
            }).done(function(response) {
    		$("#gifs").empty();


		
	for(i=0;i<response.data.length;i++){
        var animalImage = $("<img id='"+i+"' >");
		animalImage.attr("src", response.data[i].images.fixed_height.url);
		animalImage.attr("data-still", response.data[i].images.fixed_height_still.url);
		animalImage.attr("data-animate", response.data[i].images.fixed_height.url);
		animalImage.attr("class", "gif");
		$("#gifs").append(animalImage);

		var rating = $("<div class='rating' >");
		rating.text("Rated:" + " " + JSON.stringify(response.data[i].rating));
        $("#gifs").append(rating);
    }
});

});

$(document.body).on('click', '.gif', function(){
	var state = $(this).attr('data-state'); 

    if ( state == 'still'){
        $(this).attr('src', $(this).data('animate'));
        $(this).attr('data-state', 'animate');
    }else{
        $(this).attr('src', $(this).data('still'));
        $(this).attr('data-state', 'still');
        }
});
