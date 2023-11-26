import { Input } from "@rneui/themed"
import { StyleSheet, Text } from "react-native"
import { View } from "react-native"

const InputModal = ({ unitType }) => {
    return (
        <View style={styles.formItem}>
            <View style={styles.inputContainer}>
                <Input />
            </View>
            <View style={styles.legendContainer}>
                <Text style={styles.legend}>{unitType}</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    formItem: {
        flexDirection: 'row',
        alignItems: 'center',
      },
      inputContainer: {
        flex: 2,
      },
      legendContainer: {
        flex: 1,
      },
      legend: {
        fontWeight: '500'
      }
})

export default InputModal