// excecuting a call back when the DOM is ready
$(document).ready(function () {


    //var artistName = $("#favorite-artist").val()
    // when the searchartist button is click were triggering a call back
    $("#searchArtist").on("click", (event) => {
    
        event.preventDefault
        // getting the values from the input fields
        var artistName = $("#favorite-artist").val()
        var favoriteSong = $("#favorite-song").val()
        var storedLanguage = $("#stored-language").val()
        console.log(storedLanguage)
// if the user puts in a artist name we execute the getArtistData function
if (artistName) {
    getArtistData (artistName, storedLanguage)
}

// if the user puts in the artist name and favorite song we execute the getLyrics function
// if the user puts in artistName and favoriteSong we execute the localStorage function

 })
// execute code to get previously searched artist info. from localStorage
});

function getArtistData (artistName, storedLanguage) {
    
    var artistSearchURL = `https://theaudiodb.com/api/v1/json/1/search.php?s=${encodeURIComponent(artistName)}`;

    console.log(artistSearchURL)


    $.ajax({
        url: artistSearchURL,
        method: "GET"
    }).then(function (response) {

  var artistBioElement = $('#artistBio')
  artistBioElement.addClass( "results-container" );

        var artistSearch = response.artists[0].strArtist
        var artistStyle = response.artists[0].strStyle
        var artistYear = response.artists[0].intFormedYear
        var website = response.artists[0].strWebsite
        var artistImage = response.artists[0].strArtistFanart
        artistBioElement.append(`<p><strong>Artist Name:</strong> ${artistSearch}</p>`);
        artistBioElement.append(`<p><strong>Artist Style:</strong> ${artistStyle}</p>`);
        artistBioElement.append(`<p><strong>Artist Year:</strong> ${artistYear}</p>`);
        artistBioElement.append(`<p><strong>website:</strong> ${website}</p>`);
        artistBioElement.append(`<img src="${artistImage}"/>`);
        var arrKeys = Object.keys(response.artists[0]);
        for (var i = 0; i < arrKeys.length; i++) {
            //console.log(arrKeys[i].indexOf(storedLanguage))
            if (arrKeys[i].indexOf(storedLanguage) === 0) {
                var biography = response.artists[0][arrKeys[i]]
                console.log(biography)
                if (biography) {
                    artistBioElement.append(`<p><strong>Artist Biography:</strong> ${biography}</p>`);
                }

            }
        }

    


});

}
function getLyrics(artistName,favoriteSong){

    var songSearchURL = `https://api.lyrics.ovh/v1/${artistName}/${favoriteSong}`


    $.ajax({
        url: songSearchURL,
        method: "GET"
    }).then(function (response) {

        console.log(`%c LYRICS:`, 'font-size:42px; color: orange; background-color: black')
        console.log(response.lyrics)
        $("#lyrics").html(response.lyrics)
    });




}
