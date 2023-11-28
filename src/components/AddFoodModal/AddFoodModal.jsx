import { Button, Icon } from "@rneui/themed"
import { Modal, StyleSheet, Text, View } from "react-native"
import InputModal from "../InputModal"
import { useState } from "react"
import { useEffect } from "react"

import useFoodStorage from "../../hooks/useFoodStorage"

const AddFoodModal = ({ onClose, visible }) => {

  const [calories, setCalories] = useState('')
  const [name, setName] = useState('')
  const [portion, setPortion] = useState('')
  const { onSaveFood } = useFoodStorage()

  useEffect(() => {
    setCalories('')
    setName('')
    setPortion('')
  }, [visible])

  const handleSubmit = async () => {
    try {
      await onSaveFood({
        calories,
        name,
        portion
      })
      onClose(true)  
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Modal
      visible={visible}
      onRequestClose={() => onClose()}
      transparent
      animationType="slide"
    >
      <View style={styles.container}>
        <View style={styles.content}>
          <View style={styles.closeContainer}>
            <Button
              type="clear"
              icon={<Icon name="close" size={28} />}
              onPress={() => onClose()}
            />

          </View>
          <Text style={styles.title}>Add Food</Text>
          <InputModal value={calories} seter={setCalories} unitType='KCAL' />
          <InputModal value={name} seter={setName} unitType='Name' />
          <InputModal value={portion} seter={setPortion} unitType='Portion' />
          <View style={styles.buttonContainer}>
            <Button
              title="Add"
              icon={<Icon name="add" size={28} color='#fff' />}
              color='#4ECB71'
              radius='lg'
              disabled={
                calories.trim() === '' || 
                name.trim() === '' || 
                portion.trim() === ''}
                onPress={handleSubmit} />
          </View>

        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet
  .create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    content: {
      backgroundColor: '#fff',
      width: '75%',
      padding: 18,
      borderRadius: 20,
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    closeContainer: {
      alignItems: 'flex-end',
    },
    title: {
      fontSize: 24,
      marginLeft: 10,
    },
    buttonContainer: {
      alignItems: 'flex-end',
    }
  })

export default AddFoodModal