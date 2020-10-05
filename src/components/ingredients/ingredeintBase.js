const IngredientBase = ({
    name = '',
    amountPerServing = {amount: "0", scale: ""},
    orderValue = {quantity: "0", scale: "Gram"},
    cost = {price: "0", currency: "ils"},
    provider,
    identifier = 'test',
    minimumInStock = 0,
    desiredInStock = 0
}) => ({
        name,
        amountPerServing,
        orderValue,
        cost,
        provider,
        identifier,
        minimumInStock,
        desiredInStock
});
export default IngredientBase; 

