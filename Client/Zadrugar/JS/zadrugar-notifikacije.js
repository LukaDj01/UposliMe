import { Oglas } from "../../Oglas/JS/Oglas.js";
import { Filter } from "../../Oglas/JS/Filter.js";
import { Sortiranje } from "../../Oglas/JS/Sortiranje.js";
import { Zadrugar } from "./Zadrugar.js";
import { Stranica } from "../../Oglas/JS/Stranica.js";
import { Notifikacija } from "../../Notifikacija/JS/Notifikacija.js";

const urlString = window.location.search; //uzmi url
const urlParam=new URLSearchParams(urlString); //preuzmi parametre
var username = urlParam.get('username'); //odredjeni parametar


//naslov-sortiranje
let naslovSortiranjeDiv = document.querySelector(".naslov-sortiranjeDiv");
let sortiranje = new Sortiranje();
sortiranje.crtajSortiranjeNotifikacija(naslovSortiranjeDiv);

//odabir sortiranja oglasa
let selekcija = document.querySelector(".selekcija");
selekcija.onchange=()=>selekcijaPromena(selekcija.value);

function selekcijaPromena(vrednost) {
    url=`./zadrugar-notifikacije.html?username=${username}&sort=${vrednost}&stranica=${stranica}`;
    location.href=url;
}

var sort = urlParam.get('sort');
if(sort==null)
{
    sort = "Sortiraj";
    selekcija.firstChild.innerHTML = sort;
    selekcija.firstChild.value = sort;
}
else // 
{
    selekcija.firstChild.innerHTML = sort;
    selekcija.firstChild.value = sort;
}

var stranica = urlParam.get('stranica');
if(stranica==null)
{
    stranica = 0;
}

let url;
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

// zastareli oglasi se postavljaju da su neaktivni
await fetch("http://localhost:5258/Oglas/DeaktivirajOglase/",
        {
            method: 'PUT',
        });

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

//ime i prezime na stranici
let imePrezime = document.querySelector(".imePrezime");
imePrezime.innerHTML=(`${zadrugar.ime} ${zadrugar.prezime}`);


//funkcionalnost klika na notifikaciju
function omoguciNotifClick() {
    let notifClick = document.querySelectorAll(".notifClick");
    notifClick.forEach(nc=>{
        nc.addEventListener("click", function () {
            location.href="../korisnikZadrugar/zadrugar-pregled-notifikacije.html?username="+username+"&notifikacija="+nc.id;
        })
    })
}

// pribavljanje notifikacija vezanih za datog zadrugara
let oglasiDiv = document.querySelector(".oglasiPrikaz");
let notifikacije = [];
let brNeprocitanih;
let brNotifikacija;
let promNotifikacije = await fetch(`http://localhost:5258/Notifikacija/PreuzmiNotifikacijeZadrugarPregledSortiranjeStranica/${username}/${sort}/${stranica}`);
await promNotifikacije.json().then(notifLista=>{
    brNeprocitanih = notifLista.brojNeprocitanih;
    brNotifikacija= notifLista.brojNotifikacija;
    notifLista.notif5.forEach(notif => {
        const n = new Notifikacija(notif.id, notif.procitana, notif.zadrugar, notif.notifikacija, oglasiDiv);
        notifikacije.push(n);
    });
}).catch(s=>console.log("Greska kod preuzimanja notifikacija: ", s));


//broj pretrazenih notifikacija
let brNotifLabela = document.querySelector(".brOglasa");
if (brNeprocitanih%10==1 && brNeprocitanih%100!=11)
    brNotifLabela.innerHTML = `[ ${brNeprocitanih} nepročitana ]`;
else if (brNeprocitanih%10==2 && brNeprocitanih%100!=12)
    brNotifLabela.innerHTML = `[ ${brNeprocitanih} nepročitane ]`;
else
    brNotifLabela.innerHTML = `[ ${brNeprocitanih} nepročitanih ]`;

//funkcija za prikaz notifikacija
function prikaziNotifikacije(niz) {
    //brisanjeNotifikacija();
    if(niz.length!=0)
    {
        niz.forEach(notif => {
            notif.crtajNotifikaciju();
        });
    }
    else
    {
        let notifNijeNadjenDiv = document.createElement("div");
        notifNijeNadjenDiv.classList.add("notifNijeNadjenDiv");
        oglasiDiv.appendChild(notifNijeNadjenDiv);

        let porukaNijeNadjen = document.createElement("h1");
        porukaNijeNadjen.classList.add("porukaNijeNadjen");
        porukaNijeNadjen.innerHTML="Nije nadjen ni jedna notifikacija!";
        notifNijeNadjenDiv.appendChild(porukaNijeNadjen);
    }
    omoguciNotifClick();
}
prikaziNotifikacije(notifikacije);

/*//brisanje notifikacija // vrv useless sad, posle uvodjenja ucitavanje nove strane sa svakom akcijom
function brisanjeNotifikacija(){
    let oglasiPodaci = document.querySelector(".oglasiPodaci");
    oglasiPodaci.removeChild(oglasiDiv);
    oglasiDiv = document.createElement("div");
    oglasiDiv.classList.add("oglasiPrikaz");
    oglasiPodaci.appendChild(oglasiDiv);
}*/

//implementacija prikaza broja stranica - pocetak
let straniceDiv = document.querySelector(".straniceDiv");
let stranice = new Stranica(stranica, brNotifikacija, straniceDiv); // let stranice = new Stranica(5, 261, straniceDiv); - za test
stranice.crtajBrojeveStranica();

let brojeviStranica = document.querySelectorAll(".stranicaPolje");
brojeviStranica.forEach(brojStranice => {
    if(brojStranice.value != stranica)
    {
        brojStranice.addEventListener("click", function () {
            url=`./zadrugar-notifikacije.html?username=${username}&sort=${sort}&stranica=${brojStranice.value}`;
            location.href=url;
        })
    }
    else
    {
        brojStranice.style.cursor="default";
        brojStranice.firstChild.style.cursor="default";
    }
        
});

let sledecaStranica = document.querySelector(".sledecaPolje");
if(sledecaStranica!=null)
{
    sledecaStranica.addEventListener("click", function () {
        stranica++;
        url=`./zadrugar-notifikacije.html?username=${username}&sort=${sort}&stranica=${stranica}`;
        location.href=url;
    })
}

let prethodnaStranica = document.querySelector(".prethodnaPolje");
if(prethodnaStranica!=null)
{
    prethodnaStranica.addEventListener("click", function () {
        stranica--;
        url=`./zadrugar-notifikacije.html?username=${username}&sort=${sort}&stranica=${stranica}`;
        location.href=url;
    })
}
//implementacija prikaza broja stranica - kraj


// podesavanje da se notifikacije prostiru duz cele strane
let oglasiPodaci = document.querySelector(".oglasiPodaci");
oglasiPodaci.style.width = "100%";