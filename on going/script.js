/** @format */

let currentSong = new Audio();
let songs;
function secondsToMinutesSeconds(seconds) {
  if (isNaN(seconds) || seconds < 0) {
    return "00:00";
  }
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = Math.floor(seconds % 60);

  const formattedMinutes = String(minutes).padStart(2, "0");
  const formattedSeconds = String(remainingSeconds).padStart(2, "0");

  return `${formattedMinutes}:${formattedSeconds}`;
}

// Example usage:
var totalSeconds = 122;
console.log(secondsToMinutesSeconds(totalSeconds)); // Output: 02:02

async function getsongs() {
  let a = await fetch("http://127.0.0.1:5500/songs");
  let responce = await a.text();
  console.log(responce);
  let div = document.createElement("div");
  div.innerHTML = responce;
  let as = div.getElementsByTagName("a");

  let songs = [];
  for (let index = 0; index < as.length; index++) {
    const element = as[index];
    if (element.href.endsWith(".mp3")) {
      songs.push(element.href.split("/songs/")[1])
       //  split is means it gives 2 arrays before `/song/` and after
    } // `/song/` so [1] means after (split = dont want that str)
  }
  return songs;
}

const playMusic = (track, pause = false) => {
  currentSong.src = "/songs/" + track;
  if (!pause) {
    currentSong.play();
    play.src = "pause.svg";
  }
  document.querySelector(".songinfo").innerHTML = decodeURI(track);
  document.querySelector(".songtime").innerHTML = "00:00 / 00:00";
};
async function main() {
  songs = await getsongs();
  playMusic(songs[0], true);
  console.log(songs);

  let songUL = document
    .querySelector(".songList")
    .getElementsByTagName("ul")[0];
  for (const song of songs) {
    songUL.innerHTML =
      songUL.innerHTML +
      `<li> <img class="invert" src="music.svg" alt="music">
                        <div class="info">
                            <div> ${song.replace("", "")}</div>
                            <div>Siddharth</div>
                        </div>
                        <div class="playnow">
                          <span>Play Now</span>
                           <img class="invert"src="play.svg" alt="play">
                        </div></li>`;
  }

  Array.from(
    document.querySelector(".songList").getElementsByTagName("li")
  ).forEach((e) => {
    e.addEventListener("click", (element) => {
      console.log(e.querySelector(".info").firstElementChild.innerHTML);
      playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
    });
  });

  play.addEventListener("click", () => {
    if (currentSong.paused) {
      currentSong.play();
      play.src = "pause.svg";
    } else {
      currentSong.pause();
      play.src = "play.svg";
    }
  });

  currentSong.addEventListener("timeupdate", () => {
    console.log(currentSong.currentTime, currentSong.duration);
    document.querySelector(".songtime").innerHTML = `${secondsToMinutesSeconds(
      currentSong.currentTime
    )}:${secondsToMinutesSeconds(currentSong.duration)}`;
    document.querySelector(".circle").style.left =
      (currentSong.currentTime / currentSong.duration) * 100 + "%";
  });

  document.querySelector(".seekbar").addEventListener("click", e=> {
    let percent = (e.offsetX/e.target.getBoundingClientRect().width)*100;
    document.querySelector(".circle").style.left = percent + "%";
    currentSong.currentTime = ((currentSong.duration)* percent)/100
  });

  document.querySelector(".hamburger").addEventListener("click", e=> {
    document.querySelector(".left").style.left = "0"
  })

  document.querySelector(".close").addEventListener("click", e=> {
    document.querySelector(".left").style.left = "-100%"
  })

  previous.addEventListener("click", ()=> {
    console.log("Previous clicked")
    console.log(currentSong)
    let index = songs.indexOf(currentSong.src.split("/").slice(-1) [0])
    if ((index-1) >= 0){
      playMusic(songs[index-1])
    }
  })

  next.addEventListener("click", ()=> {
    console.log("Next clicked")

    let index = songs.indexOf(currentSong.src.split("/").slice(-1) [0])
    if ((index+1) < songs.left - 1){
      playMusic(songs[index-1])
    }
  })

  document.querySelector(".range").getElementsByTagName("input")[0].addEventListener("change",(e) => {

  })


}

main();
