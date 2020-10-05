
const envConfig = () => {
    // after env configuration
    const baseUrl = 'https://nodejs-service-dev.herokuapp.com';
    return {
        providersUrl: `${baseUrl}/v1/providers`,
        providerExternal: `${baseUrl}/v1/providersexternal`,
        ingredientUrl: `${baseUrl}/v1/ingredients`,
        ingredientExternal: `${baseUrl}/v1/ingredientsexternal`,
        usersUrl: `${baseUrl}/v1/users`,
        authUrl: `${baseUrl}/v1/auth`,
        permissionsUrl: `${baseUrl}/v1/permissions`,
        ordersUrl: `${baseUrl}/v1/orders`,
        baseUrl
    }
}

export default envConfig; 