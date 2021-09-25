import React, { useEffect, useState } from 'react';
import { addToDb, getDb } from '../../localstorage/localstorage';
import Meal from '../Meal/Meal';
import OrderList from '../OrderList/OrderList';
import './Restaurant.css';

const Restaurant = () => {
    const [meals, setMeals] = useState([]);
    const [order, setOrder] = useState([]);

    useEffect(() => {
        fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=fish')
            .then(res => res.json())
            .then(data => setMeals(data.meals));
    }, []);
    /* 
        The above api link or the below method will now work for search. 
        if you want to implement search in this code. 
        1. add a input field 
        2. declare a state to keep search field text
        3. Make meal loading api to dependant on search text
        4. change the meal loading api.you will get the right api link on their website.
        5. make the meal loading api dynamic using template string. 
        6. Also, the useEffect below will not work. Because, search result might not include the meals previously added to the cart
        7. in that case, for each mealId, you have to load the meal from the api (you will find a new pai to load meal by Id) and then add them to the order state.
        ---------------  
        Read carefully, give it a try. [ Ki ache jibone]
        if  you need help, let us know in the support session
    */
    useEffect(() => {
        if (meals.length) {
            const savedDb = getDb();
            const savedOrder = [];
            for (const mealId in savedDb) {
                const meal = meals.find(ml => ml.idMeal === mealId)
                const quantity = savedDb[mealId];
                meal.quantity = quantity;
                savedOrder.push(meal);
            }
            setOrder(savedOrder);
        }
    }, [meals])

    const handleAddToOrder = meal => {
        meal.quantity = 1;
        const newOrder = [...order, meal];
        setOrder(newOrder);
        addToDb(meal.idMeal);
    }

    return (
        <div className="restaurant-menu">
            <div className="meals-container">
                {
                    meals.map(meal => <Meal
                        key={meal.idMeal}
                        meal={meal}
                        handleAddToOrder={handleAddToOrder}
                    ></Meal>)
                }
            </div>
            <div className="order-list">
                <OrderList order={order}></OrderList>
            </div>
        </div>

    );
};

export default Restaurant;