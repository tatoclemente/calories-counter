import { Button, Icon } from "@rneui/themed"
import { Modal, StyleSheet, Text, View } from "react-native"
import InputModal from "../InputModal"

const AddFoodModal = ({ onClose, visible }) => {
    return (
        <Modal 
          visible={visible} 
          onRequestClose={onClose} 
          transparent 
          animationType="slide"
        >
            <View style={styles.container}>
                <View style={styles.content}>
                    <View style={styles.closeContainer}>
                      <Button
                        type="clear"
                        icon={<Icon name="close" size={28} />}
                        onPress={onClose}
                      />
                      
                    </View>
                    <Text style={styles.title}>Add Food</Text>
                    <InputModal unitType='KCAL' />
                    <InputModal unitType='Name' />
                    <InputModal unitType='Portion' />
                    <View style={styles.buttonContainer}>
                      <Button 
                        title="Add"
                        icon={<Icon name="add" size={28} color='#fff' />}
                        color='#4ECB71'
                        radius='lg' />
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
    buttonContainer: {
      alignItems: 'flex-end',
    }
})

export default AddFoodModal