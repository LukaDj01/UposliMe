export class Sortiranje{
    constructor(){

    }

    crtajSortiranje(host){

        let sortiranjeDiv = document.createElement("div");
        sortiranjeDiv.classList.add("sortiranjeDiv");
        host.appendChild(sortiranjeDiv);

        let selekcija = document.createElement("select");
        selekcija.classList.add("selekcija");
        sortiranjeDiv.appendChild(selekcija);

        let sortiranje = document.createElement("option");
        sortiranje.classList.add("sortiranje");
        sortiranje.innerHTML="Sortiranje";
        selekcija.appendChild(sortiranje);

        let najnovije = document.createElement("option");
        najnovije.classList.add("najnovije");
        najnovije.innerHTML="Najnovije";
        selekcija.appendChild(najnovije);

        let nazivAZ = document.createElement("option");
        nazivAZ.classList.add("nazivAZ");
        nazivAZ.innerHTML="Naziv A-Z";
        selekcija.appendChild(nazivAZ);

        let nazivZA = document.createElement("option");
        nazivZA.classList.add("nazivZA");
        nazivZA.innerHTML="Naziv Z-A";
        selekcija.appendChild(nazivZA);

        let novacRastuce = document.createElement("option");
        novacRastuce.classList.add("novacRastuce");
        novacRastuce.innerHTML="Novac ↑";
        selekcija.appendChild(novacRastuce);

        let novacOpadajuce = document.createElement("option");
        novacOpadajuce.classList.add("novacOpadajuce");
        novacOpadajuce.innerHTML="Novac ↓";
        selekcija.appendChild(novacOpadajuce);

    }
}