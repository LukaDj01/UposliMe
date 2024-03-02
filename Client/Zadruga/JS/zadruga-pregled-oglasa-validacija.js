import { Zadruga } from "./Zadruga.js";
import { Notifikacija } from "../../Notifikacija/JS/Notifikacija.js";


const urlString = window.location.search; //uzmi url
const urlParam=new URLSearchParams(urlString); //preuzmi parametre
var username = urlParam.get('username'); //odredjeni parametar  

//ucitavanje podataka o zadruzi
let zadruga;
let promZadruga = await fetch(`http://localhost:5258/Zadruga/ValidanUsername/${username}`);
await promZadruga.json().then(z=>{
    zadruga = new Zadruga(z.id, z.userName, z.password, z.pib, z.maticniBroj, z.slika, z.email, z.fiksniTelefon,
        z.mobilniTelefon, z.naziv, z.brojRacuna, z.grad, z.ulica, z.brojStana, z.brojUlaza, 
        z.informacije,z.feedbacks, z.oglasi, z.ugovori, z.notifikacije);

})

//profilnaSlika
let profilnaSlika = document.querySelector(".profilnaSlika");
if(zadruga && zadruga.slika!="")
    profilnaSlika.src=`../../Slike/${zadruga.slika}`;

//postavi username
let imePrezime = document.querySelector(".imePrezime");
imePrezime.innerHTML=zadruga.naziv;

let url;
//sta radi kad klikne logo
let uposlimeLogo=document.querySelector(".uposliMeIkona");
uposlimeLogo.addEventListener("click",function(){
    url="../korisnikZadruga/index.html?username="+username;
    location.href=url;
})

//sta radi kad klikne na pocetnu
let pocetna=document.querySelector(".pocetna");
pocetna.addEventListener("click",function(){
    url="../korisnikZadruga/index.html?username="+username;
    location.href=url;
})

//postavljanje linka na dugme "oglasi za validiranje"
let oglasiZaValidiranje=document.querySelector(".oglasiZaValidiranje");
oglasiZaValidiranje .addEventListener("click",function(){
    location.href="../../Zadruga/korisnikZadruga/zadruga-oglasi-za-validiranje.html?username="+username;
})

//postavljanje linka na dugme "aktivni ugovori"
let aktivniUgovori =document.querySelector(".aktivniUgovori");
aktivniUgovori.addEventListener("click",function(){
    location.href="../../Zadruga/korisnikZadruga/zadruga-aktivni-ugovori.html?username="+username;
})

//postavljanje linka na dugme "kreiraj ugovor"
let kreirajUgovor=document.querySelector(".kreirajUgovor");
kreirajUgovor.addEventListener("click",function(){
    location.href="../../Zadruga/korisnikZadruga/zadruga-kreiraj-ugovori.html?username="+username;
})

//postavljanje linka na dugme "ocene"
let oceneBtn=document.querySelector(".ocene");
oceneBtn.addEventListener("click",function(){
    location.href="../../Zadruga/korisnikZadruga/zadruga-ocene.html?username="+username;
})

//sta radi kad klikne na profil
let profil = document.querySelector(".profil");
profil.addEventListener("click",function(){
    url="./zadruga-profil-podaci.html?username="+username;
    location.href=url;
})

//postavljanje linka na dugme "prijaviSmetnju"
let prijaviSmetnje=document.querySelector(".prijaviSmetnje");
prijaviSmetnje.addEventListener("click",function(){
    url="../korisnikZadruga/zadruga-prijavi-smetnju.html?username="+username;
    location.href=url;
})

//postavljanje linka na dugme "obrisiProfil"
let obrisiProfil=document.querySelector(".obrisiProfil");
obrisiProfil.addEventListener("click",function(){
    location.href="../korisnikZadruga/zadruga-obrisi-profil.html?username="+username;
    
})

//postavljanje linka na dugme "promeniLozinku"
let promeniLozinku=document.querySelector(".promeniLozinku");
promeniLozinku.addEventListener("click",function(){
    location.href="../../ZaboravljenaLozinka/HTML/zaboravljenaLozinka.html";
})




// pribavljanje notifikacija vezanih za datu zadrugu
let notifikacijeDiv = document.querySelector(".notifikacijeDiv");
let notifikacije = [];
let brNeprocitanih;
let promNotifikacije = await fetch(`http://localhost:5258/Notifikacija/PreuzmiNotifikacijeZadrugaProzorce/${zadruga.id}`);
await promNotifikacije.json().then(notifLista=>{
    brNeprocitanih = notifLista.brojNeprocitanih;
    notifLista.neprocitane.forEach(notif => {
        const n = new Notifikacija(notif.id, notif.procitana, notif.zadruga, notif.notifikacija, notifikacijeDiv);
        notifikacije.push(n);
    });
    if (brNeprocitanih < 5)
    {
        notifLista.procitane.forEach(notif => {
            const n = new Notifikacija(notif.id, notif.procitana, notif.zadruga, notif.notifikacija, notifikacijeDiv);
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
        location.href="./zadruga-notifikacije.html?username="+username;
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
            location.href="../korisnikZadruga/zadruga-pregled-notifikacije.html?username="+username+"&notifikacija="+nc.id;
        })
    })
}
omoguciNotifClick();