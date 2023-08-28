namespace OnePlace.DAL.Enums
{
    public enum PaymentStatus
    {
        /// <summary>
        /// The customer completed payment on your checkout page
        /// </summary>
        Succeeded,

        /// <summary>
        /// The customer didn't complete the checkout
        /// </summary>
        RequiresAction,

        /// <summary>
        /// The customer's payment failed on your checkout page
        /// </summary>
        RequiresPaymentMethod
    }
}
