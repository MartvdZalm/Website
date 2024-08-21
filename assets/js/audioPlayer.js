function toggleText()
{
	var playPause = document.getElementById("playPause");

	if (playPause.innerHTML === "▶") {
		playPause.innerHTML = "⏸";
	} else {
		playPause.innerHTML = "▶";
	}
}

var audio = new Audio();
var currentSong = 0; // Index of the current song
var isPlaying = false;
var songs = [
	{ name: 'Hello Meteor - Mono No Aware', file: 'https://files.catbox.moe/utwltj.mp3' },
];

audio.addEventListener('ended', function () {
	nextSong();
});

function togglePlay()
{
	if (isPlaying) {
		audio.pause();
		updateSongName('nothing. click the buttons to play a song.');
	} else {
		audio.src = songs[currentSong].file;
		audio.play();
		updateSongName(songs[currentSong].name);
	}
	isPlaying = !isPlaying;
}

function nextSong()
{
	currentSong = (currentSong + 1) % songs.length;
	updateAudio();
}

function prevSong()
{
	currentSong = (currentSong - 1 + songs.length) % songs.length;
	updateAudio();
}

function updateAudio()
{
	if (isPlaying) {
		audio.src = songs[currentSong].file;
		audio.play();
		updateSongName(songs[currentSong].name);
	}
}

function updateSongName(name) 
{
	document.getElementById('songName').innerText = name;
}
