export class Zadrugar{
    constructor(id, username, password, ime, prezime, slika, email, telefon,
        datumRodjenja, jmbg, srednjaSkola, fakultet, indeks, lbo, brojRacuna, 
        grad, ulica, brojStana, brojUlaza, feedbacks, oglasi, ugovori, notifikacije){
            this.id=id;
            this.username=username;
            this.password=password;
            this.ime=ime;
            this.prezime=prezime;
            this.slika=slika;
            this.email=email;
            this.telefon=telefon;
            this.datumRodjenja=datumRodjenja;
            this.jmbg=jmbg;
            this.srednjaSkola=srednjaSkola;
            this.fakultet=fakultet;
            this.indeks=indeks;
            this.lbo=lbo;
            this.brojRacuna=brojRacuna;
            this.grad=grad;
            this.ulica=ulica;
            this.brojStana=brojStana;
            this.brojUlaza=brojUlaza;
            this.feedbacks=feedbacks;
            this.oglasi=oglasi;
            this.ugovori=ugovori;
            this.notifikacije=notifikacije;
    }

    crtajZadrugara(host){
        let zadrugarDiv = document.createElement("div");
        zadrugarDiv.classList.add("zadrugarDiv");
        host.appendChild(zadrugarDiv);

        //slika + srednjiDiv
        let slikaSrednjiDiv = document.createElement("div");
        slikaSrednjiDiv.classList.add("slikaSrednjiDiv");
        zadrugarDiv.appendChild(slikaSrednjiDiv);

        //slika
        let slikaDiv = document.createElement("div");
        slikaDiv.classList.add("slikaDiv");
        slikaSrednjiDiv.appendChild(slikaDiv);

        let zadrugarSlika = document.createElement("img");
        zadrugarSlika.classList.add("zadrugarSlika");
        zadrugarSlika.src=`../../Slike/brRadnika.png`;
        slikaDiv.appendChild(zadrugarSlika);

        //ime i prezime, grad, godine, ocena
        let srednjiDiv = document.createElement("div");
        srednjiDiv.classList.add("srednjiDiv");
        slikaSrednjiDiv.appendChild(srednjiDiv);

        //ime i prezime
        let imePrezimeDiv = document.createElement("div");
        imePrezimeDiv.classList.add("imePrezimeDiv","zadrugar");
        imePrezimeDiv.id=this.username;
        srednjiDiv.appendChild(imePrezimeDiv);

        let imePrezimeVrednost = document.createElement("label");
        imePrezimeVrednost.classList.add("imePrezimeVrednost");
        imePrezimeVrednost.innerHTML=`Zadrugar: ${this.ime} ${this.prezime}`;
        imePrezimeDiv.appendChild(imePrezimeVrednost);

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
        godineVrednost.innerHTML = `Godine: ${new Date().getFullYear() - new Date(this.datumRodjenja).getFullYear()}`;
        godineDiv.appendChild(godineVrednost);

        //ocena
        let ocenaDiv = document.createElement("div");
        ocenaDiv.classList.add("ocenaDiv");
        srednjiDiv.appendChild(ocenaDiv);

        let ocenaVrednost = document.createElement("label");
        ocenaVrednost.classList.add("ocenaVrednost");
        fetch(`http://localhost:5258/Feedback/VratiProsecnuOcenuZadrugar/${this.id}`)
        .then(p=>p.json().then(prosecnaOcena=>{  
            ocenaVrednost.innerHTML = `Ocena: ${prosecnaOcena}`;
        }));
        ocenaDiv.appendChild(ocenaVrednost);

        //odabran (checkbox)
        let odabranDiv = document.createElement("div");
        odabranDiv.classList.add("odabranDiv");
        zadrugarDiv.appendChild(odabranDiv);

        let odabran = document.createElement("input");
        odabran.classList.add("odabran");
        odabran.type = "checkbox";
        odabran.name="odabran";
        odabran.value = this.id;
        odabranDiv.appendChild(odabran);
    }

    crtajZadrugaraAdmin(host){
        let zadrugarDiv = document.createElement("div");
        zadrugarDiv.classList.add("zadrugarDiv");
        if(this.email==="izbrisan korisnik")
            zadrugarDiv.classList.add("izbrisanKorisnik");
        host.appendChild(zadrugarDiv);

        //slika + srednjiDiv
        let slikaSrednjiDiv = document.createElement("div");
        slikaSrednjiDiv.classList.add("slikaSrednjiDiv");
        zadrugarDiv.appendChild(slikaSrednjiDiv);

        //slika
        let slikaDiv = document.createElement("div");
        slikaDiv.classList.add("slikaDiv");
        slikaSrednjiDiv.appendChild(slikaDiv);

        let zadrugarSlika = document.createElement("img");
        zadrugarSlika.classList.add("zadrugarSlika");
        zadrugarSlika.src=`../../Slike/`+this.slika;
        slikaDiv.appendChild(zadrugarSlika);

        //ime i prezime, grad, godine, ocena
        let srednjiDiv = document.createElement("div");
        srednjiDiv.classList.add("srednjiDiv");
        slikaSrednjiDiv.appendChild(srednjiDiv);

        //ime i prezime
        let imePrezimeDiv = document.createElement("div");
        imePrezimeDiv.classList.add("imePrezimeDiv","zadrugar");
        imePrezimeDiv.id=this.username;
        srednjiDiv.appendChild(imePrezimeDiv);

        let imePrezimeVrednost = document.createElement("label");
        imePrezimeVrednost.classList.add("imePrezimeVrednost");
        imePrezimeVrednost.innerHTML=`Zadrugar: ${this.ime} ${this.prezime}`;
        imePrezimeDiv.appendChild(imePrezimeVrednost);

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
        godineVrednost.innerHTML = `Godine: ${new Date().getFullYear() - new Date(this.datumRodjenja).getFullYear()}`;
        godineDiv.appendChild(godineVrednost);

        //ocena
        let ocenaDiv = document.createElement("div");
        ocenaDiv.classList.add("ocenaDiv");
        srednjiDiv.appendChild(ocenaDiv);

        let ocenaVrednost = document.createElement("label");
        ocenaVrednost.classList.add("ocenaVrednost");
        fetch(`http://localhost:5258/Feedback/VratiProsecnuOcenuZadrugar/${this.id}`)
        .then(p=>p.json().then(prosecnaOcena=>{  
            ocenaVrednost.innerHTML = `Ocena: ${prosecnaOcena}`;
        }));
        ocenaDiv.appendChild(ocenaVrednost);

        //odabran (checkbox)
        let zadrugarDugmadDiv = document.createElement("div");
        zadrugarDugmadDiv.classList.add("zadrugarDugmadDiv");
        zadrugarDiv.appendChild(zadrugarDugmadDiv);

        if(this.email!=="izbrisan korisnik")
        {
            let obrisiZadrugaraBtn = document.createElement("button");
            obrisiZadrugaraBtn.classList.add("obrisiZadrugaraBtn");
            obrisiZadrugaraBtn.classList.add("obrisiKorisnika");
            obrisiZadrugaraBtn.id=this.username;
            obrisiZadrugaraBtn.innerHTML="Obriši korisnika";
            zadrugarDugmadDiv.appendChild(obrisiZadrugaraBtn);
        }
        /*else
        {
            let obrisiZadrugaraBtn = document.createElement("button");
            obrisiZadrugaraBtn.classList.add("obrisanKorisnikBtn");
            obrisiZadrugaraBtn.innerHTML="Obrisan korisnik";
            zadrugarDugmadDiv.appendChild(obrisiZadrugaraBtn);
        }*/
        
        let otvoriZadrugaraBtn = document.createElement("button");
        otvoriZadrugaraBtn.classList.add("otvoriZadrugaraBtn");
        otvoriZadrugaraBtn.classList.add("otvoriKorisnika");
        otvoriZadrugaraBtn.id=this.username;
        otvoriZadrugaraBtn.innerHTML="Prikaži korisnika";
        zadrugarDugmadDiv.appendChild(otvoriZadrugaraBtn);
    }
}