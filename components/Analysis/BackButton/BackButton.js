import {TouchableOpacity, View, Text, Image} from 'react-native';
import useBackButtonStyles from './BackButtonStyles';
import {useNavigation} from '@react-navigation/native';

const BackButton = ({navigationHandler = null}) => {
  const styles = useBackButtonStyles();
  const navigation = useNavigation();
  const handleReturn = () => {
    if (navigationHandler && navigationHandler !== undefined) {
      navigationHandler();
    } else {
      navigation.goBack();
    }
  };
  return (
    <TouchableOpacity style={styles.row} onPress={() => handleReturn()}>
      <View style={styles.arrowContainer}>
        <Image source={require('../../../assets/images/arrow-left.png')} resizeMode='contain' style={styles.leftArrow}/>
      </View>
      <Text style={styles.backButton}>{'Back'}</Text>
    </TouchableOpacity>
  );
};

export default BackButton;
