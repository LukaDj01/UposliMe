import { Oglas } from "../../Oglas/JS/Oglas.js";
import { Filter } from "../../Oglas/JS/Filter.js";
import { Sortiranje } from "../../Oglas/JS/Sortiranje.js";
import { Administrator } from "./Administrator.js";
import { Stranica } from "../../Oglas/JS/Stranica.js";
import { Notifikacija } from "../../Notifikacija/JS/Notifikacija.js";

let url;
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
    url=`./administrator-notifikacije.html?username=${username}&sort=${vrednost}&stranica=${stranica}`;
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



// zastareli oglasi se postavljaju da su neaktivni
await fetch("http://localhost:5258/Oglas/DeaktivirajOglase/",
        {
            method: 'PUT',
        });

//ucitavanje podataka o administratoru
let administrator;
let promAdministrator = await fetch(`http://localhost:5258/Administrator/ValidanUsername/${username}`);
await promAdministrator.json().then(z=>{
    administrator = new Administrator(z.id, z.userName, z.password, z.notifikacije);
})


//username
let imePrezime = document.querySelector(".userName");
imePrezime.innerHTML=username;


//funkcionalnost klika na notifikaciju
function omoguciNotifClick() {
    let notifClick = document.querySelectorAll(".notifClick");
    notifClick.forEach(nc=>{
        nc.addEventListener("click", function () {
            location.href="../korisnikAdministrator/administrator-pregled-notifikacije.html?username="+username+"&notifikacija="+nc.id;
        })
    })
}

// pribavljanje notifikacija vezanih za datog administratora
let oglasiDiv = document.querySelector(".oglasiPrikaz");
let notifikacije = [];
let brNeprocitanih;
let brNotifikacija;
let promNotifikacije = await fetch(`http://localhost:5258/Notifikacija/PreuzmiNotifikacijeAdministratorPregledSortiranjeStranica/${username}/${sort}/${stranica}`);
await promNotifikacije.json().then(notifLista=>{
    brNeprocitanih = notifLista.brojNeprocitanih;
    brNotifikacija= notifLista.brojNotifikacija;
    notifLista.notif5.forEach(notif => {
        const n = new Notifikacija(notif.id, notif.procitana, notif.administrator, notif.notifikacija, oglasiDiv);
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
            url=`./administrator-notifikacije.html?username=${username}&sort=${sort}&stranica=${brojStranice.value}`;
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
        url=`./administrator-notifikacije.html?username=${username}&sort=${sort}&stranica=${stranica}`;
        location.href=url;
    })
}

let prethodnaStranica = document.querySelector(".prethodnaPolje");
if(prethodnaStranica!=null)
{
    prethodnaStranica.addEventListener("click", function () {
        stranica--;
        url=`./administrator-notifikacije.html?username=${username}&sort=${sort}&stranica=${stranica}`;
        location.href=url;
    })
}
//implementacija prikaza broja stranica - kraj


// podesavanje da se notifikacije prostiru duz cele strane
let oglasiPodaci = document.querySelector(".oglasiPodaci");
oglasiPodaci.style.width = "100%";