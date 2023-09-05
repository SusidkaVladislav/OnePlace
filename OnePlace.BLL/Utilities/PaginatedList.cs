﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.BLL.Utilities
{
    /// <summary>
    /// Пагінований список для відфільтрованих одиниць
    /// </summary>
    /// <typeparam name="T"></typeparam>
    public class PaginatedList<T>
    {
        public List<T> Items { get; set; } = new List<T>();
        public int Total { get; set; } = 0;
    }
}