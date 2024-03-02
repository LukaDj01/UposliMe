import { Zadrugar } from "./Zadrugar.js";
import { Notifikacija } from "../../Notifikacija/JS/Notifikacija.js";

const urlString = window.location.search; //uzmi url
const urlParam=new URLSearchParams(urlString); //preuzmi parametre
var username = urlParam.get('username'); //odredjeni parametar  
let url;


//ucitavanje podataka o zadrugaru
let zadrugar;
let promZadrugar = await fetch(`http://localhost:5258/Zadrugar/ValidanUsername/${username}`);
await promZadrugar.json().then(z=>{
        zadrugar = new Zadrugar(z.id, z.userName, z.password, z.ime, z.prezime, z.slika, z.email, z.telefon,
            z.datumRodjenja, z.jmbg, z.srednjaSkola, z.fakultet, z.indeks, z.lbo, z.brojRacuna, 
            z.grad, z.ulica, z.brojStana, z.brojUlaza, z.feedbacks, z.oglasi, z.ugovori, z.notifikacije);
})


//profilnaSlika
let profilnaSlika = document.querySelector(".profilnaSlika");
if(zadrugar && zadrugar.slika!="")
    profilnaSlika.src=`../../Slike/${zadrugar.slika}`;

//postavi naziv zadrugara gore desno
let imePrezime = document.querySelector(".imePrezime");
imePrezime.innerHTML=`${zadrugar.ime} ${zadrugar.prezime}`;


//postavljanje linka na logo-u
let uposlimeLogo=document.querySelector(".uposliMeIkona");
uposlimeLogo.addEventListener("click",function(){
    url="../korisnikZadrugar/index.html?username="+username;
    location.href=url;
})

//postavljanje linka na dugme "pocetna"
let pocetna=document.querySelector(".pocetna");
pocetna.addEventListener("click",function(){
    url="../korisnikZadrugar/index.html?username="+username;
    location.href=url;
})

//postavljanje linka na dugme "prijaviSmetnju"
let prijaviSmetnje=document.querySelector(".prijaviSmetnje");
prijaviSmetnje.addEventListener("click",function(){
    url="../korisnikZadrugar/zadrugar-prijavi-smetnju.html?username="+username;
    location.href=url;
})

//postavljanje linka na dugme "obrisiProfil"
let obrisiProfil=document.querySelector(".obrisiProfil");
obrisiProfil.addEventListener("click",function(){
    location.href="../korisnikZadrugar/zadrugar-obrisi-profil.html?username="+username;
    
})

//postavljanje linka na dugme "profil"
let profil = document.querySelector(".profil");
profil.addEventListener("click",function(){
    url="./zadrugar-profil-podaci.html?username="+username;
    location.href=url;
})

//postavljanje linka na dugme "promeniLozinku"
let promeniLozinku=document.querySelector(".promeniLozinku");
promeniLozinku.addEventListener("click",function(){
    location.href="../../ZaboravljenaLozinka/HTML/zaboravljenaLozinka.html";
    
})

//link za prijavljeni-oglasi stranicu
let mojaApliciranjaBtn = document.querySelector(".mojaApliciranja");
mojaApliciranjaBtn.addEventListener("click", function () {
    url="./prijavljeni-oglasi.html?username="+username;
    location.href=url;
})

//postavljanje linka na dugme "ugovori"
let ugovoriDugme=document.querySelector(".ugovori");
ugovoriDugme.addEventListener("click",function(){
    location.href="../korisnikZadrugar/zadrugar-ugovori.html?username="+username;
})

//postavljanje linka na dugme "ocene"
let ocene=document.querySelector(".ocene");
ocene.addEventListener("click",function(){
    location.href="../korisnikZadrugar/zadrugar-ocene.html?username="+username;
})



// pribavljanje notifikacija vezanih za datog zadrugara
let notifikacijeDiv = document.querySelector(".notifikacijeDiv");
let notifikacije = [];
let brNeprocitanih;
let promNotifikacije = await fetch(`http://localhost:5258/Notifikacija/PreuzmiNotifikacijeZadrugarProzorce/${zadrugar.id}`);
await promNotifikacije.json().then(notifLista=>{
    brNeprocitanih = notifLista.brojNeprocitanih;
    notifLista.neprocitane.forEach(notif => {
        const n = new Notifikacija(notif.id, notif.procitana, notif.zadrugar, notif.notifikacija, notifikacijeDiv);
        notifikacije.push(n);
    });
    if (brNeprocitanih < 5)
    {
        notifLista.procitane.forEach(notif => {
            const n = new Notifikacija(notif.id, notif.procitana, notif.zadrugar, notif.notifikacija, notifikacijeDiv);
            notifikacije.push(n);
        });
    }
}).catch(s=>console.log("Greska kod preuzimanja notifikacija: ", s));

// iscrtavanje notifikacija u odgovarajucem prozorcetu
function prikazNotifikacija() {
    notifikacije.forEach(notif=>{
        notif.crtajNotifikacijuProzorce();
    })

    // dugme za prikaz svih notifikacija
    let prikaziSveNotif = document.createElement("a");
    prikaziSveNotif.className="prikaziSveNotif dropdown-item text-center small text-gray-500";
    prikaziSveNotif.innerHTML="Prikaži sve notifikacije";
    prikaziSveNotif.addEventListener("click", function () {
        location.href="./zadrugar-notifikacije.html?username="+username;
    })
    notifikacijeDiv.appendChild(prikaziSveNotif);
}
prikazNotifikacija();

// postavljanje broja neprocitanih notifikacija
let brNeprocNotif = document.querySelector(".brNeprocNotif");
if (brNeprocitanih > 5)
    brNeprocNotif.innerHTML = `5+`;
else if (brNeprocitanih != 0)
    brNeprocNotif.innerHTML = brNeprocitanih;

//funkcionalnost klika na notifikaciju
function omoguciNotifClick() {
    let notifClick = document.querySelectorAll(".notifikacija");
    notifClick.forEach(nc=>{
        nc.addEventListener("click", function () {
            location.href="../korisnikZadrugar/zadrugar-pregled-notifikacije.html?username="+username+"&notifikacija="+nc.id;
        })
    })
}
omoguciNotifClick();