import {TouchableOpacity, View, Text} from 'react-native';
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
    <TouchableOpacity onPress={() => handleReturn()}>
      <View style={[styles.backButtonContainer]}>
        <Text style={styles.backButton}>{'< Back'}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;
