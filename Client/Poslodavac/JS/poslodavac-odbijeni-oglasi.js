import { Oglas } from "../../Oglas/JS/Oglas.js";
import { Sortiranje } from "../../Oglas/JS/Sortiranje.js";
import { Poslodavac } from "./Poslodavac.js";
import { Stranica } from "../../Oglas/JS/Stranica.js";
import { Notifikacija } from "../../Notifikacija/JS/Notifikacija.js";

const urlString = window.location.search; //uzmi url
const urlParam=new URLSearchParams(urlString); //preuzmi parametre
var username = urlParam.get('username'); //odredjeni parametar  
let url;


//pretrazivanje oglasa polja za kucanje + enter
let poljaPretrazi = document.querySelectorAll(".poljePretrazi"); // u pitanju su 2 dugmica i 2 polja - prva 2 na uobicajenoj velicini ekrana, a druga 2 na XS velicini
poljaPretrazi.forEach((poljePretrazi)=>{
    poljePretrazi.addEventListener("keypress", async function (event) {
        if(event.key === "Enter")
        {
            event.preventDefault();
            if(poljePretrazi.value.length!==0)
            {
                url=`./poslodavac-odbijeni-oglasi.html?username=${username}&pretraga=${poljePretrazi.value}&sort=${sort}&stranica=${0}`;
                location.href=url;
            }
            else
            {
                url=`./poslodavac-odbijeni-oglasi.html?username=${username}&sort=${sort}&stranica=${0}`;
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
                url=`./poslodavac-odbijeni-oglasi.html?username=${username}&pretraga=${poljaPretrazi[i].value}&sort=${sort}&stranica=${0}`;
                location.href=url;
            }
            else
            {
                url=`./poslodavac-odbijeni-oglasi.html?username=${username}&sort=${sort}&stranica=${0}`;
                location.href=url;
            }
    })
});


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


//naslov-sortiranje
let naslovSortiranjeDiv = document.querySelector(".naslov-sortiranjeDiv");
let sortiranje = new Sortiranje();
sortiranje.crtajSortiranje(naslovSortiranjeDiv);

//odabir sortiranja oglasa
let selekcija = document.querySelector(".selekcija");
selekcija.onchange=()=>selekcijaPromena(selekcija.value);

function selekcijaPromena(vrednost) {
    url=`./poslodavac-odbijeni-oglasi.html?username=${username}&pretraga=${pretraga}&sort=${vrednost}&stranica=${stranica}`;
    location.href=url;
}

//postavljanje default-nih vrednosti ukoliko nista u suprotnom nije izabrano
//postavljanje vrednosti za pretrragu/sortiranje

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

//ucitavanje oglasa
let oglasiDiv = document.querySelector(".oglasiPrikaz");
let oglasi = [];
let brojOglasa;
let promOglasi = await fetch(`http://localhost:5258/Oglas/PreuzmiSveOglasePoslodavacPregledNeodobrenihPretragaSortiranjeStranica/${username}/${pretraga}/${sort}/${stranica}`);
await promOglasi.json().then(oglasiLista=>{
    brojOglasa = oglasiLista.brojOglasa;
    oglasiLista.oglasi5.forEach(oglas => {
        const o = new Oglas(oglas.id, oglas.naziv, oglas.opis, oglas.brojPotrebnihRadnika, oglas.grad, oglas.ulica, oglas.brojStana, oglas.brojUlaza,
                            oglas.rokZaPrijavu, oglas.datumPostavljanja, oglas.datumIzvrsavanjaPosla, oglas.tip, oglas.novac, oglas.nacinPlacanja,
                            oglas.odobren, oglas.odabraniRadnici, oglas.napravljenUgovor,  oglas.aktuelan, oglas.oglasiZadrugari, oglas.zadruga, oglas.poslodavac);
        oglasi.push(o);
    });
}).catch(s=>console.log("Greska kod preuzimanja oglasa: ", s));


//broj pretrazenih oglasa
let brOglasaLabela = document.querySelector(".brOglasa");
if(brojOglasa%10==1 && brojOglasa%100!=11)
    brOglasaLabela.innerHTML = `[ ${brojOglasa} rezultat ]`;
else
    brOglasaLabela.innerHTML = `[ ${brojOglasa} rezultata ]`;
            
//funkcija za prikaz oglasa
function prikaziOglase(niz) {
    brisanjeOglasa();
    if(niz.length!=0)
    {
        niz.forEach(oglas => {
            oglas.crtajOglas(oglasiDiv);
        });

        //zameni klasu dugmeAplicirajVrednost u obrisiOglas
        let obrisiOglas = document.querySelectorAll(".dugmeAplicirajVrednost");
        obrisiOglas.forEach(dugme => {
            dugme.classList.replace("dugmeAplicirajVrednost","obrisiOglas");
            dugme.value="Obriši oglas";
        })
        omoguciDugmeIzmeni();
        omoguciDugmeObrisi();
        omoguciNaslovKlik();
    }
    else
    {
        let oglasNijeNadjenDiv = document.createElement("div");
        oglasNijeNadjenDiv.classList.add("oglasNijeNadjenDiv");
        oglasiDiv.appendChild(oglasNijeNadjenDiv);

        let porukaNijeNadjen = document.createElement("h1");
        porukaNijeNadjen.classList.add("porukaNijeNadjen");
        porukaNijeNadjen.innerHTML="Nije nadjen ni jedan oglas!";
        oglasNijeNadjenDiv.appendChild(porukaNijeNadjen);
    }
}
prikaziOglase(oglasi);



//brisanje oglasa
function brisanjeOglasa() {
    let oglasiPodaci = document.querySelector(".oglasiPodaci");
    oglasiPodaci.removeChild(oglasiDiv);
    oglasiDiv = document.createElement("div");
    oglasiDiv.classList.add("oglasiPrikaz");
    oglasiPodaci.appendChild(oglasiDiv);
}

//dugme "Obrisi" funkcionalnost
function omoguciDugmeObrisi() {
    
    let obrisiOglas = document.querySelectorAll(".obrisiOglas");
    obrisiOglas.forEach(btn=>{
        btn.addEventListener("click", function () {
            fetch(`http://localhost:5258/Oglas/ObrisiOglasPoslodavac/${btn.id}/${poslodavac.id}`,            
            {
                method: "DELETE"
            }).then(p=>
                {
                    location.reload();
                });
        })
    })
}

//dugme "Izmeni" funkcionalnost
function omoguciDugmeIzmeni() {
    let btnIzmeni = document.querySelectorAll(".dugmeIzmeni");
    btnIzmeni.forEach(btn=>{
        btn.addEventListener("click", function () {
            location.href="../korisnikPoslodavac/poslodavac-izmeni-oglas.html?username="+username+"&oglas="+btn.id;
        })
    })
}

//funkcionalnost klika na naslov oglasa
function omoguciNaslovKlik() {
    let btnNaslov = document.querySelectorAll(".naslovVrednost");
    btnNaslov.forEach(btn=>{
        btn.addEventListener("click", function () {
            location.href="../korisnikPoslodavac/poslodavac-pregled-oglasa-odbijen.html?username="+username+"&oglas="+btn.id;
        })
    })
}

//implementacija prikaza broja stranica - pocetak
let straniceDiv = document.querySelector(".straniceDiv");
let stranice = new Stranica(stranica, brojOglasa, straniceDiv); // let stranice = new Stranica(5, 261, straniceDiv); - za test
stranice.crtajBrojeveStranica();

let brojeviStranica = document.querySelectorAll(".stranicaPolje");
brojeviStranica.forEach(brojStranice => {
    if(brojStranice.value != stranica)
    {
        brojStranice.addEventListener("click", function () {
            url=`./poslodavac-odbijeni-oglasi.html?username=${username}&pretraga=${pretraga}&sort=${sort}&stranica=${brojStranice.value}`;
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
        url=`./poslodavac-odbijeni-oglasi.html?username=${username}&pretraga=${pretraga}&sort=${sort}&stranica=${stranica}`;
        location.href=url;
    })
}

let prethodnaStranica = document.querySelector(".prethodnaPolje");
if(prethodnaStranica!=null)
{
    prethodnaStranica.addEventListener("click", function () {
        stranica--;
        url=`./poslodavac-odbijeni-oglasi.html?username=${username}&pretraga=${pretraga}&sort=${sort}&stranica=${stranica}`;
        location.href=url;
    })
}
//implementacija prikaza broja stranica - kraj


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