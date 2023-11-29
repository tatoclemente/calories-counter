import { Alert, ScrollView, StyleSheet, Text, View } from "react-native"
import Header from "../../components/Header"
import { Button, Icon, Input } from "@rneui/themed"
import AddFoodModal from "../../components/AddFoodModal"
import { useState } from "react"
import useFoodStorage from "../../hooks/useFoodStorage"
import MealItems from "../../components/MealItem/MealItems"
import { useEffect } from "react"

const AddFood = () => {

  const [visible, setVisible] = useState(false)
  const [foods, setFoods] = useState([])
  const [search, setSearch]  = useState('')
  const { onGetFoods, onSaveTodayFood } = useFoodStorage()

  const loadFoods = async () => {
    try {
      const foodResponse = await onGetFoods()

      setFoods(foodResponse)
      // if (foodResponse.length > 0) {
      //   console.log(foodResponse)
      // }
    } catch (error) {
      console.error(error);
    }
  }

  useEffect(() => {
    loadFoods().catch(null)
  }, [])

  const handleModalClose = async (shouldUpate) => {
    if (shouldUpate) {
      Alert.alert('Successfully store food')
      loadFoods()
    }

    setVisible(false)
  }

  const handleSearchPress = async () => {
    try {
      const result = await onGetFoods()
      setFoods(result?.filter(food => food.name.toLowerCase().includes(search.toLowerCase())))
    } catch (error) {
      console.error(error);
      setFoods([])
    }
  }

  const handleAddItemPress = async (calories, name, portion) => {
      try {
          await onSaveTodayFood({ calories, name, portion })
          Alert.alert('La comida se agregó correctamente')
      } catch (error) {
          console.error(error);
          Alert.alert('Hubo un error al agregar la comida')
      }
  }

  return (
    <View style={styles.container}>
      <Header />
      <View style={styles.addFoodContainer}>
        <View style={styles.legendContainer}>
          <Text style={styles.addFoodLegend}>Add Food</Text>
        </View>
        <View style={styles.addFoodBtnContainer}>
          <Button
            icon={<Icon name="add-circle-outline" color="#fff" />}
            radius="lg"
            color="#4ECB71"
            onPress={() => setVisible(true)} />
        </View>
      </View>
      <View style={styles.searchContainer}>
        <View style={styles.inputContainer}>
          <Input 
            placeholder="apples, pie, soda..." 
            value={search} 
            onChangeText={(text) => setSearch(text)} 
          />
        </View>
        <Button
          title="Search"
          titleStyle={{ color: "#000", fontSize: 14 }}
          radius="lg"
          color="#ADE8AF"
          onPress={handleSearchPress}
        />
      </View>
      <AddFoodModal visible={visible} onClose={handleModalClose} />
      <ScrollView>
        {foods?.map((meal) => (
          <MealItems 
            key={meal.name} {...meal} 
            btnName="add-circle-outline" 
            fn={handleAddItemPress} 
          />
        ))}
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
  legendContainer: {
    flex: 1,
  },
  addFoodBtnContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  addFoodContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 24
  },
  addFoodLegend: {
    fontSize: 20,
  },
  searchContainer: {
    flexDirection: 'row',
  },
  inputContainer: {
    flex: 1,
    marginLeft: -12,
  },
})

export default AddFood