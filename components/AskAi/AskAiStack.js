import AskAiHistory from './AskAiHistory/AskAiHistory';

const {createNativeStackNavigator} = require('@react-navigation/native-stack');
const {default: AskAiMain} = require('./AskAiMain');

const AskAiStack = createNativeStackNavigator();

const AskAiScreen = () => {
  return (
    <AskAiStack.Navigator
      initialRouteName="AskAiMain"
      backBehavior={'none'}
      screenOptions={{
        lazy: true,
        swipeEnabled: false,
        header: () => null,
      }}>
      <AskAiStack.Screen
        name={'AskAiMain'}
        component={AskAiMain}
        initialParams={{selectedResult: null}}
      />
      <AskAiStack.Screen name={'AskAiHistory'} component={AskAiHistory} />
    </AskAiStack.Navigator>
  );
};

export default AskAiScreen;
