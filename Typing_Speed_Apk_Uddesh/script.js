const typingText = document.querySelector(".typing-text p"),
    inputField = document.querySelector(".wrapper .input-field"),
    timeTage=document.querySelector(".timer span b")
    mistakeTage=document.querySelector(".mistake span"),
    wpmTage=document.querySelector(".wpm span"),
    cpmTage=document.querySelector(".cpm span"),
    tryAgainTag=document.querySelector("button");



let timer,
maxTimer=60,
timeLeft=maxTimer,
charIndex = misteks = isTyping = 0;

function randomPragraph() {
    let randomInd = Math.floor(Math.random() * paragraph.length); //random index of pragraph from paragraph.js
    typingText.innerHTML ="";
    paragraph[randomInd].split("").forEach(span => {
        let spanTag = `<span>${span}</span>`;//store slice seprat word in span tag
        typingText.innerHTML += spanTag;
    });
    typingText.querySelectorAll("span")[0].classList.add("active");
    document.addEventListener("keydown", () => inputField.focus());
    typingText.addEventListener("click", () => inputField.focus());
}

function initType() {
    const charecters = typingText.querySelectorAll("span");
    let typedChar = inputField.value.split("")[charIndex];
   if(charIndex<charecters.length-1 && timeLeft>0){
    if(!isTyping){
        timer=setInterval(initTimer,1000);
        isTyping=true;
    }
    

    if (typedChar == null) {
        charIndex--;
        if(charecters[charIndex].classList.contains("incorrect")){
            misteks--;
        }
        charecters[charIndex].classList.remove("correct", "incorrect");
    } else {
        if (charecters[charIndex].innerText === typedChar) {
            charecters[charIndex].classList.add("correct");
        } else {
            misteks++;
            charecters[charIndex].classList.add("incorrect");
        }
        charIndex++;
    }
    charecters.forEach(span => span.classList.remove("active"));
    charecters[charIndex].classList.add("active");
    
    let wpm=Math.round((((charIndex-misteks)/5)/(maxTimer-timeLeft))*60);
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;
    mistakeTage.innerText=misteks;
    wpmTage.innerText=wpm;
    cpmTage.innerText=charIndex-misteks;
   }else{
    inputField.value="";
    clearInterval(timer);
   }
}
function initTimer(){
    if(timeLeft>0){
        timeLeft--;
        timeTage.innerText=timeLeft;
    }else{
        clearInterval(timer);
    }
}
function resetGane(){
    randomPragraph();
    inputField.value="";
    clearInterval(timer);           
    timeLeft=maxTimer;
    charIndex = misteks = isTyping = 0;
    timeTage.innerText=timeLeft;
    mistakeTage.innerText=misteks;
    wpmTage.innerText=0;
    cpmTage.innerText=0;
}
randomPragraph();
inputField.addEventListener("input", initType);
tryAgainTag.addEventListener("click", resetGane);