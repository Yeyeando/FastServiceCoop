import React, { createContext, useContext, useState } from "react";
interface Dish {
  title: string;
  image: string;
  table?: number;
  category?: string;
  ingredients?: number[];
}

interface DishContextType {
  selectedDishes: Dish[];
  addDish: (dish: Dish, table?: number) => void;
  removeDish: (index: number) => void;
  clearDishes: (table?: number) => void;
}

const DishContext = createContext<DishContextType | undefined>(undefined);

export const DishProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [selectedDishes, setSelectedDishes] = useState<Dish[]>([]);

  const addDish = (dish: Dish, table?: number) => {
    setSelectedDishes((prev) => [...prev, { ...dish, table }]);
  };
  const removeDish = (index: number) => {
    setSelectedDishes((prev) => prev.filter((_, i) => i !== index));
  };

  const clearDishes = (table?: number) => {
    if (table !== undefined) {
      setSelectedDishes((prev) => prev.filter((dish) => dish.table !== table));
    }
  };

  return (
    <DishContext.Provider
      value={{ selectedDishes, addDish, removeDish, clearDishes }}
    >
      {children}
    </DishContext.Provider>
  );
};
export const useDishContext = () => {
  const context = useContext(DishContext);
  if (!context) {
    throw new Error("useDishContext must be used within a DishProvider");
  }
  return context;
};
