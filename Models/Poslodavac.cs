namespace Models;

public class Poslodavac {

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
    [MinLength(9)]
    [MaxLength(9)]
    [RegularExpression(@"\d+")]
    public string PIB { get; set; }

    [Required]
    [MinLength(8)]
    [MaxLength(8)]
    [RegularExpression(@"\d+")]
    public string MaticniBroj { get; set; }

    [MaxLength(300)]
    public string Slika { get; set; }

    [MaxLength(100)]
    [DataType(DataType.EmailAddress)]
    [EmailAddress]
    public string Email { get; set; }

    [MaxLength(20)]
    [RegularExpression(@"\d+")]
    public string FiksniTelefon { get; set; }

    [MaxLength(20)]
    [RegularExpression(@"\d+")]
    public string MobilniTelefon { get; set; }

    [Required]
    [MaxLength(50)]
    public string Naziv { get; set; }

    [Required]
    [MaxLength(50)]
    public string Delatnost { get; set; }

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

    [MaxLength(10000)]
    public string Informacije { get; set; }
    
    [JsonIgnore]
    public List<Feedback> Feedbacks { get; set; }
    [JsonIgnore]
    public List<Oglas> Oglasi { get; set; }
    [JsonIgnore]
    public List<Ugovor> Ugovori { get; set; }
    [JsonIgnore]
    public List<NotifikacijaPoslodavac> NotifikacijePoslodavci { get; set; }

    
}
