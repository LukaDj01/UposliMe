namespace UposliMe.Controllers;

[ApiController]
[Route("[controller]")]
public class OglasController : ControllerBase
{
    public UposliMeContext Context { get; set; }

    public OglasController(UposliMeContext context)
    {
        Context = context;
    }
    
    [Route("DodajOglas/{zadrugaNaziv}/{PposlodavacID}")]
    [HttpPost]
    public async Task<ActionResult> DodajOglasFB([FromBody] Oglas oglas, string zadrugaNaziv, int PposlodavacID){
        if(string.IsNullOrWhiteSpace(oglas.Naziv) || oglas.Naziv.Length>50)
        {
            return BadRequest("Lose unet naziv!");
        }
        if(string.IsNullOrWhiteSpace(oglas.Opis) || oglas.Opis.Length>10000)
        {
            return BadRequest("Lose unet opis!");
        }
        if(oglas.BrojPotrebnihRadnika<1 || oglas.BrojPotrebnihRadnika>999)
        {
            return BadRequest("Lose unet broj potrebnih radnika!");
        }
        if(string.IsNullOrWhiteSpace(oglas.Grad) || oglas.Grad.Length>20)
        {
            return BadRequest("Lose unet grad!");
        }
        if(string.IsNullOrWhiteSpace(oglas.Ulica) || oglas.Ulica.Length>50)
        {
            return BadRequest("Lose unet ulica!");
        }
        if(oglas.BrojStana.Length>3)
        {
            return BadRequest("Lose unet broj stana!");
        }
        if(oglas.BrojUlaza.Length>3)
        {
            return BadRequest("Lose unet broj ulaza!");
        }
        if(string.IsNullOrWhiteSpace(oglas.RokZaPrijavu.ToString()) || oglas.RokZaPrijavu.CompareTo(DateTime.Now)<=0){
            return BadRequest("Lose unet rok za prijavu!");
        }
        if(string.IsNullOrWhiteSpace(oglas.DatumIzvrsavanjaPosla.ToString()) || oglas.DatumIzvrsavanjaPosla.CompareTo(oglas.RokZaPrijavu)<=0){
            return BadRequest("Lose unet datum izvrsavanja posla!");
        }
        if(string.IsNullOrWhiteSpace(oglas.Tip) || oglas.Tip.Length>50)
        {
            return BadRequest("Lose unet ulica!");
        }
        if(oglas.Novac<1 || oglas.Novac>9999999)
        {
            return BadRequest("Lose unet novac!");
        }
        if(string.IsNullOrWhiteSpace(oglas.NacinPlacanja) || oglas.NacinPlacanja.Length>50)
        {
            return BadRequest("Lose unet ulica!");
        }
        
        try
        {   
            var zadruga = await Context.Zadruge.Where(p=>p.Naziv==zadrugaNaziv).FirstOrDefaultAsync();
            if(zadruga==null)
            {
                return BadRequest("Nije dobra zadruga!");
            }
            var poslodavac = await Context.Poslodavci.Where(p=>p.ID==PposlodavacID).FirstOrDefaultAsync();
            if(poslodavac==null)
            {
                return BadRequest("Nije dobar poslodavac!");
            }

            oglas.Zadruga=zadruga;
            oglas.Poslodavac=poslodavac;
            oglas.DatumPostavljanja = DateTime.Now;
            oglas.Odobren=false;
            oglas.OdabraniRadnici=false;
            oglas.NapravljenUgovor=false;
            oglas.Aktuelan=false;

            Context.Oglasi.Add(oglas);
            

            await Context.SaveChangesAsync();
            return Ok($"Uspesno dodat oglas sa id={oglas.ID}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }

    [Route("DodajOglas/{opis}/{brojPotrebnihRadnika}/{grad}/{ulica}/{brojStana}/{brojUlaza}/{rokZaPrijavu}/{datumIzvrsavanjaPosla}/{tip}/{novac}/{nacinPlacanja}/{ZzadrugaID}/{PposlodavacID}")]
    [HttpPost]
    public async Task<ActionResult> DodajOglas(string naziv, string opis, int brojPotrebnihRadnika, string grad, string ulica, string brojStana, string brojUlaza, DateTime rokZaPrijavu,
                                                 DateTime datumIzvrsavanjaPosla, string tip, double novac, string nacinPlacanja, int ZzadrugaID, int PposlodavacID){
        if(string.IsNullOrWhiteSpace(naziv) || naziv.Length>50)
        {
            return BadRequest("Lose unet naziv!");
        }
        if(string.IsNullOrWhiteSpace(opis) || opis.Length>10000)
        {
            return BadRequest("Lose unet opis!");
        }
        if(brojPotrebnihRadnika<1 || brojPotrebnihRadnika>999)
        {
            return BadRequest("Lose unet broj potrebnih radnika!");
        }
        if(string.IsNullOrWhiteSpace(grad) || grad.Length>20)
        {
            return BadRequest("Lose unet grad!");
        }
        if(string.IsNullOrWhiteSpace(ulica) || ulica.Length>50)
        {
            return BadRequest("Lose unet ulica!");
        }
        if(brojStana.Length>3)
        {
            return BadRequest("Lose unet broj stana!");
        }
        if(brojUlaza.Length>3)
        {
            return BadRequest("Lose unet broj ulaza!");
        }
        if(string.IsNullOrWhiteSpace(rokZaPrijavu.ToString()) || (DateTime.Now-rokZaPrijavu).Days>=0){
            return BadRequest("Lose unet rok za prijavu!");
        }
        if(string.IsNullOrWhiteSpace(datumIzvrsavanjaPosla.ToString()) || (rokZaPrijavu-datumIzvrsavanjaPosla).Days>=0){
            return BadRequest("Lose unet datum izvrsavanja posla!");
        }
        if(string.IsNullOrWhiteSpace(tip) || tip.Length>50)
        {
            return BadRequest("Lose unet ulica!");
        }
        if(novac<1 || novac>9999999)
        {
            return BadRequest("Lose unet novac!");
        }
        if(string.IsNullOrWhiteSpace(nacinPlacanja) || nacinPlacanja.Length>50)
        {
            return BadRequest("Lose unet ulica!");
        }
        
        try
        {   
            var oglas = new Oglas{
                Naziv=naziv,
                Opis=opis,
                BrojPotrebnihRadnika=brojPotrebnihRadnika,
                Grad=grad,
                Ulica=ulica,
                BrojStana=brojStana,
                BrojUlaza=brojUlaza,
                RokZaPrijavu=rokZaPrijavu,
                DatumIzvrsavanjaPosla=datumIzvrsavanjaPosla,
                Tip=tip,
                Novac=novac,
                NacinPlacanja=nacinPlacanja
            };
            var zadruga = await Context.Zadruge.FindAsync(ZzadrugaID);
            if(zadruga==null)
            {
                return BadRequest("Nije dobra zadruga!");
            }
            var poslodavac = await Context.Poslodavci.FindAsync(PposlodavacID);
            if(poslodavac==null)
            {
                return BadRequest("Nije dobar poslodavac!");
            }

            oglas.Zadruga=zadruga;
            oglas.Poslodavac=poslodavac;
            oglas.DatumPostavljanja = DateTime.Now;
            oglas.Odobren=false;
            oglas.OdabraniRadnici=false;
            oglas.NapravljenUgovor=false;
            oglas.Aktuelan=false;

            Context.Oglasi.Add(oglas);
            

            await Context.SaveChangesAsync();
            return Ok($"Uspesno dodat oglas sa id={oglas.ID}");
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }



    [Route("IzmeniOglas/{oglasID}/{zadrugaNaziv}")]
    [HttpPut]
    public async Task<ActionResult> IzmeniOglas([FromBody] Oglas oglas, int oglasID,string zadrugaNaziv){
        if(oglasID<0){
            return BadRequest("Los id oglasa!");
        }
        if(string.IsNullOrWhiteSpace(zadrugaNaziv)){
            return BadRequest("Los naziv zadruge!");
        }
        if(string.IsNullOrWhiteSpace(oglas.Naziv) || oglas.Naziv.Length>50)
        {
            return BadRequest("Lose unet naziv!");
        }
        if(string.IsNullOrWhiteSpace(oglas.Opis) || oglas.Opis.Length>10000)
        {
            return BadRequest("Lose unet opis!");
        }
        if(oglas.BrojPotrebnihRadnika<1 || oglas.BrojPotrebnihRadnika>999)
        {
            return BadRequest("Lose unet broj potrebnih radnika!");
        }
        if(string.IsNullOrWhiteSpace(oglas.Grad) || oglas.Grad.Length>20)
        {
            return BadRequest("Lose unet grad!");
        }
        if(string.IsNullOrWhiteSpace(oglas.Ulica) || oglas.Ulica.Length>50)
        {
            return BadRequest("Lose unet ulica!");
        }
        if(oglas.BrojStana.Length>3)
        {
            return BadRequest("Lose unet broj stana!");
        }
        if(oglas.BrojUlaza.Length>3)
        {
            return BadRequest("Lose unet broj ulaza!");
        }
        if(string.IsNullOrWhiteSpace(oglas.RokZaPrijavu.ToString()) || oglas.RokZaPrijavu.CompareTo(DateTime.Now)<=0){
            return BadRequest("Lose unet rok za prijavu!");
        }
        if(string.IsNullOrWhiteSpace(oglas.DatumIzvrsavanjaPosla.ToString()) || oglas.DatumIzvrsavanjaPosla.CompareTo(oglas.RokZaPrijavu)<=0){
            return BadRequest("Lose unet datum izvrsavanja posla!");
        }
        if(string.IsNullOrWhiteSpace(oglas.Tip) || oglas.Tip.Length>50)
        {
            return BadRequest("Lose unet ulica!");
        }
        if(oglas.Novac<1 || oglas.Novac>9999999)
        {
            return BadRequest("Lose unet novac!");
        }
        if(string.IsNullOrWhiteSpace(oglas.NacinPlacanja) || oglas.NacinPlacanja.Length>50)
        {
            return BadRequest("Lose unet ulica!");
        }
        
        try
        {   
            var novaZadruga= await Context.Zadruge.Where(z => z.Naziv==zadrugaNaziv).FirstOrDefaultAsync();
            var oglasZaIzmenu = await Context.Oglasi.Where(o=> o.ID==oglasID).FirstOrDefaultAsync();
            
            if(oglasZaIzmenu!=null && novaZadruga!=null){
                oglasZaIzmenu.Naziv=oglas.Naziv;
                oglasZaIzmenu.Opis=oglas.Opis;
                oglasZaIzmenu.BrojPotrebnihRadnika=oglas.BrojPotrebnihRadnika;
                oglasZaIzmenu.Grad=oglas.Grad;
                oglasZaIzmenu.Ulica=oglas.Ulica;
                oglasZaIzmenu.BrojStana=oglas.BrojStana;
                oglasZaIzmenu.BrojUlaza=oglas.BrojUlaza;
                oglasZaIzmenu.RokZaPrijavu=oglas.RokZaPrijavu;
                oglasZaIzmenu.DatumIzvrsavanjaPosla=oglas.DatumIzvrsavanjaPosla;
                oglasZaIzmenu.Tip=oglas.Tip;
                oglasZaIzmenu.Novac=oglas.Novac;
                oglasZaIzmenu.NacinPlacanja=oglas.NacinPlacanja;
                oglasZaIzmenu.Zadruga=novaZadruga;
                oglasZaIzmenu.Odobren=oglas.Odobren;
                oglasZaIzmenu.Aktuelan=oglas.Aktuelan;
                await Context.SaveChangesAsync();
                return Ok($"Uspesno izmenjen oglas sa id={oglas.ID}");
            }
            else{
                return BadRequest("Nije nadjen takav oglas!");
            }
        }
        catch (Exception e)
        {
            return BadRequest(e.Message);
        }
    }
    
    [Route("PreuzmiOglas/{ID}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiOglas(int ID){

        var oglas = await Context.Oglasi.Where( p => p.ID==ID).Include(p=>p.Zadruga)
                                    .Include(p=>p.Poslodavac)
                                    .Include(p=>p.OglasiZadrugari)
                                    .ThenInclude(q=>q.Zadrugar)
                                    .FirstOrDefaultAsync();

        if(oglas!=null)
            return Ok(oglas);
        else
            return NoContent();
    }

    [Route("PreuzmiSveOglase")] // cisto radi testa
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveOglase(){

        var oglasi = await Context.Oglasi.Include(p=>p.Zadruga)
                                    .Include(p=>p.Poslodavac)
                                    .Include(p=>p.OglasiZadrugari)
                                    .ThenInclude(q=>q.Zadrugar)
                                    .ToListAsync();


        return Ok(oglasi);
    }

    [Route("PreuzmiSveOglaseZadrugaOdobravanjePretragaSortiranje/{username}/{unosZaPretragu}/{sortiranje}")] // zadruga - lista oglasa za koje treba da odluci da li ce ih prihvatiti ili odbiti
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveOglaseZadrugaOdobravanjePretragaSortiranje(string username, string unosZaPretragu, string sortiranje){

        //trazenje oglasa za koje se ceka odgovor (prihvatanje/odbijanje) pocetak
        var oglasi = await Context.Oglasi.Include(p=>p.Zadruga)
                                    .Include(p=>p.Poslodavac)
                                    .Include(p=>p.OglasiZadrugari)
                                    .ThenInclude(q=>q.Zadrugar)
                                    .ToListAsync();
        var oglasi2 = oglasi.Where(o=>o.Odobren==false && o.Aktuelan==false && o.OdabraniRadnici==false && o.NapravljenUgovor==false).ToList();
        //trazenje oglasa za koje se ceka odgovor (prihvatanje/odbijanje) kraj

        //trazenje oglasa koji su vezani za datu zadrugu pocetak
        var zadruga = Context.Zadruge.Where(p=>p.UserName==username).FirstOrDefault();

        List<Oglas> oglasiPregled = new List<Oglas>();

        oglasi2.ForEach(oglas=>{
            if(oglas.Zadruga==zadruga)
                oglasiPregled.Add(oglas);
        });
        //trazenje oglasa koji su vezani za datu zadrugu kraj
        
        //sortiranje pocetak (nebitno da li se prvo obavi sortiranje pa ostatak koda ili obrnuto)
        if(!string.IsNullOrWhiteSpace(sortiranje))
        {
            if(sortiranje=="Najnovije")
                oglasiPregled.Sort((a,b)=>b.DatumPostavljanja.CompareTo(a.DatumPostavljanja));
            if(sortiranje=="Naziv A-Z")
                oglasiPregled.Sort((a,b)=>a.Naziv.CompareTo(b.Naziv));
            if(sortiranje=="Naziv Z-A")
                oglasiPregled.Sort((a,b)=>b.Naziv.CompareTo(a.Naziv));
            if(sortiranje=="Novac ↓")
                oglasiPregled.Sort((a,b)=>b.Novac.CompareTo(a.Novac));
            if(sortiranje=="Novac ↑")
                oglasiPregled.Sort((a,b)=>a.Novac.CompareTo(b.Novac));
        }
        //sortiranje kraj

        //pretraga pocetak
        if(!string.IsNullOrWhiteSpace(unosZaPretragu))
        {
            List<Oglas> oglasiPregled2 = new List<Oglas>();
            oglasiPregled.ForEach(oglas=>{
                if(oglas.Naziv.IndexOf(unosZaPretragu)!=-1)
                    oglasiPregled2.Add(oglas);
            });
            return Ok(oglasiPregled2); // ako JE izvrsena pretraga
        }
        //pretraga kraj

        return Ok(oglasiPregled); // ako NIJE izvrsena pretraga
    } // treba test

    [Route("PreuzmiSveOglasePoslodavacPregledNeodobrenihPretragaSortiranje/{username}/{unosZaPretragu}/{sortiranje}")] // poslodavcu se prikazuju oglasi koji nisu odobreni od strane zadruge
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveOglasePoslodavacPregledNeodobrenihPretragaSortiranje(string username, string unosZaPretragu, string sortiranje){

        //trazenje oglasa koji su nisu odobreni od strane zadruge pocetak
        var oglasi = await Context.Oglasi.Include(p=>p.Zadruga)
                                    .Include(p=>p.Poslodavac)
                                    .Include(p=>p.OglasiZadrugari)
                                    .ThenInclude(q=>q.Zadrugar)
                                    .ToListAsync();
        var oglasi2 = oglasi.Where(o=>o.Odobren==false && o.Aktuelan==true && o.OdabraniRadnici==false && o.NapravljenUgovor==false).ToList();
        //trazenje oglasa koji su nisu odobreni od strane zadruge kraj

        //trazenje oglasa koji su vezani za datog poslodavca pocetak
        var poslodavac = Context.Poslodavci.Where(p=>p.UserName==username).FirstOrDefault();

        List<Oglas> oglasiPregled = new List<Oglas>();

        oglasi2.ForEach(oglas=>{
            if(oglas.Poslodavac==poslodavac)
                oglasiPregled.Add(oglas);
        });
        //trazenje oglasa koji su vezani za datog poslodavca kraj
        
        //sortiranje pocetak (nebitno da li se prvo obavi sortiranje pa ostatak koda ili obrnuto)
        if(!string.IsNullOrWhiteSpace(sortiranje))
        {
            if(sortiranje=="Najnovije")
                oglasiPregled.Sort((a,b)=>b.DatumPostavljanja.CompareTo(a.DatumPostavljanja));
            if(sortiranje=="Naziv A-Z")
                oglasiPregled.Sort((a,b)=>a.Naziv.CompareTo(b.Naziv));
            if(sortiranje=="Naziv Z-A")
                oglasiPregled.Sort((a,b)=>b.Naziv.CompareTo(a.Naziv));
            if(sortiranje=="Novac ↓")
                oglasiPregled.Sort((a,b)=>b.Novac.CompareTo(a.Novac));
            if(sortiranje=="Novac ↑")
                oglasiPregled.Sort((a,b)=>a.Novac.CompareTo(b.Novac));
        }
        //sortiranje kraj

        //pretraga pocetak
        if(!string.IsNullOrWhiteSpace(unosZaPretragu))
        {
            List<Oglas> oglasiPregled2 = new List<Oglas>();
            oglasiPregled.ForEach(oglas=>{
                if(oglas.Naziv.IndexOf(unosZaPretragu)!=-1)
                    oglasiPregled2.Add(oglas);
            });
            return Ok(oglasiPregled2); // ako JE izvrsena pretraga
        }
        //pretraga kraj

        return Ok(oglasiPregled); // ako NIJE izvrsena pretraga
    } // treba test

    [Route("PreuzmiSveOglaseZadrugaPregledFiltriranjePretragaSortiranje/{username}/{grad}/{datumIzvrsavanja}/{tip}/{nacinPlacanja}/{novacOd}/{novacDo}/{unosZaPretragu}/{sortiranje}")] // zadrugzi se prikazuju oglasi koje je odobrila
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveOglaseZadrugaPregledFiltriranjePretragaSortiranje(string username, string grad, string datumIzvrsavanja, 
                                                                string tip, string nacinPlacanja, string novacOd, string novacDo, 
                                                                string unosZaPretragu, string sortiranje){

        //trazenje oglasa koji su odobreni i za koje nije napravljen ugovor pocetak
        var oglasi = await Context.Oglasi.Include(p=>p.Zadruga)
                                    .Include(p=>p.Poslodavac)
                                    .Include(p=>p.OglasiZadrugari)
                                    .ThenInclude(q=>q.Zadrugar)
                                    .ToListAsync();
        var oglasi2 = oglasi.Where(o=>o.Odobren==true && o.NapravljenUgovor==false).ToList();
        //trazenje oglasa koji su odobreni i za koje nije napravljen ugovor kraj

        //trazenje oglasa koji su vezani za datu zadrugu pocetak
        var zadruga = Context.Zadruge.Where(p=>p.UserName==username).FirstOrDefault();

        List<Oglas> oglasiPregled = new List<Oglas>();

        oglasi2.ForEach(oglas=>{
            if(oglas.Zadruga==zadruga)
                oglasiPregled.Add(oglas);
        });
        //trazenje oglasa koji su vezani za datu zadrugu kraj
        
        //filtriranje pocetak
        if (grad!="Izaberi grad" && !string.IsNullOrWhiteSpace(grad))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Grad==grad).ToList();
        }
        if (!string.IsNullOrWhiteSpace(datumIzvrsavanja))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.DatumIzvrsavanjaPosla.Year==Convert.ToDateTime(datumIzvrsavanja).Year
                                                    && oglas.DatumIzvrsavanjaPosla.Month==Convert.ToDateTime(datumIzvrsavanja).Month
                                                    && oglas.DatumIzvrsavanjaPosla.Day==Convert.ToDateTime(datumIzvrsavanja).Day).ToList();
        }
        if (tip!="Izaberi tip" && !string.IsNullOrWhiteSpace(tip))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Tip==tip).ToList();
        }
        if (nacinPlacanja!="Izaberi način plaćanja" && !string.IsNullOrWhiteSpace(nacinPlacanja))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.NacinPlacanja==nacinPlacanja).ToList();
        }
        if(!string.IsNullOrWhiteSpace(novacOd))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Novac>=Convert.ToDouble(novacOd)).ToList();
        }
        if(!string.IsNullOrWhiteSpace(novacDo))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Novac<=Convert.ToDouble(novacDo)).ToList();
        }
        //filtriranje kraj

        //sortiranje pocetak (nebitno da li se prvo obavi sortiranje pa ostatak koda ili obrnuto)
        if(!string.IsNullOrWhiteSpace(sortiranje))
        {
            if(sortiranje=="Najnovije")
                oglasiPregled.Sort((a,b)=>b.DatumPostavljanja.CompareTo(a.DatumPostavljanja));
            if(sortiranje=="Naziv A-Z")
                oglasiPregled.Sort((a,b)=>a.Naziv.CompareTo(b.Naziv));
            if(sortiranje=="Naziv Z-A")
                oglasiPregled.Sort((a,b)=>b.Naziv.CompareTo(a.Naziv));
            if(sortiranje=="Novac ↓")
                oglasiPregled.Sort((a,b)=>b.Novac.CompareTo(a.Novac));
            if(sortiranje=="Novac ↑")
                oglasiPregled.Sort((a,b)=>a.Novac.CompareTo(b.Novac));
        }
        //sortiranje kraj

        //pretraga pocetak
        if(!string.IsNullOrWhiteSpace(unosZaPretragu))
        {
            List<Oglas> oglasiPregled2 = new List<Oglas>();
            oglasiPregled.ForEach(oglas=>{
                if(oglas.Naziv.IndexOf(unosZaPretragu)!=-1)
                    oglasiPregled2.Add(oglas);
            });
            return Ok(oglasiPregled2); // ako JE izvrsena pretraga
        }
        //pretraga kraj

        return Ok(oglasiPregled); // ako NIJE izvrsena pretraga
    }

    [Route("PreuzmiSveOglasePoslodavacPregledFiltriranjePretragaSortiranje/{username}/{grad}/{datumIzvrsavanja}/{tip}/{nacinPlacanja}/{novacOd}/{novacDo}/{unosZaPretragu}/{sortiranje}")] // poslodavcu se prikazuju oglasi koji su aktuelni i odobreni
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveOglasePoslodavacPregledFiltriranjePretragaSortiranje(string username, string grad, string datumIzvrsavanja, 
                                                                                                string tip, string nacinPlacanja, string novacOd, string novacDo, 
                                                                                                string unosZaPretragu, string sortiranje){
        //trazenje oglasa koji su odobreni i aktuelni pocetak
        var oglasi = await Context.Oglasi.Include(p=>p.Zadruga)
                                    .Include(p=>p.Poslodavac)
                                    .Include(p=>p.OglasiZadrugari)
                                    .ThenInclude(q=>q.Zadrugar)
                                    .ToListAsync();
        var oglasi2 = oglasi.Where(o=>o.Odobren==true && o.Aktuelan==true && o.OdabraniRadnici==false && o.NapravljenUgovor==false).ToList();
        //trazenje oglasa koji su odobreni i aktuelni kraj

        //trazenje oglasa koji su vezani za datog poslodavca pocetak
        var poslodavac = Context.Poslodavci.Where(p=>p.UserName==username).FirstOrDefault();

        List<Oglas> oglasiPregled = new List<Oglas>();

        oglasi2.ForEach(oglas=>{
            if(oglas.Poslodavac==poslodavac)
                oglasiPregled.Add(oglas);
        });
        //trazenje oglasa koji su vezani za datog poslodavca kraj

        //filtriranje pocetak
        if (grad!="Izaberi grad" && !string.IsNullOrWhiteSpace(grad))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Grad==grad).ToList();
        }
        if (!string.IsNullOrWhiteSpace(datumIzvrsavanja))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.DatumIzvrsavanjaPosla.Year==Convert.ToDateTime(datumIzvrsavanja).Year
                                                    && oglas.DatumIzvrsavanjaPosla.Month==Convert.ToDateTime(datumIzvrsavanja).Month
                                                    && oglas.DatumIzvrsavanjaPosla.Day==Convert.ToDateTime(datumIzvrsavanja).Day).ToList();
        }
        if (tip!="Izaberi tip" && !string.IsNullOrWhiteSpace(tip))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Tip==tip).ToList();
        }
        if (nacinPlacanja!="Izaberi način plaćanja" && !string.IsNullOrWhiteSpace(nacinPlacanja))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.NacinPlacanja==nacinPlacanja).ToList();
        }
        if(!string.IsNullOrWhiteSpace(novacOd))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Novac>=Convert.ToDouble(novacOd)).ToList();
        }
        if(!string.IsNullOrWhiteSpace(novacDo))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Novac<=Convert.ToDouble(novacDo)).ToList();
        }
        //filtriranje kraj

        //sortiranje pocetak (nebitno da li se prvo obavi sortiranje pa ostatak koda ili obrnuto)
        if(!string.IsNullOrWhiteSpace(sortiranje))
        {
            if(sortiranje=="Najnovije")
                oglasiPregled.Sort((a,b)=>b.DatumPostavljanja.CompareTo(a.DatumPostavljanja));
            if(sortiranje=="Naziv A-Z")
                oglasiPregled.Sort((a,b)=>a.Naziv.CompareTo(b.Naziv));
            if(sortiranje=="Naziv Z-A")
                oglasiPregled.Sort((a,b)=>b.Naziv.CompareTo(a.Naziv));
            if(sortiranje=="Novac ↓")
                oglasiPregled.Sort((a,b)=>b.Novac.CompareTo(a.Novac));
            if(sortiranje=="Novac ↑")
                oglasiPregled.Sort((a,b)=>a.Novac.CompareTo(b.Novac));
        }
        //sortiranje kraj

        //pretraga pocetak
        if(!string.IsNullOrWhiteSpace(unosZaPretragu))
        {
            List<Oglas> oglasiPregled2 = new List<Oglas>();
            oglasiPregled.ForEach(oglas=>{
                if(oglas.Naziv.IndexOf(unosZaPretragu)!=-1)
                    oglasiPregled2.Add(oglas);
            });
            return Ok(oglasiPregled2); // ako JE izvrsena pretraga
        }
        //pretraga kraj

        return Ok(oglasiPregled); // ako NIJE izvrsena pretraga
    }

    [Route("PreuzmiSveOglasePoslodavacOdabirRadnikaPretragaSortiranje/{username}/{unosZaPretragu}/{sortiranje}")] // prikaz oglasa poslodavcu za koje treba da izabere radnike
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveOglasePoslodavacOdabirRadnikaPretragaSortiranje(string username, string unosZaPretragu, string sortiranje){

        //trazenje oglasa za koje je potrebno odabrati radnike pocetak
        var oglasi = await Context.Oglasi.Include(p=>p.Zadruga)
                                    .Include(p=>p.Poslodavac)
                                    .Include(p=>p.OglasiZadrugari)
                                    .ThenInclude(q=>q.Zadrugar)
                                    .ToListAsync();
        var oglasi2 = oglasi.Where(o=>o.Odobren==true && o.Aktuelan==false && o.OdabraniRadnici==false && o.NapravljenUgovor==false).ToList();
        //trazenje oglasa za koje je potrebno odabrati radnike napraviti kraj

        //trazenje oglasa koji su vezani za datog poslodavca pocetak
        var poslodavac = Context.Poslodavci.Where(p=>p.UserName==username).FirstOrDefault();

        List<Oglas> oglasiPregled = new List<Oglas>();

        oglasi2.ForEach(oglas=>{
            if(oglas.Poslodavac==poslodavac)
                oglasiPregled.Add(oglas);
        });
        //trazenje oglasa koji su vezani za datog poslodavca kraj
        
        //sortiranje pocetak (nebitno da li se prvo obavi sortiranje pa ostatak koda ili obrnuto)
        if(!string.IsNullOrWhiteSpace(sortiranje))
        {
            if(sortiranje=="Najnovije")
                oglasiPregled.Sort((a,b)=>b.DatumPostavljanja.CompareTo(a.DatumPostavljanja));
            if(sortiranje=="Naziv A-Z")
                oglasiPregled.Sort((a,b)=>a.Naziv.CompareTo(b.Naziv));
            if(sortiranje=="Naziv Z-A")
                oglasiPregled.Sort((a,b)=>b.Naziv.CompareTo(a.Naziv));
            if(sortiranje=="Novac ↓")
                oglasiPregled.Sort((a,b)=>b.Novac.CompareTo(a.Novac));
            if(sortiranje=="Novac ↑")
                oglasiPregled.Sort((a,b)=>a.Novac.CompareTo(b.Novac));
        }
        //sortiranje kraj

        //pretraga pocetak
        if(!string.IsNullOrWhiteSpace(unosZaPretragu))
        {
            List<Oglas> oglasiPregled2 = new List<Oglas>();
            oglasiPregled.ForEach(oglas=>{
                if(oglas.Naziv.IndexOf(unosZaPretragu)!=-1)
                    oglasiPregled2.Add(oglas);
            });
            return Ok(oglasiPregled2); // ako JE izvrsena pretraga
        }
        //pretraga kraj

        return Ok(oglasiPregled); // ako NIJE izvrsena pretraga
    } // treba test

    [Route("PreuzmiSveOglaseZadrugaPravljenjeUgovoraPretragaSortiranje/{username}/{unosZaPretragu}/{sortiranje}")] // zadruzi se prikazuju oglasi za koje treba da se napravi ugovor
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveOglaseZadrugaPravljenjeUgovoraPretragaSortiranje(string username, string unosZaPretragu, string sortiranje){

        //trazenje oglasa za koje je potrebno napraviti ugovor pocetak
        var oglasi = await Context.Oglasi.Include(p=>p.Zadruga)
                                    .Include(p=>p.Poslodavac)
                                    .Include(p=>p.OglasiZadrugari)
                                    .ThenInclude(q=>q.Zadrugar)
                                    .ToListAsync();
        var oglasi2 = oglasi.Where(o=>o.Odobren==true && o.Aktuelan==false && o.OdabraniRadnici==true && o.NapravljenUgovor==false).ToList();
        //trazenje oglasa za koje je potrebno napraviti ugovor kraj

        //trazenje oglasa koji su vezani za datu zadrugu pocetak
        var zadruga = Context.Zadruge.Where(p=>p.UserName==username).FirstOrDefault();

        List<Oglas> oglasiPregled = new List<Oglas>();

        oglasi2.ForEach(oglas=>{
            if(oglas.Zadruga==zadruga)
                oglasiPregled.Add(oglas);
        });
        //trazenje oglasa koji su vezani za datu zadrugu kraj
        
        //sortiranje pocetak (nebitno da li se prvo obavi sortiranje pa ostatak koda ili obrnuto)
        if(!string.IsNullOrWhiteSpace(sortiranje))
        {
            if(sortiranje=="Najnovije")
                oglasiPregled.Sort((a,b)=>b.DatumPostavljanja.CompareTo(a.DatumPostavljanja));
            if(sortiranje=="Naziv A-Z")
                oglasiPregled.Sort((a,b)=>a.Naziv.CompareTo(b.Naziv));
            if(sortiranje=="Naziv Z-A")
                oglasiPregled.Sort((a,b)=>b.Naziv.CompareTo(a.Naziv));
            if(sortiranje=="Novac ↓")
                oglasiPregled.Sort((a,b)=>b.Novac.CompareTo(a.Novac));
            if(sortiranje=="Novac ↑")
                oglasiPregled.Sort((a,b)=>a.Novac.CompareTo(b.Novac));
        }
        //sortiranje kraj

        //pretraga pocetak
        if(!string.IsNullOrWhiteSpace(unosZaPretragu))
        {
            List<Oglas> oglasiPregled2 = new List<Oglas>();
            oglasiPregled.ForEach(oglas=>{
                if(oglas.Naziv.IndexOf(unosZaPretragu)!=-1)
                    oglasiPregled2.Add(oglas);
            });
            return Ok(oglasiPregled2); // ako JE izvrsena pretraga
        }
        //pretraga kraj

        return Ok(oglasiPregled); // ako NIJE izvrsena pretraga
    } // treba test

    [Route("DeaktivirajOglase")] // oglasi za koje je rok za prijavu istekao se postavljaju da nisu vise aktuelni
    [HttpPut]
    public async Task<ActionResult> DeaktivirajOglase(){

        var oglasi = await Context.Oglasi.Include(p=>p.Zadruga)
                                    .Include(p=>p.Poslodavac)
                                    .Include(p=>p.OglasiZadrugari)
                                    .ThenInclude(q=>q.Zadrugar)
                                    .ToListAsync();
        List<Oglas> istekliOglasi = new List<Oglas>();

        oglasi.ForEach(oglas=>{
            if(oglas.Aktuelan==true && oglas.RokZaPrijavu.CompareTo(DateTime.Now)<0){
                oglas.Aktuelan=false;
                Context.Oglasi.Update(oglas);
                istekliOglasi.Add(oglas);
            }
        });
        await Context.SaveChangesAsync();


        if(istekliOglasi.Count!=0)
            return Ok(istekliOglasi);
        else return NoContent();
    }

    //postaviti da su odabraniRadnici=true 
    [Route("OdabraniRadniciOglas/{idOglasa}")] 
    [HttpPut]
    public async Task<ActionResult> OdabraniRadniciOglas(int idOglasa){

        var oglas = await Context.Oglasi.FindAsync(idOglasa);

        oglas.OdabraniRadnici=true;
        Context.Oglasi.Update(oglas);
        await Context.SaveChangesAsync();

        return Ok($"Uspesno odobren oglas sa nazivom: {oglas.Naziv}");
    } // treba test



    [Route("OdobriOglas/{idOglasa}")] // zadruga odobrava oglas
    [HttpPut]
    public async Task<ActionResult> OdobriOglas(int idOglasa){

        var oglas = await Context.Oglasi.FindAsync(idOglasa);

        oglas.Odobren=true;
        oglas.Aktuelan=true;
        Context.Oglasi.Update(oglas);
        await Context.SaveChangesAsync();

        return Ok($"Uspesno odobren oglas sa nazivom: {oglas.Naziv}");
    } // treba test


    [Route("OdbijOglas/{idOglasa}")] // zadruga odbija oglas
    [HttpPut]
    public async Task<ActionResult> OdbijOglas(int idOglasa){

        var oglas = await Context.Oglasi.FindAsync(idOglasa);

        oglas.Odobren=false;
        oglas.Aktuelan=true;
        Context.Oglasi.Update(oglas);
        await Context.SaveChangesAsync();

        return Ok($"Odbijen oglas sa nazivom: {oglas.Naziv}");
    } // treba test

    //postaviti da su odabraniRadnici=true 
    [Route("KreiraniUgovori/{idOglasa}")] 
    [HttpPut]
    public async Task<ActionResult> KreiraniUgovori(int idOglasa){

        var oglas = await Context.Oglasi.FindAsync(idOglasa);

        oglas.NapravljenUgovor=true;
        Context.Oglasi.Update(oglas);
        await Context.SaveChangesAsync();

        return Ok($"Uspesno odobren oglas sa nazivom: {oglas.Naziv}");
    } // treba test

    [Route("IzbrisiPrijavljeneZadrugare/{oglasId}")] // poslodavac bira zadrugare koji ce biti primljeni za posao 1/2
    [HttpDelete]
    public async Task<ActionResult> IzbrisiPrijavljeneZadrugare(int oglasId){

        var oglas = Context.Oglasi.Find(oglasId);

        var olgasiZadrugari = Context.OglasiZadrugari.Where(p=>p.Oglas==oglas).ToList();
        
        foreach (var oglasZadrugar in olgasiZadrugari)
        {
            Context.OglasiZadrugari.Remove(oglasZadrugar);
        }

        await Context.SaveChangesAsync();

        return Ok($"Uspesno izbrisani zadrugari za oglas sa nazivom: {oglas.Naziv}");
    } // treba test

    [Route("OdaberiZadrugare/{oglasId}/{zadrugariIds}")] // poslodavac bira zadrugare koji ce biti primljeni za posao 2/2
    [HttpPost]
    public async Task<ActionResult> OdaberiZadrugare(int oglasId,string zadrugariIds){

        var zadrugariIntIds= zadrugariIds.Split('a')
                                .Where(x=>int.TryParse(x,out _))
                                .Select(int.Parse)
                                .ToList();

        var oglas = Context.Oglasi.Find(oglasId);

        var zadrugari = Context.Zadrugari.Where(p=> zadrugariIntIds.Contains(p.ID)).ToList();

        foreach (var zadrugar in zadrugari)
        {
            OglasZadrugar oz = new OglasZadrugar();
            oz.Oglas=oglas;
            oz.Zadrugar= zadrugar;
            Context.OglasiZadrugari.Add(oz);
        }

        await Context.SaveChangesAsync();

        return Ok($"Uspesno odabrani zadrugari sa id={zadrugariIds}");
    } // treba test

    [Route("PreuzmiSveOglaseZadrugarPregledFiltriranjePretragaSortiranje/{username}/{grad}/{datumIzvrsavanja}/{tip}/{nacinPlacanja}/{novacOd}/{novacDo}/{unosZaPretragu}/{sortiranje}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveOglaseZadrugarPregledFiltriranjePretragaSortiranje(string username, string grad, string datumIzvrsavanja, 
                                                                                                string tip, string nacinPlacanja, string novacOd, string novacDo, 
                                                                                                string unosZaPretragu, string sortiranje){

        //trazenje oglasa koji su odobreni i aktuelni pocetak
        var oglasi = await Context.Oglasi.Include(p=>p.Zadruga)
                                    .Include(p=>p.Poslodavac)
                                    .Include(p=>p.OglasiZadrugari)
                                    .ThenInclude(q=>q.Zadrugar)
                                    .ToListAsync();
        var oglasi2 = oglasi.Where(o=>o.Odobren==true && o.Aktuelan==true && o.OdabraniRadnici==false && o.NapravljenUgovor==false).ToList();
        //trazenje oglasa koji su odobreni i aktuelni kraj

        //trazenje oglasa na koje nije aplicirao zadrugar pocetak
        var zadrugar = Context.Zadrugari.Where(p=>p.UserName==username).FirstOrDefault();

        List<Oglas> oglasiPregled = new List<Oglas>();

        oglasi2.ForEach(oglas=>{
            var i=0;
            oglas.OglasiZadrugari.ForEach(oz=>{
                if(oz.Zadrugar==zadrugar)
                    i++;
            });
            if(i==0)
                oglasiPregled.Add(oglas);
        });
        //trazenje oglasa na koje nije aplicirao zadrugar kraj
        
        //filtriranje pocetak
        if (grad!="Izaberi grad" && !string.IsNullOrWhiteSpace(grad))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Grad==grad).ToList();
        }
        if (!string.IsNullOrWhiteSpace(datumIzvrsavanja))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.DatumIzvrsavanjaPosla.Year==Convert.ToDateTime(datumIzvrsavanja).Year
                                                    && oglas.DatumIzvrsavanjaPosla.Month==Convert.ToDateTime(datumIzvrsavanja).Month
                                                    && oglas.DatumIzvrsavanjaPosla.Day==Convert.ToDateTime(datumIzvrsavanja).Day).ToList();
        }
        if (tip!="Izaberi tip" && !string.IsNullOrWhiteSpace(tip))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Tip==tip).ToList();
        }
        if (nacinPlacanja!="Izaberi način plaćanja" && !string.IsNullOrWhiteSpace(nacinPlacanja))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.NacinPlacanja==nacinPlacanja).ToList();
        }
        if(!string.IsNullOrWhiteSpace(novacOd))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Novac>=Convert.ToDouble(novacOd)).ToList();
        }
        if(!string.IsNullOrWhiteSpace(novacDo))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Novac<=Convert.ToDouble(novacDo)).ToList();
        }
        //filtriranje kraj

        //sortiranje pocetak (nebitno da li se prvo obavi sortiranje pa ostatak koda ili obrnuto)
        if(!string.IsNullOrWhiteSpace(sortiranje))
        {
            if(sortiranje=="Najnovije")
                oglasiPregled.Sort((a,b)=>b.DatumPostavljanja.CompareTo(a.DatumPostavljanja));
            if(sortiranje=="Naziv A-Z")
                oglasiPregled.Sort((a,b)=>a.Naziv.CompareTo(b.Naziv));
            if(sortiranje=="Naziv Z-A")
                oglasiPregled.Sort((a,b)=>b.Naziv.CompareTo(a.Naziv));
            if(sortiranje=="Novac ↓")
                oglasiPregled.Sort((a,b)=>b.Novac.CompareTo(a.Novac));
            if(sortiranje=="Novac ↑")
                oglasiPregled.Sort((a,b)=>a.Novac.CompareTo(b.Novac));
        }
        //sortiranje kraj

        //pretraga pocetak
        if(!string.IsNullOrWhiteSpace(unosZaPretragu))
        {
            List<Oglas> oglasiPregled2 = new List<Oglas>();
            oglasiPregled.ForEach(oglas=>{
                if(oglas.Naziv.IndexOf(unosZaPretragu)!=-1)
                    oglasiPregled2.Add(oglas);
            });
            return Ok(oglasiPregled2); // ako JE izvrsena pretraga
        }
        //pretraga kraj

        return Ok(oglasiPregled); // ako NIJE izvrsena pretraga
    }

    [Route("PreuzmiSveOglaseZadrugarPrijavljeniFiltriranjePretragaSortiranje/{username}/{grad}/{datumIzvrsavanja}/{tip}/{nacinPlacanja}/{novacOd}/{novacDo}/{unosZaPretragu}/{sortiranje}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveOglaseZadrugarPrijavljeniFiltriranjePretragaSortiranje(string username, string grad, string datumIzvrsavanja, 
                                                                                                string tip, string nacinPlacanja, string novacOd, string novacDo, 
                                                                                                string unosZaPretragu, string sortiranje){

        //trazenje oglasa koji su odobreni i aktuelni pocetak
        var oglasi = await Context.Oglasi.Include(p=>p.Zadruga)
                                    .Include(p=>p.Poslodavac)
                                    .Include(p=>p.OglasiZadrugari)
                                    .ThenInclude(q=>q.Zadrugar)
                                    .ToListAsync();
        var oglasi2 = oglasi.Where(o=>o.Odobren==true && o.Aktuelan==true && o.OdabraniRadnici==false && o.NapravljenUgovor==false).ToList();
        //trazenje oglasa koji su odobreni i aktuelni kraj

        //trazenje oglasa na koje je aplicirao zadrugar pocetak
        var zadrugar = Context.Zadrugari.Where(p=>p.UserName==username).FirstOrDefault();

        List<Oglas> oglasiPregled = new List<Oglas>();

        oglasi2.ForEach(oglas=>{
            var i=0;
            oglas.OglasiZadrugari.ForEach(oz=>{
                if(oz.Zadrugar==zadrugar)
                    i++;
            });
            if(i!=0)
                oglasiPregled.Add(oglas);
        });
        //trazenje oglasa na koje nije aplicirao zadrugar kraj
        
        //filtriranje pocetak
        if (grad!="Izaberi grad" && !string.IsNullOrWhiteSpace(grad))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Grad==grad).ToList();
        }
        if (!string.IsNullOrWhiteSpace(datumIzvrsavanja))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.DatumIzvrsavanjaPosla.Year==Convert.ToDateTime(datumIzvrsavanja).Year
                                                    && oglas.DatumIzvrsavanjaPosla.Month==Convert.ToDateTime(datumIzvrsavanja).Month
                                                    && oglas.DatumIzvrsavanjaPosla.Day==Convert.ToDateTime(datumIzvrsavanja).Day).ToList();
        }
        if (tip!="Izaberi tip" && !string.IsNullOrWhiteSpace(tip))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Tip==tip).ToList();
        }
        if (nacinPlacanja!="Izaberi način plaćanja" && !string.IsNullOrWhiteSpace(nacinPlacanja))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.NacinPlacanja==nacinPlacanja).ToList();
        }
        if(!string.IsNullOrWhiteSpace(novacOd))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Novac>=Convert.ToDouble(novacOd)).ToList();
        }
        if(!string.IsNullOrWhiteSpace(novacDo))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Novac<=Convert.ToDouble(novacDo)).ToList();
        }
        //filtriranje kraj

        //sortiranje pocetak (nebitno da li se prvo obavi sortiranje pa ostatak koda ili obrnuto)
        if(!string.IsNullOrWhiteSpace(sortiranje))
        {
            if(sortiranje=="Najnovije")
                oglasiPregled.Sort((a,b)=>b.DatumPostavljanja.CompareTo(a.DatumPostavljanja));
            if(sortiranje=="Naziv A-Z")
                oglasiPregled.Sort((a,b)=>a.Naziv.CompareTo(b.Naziv));
            if(sortiranje=="Naziv Z-A")
                oglasiPregled.Sort((a,b)=>b.Naziv.CompareTo(a.Naziv));
            if(sortiranje=="Novac ↓")
                oglasiPregled.Sort((a,b)=>b.Novac.CompareTo(a.Novac));
            if(sortiranje=="Novac ↑")
                oglasiPregled.Sort((a,b)=>a.Novac.CompareTo(b.Novac));
        }
        //sortiranje kraj

        //pretraga pocetak
        if(!string.IsNullOrWhiteSpace(unosZaPretragu))
        {
            List<Oglas> oglasiPregled2 = new List<Oglas>();
            oglasiPregled.ForEach(oglas=>{
                if(oglas.Naziv.IndexOf(unosZaPretragu)!=-1)
                    oglasiPregled2.Add(oglas);
            });
            return Ok(oglasiPregled2); // ako JE izvrsena pretraga
        }
        //pretraga kraj

        return Ok(oglasiPregled); // ako NIJE izvrsena pretraga
    }

    //brisanje oglasa od strane poslodavca
    [Route("ObrisiOglasPoslodavac/{oglasId}/{poslodavacId}")] 
    [HttpDelete]
    public async Task<ActionResult> ObrisiOglasPoslodavac(int oglasId, int poslodavacId)
    {
        if(oglasId<0){
            return BadRequest("Lose unet id oglasa!");
        }

        try{
            //trazimo oglas ciji je id jednak prosledjenom i gde je kreator tog oglasa(poslodavac) jednak prosledjenom
            var oglas = await Context.Oglasi.Where(o => o.ID==oglasId && o.Poslodavac.ID==poslodavacId).Include(p=>p.OglasiZadrugari).FirstOrDefaultAsync();

            if(oglas!=null){
                foreach (var oz in oglas.OglasiZadrugari)
                {
                    Context.OglasiZadrugari.Remove(oz);
                    await Context.SaveChangesAsync();
                }
                Context.Oglasi.Remove(oglas);
                await Context.SaveChangesAsync();
                return Ok("Oglas uspesno obrisan!");
            }
            else{
                return BadRequest("Oglas nije pronadjen!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
    }

    //poslodavac preuzima oglase koji su jos na validaciji
    [Route("PreuzmiSveOglasePoslodavacPregledPretragaSortiranje/{username}/{unosZaPretragu}/{sortiranje}")] 
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveOglasePoslodavacPregledPretragaSortiranje(string username,string unosZaPretragu, string sortiranje){
        //trazenje oglasa koji nisu odobreni i aktuelni pocetak
        var oglasi = await Context.Oglasi.Include(p=>p.Zadruga)
                                    .Include(p=>p.Poslodavac)
                                    .Include(p=>p.OglasiZadrugari)
                                    .ThenInclude(q=>q.Zadrugar)
                                    .ToListAsync();

        var oglasi2 = oglasi.Where(o=>o.Odobren==false && o.Aktuelan==false && o.OdabraniRadnici==false && o.NapravljenUgovor==false).ToList();

        //trazenje oglasa koji su vezani za datog poslodavca pocetak
        var poslodavac = Context.Poslodavci.Where(p=>p.UserName==username).FirstOrDefault();

        //ovde stavljamo sve oglase koji zadovoljavaju prethodne uslove
        List<Oglas> oglasiPregled = new List<Oglas>();

        //trazenje oglasa koji su vezani za datog poslodavca pocetak
        oglasi2.ForEach(oglas=>{
            if(oglas.Poslodavac==poslodavac)
                oglasiPregled.Add(oglas);
        });
        //trazenje oglasa koji su vezani za datog poslodavca kraj

        //sortiranje pocetak (nebitno da li se prvo obavi sortiranje pa ostatak koda ili obrnuto)
        if(!string.IsNullOrWhiteSpace(sortiranje))
        {
            if(sortiranje=="Najnovije")
                oglasiPregled.Sort((a,b)=>b.DatumPostavljanja.CompareTo(a.DatumPostavljanja));
            if(sortiranje=="Naziv A-Z")
                oglasiPregled.Sort((a,b)=>a.Naziv.CompareTo(b.Naziv));
            if(sortiranje=="Naziv Z-A")
                oglasiPregled.Sort((a,b)=>b.Naziv.CompareTo(a.Naziv));
            if(sortiranje=="Novac ↓")
                oglasiPregled.Sort((a,b)=>b.Novac.CompareTo(a.Novac));
            if(sortiranje=="Novac ↑")
                oglasiPregled.Sort((a,b)=>a.Novac.CompareTo(b.Novac));
        }
        //sortiranje kraj

        //pretraga pocetak
        if(!string.IsNullOrWhiteSpace(unosZaPretragu))
        {
            List<Oglas> oglasiPregled2 = new List<Oglas>();
            oglasiPregled.ForEach(oglas=>{
                if(oglas.Naziv.IndexOf(unosZaPretragu)!=-1)
                    oglasiPregled2.Add(oglas);
            });
            return Ok(oglasiPregled2); // ako JE izvrsena pretraga
        }
        //pretraga kraj

        return Ok(oglasiPregled); // ako NIJE izvrsena pretraga
    }

   

    //brisanje oglasa od strane zadruge
    [Route("ObrisiOglasZadruga/{oglasId}/{zadrugaId}")] 
    [HttpDelete]
    public async Task<ActionResult> ObrisiOglasZadruga(int oglasId, int zadrugaId)
    {
        if(oglasId<0){
            return BadRequest("Lose unet id oglasa!");
        }

        try{
            //trazimo oglas ciji je id jednak prosledjenom i gde je kreator tog oglasa(poslodavac) jednak prosledjenom
            var oglas = await Context.Oglasi.Where(o => o.ID==oglasId && o.Zadruga.ID==zadrugaId).Include(p=>p.OglasiZadrugari).FirstOrDefaultAsync();
            if(oglas!=null){
                foreach (var oz in oglas.OglasiZadrugari)
                {
                    Context.OglasiZadrugari.Remove(oz);
                    await Context.SaveChangesAsync();
                }
                Context.Oglasi.Remove(oglas);
                await Context.SaveChangesAsync();
                return Ok("Oglas uspesno obrisan!");
            }
            else{
                return BadRequest("Oglas nije pronadjen!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
    }



    // ---------------------------------------------------------------- !!! STRANICE !!! ---------------------------------------------------------------- //

    [Route("PreuzmiSveOglaseZadrugarPregledFiltriranjePretragaSortiranjeStranica/{username}/{grad}/{datumIzvrsavanja}/{tip}/{nacinPlacanja}/{novacOd}/{novacDo}/{unosZaPretragu}/{sortiranje}/{stranica}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveOglaseZadrugarPregledFiltriranjePretragaSortiranjeStranica(string username, string grad, string datumIzvrsavanja, 
                                                                                                string tip, string nacinPlacanja, string novacOd, string novacDo, 
                                                                                                string unosZaPretragu, string sortiranje, int stranica){

        //trazenje oglasa koji su odobreni i aktuelni pocetak
        var oglasi = await Context.Oglasi.Include(p=>p.Zadruga)
                                    .Include(p=>p.Poslodavac)
                                    .Include(p=>p.OglasiZadrugari)
                                    .ThenInclude(q=>q.Zadrugar)
                                    .ToListAsync();
        var oglasi2 = oglasi.Where(o=>o.Odobren==true && o.Aktuelan==true && o.OdabraniRadnici==false && o.NapravljenUgovor==false).ToList();
        //trazenje oglasa koji su odobreni i aktuelni kraj

        //trazenje oglasa na koje nije aplicirao zadrugar pocetak
        var zadrugar = Context.Zadrugari.Where(p=>p.UserName==username).FirstOrDefault();

        List<Oglas> oglasiPregled = new List<Oglas>();

        oglasi2.ForEach(oglas=>{
            var i=0;
            oglas.OglasiZadrugari.ForEach(oz=>{
                if(oz.Zadrugar==zadrugar)
                    i++;
            });
            if(i==0)
                oglasiPregled.Add(oglas);
        });
        //trazenje oglasa na koje nije aplicirao zadrugar kraj
        
        //filtriranje pocetak
        if (grad!="Izaberi grad" && !string.IsNullOrWhiteSpace(grad))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Grad==grad).ToList();
        }
        if (!string.IsNullOrWhiteSpace(datumIzvrsavanja))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.DatumIzvrsavanjaPosla.Year==Convert.ToDateTime(datumIzvrsavanja).Year
                                                    && oglas.DatumIzvrsavanjaPosla.Month==Convert.ToDateTime(datumIzvrsavanja).Month
                                                    && oglas.DatumIzvrsavanjaPosla.Day==Convert.ToDateTime(datumIzvrsavanja).Day).ToList();
        }
        if (tip!="Izaberi tip" && !string.IsNullOrWhiteSpace(tip))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Tip==tip).ToList();
        }
        if (nacinPlacanja!="Izaberi način plaćanja" && !string.IsNullOrWhiteSpace(nacinPlacanja))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.NacinPlacanja==nacinPlacanja).ToList();
        }
        if(!string.IsNullOrWhiteSpace(novacOd))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Novac>=Convert.ToDouble(novacOd)).ToList();
        }
        if(!string.IsNullOrWhiteSpace(novacDo))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Novac<=Convert.ToDouble(novacDo)).ToList();
        }
        //filtriranje kraj

        //sortiranje pocetak (nebitno da li se prvo obavi sortiranje pa ostatak koda ili obrnuto)
        if(!string.IsNullOrWhiteSpace(sortiranje))
        {
            if(sortiranje=="Najnovije")
                oglasiPregled.Sort((a,b)=>b.DatumPostavljanja.CompareTo(a.DatumPostavljanja));
            if(sortiranje=="Naziv A-Z")
                oglasiPregled.Sort((a,b)=>a.Naziv.CompareTo(b.Naziv));
            if(sortiranje=="Naziv Z-A")
                oglasiPregled.Sort((a,b)=>b.Naziv.CompareTo(a.Naziv));
            if(sortiranje=="Novac ↓")
                oglasiPregled.Sort((a,b)=>b.Novac.CompareTo(a.Novac));
            if(sortiranje=="Novac ↑")
                oglasiPregled.Sort((a,b)=>a.Novac.CompareTo(b.Novac));
        }
        //sortiranje kraj
        var najmanjaCenaOglasa = 9999999.0;
        var najvecaCenaOglasa = 0.0;
        List<Oglas> oglasi5 = new List<Oglas>(); // vracaju se 10 oglasa u okviru odgovarajuce otvorene stranice (funkcionalnost 1.1 i 1.2)

        //pretraga pocetak
        if(!string.IsNullOrWhiteSpace(unosZaPretragu))
        {
            List<Oglas> oglasiPregled2 = new List<Oglas>();
            oglasiPregled.ForEach(oglas=>{
                if(oglas.Naziv.IndexOf(unosZaPretragu)!=-1)
                {
                    oglasiPregled2.Add(oglas);
                    if(najmanjaCenaOglasa > oglas.Novac)
                        najmanjaCenaOglasa = oglas.Novac;
                    if(najvecaCenaOglasa < oglas.Novac)
                        najvecaCenaOglasa = oglas.Novac;
                }
            });

            foreach (var o in oglasiPregled2.Select((oglas, index) => new { index, oglas })) // funkcionalnost 1.1
            {
                if(o.index>=stranica*5 && o.index<stranica*5+5)
                    if(o.oglas!=null)
                        oglasi5.Add(o.oglas);
            }

            return Ok(new {
                oglasi5,
                brojOglasa = oglasiPregled2.Count,
                najmanjaCenaOglasa,
                najvecaCenaOglasa
            }); // ako JE izvrsena pretraga
        }
        //pretraga kraj
        
        foreach (var o in oglasiPregled.Select((oglas, index) => new { index, oglas })) // funkcionalnost 1.2
        {
            if(najmanjaCenaOglasa > o.oglas.Novac)
                        najmanjaCenaOglasa = o.oglas.Novac;
            if(najvecaCenaOglasa < o.oglas.Novac)
                najvecaCenaOglasa = o.oglas.Novac;
            if(o.index>=stranica*5 && o.index<stranica*5+5)
                if(o.oglas!=null)
                    oglasi5.Add(o.oglas);
                    
        }

        return Ok(new {
            oglasi5,
            brojOglasa = oglasiPregled.Count,
            najmanjaCenaOglasa,
            najvecaCenaOglasa
        }); // ako NIJE izvrsena pretraga
    }

    [Route("proba/{stranica}")]
    [HttpGet]
    public async Task<ActionResult> proba(int stranica){

        //trazenje oglasa koji su odobreni i aktuelni pocetak
        var oglasi = await Context.Oglasi.Include(p=>p.Zadruga)
                                    .Include(p=>p.Poslodavac)
                                    .Include(p=>p.OglasiZadrugari)
                                    .ThenInclude(q=>q.Zadrugar)
                                    .ToListAsync();
        
        List<Oglas> oglasi10 = new List<Oglas>();
        foreach (var o in oglasi.Select((oglas, index) => new { index, oglas }))
        {
            if(o.index>=stranica && o.index<stranica+3)
                if(o.oglas!=null)
                    oglasi10.Add(o.oglas);
        }

        return Ok(oglasi10); // ako NIJE izvrsena pretraga
    }

    [Route("PreuzmiSveOglaseZadrugaOdobravanjePretragaSortiranjeStranica/{username}/{unosZaPretragu}/{sortiranje}/{stranica}")] // zadruga - lista oglasa za koje treba da odluci da li ce ih prihvatiti ili odbiti
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveOglaseZadrugaOdobravanjePretragaSortiranjeStranica(string username, string unosZaPretragu, string sortiranje, int stranica){

        //trazenje oglasa za koje se ceka odgovor (prihvatanje/odbijanje) pocetak
        var oglasi = await Context.Oglasi.Include(p=>p.Zadruga)
                                    .Include(p=>p.Poslodavac)
                                    .Include(p=>p.OglasiZadrugari)
                                    .ThenInclude(q=>q.Zadrugar)
                                    .ToListAsync();
        var oglasi2 = oglasi.Where(o=>o.Odobren==false && o.Aktuelan==false && o.OdabraniRadnici==false && o.NapravljenUgovor==false).ToList();
        //trazenje oglasa za koje se ceka odgovor (prihvatanje/odbijanje) kraj

        //trazenje oglasa koji su vezani za datu zadrugu pocetak
        var zadruga = Context.Zadruge.Where(p=>p.UserName==username).FirstOrDefault();

        List<Oglas> oglasiPregled = new List<Oglas>();

        oglasi2.ForEach(oglas=>{
            if(oglas.Zadruga==zadruga)
                oglasiPregled.Add(oglas);
        });
        //trazenje oglasa koji su vezani za datu zadrugu kraj
        
        //sortiranje pocetak (nebitno da li se prvo obavi sortiranje pa ostatak koda ili obrnuto)
        if(!string.IsNullOrWhiteSpace(sortiranje))
        {
            if(sortiranje=="Najnovije")
                oglasiPregled.Sort((a,b)=>b.DatumPostavljanja.CompareTo(a.DatumPostavljanja));
            if(sortiranje=="Naziv A-Z")
                oglasiPregled.Sort((a,b)=>a.Naziv.CompareTo(b.Naziv));
            if(sortiranje=="Naziv Z-A")
                oglasiPregled.Sort((a,b)=>b.Naziv.CompareTo(a.Naziv));
            if(sortiranje=="Novac ↓")
                oglasiPregled.Sort((a,b)=>b.Novac.CompareTo(a.Novac));
            if(sortiranje=="Novac ↑")
                oglasiPregled.Sort((a,b)=>a.Novac.CompareTo(b.Novac));
        }
        //sortiranje kraj
        var najmanjaCenaOglasa = 9999999.0;
        var najvecaCenaOglasa = 0.0;
        List<Oglas> oglasi5 = new List<Oglas>(); // vracaju se 10 oglasa u okviru odgovarajuce otvorene stranice (funkcionalnost 1.1 i 1.2)

        //pretraga pocetak
        if(!string.IsNullOrWhiteSpace(unosZaPretragu))
        {
            List<Oglas> oglasiPregled2 = new List<Oglas>();
            oglasiPregled.ForEach(oglas=>{
                if(oglas.Naziv.IndexOf(unosZaPretragu)!=-1)
                {
                    oglasiPregled2.Add(oglas);
                    if(najmanjaCenaOglasa > oglas.Novac)
                        najmanjaCenaOglasa = oglas.Novac;
                    if(najvecaCenaOglasa < oglas.Novac)
                        najvecaCenaOglasa = oglas.Novac;
                }
            });

            foreach (var o in oglasiPregled2.Select((oglas, index) => new { index, oglas })) // funkcionalnost 1.1
            {
                if(o.index>=stranica*5 && o.index<stranica*5+5)
                    if(o.oglas!=null)
                        oglasi5.Add(o.oglas);
            }

            return Ok(new {
                oglasi5,
                brojOglasa = oglasiPregled2.Count,
                najmanjaCenaOglasa,
                najvecaCenaOglasa
            }); // ako JE izvrsena pretraga
        }
        //pretraga kraj

        foreach (var o in oglasiPregled.Select((oglas, index) => new { index, oglas })) // funkcionalnost 1.2
        {
            if(najmanjaCenaOglasa > o.oglas.Novac)
                        najmanjaCenaOglasa = o.oglas.Novac;
            if(najvecaCenaOglasa < o.oglas.Novac)
                najvecaCenaOglasa = o.oglas.Novac;
            if(o.index>=stranica*5 && o.index<stranica*5+5)
                if(o.oglas!=null)
                    oglasi5.Add(o.oglas);
                    
        }

        return Ok(new {
            oglasi5,
            brojOglasa = oglasiPregled.Count,
            najmanjaCenaOglasa,
            najvecaCenaOglasa
        }); // ako NIJE izvrsena pretraga
    } // treba test

    [Route("PreuzmiSveOglasePoslodavacPregledNeodobrenihPretragaSortiranjeStranica/{username}/{unosZaPretragu}/{sortiranje}/{stranica}")] // poslodavcu se prikazuju oglasi koji nisu odobreni od strane zadruge
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveOglasePoslodavacPregledNeodobrenihPretragaSortiranjeStranica(string username, string unosZaPretragu, string sortiranje, int stranica){

        //trazenje oglasa koji su nisu odobreni od strane zadruge pocetak
        var oglasi = await Context.Oglasi.Include(p=>p.Zadruga)
                                    .Include(p=>p.Poslodavac)
                                    .Include(p=>p.OglasiZadrugari)
                                    .ThenInclude(q=>q.Zadrugar)
                                    .ToListAsync();
        var oglasi2 = oglasi.Where(o=>o.Odobren==false && o.Aktuelan==true && o.OdabraniRadnici==false && o.NapravljenUgovor==false).ToList();
        //trazenje oglasa koji su nisu odobreni od strane zadruge kraj

        //trazenje oglasa koji su vezani za datog poslodavca pocetak
        var poslodavac = Context.Poslodavci.Where(p=>p.UserName==username).FirstOrDefault();

        List<Oglas> oglasiPregled = new List<Oglas>();

        oglasi2.ForEach(oglas=>{
            if(oglas.Poslodavac==poslodavac)
                oglasiPregled.Add(oglas);
        });
        //trazenje oglasa koji su vezani za datog poslodavca kraj
        
        //sortiranje pocetak (nebitno da li se prvo obavi sortiranje pa ostatak koda ili obrnuto)
        if(!string.IsNullOrWhiteSpace(sortiranje))
        {
            if(sortiranje=="Najnovije")
                oglasiPregled.Sort((a,b)=>b.DatumPostavljanja.CompareTo(a.DatumPostavljanja));
            if(sortiranje=="Naziv A-Z")
                oglasiPregled.Sort((a,b)=>a.Naziv.CompareTo(b.Naziv));
            if(sortiranje=="Naziv Z-A")
                oglasiPregled.Sort((a,b)=>b.Naziv.CompareTo(a.Naziv));
            if(sortiranje=="Novac ↓")
                oglasiPregled.Sort((a,b)=>b.Novac.CompareTo(a.Novac));
            if(sortiranje=="Novac ↑")
                oglasiPregled.Sort((a,b)=>a.Novac.CompareTo(b.Novac));
        }
        //sortiranje kraj
       
        List<Oglas> oglasi5 = new List<Oglas>(); // vracaju se 10 oglasa u okviru odgovarajuce otvorene stranice (funkcionalnost 1.1 i 1.2)

        //pretraga pocetak
        if(!string.IsNullOrWhiteSpace(unosZaPretragu))
        {
            List<Oglas> oglasiPregled2 = new List<Oglas>();
            oglasiPregled.ForEach(oglas=>{
                if(oglas.Naziv.IndexOf(unosZaPretragu)!=-1)
                {
                    oglasiPregled2.Add(oglas);
                }
            });
            
            oglasiPregled2.Sort((a,b)=>b.DatumPostavljanja.CompareTo(a.DatumPostavljanja));//sortiramo da najnoviji odbijeni budu prvi

            foreach (var o in oglasiPregled2.Select((oglas, index) => new { index, oglas })) // funkcionalnost 1.1
            {
                if(o.index>=stranica*5 && o.index<stranica*5+5)
                    if(o.oglas!=null)
                        oglasi5.Add(o.oglas);
            }

            return Ok(new {
                oglasi5,
                brojOglasa = oglasiPregled2.Count
            }); // ako JE izvrsena pretraga
        }
        //pretraga kraj
        
        oglasiPregled.Sort((a,b)=>b.DatumPostavljanja.CompareTo(a.DatumPostavljanja));//sortiramo da najnoviji odbijeni budu prvi
        foreach (var o in oglasiPregled.Select((oglas, index) => new { index, oglas })) // funkcionalnost 1.2
        {
           
            if(o.index>=stranica*5 && o.index<stranica*5+5)
                if(o.oglas!=null)
                    oglasi5.Add(o.oglas);
                    
        }

        return Ok(new {
            oglasi5,
            brojOglasa = oglasiPregled.Count
        }); // ako NIJE izvrsena pretraga
    } // treba test

    [Route("PreuzmiSveOglaseZadrugaPregledFiltriranjePretragaSortiranjeStranica/{username}/{grad}/{datumIzvrsavanja}/{tip}/{nacinPlacanja}/{novacOd}/{novacDo}/{unosZaPretragu}/{sortiranje}/{stranica}")] // zadrugzi se prikazuju oglasi koje je odobrila
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveOglaseZadrugaPregledFiltriranjePretragaSortiranjeStranica(string username, string grad, string datumIzvrsavanja, 
                                                                string tip, string nacinPlacanja, string novacOd, string novacDo, 
                                                                string unosZaPretragu, string sortiranje, int stranica){

        //trazenje oglasa koji su odobreni i za koje nije napravljen ugovor pocetak
        var oglasi = await Context.Oglasi.Include(p=>p.Zadruga)
                                    .Include(p=>p.Poslodavac)
                                    .Include(p=>p.OglasiZadrugari)
                                    .ThenInclude(q=>q.Zadrugar)
                                    .ToListAsync();
        var oglasi2 = oglasi.Where(o=>o.Odobren==true && o.NapravljenUgovor==false).ToList();
        //trazenje oglasa koji su odobreni i za koje nije napravljen ugovor kraj

        //trazenje oglasa koji su vezani za datu zadrugu pocetak
        var zadruga = Context.Zadruge.Where(p=>p.UserName==username).FirstOrDefault();

        List<Oglas> oglasiPregled = new List<Oglas>();

        oglasi2.ForEach(oglas=>{
            if(oglas.Zadruga==zadruga)
                oglasiPregled.Add(oglas);
        });
        //trazenje oglasa koji su vezani za datu zadrugu kraj
        
        //filtriranje pocetak
        if (grad!="Izaberi grad" && !string.IsNullOrWhiteSpace(grad))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Grad==grad).ToList();
        }
        if (!string.IsNullOrWhiteSpace(datumIzvrsavanja))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.DatumIzvrsavanjaPosla.Year==Convert.ToDateTime(datumIzvrsavanja).Year
                                                    && oglas.DatumIzvrsavanjaPosla.Month==Convert.ToDateTime(datumIzvrsavanja).Month
                                                    && oglas.DatumIzvrsavanjaPosla.Day==Convert.ToDateTime(datumIzvrsavanja).Day).ToList();
        }
        if (tip!="Izaberi tip" && !string.IsNullOrWhiteSpace(tip))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Tip==tip).ToList();
        }
        if (nacinPlacanja!="Izaberi način plaćanja" && !string.IsNullOrWhiteSpace(nacinPlacanja))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.NacinPlacanja==nacinPlacanja).ToList();
        }
        if(!string.IsNullOrWhiteSpace(novacOd))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Novac>=Convert.ToDouble(novacOd)).ToList();
        }
        if(!string.IsNullOrWhiteSpace(novacDo))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Novac<=Convert.ToDouble(novacDo)).ToList();
        }
        //filtriranje kraj

        //sortiranje pocetak (nebitno da li se prvo obavi sortiranje pa ostatak koda ili obrnuto)
        if(!string.IsNullOrWhiteSpace(sortiranje))
        {
            if(sortiranje=="Najnovije")
                oglasiPregled.Sort((a,b)=>b.DatumPostavljanja.CompareTo(a.DatumPostavljanja));
            if(sortiranje=="Naziv A-Z")
                oglasiPregled.Sort((a,b)=>a.Naziv.CompareTo(b.Naziv));
            if(sortiranje=="Naziv Z-A")
                oglasiPregled.Sort((a,b)=>b.Naziv.CompareTo(a.Naziv));
            if(sortiranje=="Novac ↓")
                oglasiPregled.Sort((a,b)=>b.Novac.CompareTo(a.Novac));
            if(sortiranje=="Novac ↑")
                oglasiPregled.Sort((a,b)=>a.Novac.CompareTo(b.Novac));
        }
        //sortiranje kraj
        var najmanjaCenaOglasa = 9999999.0;
        var najvecaCenaOglasa = 0.0;
        List<Oglas> oglasi5 = new List<Oglas>(); // vracaju se 10 oglasa u okviru odgovarajuce otvorene stranice (funkcionalnost 1.1 i 1.2)

        //pretraga pocetak
        if(!string.IsNullOrWhiteSpace(unosZaPretragu))
        {
            List<Oglas> oglasiPregled2 = new List<Oglas>();
            oglasiPregled.ForEach(oglas=>{
                if(oglas.Naziv.IndexOf(unosZaPretragu)!=-1)
                {
                    oglasiPregled2.Add(oglas);
                    if(najmanjaCenaOglasa > oglas.Novac)
                        najmanjaCenaOglasa = oglas.Novac;
                    if(najvecaCenaOglasa < oglas.Novac)
                        najvecaCenaOglasa = oglas.Novac;
                }
            });

            foreach (var o in oglasiPregled2.Select((oglas, index) => new { index, oglas })) // funkcionalnost 1.1
            {
                if(o.index>=stranica*5 && o.index<stranica*5+5)
                    if(o.oglas!=null)
                        oglasi5.Add(o.oglas);
            }

            return Ok(new {
                oglasi5,
                brojOglasa = oglasiPregled2.Count,
                najmanjaCenaOglasa,
                najvecaCenaOglasa
            }); // ako JE izvrsena pretraga
        }
        //pretraga kraj

        foreach (var o in oglasiPregled.Select((oglas, index) => new { index, oglas })) // funkcionalnost 1.2
        {
            if(najmanjaCenaOglasa > o.oglas.Novac)
                        najmanjaCenaOglasa = o.oglas.Novac;
            if(najvecaCenaOglasa < o.oglas.Novac)
                najvecaCenaOglasa = o.oglas.Novac;
            if(o.index>=stranica*5 && o.index<stranica*5+5)
                if(o.oglas!=null)
                    oglasi5.Add(o.oglas);
                    
        }

        return Ok(new {
            oglasi5,
            brojOglasa = oglasiPregled.Count,
            najmanjaCenaOglasa,
            najvecaCenaOglasa
        }); // ako NIJE izvrsena pretraga
    }

    [Route("PreuzmiSveOglasePoslodavacPregledFiltriranjePretragaSortiranjeStranica/{username}/{grad}/{datumIzvrsavanja}/{tip}/{nacinPlacanja}/{novacOd}/{novacDo}/{unosZaPretragu}/{sortiranje}/{stranica}")] // poslodavcu se prikazuju oglasi koji su aktuelni i odobreni
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveOglasePoslodavacPregledFiltriranjePretragaSortiranjeStranica(string username, string grad, string datumIzvrsavanja, 
                                                                                                string tip, string nacinPlacanja, string novacOd, string novacDo, 
                                                                                                string unosZaPretragu, string sortiranje, int stranica){
        //trazenje oglasa koji su odobreni i aktuelni pocetak
        var oglasi = await Context.Oglasi.Include(p=>p.Zadruga)
                                    .Include(p=>p.Poslodavac)
                                    .Include(p=>p.OglasiZadrugari)
                                    .ThenInclude(q=>q.Zadrugar)
                                    .ToListAsync();
        var oglasi2 = oglasi.Where(o=>o.Odobren==true && o.Aktuelan==true && o.OdabraniRadnici==false && o.NapravljenUgovor==false).ToList();
        //trazenje oglasa koji su odobreni i aktuelni kraj

        //trazenje oglasa koji su vezani za datog poslodavca pocetak
        var poslodavac = Context.Poslodavci.Where(p=>p.UserName==username).FirstOrDefault();

        List<Oglas> oglasiPregled = new List<Oglas>();

        oglasi2.ForEach(oglas=>{
            if(oglas.Poslodavac==poslodavac)
                oglasiPregled.Add(oglas);
        });
        //trazenje oglasa koji su vezani za datog poslodavca kraj

        //filtriranje pocetak
        if (grad!="Izaberi grad" && !string.IsNullOrWhiteSpace(grad))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Grad==grad).ToList();
        }
        if (!string.IsNullOrWhiteSpace(datumIzvrsavanja))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.DatumIzvrsavanjaPosla.Year==Convert.ToDateTime(datumIzvrsavanja).Year
                                                    && oglas.DatumIzvrsavanjaPosla.Month==Convert.ToDateTime(datumIzvrsavanja).Month
                                                    && oglas.DatumIzvrsavanjaPosla.Day==Convert.ToDateTime(datumIzvrsavanja).Day).ToList();
        }
        if (tip!="Izaberi tip" && !string.IsNullOrWhiteSpace(tip))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Tip==tip).ToList();
        }
        if (nacinPlacanja!="Izaberi način plaćanja" && !string.IsNullOrWhiteSpace(nacinPlacanja))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.NacinPlacanja==nacinPlacanja).ToList();
        }
        if(!string.IsNullOrWhiteSpace(novacOd))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Novac>=Convert.ToDouble(novacOd)).ToList();
        }
        if(!string.IsNullOrWhiteSpace(novacDo))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Novac<=Convert.ToDouble(novacDo)).ToList();
        }
        //filtriranje kraj

        //sortiranje pocetak (nebitno da li se prvo obavi sortiranje pa ostatak koda ili obrnuto)
        if(!string.IsNullOrWhiteSpace(sortiranje))
        {
            if(sortiranje=="Najnovije")
                oglasiPregled.Sort((a,b)=>b.DatumPostavljanja.CompareTo(a.DatumPostavljanja));
            if(sortiranje=="Naziv A-Z")
                oglasiPregled.Sort((a,b)=>a.Naziv.CompareTo(b.Naziv));
            if(sortiranje=="Naziv Z-A")
                oglasiPregled.Sort((a,b)=>b.Naziv.CompareTo(a.Naziv));
            if(sortiranje=="Novac ↓")
                oglasiPregled.Sort((a,b)=>b.Novac.CompareTo(a.Novac));
            if(sortiranje=="Novac ↑")
                oglasiPregled.Sort((a,b)=>a.Novac.CompareTo(b.Novac));
        }
        //sortiranje kraj
        var najmanjaCenaOglasa = 9999999.0;
        var najvecaCenaOglasa = 0.0;
        List<Oglas> oglasi5 = new List<Oglas>(); // vracaju se 10 oglasa u okviru odgovarajuce otvorene stranice (funkcionalnost 1.1 i 1.2)

        //pretraga pocetak
        if(!string.IsNullOrWhiteSpace(unosZaPretragu))
        {
            List<Oglas> oglasiPregled2 = new List<Oglas>();
            oglasiPregled.ForEach(oglas=>{
                if(oglas.Naziv.IndexOf(unosZaPretragu)!=-1)
                {
                    oglasiPregled2.Add(oglas);
                    if(najmanjaCenaOglasa > oglas.Novac)
                        najmanjaCenaOglasa = oglas.Novac;
                    if(najvecaCenaOglasa < oglas.Novac)
                        najvecaCenaOglasa = oglas.Novac;
                }
            });

            foreach (var o in oglasiPregled2.Select((oglas, index) => new { index, oglas })) // funkcionalnost 1.1
            {
                if(o.index>=stranica*5 && o.index<stranica*5+5)
                    if(o.oglas!=null)
                        oglasi5.Add(o.oglas);
            }

            return Ok(new {
                oglasi5,
                brojOglasa = oglasiPregled2.Count,
                najmanjaCenaOglasa,
                najvecaCenaOglasa
            }); // ako JE izvrsena pretraga
        }
        //pretraga kraj
        
        foreach (var o in oglasiPregled.Select((oglas, index) => new { index, oglas })) // funkcionalnost 1.2
        {
            if(najmanjaCenaOglasa > o.oglas.Novac)
                        najmanjaCenaOglasa = o.oglas.Novac;
            if(najvecaCenaOglasa < o.oglas.Novac)
                najvecaCenaOglasa = o.oglas.Novac;
            if(o.index>=stranica*5 && o.index<stranica*5+5)
                if(o.oglas!=null)
                    oglasi5.Add(o.oglas);
                    
        }

        return Ok(new {
            oglasi5,
            brojOglasa = oglasiPregled.Count,
            najmanjaCenaOglasa,
            najvecaCenaOglasa
        }); // ako NIJE izvrsena pretraga
    }

    [Route("PreuzmiSveOglasePoslodavacOdabirRadnikaPretragaSortiranjeStranica/{username}/{unosZaPretragu}/{sortiranje}/{stranica}")] // prikaz oglasa poslodavcu za koje treba da izabere radnike
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveOglasePoslodavacOdabirRadnikaPretragaSortiranjeStranica(string username, string unosZaPretragu, string sortiranje, int stranica){

        //trazenje oglasa za koje je potrebno odabrati radnike pocetak
        var oglasi = await Context.Oglasi.Include(p=>p.Zadruga)
                                    .Include(p=>p.Poslodavac)
                                    .Include(p=>p.OglasiZadrugari)
                                    .ThenInclude(q=>q.Zadrugar)
                                    .ToListAsync();
        var oglasi2 = oglasi.Where(o=>o.Odobren==true && o.Aktuelan==false && o.OdabraniRadnici==false && o.NapravljenUgovor==false).ToList();
        //trazenje oglasa za koje je potrebno odabrati radnike napraviti kraj

        //trazenje oglasa koji su vezani za datog poslodavca pocetak
        var poslodavac = Context.Poslodavci.Where(p=>p.UserName==username).FirstOrDefault();

        List<Oglas> oglasiPregled = new List<Oglas>();

        oglasi2.ForEach(oglas=>{
            if(oglas.Poslodavac==poslodavac)
                oglasiPregled.Add(oglas);
        });
        //trazenje oglasa koji su vezani za datog poslodavca kraj
        
        //sortiranje pocetak (nebitno da li se prvo obavi sortiranje pa ostatak koda ili obrnuto)
        if(!string.IsNullOrWhiteSpace(sortiranje))
        {
            if(sortiranje=="Najnovije")
                oglasiPregled.Sort((a,b)=>b.DatumPostavljanja.CompareTo(a.DatumPostavljanja));
            if(sortiranje=="Naziv A-Z")
                oglasiPregled.Sort((a,b)=>a.Naziv.CompareTo(b.Naziv));
            if(sortiranje=="Naziv Z-A")
                oglasiPregled.Sort((a,b)=>b.Naziv.CompareTo(a.Naziv));
            if(sortiranje=="Novac ↓")
                oglasiPregled.Sort((a,b)=>b.Novac.CompareTo(a.Novac));
            if(sortiranje=="Novac ↑")
                oglasiPregled.Sort((a,b)=>a.Novac.CompareTo(b.Novac));
        }
        //sortiranje kraj

        var najmanjaCenaOglasa = 9999999.0;
        var najvecaCenaOglasa = 0.0;
        List<Oglas> oglasi5 = new List<Oglas>(); // vracaju se 5 oglasa u okviru odgovarajuce otvorene stranice (funkcionalnost 1.1 i 1.2)

        //pretraga pocetak
        if(!string.IsNullOrWhiteSpace(unosZaPretragu))
        {
            List<Oglas> oglasiPregled2 = new List<Oglas>();
            oglasiPregled.ForEach(oglas=>{
                if(oglas.Naziv.IndexOf(unosZaPretragu)!=-1)
                {
                    oglasiPregled2.Add(oglas);
                    if(najmanjaCenaOglasa > oglas.Novac)
                        najmanjaCenaOglasa = oglas.Novac;
                    if(najvecaCenaOglasa < oglas.Novac)
                        najvecaCenaOglasa = oglas.Novac;
                }
            });

            foreach (var o in oglasiPregled2.Select((oglas, index) => new { index, oglas })) // funkcionalnost 1.1
            {
                if(o.index>=stranica*5 && o.index<stranica*5+5)
                    if(o.oglas!=null)
                        oglasi5.Add(o.oglas);
            }

            return Ok(new {
                oglasi5,
                brojOglasa = oglasiPregled2.Count,
                najmanjaCenaOglasa,
                najvecaCenaOglasa
            }); // ako JE izvrsena pretraga
        }
        //pretraga kraj
        
        foreach (var o in oglasiPregled.Select((oglas, index) => new { index, oglas })) // funkcionalnost 1.2
        {
            if(najmanjaCenaOglasa > o.oglas.Novac)
                        najmanjaCenaOglasa = o.oglas.Novac;
            if(najvecaCenaOglasa < o.oglas.Novac)
                najvecaCenaOglasa = o.oglas.Novac;
            if(o.index>=stranica*5 && o.index<stranica*5+5)
                if(o.oglas!=null)
                    oglasi5.Add(o.oglas);
                    
        }

        return Ok(new {
            oglasi5,
            brojOglasa = oglasiPregled.Count,
            najmanjaCenaOglasa,
            najvecaCenaOglasa
        }); // ako NIJE izvrsena pretraga
    } // treba test

    [Route("PreuzmiSveOglaseZadrugaPravljenjeUgovoraPretragaSortiranjeStranica/{username}/{unosZaPretragu}/{sortiranje}/{stranica}")] // zadruzi se prikazuju oglasi za koje treba da se napravi ugovor
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveOglaseZadrugaPravljenjeUgovoraPretragaSortiranjeStranica(string username, string unosZaPretragu, string sortiranje, int stranica){

        //trazenje oglasa za koje je potrebno napraviti ugovor pocetak
        var oglasi = await Context.Oglasi.Include(p=>p.Zadruga)
                                    .Include(p=>p.Poslodavac)
                                    .Include(p=>p.OglasiZadrugari)
                                    .ThenInclude(q=>q.Zadrugar)
                                    .ToListAsync();

        var oglasi2 =  oglasi.Where(o=>o.Odobren==true && o.Aktuelan==false && o.OdabraniRadnici==true && o.NapravljenUgovor==false).ToList();
        //trazenje oglasa za koje je potrebno napraviti ugovor kraj

        //trazenje oglasa koji su vezani za datu zadrugu pocetak
        var zadruga = Context.Zadruge.Where(p=>p.UserName==username).FirstOrDefault();

        List<Oglas> oglasiPregled = new List<Oglas>();

        oglasi2.ForEach(oglas=>{
            if(oglas.Zadruga==zadruga)
                oglasiPregled.Add(oglas);
        });
        //trazenje oglasa koji su vezani za datu zadrugu kraj
        
        //sortiranje pocetak (nebitno da li se prvo obavi sortiranje pa ostatak koda ili obrnuto)
        if(!string.IsNullOrWhiteSpace(sortiranje))
        {
            if(sortiranje=="Najnovije")
                oglasiPregled.Sort((a,b)=>b.DatumPostavljanja.CompareTo(a.DatumPostavljanja));
            if(sortiranje=="Naziv A-Z")
                oglasiPregled.Sort((a,b)=>a.Naziv.CompareTo(b.Naziv));
            if(sortiranje=="Naziv Z-A")
                oglasiPregled.Sort((a,b)=>b.Naziv.CompareTo(a.Naziv));
            if(sortiranje=="Novac ↓")
                oglasiPregled.Sort((a,b)=>b.Novac.CompareTo(a.Novac));
            if(sortiranje=="Novac ↑")
                oglasiPregled.Sort((a,b)=>a.Novac.CompareTo(b.Novac));
        }
        //sortiranje kraj

        List<Oglas> oglasi5 = new List<Oglas>(); // vracaju se 10 oglasa u okviru odgovarajuce otvorene stranice (funkcionalnost 1.1 i 1.2)

        //pretraga pocetak
        if(!string.IsNullOrWhiteSpace(unosZaPretragu))
        {
            List<Oglas> oglasiPregled2 = new List<Oglas>();
            oglasiPregled.ForEach(oglas=>{
                if(oglas.Naziv.IndexOf(unosZaPretragu)!=-1)
                {
                    oglasiPregled2.Add(oglas);
                }
            });

            foreach (var o in oglasiPregled2.Select((oglas, index) => new { index, oglas })) // funkcionalnost 1.1
            {
                if(o.index>=stranica*5 && o.index<stranica*5+5)
                    if(o.oglas!=null)
                        oglasi5.Add(o.oglas);
            }

            return Ok(new {
                oglasi5,
                brojOglasa = oglasiPregled2.Count
            }); // ako JE izvrsena pretraga
        }
        //pretraga kraj
        
        foreach (var o in oglasiPregled.Select((oglas, index) => new { index, oglas })) // funkcionalnost 1.2
        {
            if(o.index>=stranica*5 && o.index<stranica*5+5)
                if(o.oglas!=null)
                    oglasi5.Add(o.oglas);
                    
        }

        return Ok(new {
            oglasi5,
            brojOglasa = oglasiPregled.Count
        }); // ako NIJE izvrsena pretraga
    } // treba test

    [Route("PreuzmiSveOglaseZadrugarPrijavljeniFiltriranjePretragaSortiranjeStranica/{username}/{grad}/{datumIzvrsavanja}/{tip}/{nacinPlacanja}/{novacOd}/{novacDo}/{unosZaPretragu}/{sortiranje}/{stranica}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveOglaseZadrugarPrijavljeniFiltriranjePretragaSortiranjeStranica(string username, string grad, string datumIzvrsavanja, 
                                                                                                string tip, string nacinPlacanja, string novacOd, string novacDo, 
                                                                                                string unosZaPretragu, string sortiranje, int stranica){

        //trazenje oglasa koji su odobreni i aktuelni pocetak
        var oglasi = await Context.Oglasi.Include(p=>p.Zadruga)
                                    .Include(p=>p.Poslodavac)
                                    .Include(p=>p.OglasiZadrugari)
                                    .ThenInclude(q=>q.Zadrugar)
                                    .ToListAsync();
        var oglasi2 = oglasi.Where(o=>o.Odobren==true && o.Aktuelan==true && o.OdabraniRadnici==false && o.NapravljenUgovor==false).ToList();
        //trazenje oglasa koji su odobreni i aktuelni kraj

        //trazenje oglasa na koje je aplicirao zadrugar pocetak
        var zadrugar = Context.Zadrugari.Where(p=>p.UserName==username).FirstOrDefault();

        List<Oglas> oglasiPregled = new List<Oglas>();

        oglasi2.ForEach(oglas=>{
            var i=0;
            oglas.OglasiZadrugari.ForEach(oz=>{
                if(oz.Zadrugar==zadrugar)
                    i++;
            });
            if(i!=0)
                oglasiPregled.Add(oglas);
        });
        //trazenje oglasa na koje nije aplicirao zadrugar kraj
        
        //filtriranje pocetak
        if (grad!="Izaberi grad" && !string.IsNullOrWhiteSpace(grad))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Grad==grad).ToList();
        }
        if (!string.IsNullOrWhiteSpace(datumIzvrsavanja))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.DatumIzvrsavanjaPosla.Year==Convert.ToDateTime(datumIzvrsavanja).Year
                                                    && oglas.DatumIzvrsavanjaPosla.Month==Convert.ToDateTime(datumIzvrsavanja).Month
                                                    && oglas.DatumIzvrsavanjaPosla.Day==Convert.ToDateTime(datumIzvrsavanja).Day).ToList();
        }
        if (tip!="Izaberi tip" && !string.IsNullOrWhiteSpace(tip))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Tip==tip).ToList();
        }
        if (nacinPlacanja!="Izaberi način plaćanja" && !string.IsNullOrWhiteSpace(nacinPlacanja))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.NacinPlacanja==nacinPlacanja).ToList();
        }
        if(!string.IsNullOrWhiteSpace(novacOd))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Novac>=Convert.ToDouble(novacOd)).ToList();
        }
        if(!string.IsNullOrWhiteSpace(novacDo))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Novac<=Convert.ToDouble(novacDo)).ToList();
        }
        //filtriranje kraj

        //sortiranje pocetak (nebitno da li se prvo obavi sortiranje pa ostatak koda ili obrnuto)
        if(!string.IsNullOrWhiteSpace(sortiranje))
        {
            if(sortiranje=="Najnovije")
                oglasiPregled.Sort((a,b)=>b.DatumPostavljanja.CompareTo(a.DatumPostavljanja));
            if(sortiranje=="Naziv A-Z")
                oglasiPregled.Sort((a,b)=>a.Naziv.CompareTo(b.Naziv));
            if(sortiranje=="Naziv Z-A")
                oglasiPregled.Sort((a,b)=>b.Naziv.CompareTo(a.Naziv));
            if(sortiranje=="Novac ↓")
                oglasiPregled.Sort((a,b)=>b.Novac.CompareTo(a.Novac));
            if(sortiranje=="Novac ↑")
                oglasiPregled.Sort((a,b)=>a.Novac.CompareTo(b.Novac));
        }
        //sortiranje kraj
        var najmanjaCenaOglasa = 9999999.0;
        var najvecaCenaOglasa = 0.0;
        List<Oglas> oglasi5 = new List<Oglas>(); // vracaju se 10 oglasa u okviru odgovarajuce otvorene stranice (funkcionalnost 1.1 i 1.2)

        //pretraga pocetak
        if(!string.IsNullOrWhiteSpace(unosZaPretragu))
        {
            List<Oglas> oglasiPregled2 = new List<Oglas>();
            oglasiPregled.ForEach(oglas=>{
                if(oglas.Naziv.IndexOf(unosZaPretragu)!=-1)
                {
                    oglasiPregled2.Add(oglas);
                    if(najmanjaCenaOglasa > oglas.Novac)
                        najmanjaCenaOglasa = oglas.Novac;
                    if(najvecaCenaOglasa < oglas.Novac)
                        najvecaCenaOglasa = oglas.Novac;
                }
            });

            foreach (var o in oglasiPregled2.Select((oglas, index) => new { index, oglas })) // funkcionalnost 1.1
            {
                if(o.index>=stranica*5 && o.index<stranica*5+5)
                    if(o.oglas!=null)
                        oglasi5.Add(o.oglas);
            }

            return Ok(new {
                oglasi5,
                brojOglasa = oglasiPregled2.Count,
                najmanjaCenaOglasa,
                najvecaCenaOglasa
            }); // ako JE izvrsena pretraga
        }
        //pretraga kraj
        
        foreach (var o in oglasiPregled.Select((oglas, index) => new { index, oglas })) // funkcionalnost 1.2
        {
            if(najmanjaCenaOglasa > o.oglas.Novac)
                        najmanjaCenaOglasa = o.oglas.Novac;
            if(najvecaCenaOglasa < o.oglas.Novac)
                najvecaCenaOglasa = o.oglas.Novac;
            if(o.index>=stranica*5 && o.index<stranica*5+5)
                if(o.oglas!=null)
                    oglasi5.Add(o.oglas);
                    
        }

        return Ok(new {
            oglasi5,
            brojOglasa = oglasiPregled.Count,
            najmanjaCenaOglasa,
            najvecaCenaOglasa
        }); // ako NIJE izvrsena pretraga
    }

    //poslodavac preuzima oglase koji su jos na validaciji
    [Route("PreuzmiSveOglasePoslodavacNaValidacijiPretragaSortiranjeStranica/{username}/{unosZaPretragu}/{sortiranje}/{stranica}")] 
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveOglasePoslodavacNaValidacijiPretragaSortiranjeStranica(string username,string unosZaPretragu, string sortiranje, int stranica){
        //trazenje oglasa koji nisu odobreni i aktuelni pocetak
        var oglasi = await Context.Oglasi.Include(p=>p.Zadruga)
                                    .Include(p=>p.Poslodavac)
                                    .Include(p=>p.OglasiZadrugari)
                                    .ThenInclude(q=>q.Zadrugar)
                                    .ToListAsync();

        var oglasi2 = oglasi.Where(o=>o.Odobren==false && o.Aktuelan==false && o.OdabraniRadnici==false && o.NapravljenUgovor==false).ToList();

        //trazenje oglasa koji su vezani za datog poslodavca pocetak
        var poslodavac = Context.Poslodavci.Where(p=>p.UserName==username).FirstOrDefault();

        //ovde stavljamo sve oglase koji zadovoljavaju prethodne uslove
        List<Oglas> oglasiPregled = new List<Oglas>();

        //trazenje oglasa koji su vezani za datog poslodavca pocetak
        oglasi2.ForEach(oglas=>{
            if(oglas.Poslodavac==poslodavac)
                oglasiPregled.Add(oglas);
        });
        //trazenje oglasa koji su vezani za datog poslodavca kraj

        //sortiranje pocetak (nebitno da li se prvo obavi sortiranje pa ostatak koda ili obrnuto)
        if(!string.IsNullOrWhiteSpace(sortiranje))
        {
            if(sortiranje=="Najnovije")
                oglasiPregled.Sort((a,b)=>b.DatumPostavljanja.CompareTo(a.DatumPostavljanja));
            if(sortiranje=="Naziv A-Z")
                oglasiPregled.Sort((a,b)=>a.Naziv.CompareTo(b.Naziv));
            if(sortiranje=="Naziv Z-A")
                oglasiPregled.Sort((a,b)=>b.Naziv.CompareTo(a.Naziv));
            if(sortiranje=="Novac ↓")
                oglasiPregled.Sort((a,b)=>b.Novac.CompareTo(a.Novac));
            if(sortiranje=="Novac ↑")
                oglasiPregled.Sort((a,b)=>a.Novac.CompareTo(b.Novac));
        }
        //sortiranje kraj
        var najmanjaCenaOglasa = 9999999.0;
        var najvecaCenaOglasa = 0.0;
        List<Oglas> oglasi5 = new List<Oglas>(); // vracaju se 10 oglasa u okviru odgovarajuce otvorene stranice (funkcionalnost 1.1 i 1.2)

        //pretraga pocetak
        if(!string.IsNullOrWhiteSpace(unosZaPretragu))
        {
            List<Oglas> oglasiPregled2 = new List<Oglas>();
            oglasiPregled.ForEach(oglas=>{
                if(oglas.Naziv.IndexOf(unosZaPretragu)!=-1)
                {
                    oglasiPregled2.Add(oglas);
                    if(najmanjaCenaOglasa > oglas.Novac)
                        najmanjaCenaOglasa = oglas.Novac;
                    if(najvecaCenaOglasa < oglas.Novac)
                        najvecaCenaOglasa = oglas.Novac;
                }
            });

            foreach (var o in oglasiPregled2.Select((oglas, index) => new { index, oglas })) // funkcionalnost 1.1
            {
                if(o.index>=stranica*5 && o.index<stranica*5+5)
                    if(o.oglas!=null)
                        oglasi5.Add(o.oglas);
            }

            return Ok(new {
                oglasi5,
                brojOglasa = oglasiPregled2.Count,
                najmanjaCenaOglasa,
                najvecaCenaOglasa
            }); // ako JE izvrsena pretraga
        }
        //pretraga kraj
        
        foreach (var o in oglasiPregled.Select((oglas, index) => new { index, oglas })) // funkcionalnost 1.2
        {
            if(najmanjaCenaOglasa > o.oglas.Novac)
                        najmanjaCenaOglasa = o.oglas.Novac;
            if(najvecaCenaOglasa < o.oglas.Novac)
                najvecaCenaOglasa = o.oglas.Novac;
            if(o.index>=stranica*5 && o.index<stranica*5+5)
                if(o.oglas!=null)
                    oglasi5.Add(o.oglas);
                    
        }

        return Ok(new {
            oglasi5,
            brojOglasa = oglasiPregled.Count,
            najmanjaCenaOglasa,
            najvecaCenaOglasa
        }); // ako NIJE izvrsena pretraga
    }

    [Route("PreuzmiSveOglaseAdministratorPregledFiltriranjePretragaSortiranjeStranica/{zadruga}/{poslodavac}/{grad}/{datumIzvrsavanja}/{tip}/{nacinPlacanja}/{novacOd}/{novacDo}/{unosZaPretragu}/{sortiranje}/{stranica}")] // poslodavcu se prikazuju oglasi koji su aktuelni i odobreni
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveOglaseAdministratorPregledFiltriranjePretragaSortiranjeStranica(string zadruga, string poslodavac, string grad, string datumIzvrsavanja, 
                                                                                                string tip, string nacinPlacanja, string novacOd, string novacDo, 
                                                                                                string unosZaPretragu, string sortiranje, int stranica){
        //trazenje oglasa koji su odobreni i aktuelni pocetak
        var oglasi = await Context.Oglasi.Include(p=>p.Zadruga)
                                    .Include(p=>p.Poslodavac)
                                    .Include(p=>p.OglasiZadrugari)
                                    .ThenInclude(q=>q.Zadrugar)
                                    .ToListAsync();
        var oglasi2 = oglasi.Where(o=>o.Odobren==true && o.Aktuelan==true && o.OdabraniRadnici==false && o.NapravljenUgovor==false).ToList();
        //trazenje oglasa koji su odobreni i aktuelni kraj


        List<Oglas> oglasiPregled = new List<Oglas>();

        oglasi2.ForEach(oglas=>{
                oglasiPregled.Add(oglas);
        });

        //filtriranje pocetak
        if (zadruga!="Izaberi zadrugu" && !string.IsNullOrWhiteSpace(zadruga))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Zadruga.Naziv==zadruga).ToList();
        }
        if (poslodavac!="Izaberi poslodavca" && !string.IsNullOrWhiteSpace(poslodavac))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Poslodavac.Naziv==poslodavac).ToList();
        }
        if (grad!="Izaberi grad" && !string.IsNullOrWhiteSpace(grad))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Grad==grad).ToList();
        }
        if (!string.IsNullOrWhiteSpace(datumIzvrsavanja))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.DatumIzvrsavanjaPosla.Year==Convert.ToDateTime(datumIzvrsavanja).Year
                                                    && oglas.DatumIzvrsavanjaPosla.Month==Convert.ToDateTime(datumIzvrsavanja).Month
                                                    && oglas.DatumIzvrsavanjaPosla.Day==Convert.ToDateTime(datumIzvrsavanja).Day).ToList();
        }
        if (tip!="Izaberi tip" && !string.IsNullOrWhiteSpace(tip))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Tip==tip).ToList();
        }
        if (nacinPlacanja!="Izaberi način plaćanja" && !string.IsNullOrWhiteSpace(nacinPlacanja))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.NacinPlacanja==nacinPlacanja).ToList();
        }
        if(!string.IsNullOrWhiteSpace(novacOd))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Novac>=Convert.ToDouble(novacOd)).ToList();
        }
        if(!string.IsNullOrWhiteSpace(novacDo))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Novac<=Convert.ToDouble(novacDo)).ToList();
        }
        //filtriranje kraj

        //sortiranje pocetak (nebitno da li se prvo obavi sortiranje pa ostatak koda ili obrnuto)
        if(!string.IsNullOrWhiteSpace(sortiranje))
        {
            if(sortiranje=="Najnovije")
                oglasiPregled.Sort((a,b)=>b.DatumPostavljanja.CompareTo(a.DatumPostavljanja));
            if(sortiranje=="Naziv A-Z")
                oglasiPregled.Sort((a,b)=>a.Naziv.CompareTo(b.Naziv));
            if(sortiranje=="Naziv Z-A")
                oglasiPregled.Sort((a,b)=>b.Naziv.CompareTo(a.Naziv));
            if(sortiranje=="Novac ↓")
                oglasiPregled.Sort((a,b)=>b.Novac.CompareTo(a.Novac));
            if(sortiranje=="Novac ↑")
                oglasiPregled.Sort((a,b)=>a.Novac.CompareTo(b.Novac));
        }
        //sortiranje kraj
        var najmanjaCenaOglasa = 9999999.0;
        var najvecaCenaOglasa = 0.0;
        List<Oglas> oglasi5 = new List<Oglas>(); // vracaju se 10 oglasa u okviru odgovarajuce otvorene stranice (funkcionalnost 1.1 i 1.2)

        //pretraga pocetak
        if(!string.IsNullOrWhiteSpace(unosZaPretragu))
        {
            List<Oglas> oglasiPregled2 = new List<Oglas>();
            oglasiPregled.ForEach(oglas=>{
                if(oglas.Naziv.IndexOf(unosZaPretragu)!=-1)
                {
                    oglasiPregled2.Add(oglas);
                    if(najmanjaCenaOglasa > oglas.Novac)
                        najmanjaCenaOglasa = oglas.Novac;
                    if(najvecaCenaOglasa < oglas.Novac)
                        najvecaCenaOglasa = oglas.Novac;
                }
            });

            foreach (var o in oglasiPregled2.Select((oglas, index) => new { index, oglas })) // funkcionalnost 1.1
            {
                if(o.index>=stranica*5 && o.index<stranica*5+5)
                    if(o.oglas!=null)
                        oglasi5.Add(o.oglas);
            }

            return Ok(new {
                oglasi5,
                brojOglasa = oglasiPregled2.Count,
                najmanjaCenaOglasa,
                najvecaCenaOglasa
            }); // ako JE izvrsena pretraga
        }
        //pretraga kraj
        
        foreach (var o in oglasiPregled.Select((oglas, index) => new { index, oglas })) // funkcionalnost 1.2
        {
            if(najmanjaCenaOglasa > o.oglas.Novac)
                        najmanjaCenaOglasa = o.oglas.Novac;
            if(najvecaCenaOglasa < o.oglas.Novac)
                najvecaCenaOglasa = o.oglas.Novac;
            if(o.index>=stranica*5 && o.index<stranica*5+5)
                if(o.oglas!=null)
                    oglasi5.Add(o.oglas);
                    
        }

        return Ok(new {
            oglasi5,
            brojOglasa = oglasiPregled.Count,
            najmanjaCenaOglasa,
            najvecaCenaOglasa
        }); // ako NIJE izvrsena pretraga
    }

    [Route("PreuzmiSveOdbijeneOglaseAdministratorPregledFiltriranjePretragaSortiranjeStranica/{zadruga}/{poslodavac}/{grad}/{datumIzvrsavanja}/{tip}/{nacinPlacanja}/{novacOd}/{novacDo}/{unosZaPretragu}/{sortiranje}/{stranica}")] // poslodavcu se prikazuju oglasi koji su aktuelni i odobreni
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveOdbijeneOglaseAdministratorPregledFiltriranjePretragaSortiranjeStranica(string zadruga, string poslodavac, string grad, string datumIzvrsavanja, 
                                                                                                string tip, string nacinPlacanja, string novacOd, string novacDo, 
                                                                                                string unosZaPretragu, string sortiranje, int stranica){
        //trazenje oglasa koji su odobreni i aktuelni pocetak
        var oglasi = await Context.Oglasi.Include(p=>p.Zadruga)
                                    .Include(p=>p.Poslodavac)
                                    .Include(p=>p.OglasiZadrugari)
                                    .ThenInclude(q=>q.Zadrugar)
                                    .ToListAsync();
        var oglasi2 = oglasi.Where(o=>o.Odobren==false && o.Aktuelan==true && o.OdabraniRadnici==false && o.NapravljenUgovor==false).ToList();
        //trazenje oglasa koji su odobreni i aktuelni kraj


        List<Oglas> oglasiPregled = new List<Oglas>();

        oglasi2.ForEach(oglas=>{
                oglasiPregled.Add(oglas);
        });

        //filtriranje pocetak
        if (zadruga!="Izaberi zadrugu" && !string.IsNullOrWhiteSpace(zadruga))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Zadruga.Naziv==zadruga).ToList();
        }
        if (poslodavac!="Izaberi poslodavca" && !string.IsNullOrWhiteSpace(poslodavac))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Poslodavac.Naziv==poslodavac).ToList();
        }
        if (grad!="Izaberi grad" && !string.IsNullOrWhiteSpace(grad))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Grad==grad).ToList();
        }
        if (!string.IsNullOrWhiteSpace(datumIzvrsavanja))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.DatumIzvrsavanjaPosla.Year==Convert.ToDateTime(datumIzvrsavanja).Year
                                                    && oglas.DatumIzvrsavanjaPosla.Month==Convert.ToDateTime(datumIzvrsavanja).Month
                                                    && oglas.DatumIzvrsavanjaPosla.Day==Convert.ToDateTime(datumIzvrsavanja).Day).ToList();
        }
        if (tip!="Izaberi tip" && !string.IsNullOrWhiteSpace(tip))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Tip==tip).ToList();
        }
        if (nacinPlacanja!="Izaberi način plaćanja" && !string.IsNullOrWhiteSpace(nacinPlacanja))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.NacinPlacanja==nacinPlacanja).ToList();
        }
        if(!string.IsNullOrWhiteSpace(novacOd))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Novac>=Convert.ToDouble(novacOd)).ToList();
        }
        if(!string.IsNullOrWhiteSpace(novacDo))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Novac<=Convert.ToDouble(novacDo)).ToList();
        }
        //filtriranje kraj

        //sortiranje pocetak (nebitno da li se prvo obavi sortiranje pa ostatak koda ili obrnuto)
        if(!string.IsNullOrWhiteSpace(sortiranje))
        {
            if(sortiranje=="Najnovije")
                oglasiPregled.Sort((a,b)=>b.DatumPostavljanja.CompareTo(a.DatumPostavljanja));
            if(sortiranje=="Naziv A-Z")
                oglasiPregled.Sort((a,b)=>a.Naziv.CompareTo(b.Naziv));
            if(sortiranje=="Naziv Z-A")
                oglasiPregled.Sort((a,b)=>b.Naziv.CompareTo(a.Naziv));
            if(sortiranje=="Novac ↓")
                oglasiPregled.Sort((a,b)=>b.Novac.CompareTo(a.Novac));
            if(sortiranje=="Novac ↑")
                oglasiPregled.Sort((a,b)=>a.Novac.CompareTo(b.Novac));
        }
        //sortiranje kraj
        var najmanjaCenaOglasa = 9999999.0;
        var najvecaCenaOglasa = 0.0;
        List<Oglas> oglasi5 = new List<Oglas>(); // vracaju se 10 oglasa u okviru odgovarajuce otvorene stranice (funkcionalnost 1.1 i 1.2)

        //pretraga pocetak
        if(!string.IsNullOrWhiteSpace(unosZaPretragu))
        {
            List<Oglas> oglasiPregled2 = new List<Oglas>();
            oglasiPregled.ForEach(oglas=>{
                if(oglas.Naziv.IndexOf(unosZaPretragu)!=-1)
                {
                    oglasiPregled2.Add(oglas);
                    if(najmanjaCenaOglasa > oglas.Novac)
                        najmanjaCenaOglasa = oglas.Novac;
                    if(najvecaCenaOglasa < oglas.Novac)
                        najvecaCenaOglasa = oglas.Novac;
                }
            });

            foreach (var o in oglasiPregled2.Select((oglas, index) => new { index, oglas })) // funkcionalnost 1.1
            {
                if(o.index>=stranica*5 && o.index<stranica*5+5)
                    if(o.oglas!=null)
                        oglasi5.Add(o.oglas);
            }

            return Ok(new {
                oglasi5,
                brojOglasa = oglasiPregled2.Count,
                najmanjaCenaOglasa,
                najvecaCenaOglasa
            }); // ako JE izvrsena pretraga
        }
        //pretraga kraj
        
        foreach (var o in oglasiPregled.Select((oglas, index) => new { index, oglas })) // funkcionalnost 1.2
        {
            if(najmanjaCenaOglasa > o.oglas.Novac)
                        najmanjaCenaOglasa = o.oglas.Novac;
            if(najvecaCenaOglasa < o.oglas.Novac)
                najvecaCenaOglasa = o.oglas.Novac;
            if(o.index>=stranica*5 && o.index<stranica*5+5)
                if(o.oglas!=null)
                    oglasi5.Add(o.oglas);
                    
        }

        return Ok(new {
            oglasi5,
            brojOglasa = oglasiPregled.Count,
            najmanjaCenaOglasa,
            najvecaCenaOglasa
        }); // ako NIJE izvrsena pretraga
    }


    [Route("PreuzmiSveOglaseNaValidacijiAdministratorPregledFiltriranjePretragaSortiranjeStranica/{zadruga}/{poslodavac}/{grad}/{datumIzvrsavanja}/{tip}/{nacinPlacanja}/{novacOd}/{novacDo}/{unosZaPretragu}/{sortiranje}/{stranica}")] // poslodavcu se prikazuju oglasi koji su aktuelni i odobreni
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveOglaseNaValidacijiAdministratorPregledFiltriranjePretragaSortiranjeStranica(string zadruga, string poslodavac, string grad, string datumIzvrsavanja, 
                                                                                                string tip, string nacinPlacanja, string novacOd, string novacDo, 
                                                                                                string unosZaPretragu, string sortiranje, int stranica){
        //trazenje oglasa koji su odobreni i aktuelni pocetak
        var oglasi = await Context.Oglasi.Include(p=>p.Zadruga)
                                    .Include(p=>p.Poslodavac)
                                    .Include(p=>p.OglasiZadrugari)
                                    .ThenInclude(q=>q.Zadrugar)
                                    .ToListAsync();
        var oglasi2 = oglasi.Where(o=>o.Odobren==false && o.Aktuelan==false && o.OdabraniRadnici==false && o.NapravljenUgovor==false).ToList();
        //trazenje oglasa koji su odobreni i aktuelni kraj


        List<Oglas> oglasiPregled = new List<Oglas>();

        oglasi2.ForEach(oglas=>{
                oglasiPregled.Add(oglas);
        });

        //filtriranje pocetak
        if (zadruga!="Izaberi zadrugu" && !string.IsNullOrWhiteSpace(zadruga))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Zadruga.Naziv==zadruga).ToList();
        }
        if (poslodavac!="Izaberi poslodavca" && !string.IsNullOrWhiteSpace(poslodavac))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Poslodavac.Naziv==poslodavac).ToList();
        }
        if (grad!="Izaberi grad" && !string.IsNullOrWhiteSpace(grad))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Grad==grad).ToList();
        }
        if (!string.IsNullOrWhiteSpace(datumIzvrsavanja))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.DatumIzvrsavanjaPosla.Year==Convert.ToDateTime(datumIzvrsavanja).Year
                                                    && oglas.DatumIzvrsavanjaPosla.Month==Convert.ToDateTime(datumIzvrsavanja).Month
                                                    && oglas.DatumIzvrsavanjaPosla.Day==Convert.ToDateTime(datumIzvrsavanja).Day).ToList();
        }
        if (tip!="Izaberi tip" && !string.IsNullOrWhiteSpace(tip))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Tip==tip).ToList();
        }
        if (nacinPlacanja!="Izaberi način plaćanja" && !string.IsNullOrWhiteSpace(nacinPlacanja))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.NacinPlacanja==nacinPlacanja).ToList();
        }
        if(!string.IsNullOrWhiteSpace(novacOd))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Novac>=Convert.ToDouble(novacOd)).ToList();
        }
        if(!string.IsNullOrWhiteSpace(novacDo))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Novac<=Convert.ToDouble(novacDo)).ToList();
        }
        //filtriranje kraj

        //sortiranje pocetak (nebitno da li se prvo obavi sortiranje pa ostatak koda ili obrnuto)
        if(!string.IsNullOrWhiteSpace(sortiranje))
        {
            if(sortiranje=="Najnovije")
                oglasiPregled.Sort((a,b)=>b.DatumPostavljanja.CompareTo(a.DatumPostavljanja));
            if(sortiranje=="Naziv A-Z")
                oglasiPregled.Sort((a,b)=>a.Naziv.CompareTo(b.Naziv));
            if(sortiranje=="Naziv Z-A")
                oglasiPregled.Sort((a,b)=>b.Naziv.CompareTo(a.Naziv));
            if(sortiranje=="Novac ↓")
                oglasiPregled.Sort((a,b)=>b.Novac.CompareTo(a.Novac));
            if(sortiranje=="Novac ↑")
                oglasiPregled.Sort((a,b)=>a.Novac.CompareTo(b.Novac));
        }
        //sortiranje kraj
        var najmanjaCenaOglasa = 9999999.0;
        var najvecaCenaOglasa = 0.0;
        List<Oglas> oglasi5 = new List<Oglas>(); // vracaju se 10 oglasa u okviru odgovarajuce otvorene stranice (funkcionalnost 1.1 i 1.2)

        //pretraga pocetak
        if(!string.IsNullOrWhiteSpace(unosZaPretragu))
        {
            List<Oglas> oglasiPregled2 = new List<Oglas>();
            oglasiPregled.ForEach(oglas=>{
                if(oglas.Naziv.IndexOf(unosZaPretragu)!=-1)
                {
                    oglasiPregled2.Add(oglas);
                    if(najmanjaCenaOglasa > oglas.Novac)
                        najmanjaCenaOglasa = oglas.Novac;
                    if(najvecaCenaOglasa < oglas.Novac)
                        najvecaCenaOglasa = oglas.Novac;
                }
            });

            foreach (var o in oglasiPregled2.Select((oglas, index) => new { index, oglas })) // funkcionalnost 1.1
            {
                if(o.index>=stranica*5 && o.index<stranica*5+5)
                    if(o.oglas!=null)
                        oglasi5.Add(o.oglas);
            }

            return Ok(new {
                oglasi5,
                brojOglasa = oglasiPregled2.Count,
                najmanjaCenaOglasa,
                najvecaCenaOglasa
            }); // ako JE izvrsena pretraga
        }
        //pretraga kraj
        
        foreach (var o in oglasiPregled.Select((oglas, index) => new { index, oglas })) // funkcionalnost 1.2
        {
            if(najmanjaCenaOglasa > o.oglas.Novac)
                        najmanjaCenaOglasa = o.oglas.Novac;
            if(najvecaCenaOglasa < o.oglas.Novac)
                najvecaCenaOglasa = o.oglas.Novac;
            if(o.index>=stranica*5 && o.index<stranica*5+5)
                if(o.oglas!=null)
                    oglasi5.Add(o.oglas);
                    
        }

        return Ok(new {
            oglasi5,
            brojOglasa = oglasiPregled.Count,
            najmanjaCenaOglasa,
            najvecaCenaOglasa
        }); // ako NIJE izvrsena pretraga
    }


    [Route("PreuzmiSveOglaseZaOdabirRadnikaAdministratorPregledFiltriranjePretragaSortiranjeStranica/{zadruga}/{poslodavac}/{grad}/{datumIzvrsavanja}/{tip}/{nacinPlacanja}/{novacOd}/{novacDo}/{unosZaPretragu}/{sortiranje}/{stranica}")] // poslodavcu se prikazuju oglasi koji su aktuelni i odobreni
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveOglaseZaOdabirRadnikaAdministratorPregledFiltriranjePretragaSortiranjeStranica(string zadruga, string poslodavac, string grad, string datumIzvrsavanja, 
                                                                                                string tip, string nacinPlacanja, string novacOd, string novacDo, 
                                                                                                string unosZaPretragu, string sortiranje, int stranica){
        //trazenje oglasa koji su odobreni i aktuelni pocetak
        var oglasi = await Context.Oglasi.Include(p=>p.Zadruga)
                                    .Include(p=>p.Poslodavac)
                                    .Include(p=>p.OglasiZadrugari)
                                    .ThenInclude(q=>q.Zadrugar)
                                    .ToListAsync();
        var oglasi2 = oglasi.Where(o=>o.Odobren==true && o.Aktuelan==false && o.OdabraniRadnici==false && o.NapravljenUgovor==false).ToList();
        //trazenje oglasa koji su odobreni i aktuelni kraj


        List<Oglas> oglasiPregled = new List<Oglas>();

        oglasi2.ForEach(oglas=>{
                oglasiPregled.Add(oglas);
        });

        //filtriranje pocetak
        if (zadruga!="Izaberi zadrugu" && !string.IsNullOrWhiteSpace(zadruga))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Zadruga.Naziv==zadruga).ToList();
        }
        if (poslodavac!="Izaberi poslodavca" && !string.IsNullOrWhiteSpace(poslodavac))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Poslodavac.Naziv==poslodavac).ToList();
        }
        if (grad!="Izaberi grad" && !string.IsNullOrWhiteSpace(grad))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Grad==grad).ToList();
        }
        if (!string.IsNullOrWhiteSpace(datumIzvrsavanja))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.DatumIzvrsavanjaPosla.Year==Convert.ToDateTime(datumIzvrsavanja).Year
                                                    && oglas.DatumIzvrsavanjaPosla.Month==Convert.ToDateTime(datumIzvrsavanja).Month
                                                    && oglas.DatumIzvrsavanjaPosla.Day==Convert.ToDateTime(datumIzvrsavanja).Day).ToList();
        }
        if (tip!="Izaberi tip" && !string.IsNullOrWhiteSpace(tip))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Tip==tip).ToList();
        }
        if (nacinPlacanja!="Izaberi način plaćanja" && !string.IsNullOrWhiteSpace(nacinPlacanja))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.NacinPlacanja==nacinPlacanja).ToList();
        }
        if(!string.IsNullOrWhiteSpace(novacOd))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Novac>=Convert.ToDouble(novacOd)).ToList();
        }
        if(!string.IsNullOrWhiteSpace(novacDo))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Novac<=Convert.ToDouble(novacDo)).ToList();
        }
        //filtriranje kraj

        //sortiranje pocetak (nebitno da li se prvo obavi sortiranje pa ostatak koda ili obrnuto)
        if(!string.IsNullOrWhiteSpace(sortiranje))
        {
            if(sortiranje=="Najnovije")
                oglasiPregled.Sort((a,b)=>b.DatumPostavljanja.CompareTo(a.DatumPostavljanja));
            if(sortiranje=="Naziv A-Z")
                oglasiPregled.Sort((a,b)=>a.Naziv.CompareTo(b.Naziv));
            if(sortiranje=="Naziv Z-A")
                oglasiPregled.Sort((a,b)=>b.Naziv.CompareTo(a.Naziv));
            if(sortiranje=="Novac ↓")
                oglasiPregled.Sort((a,b)=>b.Novac.CompareTo(a.Novac));
            if(sortiranje=="Novac ↑")
                oglasiPregled.Sort((a,b)=>a.Novac.CompareTo(b.Novac));
        }
        //sortiranje kraj
        var najmanjaCenaOglasa = 9999999.0;
        var najvecaCenaOglasa = 0.0;
        List<Oglas> oglasi5 = new List<Oglas>(); // vracaju se 10 oglasa u okviru odgovarajuce otvorene stranice (funkcionalnost 1.1 i 1.2)

        //pretraga pocetak
        if(!string.IsNullOrWhiteSpace(unosZaPretragu))
        {
            List<Oglas> oglasiPregled2 = new List<Oglas>();
            oglasiPregled.ForEach(oglas=>{
                if(oglas.Naziv.IndexOf(unosZaPretragu)!=-1)
                {
                    oglasiPregled2.Add(oglas);
                    if(najmanjaCenaOglasa > oglas.Novac)
                        najmanjaCenaOglasa = oglas.Novac;
                    if(najvecaCenaOglasa < oglas.Novac)
                        najvecaCenaOglasa = oglas.Novac;
                }
            });

            foreach (var o in oglasiPregled2.Select((oglas, index) => new { index, oglas })) // funkcionalnost 1.1
            {
                if(o.index>=stranica*5 && o.index<stranica*5+5)
                    if(o.oglas!=null)
                        oglasi5.Add(o.oglas);
            }

            return Ok(new {
                oglasi5,
                brojOglasa = oglasiPregled2.Count,
                najmanjaCenaOglasa,
                najvecaCenaOglasa
            }); // ako JE izvrsena pretraga
        }
        //pretraga kraj
        
        foreach (var o in oglasiPregled.Select((oglas, index) => new { index, oglas })) // funkcionalnost 1.2
        {
            if(najmanjaCenaOglasa > o.oglas.Novac)
                        najmanjaCenaOglasa = o.oglas.Novac;
            if(najvecaCenaOglasa < o.oglas.Novac)
                najvecaCenaOglasa = o.oglas.Novac;
            if(o.index>=stranica*5 && o.index<stranica*5+5)
                if(o.oglas!=null)
                    oglasi5.Add(o.oglas);
                    
        }

        return Ok(new {
            oglasi5,
            brojOglasa = oglasiPregled.Count,
            najmanjaCenaOglasa,
            najvecaCenaOglasa
        }); // ako NIJE izvrsena pretraga
    }

    [Route("PreuzmiSveOglaseZaKreiranjeUgovoraAdministratorPregledFiltriranjePretragaSortiranjeStranica/{zadruga}/{poslodavac}/{grad}/{datumIzvrsavanja}/{tip}/{nacinPlacanja}/{novacOd}/{novacDo}/{unosZaPretragu}/{sortiranje}/{stranica}")] // poslodavcu se prikazuju oglasi koji su aktuelni i odobreni
    [HttpGet]
    public async Task<ActionResult> PreuzmiSveOglaseZaKreiranjeUgovoraAdministratorPregledFiltriranjePretragaSortiranjeStranica(string zadruga, string poslodavac, string grad, string datumIzvrsavanja, 
                                                                                                string tip, string nacinPlacanja, string novacOd, string novacDo, 
                                                                                                string unosZaPretragu, string sortiranje, int stranica){
        //trazenje oglasa koji su odobreni i aktuelni pocetak
        var oglasi = await Context.Oglasi.Include(p=>p.Zadruga)
                                    .Include(p=>p.Poslodavac)
                                    .Include(p=>p.OglasiZadrugari)
                                    .ThenInclude(q=>q.Zadrugar)
                                    .ToListAsync();
        var oglasi2 = oglasi.Where(o=>o.Odobren==true && o.Aktuelan==false && o.OdabraniRadnici==true && o.NapravljenUgovor==false).ToList();
        //trazenje oglasa koji su odobreni i aktuelni kraj


        List<Oglas> oglasiPregled = new List<Oglas>();

        oglasi2.ForEach(oglas=>{
                oglasiPregled.Add(oglas);
        });

        //filtriranje pocetak
        if (zadruga!="Izaberi zadrugu" && !string.IsNullOrWhiteSpace(zadruga))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Zadruga.Naziv==zadruga).ToList();
        }
        if (poslodavac!="Izaberi poslodavca" && !string.IsNullOrWhiteSpace(poslodavac))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Poslodavac.Naziv==poslodavac).ToList();
        }
        if (grad!="Izaberi grad" && !string.IsNullOrWhiteSpace(grad))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Grad==grad).ToList();
        }
        if (!string.IsNullOrWhiteSpace(datumIzvrsavanja))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.DatumIzvrsavanjaPosla.Year==Convert.ToDateTime(datumIzvrsavanja).Year
                                                    && oglas.DatumIzvrsavanjaPosla.Month==Convert.ToDateTime(datumIzvrsavanja).Month
                                                    && oglas.DatumIzvrsavanjaPosla.Day==Convert.ToDateTime(datumIzvrsavanja).Day).ToList();
        }
        if (tip!="Izaberi tip" && !string.IsNullOrWhiteSpace(tip))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Tip==tip).ToList();
        }
        if (nacinPlacanja!="Izaberi način plaćanja" && !string.IsNullOrWhiteSpace(nacinPlacanja))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.NacinPlacanja==nacinPlacanja).ToList();
        }
        if(!string.IsNullOrWhiteSpace(novacOd))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Novac>=Convert.ToDouble(novacOd)).ToList();
        }
        if(!string.IsNullOrWhiteSpace(novacDo))
        {
            oglasiPregled = oglasiPregled.Where(oglas=>oglas.Novac<=Convert.ToDouble(novacDo)).ToList();
        }
        //filtriranje kraj

        //sortiranje pocetak (nebitno da li se prvo obavi sortiranje pa ostatak koda ili obrnuto)
        if(!string.IsNullOrWhiteSpace(sortiranje))
        {
            if(sortiranje=="Najnovije")
                oglasiPregled.Sort((a,b)=>b.DatumPostavljanja.CompareTo(a.DatumPostavljanja));
            if(sortiranje=="Naziv A-Z")
                oglasiPregled.Sort((a,b)=>a.Naziv.CompareTo(b.Naziv));
            if(sortiranje=="Naziv Z-A")
                oglasiPregled.Sort((a,b)=>b.Naziv.CompareTo(a.Naziv));
            if(sortiranje=="Novac ↓")
                oglasiPregled.Sort((a,b)=>b.Novac.CompareTo(a.Novac));
            if(sortiranje=="Novac ↑")
                oglasiPregled.Sort((a,b)=>a.Novac.CompareTo(b.Novac));
        }
        //sortiranje kraj
        var najmanjaCenaOglasa = 9999999.0;
        var najvecaCenaOglasa = 0.0;
        List<Oglas> oglasi5 = new List<Oglas>(); // vracaju se 10 oglasa u okviru odgovarajuce otvorene stranice (funkcionalnost 1.1 i 1.2)

        //pretraga pocetak
        if(!string.IsNullOrWhiteSpace(unosZaPretragu))
        {
            List<Oglas> oglasiPregled2 = new List<Oglas>();
            oglasiPregled.ForEach(oglas=>{
                if(oglas.Naziv.IndexOf(unosZaPretragu)!=-1)
                {
                    oglasiPregled2.Add(oglas);
                    if(najmanjaCenaOglasa > oglas.Novac)
                        najmanjaCenaOglasa = oglas.Novac;
                    if(najvecaCenaOglasa < oglas.Novac)
                        najvecaCenaOglasa = oglas.Novac;
                }
            });

            foreach (var o in oglasiPregled2.Select((oglas, index) => new { index, oglas })) // funkcionalnost 1.1
            {
                if(o.index>=stranica*5 && o.index<stranica*5+5)
                    if(o.oglas!=null)
                        oglasi5.Add(o.oglas);
            }

            return Ok(new {
                oglasi5,
                brojOglasa = oglasiPregled2.Count,
                najmanjaCenaOglasa,
                najvecaCenaOglasa
            }); // ako JE izvrsena pretraga
        }
        //pretraga kraj
        
        foreach (var o in oglasiPregled.Select((oglas, index) => new { index, oglas })) // funkcionalnost 1.2
        {
            if(najmanjaCenaOglasa > o.oglas.Novac)
                        najmanjaCenaOglasa = o.oglas.Novac;
            if(najvecaCenaOglasa < o.oglas.Novac)
                najvecaCenaOglasa = o.oglas.Novac;
            if(o.index>=stranica*5 && o.index<stranica*5+5)
                if(o.oglas!=null)
                    oglasi5.Add(o.oglas);
                    
        }

        return Ok(new {
            oglasi5,
            brojOglasa = oglasiPregled.Count,
            najmanjaCenaOglasa,
            najvecaCenaOglasa
        }); // ako NIJE izvrsena pretraga
    }


    //brisanje oglasa od strane poslodavca
    [Route("ObrisiOglasAdministrator/{oglasId}/")] 
    [HttpDelete]
    public async Task<ActionResult> ObrisiOglasAdministrator(int oglasId)
    {
        if(oglasId<0){
            return BadRequest("Lose unet id oglasa!");
        }

        try{
            //trazimo oglas ciji je id jednak prosledjenom i gde je kreator tog oglasa(poslodavac) jednak prosledjenom
            var oglas = await Context.Oglasi.Where(o => o.ID==oglasId).Include(p=>p.OglasiZadrugari).FirstOrDefaultAsync();

            if(oglas!=null){
                foreach (var oz in oglas.OglasiZadrugari)
                {
                    Context.OglasiZadrugari.Remove(oz);
                    await Context.SaveChangesAsync();
                }
                Context.Oglasi.Remove(oglas);
                await Context.SaveChangesAsync();
                return Ok("Oglas uspesno obrisan!");
            }
            else{
                return BadRequest("Oglas nije pronadjen!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
    }

}
