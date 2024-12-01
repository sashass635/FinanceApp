import { useState } from "react";
import { useCategories } from "./Categories.state";
import CategoryForm from "./CategoryForm/CategoryForm";

const CategoryList = () => {
  const { categories, loading, error, deleteCategory, addCategory } = useCategories();
  const [isFormVisible, setIsFormVisible] = useState(false);

  const toggleForm = () => {
    setIsFormVisible((prev) => !prev);
  };

  if (loading) {
    return <div>Loading categories...</div>;
  }

  return (
    <div>
      <h2>Categories</h2>

      <button onClick={toggleForm}>{isFormVisible ? "Back" : "Add Category"}</button>

      {isFormVisible && <CategoryForm onAddCategory={addCategory} onCancel={toggleForm} />}

      {categories.length > 0 ? (
        <ul>
          {categories.map((category) => (
            <li key={category.id}>
              <strong>{category.name}</strong> - {category.description}
              {category.dateAdded && <small> (Added: {new Date(category.dateAdded).toLocaleDateString()})</small>}
              <button onClick={() => deleteCategory(category.id)}>Delete</button>
            </li>
          ))}
        </ul>
      ) : (
        <div>No categories found</div>
      )}
    </div>
  );
};

export default CategoryList;
