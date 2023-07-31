namespace OnePlace.BOL.Exceptions
{
    public class NotFoundException: DomainException
    {
        public override sealed string Name => "Ресурс не знайдено";

        private static string IdNotFoundMessageTemplate => "Не вдалося знайти ресурс за ідентифікатором: {0}";

        private static string IdForTypeNotFoundMessageTemplate => "Не вдалося знайти {0} за ідентифікатором: {1}";

        public NotFoundException(string message)
            : base(message)
        { }

        public NotFoundException(Guid id)
            : base(String.Format(IdNotFoundMessageTemplate, id))
        { }

        public NotFoundException(long id)
            : base(String.Format(IdNotFoundMessageTemplate, id))
        { }

        public NotFoundException(Guid id, string type)
            : base(String.Format(IdForTypeNotFoundMessageTemplate, type, id))
        { }

        public NotFoundException(long id, string type)
            : base(String.Format(IdForTypeNotFoundMessageTemplate, type, id))
        { }

        public NotFoundException(string message, Exception innerException)
            : base(message, innerException)
        { }
    }
}
