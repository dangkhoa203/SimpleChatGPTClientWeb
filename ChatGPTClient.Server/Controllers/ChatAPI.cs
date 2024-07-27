using ChatGPTClient.Server.Model;
using ChatGPTClient.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OpenAI_API;
using OpenAI_API.Moderation;

namespace ChatGPTClient.Server.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class ChatAPI : ControllerBase {
        public readonly IOpenAIService Client;
        public ChatAPI() {
            OpenAIAPI api = new OpenAIAPI("Your API Key Here");
            var client = new OpenAIService(api);
            Client = client;
        }
        [HttpPost("chat")]
        public async Task<IActionResult> Chatting(ReceivePrompt p) {
            ChatPrompt result = await Client.getResult(p.Prompt); 
            return Ok(result);
        }
    }
}
