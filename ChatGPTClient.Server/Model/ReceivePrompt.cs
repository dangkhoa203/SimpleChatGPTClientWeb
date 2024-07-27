namespace ChatGPTClient.Server.Model {
    public class ReceivePrompt {
        public required string Prompt { get; set; }
        public ReceivePrompt()
        {
            
        }
        public ReceivePrompt(string p)
        {
            Prompt = p;
        }
    }
}
