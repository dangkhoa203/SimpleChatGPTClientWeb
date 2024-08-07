using ChatGPTClient.Server.Model;
using ChatGPTClient.Server.Services;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using OpenAI_API;
using OpenAI_API.Chat;
using OpenAI_API.Moderation;

namespace ChatGPTClient.Server.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class ChatAPI : ControllerBase {
        public readonly IOpenAIService Client;
        public ChatAPI(IOpenAIService client) {
            Client = client;
        }
        [HttpPost("chat")]
        public async Task<IActionResult> Chatting(ReceivePrompt p) {
            ChatPrompt result = await Client.getResult(p.Prompt);
            if (result == null) {
                Client.CreateConversation();
            }
            return Ok(result);
        }
        [HttpPut("erasehistory")]
        public IActionResult ClearHistory() {
            Client.Conversation=Client.CreateConversation();
            return Ok("History clear");
        }
    }
}
