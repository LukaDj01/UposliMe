namespace Models;

public class Ugovor{

    [Key]
    public int ID { get; set; }

    [Required]
    [MaxLength(10000)]
    public string Opis { get; set; }
    
    public DateTime DatumFormiranja { get; set; }
    //[JsonIgnore]
    public Zadrugar Zadrugar { get; set; }
    //[JsonIgnore]
    public Zadruga Zadruga { get; set; }
    //[JsonIgnore]
    public Poslodavac Poslodavac { get; set; }
    //[JsonIgnore]
    public Oglas Oglas { get; set; }


}
