import React, { useState } from 'react';

interface Item {
  id: number;
  name: string;
  category: string;
}

const items: Item[] = [
  { id: 1, name: 'Item 1', category: 'Category A' },
  { id: 2, name: 'Item 2', category: 'Category B' },
  { id: 3, name: 'Item 3', category: 'Category C' },
  { id: 4, name: 'Item 4', category: 'Category C' },
];

const FilterButton: React.FC = () => {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>(items);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const handleCheckboxChange = (category: string) => {
    if (selectedCategories.includes(category)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== category));
    } else {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const handleFilterClick = () => {
    setIsFilterOpen(!isFilterOpen);
    if (isFilterOpen) {
      setFilteredItems(items);
    } else {
      if (selectedCategories.length > 0) {
        setFilteredItems(
          items.filter((item) => selectedCategories.includes(item.category))
        );
      } else {
        setFilteredItems(items);
      }
    }
  };

  const uniqueCategories = [...new Set(items.map((item) => item.category))];

  return (
    {uniqueCategories.map((category)=> (
      <input
        type="checkbox"
        id={category}
        checked={selectedCategories.includes(category)}
        onChange={() => handleCheckboxChange(category)}/>
        <label htmlFor={category}>{category}</label>
    ))}
  )
};
