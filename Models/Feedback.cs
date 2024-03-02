namespace Models;

public class Feedback{

    [Key]
    public int ID { get; set; }

    [Range(1,5)]
    public double Ocena { get; set; }

    [MaxLength(10000)]
    public string Komentar { get; set; }
    
    //[JsonIgnore]
    public Zadrugar Zadrugar { get; set; }
    //[JsonIgnore]
    public Zadruga Zadruga { get; set; }
    //[JsonIgnore]
    public Poslodavac Poslodavac { get; set; }

}