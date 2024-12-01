import { useState } from "react";

type CategoryFormProps = {
  onAddCategory: (name: string, description: string) => void;
  onCancel: () => void;
};

const CategoryForm = ({ onAddCategory, onCancel }: CategoryFormProps) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    if (name && description) {
      onAddCategory(name, description);
      setName("");
      setDescription("");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>
          Name:
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </label>
      </div>
      <div>
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} required />
        </label>
      </div>
      <button type="submit">Add Category</button>
      <button type="button" onClick={onCancel}>
        Cancel
      </button>
    </form>
  );
};

export default CategoryForm;
