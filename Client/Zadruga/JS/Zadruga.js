export class Zadruga{
    constructor(id, username, password, pib, maticniBroj, slika, email, fiksniTelefon,
        mobilniTelefon, naziv, brojRacuna, 
        grad, ulica, brojStana, brojUlaza, informacije,feedbacks, oglasi, ugovori, notifikacije){
            this.id=id;
            this.username=username;
            this.password=password;
            this.pib=pib;
            this.maticniBroj=maticniBroj;
            this.slika=slika;
            this.email=email;
            this.fiksniTelefon=fiksniTelefon;
            this.mobilniTelefon=mobilniTelefon;
            this.naziv=naziv;
            this.brojRacuna=brojRacuna;
            this.grad=grad;
            this.ulica=ulica;
            this.brojStana=brojStana;
            this.brojUlaza=brojUlaza;
            this.informacije=informacije;
            this.feedbacks=feedbacks;
            this.oglasi=oglasi;
            this.ugovori=ugovori;
            this.notifikacije=notifikacije;
    }

    crtajZadruguAdmin(host){
        let zadrugaDiv = document.createElement("div");
        zadrugaDiv.classList.add("zadrugaDiv");
        if(this.email==="izbrisan korisnik")
            zadrugaDiv.classList.add("izbrisanKorisnik");
        host.appendChild(zadrugaDiv);

        //slika + srednjiDiv
        let slikaSrednjiDiv = document.createElement("div");
        slikaSrednjiDiv.classList.add("slikaSrednjiDiv");
        zadrugaDiv.appendChild(slikaSrednjiDiv);

        //slika
        let slikaDiv = document.createElement("div");
        slikaDiv.classList.add("slikaDiv");
        slikaSrednjiDiv.appendChild(slikaDiv);

        let zadrugaSlika = document.createElement("img");
        zadrugaSlika.classList.add("zadrugaSlika");
        zadrugaSlika.src=`../../Slike/`+this.slika;
        slikaDiv.appendChild(zadrugaSlika);

        //ime i prezime, grad, godine, ocena
        let srednjiDiv = document.createElement("div");
        srednjiDiv.classList.add("srednjiDiv");
        slikaSrednjiDiv.appendChild(srednjiDiv);

        //ime i prezime
        let nazivDiv = document.createElement("div");
        nazivDiv.classList.add("nazivDiv","zadruga","imePrezimeDiv");
        nazivDiv.id=this.username;
        srednjiDiv.appendChild(nazivDiv);

        let nazivVrednost = document.createElement("label");
        nazivVrednost.classList.add("imePrezimeVrednost");
        nazivVrednost.innerHTML=`Zadruga: ${this.naziv}`;
        nazivDiv.appendChild(nazivVrednost);

        //grad, godine
        let zGradGodineDiv = document.createElement("div");
        zGradGodineDiv.classList.add("zGradGodineDiv");
        srednjiDiv.appendChild(zGradGodineDiv);

        //grad
        let zGradDiv = document.createElement("div");
        zGradDiv.classList.add("zGradDiv");
        zGradGodineDiv.appendChild(zGradDiv);

        let zGradVrednost = document.createElement("label");
        zGradVrednost.classList.add("zGradVrednost");
        zGradVrednost.innerHTML=`Grad: ${this.grad}`;
        zGradDiv.appendChild(zGradVrednost);

        //godine
        let godineDiv = document.createElement("div");
        godineDiv.classList.add("godineDiv");
        zGradGodineDiv.appendChild(godineDiv);

        let godineVrednost = document.createElement("label");
        godineVrednost.classList.add("godineVrednost");
        godineVrednost.innerHTML = `Kontakt: ${this.mobilniTelefon}`;
        godineDiv.appendChild(godineVrednost);

        //ocena
        let ocenaDiv = document.createElement("div");
        ocenaDiv.classList.add("ocenaDiv");
        srednjiDiv.appendChild(ocenaDiv);

        let ocenaVrednost = document.createElement("label");
        ocenaVrednost.classList.add("ocenaVrednost");
        fetch(`http://localhost:5258/Feedback/VratiProsecnuOcenuZadruga/${this.id}`)
        .then(p=>p.json().then(prosecnaOcena=>{  
            ocenaVrednost.innerHTML = `Ocena: ${prosecnaOcena}`;
        }));
        ocenaDiv.appendChild(ocenaVrednost);

        //odabran (checkbox)
        let zadrugaDugmadDiv = document.createElement("div");
        zadrugaDugmadDiv.classList.add("zadrugaDugmadDiv");
        zadrugaDiv.appendChild(zadrugaDugmadDiv);

        if(this.email!=="izbrisan korisnik")
        {
            let obrisiZadruguBtn = document.createElement("button");
            obrisiZadruguBtn.classList.add("obrisiZadruguBtn");
            obrisiZadruguBtn.classList.add("obrisiKorisnika");
            obrisiZadruguBtn.id=this.username;
            obrisiZadruguBtn.innerHTML="Obriši korisnika";
            zadrugaDugmadDiv.appendChild(obrisiZadruguBtn);
        }
        
        let otvoriZadruguBtn = document.createElement("button");
        otvoriZadruguBtn.classList.add("otvoriZadruguBtn");
        otvoriZadruguBtn.classList.add("otvoriKorisnika");
        otvoriZadruguBtn.id=this.username;
        otvoriZadruguBtn.innerHTML="Prikaži korisnika";
        zadrugaDugmadDiv.appendChild(otvoriZadruguBtn);
    }

}