namespace OnePlace.BOL.Analitics
{
    public class FiltersInfo
    {
        public Dictionary<int, string> Manufacturers { get; set; } = new Dictionary<int, string>();
        public Dictionary<int, string> Countries { get; set; } = new Dictionary<int, string>();
        public Dictionary<int, string> Colors { get; set; } = new Dictionary<int, string>();
        public Dictionary<string, HashSet<string>> DescriptionFilters { get; set; } = new Dictionary<string, HashSet<string>>();
    }
}
