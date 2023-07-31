namespace OnePlace.BOL.Exceptions.Handlers
{
    public class BusinessExceptionHandler: DomainExceptionHandler<BusinessException>
    {
        protected override int Status => 475;
    }
}
