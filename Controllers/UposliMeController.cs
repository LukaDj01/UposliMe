namespace UposliMe.Controllers;

[ApiController]
[Route("[controller]")]
public class UposliMeController : ControllerBase
{
    public UposliMeContext Context { get; set; }

    public UposliMeController(UposliMeContext context)
    {
        Context = context;
    }
}
