import { Oglas } from "../../Oglas/JS/Oglas.js";
import { Filter } from "../../Oglas/JS/Filter.js";
import { Sortiranje } from "../../Oglas/JS/Sortiranje.js";
import { Poslodavac } from "./Poslodavac.js";
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
    url=`./poslodavac-notifikacije.html?username=${username}&sort=${vrednost}&stranica=${stranica}`;
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
let ugovori=document.querySelector(".ugovori");
ugovori.addEventListener("click",function(){
    location.href="../korisnikPoslodavac/poslodavac-ugovori.html?username="+username;
})

//postavljanje linka na dugme "ocene"
let ocene=document.querySelector(".ocene");
ocene.addEventListener("click",function(){
    location.href="../korisnikPoslodavac/poslodavac-ocene.html?username="+username;
})

// zastareli oglasi se postavljaju da su neaktivni
await fetch("http://localhost:5258/Oglas/DeaktivirajOglase/",
        {
            method: 'PUT',
        });

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


//funkcionalnost klika na notifikaciju
function omoguciNotifClick() {
    let notifClick = document.querySelectorAll(".notifClick");
    notifClick.forEach(nc=>{
        nc.addEventListener("click", function () {
            location.href="../korisnikPoslodavac/poslodavac-pregled-notifikacije.html?username="+username+"&notifikacija="+nc.id;
        })
    })
}

// pribavljanje notifikacija vezanih za datog poslodavca
let oglasiDiv = document.querySelector(".oglasiPrikaz");
let notifikacije = [];
let brNeprocitanih;
let brNotifikacija;
let promNotifikacije = await fetch(`http://localhost:5258/Notifikacija/PreuzmiNotifikacijePoslodavacPregledSortiranjeStranica/${username}/${sort}/${stranica}`);
await promNotifikacije.json().then(notifLista=>{
    brNeprocitanih = notifLista.brojNeprocitanih;
    brNotifikacija= notifLista.brojNotifikacija;
    notifLista.notif5.forEach(notif => {
        const n = new Notifikacija(notif.id, notif.procitana, notif.poslodavac, notif.notifikacija, oglasiDiv);
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
            url=`./poslodavac-notifikacije.html?username=${username}&sort=${sort}&stranica=${brojStranice.value}`;
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
        url=`./poslodavac-notifikacije.html?username=${username}&sort=${sort}&stranica=${stranica}`;
        location.href=url;
    })
}

let prethodnaStranica = document.querySelector(".prethodnaPolje");
if(prethodnaStranica!=null)
{
    prethodnaStranica.addEventListener("click", function () {
        stranica--;
        url=`./poslodavac-notifikacije.html?username=${username}&sort=${sort}&stranica=${stranica}`;
        location.href=url;
    })
}
//implementacija prikaza broja stranica - kraj

// podesavanje da se notifikacije prostiru duz cele strane
let oglasiPodaci = document.querySelector(".oglasiPodaci");
oglasiPodaci.style.width = "100%";