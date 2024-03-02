import { Administrator } from "../../Administrator/JS/Administrator.js";
import { Ugovor } from "../../Ugovor/JS/Ugovor.js";
import { Stranica } from "../../Oglas/JS/Stranica.js";
import { Notifikacija } from "../../Notifikacija/JS/Notifikacija.js";

const urlString = window.location.search; //uzmi url
const urlParam=new URLSearchParams(urlString); //preuzmi parametre
var username = urlParam.get('username'); //odredjeni parametar  
let url;


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
                url=`./administrator-ugovori.html?username=${username}&pretraga=${poljePretrazi.value}&stranica=${0}`;
                location.href=url;
            }
            else
            {
                url=`./administrator-ugovori.html?username=${username}&stranica=${0}`;
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
                url=`./administrator-ugovori.html?username=${username}&pretraga=${poljaPretrazi[i].value}&stranica=${0}`;
                location.href=url;
            }
            else
            {
                url=`./administrator-ugovori.html?username=${username}&stranica=${0}`;
                location.href=url;
            }
    })
});

var pretraga = urlParam.get('pretraga');
if(pretraga==null || pretraga == " ")
{   //null
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




//ucitavanje ugovora
let ugovoriDiv = document.querySelector(".ugovoriPrikaz");
let ugovori = [];
let brojOglasa;
let promUgovori = await fetch(`http://localhost:5258/Ugovor/PreuzmiSveUgovoreAdministratorPretragaStranica/${pretraga}/${stranica}`);
await promUgovori.json().then(ugovoriLista=>{
    brojOglasa = ugovoriLista.brojUgovora;
    ugovoriLista.ugovori5.forEach(ugovor => {
        const u = new Ugovor(ugovor.id, ugovor.opis, ugovor.datumFormiranja, ugovor.zadrugar, ugovor.zadruga, ugovor.poslodavac, ugovor.oglas);
        ugovori.push(u);
});
}).catch(s=>console.log("Greska kod preuzimanja ugovora: ", s));

//broj pretrazenih ugovora
let brOglasaLabela = document.querySelector(".brOglasa");
if(brojOglasa%10==1 && brojOglasa%100!=11)
    brOglasaLabela.innerHTML = `[ ${brojOglasa} rezultat ]`;
else
    brOglasaLabela.innerHTML = `[ ${brojOglasa} rezultata ]`;

//funkcija za prikaz ugovora
function prikaziUgovore(niz) {
    brisanjeUgovora();
    if(niz.length!=0)
    {   
        niz.forEach(ugovor => {
            ugovor.crtajUgovor(ugovoriDiv);
        });

        omoguciDugmeOtvori();
        omoguciDugmeObrisi();
        omoguciNaslovKlik();
    }
    else
    {
        let ugovorNijeNadjenDiv = document.createElement("div");
        ugovorNijeNadjenDiv.classList.add("ugovorNijeNadjenDiv");
        ugovoriDiv.appendChild(ugovorNijeNadjenDiv);

        let porukaNijeNadjen = document.createElement("h1");
        porukaNijeNadjen.classList.add("porukaNijeNadjen");
        porukaNijeNadjen.innerHTML="Nije nadjen ni jedan ugovor!";
        ugovorNijeNadjenDiv.appendChild(porukaNijeNadjen);
    }
}
prikaziUgovore(ugovori);



//brisanje ugovora
function brisanjeUgovora() {
    let ugovoriPodaci = document.querySelector(".ugovoriPodaci");
    ugovoriPodaci.removeChild(ugovoriDiv);
    ugovoriDiv = document.createElement("div");
    ugovoriDiv.classList.add("ugovoriPrikaz");
    ugovoriPodaci.appendChild(ugovoriDiv);
}

//dugme "Otvori" funkcionalnost
function omoguciDugmeOtvori() {
    let btnOtvori = document.querySelectorAll(".dugmeOtvori");
    btnOtvori.forEach(btn=>{
        btn.addEventListener("click", function () {
            location.href="../korisnikAdministrator/administrator-ugovor.html?username="+username+"&ugovor="+btn.id;
        })
    })
}


//dugme "Obrisi" funkcionalnost
function omoguciDugmeObrisi() {
    
    let btnObrisi = document.querySelectorAll(".dugmeObrisi");
    btnObrisi.forEach(btn=>{
        btn.addEventListener("click", function () {
            fetch(`http://localhost:5258/Ugovor/ObrisiUgovorAdministrator/${btn.id}`,            //obrisi treba da se napravi
            {
                method: "DELETE"
            }).then(p=>
                {
                    location.reload();
                });
        })
    })
}

//funkcionalnost klika na naslov oglasa
function omoguciNaslovKlik() {
    let btnNaslov = document.querySelectorAll(".naslov");
    btnNaslov.forEach(btn=>{
        btn.addEventListener("click", function () {
            location.href="../korisnikAdministrator/administrator-ugovor.html?username="+username+"&ugovor="+btn.id;
        })
    })
}

let zadrugaBtns=document.querySelectorAll(".zadruga");
zadrugaBtns.forEach(zadrugaBtn=>
        zadrugaBtn.addEventListener("click",function(){  
        location.href="../korisnikAdministrator/administrator-prikaz-korisnika.html?username="+username+"&zadruga="+zadrugaBtn.id;
    })
)


let poslodavacBtns=document.querySelectorAll(".poslodavac");
poslodavacBtns.forEach(poslodavacBtn=>
        poslodavacBtn.addEventListener("click",function(){  
            location.href="../korisnikAdministrator/administrator-prikaz-korisnika.html?username="+username+"&poslodavac="+poslodavacBtn.id;
    })
)

let zadrugarBtns=document.querySelectorAll(".zadrugar");
zadrugarBtns.forEach(zadrugarBtn=>
    zadrugarBtn.addEventListener("click",function(){  
        location.href="../korisnikAdministrator/administrator-prikaz-korisnika.html?username="+username+"&zadrugar="+zadrugarBtn.id;
    })
)


//implementacija prikaza broja stranica - pocetak
let straniceDiv = document.querySelector(".straniceDiv");
let stranice = new Stranica(stranica, brojOglasa, straniceDiv); // let stranice = new Stranica(5, 261, straniceDiv); - za test
stranice.crtajBrojeveStranica();

let brojeviStranica = document.querySelectorAll(".stranicaPolje");
brojeviStranica.forEach(brojStranice => {
    if(brojStranice.value != stranica)
    {
        brojStranice.addEventListener("click", function () {
            url=`./administrator-ugovori.html?username=${username}&pretraga=${pretraga}&stranica=${brojStranice.value}`;
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
        url=`./administrator-ugovori.html?username=${username}&pretraga=${pretraga}&stranica=${stranica}`;
        location.href=url;
    })
}

let prethodnaStranica = document.querySelector(".prethodnaPolje");
if(prethodnaStranica!=null)
{
    prethodnaStranica.addEventListener("click", function () {
        stranica--;
        url=`./administrator-ugovori.html?username=${username}&pretraga=${pretraga}&stranica=${stranica}`;
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