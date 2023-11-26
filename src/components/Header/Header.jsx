import { useNavigation } from "@react-navigation/native"
import { Button, Icon } from "@rneui/themed"
import { Image, StyleSheet, Text, View } from "react-native"

const staticInfo = {
  name: 'Gustavo Clemente',
  source: require("../../../assets/images/perfil-ph.jpg")
}

const Header = () => {

  const { canGoBack, goBack } = useNavigation()

  return (
    <View style={styles.container}>
      {canGoBack() ? (
        <View style={styles.arrowContainer}>
          <Button 
          icon={<Icon name="arrow-back" size={24} />} type="clear" onPress={() => goBack()}/>
        </View> 
      ) : undefined}
      <View style={styles.leftContainer}>
        <Text style={styles.name}>{`Hello ${staticInfo.name}`}</Text>
        <Text style={styles.welcome}>Wellcome back to your goal</Text>
      </View>
      <View style={styles.rightContainer}>
        <Image source={staticInfo.source} style={styles.image} />
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',

  },
  leftContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  rightContainer: {
    flex: 1,
    alignItems: 'flex-end',
    justifyContent: 'center',
  },
  name: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  welcome: {
    fontSize: 12,
    color: '#808080',
  },
  image: {
    height: 40,
    width: 40,
    borderRadius: 24
  },
  arrowContainer: {
    marginLeft: -12
  }
})

export default Header