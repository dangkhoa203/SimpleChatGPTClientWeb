using ChatGPTClient.Server.Model;
using OpenAI_API;
using OpenAI_API.Chat;
using OpenAI_API.Models;
namespace ChatGPTClient.Server.Services {
    public interface IOpenAIService {
        public IOpenAIAPI Client { get; }
        public Conversation Conversation { get; set; }
        public Conversation CreateConversation();
        public Task<ChatPrompt> getResult(string prompt);
    }
    public class OpenAIService : IOpenAIService {
        public IOpenAIAPI Client {
            get;
        }
        public Conversation Conversation { get; set; }
        public OpenAIService() {
            Client = new OpenAIAPI("Add your apikey here");
            Conversation = CreateConversation();
        }
        public Conversation CreateConversation() {
            try {
                Conversation conversation = Client.Chat.CreateConversation();
                conversation.Model = OpenAI_API.Models.Model.ChatGPTTurbo;
                conversation.RequestParameters.Temperature = 1;
                return conversation;
            }
            catch (Exception ex) {
                return null;
            }
        }
        public async Task<ChatPrompt> getResult(string prompt) {
            if (Conversation == null) {
                return null;
            }
            var result = new ChatPrompt();
            result.Prompt = prompt;
            Conversation.AppendUserInput(prompt);
            try {
                result.Message = await Conversation.GetResponseFromChatbotAsync();
                result.TimeOfMessage = DateTime.Now;
            }
            catch (Exception ex) {
                return null;
            }
            return result;
        }
    }
}
