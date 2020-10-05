
const DishBase = ({
    name = '',
    categoryId = 0,
    description = '',
    price = '0',
    currency = 'ils',
    ingredients = []
}) => ({
  name: name,
  category: null,
  description: description,
  cost: {price,currency},
  ingredients: ingredients
});

export default DishBase;
