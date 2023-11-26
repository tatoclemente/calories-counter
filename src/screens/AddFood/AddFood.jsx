import { StyleSheet, Text, View } from "react-native"
import Header from "../../components/Header"
import { Button, Icon, Input } from "@rneui/themed"
import AddFoodModal from "../../components/AddFoodModal"
import { useState } from "react"

const AddFood = () => {

  const [visible, setVisible] = useState(false)

  const handleModalClose = () => {
    setVisible(false)
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
          <Input placeholder="apples, pie, soda..." />
        </View>
        <Button
          title="Search"
          titleStyle={{ color: "#000", fontSize: 14 }}
          radius="lg"
          color="#ADE8AF"
          onPress={() => console.log('hola')}
        />
      </View>
      <AddFoodModal visible={visible} onClose={handleModalClose} />
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