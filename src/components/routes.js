import React from "react";
import {Switch,Route} from 'react-router-dom';
import Home from './home/home';
import ErrorPage from './common/errorPage';
import ProviderComponent from './providers/providerComponent';
import IngredientsPage from './ingredients/ingredientsPage';
import IngredientComponent from './ingredients/ingredientComponent';
import IngredientCreation from './ingredients/ingredientCreation';
import ProviderCreation from './providers/providerCreation';
import LoginComponent from './common/authentication/loginComponent';
import DishesPage from './dishes/dishesPage';
import PermissionPage from './permissions/permissionsPage';
import ProvidersPage from './providers/providersPage';
import TablesArea from './home/tablesArea/tablesArea';


export default ({userLoggedIn}) => <Switch>                
    <Route exact path="/" component = {userLoggedIn ? Home : LoginComponent}/>
    <Route exact path="/Providers" component={userLoggedIn? ProvidersPage :LoginComponent}/>
    <Route exact path="/Providers/Provider/:providerId" component={userLoggedIn?ProviderComponent :LoginComponent}/>                 
    <Route exact path="/Providers/providerCreation" component={userLoggedIn?ProviderCreation :LoginComponent}/>
    <Route exact path="/ingredients" component={userLoggedIn?IngredientsPage :LoginComponent}/>     
    <Route exact path="/ingredients/Ingredient/:ingredientId" component={userLoggedIn?IngredientComponent :LoginComponent}/>                 
    <Route exact path="/ingredients/IngredientCreation" component={userLoggedIn?IngredientCreation :LoginComponent}/>
    <Route exact path="/permissions" component={userLoggedIn? PermissionPage :LoginComponent}/>
    <Route exact path="/Dishes" component={userLoggedIn? DishesPage :LoginComponent}/>
    <Route exact path="/Dishes/menu" component={userLoggedIn? DishesPage :LoginComponent}/>                                                                                                                 
    <Route exact path="/Dishes/dishCreation" component={userLoggedIn? DishesPage :LoginComponent}/>   
    <Route exact path="/Tables" component = {userLoggedIn ? TablesArea : LoginComponent}/>                                   
    <Route exact path="/Login" component = {userLoggedIn ? Home : LoginComponent}/>
    <Route component = {ErrorPage} />
</Switch>
