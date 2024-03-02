namespace UposliMe.Controllers;

[ApiController]
[Route("[controller]")]
public class PoslodavacController : ControllerBase
{
    public UposliMeContext Context { get; set; }

    public PoslodavacController(UposliMeContext context)
    {
        Context = context;
    }

    [Route("DodajPoslodavca")]
    [HttpPost]
    public async Task<ActionResult> DodajPoslodavca([FromBody] Poslodavac poslodavac){
        if(string.IsNullOrWhiteSpace(poslodavac.UserName) || poslodavac.UserName.Length>20){
            return BadRequest("Lose unet username!");
        }
        if(string.IsNullOrWhiteSpace(poslodavac.Password) || poslodavac.Password.Length>20){
            return BadRequest("Lose unet password!");
        }
        if(poslodavac.Slika.Length>300){
            return BadRequest("Lose uneta slika!");
        }
        if(string.IsNullOrWhiteSpace(poslodavac.Email) || poslodavac.Email.Length>100){
            return BadRequest("Lose unet email!");
        }
        if(string.IsNullOrWhiteSpace(poslodavac.MobilniTelefon) || poslodavac.MobilniTelefon.Length>20 || poslodavac.MobilniTelefon.Length<8){
            return BadRequest("Lose unet mobilni telefon!");
        }
        if(string.IsNullOrWhiteSpace(poslodavac.FiksniTelefon) || poslodavac.FiksniTelefon.Length>20 || poslodavac.FiksniTelefon.Length<6){
            return BadRequest("Lose unet fiksni telefon!");
        }
        if(string.IsNullOrWhiteSpace(poslodavac.MaticniBroj) || poslodavac.MaticniBroj.Length>8 || poslodavac.MaticniBroj.Length<8){
            return BadRequest("Lose unet maticni broj!");
        }
        if(string.IsNullOrWhiteSpace(poslodavac.PIB) || poslodavac.PIB.Length>9 || poslodavac.PIB.Length<9){
            return BadRequest("Lose unet PIB!");
        }
        if(string.IsNullOrWhiteSpace(poslodavac.Naziv) || poslodavac.Naziv.Length>50){
            return BadRequest("Lose unet naziv!");
        }
        if(string.IsNullOrWhiteSpace(poslodavac.Grad) || poslodavac.Grad.Length>20){
            return BadRequest("Lose unet grad!");
        }
        if(string.IsNullOrWhiteSpace(poslodavac.Ulica) || poslodavac.Ulica.Length>50){
            return BadRequest("Lose uneta ulica!");
        }
        if(poslodavac.BrojStana.Length>3){
            return BadRequest("Lose unet broj stana!");
        }
        if(poslodavac.BrojUlaza.Length>3){
            return BadRequest("Lose unet broj ulaza!");
        }
        if( poslodavac.Informacije.Length>10000){
            return BadRequest("Lose unete informacije!");
        }
        if(string.IsNullOrWhiteSpace(poslodavac.Delatnost) || poslodavac.Delatnost.Length>50){
            return BadRequest("Lose uneta delatnost!");
        }

        try
        {   
            //proverimo jel postoji zadrugar sa tim usernameom
            var zadrugarPom = Context.Zadrugari.Where( p=> p.UserName==poslodavac.UserName ).FirstOrDefault();
            if(zadrugarPom!=null){
                return BadRequest($"Username: {poslodavac.UserName} je zauzet!");
            }

            //proverimo jel postoji zadruga sa tim usernameom
            var zadrugaPom = Context.Zadruge.Where( p=> p.UserName==poslodavac.UserName ).FirstOrDefault();
            if(zadrugaPom!=null){
                return BadRequest($"Username: {poslodavac.UserName} je zauzet!");
            }

            //proverimo jel postoji poslodavac sa tim usernameom
            var poslodavacPom = Context.Poslodavci.Where( p=> p.UserName==poslodavac.UserName ).FirstOrDefault();
            if(poslodavacPom!=null){
                return BadRequest($"Username: {poslodavac.UserName} je zauzet!");
            }

            //proverimo jel postoji administrator sa tim usernameom
            var administratorPom = Context.Administratori.Where( p=> p.UserName==poslodavac.UserName ).FirstOrDefault();
            if(administratorPom!=null){
                return BadRequest($"Username: {poslodavac.UserName} je zauzet!");
            }

            //proverimo jel postoji zadrugar sa tom email adresom
            zadrugarPom = Context.Zadrugari.Where( p=> p.Email==poslodavac.Email ).FirstOrDefault();
            if(zadrugarPom!=null){
                return BadRequest($"Email: {poslodavac.Email} je zauzet!");
            }

            //proverimo jel postoji zadruga sa tom email adresom
            zadrugaPom = Context.Zadruge.Where( p=> p.Email==poslodavac.Email ).FirstOrDefault();
            if(zadrugaPom!=null){
                return BadRequest($"Email: {poslodavac.Email} je zauzet!");
            }

            //proverimo jel postoji poslodavac sa tom email adresom
            poslodavacPom = Context.Poslodavci.Where( p=> p.Email==poslodavac.Email ).FirstOrDefault();
            if(poslodavacPom!=null){
                return BadRequest($"Email: {poslodavac.Email} je zauzet!");
            }

            Context.Poslodavci.Add(poslodavac);
            

            await Context.SaveChangesAsync();
            return Ok($"Uspesno dodat poslodavac sa id={poslodavac.ID}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("PreuzmiPoslodavcaUsernameIPassword/{korisnickoIme}/{lozinka}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiPoslodavcaUsernameIPassword(string korisnickoIme, string lozinka){

        var poslodavac = await Context.Poslodavci.Where( p => p.UserName==korisnickoIme && p.Password==lozinka).FirstOrDefaultAsync();

        if(poslodavac!=null)
            return Ok(poslodavac);
        else
            return NoContent();
    }

    [Route("PreuzmiPoslodavcaEmail/{email}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiPoslodavcaEmail(string email){

        var poslodavac = await Context.Poslodavci.Where( p => p.Email==email).FirstOrDefaultAsync();

            if(poslodavac!=null)
                return Ok(poslodavac);    //vraca kod 200
            else
                return NoContent(); //vraca 204 kod
    }

    [Route("ValidanUsername/{username}")]
    [HttpGet]
    public async Task<ActionResult> ValidanUsername(string username){
        var poslodavac = await Context.Poslodavci.Where( p=> p.UserName==username).FirstOrDefaultAsync();
        if(poslodavac!=null)
            return Ok(poslodavac);
        else    
            return NoContent(); //vraca 204 ako nema poslodavca sa takvim usernamom
    }


    [Route("PromeniLozinkuPoslodavac/{mejl}/{lozinka}")]
    [HttpPut]
    public async Task<ActionResult>PromeniLozinku(string mejl,string lozinka){

       
        try{
            var poslodavacPom = Context.Poslodavci.Where( p=> p.Email==mejl ).FirstOrDefault();
        

            if(poslodavacPom!=null){
               poslodavacPom.Password = lozinka;
                await Context.SaveChangesAsync();
                return Ok("Uspesno izmenjeno!");
            }
            else{
                return BadRequest("Greska!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
    }





    //za menjanje informacija poslodavca preko njegovog profila
    [Route("IzmeniPodatkePoslodavca/{nadjiUsername}/{Slika}/{Naziv}/{PIB}/{MaticniBroj}/{FiksniTelefon}/{MobilniTelefon}/{Delatnost}/{Grad}/{Ulica}/{BrojStana}/{BrojUlaza}/{Informacije}")]
    [HttpPut]
    public async Task<ActionResult> IzmeniPodatkePoslodavca(string nadjiUsername, string Slika, string Naziv, string PIB, string MaticniBroj,string FiksniTelefon, string MobilniTelefon, string Delatnost,string Grad,string Ulica,string BrojStana,string BrojUlaza, string Informacije){
        try{
            var poslodavac = Context.Poslodavci.Where(p => p.UserName==nadjiUsername).FirstOrDefault(); //proverimo da li imamo poslodavca sa datim username-om

            if(poslodavac != null) //ako ga imamo, modifikujemo ga
            {                      
                    //prvo proverimo unesene provere
                    if(Slika.Length>300){
                        return BadRequest("Lose uneta slika!");
                    }
                    if(string.IsNullOrWhiteSpace(MobilniTelefon) || MobilniTelefon.Length>20 || MobilniTelefon.Length<8){
                        return BadRequest("Lose unet mobilni telefon!");
                    }
                    if(string.IsNullOrWhiteSpace(FiksniTelefon) || FiksniTelefon.Length>20 || FiksniTelefon.Length<6){
                        return BadRequest("Lose unet fiksni telefon!");
                    }
                    if(string.IsNullOrWhiteSpace(MaticniBroj) || MaticniBroj.Length>8 || MaticniBroj.Length<8){
                        return BadRequest("Lose unet maticni broj!");
                    }
                    if(string.IsNullOrWhiteSpace(PIB) || PIB.Length>9 || PIB.Length<9){
                        return BadRequest("Lose unet PIB!");
                    }
                    if(string.IsNullOrWhiteSpace(Naziv) || Naziv.Length>50){
                        return BadRequest("Lose unet naziv!");
                    }
                    if(string.IsNullOrWhiteSpace(Delatnost) || Delatnost.Length>30){
                        return BadRequest("Lose uneta broj racuna!");
                    }
                    if(string.IsNullOrWhiteSpace(Grad) || Grad.Length>20){
                        return BadRequest("Lose unet grad!");
                    }
                    if(string.IsNullOrWhiteSpace(Ulica) || Ulica.Length>50){
                        return BadRequest("Lose uneta ulica!");
                    }
                    if(BrojStana.Length>3){
                        return BadRequest("Lose unet broj stana!");
                    }
                    if(BrojUlaza.Length>3){
                        return BadRequest("Lose unet broj ulaza!");
                    }
                    if(Informacije.Length>10000){
                        return BadRequest("Lose unete informacije!");
                    }
                    

                    //izvrsimo modifikacije
                            poslodavac.Slika = Slika;
                            poslodavac.Naziv = Naziv;
                            poslodavac.PIB = PIB;
                            poslodavac.MaticniBroj = MaticniBroj;
                            poslodavac.FiksniTelefon = FiksniTelefon;
                            poslodavac.MobilniTelefon = MobilniTelefon;
                            poslodavac.Delatnost = Delatnost;
                            poslodavac.Grad = Grad;
                            poslodavac.Ulica = Ulica;
                            poslodavac.BrojStana = BrojStana;
                            poslodavac.BrojUlaza = BrojUlaza;
                            if(Informacije=="null"){
                                poslodavac.Informacije=null;
                            }
                            else{
                                poslodavac.Informacije=Informacije;
                            }

                            await Context.SaveChangesAsync();   //saljemo promene nazad u bazu podatala
                            return Ok($"Uspesno izmenjen poslodavac sa username-om:{nadjiUsername}.");
            }
            else{   //ako je nemamo, prijavimo da nije nadjena
                return BadRequest($"Poslodavac sa username-om:{nadjiUsername} nije pronadjen!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
    }



    [Route("IzbrisiPoslodavcaPrekousername/{username}")]
    [HttpPut]
    public async Task<ActionResult>IzbrisiPoslodavcaPrekousername(string username){
        if(string.IsNullOrWhiteSpace(username) || username.Length>20){  //proverimo da li je uopste validan username
            return BadRequest("Lose unet username!");
        }

        try{
            var poslodavac = Context.Poslodavci.Where(p=> p.UserName==username).FirstOrDefault();

            if(poslodavac!=null){
                poslodavac.Password = "Izbrisan*999";
                poslodavac.Email = "izbrisan korisnik";
                Context.Poslodavci.Update(poslodavac);
                await Context.SaveChangesAsync();
                return Ok($"Uspesno obrisana poslodavac sa Username-om:{username}!");
            }
            else{
                return BadRequest($"Nije pronadjen poslodavac sa Username-om:{username}!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
    }

    [Route("PreuzmiSvePoslodavce")]
    [HttpGet]
    public async Task<ActionResult>PreuzmiSvePoslodavce(){

        var poslodavci = await Context.Poslodavci.ToListAsync();

        return Ok(new{
            poslodavci,
            brojPoslodavaca=poslodavci.Count
        });
    }
    
}