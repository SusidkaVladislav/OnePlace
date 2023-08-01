﻿using OnePlace.DAL.EF;
using OnePlace.DAL.Entities;
using OnePlace.DAL.Interfaces;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace OnePlace.DAL.Repositories
{
    public class ColorReository : IRepository<Color>
    {
        private AppDbContext db;
        public ColorReository(AppDbContext context)
        {
            this.db = context;
        }
        public void Create (Color item)
        {
            db.Colors.Add(item);
        }

        public void Delete(int id)
        {
            Color color = db.Colors.FirstOrDefault(o => o.Id == id);
            if (color != null)
            {
                db.Colors.Remove(color);
            }
        }

        public IEnumerable<Color> Find(Func<Color, bool> predicate)
        {
            return db.Colors.Where(predicate).ToList();
        }

        public Color Get(int id)
        {
            return db.Colors.FirstOrDefault(o => o.Id == id);
        }

        public async Task<List<Color>> GetAll()
        {
            return await db.Colors.ToListAsync();
        }

        public void Update(Color item)
        {
            db.Entry(item).State = (Microsoft.EntityFrameworkCore.EntityState)EntityState.Modified;
        }
    }
}
