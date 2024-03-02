var tipKorisnika= document.querySelector(".korisnici");

var ulogujSeBtn = document.querySelector(".ulogujSe");

ulogujSeBtn.addEventListener("click",function(){
    location.href="../../Logovanje/HTML/logovanje.html";
})


var btnZadrugar= document.querySelector(".zadrugar");
var btnZadruga= document.querySelector(".zadruga");
var btnPoslodavac= document.querySelector(".poslodavac");

btnZadrugar.addEventListener("click",function(){
    location.href="../HTML/forma-reg-Zadrugar.html";
})

btnZadruga.addEventListener("click",function(){
    location.href="../HTML/forma-reg-Zadruga.html";
})

btnPoslodavac.addEventListener("click",function(){
    location.href="../HTML/forma-reg-Poslodavac.html";
})
