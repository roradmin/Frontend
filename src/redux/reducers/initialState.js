
const initialState = {
    providersList: [],
    ingredientsList: [],
    dishesList: [],
    loggedInUser: {},
    isLoading: false,
    forms: {},
    catagoriesList:[],
    currentPath: [],
    basicConfiguration:{
        currency: {
            currencyName: 'Shekel',
            currencyLabel: 'ILS',
            sign: '₪'
        },
        language: 'en'
    }
}
export default initialState;