import AsyncStorage from '@react-native-async-storage/async-storage';
import { isToday } from "date-fns";

const FOOD_STORAGE_KEY = '@MyFood:Key';
const MY_TODAY_FOOD_KEY = '@MyTodayFood:Key'

const useFoodStorage = () => {
    const handleSaveFood = async ({ calories, name, portion }) => {
        try {
            const currentSaveFood = await AsyncStorage.getItem(FOOD_STORAGE_KEY)

            if (currentSaveFood !== null) {
                const currentSaveFoodParsed = JSON.parse(currentSaveFood)
                currentSaveFoodParsed.push({
                    calories,
                    name,
                    portion,
                })
                await AsyncStorage.setItem(
                    FOOD_STORAGE_KEY,
                    JSON.stringify(currentSaveFoodParsed)
                )

                return Promise.resolve()
            }

            await AsyncStorage.setItem(
                FOOD_STORAGE_KEY,
                JSON.stringify([
                    {
                        calories,
                        name,
                        portion,
                    }
                ])
            )

            return Promise.resolve()
        } catch (error) {
            return Promise.reject(error)
        }
    }

    const handleGetFoods = async () => {
        try {
            const foods = await AsyncStorage.getItem(FOOD_STORAGE_KEY)

            if (foods !== null) {
                const parseFoods = JSON.parse(foods)
                return Promise.resolve(parseFoods)
            }
        } catch (error) {
            return Promise.reject(error)
        }
    }

    const handleDeleteFood = async ({ calories, name, portion }) => {
        try {
            const foods = await AsyncStorage.getItem(FOOD_STORAGE_KEY,)
            if (foods !== null) {
                await AsyncStorage.removeItem(FOOD_STORAGE_KEY)
                return Promise.resolve()
            }
        } catch (error) {
            return Promise.reject(error)
        }
    }

    const handleSaveTodayFood = async ({ calories, name, portion }) => {
        try {
            const currentSaveFood = await AsyncStorage.getItem(MY_TODAY_FOOD_KEY)

            if (currentSaveFood !== null) {
                const currentSaveFoodParsed = JSON.parse(currentSaveFood)
                currentSaveFoodParsed.push({
                    calories,
                    name,
                    portion,
                    date: new Date().toISOString(),
                })
                await AsyncStorage.setItem(
                    MY_TODAY_FOOD_KEY,
                    JSON.stringify(currentSaveFoodParsed)
                )

                return Promise.resolve()
            }

            await AsyncStorage.setItem(
                MY_TODAY_FOOD_KEY,
                JSON.stringify([
                    {
                        calories,
                        name,
                        portion,
                        date: new Date().toISOString(),
                    }
                ])
            )

            return Promise.resolve()
        } catch (error) {
            return Promise.reject(error)
        }

    }

    const handleGetTodayFood = async () => {
        try {
            const foods = await AsyncStorage.getItem(MY_TODAY_FOOD_KEY)

            if (foods !== null) {
                const parseFoods = JSON.parse(foods)
                return Promise.resolve(parseFoods.filter(meal => meal.date && isToday(new Date(meal.date))))
            }
        } catch (error) {
            return Promise.reject(error)
        }
    }

    const handleDeleteTodayFood = async (index) => {
        try {
            const todayFood = await handleGetTodayFood()
            const filterItems = todayFood.filter((item, itemIndex) => {
                return itemIndex !== index
            })

            await AsyncStorage.setItem(
                MY_TODAY_FOOD_KEY, 
                JSON.stringify(filterItems)
            )
            return Promise.resolve()
        } catch (error) {
            return Promise.reject(error)
        }
    }

    return {
        onSaveFood: handleSaveFood,
        onGetFoods: handleGetFoods,
        onDeleteFood: handleDeleteFood,
        onSaveTodayFood: handleSaveTodayFood,
        onGetTodayFood: handleGetTodayFood,
        onDeleteTodayFood: handleDeleteTodayFood,
    }
}

// Guardar Informacion de comidas del dia de hoy
// Metodo para obtener la comida del día de hoy

export default useFoodStorage