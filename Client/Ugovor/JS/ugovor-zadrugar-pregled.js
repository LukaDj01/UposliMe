import { Poslodavac } from "../../Poslodavac/JS/Poslodavac.js";
import { Ugovor } from "./Ugovor.js";
import { Zadrugar } from "../../Zadrugar/JS/Zadrugar.js";
import { Zadruga } from "../../Zadruga/JS/Zadruga.js";
import { Oglas } from "../../Oglas/JS/Oglas.js";

const urlString = window.location.search; //uzmi url
const urlParam=new URLSearchParams(urlString); //preuzmi parametre
var username = urlParam.get('username'); //odredjeni parametar  
var ugovorIzURL = urlParam.get('ugovor'); //odredjeni parametar  
let url;

let ugovor;
let promUgovor = await fetch(`http://localhost:5258/Ugovor/PreuzmiUgovor/${ugovorIzURL}`);
await promUgovor.json().then(u=>{
        ugovor = new Ugovor(u.id, u.opis, u.datumFormiranja, u.zadrugar, u.zadruga, u.poslodavac, u.oglas);   
});
  
  var glavno = document.querySelector(".zaIzcrtavanje");
    let forma = document.createElement("div");
    forma.className="Forma";
    glavno.appendChild(forma);

//Naslov div
    let Naslov = document.createElement("div");
    Naslov.className="Naslov";
    forma.appendChild(Naslov);
    Naslov.innerHTML="Ugovor Zadruge";

    let Div1 = document.createElement("label");
    Div1.className="Labele";
    forma.appendChild(Div1);
    Div1.innerHTML="Na oslovu člana 198. Zakona o radu (Sl. glasnik RS, br. 24/2005, 61/2005, 54/2009, 32/2013, 75/2014 i 13/17), Zakona o zadrugama (Sl. glasnik SRS, broj 57/89 i Sl. gaslniku RS, br. 46/95, br. 101/2005 i br. 112/2015)";

    let Div2 = document.createElement("label");
    Div2.className="Labele";
    forma.appendChild(Div2);
    Div2.id=ugovor.poslodavac.userName;
    Div2.innerHTML="POSLODAVAC: ";

    let Div2b=document.createElement("a");
    Div2b.classList.add("poslodavac");
    Div2.appendChild(Div2b);
    Div2b.innerText= ugovor.poslodavac.naziv;
    Div2b.id=ugovor.poslodavac.userName;

    let Div3 = document.createElement("label");
    Div3.className="Labele";
    forma.appendChild(Div3);
    Div3.innerHTML="ZADRUGA: ";

    let Div3b=document.createElement("a");
    Div3b.classList.add("zadruga");
    Div3.appendChild(Div3b);
    Div3b.innerText= ugovor.zadruga.naziv;
    Div3b.id=ugovor.zadruga.userName;

    let Div4 = document.createElement("label");
    Div4.className="Labele";
    forma.appendChild(Div4);
    Div4.id=ugovor.zadrugar.userName;
    Div4.innerHTML="ZADRUGAR: ";

    let Div4b=document.createElement("a");
    Div4b.classList.add("zadrugar");
    Div4.appendChild(Div4b);
    Div4b.innerText= ugovor.zadrugar.ime+" "+ugovor.zadrugar.prezime;
    Div4b.id=ugovor.zadrugar.userName;

    let Div5 = document.createElement("label");
    Div5.className="Labele";
    forma.appendChild(Div5);
    let dan = new Date(ugovor.datumFormiranja).getDate();
    let mesec = new Date(ugovor.datumFormiranja).getMonth()+1;
    let godina = new Date(ugovor.datumFormiranja).getFullYear();
    let datum = `${dan}.${mesec}.${godina}.`;
    Div5.innerHTML= "Datum: "+datum+" godine u Nišu, zaključili su sledeći:";

    let Div6 = document.createElement("label");
    Div6.className="Naslov2";
    forma.appendChild(Div6);
    Div6.innerHTML="UGOVOR O OBAVLJANJU PRIVREMENIH I POVREMENIH POSLOVA";

    let Div7 = document.createElement("label");
    Div7.className="Clan";
    forma.appendChild(Div7);
    Div7.innerHTML="Član 1.";

    let Div8 = document.createElement("label");
    Div8.className="Labele";
    forma.appendChild(Div8);
    Div8.innerHTML="Na osnovu ovog Ugovora Zadruga upućuje Zadrugara na rad kod Poslodavca, radi obavljanja pomoćnih poslova u privrednom društvu " + ugovor.poslodavac.naziv+ " van radnog odnosa. "+
    "Zadrugar poslove iz stava 1. ovog člana obavlja pod neposrednim rukovodstvom, uputstvima i nadzorom Poslodavca, a u slučaju drugačije potrebe, Poslodavac i Zadruga će zaključiti poseban ugovor.";

    let Div9 = document.createElement("label");
    Div9.className="Clan";
    forma.appendChild(Div9);
    Div9.innerHTML="Član 2.";

    let Div10 = document.createElement("label");
    Div10.className="Labele";
    forma.appendChild(Div10);
    let danIzvr = new Date(ugovor.oglas.datumIzvrsavanjaPosla).getDate();
    let mesecIzvr  = new Date(ugovor.oglas.datumIzvrsavanjaPosla).getMonth()+1;
    let godinaIzvr  = new Date(ugovor.oglas.datumIzvrsavanjaPosla).getFullYear();
    let datumIzvr  = `${danIzvr}.${mesecIzvr}.${godinaIzvr}.`;
    Div10.innerHTML="Zadrugar će poslove iz člana 1. ovog ugovora obavljati u periodu od "+datumIzvr+" godine do završetka posla ili prestanka potrebe za radnikom na poslovima iz člana 1. ovog ugovora, ali najduže u trajanju od 120 radnih dana od dana stupanja na rad. "+
    "Zadrugar je dužan da stupi na rad dana "+datumIzvr+" godine.";

    let Div11 = document.createElement("label");
    Div11.className="Clan";
    forma.appendChild(Div11);
    Div11.innerHTML="Član 3.";

    let Div12 = document.createElement("label");
    Div12.className="Labele";
    forma.appendChild(Div12);
    Div12.innerHTML="Poslove iz člana 1. ovog ugovora zadrugar će obavljati na adresi: "+ugovor.oglas.grad+" "+ ugovor.oglas.ulica+" "+ ugovor.oglas.brojStana+" "+ ugovor.oglas.brojUlaza;

    let Div13 = document.createElement("label");
    Div13.className="Clan";
    forma.appendChild(Div13);
    Div13.innerHTML="Član 4.";

    let Div14 = document.createElement("label");
    Div14.className="Labele";
    forma.appendChild(Div14);
    Div14.innerHTML="Poslove iz člana 1. ovog ugovora Zadrugar će obavljati maksimalno u trajanju od 8 časova dnevno, 5 dana nedeljno.";

    let Div15 = document.createElement("label");
    Div15.className="Clan";
    forma.appendChild(Div15);
    Div15.innerHTML="Član 5.";

    let Div16 = document.createElement("label");
    Div16.className="Labele";
    forma.appendChild(Div16);
    Div16.innerHTML="Zadrugar ima pravo na pauzu u toku rada od 30 minuta. Zadrugar ima pravo na dnevni i nedeljni odmor u skladu sa Zakonom, odnosno opštim aktom Poslodavca.";

    let Div17 = document.createElement("label");
    Div17.className="Clan";
    forma.appendChild(Div17);
    Div17.innerHTML="Član 6.";

    let Div18 = document.createElement("label");
    Div18.className="Labele";
    forma.appendChild(Div18);
    Div18.innerHTML="Za obavljanje poslova iz člana 1. ovog ugovora Zadrugar ima pravo na neto naknadu za rad u visini od "+ugovor.oglas.novac+ " dinara "+  ugovor.oglas.nacinPlacanja+".";

    let Div19 = document.createElement("label");
    Div19.className="Clan";
    forma.appendChild(Div19);
    Div19.innerHTML="Član 7.";

    let Div20 = document.createElement("label");
    Div20.className="Labele";
    forma.appendChild(Div20);
    Div20.innerHTML="Zadruga se obavezuje da Poslodavcu po obavljenom poslu Zadrugara, izda fakturu, sa specifikacijom u kojoj će navesti: datume kada je Zadrugar radio sa brojem časova, ukupan broj časova rada i ukupan iznos naknade."+
    "Poslodavac se obavezuje da ukupnu naknadu za rad Zadrugaru uplati na račun Zadruge "+ ugovor.zadruga.brojRacuna+" koji se vodi kod UniCredit Banke, u roku od 15 dana od dana fakturisanja.";

    let Div21 = document.createElement("label");
    Div21.className="Clan";
    forma.appendChild(Div21);
    Div21.innerHTML="Član 8.";

    let Div22 = document.createElement("label");
    Div22.className="Labele";
    forma.appendChild(Div22);
    Div22.innerHTML="Zadruga se obavezuje da u roku od 3 radna dana od dana uplate iz člana 7. ovog ugovora na račun Zadrugara "+ugovor.zadrugar.brojRacuna+" koji se vodi kod Komercijalne Banke, uplati neto naknadu za rad Zadrugara i plati pripadajući porez i doprinos za obavezno socijalno osiguranje u skladu sa zakonom.";

    let Div23 = document.createElement("label");
    Div23.className="Clan";
    forma.appendChild(Div23);
    Div23.innerHTML="Član 9.";

    let Div24 = document.createElement("label");
    Div24.className="Labele";
    forma.appendChild(Div24);
    Div24.innerHTML="Poslodavac se obavezuje da dnevno vodi radnu listu za Zadrugara. Radna lista sadrži poslove koje zadrugar obavlja i časove rada.";

    let Div25 = document.createElement("label");
    Div25.className="Clan";
    forma.appendChild(Div25);
    Div25.innerHTML="Član 10.";

    let Div26 = document.createElement("label");
    Div26.className="Labele";
    forma.appendChild(Div26);
    Div26.innerHTML="Poslodavac ne sme da zahteva od Zadrugara da obavlja poslove na kojima postoji opasnost od povredivanja, profesionalnih i drugih oboljenja, odnosno poslova koji mogu da utiču na zdravlje i život Zadrugara. "+
    "Poslodavac je dužan da Zadrugaru obezbedi zaštitu na radu, na isti način kao i za ostale zaposlene. Zadrugar je dužan da se pridržava zaštitnih mera i da se služi zaštitnom opremom.";

    let Div27 = document.createElement("label");
    Div27.className="Clan";
    forma.appendChild(Div27);
    Div27.innerHTML="Član 11.";

    let Div28 = document.createElement("label");
    Div28.className="Labele";
    forma.appendChild(Div28);
    Div28.innerHTML="U slučaju povrede na radu, Zadrugar ostvaruje odgovarajuća prava ili naknade po osnovu penzijsko-invalidskog osiguranja, (po osnovu polise osiguranja, na osnovu ugovora sa poslodavcem ili po osnovu osiguranja i zaštite obezbeđene na drugi način).";

    let Div29 = document.createElement("label");
    Div29.className="Clan";
    forma.appendChild(Div29);
    Div29.innerHTML="Član 12.";

    let Div30 = document.createElement("label");
    Div30.className="Labele";
    forma.appendChild(Div30);
    Div30.innerHTML="Zadrugar je dužan da poštuje radnu disciplinu i izvršava radne naloge Poslodavca. Zadruga je dužna da Poslodavcu nadoknadi štetu koju mu Zadrugar prouzrokuje namerno ili iz krajnje nepažnje.";

    let Div31 = document.createElement("label");
    Div31.className="Clan";
    forma.appendChild(Div31);
    Div31.innerHTML="Član 13.";

    let Div32 = document.createElement("label");
    Div32.className="Labele";
    forma.appendChild(Div32);
    Div32.innerHTML="Na sve što nije predvideno ovim ugovorom primenjuju se odredbe Zakona o radu, Zakona o zadrugama i Opštih pravila omladinskog i studentskog zadrugarstva."+
    " U slučaju spora po ovom ugovoru koji se ne može rešiti dogovorom ugovornih strana, ugovorena je nadležnost Privrednog suda u Nišu.";

    let Div33 = document.createElement("label");
    Div33.className="Clan";
    forma.appendChild(Div33);
    Div33.innerHTML="Član 14.";

    let Div34 = document.createElement("label");
    Div34.className="Labele";
    forma.appendChild(Div34);
    Div34.innerHTML="Ovaj ugovor sačinjen je u 3 istovetnih primeraka, od kojih svaka ugovorna strana zadržava po 1 primeraka.";

    let Dole = document.createElement("div");
    Dole.className="Dole";
    forma.appendChild(Dole);

    let Dole1 = document.createElement("div");
    Dole1.className="Dole1";
    Dole.appendChild(Dole1);

    let labelaZadruga = document.createElement("label");
    labelaZadruga.className="LabeleDole";
    labelaZadruga.innerHTML="ZADRUGA";
    Dole1.appendChild(labelaZadruga);

    let labelaZadruga2 = document.createElement("label");
    labelaZadruga2.className="LabeleDole";
    labelaZadruga2.innerHTML="__________________";
    Dole1.appendChild(labelaZadruga2);

    let Dole2 = document.createElement("div");
    Dole2.className="Dole2";
    Dole.appendChild(Dole2);

    let labelaZadrugar = document.createElement("label");
    labelaZadrugar.className="LabeleDole";
    labelaZadrugar.innerHTML="ZADRUGAR";
    Dole2.appendChild(labelaZadrugar);

    let labelaZadrugar2 = document.createElement("label");
    labelaZadrugar2.className="LabeleDole";
    labelaZadrugar2.innerHTML="__________________";
    Dole2.appendChild(labelaZadrugar2);

    let Dole3 = document.createElement("div");
    Dole3.className="Dole3";
    Dole.appendChild(Dole3);

    let labelaPoslodavac = document.createElement("label");
    labelaPoslodavac.className="LabeleDole";
    labelaPoslodavac.innerHTML="POSLODAVAC";
    Dole3.appendChild(labelaPoslodavac);

    let labelaPoslodavac2 = document.createElement("label");
    labelaPoslodavac2.className="LabeleDole";
    labelaPoslodavac2.innerHTML="__________________";
    Dole3.appendChild(labelaPoslodavac2);


    
let zadrugaBtn=document.querySelector(".zadruga");
zadrugaBtn.addEventListener("click",function(){  
location.href="../korisnikZadrugar/zadrugar-prikaz-korisnika.html?username="+username+"&zadruga="+zadrugaBtn.id+"&oglas="+ugovor.oglas.id; // za sad visak &oglas=...
})

let zadrugarBtn=document.querySelector(".zadrugar");
zadrugarBtn.addEventListener("click",function(){  
        location.href="./zadrugar-profil-podaci.html?username="+username;
})

let poslodavacBtn=document.querySelector(".poslodavac");
poslodavacBtn.addEventListener("click",function(){  
        location.href="../korisnikZadrugar/zadrugar-prikaz-korisnika.html?username="+username+"&poslodavac="+poslodavacBtn.id+"&oglas="+ugovor.oglas.id; // za sad visak &oglas=...
})

/*fetch("http://localhost:5258/Poslodavac/ValidanUsername/"+username)        // da li je korisnik poslodavac
.then( p=> {
        if(p.status===200){
                let zadrugaBtn=document.querySelector(".zadruga");
                zadrugaBtn.addEventListener("click",function(){  
                location.href="../korisnikPoslodavac/poslodavac-prikaz-korisnika.html?username="+username+"&zadruga="+zadrugaBtn.id+"&oglas="+ugovor.oglas.id;
                })

                let poslodavacBtn=document.querySelector(".poslodavac");
                poslodavacBtn.addEventListener("click",function(){  
                        location.href="./poslodavac-profil-podaci.html?username="+username;
                })

                let zadrugarBtn=document.querySelector(".zadrugar");
                zadrugarBtn.addEventListener("click",function(){  
                        location.href="../korisnikPoslodavac/poslodavac-prikaz-korisnika.html?username="+username+"&zadrugar="+zadrugarBtn.id+"&oglas="+ugovor.oglas.id;
                })
        }
});

fetch("http://localhost:5258/Zadrugar/ValidanUsername/"+username)        // da li je korisnik zadrugar
.then( p=> {
        if(p.status===200){
                let zadrugaBtn=document.querySelector(".zadruga");
                zadrugaBtn.addEventListener("click",function(){  
                location.href="../korisnikZadrugar/zadrugar-prikaz-korisnika.html?username="+username+"&zadruga="+zadrugaBtn.id+"&oglas="+ugovor.oglas.id;
                })

                let zadrugarBtn=document.querySelector(".zadrugar");
                zadrugarBtn.addEventListener("click",function(){  
                        location.href="./zadrugar-profil-podaci.html?username="+username;
                })

                let poslodavacBtn=document.querySelector(".poslodavac");
                poslodavacBtn.addEventListener("click",function(){  
                        location.href="../korisnikZadrugar/zadrugar-prikaz-korisnika.html?username="+username+"&poslodavac="+poslodavacBtn.id+"&oglas="+ugovor.oglas.id;
                })
        }
});

fetch("http://localhost:5258/Zadruga/ValidanUsername/"+username)        // da li je korisnik zadruga
.then( p=> {
        if(p.status===200){
                let poslodavacBtn=document.querySelector(".poslodavac");
                poslodavacBtn.addEventListener("click",function(){  
                        location.href="../korisnikZadruga/zadruga-prikaz-korisnika.html?username="+username+"&poslodavac="+poslodavacBtn.id+"&oglas="+ugovor.oglas.id;
                })

                let zadrugaBtn=document.querySelector(".zadruga");
                zadrugaBtn.addEventListener("click",function(){  
                        location.href="./zadruga-profil-podaci.html?username="+username;
                })

                let zadrugarBtn=document.querySelector(".zadrugar");
                zadrugarBtn.addEventListener("click",function(){  
                        location.href="../korisnikZadruga/zadruga-prikaz-korisnika.html?username="+username+"&zadrugar="+zadrugarBtn.id+"&oglas="+ugovor.oglas.id;
                })
        }
});*/
