export class Notifikacija{
    constructor(id, procitana, korisnik, notifikacija, host){
                    this.id=id;
                    this.procitana=procitana;
                    this.korisnik=korisnik;
                    this.notifikacija=notifikacija;
                    this.host=host;
                    
    }

    crtajNotifikaciju(){
        let notifDiv = document.createElement("div");
        notifDiv.classList.add("notifDiv", "notifClick");
        notifDiv.id = this.id;
        if(this.procitana==false)
            notifDiv.classList.add("neprocitanaOznaka");
        this.host.appendChild(notifDiv);

        //slika + srednjiDiv
        let slikaSrednjiDiv = document.createElement("div");
        slikaSrednjiDiv.classList.add("slikaSrednjiDiv");
        notifDiv.appendChild(slikaSrednjiDiv);

        //slika
        let slikaDiv = document.createElement("div");
        slikaDiv.classList.add("slikaDiv");
        slikaSrednjiDiv.appendChild(slikaDiv);

        let korisnikSlika = document.createElement("img");
        korisnikSlika.classList.add("korisnikSlika");
        korisnikSlika.src=`../../Slike/notifikacija2.png`;
        slikaDiv.appendChild(korisnikSlika);

        //datum, poruka
        let srednjiDiv = document.createElement("div");
        srednjiDiv.classList.add("srednjiDiv");
        slikaSrednjiDiv.appendChild(srednjiDiv);

        //datum
        let datumDiv = document.createElement("div");
        datumDiv.classList.add("datumDiv");
        srednjiDiv.appendChild(datumDiv);

        let datumVrednost = document.createElement("label");
        datumVrednost.classList.add("datumVrednost");
        let dan = new Date(this.notifikacija.datum).getDate();
        let mesec = new Date(this.notifikacija.datum).getMonth()+1;
        let godina = new Date(this.notifikacija.datum).getFullYear();
        let datum = `${dan}.${mesec}.${godina}.`;
        datumVrednost.innerHTML = datum;
        datumDiv.appendChild(datumVrednost);

        //poruka
        let porukaDiv = document.createElement("div");
        porukaDiv.classList.add("porukaDiv");
        srednjiDiv.appendChild(porukaDiv);

        let porukaVrednost = document.createElement("label");
        porukaVrednost.classList.add("porukaVrednost");
        let poruka;
        if(this.notifikacija.poruka.length>100){
            poruka = this.notifikacija.poruka.slice(0,90);
            poruka = poruka + "...";
        }
        else poruka = this.notifikacija.poruka;
        porukaVrednost.innerHTML=poruka;
        porukaDiv.appendChild(porukaVrednost);

        /*//neprocitana oznaka
        let neprocitanaDiv = document.createElement("div");
        neprocitanaDiv.classList.add("neprocitanaDiv");
        notifDiv.appendChild(neprocitanaDiv);

        let neprocitana = document.createElement("label");
        neprocitana.classList.add("neprocitana");
        neprocitana.value = this.id;
        if(this.procitana==false)
            neprocitana.innerHTML="●";
        neprocitanaDiv.appendChild(neprocitana);*/
    }

    crtajNotifikacijuProzorce(){
        let a = document.createElement("a");
        a.className="notifikacija dropdown-item d-flex align-items-center";
        a.id = this.id;
        if (this.procitana==false)
            a.classList.add("neprocitana");
        let d1 = document.createElement("div");
        d1.className="mr-3";
        a.appendChild(d1);
        let d11 = document.createElement("div");
        d11.className="icon-circle bg-primary";
        d1.appendChild(d11);
        let d12 = document.createElement("div");
        d11.appendChild(d12);
        let i = document.createElement("img");
        i.src=`../../Slike/notifikacija2.png`; // slika :(
        i.style.width="50px"; // i.classList.add("slikaNotifikacija");
        i.style.height="50px";
        d12.appendChild(i);
        let d2 = document.createElement("div");
        a.appendChild(d2);
        let d21 = document.createElement("div");
        d21.className="small text-gray-500";
        let dan = new Date(this.notifikacija.datum).getDate();
        let mesec = new Date(this.notifikacija.datum).getMonth()+1;
        let godina = new Date(this.notifikacija.datum).getFullYear();
        let datum = `${dan}.${mesec}.${godina}.`;
        d21.innerHTML = datum;
        d2.appendChild(d21);
        let span = document.createElement("span");
        span.className ="font-weight-bold";
        let poruka;
        if(this.notifikacija.poruka.length>35){
            poruka = this.notifikacija.poruka.slice(0,25);
            poruka = poruka + "...";
        }
        else poruka = this.notifikacija.poruka;
        span.innerHTML = poruka;
        d2.appendChild(span);
        this.host.appendChild(a);
    }
}