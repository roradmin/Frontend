
import React from 'react';

const IngredientContext = React.createContext();
export const IngredientContextProvider = IngredientContext.Provider;
export const IngredientContextConsumer = IngredientContext.Consumer;

export default IngredientContext;