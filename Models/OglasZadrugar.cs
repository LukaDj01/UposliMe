namespace Models;

public class OglasZadrugar{

    [Key]
    public int ID { get; set; }
    
    
    public Zadrugar Zadrugar { get; set; }
    
    [JsonIgnore]
    public Oglas Oglas { get; set; }

}
