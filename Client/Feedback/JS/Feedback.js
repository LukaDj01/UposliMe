export class Feedback{
    constructor(id, ocena, komentar, zadrugar, zadruga, poslodavac){
                    this.id=id;
                    this.ocena=ocena;
                    this.komentar=komentar;
                    this.zadrugar=zadrugar;
                    this.zadruga=zadruga;
                    this.poslodavac=poslodavac;
    }

    crtajFeedback(host){

        let oceneDiv = document.createElement("div");
        oceneDiv.classList.add("oceneDiv");
        host.appendChild(oceneDiv);

        //gornji div, ocena
        let divOcena = document.createElement("div");
        divOcena.classList.add("divOcena");
        oceneDiv.appendChild(divOcena);

        //Komentar
        let divKomentar = document.createElement("div");
        divKomentar.classList.add("divKomentar");
        divKomentar.innerHTML=this.komentar;
        oceneDiv.appendChild(divKomentar);
        

        let rating = this.ocena;
        //iscrtavanje zvezdica(ocena)
        for(let i=0; i<(Math.round(rating)); i++)
        {
            let zvezdica2 = document.createElement("label");
            zvezdica2.className="fas fa-star";
            zvezdica2.style.color="#4e73df"
            divOcena.appendChild(zvezdica2);
        }
         //iscrtavanje zvezdica(ostatak zvezdica)
        for(let i=0; i<(5-(Math.round(rating))); i++)
        {
            let zvezdica = document.createElement("header");
            zvezdica.className="fas fa-star";
            zvezdica.style.color='silver';
            divOcena.appendChild(zvezdica);
        }

    }
}