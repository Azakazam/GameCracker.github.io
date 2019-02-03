$(document).ready(() => {


        var CollectGameIds= JSON.parse(localStorage.getItem("selectedGameIds")); 

	

	$.getJSON("data/games.json", (newData) => {

	 var html = "<table class='table table-bordered table-hover table-responsive'>";
    html += "<thead class='thead-light'><tr>";
   html += '<th><b>Features</b></th>';
   


	
    for (var game of newData) {
        if (CollectGameIds.indexOf(game.ID) !== -1) {
            html += '<th>' + game.Name + '</th>';
		}
    }

	
	
    html += '</tr></thead>';
    html += '<tbody class= table-danger><tr>';
   html += '<td><b>Image</b></td>';
    for (var game of newData) {
        if (CollectGameIds.indexOf(game.ID) !== -1) {
			 html += '<td><img class="compareGames" src=' + game.image + '></td>';
		}
    }
    html += '</tr>';
	
	
	
	html += '<tr>';
	 html += '<td><b>Release Date</b></td>';
	    for (var game of newData) {
        if (CollectGameIds.indexOf(game.ID) !== -1) {
			 html += '<td>' + game.ReleaseDate + '</td>';
		}
    }
	 html += '</tr>';
	 
	 
	 html += '<tr>';
	 html += '<td><b>Retail Price</b></td>';
	 	  for (var game of newData) {
        if (CollectGameIds.indexOf(game.ID) !== -1) {
          html += '<td>' + game.RetailPrice + '</td>';
		}
    }
	  html += '</tr>';
	  
	  
	  
	  	 html += '<tr>';
	 html += '<td><b>Genres</b></td>';
	 	  for (var game of newData) {
        if (CollectGameIds.indexOf(game.ID) !== -1) {
          html += '<td>' + game.Genres + '</td>';
		}
    }
	  html += '</tr>';
	  
	  
	  
	  	  	 html += '<tr>';
	 html += '<td><b>Release Type</b></td>';
	 	  for (var game of newData) {
        if (CollectGameIds.indexOf(game.ID) !== -1) {
          html += '<td>' + game.Type + '</td>';
		}
    }
	  html += '</tr>';
	  
	  
	  
	  
	  	  	  	 html += '<tr>';
	 html += '<td><b>Star Rating</b></td>';
	 	  for (var game of newData) {
			  
			  
			     let ratingDiv = $("<div class='rating'></div>");

                for (var i = 0; i < game.Rating; i++) {
                    ratingDiv.append('<span class="fa fa-star checked"></span>');
                }
                for (var i = game.Rating; i < 5; i++) {
                    ratingDiv.append('<span class="fa fa-star"></span>');
                }
			  
			  
			  
        if (CollectGameIds.indexOf(game.ID) !== -1) {
          html += '<td>' + ratingDiv.html() + '</td>';
		}
    }
	  html += '</tr>';
	  
	  
	  
	    	  	 html += '<tr>';
	 html += '<td><b>Age Rating</b></td>';
	 	  for (var game of newData) {
        if (CollectGameIds.indexOf(game.ID) !== -1) {
          html += '<td>' + game.Age + '</td>';
		}
    }
	  html += '</tr>';
	  

	  
    html += '</tbody></table>';

 	  $("#itemID").html(html);
			
		})
	})

			
	