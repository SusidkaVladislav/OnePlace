namespace OnePlace.BOL.OrderPayload.CardDataPayload
{
    public class CardData
    {
        public string Number { get; set; }
        public int ExpireMonth { get; set; }
        public int ExpireYear { get; set; }
        public int CVV { get; set; }
    }
}