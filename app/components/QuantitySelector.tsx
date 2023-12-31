import React, { useState } from "react";

interface QuantitySelectorProps {
  initialQuantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

const QuantitySelector: React.FC<QuantitySelectorProps> = ({
  initialQuantity,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleIncrease = () => {
    const newQuantity = quantity + 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const handleDecrease = () => {
    const newQuantity = quantity > 1 ? quantity - 1 : 1;
    setQuantity(newQuantity);
    onQuantityChange(newQuantity);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuantity = parseInt(e.target.value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      setQuantity(newQuantity);
      onQuantityChange(newQuantity);
    }
  };

  return (
    <div className="flex w-full md:w-auto">
      <div className="flex items-center px-4 py-1 quantity-selector">
        <button
          onClick={handleDecrease}
          className={`px-2 py-1 font-bold ${
            quantity <= 1
              ? "text-zinc-400/80 cursor-not-allowed"
              : "text-zinc-600 hover:text-zinc-800"
          } `}
          disabled={quantity <= 1}
        >
          −
        </button>
        <input
          type="text"
          className="w-12 font-medium text-center border-none outline-none text-md text-zinc-900 focus:ring-0"
          value={quantity}
          onChange={handleInputChange}
          min="1"
        />
        <button
          onClick={handleIncrease}
          className="px-2 py-1 font-bold text-zinc-600"
        >
          +
        </button>
      </div>
    </div>
  );
};

export default QuantitySelector;
