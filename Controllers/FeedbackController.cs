namespace UposliMe.Controllers;

[ApiController]
[Route("[controller]")]
public class FeedbackController : ControllerBase
{
    public UposliMeContext Context { get; set; }

    public FeedbackController(UposliMeContext context)
    {
        Context = context;
    }

    [Route("PreuzmiFeedbackPoslodavac/{poslodavacId}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiFeedbackPoslodavac(int poslodavacId){
        var poslodavac = await Context.Poslodavci.Where(p=> p.ID==poslodavacId).FirstOrDefaultAsync();
        try{
            if(poslodavac!=null){
                var feedbacks=await Context.Feedbacks.Where(f=>f.Poslodavac==poslodavac).Include(f=>f.Poslodavac)
                                                                                        .Include(f=>f.Zadrugar)
                                                                                        .Include(f=>f.Zadruga)
                                                                                        .ToListAsync();
                feedbacks.Reverse();   //da bi se ucitale najnovije prvo                                              
                return Ok(feedbacks);
            }
            else{
                return BadRequest("Nije nadjen poslodavac!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
       
    }

    /*[Route("PreuzmiFeedbackPoslodavacZadrugaOglas/{poslodavacUserName}/{zadrugaUserName}/{oglasId}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiFeedbackPoslodavacZadrugaOglas(string poslodavacUserName,string zadrugaUserName,int oglasId){
        var poslodavac = await Context.Poslodavci.Where(p=> p.UserName==poslodavacUserName).FirstOrDefaultAsync();
        var zadruga = await Context.Zadruge.Where(z=> z.UserName==zadrugaUserName).FirstOrDefaultAsync();
        var oglas = await Context.Oglasi.Where(o=>o.ID==oglasId).FirstOrDefaultAsync();
        try{
            if(poslodavac!=null && zadruga!=null && oglas!=null){
                var feedbacks=await Context.Feedbacks.Where(f=>f.Poslodavac==poslodavac && f.Zadruga==zadruga && f.).Include(f=>f.Poslodavac)
                                                                                        .Include(f=>f.Zadrugar)
                                                                                        .Include(f=>f.Zadruga)
                                                                                        .ToListAsync();
                return Ok(feedbacks);
            }
            else{
                return BadRequest("Nije nadjen poslodavac!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
       
    }*/

    [Route("PreuzmiFeedbackZadruga/{zadrugaId}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiFeedbackZadruga(int zadrugaId){
        var zadruga = await Context.Zadruge.Where(z=> z.ID==zadrugaId).FirstOrDefaultAsync();
        try{
            if(zadruga!=null){
                var feedbacks=await Context.Feedbacks.Where(f=>f.Zadruga==zadruga).Include(f=>f.Poslodavac)
                                                                                        .Include(f=>f.Zadrugar)
                                                                                        .Include(f=>f.Zadruga)
                                                                                        .ToListAsync();
                feedbacks.Reverse();//da bi se ucitale najnovije prvo                                                 
                return Ok(feedbacks);
            }
            else{
                return BadRequest("Nije nadjena zadruga!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
       
    }

    [Route("PreuzmiFeedbackZadrugar/{zadrugarId}")]
    [HttpGet]
    public async Task<ActionResult> PreuzmiFeedbackZadrugar(int zadrugarId){
        var zadrugar = await Context.Zadrugari.Where(z=> z.ID==zadrugarId).FirstOrDefaultAsync();
        try{
            if(zadrugar!=null){
                var feedbacks=await Context.Feedbacks.Where(f=>f.Zadrugar==zadrugar).Include(f=>f.Poslodavac)
                                                                                        .Include(f=>f.Zadrugar)
                                                                                        .Include(f=>f.Zadruga)
                                                                                        .ToListAsync();
                feedbacks.Reverse();//da bi se ucitale najnovije prvo                                                 
                return Ok(feedbacks);
            }
            else{
                return BadRequest("Nije nadjen zadrugar!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
       
    }

    [Route("DodajFeedbackPoslodavacZadruga/{poslodavacUsername}/{zadrugaUsername}")]
    [HttpPost]
    public async Task<ActionResult> DodajFeedbackPoslodavacZadruga([FromBody] Feedback feedback, string  poslodavacUsername,string zadrugaUsername){
        var zadruga = await Context.Zadruge.Where(z => z.UserName==zadrugaUsername).FirstOrDefaultAsync();
        var poslodavac = await Context.Poslodavci.Where(p => p.UserName==poslodavacUsername).FirstOrDefaultAsync();

        try{
            if(poslodavac!=null && zadruga!=null){
                
                Feedback noviFeedback = new Feedback();
                noviFeedback.Ocena=feedback.Ocena;
                noviFeedback.Komentar=feedback.Komentar;
                noviFeedback.Zadruga=zadruga;

                Context.Feedbacks.Add(noviFeedback);
                await Context.SaveChangesAsync();

                return Ok("Uspesno dodat feed back!");
            }
            else{
                return BadRequest("Nije nadjena zadruga ili poslodavac!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
       
    }

    [Route("DodajFeedbackPoslodavacZadrugar/{poslodavacUsername}/{zadrugarUsername}")]
    [HttpPost]
    public async Task<ActionResult> DodajFeedbackPoslodavacZadrugar([FromBody] Feedback feedback, string  poslodavacUsername,string zadrugarUsername){
        var zadrugar = await Context.Zadrugari.Where(z => z.UserName==zadrugarUsername).FirstOrDefaultAsync();
        var poslodavac = await Context.Poslodavci.Where(p => p.UserName==poslodavacUsername).FirstOrDefaultAsync();

        try{
            if(poslodavac!=null && zadrugar!=null){
                
                Feedback noviFeedback = new Feedback();
                noviFeedback.Ocena=feedback.Ocena;
                noviFeedback.Komentar=feedback.Komentar;
                noviFeedback.Zadrugar=zadrugar;

                Context.Feedbacks.Add(noviFeedback);
                await Context.SaveChangesAsync();

                return Ok("Uspesno dodat feed back!");
            }
            else{
                return BadRequest("Nije nadjena zadrugar ili poslodavac!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
       
    }

    [Route("DodajFeedbackZadrugaPoslodavac/{zadrugaUsername}/{poslodavacUsername}")]
    [HttpPost]
    public async Task<ActionResult> DodajFeedbackZadrugaPoslodavac([FromBody] Feedback feedback, string  zadrugaUsername,string poslodavacUsername){
        var zadruga = await Context.Zadruge.Where(z => z.UserName==zadrugaUsername).FirstOrDefaultAsync();
        var poslodavac = await Context.Poslodavci.Where(p => p.UserName==poslodavacUsername).FirstOrDefaultAsync();

        try{
            if(poslodavac!=null && zadruga!=null){
                
                Feedback noviFeedback = new Feedback();
                noviFeedback.Ocena=feedback.Ocena;
                noviFeedback.Komentar=feedback.Komentar;
                noviFeedback.Poslodavac=poslodavac;

                Context.Feedbacks.Add(noviFeedback);
                await Context.SaveChangesAsync();

                return Ok("Uspesno dodat feed back!");
            }
            else{
                return BadRequest("Nije nadjena zadruga ili poslodavac!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
       
    }


    [Route("DodajFeedbackZadrugaZadrugar/{zadrugaUsername}/{zadrugarUsername}")]
    [HttpPost]
    public async Task<ActionResult> DodajFeedbackZadrugaZadrugar([FromBody] Feedback feedback, string  zadrugaUsername,string zadrugarUsername){
        var zadruga = await Context.Zadruge.Where(z => z.UserName==zadrugaUsername).FirstOrDefaultAsync();
        var zadrugar = await Context.Zadrugari.Where(p => p.UserName==zadrugarUsername).FirstOrDefaultAsync();

        try{
            if(zadrugar!=null && zadruga!=null){
                
                Feedback noviFeedback = new Feedback();
                noviFeedback.Ocena=feedback.Ocena;
                noviFeedback.Komentar=feedback.Komentar;
                noviFeedback.Zadrugar=zadrugar;

                Context.Feedbacks.Add(noviFeedback);
                await Context.SaveChangesAsync();

                return Ok("Uspesno dodat feedback!");
            }
            else{
                return BadRequest("Nije nadjena zadruga ili zadrugar!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
       
    }


    [Route("DodajFeedbackZadrugarZadruga/{zadrugarUsername}/{zadrugaUsername}")]
    [HttpPost]
    public async Task<ActionResult> DodajFeedbackZadrugarZadruga([FromBody] Feedback feedback, string  zadrugarUsername,string zadrugaUsername){
        var zadrugar = await Context.Zadrugari.Where(z => z.UserName==zadrugarUsername).FirstOrDefaultAsync();
        var zadruga = await Context.Zadruge.Where(p => p.UserName==zadrugaUsername).FirstOrDefaultAsync();

        try{
            if(zadrugar!=null && zadruga!=null){
                
                Feedback noviFeedback = new Feedback();
                noviFeedback.Ocena=feedback.Ocena;
                noviFeedback.Komentar=feedback.Komentar;
                noviFeedback.Zadruga=zadruga;

                Context.Feedbacks.Add(noviFeedback);
                await Context.SaveChangesAsync();

                return Ok("Uspesno dodat feedback!");
            }
            else{
                return BadRequest("Nije nadjena zadruga ili zadrugar!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
       
    }

    
    [Route("DodajFeedbackZadrugarPoslodavac/{zadrugarUsername}/{poslodavacUsername}")]
    [HttpPost]
    public async Task<ActionResult> DodajFeedbackZadrugarPoslodavac([FromBody] Feedback feedback, string  zadrugarUsername,string poslodavacUsername){
        var zadrugar = await Context.Zadrugari.Where(z => z.UserName==zadrugarUsername).FirstOrDefaultAsync();
        var poslodavac = await Context.Poslodavci.Where(p => p.UserName==poslodavacUsername).FirstOrDefaultAsync();

        try{
            if(zadrugar!=null && poslodavac!=null){
                
                Feedback noviFeedback = new Feedback();
                noviFeedback.Ocena=feedback.Ocena;
                noviFeedback.Komentar=feedback.Komentar;
                noviFeedback.Poslodavac=poslodavac;

                Context.Feedbacks.Add(noviFeedback);
                await Context.SaveChangesAsync();

                return Ok("Uspesno dodat feedback!");
            }
            else{
                return BadRequest("Nije nadjena poslodavac ili zadrugar!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
       
    }

    [Route("VratiProsecnuOcenuZadrugar/{zadrugarId}")]
    [HttpGet]
    public async Task<ActionResult> VratiProsecnuOcenuZadrugar(int zadrugarId){
        var zadrugar = await Context.Zadrugari.Where(z=> z.ID==zadrugarId).FirstOrDefaultAsync();
        try{
            if(zadrugar!=null){
                var feedbacks=await Context.Feedbacks.Where(f=>f.Zadrugar==zadrugar).Include(f=>f.Poslodavac)
                                                                                        .Include(f=>f.Zadrugar)
                                                                                        .Include(f=>f.Zadruga)
                                                                                        .ToListAsync();
                double sumaOcena = 5; // da bi u startu (iako nije ocenjen ni od koga) imao maksimalnu ocenu
                var brojOcena = 1;
                foreach (var fb in feedbacks)
                {
                    sumaOcena+=fb.Ocena;
                    brojOcena++;
                }
                var prosecnaOcena = Math.Round(sumaOcena/(double)brojOcena, 2);
                                                                 
                return Ok(prosecnaOcena);
            }
            else{
                return BadRequest("Nije nadjen zadrugar!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
       
    }

    [Route("VratiProsecnuOcenuZadruga/{zadrugaId}")]
    [HttpGet]
    public async Task<ActionResult> VratiProsecnuOcenuZadruga(int zadrugaId){
        var zadruga = await Context.Zadruge.Where(z=> z.ID==zadrugaId).FirstOrDefaultAsync();
        try{
            if(zadruga!=null){
                var feedbacks=await Context.Feedbacks.Where(f=>f.Zadruga==zadruga).Include(f=>f.Poslodavac)
                                                                                        .Include(f=>f.Zadrugar)
                                                                                        .Include(f=>f.Zadruga)
                                                                                        .ToListAsync();
                double sumaOcena = 5; // da bi u startu (iako nije ocenjen ni od koga) imao maksimalnu ocenu
                var brojOcena = 1;
                foreach (var fb in feedbacks)
                {
                    sumaOcena+=fb.Ocena;
                    brojOcena++;
                }
                var prosecnaOcena = Math.Round(sumaOcena/(double)brojOcena, 2);
                                                                 
                return Ok(prosecnaOcena);
            }
            else{
                return BadRequest("Nije nadjena zadruga!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
       
    }

    [Route("VratiProsecnuOcenuPoslodavac/{poslodavacId}")]
    [HttpGet]
    public async Task<ActionResult> VratiProsecnuOcenuPoslodavac(int poslodavacId){
        var poslodavac = await Context.Poslodavci.Where(z=> z.ID==poslodavacId).FirstOrDefaultAsync();
        try{
            if(poslodavac!=null){
                var feedbacks=await Context.Feedbacks.Where(f=>f.Poslodavac==poslodavac).Include(f=>f.Poslodavac)
                                                                                        .Include(f=>f.Zadrugar)
                                                                                        .Include(f=>f.Zadruga)
                                                                                        .ToListAsync();
                double sumaOcena = 5; // da bi u startu (iako nije ocenjen ni od koga) imao maksimalnu ocenu
                var brojOcena = 1;
                foreach (var fb in feedbacks)
                {
                    sumaOcena+=fb.Ocena;
                    brojOcena++;
                }
                var prosecnaOcena = Math.Round(sumaOcena/(double)brojOcena, 2);
                                                                 
                return Ok(prosecnaOcena);
            }
            else{
                return BadRequest("Nije nadjen poslodavac!");
            }
        }
        catch(Exception e){
            return BadRequest(e.Message);
        }
       
    }
}