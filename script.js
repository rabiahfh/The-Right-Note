// executing a call back when the DOM is ready
$(document).ready(function () {


    //var artistName = $("#favorite-artist").val()
    // when the searchartist button is click were triggering a call back
    $("#searchArtist").on("click", (event) => {

        event.preventDefault()
        $("#artistBio").empty()
        $("#artistLyrics").empty()


        // getting the values from the input fields
        var artistName = $("#favorite-artist").val()
        var favoriteSong = $("#favorite-song").val()
        var storedLanguage = $("#stored-language").val()


        // if the user puts in a artist name we execute the getArtistData function
        if (artistName) {
            getArtistData(artistName, storedLanguage)
        }

        // if the user puts in the artist name and favorite song we execute the getLyrics function
        if (artistName && favoriteSong) {
            getLyrics(artistName, favoriteSong)
        }
        // if the user puts in artistName and favoriteSong we execute the localStorage function
        setArtistData(artistName, favoriteSong, storedLanguage)
    })
    // execute code to get previously searched artist info. from localStorage
});

function getArtistData(artistName, storedLanguage) {

    var artistSearchURL = `https://theaudiodb.com/api/v1/json/1/search.php?s=${encodeURIComponent(artistName)}`;

    console.log(artistSearchURL)


    $.ajax({
        url: artistSearchURL,
        method: "GET"
    }).then(function (response) {

        var artistBioElement = $('#artistBio')
        artistBioElement.addClass("results-container");

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
function getLyrics(artistName, favoriteSong) {

    var songSearchURL = `https://api.lyrics.ovh/v1/${artistName}/${favoriteSong}`


    $.ajax({
        url: songSearchURL,
        method: "GET"
    }).then(function (response) {
        var artistLyrics = $('#artistLyrics')
        artistLyrics.addClass("results-container");
        artistLyrics.append(`<p><strong>${favoriteSong}:lyrics</strong> ${response.lyrics}</p>`);

    });


}

$("#history").on("click", "#saved-artist", function (event) {
    event.preventDefault()
    console.log($(this))
    var favoriteSong = $(this).attr("data-favSong")
    var artistName = $(this).text()
    var storedLanguage = $(this).attr("data-lang")
    $("#artistBio").empty()
    $("#artistLyrics").empty()
    getLyrics(artistName, favoriteSong)
    getArtistData(artistName, storedLanguage)

    console.log(favoriteSong)
    console.log(artistName)
    console.log(storedLanguage)

})

function setArtistData(artistName, favoriteSong, storedLanguage) {
    console.log("hello from the set artist data function")
    console.log(artistName, favoriteSong, storedLanguage)

    var getArtistStorage = JSON.parse(localStorage.getItem("artist"))
    var artistList = [

    ]
    if (getArtistStorage) {
        artistList.push(...getArtistStorage)
    }

    artistList.push({
        artistName, favoriteSong, storedLanguage
    })
    console.log(artistList)

    localStorage.setItem("artist", JSON.stringify(artistList))

    var historyEl = $("#history")
    historyEl.empty()
    // $('#users .list li').remove();

    for (var i = 0; i < artistList.length; i++) {
        var artist = artistList[i]
        var li = $("<li>").html(`<button id="saved-artist" 
        data-lang="${artistList[i].storedLanguage}" 
        data-favSong="${artistList[i].favoriteSong}">${artistList[i].artistName}</button>`);

        console.log(artistList[i])
        historyEl.append(li);
    }






    // dynamicaly create a list with artist and favorite song
    // set the information to local storage
    // Get our information out
    // display in our page
    // 






















};