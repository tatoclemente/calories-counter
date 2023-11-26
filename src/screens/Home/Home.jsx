import { StyleSheet, Text, View } from "react-native"
import Header from "../../components/Header"
import { Button, Icon } from '@rneui/themed';
import { useNavigation } from "@react-navigation/native";

const Home = () => {

    const { navigate } = useNavigation()

    const handleAddCaloriesPress = () => {
        navigate('AddFood')
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