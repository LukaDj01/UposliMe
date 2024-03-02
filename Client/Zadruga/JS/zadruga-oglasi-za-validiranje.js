import { Oglas } from "../../Oglas/JS/Oglas.js";
import { Sortiranje } from "../../Oglas/JS/Sortiranje.js";
import { Zadruga } from "../../Zadruga/JS/Zadruga.js";
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
                url=`./zadruga-oglasi-za-validiranje.html?username=${username}&pretraga=${poljePretrazi.value}&sort=${sort}&stranica=${0}`;
                location.href=url;
            }
            else
            {
                url=`./zadruga-oglasi-za-validiranje.html?username=${username}&sort=${sort}&stranica=${0}`;
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
                url=`./zadruga-oglasi-za-validiranje.html?username=${username}&pretraga=${poljaPretrazi[i].value}&sort=${sort}&stranica=${0}`;
                location.href=url;
            }
            else
            {
                url=`./zadruga-oglasi-za-validiranje.html?username=${username}&sort=${sort}&stranica=${0}`;
                location.href=url;
            }
    })
});


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


//hvatamo zadrugu da bi ispisali username, postavili profilnu
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


//naslov-sortiranje
let naslovSortiranjeDiv = document.querySelector(".naslov-sortiranjeDiv");
let sortiranje = new Sortiranje();
sortiranje.crtajSortiranje(naslovSortiranjeDiv);

//odabir sortiranja oglasa
let selekcija = document.querySelector(".selekcija");
selekcija.onchange=()=>selekcijaPromena(selekcija.value);

function selekcijaPromena(vrednost) {
    url=`./zadruga-oglasi-za-validiranje.html?username=${username}&pretraga=${pretraga}&sort=${vrednost}&stranica=${stranica}`;
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
let promOglasi = await fetch(`http://localhost:5258/Oglas/PreuzmiSveOglaseZadrugaOdobravanjePretragaSortiranjeStranica/${username}/${pretraga}/${sort}/${stranica}`);
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

        //zameni klasu dugmeAplicirajVrednost u dugmeOtkaziValidaciju
        let dugmeOdbijOglas = document.querySelectorAll(".dugmeAplicirajVrednost");
        dugmeOdbijOglas.forEach(dugme => {
            dugme.classList.replace("dugmeAplicirajVrednost","odbijOglas");
            dugme.value="Odbij oglas";
        })

          //zameni klasu dugmeAplicirajVrednost u dugmeOtkaziValidaciju
          let dugmePrihvatiOglas = document.querySelectorAll(".dugmeIzmeni");
          dugmePrihvatiOglas.forEach(dugme => {
              dugme.classList.replace("dugmeIzmeni","prihvatiOglas");
              dugme.value="Prihvati oglas";
          })

        
        omoguciDugmePrihvatiOglas();
        omoguciDugmeOdbijOglas();
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

function fja(btn){
    let popap= document.querySelector(".popup");
    popap.classList.add("show");

    let razlog= document.querySelector(".razlog");
    let unesiRazlog= document.querySelector(".unesiRazlog");
    
    let otkaziOdbijanje= document.querySelector(".otkaziOdbijanje");
    otkaziOdbijanje.addEventListener("click", function () {
        popap.classList.remove("show");
        unesiRazlog.style.display="none";
        razlog.value="";
    });
    window.addEventListener("click", function (event) {
        if (event.target == popap) {
            popap.classList.remove("show");
            unesiRazlog.style.display="none";
            razlog.value="";
        }
    });

    let potvrdiOdbijanje= document.querySelector(".potvrdiOdbijanje");
    potvrdiOdbijanje.addEventListener("click", async function () {
        if(razlog.value=="" || razlog.value==null){
            unesiRazlog.style.display="block";
        }
        else{
            fetch(`http://localhost:5258/Oglas/OdbijOglas/${btn}`,            
            {
                method: "PUT"
            }).then(p=>
                {   
                    let odbijeniOglas = oglasi.find(p=>p.id == btn);    
                    let poruka = `Zadruga "${zadruga.naziv}" Vam je odbila oglas pod nazivom "${odbijeniOglas.naziv}". Razlog: ${razlog.value}`;
                    fetch(`http://localhost:5258/Notifikacija/DodajNotifikacijuZaPoslodavca/${poruka}/${odbijeniOglas.poslodavac.id}`,            
                    {
                        method: "POST"
                    }).then(p=>{
                        if(p.ok){
                            razlog.value="";
                            popap.classList.remove("show");
                            unesiRazlog.style.display="none";
                            location.reload();
                        }
                    });
                    
                });
        }
    });
};

//dugme "odbij oglas" funkcionalnost
function omoguciDugmeOdbijOglas() {
    let dugmeOdbijOglas = document.querySelectorAll(".odbijOglas");
    dugmeOdbijOglas.forEach(btn=>{
        btn.addEventListener("click", async function () {
            fja(btn.id);
        })
    })
}

//dugme "prihvati oglas" funkcionalnost
function omoguciDugmePrihvatiOglas() {
    let dugmePrihvatiOglas = document.querySelectorAll(".prihvatiOglas");
    dugmePrihvatiOglas.forEach(btn=>{
        btn.addEventListener("click", function () {
            fetch(`http://localhost:5258/Oglas/OdobriOglas/${btn.id}`,           
            {
                method: "PUT"
            }).then(p=>
                {
                    let prihvaceniOglas = oglasi.find(p=>p.id == btn.id);    
                    let poruka = `Zadruga "${zadruga.naziv}" Vam je odobrila oglas pod nazivom "${prihvaceniOglas.naziv}".`;
                    fetch(`http://localhost:5258/Notifikacija/DodajNotifikacijuZaPoslodavca/${poruka}/${prihvaceniOglas.poslodavac.id}`,            
                    {
                        method: "POST"
                    }).then(p=>{
                        if(p.ok){
                           
                            location.reload();
                        }
                    });
                });
        })
    })
}

//funkcionalnost klika na naslov oglasa
function omoguciNaslovKlik() {
    let btnNaslov = document.querySelectorAll(".naslovVrednost");
    btnNaslov.forEach(btn=>{
        btn.addEventListener("click", function () {
            location.href="../korisnikZadruga/zadruga-pregled-oglasa-validacija.html?username="+username+"&oglas="+btn.id;
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
            url=`./zadruga-oglasi-za-validiranje.html?username=${username}&pretraga=${pretraga}&sort=${sort}&stranica=${brojStranice.value}`;
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
        url=`./zadruga-oglasi-za-validiranje.html?username=${username}&pretraga=${pretraga}&sort=${sort}&stranica=${stranica}`;
        location.href=url;
    })
}

let prethodnaStranica = document.querySelector(".prethodnaPolje");
if(prethodnaStranica!=null)
{
    prethodnaStranica.addEventListener("click", function () {
        stranica--;
        url=`./zadruga-oglasi-za-validiranje.html?username=${username}&pretraga=${pretraga}&sort=${sort}&stranica=${stranica}`;
        location.href=url;
    })
}
//implementacija prikaza broja stranica - kraj


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