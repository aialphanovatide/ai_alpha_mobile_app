import AskAiHistory from '../components/AskAi/AskAiHistory/AskAiHistory';

const {createNativeStackNavigator} = require('@react-navigation/native-stack');
const {default: AskAiMain} = require('../components/AskAi/AskAiMain');

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
        options={{
          animation: 'fade',
        }}
      />
      <AskAiStack.Screen
        name={'AskAiHistory'}
        component={AskAiHistory}
        options={{
          animation: 'slide_from_right',
        }}
      />
    </AskAiStack.Navigator>
  );
};

export default AskAiScreen;
