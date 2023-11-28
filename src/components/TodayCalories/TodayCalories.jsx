import { StyleSheet, Text } from "react-native"
import { View } from "react-native"
import CircularProgress from "react-native-circular-progress-indicator"

const TodayCalories = ({ total, consumed, remaining, percentage }) => {
    return (
        <View style={styles.container}>
            <View style={styles.leftContainer}>
                <CircularProgress value={percentage} valueSuffix="%" />
            </View>
            <View style={styles.rightContainer}>
                <Text style={styles.todayLegend}>Today</Text>
                <View style={styles.rightItem}>
                    <Text style={styles.rightItemLegend}>Total</Text>
                    <Text style={styles.rightItemValue}>{total}</Text>
                </View>
                <View style={styles.rightItem}>
                    <Text style={styles.rightItemLegend}>Consumed</Text>
                    <Text style={styles.rightItemValue}>{consumed}</Text>
                </View>
                <View style={styles.rightItem}>
                    <Text style={styles.rightItemLegend}>Remaining</Text>
                    <Text style={styles.rightItemValue}>{remaining}</Text>
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        justifyContent: "center"
    },
    leftContainer: {
        flex: 1,
    },
    rightContainer: {
        flex: 1,
    },
    todayLegend: {
        fontSize: 20,
        fontWeight: '500',
        marginBottom: 14,
    },
    rightItem: {
        flexDirection: "row",
        marginBottom: 8,
    },
    rightItemLegend: {
        flex: 1
    },
    rightItemValue: {
        flex: 1,
        textAlign: "right"
    },
})

export default TodayCalories