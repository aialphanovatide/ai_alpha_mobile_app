import {TouchableOpacity, View, Text} from 'react-native';
import useBackButtonStyles from './BackButtonStyles';

const BackButton = ({handleReturn}) => {
  const styles = useBackButtonStyles();
  return (
    <TouchableOpacity onPress={() => handleReturn()}>
      <View style={[styles.backButtonContainer]}>
        <Text style={styles.backButton}>{'< Back'}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default BackButton;
