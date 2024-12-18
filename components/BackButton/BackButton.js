import {TouchableOpacity, View, Text, Image} from 'react-native';
import useBackButtonStyles from './BackButtonStyles';
import {useNavigation} from '@react-navigation/native';

// Component that renders the back button on the top left corner of the screens. It is used on most of the app's screens to allow the user to navigate back to the previous screen.

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
    <TouchableOpacity
      style={[
        styles.row,
        {marginHorizontal: 3, marginBottom: 22, marginTop: 5},
      ]}
      onPress={() => handleReturn()}>
      <View style={styles.arrowContainer}>
        <Image
          source={require('../../assets/images/arrow-left.png')}
          resizeMode="contain"
          style={styles.leftArrow}
        />
      </View>
      <Text style={styles.backButton}>{'Back'}</Text>
    </TouchableOpacity>
  );
};

export default BackButton;
