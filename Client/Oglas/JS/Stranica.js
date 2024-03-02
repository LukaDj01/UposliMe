export class Stranica{
    constructor(trenutna, ukupanBrOglasa, host){
        this.trenutna=trenutna;
        this.ukupanBrOglasa=ukupanBrOglasa;
        this.brOglasaPoStranici = 5;
        this.ukupanBrojStranica = (this.ukupanBrOglasa % this.brOglasaPoStranici == 0) ?
                                 (this.ukupanBrOglasa / this.brOglasaPoStranici) : (Math.trunc(this.ukupanBrOglasa / this.brOglasaPoStranici + 1));
        this.host = host;
    }

    crtajBrojeveStranica(){
        if(this.ukupanBrOglasa==0 || this.ukupanBrojStranica==1)
        {

        }
        else if(this.trenutna==0)
            this.pocetak();
        else if (this.trenutna==this.ukupanBrojStranica-1)
            this.kraj();
        else if (this.trenutna<5)
            this.sredinaPocetak();
        else if (this.trenutna>=this.ukupanBrojStranica-5)
            this.sredinaKraj();
        else
            this.sredina();
    }

    pocetak(){
        //console.log("pocetak");
        if(this.ukupanBrojStranica<=5)
        {
            for (let i = 0; i < this.ukupanBrojStranica; i++) {
                let div = document.createElement("div");
                div.value = i;
                div.classList.add("stranicaPolje");
                if(i==this.trenutna)
                    div.style.backgroundColor="#4e73df";
                this.host.appendChild(div);
                
                let stranicaVrednost = document.createElement("label");
                stranicaVrednost.classList.add("stranicaVrednost");
                stranicaVrednost.innerHTML = `${i+1}`;
                div.appendChild(stranicaVrednost);
            }
        }
        else
        {
            for (let i = 0; i < 4; i++) {
                let div = document.createElement("div");
                div.value = i;
                div.classList.add("stranicaPolje");
                if(i==this.trenutna)
                    div.style.backgroundColor="#4e73df";
                this.host.appendChild(div);
                
                let stranicaVrednost = document.createElement("label");
                stranicaVrednost.classList.add("stranicaVrednost");
                stranicaVrednost.innerHTML = `${i+1}`;
                div.appendChild(stranicaVrednost);
            }

            this.crtajTriTacke();

            this.crtajZadnjuStranicu();
        }

        this.crtajDugmeSledeca();
    }

    kraj(){
        //console.log("kraj");
        this.crtajDugmePrethodna();
        
        if(this.ukupanBrojStranica<=5)
        {
            for (let i = 0; i < this.ukupanBrojStranica; i++) {
                let div = document.createElement("div");
                div.value = i;
                div.classList.add("stranicaPolje");
                if(i==this.trenutna)
                    div.style.backgroundColor="#4e73df";
                this.host.appendChild(div);
                
                let stranicaVrednost = document.createElement("label");
                stranicaVrednost.classList.add("stranicaVrednost");
                stranicaVrednost.innerHTML = `${i+1}`;
                div.appendChild(stranicaVrednost);
            }
        }
        else
        {
            this.crtajPrvuStranicu();
            
            this.crtajTriTacke();

            for (let i = this.ukupanBrojStranica-4; i < this.ukupanBrojStranica; i++) {
                let div = document.createElement("div");
                div.value = i;
                div.classList.add("stranicaPolje");
                if(i==this.trenutna)
                    div.style.backgroundColor="#4e73df";
                this.host.appendChild(div);
                
                let stranicaVrednost = document.createElement("label");
                stranicaVrednost.classList.add("stranicaVrednost");
                stranicaVrednost.innerHTML = `${i+1}`;
                div.appendChild(stranicaVrednost);
            }
        }
    }

    sredinaPocetak(){
        //console.log("sredinaPocetak");
        this.crtajDugmePrethodna();

        if(this.ukupanBrojStranica-this.trenutna<=4)
        {
            for (let i = 0; i < this.ukupanBrojStranica; i++) {
                let div = document.createElement("div");
                div.value = i;
                div.classList.add("stranicaPolje");
                if(i==this.trenutna)
                    div.style.backgroundColor="#4e73df";
                this.host.appendChild(div);
                
                let stranicaVrednost = document.createElement("label");
                stranicaVrednost.classList.add("stranicaVrednost");
                stranicaVrednost.innerHTML = `${i+1}`;
                div.appendChild(stranicaVrednost);
            }
        }
        else
        {
            for (let i = 0; i <=  this.trenutna; i++) {
                let div = document.createElement("div");
                div.value = i;
                div.classList.add("stranicaPolje");
                if(i==this.trenutna)
                    div.style.backgroundColor="#4e73df";
                this.host.appendChild(div);
                
                let stranicaVrednost = document.createElement("label");
                stranicaVrednost.classList.add("stranicaVrednost");
                stranicaVrednost.innerHTML = `${i+1}`;
                div.appendChild(stranicaVrednost);
            }
            for (let i =  parseInt(this.trenutna)+1; i < parseInt(this.trenutna) + 4; i++) {    //mislim da treba da radimo sa  parseInt(this.trenutna)
                let div = document.createElement("div");
                div.value = i;
                div.classList.add("stranicaPolje");
                if(i==this.trenutna)
                    div.style.backgroundColor="#4e73df";
                this.host.appendChild(div);
                
                let pom = parseInt(i);
                pom+=1;

                let stranicaVrednost = document.createElement("label");
                stranicaVrednost.classList.add("stranicaVrednost");
                stranicaVrednost.innerHTML = pom;
                div.appendChild(stranicaVrednost);
            }

            this.crtajTriTacke();

            this.crtajZadnjuStranicu();
        }

        this.crtajDugmeSledeca();
    }

    sredinaKraj(){
        //console.log("sredinaKraj");
        this.crtajDugmePrethodna();

        this.crtajPrvuStranicu();

        this.crtajTriTacke();

        if(this.trenutna<=4)
        {
            for (let i = 0; i < this.ukupanBrojStranica; i++) {
                let div = document.createElement("div");
                div.value = i;
                div.classList.add("stranicaPolje");
                if(i==this.trenutna)
                    div.style.backgroundColor="#4e73df";
                this.host.appendChild(div);
                
                let stranicaVrednost = document.createElement("label");
                stranicaVrednost.classList.add("stranicaVrednost");
                stranicaVrednost.innerHTML = `${i+1}`;
                div.appendChild(stranicaVrednost);
            }
        }
        else
        {
            for (let i = parseInt(this.trenutna) - 3; i <= this.trenutna; i++) {
                let div = document.createElement("div");
                div.value = i;
                div.classList.add("stranicaPolje");
                if(i==this.trenutna)
                    div.style.backgroundColor="#4e73df";
                this.host.appendChild(div);
                
                let stranicaVrednost = document.createElement("label");
                stranicaVrednost.classList.add("stranicaVrednost");
                stranicaVrednost.innerHTML = `${i+1}`;
                div.appendChild(stranicaVrednost);
            }
            for (let i = parseInt(this.trenutna) + 1; i < this.ukupanBrojStranica; i++) {
                let div = document.createElement("div");
                div.value = i;
                div.classList.add("stranicaPolje");
                if(i==this.trenutna)
                    div.style.backgroundColor="#4e73df";
                this.host.appendChild(div);
                
                let stranicaVrednost = document.createElement("label");
                stranicaVrednost.classList.add("stranicaVrednost");
                stranicaVrednost.innerHTML = `${i+1}`;
                div.appendChild(stranicaVrednost);
            }
        }

        this.crtajDugmeSledeca();
    }

    sredina(){
        //console.log("sredina");
        this.crtajDugmePrethodna();

        this.crtajPrvuStranicu();

        this.crtajTriTacke();
        
        for (let i = parseInt(this.trenutna) - 3; i <= parseInt(this.trenutna) + 3; i++) {
            let div = document.createElement("div");
            div.value = i;
            div.classList.add("stranicaPolje");
            if(i==this.trenutna)
                div.style.backgroundColor="#4e73df";
            this.host.appendChild(div);
            
            let stranicaVrednost = document.createElement("label");
            stranicaVrednost.classList.add("stranicaVrednost");
            stranicaVrednost.innerHTML = `${i+1}`;
            div.appendChild(stranicaVrednost);
        }
        
        this.crtajTriTacke();

        this.crtajZadnjuStranicu();

        this.crtajDugmeSledeca();
    }

    crtajDugmePrethodna(){
        let div = document.createElement("div");
        div.value = this.trenutna - 1;
        div.classList.add("prethodnaPolje");
        this.host.appendChild(div);
                
        let prethodnaVrednost = document.createElement("label");
        prethodnaVrednost.classList.add("prethodnaVrednost");
        prethodnaVrednost.innerHTML = `ᐊ`; // ←
        div.appendChild(prethodnaVrednost);
    }

    crtajDugmeSledeca(){
        let div = document.createElement("div");
        div.value = this.trenutna + 1;
        div.classList.add("sledecaPolje");
        this.host.appendChild(div);
                
        let sledecaVrednost = document.createElement("label");
        sledecaVrednost.classList.add("sledecaVrednost");
        sledecaVrednost.innerHTML = `ᐅ`; // →
        div.appendChild(sledecaVrednost);
    }

    crtajTriTacke(){
        let triTackePolje = document.createElement("div");
        triTackePolje.classList.add("triTackePolje");
        this.host.appendChild(triTackePolje);
        
        let triTackeVrednost = document.createElement("label");
        triTackeVrednost.classList.add("triTackeVrednost");
        triTackeVrednost.innerHTML = `. . .`;
        triTackePolje.appendChild(triTackeVrednost);
    }

    crtajZadnjuStranicu(){
        let zadnjaStranicaPolje = document.createElement("div");
        zadnjaStranicaPolje.value = this.ukupanBrojStranica - 1;
        zadnjaStranicaPolje.classList.add("stranicaPolje");
        this.host.appendChild(zadnjaStranicaPolje);
        
        let zadnjaStranicaVrednost = document.createElement("label");
        zadnjaStranicaVrednost.classList.add("stranicaVrednost");
        zadnjaStranicaVrednost.innerHTML = `${this.ukupanBrojStranica}`;
        zadnjaStranicaPolje.appendChild(zadnjaStranicaVrednost);
    }
    
    crtajPrvuStranicu(){
        let prvaStranicaPolje = document.createElement("div");
        prvaStranicaPolje.value = 0;
        prvaStranicaPolje.classList.add("stranicaPolje");
        this.host.appendChild(prvaStranicaPolje);
        
        let prvaStranicaVrednost = document.createElement("label");
        prvaStranicaVrednost.classList.add("stranicaVrednost");
        prvaStranicaVrednost.innerHTML = 1;
        prvaStranicaPolje.appendChild(prvaStranicaVrednost);
    }
}
