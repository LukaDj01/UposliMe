namespace Models;

public class Zadrugar {

    [Key]
    public int ID { get; set; } 

    [Required]
    [MaxLength(20)]
    public string UserName { get; set; }

    [Required]
    [MaxLength(20)]
    [RegularExpression(@"^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$",ErrorMessage = "Nevalidan password!")]
    public string Password { get; set; }

    [Required]
    [MaxLength(20)]
    public string Ime { get; set; }

    [Required]
    [MaxLength(30)]
    public string Prezime { get; set; }

    [MaxLength(300)]
    public string Slika { get; set; }

    [MaxLength(100)]
    [DataType(DataType.EmailAddress)]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [MaxLength(20)]
    [RegularExpression(@"\d+")]
    public string Telefon { get; set; }

    [DataType(DataType.Date)]
    public DateTime DatumRodjenja { get; set; }
    
    [Required]
    [MinLength(13)]
    [MaxLength(13)]
    [RegularExpression(@"\d+")]
    public string JMBG { get; set; }

    [MaxLength(50)]
    public string SrednjaSkola { get; set; }

    [MaxLength(50)]
    public string Fakultet { get; set; }

    [Range(1,999999)]
    public int Indeks { get; set; }

    [MinLength(11)]
    [MaxLength(11)]
    [RegularExpression(@"\d+")]
    public string LBO { get; set; }

    [Required]
    [MaxLength(30)]
    [RegularExpression(@"\d+")]
    public string BrojRacuna { get; set; }

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

    [JsonIgnore]
    public List<Feedback> Feedbacks { get; set; }
    [JsonIgnore]
    public List<OglasZadrugar> OglasiZadrugari { get; set; }
    [JsonIgnore]
    public List<Ugovor> Ugovori { get; set; }
    [JsonIgnore]
    public List<NotifikacijaZadrugar> NotifikacijeZadrugari { get; set; }

    
}
