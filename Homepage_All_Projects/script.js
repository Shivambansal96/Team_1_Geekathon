const backCard = document.getElementsByClassName('back-card');



function backPartShow() {
    document.querySelector('i').style.opacity = "1";
}

function backPartHide() {
    document.querySelector('i').style.opacity = "0";
}



backCard.addEventListener("onmouseover", backPartShow)
backCard.addEventListener("onmouseout", backPartHide)

