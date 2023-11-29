import { Alert, ScrollView, StyleSheet, Text, View } from "react-native"
import Header from "../../components/Header"
import { Button, Icon } from '@rneui/themed';
import { useNavigation, useFocusEffect } from "@react-navigation/native";
import useFoodStorage from "../../hooks/useFoodStorage";
import { useState } from "react";
import { useCallback } from "react";
import TodayCalories from "../../components/TodayCalories";
import MealItems from "../../components/MealItem/MealItems";

const totalCaloriesPerDay = 2000

const Home = () => {

    const [todayFood, setTodayFood] = useState([])
    const [todayStadistics, setTodayStadistics] = useState({})
    const { onGetTodayFood, onDeleteTodayFood } = useFoodStorage()
    const { navigate } = useNavigation()

    const calculateTodayStadistic = (meals) => {
        try {
            const caloriesConsumed = meals?.reduce(
                (acc, meal) => acc + Number(meal.calories),
                0,
            ) 

            const remainingCalories = totalCaloriesPerDay - caloriesConsumed;
            const percentage = (caloriesConsumed / totalCaloriesPerDay) * 100;
            setTodayStadistics({
                total: totalCaloriesPerDay,
                consumed: caloriesConsumed,
                percentage,
                remaining: remainingCalories,
            })
        } catch (error) {
            console.error(error);
        }
    }

    const loadTodayFood = useCallback(async () => {
        try {
            const todayFoodResponse = await onGetTodayFood()

            calculateTodayStadistic(todayFoodResponse)
            setTodayFood(todayFoodResponse)
        } catch (error) {
            setTodayFood([])
            console.error(error);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    useFocusEffect(useCallback(() => {
        loadTodayFood().catch(null)
    }, [loadTodayFood]))

    const handleAddCaloriesPress = () => {
        navigate('AddFood')
    }

    const handleDeleteMeal = async (index) => {
        try {
            await onDeleteTodayFood(index)
            loadTodayFood().catch(null)
            Alert.alert('La comida se eliminó correctamente')
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <View style={styles.container}>
            <Header />
            <View style={styles.caloriesContainer}>
                <View style={styles.leftContainer}>
                    <Text style={styles.caloriesLegend}>Calories</Text>
                </View>
                <View style={styles.rightContainer}>
                    <Button
                        icon={<Icon name="add-circle-outline" color="#fff" />}
                        radius="lg"
                        color="#4ECB71"
                        onPress={handleAddCaloriesPress} />
                </View>
            </View>
            <TodayCalories {...todayStadistics} />
            <Text style={{ fontSize: 20, fontWeight: "bold", marginVertical: 12 }}>Today Foods</Text>
            <ScrollView>
                {todayFood?.map((meal, index) => (
                    <MealItems
                        key={index}
                        {...meal}
                        btnName="close"
                        fn={() => handleDeleteMeal(index)}
                    />
                )
                )
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        padding: 12,
        backgroundColor: "#fff",
        flex: 1,
    },
    caloriesContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 24,
    },
    leftContainer: {
        flex: 1,
        justifyContent: "center",
    },
    rightContainer: {
        flex: 1,
        alignItems: "flex-end",
        justifyContent: "center",
    },
    caloriesLegend: {
        fontSize: 20,
    }
})

export default Home