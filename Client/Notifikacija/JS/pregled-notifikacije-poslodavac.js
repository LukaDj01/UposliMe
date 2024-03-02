import { Poslodavac } from "../../Poslodavac/JS/Poslodavac.js";
import { Notifikacija } from "./Notifikacija.js";

const urlString = window.location.search; //uzmi url
const urlParam=new URLSearchParams(urlString); //preuzmi parametre
var username = urlParam.get('username'); //odredjeni parametar  
var notifikacijaId = urlParam.get('notifikacija');//preuzmi notifikaciju id iz url

//povuci podatke iz baze o poslodavcu ciji je username prosledjen kroz url
let poslodavac;
let promPoslodavac = await fetch(`http://localhost:5258/Poslodavac/ValidanUsername/${username}`);
await promPoslodavac.json().then(z=>{
    poslodavac = new Poslodavac(z.id, z.userName, z.password, z.pib, z.maticniBroj, z.slika, z.email, z.fiksniTelefon,
        z.mobilniTelefon, z.naziv, z.delatnost, z.grad, z.ulica, z.brojStana, z.brojUlaza, z.informacije, 
        z.feedbacks, z.oglasi, z.ugovori, z.notifikacije);
})

//ucitavanje notifikacije
let prosledjenOglas; 
let promOglas = await fetch(`http://localhost:5258/Notifikacija/PreuzmiNotifikacijuPoslodavac/${username}/${notifikacijaId}`);
await promOglas.json().then(notif=>{
    prosledjenOglas = new Notifikacija(notif.id, notif.procitana, notif.poslodavac, notif.notifikacija, "oglasiDiv");
}).catch(s=>console.log("Greska kod preuzimanja notifikacije: ", s));


var glavno = document.querySelector(".glavni");

    let forma = document.createElement("div");
    forma.className="Forma";
    glavno.appendChild(forma);

    let forma2 = document.createElement("div");
    forma2.className="Forma2";
    forma.appendChild(forma2);

//div koji sadrzi div za leve i desne labele
    let forma3 = document.createElement("div");
    forma3.className="Forma3";
    forma2.appendChild(forma3);

//div za labelu Opis i za sadrzaj opisa
    let Opis = document.createElement("div");
    Opis.className="Opis";
    forma2.appendChild(Opis);

    let opis = document.createElement("label");
    opis.className="LabeleGore";
    opis.innerHTML="Poruka";
    Opis.appendChild(opis);

    let SadrzajOpisa = document.createElement("label");
    SadrzajOpisa.className="LabeleDole";
    SadrzajOpisa.innerHTML=prosledjenOglas.notifikacija.poruka;
    Opis.appendChild(SadrzajOpisa);

//div za leve labele
    let LeviDiv = document.createElement("div");
    LeviDiv.className="Levo";
    forma3.appendChild(LeviDiv);

//slika
let slikaDiv = document.createElement("div");
slikaDiv.classList.add("slikaDiv");
LeviDiv.appendChild(slikaDiv);

let korisnikSlika = document.createElement("img");
korisnikSlika.classList.add("korisnikSlika");
korisnikSlika.src=`../../Slike/notifikacija2.png`;
slikaDiv.appendChild(korisnikSlika);


//div za desne labele
    let DesniDiv = document.createElement("div");
    DesniDiv.className="Desno";
    forma3.appendChild(DesniDiv);

//datum
let datumDiv = document.createElement("div");
datumDiv.classList.add("datumDiv");
DesniDiv.appendChild(datumDiv);

let datumVrednost = document.createElement("label");
datumVrednost.classList.add("datumVrednost");
let dan = new Date(prosledjenOglas.notifikacija.datum).getDate();
let mesec = new Date(prosledjenOglas.notifikacija.datum).getMonth()+1;
let godina = new Date(prosledjenOglas.notifikacija.datum).getFullYear();
let datum = `${dan}.${mesec}.${godina}.`;
datumVrednost.innerHTML = datum;
datumDiv.appendChild(datumVrednost);