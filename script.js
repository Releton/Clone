let audioElement = new Audio("songs\\1.mp3")
let masterPlay = document.getElementById("masterplay")
let progressbar = document.querySelector("#progressBar")
let gif = document.querySelector("#gif")
let songItems = document.querySelectorAll(".songItem")
let songInfox = document.querySelector(".songInfo")
let previous = document.getElementById("previous")
let next = document.getElementById("next")
let currentIndex = 0;
// audioElement.play();
let songs = [
    {songname: "Mortals", filePath: "songs\\1.mp3",coverPath: "covers/1.jpg"},
    {songname: "Celio", filePath: "songs\\2.mp3",coverPath: "covers/2.jpg"},
    {songname: "Deaf kev", filePath: "songs\\3.mp3",coverPath: "covers/3.jpg"},
    {songname: "Different heaven", filePath: "songs\\4.mp3",coverPath: "covers/4.jpg"},
    {songname: "heroes tonight", filePath: "songs\\5.mp3",coverPath: "covers/5.jpg"}
]
songInfox.textContent = songs[0].songname;
masterPlay.addEventListener("click",togglePlay)

function togglePlay(){
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle')
        masterPlay.classList.add('fa-pause-circle')
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle')
        masterPlay.classList.add('fa-play-circle')
        gif.style.opacity = 0;
    }
}

Array.from(songItems).forEach((Element, i)=>{
    console.log(Element, i)
    Element.getElementsByTagName("img")[0].src = songs[i].coverPath
    Element.querySelector(".songName").innerHTML = songs[i].songname;
    Element.querySelector(".songDuration").textContent = ""
})

const makeAllPlay = ()=>{
    Array.from(document.querySelectorAll(".play-here")).forEach((e)=>{
        e.classList.add('fa-play-circle')
        e.classList.remove('fa-pause-circle')
    })
    masterPlay.classList.add('fa-pause-circle')
    masterPlay.classList.remove('fa-play-circle')

}

progressbar.addEventListener("change", ()=>{
    audioElement.currentTime = parseInt(progressbar.value*audioElement.duration/100);
})

audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate')
    let progress = parseInt((audioElement.currentTime/audioElement.duration)*100)
    progressbar.value = progress
})

Array.from(document.querySelectorAll(".play-here")).forEach((element, index)=>{
    element.addEventListener("click", e =>{
        if(e.target.classList.contains('fa-pause-circle')){
            
            e.target.classList.remove('fa-pause-circle')
            e.target.classList.add('fa-play-circle')
            masterPlay.classList.remove('fa-pause-circle')
            masterPlay.classList.add('fa-play-circle')
            
            audioElement.pause();
            return;
        }
        makeAllPlay();
        console.log(e.target)
        e.target.classList.remove('fa-play-circle')
        e.target.classList.add('fa-pause-circle')
        audioElement.src = `songs/${index+1}.mp3`
        audioElement.currentTime = 0
        songInfox.textContent = songs[index].songname;
        currentIndex = index;
        audioElement.play()
    })
})

previous.addEventListener("click",function (){
    if(currentIndex <= 0){
        return;
    }
    else{
        currentIndex -= 1;
    }
    makeAllPlay();
    console.log(previous)
    audioElement.src = `songs/${currentIndex+1}.mp3`
    audioElement.currentTime = 0
    songInfox.textContent = songs[currentIndex].songname;
    audioElement.play()
})
next.addEventListener("click",function (){
    if(currentIndex >= 8){
        return;
    }
    else{
        currentIndex += 1;
    }
    makeAllPlay();
    console.log(next)
    audioElement.src = `songs/${currentIndex+1}.mp3`
    audioElement.currentTime = 0
    songInfox.textContent = songs[currentIndex].songname;
    audioElement.play()
})