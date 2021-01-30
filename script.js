$(document).ready(function () {

    //var artistName = $("#favorite-artist").val()
    $("#searchArtist").on("click", (event) => {

        event.preventDefault
        var artistName = $("#favorite-artist").val()
        var favoriteSong = $("#favorite-song").val()
        var storedLanguage = $("#stored-language").val()
        console.log(storedLanguage)


        var artistSearchURL = `https://theaudiodb.com/api/v1/json/1/search.php?s=${encodeURIComponent(artistName)}`;

        console.log(artistSearchURL)


        $.ajax({
            url: artistSearchURL,
            method: "GET"
        }).then(function (response) {

      

            var artistSearch = response.artists[0].strArtist
            if (artistSearch) {
                $("#artistSearch").html("<strong>" + artistSearch + "</strong>")

            }
            var artistStyle = response.artists[0].strStyle
            var artistYear = response.artists[0].intFormedYear
            var website = response.artists[0].strWebsite
            var artistImage = response.artists[0].strArtistFanart

            var arrKeys = Object.keys(response.artists[0]);
            for (var i = 0; i < arrKeys.length; i++) {
                //console.log(arrKeys[i].indexOf(storedLanguage))
                if (arrKeys[i].indexOf(storedLanguage) === 0) {
                    var biography = response.artists[0][arrKeys[i]]
                    console.log(biography)
                    if (biography) {
                        $("#biography").html(biography)

                    }

                }
            }

        }).then(function () {
            console.log("Are we there yet")

            var songSearchURL = `https://api.lyrics.ovh/v1/${artistName}/${favoriteSong}`


            $.ajax({
                url: songSearchURL,
                method: "GET"
            }).then(function (response) {

                console.log(`%c LYRICS:`, 'font-size:42px; color: orange; background-color: black')
                console.log(response.lyrics)
                $("#lyrics").html(response.lyrics)
            });

        })


    });


});