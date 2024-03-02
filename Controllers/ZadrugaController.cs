namespace UposliMe.Controllers;

[ApiController]
[Route("[controller]")]
public class ZadrugaController : ControllerBase
{
    public UposliMeContext Context { get; set; }

    public ZadrugaController(UposliMeContext context)
    {
        Context = context;
    }

    [Route("DodajZadrugu")]
    [HttpPost]
    public async Task<ActionResult> DodajZadrugu([FromBody] Zadruga zadruga){
        if(string.IsNullOrWhiteSpace(zadruga.UserName) || zadruga.UserName.Length>20){
            return BadRequest("Lose unet username!");
        }
        if(string.IsNullOrWhiteSpace(zadruga.Password) || zadruga.Password.Length>20){
            return BadRequest("Lose unet password!");
        }
        if(zadruga.Slika.Length>300){
            return BadRequest("Lose uneta slika!");
        }
        if(string.IsNullOrWhiteSpace(zadruga.Email) || zadruga.Email.Length>100){
            return BadRequest("Lose unet email!");
        }
        if(string.IsNullOrWhiteSpace(zadruga.MobilniTelefon) || zadruga.MobilniTelefon.Length>20 || zadruga.MobilniTelefon.Length<8){
            return BadRequest("Lose unet mobilni telefon!");
        }
        if(string.IsNullOrWhiteSpace(zadruga.FiksniTelefon) || zadruga.FiksniTelefon.Length>20 || zadruga.FiksniTelefon.Length<6){
            return BadRequest("Lose unet fiksni telefon!");
        }
        if(string.IsNullOrWhiteSpace(zadruga.MaticniBroj) || zadruga.MaticniBroj.Length>8 || zadruga.MaticniBroj.Length<8){
            return BadRequest("Lose unet maticni broj!");
        }
        if(string.IsNullOrWhiteSpace(zadruga.PIB) || zadruga.PIB.Length>9 || zadruga.PIB.Length<9){
            return BadRequest("Lose unet PIB!");
        }
        if(string.IsNullOrWhiteSpace(zadruga.Naziv) || zadruga.Naziv.Length>50){
            return BadRequest("Lose unet naziv!");
        }
        if(string.IsNullOrWhiteSpace(zadruga.BrojRacuna) || zadruga.BrojRacuna.Length>30){
            return BadRequest("Lose uneta broj racuna!");
        }
        if(string.IsNullOrWhiteSpace(zadruga.Grad) || zadruga.Grad.Length>20){
            return BadRequest("Lose unet grad!");
        }
        if(string.IsNullOrWhiteSpace(zadruga.Ulica) || zadruga.Ulica.Length>50){
            return BadRequest("Lose uneta ulica!");
        }
        if(zadruga.BrojStana.Length>3){
            return BadRequest("Lose unet broj stana!");
        }
        if(zadruga.BrojUlaza.Length>3){
            return BadRequest("Lose unet broj ulaza!");
        }
        if(zadruga.Informacije.Length>10000){
            return BadRequest("Lose unete informacije!");
        }

        try
        {   
            //proverimo jel postoji zadrugar sa tim usernameom
            var zadrugarPom = Context.Zadrugari.Where( p=> p.UserName==zadruga.UserName ).FirstOrDefault();
            if(zadrugarPom!=null){
                return BadRequest($"Username: {zadruga.UserName} je zauzet!");
            }

            //proverimo jel postoji zadruga sa tim usernameom
            var zadrugaPom = Context.Zadruge.Where( p=> p.UserName==zadruga.UserName ).FirstOrDefault();
            if(zadrugaPom!=null){
                return BadRequest($"Username: {zadruga.UserName} je zauzet!");
            }

            //proverimo jel postoji poslodavac sa tim usernameom
            var poslodavacPom = Context.Poslodavci.Where( p=> p.UserName==zadruga.UserName ).FirstOrDefault();
            if(poslodavacPom!=null){
                return BadRequest($"Username: {zadruga.UserName} je zauzet!");
            }

            //proverimo jel postoji administrator sa tim usernameom
            var administratorPom = Context.Administratori.Where( p=> p.UserName==zadruga.UserName ).FirstOrDefault();
            if(administratorPom!=null){
                return BadRequest($"Username: {zadruga.UserName} je zauzet!");
            }

            //proverimo jel postoji zadrugar sa tom email adresom
            zadrugarPom = Context.Zadrugari.Where( p=> p.Email==zadruga.Email ).FirstOrDefault();
            if(zadrugarPom!=null){
                return BadRequest($"Email: {zadruga.Email} je zauzet!");
            }

            //proverimo jel postoji zadruga sa tom email adresom
            zadrugaPom = Context.Zadruge.Where( p=> p.Email==zadruga.Email ).FirstOrDefault();
            if(zadrugaPom!=null){
                return BadRequest($"Email: {zadruga.Email} je zauzet!");
            }

            //proverimo jel postoji poslodavac sa tom email adresom
            poslodavacPom = Context.Poslodavci.Where( p=> p.Email==zadruga.Email ).FirstOrDefault();
            if(poslodavacPom!=null){
                return BadRequest($"Email: {zadruga.Email} je zauzet!");
            }

            Context.Zadruge.Add(zadruga);
            

            await Context.SaveChangesAsync();
            return Ok($"Uspesno dodata zadruga sa id={zadruga.ID}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("PreuzmiZadruguUsernameIPassword/{korisnickoIme}/{lozinka}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiZadruguUsernameIPassword(string korisnickoIme, string lozinka){

        var zadruga = await Context.Zadruge.Where( p => p.UserName==korisnickoIme && p.Password==lozinka).FirstOrDefaultAsync();

        if(zadruga!=null)
            return Ok(zadruga);
        else
            return NoContent();
    }

    [Route("PreuzmiZadruguEmail/{email}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiZadruguEmail(string email){

        var zadruga = await Context.Zadruge.Where( p => p.Email==email).FirstOrDefaultAsync();

            if(zadruga!=null)
                return Ok(zadruga);    //vraca kod 200
            else
                return NoContent(); //vraca 204 kod
    }



    [Route("ValidanUsername/{username}")]
    [HttpGet]
    public async Task<ActionResult> ValidanUsername(string username){
        var zadruga = await Context.Zadruge.Where( p=> p.UserName==username).FirstOrDefaultAsync();
        if(zadruga!=null)
            return Ok(zadruga);
        else    
            return NoContent(); //vraca 204 ako nema zadruge sa takvim usernamom
    }

   
    [Route("PromeniLozinkuZadruga/{mejl}/{lozinka}")]
    [HttpPut]
    public async Task<ActionResult>PromeniLozinku(string mejl,string lozinka){

       
        try{
            var zadrugaPom = Context.Zadruge.Where( p=> p.Email==mejl ).FirstOrDefault();
        

            if(zadrugaPom!=null){
               zadrugaPom.Password = lozinka;
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






     //za menjanje informacija zadruge preko njenog profila
    [Route("IzmeniPodatkeZadruge/{nadjiUsername}/{Slika}/{Naziv}/{PIB}/{MaticniBroj}/{FiksniTelefon}/{MobilniTelefon}/{BrojRacuna}/{Grad}/{Ulica}/{BrojStana}/{BrojUlaza}/{Informacije}")]
    [HttpPut]
    public async Task<ActionResult> IzmeniPodatkeZadrugar(string nadjiUsername, string Slika, string Naziv, string PIB, string MaticniBroj,string FiksniTelefon, string MobilniTelefon, string BrojRacuna,string Grad,string Ulica,string BrojStana,string BrojUlaza, string Informacije){
        try{
            var zadruga = Context.Zadruge.Where(p => p.UserName==nadjiUsername).FirstOrDefault(); //proverimo da li imamo zadrugu sa datim username-om

            if(zadruga != null) //ako je imamo, modifikujemo je
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
                    if(string.IsNullOrWhiteSpace(BrojRacuna) || BrojRacuna.Length>30){
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
                            zadruga.Slika = Slika;
                            zadruga.Naziv = Naziv;
                            zadruga.PIB = PIB;
                            zadruga.MaticniBroj = MaticniBroj;
                            zadruga.FiksniTelefon = FiksniTelefon;
                            zadruga.MobilniTelefon = MobilniTelefon;
                            zadruga.BrojRacuna = BrojRacuna;
                            zadruga.Grad = Grad;
                            zadruga.Ulica = Ulica;
                            zadruga.BrojStana = BrojStana;
                            zadruga.BrojUlaza = BrojUlaza;
                             if(Informacije=="null"){
                                zadruga.Informacije=null;
                            }
                            else{
                                zadruga.Informacije=Informacije;
                            }

                            await Context.SaveChangesAsync();   //saljemo promene nazad u bazu podatala
                            return Ok($"Uspesno izmenjena zadruga sa username-om:{nadjiUsername}.");
            }
            else{   //ako je nemamo, prijavimo da nije nadjena
                return BadRequest($"Zadruga sa username-om:{nadjiUsername} nije pronadjena!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
    }


    
    [Route("IzbrisiZadruguPrekousername/{username}")]
    [HttpPut]
    public async Task<ActionResult>IzbrisiZadruguPrekousername(string username){
        if(string.IsNullOrWhiteSpace(username) || username.Length>20){  //proverimo da li je uopste validan username
            return BadRequest("Lose unet username!");
        }

        try{
            var zadruga = Context.Zadruge.Where(p=> p.UserName==username).FirstOrDefault();

            if(zadruga!=null){
                zadruga.Password = "Izbrisan*999";
                zadruga.Email = "izbrisan korisnik";
                Context.Zadruge.Update(zadruga);
                await Context.SaveChangesAsync();
                return Ok($"Uspesno obrisana zadruga sa Username-om:{username}!");
            }
            else{
                return BadRequest($"Nije pronadjena zadruga sa Username-om:{username}!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
    }

   [Route("PreuzmiSveZadruge")]
    [HttpGet]
    public async Task<ActionResult>PreuzmiSveZadruge(){

        var zadruge = await Context.Zadruge.ToListAsync();

        return Ok(new {
            zadruge, 
            brojZadruga=zadruge.Count
        });
    }
    
    [Route("PreuzmiImenaSvihZadruga")]
    [HttpGet]
    public async Task<ActionResult>PreuzmiImenaSvihZadruga(){

        var zadruge = await Context.Zadruge.ToListAsync();
        List<string> imenaZadruga = new List<string>(); 

        zadruge.ForEach(zadruga=>{
            imenaZadruga.Add(zadruga.Naziv);
        });

        return Ok(imenaZadruga);
    }
    
    }