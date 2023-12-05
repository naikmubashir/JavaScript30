
const player =document.querySelector('.player')
const video=document.querySelector('.viewer')
const progress=document.querySelector('.progress')
const progressBar=document.querySelector('.progress__filled')
const toggle=document.querySelector('.toggle')
const skipButtons=document.querySelectorAll('[data-skip]')
const ranges=document.querySelectorAll('.player__slider')

//CLICK EVENT ON VIDEO
function togglePlay(e){
    video.paused?video.play():video.pause()
}
video.addEventListener('click',togglePlay)

//ICON CHANGE AND CLICK EVENT
function changeIcon(e){
    // console.dir(video)
    this.paused?toggle.textContent='►':toggle.innerHTML= '❚ ❚'
    // console.log(e,this.paused)
}
video.addEventListener('play',changeIcon)
video.addEventListener('pause',changeIcon)
toggle.addEventListener('click',togglePlay)


//SKIP BUTTONS
// console.dir(video)
function skip (e){
    // console.log(e,this,this.dataset.skip ,typeof this.dataset.skip)
    const timeToSkip = this.dataset.skip //check the element attributes
    video.currentTime+=parseFloat(timeToSkip)
}
skipButtons.forEach(btn=>{
   btn.addEventListener('click',skip)
})


//VOLUME AND PLAYBACK SPEED 
function handleRangeUpdate(){
    video[this.name]=this.value
    // console.log(this.value,this,video[this.name])
}
ranges.forEach(range=>range.addEventListener('change',handleRangeUpdate))
ranges.forEach(range=>range.addEventListener('mousemove',handleRangeUpdate))


//CONTINUOUSLY UPDATING THE PANEL WHILE THE VIDEO PLAYS
function handleProgress(){
    const percent=video.currentTime / video.duration * 100
    progressBar.style.flexBasis=`${percent}%`
}
video.addEventListener('timeupdate',handleProgress)

//USING THE PANEL TO SEEK FOREWARD OR BACKARD

function scrub(e){
    const scrubTime=e.offsetX/progress.offsetWidth*video.duration
    video.currentTime=scrubTime
}
let mouseHolding=false;
progress.addEventListener('click',scrub)
progress.addEventListener('mousedown',()=>mouseHolding=true)
progress.addEventListener('mouseup',()=>mouseHolding=false)
progress.addEventListener('mousemove',(event)=>mouseHolding&&scrub(event))