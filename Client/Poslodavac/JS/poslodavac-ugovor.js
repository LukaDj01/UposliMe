import { Poslodavac } from "./Poslodavac.js";
import { Ugovor } from "../../Ugovor/JS/Ugovor.js";
import { Zadrugar } from "../../Zadrugar/JS/Zadrugar.js";
import { Zadruga } from "../../Zadruga/JS/Zadruga.js";
import { Oglas } from "../../Oglas/JS/Oglas.js";
import { Notifikacija } from "../../Notifikacija/JS/Notifikacija.js";

const urlString = window.location.search; //uzmi url
const urlParam=new URLSearchParams(urlString); //preuzmi parametre
var username = urlParam.get('username'); //odredjeni parametar  
let url;


//sta radi kad klikne logo
let uposlimeLogo=document.querySelector(".uposliMeIkona");
uposlimeLogo.addEventListener("click",function(){
    url="../korisnikPoslodavac/index.html?username="+username;
    location.href=url;
})

//sta radi kad klikne na pocetnu
let pocetna=document.querySelector(".pocetna");
pocetna.addEventListener("click",function(){
    url="../korisnikPoslodavac/index.html?username="+username;
    location.href=url;
})

//sta radi kad klikne na profil
let profil = document.querySelector(".profil");
profil.addEventListener("click",function(){
    url="./poslodavac-profil-podaci.html?username="+username;
    location.href=url;
})

//postavljanje linka na dugme "prijaviSmetnju"
let prijaviSmetnje=document.querySelector(".prijaviSmetnje");
prijaviSmetnje.addEventListener("click",function(){
    url="../korisnikPoslodavac/poslodavac-prijavi-smetnju.html?username="+username;
    location.href=url;
})

//postavljanje linka na dugme "obrisiProfil"
let obrisiProfil=document.querySelector(".obrisiProfil");
obrisiProfil.addEventListener("click",function(){
    location.href="../korisnikPoslodavac/poslodavac-obrisi-profil.html?username="+username;
    
})

//postavljanje linka na dugme "promeniLozinku"
let promeniLozinku=document.querySelector(".promeniLozinku");
promeniLozinku.addEventListener("click",function(){
    location.href="../../ZaboravljenaLozinka/HTML/zaboravljenaLozinka.html";
    
})

//postavljanje linka na dugme "oglasi na validaciji"
let oglasiNaValidaciji =document.querySelector(".oglasiNaValidaciji");
oglasiNaValidaciji.addEventListener("click",function(){
    location.href="../korisnikPoslodavac/poslodavac-oglasi-na-validaciji.html?username="+username;
})

//postavljanje linka na dugme "odbijeni oglasi"
let odbijeniOglasi =document.querySelector(".odbijeniOglasi");
odbijeniOglasi.addEventListener("click",function(){
    location.href="../korisnikPoslodavac/poslodavac-odbijeni-oglasi.html?username="+username;
})

//postavljanje linka na dugme "odaberiRadnike"
let odaberiRadnike=document.querySelector(".odaberiRadnike");
odaberiRadnike.addEventListener("click",function(){
    location.href="../korisnikPoslodavac/poslodavac-odaberi-radnike.html?username="+username;
})


//postavljanje linka na dugme "kreirajOglas"
let kreirajOglas=document.querySelector(".kreirajOglas");
kreirajOglas.addEventListener("click",function(){
    location.href="../korisnikPoslodavac/poslodavac-kreiraj-oglas.html?username="+username;
})


//postavljanje linka na dugme "ugovori"
let ugovoriDugme=document.querySelector(".ugovori");
ugovoriDugme.addEventListener("click",function(){
    location.href="../korisnikPoslodavac/poslodavac-ugovori.html?username="+username;
})

//postavljanje linka na dugme "ocene"
let ocene=document.querySelector(".ocene");
ocene.addEventListener("click",function(){
    location.href="../korisnikPoslodavac/poslodavac-ocene.html?username="+username;
})


//povuci podatke iz baze o poslodavcu ciji je username prosledjen kroz url
let poslodavac;
let promPoslodavac = await fetch(`http://localhost:5258/Poslodavac/ValidanUsername/${username}`);
await promPoslodavac.json().then(z=>{
    poslodavac = new Poslodavac(z.id, z.userName, z.password, z.pib, z.maticniBroj, z.slika, z.email, z.fiksniTelefon,
        z.mobilniTelefon, z.naziv, z.delatnost, z.grad, z.ulica, z.brojStana, z.brojUlaza, z.informacije, 
        z.feedbacks, z.oglasi, z.ugovori, z.notifikacije);
})


//profilnaSlika
let profilnaSlika = document.querySelector(".profilnaSlika");
if(poslodavac && poslodavac.slika!="")
    profilnaSlika.src=`../../Slike/${poslodavac.slika}`;

//postavi naziv poslodavca gore desno
let imePrezime = document.querySelector(".imePrezime");
imePrezime.innerHTML=poslodavac.naziv;


// pribavljanje notifikacija vezanih za datog poslodavca
let notifikacijeDiv = document.querySelector(".notifikacijeDiv");
let notifikacije = [];
let brNeprocitanih;
let promNotifikacije = await fetch(`http://localhost:5258/Notifikacija/PreuzmiNotifikacijePoslodavacProzorce/${poslodavac.id}`);
await promNotifikacije.json().then(notifLista=>{
    brNeprocitanih = notifLista.brojNeprocitanih;
    notifLista.neprocitane.forEach(notif => {
        const n = new Notifikacija(notif.id, notif.procitana, notif.poslodavac, notif.notifikacija, notifikacijeDiv);
        notifikacije.push(n);
    });
    if (brNeprocitanih < 5)
    {
        notifLista.procitane.forEach(notif => {
            const n = new Notifikacija(notif.id, notif.procitana, notif.poslodavac, notif.notifikacija, notifikacijeDiv);
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
        location.href="./poslodavac-notifikacije.html?username="+username;
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
            location.href="../korisnikPoslodavac/poslodavac-pregled-notifikacije.html?username="+username+"&notifikacija="+nc.id;
        })
    })
}
omoguciNotifClick();
