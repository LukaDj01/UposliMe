export class Poslodavac{
    constructor(id, username, password, pib, maticniBroj, slika, email, fiksniTelefon,
        mobilniTelefon, naziv, delatnost, grad, ulica, brojStana, brojUlaza, 
        informacije, feedbacks, oglasi, ugovori, notifikacije){
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
            this.delatnost=delatnost;
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
    
    crtajPoslodavcaAdmin(host){
        let poslodavacDiv = document.createElement("div");
        poslodavacDiv.classList.add("poslodavacDiv");
        if(this.email==="izbrisan korisnik")
            poslodavacDiv.classList.add("izbrisanKorisnik");
        host.appendChild(poslodavacDiv);

        //slika + srednjiDiv
        let slikaSrednjiDiv = document.createElement("div");
        slikaSrednjiDiv.classList.add("slikaSrednjiDiv");
        poslodavacDiv.appendChild(slikaSrednjiDiv);

        //slika
        let slikaDiv = document.createElement("div");
        slikaDiv.classList.add("slikaDiv");
        slikaSrednjiDiv.appendChild(slikaDiv);

        let poslodavacSlika = document.createElement("img");
        poslodavacSlika.classList.add("poslodavacSlika");
        poslodavacSlika.src=`../../Slike/`+this.slika;
        slikaDiv.appendChild(poslodavacSlika);

        //ime i prezime, grad, godine, ocena
        let srednjiDiv = document.createElement("div");
        srednjiDiv.classList.add("srednjiDiv");
        slikaSrednjiDiv.appendChild(srednjiDiv);

        //ime i prezime
        let nazivDiv = document.createElement("div");
        nazivDiv.classList.add("nazivDiv","poslodavac", "imePrezimeDiv");
        nazivDiv.id=this.username;
        srednjiDiv.appendChild(nazivDiv);

        let nazivVrednost = document.createElement("label");
        nazivVrednost.classList.add("imePrezimeVrednost");
        nazivVrednost.innerHTML=`Poslodavac: ${this.naziv}`;
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
        fetch(`http://localhost:5258/Feedback/VratiProsecnuOcenuPoslodavac/${this.id}`)
        .then(p=>p.json().then(prosecnaOcena=>{  
            ocenaVrednost.innerHTML = `Ocena: ${prosecnaOcena}`;
        }));
        ocenaDiv.appendChild(ocenaVrednost);

        //odabran (checkbox)
        let poslodavacDugmadDiv = document.createElement("div");
        poslodavacDugmadDiv.classList.add("poslodavacDugmadDiv");
        poslodavacDiv.appendChild(poslodavacDugmadDiv);

        if(this.email!=="izbrisan korisnik")
        {
            let obrisiPoslodavcaBtn = document.createElement("button");
            obrisiPoslodavcaBtn.classList.add("obrisiPoslodavcaBtn");
            obrisiPoslodavcaBtn.classList.add("obrisiKorisnika");
            obrisiPoslodavcaBtn.id=this.username;
            obrisiPoslodavcaBtn.innerHTML="Obriši korisnika";
            poslodavacDugmadDiv.appendChild(obrisiPoslodavcaBtn);
        }
        
        let otvoriPoslodavcaBtn = document.createElement("button");
        otvoriPoslodavcaBtn.classList.add("otvoriPoslodavcaBtn");
        otvoriPoslodavcaBtn.classList.add("otvoriKorisnika");
        otvoriPoslodavcaBtn.id=this.username;
        otvoriPoslodavcaBtn.innerHTML="Prikaži korisnika";
        poslodavacDugmadDiv.appendChild(otvoriPoslodavcaBtn);
    }

}
