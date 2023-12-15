import { createStackNavigator } from '@react-navigation/stack';

const HomeStack = createStackNavigator();
const TopmenuStack = createStackNavigator();
const SubMenuStack = createStackNavigator();

const SubmenuScreen = () => (
  <HomeStack.Navigator>
    <SubMenuStack.Screen name="Fundamentals" component={mainScreen} />
    <SubMenuStack.Screen name="Chart" component={TopmenuStack} />
    <SubMenuStack.Screen name="News" component={TopmenuStack} />
  
  </HomeStack.Navigator>
);


const TopmenuScreen = () => (
  <HomeStack.Navigator>
    <TopmenuStack.Screen name="Home" component={mainScreen} />
    <TopmenuStack.Screen name="Home" component={SubmenuScreen} />
  
  </HomeStack.Navigator>
);



const HomeStackScreen = () => (
  <HomeStack.Navigator>
    <HomeStack.Screen name="Home" component={mainScreen} />
    <HomeStack.Screen name="Home" component={TopmenuScreen} />
  
  </HomeStack.Navigator>
);

export default HomeStackScreen