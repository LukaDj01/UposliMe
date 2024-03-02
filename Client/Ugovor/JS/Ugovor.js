export class Ugovor{
  
    constructor(id, opis, datumFormiranja, zadrugar, zadruga, poslodavac, oglas){
                    this.id=id;
                    this.opis=opis;
                    this.datumFormiranja=datumFormiranja;
                    this.zadrugar=zadrugar;
                    this.zadruga=zadruga;
                    this.poslodavac=poslodavac;
                    this.oglas=oglas;
    }

    crtajUgovor(host){
        let ugovorDiv = document.createElement("div");
        ugovorDiv.classList.add("ugovorDiv");
        host.appendChild(ugovorDiv);

        //naslov, opis
        let naslovOpisDiv = document.createElement("div");
        naslovOpisDiv.classList.add("naslovOpisDiv");
        ugovorDiv.appendChild(naslovOpisDiv);

        //naslov 
        let naslov = document.createElement("label");
        naslov.classList.add("naslov");
        naslov.innerHTML=this.oglas.naziv;
        naslov.id=this.id;
        naslovOpisDiv.appendChild(naslov);

    
        //opisDiv
        let opisDiv = document.createElement("div");
        opisDiv.classList.add("opisDiv");
        naslovOpisDiv.appendChild(opisDiv);

        //zadrugar
        let zadrugarDiv = document.createElement("div");
        zadrugarDiv.classList.add("zadrugarDiv");
        opisDiv.appendChild(zadrugarDiv);

        let zadrugarLabel = document.createElement("label");
        zadrugarLabel.classList.add("zadrugarLabel");
        zadrugarLabel.innerHTML="Zadrugar";
        zadrugarDiv.appendChild(zadrugarLabel);

        let zadrugarVrednost = document.createElement("label");
        zadrugarVrednost.classList.add("zadrugarVrednost","zadrugar");
        zadrugarVrednost.innerHTML=this.zadrugar.ime+" "+this.zadrugar.prezime;
        zadrugarVrednost.id=this.zadrugar.userName;
        zadrugarDiv.appendChild(zadrugarVrednost);

        //zadruga
        let zadrugaDiv = document.createElement("div");
        zadrugaDiv.classList.add("zadrugaDiv");
        opisDiv.appendChild(zadrugaDiv);

        let zadrugaLabel = document.createElement("label");
        zadrugaLabel.classList.add("zadrugaLabel");
        zadrugaLabel.innerHTML="Zadruga";
        zadrugaDiv.appendChild(zadrugaLabel);

        let zadrugaVrednost = document.createElement("label");
        zadrugaVrednost.classList.add("zadrugaVrednost","zadruga");
        zadrugaVrednost.innerHTML=this.zadruga.naziv;
        zadrugaVrednost.id=this.zadruga.userName;
        zadrugaDiv.appendChild(zadrugaVrednost);
       
        //poslodavac
        let poslodavacDiv = document.createElement("div");
        poslodavacDiv.classList.add("poslodavacDiv");
        opisDiv.appendChild(poslodavacDiv);

        let poslodavacLabel = document.createElement("label");
        poslodavacLabel.classList.add("poslodavacLabel");
        poslodavacLabel.innerHTML="Poslodavac";
        poslodavacDiv.appendChild(poslodavacLabel);

        let poslodavacVrednost = document.createElement("label");
        poslodavacVrednost.classList.add("poslodavacVrednost","poslodavac");
        poslodavacVrednost.innerHTML=this.poslodavac.naziv;
        poslodavacVrednost.id=this.poslodavac.userName;
        poslodavacDiv.appendChild(poslodavacVrednost);

        //datum kreiranja ugovora
        let datumKreiranjaDiv = document.createElement("div");
        datumKreiranjaDiv.classList.add("datumKreiranjaDiv");
        opisDiv.appendChild(datumKreiranjaDiv);

        let datumKreiranjaLabel = document.createElement("label");
        datumKreiranjaLabel.classList.add("datumKreiranjaLabel");
        datumKreiranjaLabel.innerHTML="Datum kreiranja";
        datumKreiranjaDiv.appendChild(datumKreiranjaLabel);

        let datumKreiranjaVrednost = document.createElement("label");
        datumKreiranjaVrednost.classList.add("datumKreiranjaVrednost");
        datumKreiranjaDiv.appendChild(datumKreiranjaVrednost);

        let dan = new Date(this.datumFormiranja).getDate();
        let mesec = new Date(this.datumFormiranja).getMonth()+1;
        let godina = new Date(this.datumFormiranja).getFullYear();
        let datum = `${dan}.${mesec}.${godina}.`;
        datumKreiranjaVrednost.innerHTML=datum;
    

        //dugmad
        let dugmadDiv = document.createElement("div");
        dugmadDiv.classList.add("dugmadDiv");
        ugovorDiv.appendChild(dugmadDiv);
        
        let dugmeOtvori = document.createElement("input");
        dugmeOtvori.type="button";
        dugmeOtvori.classList.add("dugmeOtvori");
        dugmeOtvori.id=this.id;
        dugmeOtvori.value="Otvori";
        dugmadDiv.appendChild(dugmeOtvori);

        let dugmeObrisi = document.createElement("input");
        dugmeObrisi.type="button";
        dugmeObrisi.classList.add("dugmeObrisi");
        dugmeObrisi.id=this.id;
        dugmeObrisi.value="Obriši";
        dugmadDiv.appendChild(dugmeObrisi);
    }

}