namespace Models;

public class Oglas{

    [Key]
    public int ID { get; set; }

    [Required]
    [MaxLength(50)]
    public string Naziv { get; set; }

    [Required]
    [MaxLength(10000)]
    public string Opis { get; set; }

    [Required]
    [Range(1,999)]
    public int BrojPotrebnihRadnika { get; set; }

    [Required]
    [MaxLength(20)]
    public string Grad { get; set; }

    [Required]
    [MaxLength(50)]
    public string Ulica { get; set; }

    [MaxLength(3)]
    public string BrojStana { get; set; }

    [MaxLength(3)]
    public string BrojUlaza { get; set; }

    [Required]
    public DateTime RokZaPrijavu { get; set; }

    public DateTime DatumPostavljanja { get; set; }

    [Required]
    public DateTime DatumIzvrsavanjaPosla { get; set; }

    [Required]
    [MaxLength(50)]
    public string Tip { get; set; }

    [Required]
    [Range(1,9999999)]
    public double Novac { get; set; }

    [Required]
    [MaxLength(50)]
    public string NacinPlacanja { get; set; }

    [Required]
    public bool Odobren { get; set; } 

    [Required]
    public bool OdabraniRadnici { get; set; } 

    [Required]
    public bool NapravljenUgovor { get; set; }

    [Required]
    public bool Aktuelan { get; set; }    //sprecava serijaliyaciju prilikom includa
    public List<OglasZadrugar> OglasiZadrugari { get; set; }
    
    public Zadruga Zadruga { get; set; }
    public Poslodavac Poslodavac { get; set; }

}
