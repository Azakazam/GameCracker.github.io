const comingSort = () => {

    let myInput = document.getElementById("comingfilter");
    let comingfilter = myInput.value.toUpperCase();
    let ul = document.querySelector(".ajaxCheck");
    let li = ul.getElementsByTagName("li");
    let a;
    let count = false;

    for (let i = 0; i < li.length; i++) {

        a = li[i].getElementsByTagName("div")[0];
      
        if (a.innerHTML.toUpperCase().indexOf(comingfilter) > -1) {
            li[i].style.display = "";
            count = true;

        } else {
            li[i].style.display = `none`;

        }
    }

    if (count === false) {
        document.getElementById("p3").innerHTML = `Your search did not bring up any results`;
      //  console.log("nothing was found");
    } else {
        document.getElementById("p3").innerHTML = `Current results:`;

        //console.log("something came up")
    }

}

const newSort = () => {

    let newInput = document.getElementById("gamefilter");
    let gamefilter = newInput.value.toUpperCase();
    let ul = document.querySelector(".compNew");
    let li = ul.getElementsByTagName('li');
    let a;
    let count = false;

    for (let i = 0; i < li.length; i++) {

        a = li[i].getElementsByTagName("div")[0];
      
        if (a.innerHTML.toUpperCase().indexOf(gamefilter) > -1) {
            li[i].style.display = "";
            count = true;

        } else {
            li[i].style.display = `none`;
        }
    }


    if (count === false) {
        document.getElementById("p2").innerHTML = `Your search did not bring up any results`;
       // console.log("nothing was found");
    } else {
        document.getElementById("p2").innerHTML = `Current results:`;

        //console.log("something came up")
    }

}

$(document).ready(() => {
    $.ajax({
        url: "data/games.json",
        type: "GET",
        dataType: 'JSON',
        success: function(response) {
            let data = response;
            let ul2 = $('.ajaxCheck')[0];
            let ul3 = $('.compNew')[0]

            if (ul2) {
                $(ul2).html(displayOutputHome(data, true));
            }
            if (ul3) {
                $(ul3).html(displayNewGames(data, true));

            }

            $('[data-toggle="popover"]').popover();
            $("input[type=checkbox]").on('change', (event) => {

                $newval = [];
                let inputs = document.querySelectorAll('input[type="checkbox"]:checked');
                let $this = $(event.currentTarget);
                let $label = $(`.visible[for=${$this.attr('id')}]`);
                if ($this.prop("checked")) {
                    $label.text("Item selected");

                    inputs.forEach(function(input) {  
                        $newval.push(input.value);
                        let picked = JSON.stringify($newval);
                        var selectedGameIds = localStorage.setItem("selectedGameIds", picked);
                    })




                } else {
                    $label.text("Compare");
                }
                if ($('input[type=checkbox]:checked').length >= 3) {
                    $("input[type=checkbox]:not(:checked)").prop("disabled", true);
                } else {
                    $("input[type=checkbox]").prop("disabled", false);
                }


            })


            $(".compareAll").click(function(e) {
                window.location.href = 'selection.html';
            })


            $("input[type=checkbox]").on('change', (event) => {

                if ($("input[type=checkbox]:checked").length >= 2) {
                    $(".compareOff").hide();
                    $(".compareAll").show();
                }
                if ($("input[type=checkbox]:checked").length < 2) {
                    $(".compareOff").show();
                    $(".compareAll").hide();
                }
            })


        },
        error: function() {
            console.error('Whoops something went wrong...');
        }

    });

	

	
	
    const displayOutputHome = (games, hasCheckbox) => {

        let output = "";
        var x = 0;
        games.forEach(game => {

            if (game.Type === "Coming Soon") {

                x++;

                let ratingDiv = $("<div class='rating'></div>");

                for (var i = 0; i < game.Rating; i++) {
                    ratingDiv.append('<span class="fa fa-star checked"></span>');
                }
                for (var i = game.Rating; i < 5; i++) {
                    ratingDiv.append('<span class="fa fa-star"></span>');
                }

                output += `
		
					<li>
					<div class="tess"> ${game.Name} </div>
	<div class=""><input name="gameSelected" value=${game.ID} id="togg${x}" type="checkbox"><label for="togg${x}" class="${hasCheckbox ? 'visible' : 'invisible'}">Compare</label></div>
	<a class="newGame" href=${game.link}?id=${game.ID}><img class="frontGames" src="${game.image}" alt="gameImage">
	          <p><b>Name:</b>${game.Name}<br>
                <b>Release Date:</b>${game.ReleaseDate}</br>
                <b>Genres:</b>${game.Genres}</br>
                <b>Retail Price:</b>${game.RetailPrice}</br>
                <b>Rating:</b>${ratingDiv.html()}</br></p></a>
		</li><br>`;

            }
        })
        return output;
    }



    const displayNewGames = (games, hasCheckbox) => {

        let output = "";

        var x = 100;
        games.forEach(game => {

            if (game.Type === "New Release") {

                x++;

                let ratingDiv = $("<div class='rating'></div>");

                for (var i = 0; i < game.Rating; i++) {
                    ratingDiv.append('<span class="fa fa-star checked"></span>');
                }
                for (var i = game.Rating; i < 5; i++) {
                    ratingDiv.append('<span class="fa fa-star"></span>');
                }


                output += `
		
			<li>
			<div class="tess"> ${game.Name} </div>
			<input name="gameSelected" id="togg${x}" value=${game.ID} type="checkbox"><label for="togg${x}" class="${hasCheckbox ? 'visible' : 'invisible'}">Compare</label>
			<a class="newGame" href=${game.link}?id=${game.ID}><img class="frontGames" src="${game.image}" alt="gameImage">
	          <p><b>Name:</b>${game.Name}<br>
                <b>Release Date:</b>${game.ReleaseDate}</br>
                <b>Genres:</b>${game.Genres}</br>
                <b>Retail Price:</b>${game.RetailPrice}</br>
                <b>Rating:</b>${ratingDiv.html()}</br></p></a>
	
	
	
		</li><br>`;

            }


        })

        return output;
    }

});

const GetURLP = (sParam) => {
    var sPageURL = window.location.search.substring(1);
    // console.log(sPageURL);
    var sURLVariables = sPageURL.split('&');
    for (var i = 0; i < sURLVariables.length; i++) {
        var sParameterName = sURLVariables[i].split('=');
        if (sParameterName[0] == sParam) {
            return sParameterName[1];

        }
    }
}
var tech = GetURLP('id');


$.getJSON('data/game' + tech + '.json', (gameURL) => {
    $(".gameContent").append(`<h2><b> ${gameURL.Name} </b></h2>

<img class=gameDetails src=${gameURL.image}>`);
    $('.gameContent').append(`<h5>&nbsp; Retail Price: ${gameURL.RetailPrice}</h5><h5>&nbsp; Age Rating: ${gameURL.Age}</h5<br>`);
    $('.gameExp').append(`<img class=switch src=images/switch.svg alt=nintendo switch><h3> Game Description </h3><br>`);
    $('.gameExp').append(`${gameURL.desc}<br>`);
    $('.gameExp').append(`<br>${gameURL.desc2}<br><br>`);
    $('.gameExp').append(`<h4><b> Game preview </b></h4><br><br>`);

    $('.gameExp').append(` <a data-toggle='modal' data-target="#myModal">
  <img class='img-responsive imageButton' src=${gameURL.Preview} alt='preview of game'>
</a>
 
  <div class='modal fade' id='myModal'>
    <div class='modal-dialog'>
      <div class="modal-content">
        <img class='imagePreview' src=${gameURL.Preview} alt='preview of game'>
          <button type='button' class='btn btn-danger' data-dismiss='modal'>Close</button>
      
      </div>
    </div>
  </div>`);
    $('.gameExp').append(`<br><i> Click the image to view </i><br><br>`);
    $('.gameExp').append(`<h5><b>Genres:</b> ${gameURL.Genres}</h5><br>`);
    $('.gameExp').append(`<h4><b>Release Date:</b>${gameURL.ReleaseDate}</h4><br><br>`);

});