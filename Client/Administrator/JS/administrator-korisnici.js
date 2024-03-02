import { Administrator } from "./Administrator.js";
import { Poslodavac } from "../../Poslodavac/JS/Poslodavac.js";
import { Zadruga } from "../../Zadruga/JS/Zadruga.js";
import {Zadrugar} from "../../Zadrugar/JS/Zadrugar.js";
import { Filter } from "../../Oglas/JS/Filter.js";
import { Stranica } from "../../Oglas/JS/Stranica.js";
import { Notifikacija } from "../../Notifikacija/JS/Notifikacija.js";

let url;
const urlString = window.location.search; //uzmi url
const urlParam=new URLSearchParams(urlString); //preuzmi parametre
var username = urlParam.get('username'); //odredjeni parametar  


let administrator;
let promAdministrator = await fetch(`http://localhost:5258/Administrator/ValidanUsername/${username}`);
await promAdministrator.json().then(z=>{
    administrator = new Administrator(z.id, z.userName, z.password, z.notifikacije);
})

//username
let imePrezime = document.querySelector(".userName");
imePrezime.innerHTML=username;



//pretrazivanje oglasa polja za kucanje + enter
let poljaPretrazi = document.querySelectorAll(".poljePretrazi"); // u pitanju su 2 dugmica i 2 polja - prva 2 na uobicajenoj velicini ekrana, a druga 2 na XS velicini
poljaPretrazi.forEach((poljePretrazi)=>{
    poljePretrazi.addEventListener("keypress", async function (event) {
        if(event.key === "Enter")
        {
            event.preventDefault();
            if(poljePretrazi.value.length!==0)
            {
                url=`./administrator-korisnici.html?username=${username}&zadruga=${zadruga}&poslodavac=${poslodavac}&zadrugar=${zadrugar}&pretraga=${poljePretrazi.value}&stranica=${0}`;
                location.href=url;
            }
            else
            {
                url=`./administrator-korisnici.html?username=${username}&zadruga=${zadruga}&poslodavac=${poslodavac}&zadrugar=${zadrugar}&stranica=${0}`;
                location.href=url;
            }
        }
    })
});

//pretrazivanje oglasa polje za kucanje + dugme
let btnsPretrazi = document.querySelectorAll(".btnPretrazi"); // u pitanju su 2 dugmica i 2 polja - prva 2 na uobicajenoj velicini ekrana, a druga 2 na XS velicini
btnsPretrazi.forEach((btnPretrazi, i)=>{
    btnPretrazi.addEventListener("click", async function () {
        if(poljaPretrazi[i].value.length!==0)
            {
                url=`./administrator-korisnici.html?username=${username}&zadruga=${zadruga}&poslodavac=${poslodavac}&zadrugar=${zadrugar}&pretraga=${poljaPretrazi[i].value}&stranica=${0}`;
                location.href=url;
            }
            else
            {
                url=`./administrator-korisnici.html?username=${username}&zadruga=${zadruga}&poslodavac=${poslodavac}&zadrugar=${zadrugar}&stranica=${0}`;
                location.href=url;
            }
    })
});


//prikaz filtera
let filteriDiv = document.querySelector(".filteriPrikaz");
let filter = new Filter();
filter.crtajFilterAdminKorisnici(filteriDiv);

let filterZadruga = document.querySelector(".zadrugaVrednost");
let filterPoslodavac = document.querySelector(".poslodavacVrednost");
let filterZadrugar = document.querySelector(".zadrugarVrednost");



//postavljanje default-nih vrednosti ukoliko nista u suprotnom nije izabrano
//postavljanje vrednosti za filtere
var zadruga = urlParam.get('zadruga');
var poslodavac = urlParam.get('poslodavac');
var zadrugar = urlParam.get('zadrugar');
if(zadruga==null && poslodavac==null && zadrugar==null){
    zadruga="checked";
    filterZadruga.checked=true;
    poslodavac="checked";
    filterPoslodavac.checked=true;
    zadrugar="checked";
    filterZadrugar.checked=true;
}
else{
    if(zadruga==null || zadruga==="null")
        zadruga = "null";
    else{
        filterZadruga.checked=true;
        zadruga="checked";
    }

    if(poslodavac==null || poslodavac=="null")
        poslodavac = "null";
    else{
        filterPoslodavac.checked=true;
        poslodavac="checked";
    }

    if(zadrugar==null || zadrugar=="null")
        zadrugar = "null";
    else{
        filterZadrugar.checked=true;
        zadrugar="checked";
    }
}


var pretraga = urlParam.get('pretraga');
if(pretraga==null || pretraga == " ")
{
    pretraga = " ";
    poljaPretrazi.forEach((poljePretrazi)=>{
        poljePretrazi.value="";
    })
}
else
{
    poljaPretrazi.forEach((poljePretrazi)=>{
        poljePretrazi.value=pretraga;
    })
}


var stranica = urlParam.get('stranica');
if(stranica==null)
{
    stranica = 0;
}




/*//naslov-sortiranje
let naslovSortiranjeDiv = document.querySelector(".naslov-sortiranjeDiv");
let sortiranje = new Sortiranje();
sortiranje.crtajSortiranjeAdminKorisnici(naslovSortiranjeDiv);

//odabir sortiranja oglasa
let selekcija = document.querySelector(".selekcija");
selekcija.onchange=()=>selekcijaPromena(selekcija.value);

function selekcijaPromena(vrednost) {
    url=`./administrator-korisnici.html?username=${username}&zadruga=${zadruga}&poslodavac=${poslodavac}&zadrugar=${zadrugar}&pretraga=${pretraga}&sort=${vrednost}&stranica=${stranica}`;
    location.href=url;
}*/



//ucitavanje oglasa
let korisniciDiv = document.querySelector(".korisniciPrikaz");
let korisnici = [];
let brojKorisnika;
let podaci;
let promKorisnici = await fetch(`http://localhost:5258/Administrator/PreuzmiSveKorisnikeAdministratorPregledFiltriranjePretragaStranica/${username}/${zadruga}/${poslodavac}/${zadrugar}/${pretraga}/${stranica}`);
await promKorisnici.json().then(korisniciLista=>{  
    brojKorisnika = korisniciLista.brojKorisnika;
    korisniciLista.korisnici5.forEach(z => {
        podaci=Object.getOwnPropertyNames(z);
        if(podaci.includes("delatnost")){
                const posl =  new Poslodavac(z.id, z.userName, z.password, z.pib, z.maticniBroj, z.slika, z.email, z.fiksniTelefon,
                z.mobilniTelefon, z.naziv, z.delatnost, z.grad, z.ulica, z.brojStana, z.brojUlaza, z.informacije, 
                z.feedbacks, z.oglasi, z.ugovori, z.notifikacije);
                    
                korisnici.push(posl);
        }
        else if(podaci.includes("brojRacuna")==true && podaci.includes("delatnost")==false && podaci.includes("ime")===false){
            const zadra = new Zadruga(z.id, z.userName, z.password, z.pib, z.maticniBroj, z.slika, z.email, z.fiksniTelefon,
            z.mobilniTelefon, z.naziv, z.brojRacuna, z.grad, z.ulica, z.brojStana, z.brojUlaza, 
            z.informacije,z.feedbacks, z.oglasi, z.ugovori, z.notifikacije);

            korisnici.push(zadra);
        }
        else if(podaci.includes("ime")){
            const zadrr = new Zadrugar(z.id, z.userName, z.password, z.ime, z.prezime, z.slika, z.email, z.telefon,
            z.datumRodjenja, z.jmbg, z.srednjaSkola, z.fakultet, z.indeks, z.lbo, z.brojRacuna, 
            z.grad, z.ulica, z.brojStana, z.brojUlaza, z.feedbacks, z.oglasi, z.ugovori, z.notifikacije);

            korisnici.push(zadrr);
        }
     
    });

}).catch(s=>console.log("Greska kod preuzimanja oglasa: ", s));


//broj pretrazenih oglasa
let brOglasaLabela = document.querySelector(".brOglasa");
if(brojKorisnika%10==1 && brojKorisnika%100!=11)
    brOglasaLabela.innerHTML = `[ ${brojKorisnika} rezultat ]`;
else
    brOglasaLabela.innerHTML = `[ ${brojKorisnika} rezultata ]`;

//dugme za primenu filtera
let dugmePrimeni = document.querySelector(".dugmePrimeni");
dugmePrimeni.addEventListener("click", function () {
    filterZadruga = document.querySelector(".zadrugaVrednost");
    filterPoslodavac = document.querySelector(".poslodavacVrednost");
    filterZadrugar = document.querySelector(".zadrugarVrednost");
    if(filterZadruga.checked){
        zadruga="checked";
    }
    else{
        zadruga="null";
    }
    if(filterPoslodavac.checked){
        poslodavac="checked";
    }
    else{
        poslodavac="null";
    }
    if(filterZadrugar.checked){
        zadrugar="checked";
    }
    else{
        zadrugar="null";
    }

    url=`./administrator-korisnici.html?username=${username}&zadruga=${zadruga}&poslodavac=${poslodavac}&zadrugar=${zadrugar}&pretraga=${pretraga}&stranica=${0}`;
    location.href=url;
});

//dugme za otkazivanje filtera
let dugmeOtkazi = document.querySelector(".dugmeOtkazi");
dugmeOtkazi.addEventListener("click", function () {
    url=`./administrator-korisnici.html?username=${username}&pretraga=${pretraga}&stranica=${0}`;
    location.href=url;
});

            
//funkcija za prikaz oglasa
function prikaziKorisnike(niz) {
    brisanjeKorisnika();
    if(niz.length!=0){
        niz.forEach(korisnik => {
            if(korisnik instanceof Poslodavac){
                korisnik.crtajPoslodavcaAdmin(korisniciDiv);
            }
            else if(korisnik instanceof Zadruga){
                korisnik.crtajZadruguAdmin(korisniciDiv);
            }
            else if(korisnik instanceof Zadrugar){
                korisnik.crtajZadrugaraAdmin(korisniciDiv);
            }
            
        });

        //zameni klasu dugmeAplicirajVrednost u dugmeObrisi
        let dugmeObrisiKorisnika = document.querySelectorAll(".dugmeAplicirajVrednost");
        dugmeObrisiKorisnika.forEach(dugme => {
            dugme.classList.replace("dugmeAplicirajVrednost","dugmeObrisi");
            dugme.value="Obriši";
        })
        omoguciDugmeOtvoriKorisnika();
        omoguciDugmeObrisiKorisnika();
        omoguciImeIliNazivKlik();
    }
    else
    {
        let oglasNijeNadjenDiv = document.createElement("div");
        oglasNijeNadjenDiv.classList.add("oglasNijeNadjenDiv");
        korisniciDiv.appendChild(oglasNijeNadjenDiv);

        let porukaNijeNadjen = document.createElement("h1");
        porukaNijeNadjen.classList.add("porukaNijeNadjen");
        porukaNijeNadjen.innerHTML="Nije nadjen ni jedan korisnik!";
        oglasNijeNadjenDiv.appendChild(porukaNijeNadjen);
    }
}
prikaziKorisnike(korisnici);



//brisanje izcrtanih korisnika
function brisanjeKorisnika() {
    let korisniciPodaci = document.querySelector(".korisniciPodaci");
    korisniciPodaci.removeChild(korisniciDiv);
    korisniciDiv = document.createElement("div");
    korisniciDiv.classList.add("korisniciPrikaz");
    korisniciPodaci.appendChild(korisniciDiv);
}

//dugme "Obrisi" funkcionalnost
function omoguciDugmeObrisiKorisnika() {
    
    let btnObrisi = document.querySelectorAll(".obrisiKorisnika");
    btnObrisi.forEach(btn=>{
        btn.addEventListener("click", function () {
                if(btn.classList[0]==="obrisiPoslodavcaBtn"){
                    fetch(`http://localhost:5258/Poslodavac/IzbrisiPoslodavcaPrekousername/${btn.id}/`,            
                    {
                        method: "PUT"
                    }).then(p=>
                        {   
                            location.reload();
                        });
                }
                else  if(btn.classList[0]==="obrisiZadruguBtn"){
                    fetch(`http://localhost:5258/Zadruga/IzbrisiZadruguPrekousername/${btn.id}/`,            
                    {
                        method: "PUT"
                    }).then(p=>
                        {   
                            location.reload();
                        });
                }
                else  if(btn.classList[0]==="obrisiZadrugaraBtn"){
                    fetch(`http://localhost:5258/Zadrugar/IzbrisiZadrugaraPrekousername/${btn.id}/`,            
                    {
                        method: "PUT"
                    }).then(p=>
                        {   
                            location.reload();
                        });
                }
        })
    })
}


//dugme "Izmeni" funkcionalnost
function omoguciDugmeOtvoriKorisnika() {
    let btnOtvoriKorisnika = document.querySelectorAll(".otvoriKorisnika");
    btnOtvoriKorisnika.forEach(btn=>{
        btn.addEventListener("click", function () {
            if(btn.classList[0]==="otvoriPoslodavcaBtn"){
                location.href="../korisnikAdministrator/administrator-prikaz-korisnika.html?username="+username+"&poslodavac="+btn.id;
            }
            else  if(btn.classList[0]==="otvoriZadruguBtn"){
                location.href="../korisnikAdministrator/administrator-prikaz-korisnika.html?username="+username+"&zadruga="+btn.id;
            }
            else  if(btn.classList[0]==="otvoriZadrugaraBtn"){
                location.href="../korisnikAdministrator/administrator-prikaz-korisnika.html?username="+username+"&zadrugar="+btn.id;
            }
        })
    })
}

//funkcionalnost klika na naslov oglasa
function omoguciImeIliNazivKlik() {
    let btnNaslov = document.querySelectorAll(".imePrezimeDiv");
    btnNaslov.forEach(btn=>{
        btn.addEventListener("click", function () {
            if(btn.classList[1]==="poslodavac"){
                location.href="../korisnikAdministrator/administrator-prikaz-korisnika.html?username="+username+"&poslodavac="+btn.id;
            }
            else  if(btn.classList[1]==="zadruga"){
                location.href="../korisnikAdministrator/administrator-prikaz-korisnika.html?username="+username+"&zadruga="+btn.id;
            }
            else  if(btn.classList[1]==="zadrugar"){
                location.href="../korisnikAdministrator/administrator-prikaz-korisnika.html?username="+username+"&zadrugar="+btn.id;
            }})
    })
}


//implementacija prikaza broja stranica - pocetak
let straniceDiv = document.querySelector(".straniceDiv");
let stranice = new Stranica(stranica, brojKorisnika, straniceDiv); // let stranice = new Stranica(5, 261, straniceDiv); - za test
stranice.crtajBrojeveStranica();

let brojeviStranica = document.querySelectorAll(".stranicaPolje");
brojeviStranica.forEach(brojStranice => {
    if(brojStranice.value != stranica)
    {
        brojStranice.addEventListener("click", function () {
            url=`./administrator-korisnici.html?username=${username}&zadruga=${zadruga}&poslodavac=${poslodavac}&zadrugar=${zadrugar}&pretraga=${pretraga}&stranica=${brojStranice.value}`;
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
        url=`./administrator-korisnici.html?username=${username}&zadruga=${zadruga}&poslodavac=${poslodavac}&zadrugar=${zadrugar}&pretraga=${pretraga}&stranica=${stranica}`;
        location.href=url;
    })
}

let prethodnaStranica = document.querySelector(".prethodnaPolje");
if(prethodnaStranica!=null)
{
    prethodnaStranica.addEventListener("click", function () {
        stranica--;
        url=`./administrator-korisnici.html?username=${username}&zadruga=${zadruga}&poslodavac=${poslodavac}&zadrugar=${zadrugar}&pretraga=${pretraga}&stranica=${stranica}`;
        location.href=url;
    })
}
//implementacija prikaza broja stranica - kraj



// pribavljanje notifikacija vezanih za datog administratora
let notifikacijeDiv = document.querySelector(".notifikacijeDiv");
let notifikacije = [];
let brNeprocitanih;
let promNotifikacije = await fetch(`http://localhost:5258/Notifikacija/PreuzmiNotifikacijeAdministratorProzorce/${administrator.id}`);
await promNotifikacije.json().then(notifLista=>{
    brNeprocitanih = notifLista.brojNeprocitanih;
    notifLista.neprocitane.forEach(notif => {
        const n = new Notifikacija(notif.id, notif.procitana, notif.administrator, notif.notifikacija, notifikacijeDiv);
        notifikacije.push(n);
    });
    if (brNeprocitanih < 5)
    {
        notifLista.procitane.forEach(notif => {
            const n = new Notifikacija(notif.id, notif.procitana, notif.administrator, notif.notifikacija, notifikacijeDiv);
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
        location.href="./administrator-notifikacije.html?username="+username;
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
            location.href="../korisnikAdministrator/administrator-pregled-notifikacije.html?username="+username+"&notifikacija="+nc.id;
        })
    })
}
omoguciNotifClick();