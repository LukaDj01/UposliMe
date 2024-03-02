const urlString = window.location.search; //uzmi url
const urlParam=new URLSearchParams(urlString); //preuzmi parametre
var username = urlParam.get('username'); //odredjeni parametar  

let url;

//sta radi kad klikne logo
let uposlimeLogo=document.querySelector(".uposliMeIkona");
uposlimeLogo.addEventListener("click",function(){
    url="../korisnikAdministrator/index.html?username="+username;
    location.href=url;
})

//sta radi kad klikne na aktivniOglasi
let aktivniOglasi=document.querySelector(".aktivniOglasi");
aktivniOglasi.addEventListener("click",function(){
    url="../korisnikAdministrator/index.html?username="+username;
    location.href=url;
})

//sta radi kad klikne na odbijeniOglasi
let odbijeniOglasi=document.querySelector(".odbijeniOglasi");
odbijeniOglasi.addEventListener("click",function(){
    url="../korisnikAdministrator/administrator-odbijeni-oglasi.html?username="+username;
    location.href=url;
})

//sta radi kad klikne na oglasiNaValidaciji
let oglasiNaValidaciji =document.querySelector(".oglasiNaValidaciji");
oglasiNaValidaciji.addEventListener("click",function(){
    url="../korisnikAdministrator/administrator-oglasi-na-validaciji.html?username="+username;
    location.href=url;
})


//sta radi kad klikne na oglasiZaOdabirRadnika
let oglasiZaOdabirRadnika =document.querySelector(".oglasiZaOdabirRadnika");
oglasiZaOdabirRadnika.addEventListener("click",function(){
    url="../korisnikAdministrator/administrator-oglasi-za-odabir-radnika.html?username="+username;
    location.href=url;
})

//sta radi kad klikne na oglasiZaKreiranjeUgovora
let oglasiZaKreiranjeUgovora =document.querySelector(".oglasiZaKreiranjeUgovora");
oglasiZaKreiranjeUgovora.addEventListener("click",function(){
    url="../korisnikAdministrator/administrator-oglasi-za-kreiranje-ugovora.html?username="+username;
    location.href=url;
})

//sta radi kad klikne na ugovori
let ugovori =document.querySelector(".ugovori");
ugovori.addEventListener("click",function(){
    url="../korisnikAdministrator/administrator-ugovori.html?username="+username;
    location.href=url;
})

//sta radi kad klikne na korisnici
let korisnici =document.querySelector(".korisnici");
korisnici.addEventListener("click",function(){
    url="../korisnikAdministrator/administrator-korisnici.html?username="+username;
    location.href=url;
})