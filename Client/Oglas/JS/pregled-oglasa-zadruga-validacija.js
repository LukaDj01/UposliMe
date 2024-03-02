import { Oglas } from "./Oglas.js";
import { Poslodavac } from "../../Poslodavac/JS/Poslodavac.js";
import { Zadruga } from "../../Zadruga/JS/Zadruga.js";

const urlString = window.location.search; //uzmi url
const urlParam=new URLSearchParams(urlString); //preuzmi parametre
var username = urlParam.get('username'); //odredjeni parametar  
var oglasId=urlParam.get('oglas');//preuzmi oglas id iz url

//povuci podatke iz baze o zadruzi ciji je username prosledjen kroz url
let zadruga;
let promZadruga = await fetch(`http://localhost:5258/Zadruga/ValidanUsername/${username}`);
await promZadruga.json().then(z=>{
        zadruga = new Zadruga(z.id, z.userName, z.password, z.pib, z.maticniBroj, z.slika, z.email, z.fiksniTelefon,
            z.mobilniTelefon, z.naziv, z.brojRacuna, z.grad, z.ulica, z.brojStana, z.brojUlaza, 
            z.informacije,z.feedbacks, z.oglasi, z.ugovori, z.notifikacije);

})

//ucitavanje oglasa
let prosledjenOglas; 
let promOglas = await fetch(`http://localhost:5258/Oglas/PreuzmiOglas/${oglasId}`);
await promOglas.json().then(oglas=>{
    prosledjenOglas = new Oglas(oglas.id, oglas.naziv, oglas.opis, oglas.brojPotrebnihRadnika, oglas.grad, oglas.ulica, oglas.brojStana, oglas.brojUlaza,
                            oglas.rokZaPrijavu, oglas.datumPostavljanja, oglas.datumIzvrsavanjaPosla, oglas.tip, oglas.novac, oglas.nacinPlacanja,
                            oglas.odobren, oglas.odabraniRadnici, oglas.napravljenUgovor,  oglas.aktuelan, oglas.oglasiZadrugari, oglas.zadruga, oglas.poslodavac);
        }).catch(s=>console.log("Greska kod preuzimanja oglasa: ", s));


var glavno = document.querySelector(".glavni");

    let forma = document.createElement("div");
    forma.className="Forma";
    glavno.appendChild(forma);

    let forma2 = document.createElement("div");
    forma2.className="Forma2";
    forma.appendChild(forma2);

//Naslov div
    let Naslov = document.createElement("div");
    Naslov.className="Naslov";
    forma2.appendChild(Naslov);
    Naslov.innerHTML=prosledjenOglas.naziv;

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
    opis.innerHTML="Opis";
    Opis.appendChild(opis);

    let SadrzajOpisa = document.createElement("label");
    SadrzajOpisa.className="LabeleDole";
    SadrzajOpisa.innerHTML=prosledjenOglas.opis;
    Opis.appendChild(SadrzajOpisa);

//div za leve labele
    let LeviDiv = document.createElement("div");
    LeviDiv.className="Levo";
    forma3.appendChild(LeviDiv);


//div za oda bir zadrugara
    let divZadrugari = document.createElement("div");
    divZadrugari.className="divZadrugari";
    forma2.appendChild(divZadrugari);

//div za desne labele
    let DesniDiv = document.createElement("div");
    DesniDiv.className="Desno";
    forma3.appendChild(DesniDiv);

    let divDugme = document.createElement("div");
    divDugme.className="divDugme";
    forma2.appendChild(divDugme);

    let odbijOglas = document.createElement("button");
    odbijOglas.className="Dugme odbijOglas";
    odbijOglas.innerHTML="Odbij oglas";
    divDugme.appendChild(odbijOglas);

    
    let prihvatiOglas = document.createElement("button");
    prihvatiOglas.className="Dugme prihvatiOglas";
    prihvatiOglas.innerHTML="Prihvati oglas";
    divDugme.appendChild(prihvatiOglas);


    let LabeleLevo = ["Zadruga", "Poslodavac", "Adresa", "Tip", "Način plaćanja"];
    let SadrzajLevo = [ prosledjenOglas.zadruga.naziv,prosledjenOglas.poslodavac.naziv , prosledjenOglas.grad+" "+prosledjenOglas.ulica+" "+prosledjenOglas.brojStana+" "+prosledjenOglas.brojUlaza, prosledjenOglas.tip, prosledjenOglas.nacinPlacanja];
    
    let datIzvPosl=new Date(prosledjenOglas.datumIzvrsavanjaPosla);
    let datIzvPoslIVreme=datIzvPosl.getDay()+"."+(datIzvPosl.getMonth()+1)+"."+datIzvPosl.getFullYear()+"." + "   "+datIzvPosl.getHours()+":"+datIzvPosl.getMinutes();

    let datPos=new Date(prosledjenOglas.datumPostavljanja);
    let datPosIVreme=datPos.getDay()+"."+(datPos.getMonth()+1)+"."+datPos.getFullYear()+"." + "   "+datPos.getHours()+":"+datPos.getMinutes();

    let rokZaPr=new Date(prosledjenOglas.rokZaPrijavu);
    let rokZaPrIVreme=rokZaPr.getDay()+"."+(rokZaPr.getMonth()+1)+"."+rokZaPr.getFullYear()+"." + "   "+rokZaPr.getHours()+":"+rokZaPr.getMinutes();

    let LabeleDesno = ["Rok za prijavu", "Datum izvršavanja", "Datum postavljanja", "Broj potrebnih radnika", "Novac"];
    let SadrzajDesno = [rokZaPrIVreme, datIzvPoslIVreme, datPosIVreme, prosledjenOglas.brojPotrebnihRadnika, prosledjenOglas.novac+".00 dinara"];


    for (let i=0; i<LabeleLevo.length; i++)
    {
        let l = document.createElement("label");
        l.className="LabeleGore"
        LeviDiv.appendChild(l);
        l.innerHTML=LabeleLevo[i];

        let p = document.createElement("label");
        p.className="LabeleDole";
        LeviDiv.appendChild(p);
        p.innerHTML=SadrzajLevo[i];

         //dodamo klasu i id da bi mogli da otvorimo profil 
         if(i==1){
            p.classList.add('poslodavac');
            p.id=prosledjenOglas.poslodavac.userName;
        }
    }

    for (let i=0; i<LabeleDesno.length; i++)
    {
        let l = document.createElement("label");
        l.className="LabeleGore"
        DesniDiv.appendChild(l);
        l.innerHTML=LabeleDesno[i];

        let p = document.createElement("label");
        p.className="LabeleDole";
        DesniDiv.appendChild(p);
        p.innerHTML=SadrzajDesno[i];
    }

//funkcija za dugme zavrsi
prihvatiOglas.addEventListener("click", function () {
    fetch(`http://localhost:5258/Oglas/OdobriOglas/${prosledjenOglas.id}`,        
    {
        method: "PUT"
    }).then(p=>
        {
            history.back();
        });
})

//funkcija za dugme obrisi
odbijOglas.addEventListener("click", function () {
    fetch(`http://localhost:5258/Oglas/OdbijOglas/${prosledjenOglas.id}`,            
    {
        method: "PUT"
    }).then(p=>
        {
            history.back();
        });
})

let poslodavacBtn=document.querySelector(".poslodavac");
poslodavacBtn.addEventListener("click",function(){  
    location.href="../korisnikZadruga/zadruga-prikaz-korisnika.html?username="+username+"&poslodavac="+poslodavacBtn.id;
})