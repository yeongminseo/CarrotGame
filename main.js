const gameZone = document.querySelector(".game_area")
const btnStart = document.querySelector(".btnstart")
const btnEnd = document.querySelector(".btnend")
const imgCarrot = document.createElement("img")
const imgBomb = document.createElement("img")
const catchIndex = document.querySelector(".catchcount")
const time = document.querySelector(".countdown")

let catchCount = 10;
//catchIndex.innerText=`남은당근: ${catchCount}`
let timeCount = 10;
//time.innerText=`남은시간: ${timeCount}`
let cron;
const carrot= document.getElementsByClassName("carrot")
const bug= document.getElementsByClassName("bug")
const info = document.querySelector(".info")

function countCarrot(){
    const div = document.querySelector(".box_carrot")
    catchCount -= 1;
    div.innerText=`남은당근 ${catchCount}`
    if(catchCount===0){
        const currentTime = timeCount;
        catchCount = 10;
        gameEnd()
        clearInterval(cron)
        catchCount = 10 ;
        alert(`축하드립니다. ${currentTime}초 남기고 통과하셨습니다.`)
    }
}
function countStart(){
    const div = document.querySelector(".box_time")
    timeCount -= 1
    div.innerText=`남은시간:${timeCount}`;
    if(timeCount===0){
        gameEnd()
        clearInterval(cron)
        return;
    }
}
function gameEnd(){
    const boxTime = document.querySelector(".box_time")
    const boxCarrot = document.querySelector(".box_carrot")
    timeCount = 10;
    catchCount = 10;
    boxCarrot.remove()
    boxTime.remove()
    const imgs = document.querySelectorAll("img")
    btnEnd.classList.remove("hidden")
    for(var i = 0; i<imgs.length; i++){
       imgs[i].remove()     
    }
}
function addItem(classname,imgpath){
    for(var i =0; i<catchCount;i++){
        const item = document.createElement("img")
        gameZone.appendChild(item)
        item.classList.add(classname)
        item.setAttribute("src",imgpath)
        let x=Math.random()*86
        let y=Math.random()*86
        item.style.top=`${x}%`
        item.style.left=`${y}%`
    }
}
function createInfo(){
    const divEl = document.createElement("div")
    const divEl2 = document.createElement("div")
    divEl.classList.add("box_time")
    divEl2.classList.add("box_carrot")
    divEl.innerText=`남은시간 ${timeCount}`
    divEl2.innerText=`남은당근 ${catchCount}`
    info.appendChild(divEl)
    info.appendChild(divEl2)
}
function onClclickItems(items){
    for(var i = 0; i<items.length; i++){
        items[i].addEventListener("click",(e)=>{
            if(e.target.className==="bug"){
                gameEnd()
                clearInterval(cron)
                return;
            }else
        e.target.remove()
        countCarrot()
    })
    }
}
function gameStart(){
        createInfo()
        cron = setInterval(countStart,1000)
        btnStart.classList.add("hidden")
        addItem("carrot","img/carrot.png")
        addItem("bug","img/bug.png")
        const carrots = document.querySelectorAll(".carrot")
        const bugs = document.querySelectorAll(".bug")
        onClclickItems(carrots)
        onClclickItems(bugs)
    console.log(document.querySelectorAll("img"))
}

function restart (){
    gameStart()
    btnEnd.classList.add("hidden")
}
btnStart.addEventListener("click",gameStart)
btnEnd.addEventListener("click",restart)
