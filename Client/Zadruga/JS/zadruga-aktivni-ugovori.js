
import { Ugovor } from "../../Ugovor/JS/Ugovor.js";
import { Stranica } from "../../Oglas/JS/Stranica.js";
import { Zadruga } from "./Zadruga.js";
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
                url=`./zadruga-aktivni-ugovori.html?username=${username}&pretraga=${poljePretrazi.value}&stranica=${0}`;
                location.href=url;
            }
            else
            {
                url=`./zadruga-aktivni-ugovori.html?username=${username}&stranica=${0}`;
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
                url=`./zadruga-aktivni-ugovori.html?username=${username}&pretraga=${poljaPretrazi[i].value}&stranica=${0}`;
                location.href=url;
            }
            else
            {
                url=`./zadruga-aktivni-ugovori.html?username=${username}&stranica=${0}`;
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





//ucitavanje ugovora
let ugovoriDiv = document.querySelector(".ugovoriPrikaz");
let ugovori = [];
let brojOglasa;
let promUgovori = await fetch(`http://localhost:5258/Ugovor/PreuzmiSveUgovoreZadrugaPretragaStranica/${username}/${pretraga}/${stranica}`);
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
        
        let dugmeObrisi=document.querySelectorAll(".dugmeObrisi");
        dugmeObrisi.forEach(d=>{
            d.style.display="none";
        })

        let divZaDugme=document.querySelectorAll(".dugmadDiv");
        divZaDugme.forEach(d=>{
            d.style.justifyContent="end";
        })
        

        omoguciDugmeOtvori();
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
            location.href="../korisnikZadruga/zadruga-aktivni-ugovor.html?username="+username+"&ugovor="+btn.id;
        })
    })
}


//dugme "Obrisi" funkcionalnost
/*function omoguciDugmeObrisi() {
    
    let btnObrisi = document.querySelectorAll(".dugmeObrisi");
    btnObrisi.forEach(btn=>{
        btn.addEventListener("click", function () {
            fetch(`http://localhost:5258/Ugovor/ObrisiUgovorPoslodavac/${poslodavac.id}/${btn.id}`,            //obrisi treba da se napravi
            {
                method: "DELETE"
            }).then(p=>
                {
                    location.reload();
                });
        })
    })
}*/

//funkcionalnost klika na naslov oglasa
function omoguciNaslovKlik() {
    let btnNaslov = document.querySelectorAll(".naslov");
    btnNaslov.forEach(btn=>{
        btn.addEventListener("click", function () {
            location.href="../korisnikZadruga/zadruga-aktivni-ugovor.html?username="+username+"&ugovor="+btn.id;
        })
    })
}

let zadrugaBtns=document.querySelectorAll(".zadruga");
zadrugaBtns.forEach(zadrugaBtn=>
        zadrugaBtn.addEventListener("click",function(){  
        location.href="../korisnikZadruga/zadruga-profil-podaci.html?username="+username;
    })
)


let poslodavacBtns=document.querySelectorAll(".poslodavac");
poslodavacBtns.forEach(poslodavacBtn=>
        poslodavacBtn.addEventListener("click",function(){  
            location.href="../korisnikZadruga/zadruga-prikaz-korisnika.html?username="+username+"&poslodavac="+poslodavacBtn.id;
    })
)

let zadrugarBtns=document.querySelectorAll(".zadrugar");
zadrugarBtns.forEach(zadrugarBtn=>
    zadrugarBtn.addEventListener("click",function(){  
        location.href="../korisnikZadruga/zadruga-prikaz-korisnika.html?username="+username+"&zadrugar="+zadrugarBtn.id;
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
            url=`./zadruga-aktivni-ugovori.html?username=${username}&pretraga=${pretraga}&stranica=${brojStranice.value}`;
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
        url=`./zadruga-aktivni-ugovori.html?username=${username}&pretraga=${pretraga}&stranica=${stranica}`;
        location.href=url;
    })
}

let prethodnaStranica = document.querySelector(".prethodnaPolje");
if(prethodnaStranica!=null)
{
    prethodnaStranica.addEventListener("click", function () {
        stranica--;
        url=`./zadruga-aktivni-ugovori.html?username=${username}&pretraga=${pretraga}&stranica=${stranica}`;
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