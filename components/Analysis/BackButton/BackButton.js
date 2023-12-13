import { TouchableOpacity, View, Text } from "react-native";
import styles from "./BackButtonStyles";

const BackButton = ({handleReturn}) => {
    return (
      <TouchableOpacity onPress={() => handleReturn()}>
        <View style={[styles.backButtonContainer]}>
          <Text style={styles.backButton}>{'< Back'}</Text>
        </View>
      </TouchableOpacity>
    );
  };

  export default BackButton;