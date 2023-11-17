export const getFullPath = (id, categoriesForSelect, categoryPath) =>
{
    let category = categoriesForSelect.find(c => c.id === Number(id));

    if (category !== undefined)
    {
        categoryPath.current.push({
            id: category.id,
            name: category.name
        });
    }
    else
        return categoryPath;

    let parentCategory = categoriesForSelect.find(c => c.id === Number(category.parentCategoryId));
    if (parentCategory !== undefined)
    {
        getFullPath(parentCategory.id, categoriesForSelect, categoryPath)
    }
    else
        return categoryPath;
}