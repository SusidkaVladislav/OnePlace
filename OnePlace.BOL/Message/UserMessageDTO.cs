namespace OnePlace.BOL.Message
{
    public class UserMessageDTO
    {
        public int MessageId { get; set; }
        public int ProductId { get; set; }
        public string PictureAddress { get; set; }
        public string ProductName { get; set; }
        public DateTime Date { get; set; }
        public string MessageText { get; set; }
        public bool IsReplied { get; set; }
    }
}
