namespace OnePlace.BOL.Exceptions
{
    public abstract class DomainException: Exception
    {
        public abstract string Name { get; }

        public DomainException()
        {

        }

        public DomainException(string message)
        :base(message){}

        public DomainException(string message, Exception innerException)
        : base(message, innerException) { }
    }
}
