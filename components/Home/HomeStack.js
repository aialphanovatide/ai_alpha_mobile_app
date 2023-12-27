import { createStackNavigator } from '@react-navigation/stack';

const HomeStack = createStackNavigator();
const TopmenuStack = createStackNavigator();
const SubMenuStack = createStackNavigator();

const SubmenuScreen = () => (
  <HomeStack.Navigator>
    <SubMenuStack.Screen name="Fundamentals" component={Fundamentals} />
    <SubMenuStack.Screen name="Chart" component={Chart} />
    <SubMenuStack.Screen name="News" component={News} />
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
    <HomeStack.Screen name="mainScreen" component={mainScreen} />
    <HomeStack.Screen name="TopMenu" component={TopmenuScreen} />
  
  </HomeStack.Navigator>
);

export default HomeStackScreen