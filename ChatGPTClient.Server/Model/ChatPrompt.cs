namespace ChatGPTClient.Server.Model
{
    public class ChatPrompt
    {
        public string Prompt { get; set; }
        public string Message { get; set; }
        public DateTime TimeOfPrompt { get; set; }
        public DateTime TimeOfMessage { get; set; }
        public ChatPrompt()
        {
            Prompt = string.Empty;
            Message = string.Empty;
            TimeOfPrompt = DateTime.Now;
            TimeOfMessage = DateTime.Now;
        }
        public ChatPrompt(string input, string output,DateTime receivetime)
        {
            this.Prompt = input;
            this.Message = output;
            this.TimeOfPrompt = DateTime.Now;
            this.TimeOfMessage = receivetime;
        }

        

    }
}
