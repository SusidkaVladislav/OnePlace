namespace OnePlace.BOL.Exceptions
{
    public class BusinessException : DomainException
    {
        public override string Name => "Помилка виконання бізнес-логіки";

        public BusinessException(string message)
            : base(message)
        { }

        public BusinessException(string message, Exception innerException)
            : base(message, innerException)
        { }
    }
}
