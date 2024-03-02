export class Oglas{
    constructor(id, naziv, opis, brojPotrebnihRadnika, grad, ulica, brojStana, brojUlaza, rokZaPrijavu,
                datumPostavljanja, datumIzvrsavanjaPosla, tip, novac, nacinPlacanja, odobren, odabraniRadnici, napravljenUgovor, aktuelan,  oglasiZadrugari, zadruga, poslodavac){
                    this.id=id;
                    this.naziv=naziv;
                    this.opis=opis;
                    this.brojPotrebnihRadnika=brojPotrebnihRadnika;
                    this.grad=grad;
                    this.ulica=ulica;
                    this.brojStana=brojStana;
                    this.brojUlaza=brojUlaza;
                    this.rokZaPrijavu=rokZaPrijavu;
                    this.datumPostavljanja=datumPostavljanja;
                    this.datumIzvrsavanjaPosla=datumIzvrsavanjaPosla;
                    this.tip=tip;
                    this.novac=novac;
                    this.nacinPlacanja=nacinPlacanja;
                    this.odobren=odobren;
                    this.odabraniRadnici=odabraniRadnici;
                    this.napravljenUgovor=napravljenUgovor,
                    this.aktuelan=aktuelan;
                    this.oglasiZadrugari=oglasiZadrugari;
                    this.zadruga=zadruga;
                    this.poslodavac=poslodavac;
    }

    crtajOglas(host){
        let oglasDiv = document.createElement("div");
        oglasDiv.classList.add("oglasDiv");
        host.appendChild(oglasDiv);

        //naslov, opis
        let naslovOpisDiv = document.createElement("div");
        naslovOpisDiv.classList.add("naslovOpisDiv");
        oglasDiv.appendChild(naslovOpisDiv);

        //naslov --
        let naslovDiv = document.createElement("div");
        naslovDiv.classList.add("naslovDiv");
        naslovOpisDiv.appendChild(naslovDiv);

        let naslovVrednost = document.createElement("label");
        naslovVrednost.classList.add("naslovVrednost");
        naslovVrednost.id=this.id;
        naslovVrednost.innerHTML=this.naziv;
        naslovDiv.appendChild(naslovVrednost);

       //opis
       let opisDiv = document.createElement("div");
       opisDiv.classList.add("opisDiv");
       naslovOpisDiv.appendChild(opisDiv);

       let opisVrednost = document.createElement("label");
       opisVrednost.classList.add("opisVrednost");
       let opis;
       if(this.opis.length>100){
           opis=this.opis.slice(0,90);
           opis=opis+"...";
       }
       else opis=this.opis;
       opisVrednost.innerHTML=opis;
       opisDiv.appendChild(opisVrednost);

        //novac, grad, rok
        let novacGradRokDiv = document.createElement("div");
        novacGradRokDiv.classList.add("novacGradRokDiv");
        oglasDiv.appendChild(novacGradRokDiv);

        //novac
        let novacDiv = document.createElement("div");
        novacDiv.classList.add("novacDiv");
        novacGradRokDiv.appendChild(novacDiv);

        let novacVrednost = document.createElement("label");
        novacVrednost.classList.add("novacVrednost");
        novacVrednost.innerHTML=this.novac;
        novacDiv.appendChild(novacVrednost);

        //grad
        let gradDiv = document.createElement("div");
        gradDiv.classList.add("gradDiv");
        novacGradRokDiv.appendChild(gradDiv);

        let gradVrednost = document.createElement("label");
        gradVrednost.classList.add("gradVrednost");
        gradVrednost.innerHTML=this.grad;
        gradDiv.appendChild(gradVrednost);

        //rok (datum izvrsavanja)
        let rokDiv = document.createElement("div");
        rokDiv.classList.add("rokDiv");
        novacGradRokDiv.appendChild(rokDiv);

        let dan = new Date(this.datumIzvrsavanjaPosla).getDate();
        let mesec = new Date(this.datumIzvrsavanjaPosla).getMonth()+1;
        let godina = new Date(this.datumIzvrsavanjaPosla).getFullYear();
        let datum = `${dan}.${mesec}.${godina}.`;
        let rokVrednost = document.createElement("label");
        rokVrednost.classList.add("rokVrednost");
        rokVrednost.innerHTML=datum;
        rokDiv.appendChild(rokVrednost);

        //broj radnika, dugme apliciraj
        let brRadBtnAplDiv = document.createElement("div");
        brRadBtnAplDiv.classList.add("brRadBtnAplDiv");
        oglasDiv.appendChild(brRadBtnAplDiv);

        //br radnika
        let brRadnikaDiv = document.createElement("div");
        brRadnikaDiv.classList.add("brRadnikaDiv");
        brRadBtnAplDiv.appendChild(brRadnikaDiv);

        //slicica
        let brRadnikaLabela = document.createElement("div");
        brRadnikaLabela.classList.add("brRadnikaLabela");
        brRadnikaDiv.appendChild(brRadnikaLabela);

        let brRadnikaVrednost = document.createElement("label");
        brRadnikaVrednost.classList.add("brRadnikaVrednost");
        brRadnikaVrednost.innerHTML=this.brojPotrebnihRadnika;
        brRadnikaDiv.appendChild(brRadnikaVrednost);

        //dugme apliciraj
        let dugmeAplicirajDiv = document.createElement("div");
        dugmeAplicirajDiv.classList.add("dugmeAplicirajDiv");
        brRadBtnAplDiv.appendChild(dugmeAplicirajDiv);

        let dugmeIzmeni = document.createElement("input");
        dugmeIzmeni.type="button";
        dugmeIzmeni.classList.add("dugmeIzmeni");
        dugmeIzmeni.id=this.id;
        dugmeIzmeni.value="Izmeni";
        dugmeAplicirajDiv.appendChild(dugmeIzmeni);
        
        let dugmeAplicirajVrednost = document.createElement("input");
        dugmeAplicirajVrednost.type="button";
        dugmeAplicirajVrednost.classList.add("dugmeAplicirajVrednost");
        dugmeAplicirajVrednost.id=this.id;
        dugmeAplicirajVrednost.value="Apliciraj";
        dugmeAplicirajDiv.appendChild(dugmeAplicirajVrednost);

    }

    


    crtajPrijavljeniOglas(host){
        let oglasDiv = document.createElement("div");
        oglasDiv.classList.add("oglasDiv");
        host.appendChild(oglasDiv);

        //naslov, opis
        let naslovOpisDiv = document.createElement("div");
        naslovOpisDiv.classList.add("naslovOpisDiv");
        oglasDiv.appendChild(naslovOpisDiv);

        //naslov (naziv)
        let naslovDiv = document.createElement("div");
        naslovDiv.classList.add("naslovDiv");
        naslovOpisDiv.appendChild(naslovDiv);

        let naslovVrednost = document.createElement("label");
        naslovVrednost.classList.add("naslovVrednost");
        naslovVrednost.innerHTML=this.naziv;
        naslovVrednost.id=this.id;
        naslovOpisDiv.appendChild(naslovVrednost);

        //opis
        let opisDiv = document.createElement("div");
        opisDiv.classList.add("opisDiv");
        naslovOpisDiv.appendChild(opisDiv);

        let opisVrednost = document.createElement("label");
        opisVrednost.classList.add("opisVrednost");
        let opis;
        if(this.opis.length>100){
            opis=this.opis.slice(0,100);
        }
        else opis=this.opis;
        opis=opis+"...";
        opisVrednost.innerHTML=opis;
        naslovOpisDiv.appendChild(opisVrednost);

        //novac, grad, rok
        let novacGradRokDiv = document.createElement("div");
        novacGradRokDiv.classList.add("novacGradRokDiv");
        oglasDiv.appendChild(novacGradRokDiv);

        //novac
        let novacDiv = document.createElement("div");
        novacDiv.classList.add("novacDiv");
        novacGradRokDiv.appendChild(novacDiv);

        let novacVrednost = document.createElement("label");
        novacVrednost.classList.add("novacVrednost");
        novacVrednost.innerHTML=this.novac;
        novacGradRokDiv.appendChild(novacVrednost);

        //grad
        let gradDiv = document.createElement("div");
        gradDiv.classList.add("gradDiv");
        novacGradRokDiv.appendChild(gradDiv);

        let gradVrednost = document.createElement("label");
        gradVrednost.classList.add("gradVrednost");
        gradVrednost.innerHTML=this.grad;
        novacGradRokDiv.appendChild(gradVrednost);

        //rok (datum izvrsavanja)
        let rokDiv = document.createElement("div");
        rokDiv.classList.add("rokDiv");
        novacGradRokDiv.appendChild(rokDiv);

        let dan = new Date(this.datumIzvrsavanjaPosla).getDate();
        let mesec = new Date(this.datumIzvrsavanjaPosla).getMonth()+1;
        let godina = new Date(this.datumIzvrsavanjaPosla).getFullYear();
        let datum = `${dan}.${mesec}.${godina}.`;
        let rokVrednost = document.createElement("label");
        rokVrednost.classList.add("rokVrednost");
        rokVrednost.innerHTML=datum;
        novacGradRokDiv.appendChild(rokVrednost);

        //broj radnika, dugme odustani
        let brRadBtnOdustaniDiv = document.createElement("div");
        brRadBtnOdustaniDiv.classList.add("brRadBtnOdustaniDiv");
        oglasDiv.appendChild(brRadBtnOdustaniDiv);

        //br radnika
        let brRadnikaDiv = document.createElement("div");
        brRadnikaDiv.classList.add("brRadnikaDiv");
        brRadBtnOdustaniDiv.appendChild(brRadnikaDiv);

        //slicica
        let brRadnikaLabela = document.createElement("div");
        brRadnikaLabela.classList.add("brRadnikaLabela");
        brRadnikaDiv.appendChild(brRadnikaLabela);

        let brRadnikaVrednost = document.createElement("label");
        brRadnikaVrednost.classList.add("brRadnikaVrednost");
        brRadnikaVrednost.innerHTML=this.brojPotrebnihRadnika;
        brRadnikaDiv.appendChild(brRadnikaVrednost);

        //dugme odustani
        let dugmeOdustaniDiv = document.createElement("div");
        dugmeOdustaniDiv.classList.add("dugmeOdustaniDiv");
        brRadBtnOdustaniDiv.appendChild(dugmeOdustaniDiv);

        let dugmeOdustaniVrednost = document.createElement("input");
        dugmeOdustaniVrednost.type="button";
        dugmeOdustaniVrednost.classList.add("dugmeOdustaniVrednost");
        dugmeOdustaniVrednost.id=this.id;
        dugmeOdustaniVrednost.value="Odustani";
        dugmeOdustaniDiv.appendChild(dugmeOdustaniVrednost);
    }

}