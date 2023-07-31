namespace OnePlace.BOL.Exceptions
{
    public class ValidationException : DomainException
    {
        public ValidationException(Dictionary<string, List<string>> errors)
        {
            Errors = errors;
        }

        public override string Name => "Надіслані дані не відповідають вимогам";
        public Dictionary<string, List<string>> Errors { get; }

        public ValidationException(string notValidProperty, params string[] errors)
            : this(new Dictionary<string, List<string>> {
                { notValidProperty, errors.ToList() }
            })
        { }
    }

}
