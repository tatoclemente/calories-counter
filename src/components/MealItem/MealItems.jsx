import { Button, Icon } from "@rneui/themed"
import { StyleSheet, View, Text } from "react-native"

const MealItems = ({ calories, name, portion, btnName, fn }) => {

    
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <Text style={styles.name}>{name}</Text>
                <Text style={styles.portion}>{portion}</Text>
            </View>
            <View style={styles.rightContainer}>
                <Button 
                    icon={<Icon name={btnName} />} 
                    type="clear" 
                    onPress={() => fn(calories, name, portion)}
                />
                <Text style={styles.calories}>{calories} cal</Text>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#ADE8AF',
        borderRadius: 12,
        padding: 12,
        marginVertical: 12,
        flexDirection: 'row',
    },
    leftContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    rightContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    name: {
        fontSize: 18,
        fontWeight: '500',
    },
    portion: {
        fontSize: 14,
        fontWeight: '500',
        color: '#8C8C8C',
    },
    calories: {
        fontSize: 18,
        fontWeight: '500',
        marginTop: -8,
    }
})

export default MealItems