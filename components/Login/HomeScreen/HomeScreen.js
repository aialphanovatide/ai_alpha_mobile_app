import { TopMenuContext, TopMenuContextProvider } from '../../../context/topMenuContext';
import React, { useContext, useEffect } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import Home from '../../Home/Home';
import Analysis from '../../Analysis/Analysis';
import Icon from 'react-native-vector-icons/FontAwesome';


const Tab = createBottomTabNavigator();

const HomeScreen = () => {

  const { updateActiveCoin } = useContext(TopMenuContext);

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Tab.Navigator
        initialRouteName={Home}
        screenOptions={{
          headerShown: false,
          tabBarStyle: { height: 65, justifyContent: 'center', alignItems: 'center' },
          tabBarActiveTintColor: '#FC5404'
        }}
      >
        <Tab.Screen
          name="Home"
          listeners={{
            tabPress: (e) => {
              updateActiveCoin({})
            },
          }}
          component={Home}
          options={{
            tabBarLabel: 'Home',
            tabBarLabelStyle: { marginBottom: 10 },
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Alerts"
          component={Analysis}
          options={{
            tabBarLabel: 'Alerts',
            tabBarLabelStyle: { marginBottom: 10 },
            tabBarIcon: ({ color, size }) => (
              <Icon name="bell-o" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Chatbot"
          component={Analysis}
          options={{
            tabBarLabel: 'Chatbot',
            tabBarLabelStyle: { marginBottom: 10 },
            tabBarIcon: ({ color, size }) => (
              <Icon name="comment" color={color} size={size} />
            ),
          }}
        />

        <Tab.Screen
          name="Analysis"
          component={Analysis}
          options={{
            tabBarLabel: 'Analysis',
            tabBarLabelStyle: { marginBottom: 10 },
            tabBarIcon: ({ color, size }) => (
              <Icon name="bar-chart" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Account"
          component={Analysis}
          options={{
            tabBarLabel: 'Account',
            tabBarLabelStyle: { marginBottom: 10 },
            tabBarIcon: ({ color, size }) => (
              <Icon name="user" color={color} size={size} />
            ),
          }}
        />

      </Tab.Navigator>
    </GestureHandlerRootView>
  );
};

export default HomeScreen;





// OLD CODE CHANGED BY DAVID//


// import React, {useState} from 'react';
// import { Dimensions} from 'react-native';
// import {GestureHandlerRootView} from 'react-native-gesture-handler';
// import {TopMenuContextProvider} from '../../../context/topMenuContext';
// import BottomMenu from '../../BottomMenu/Menu';
// import Home from '../../Home/Home';
// import Analysis from '../../Analysis/Analysis';

// const HomeScreen = () => {
//   const {height, width} = Dimensions.get('window');
//   const [currentSection, setCurrentSection] = useState('Home');

//   return (
//     <GestureHandlerRootView style={{flex: 1, height, width}}>
//       <TopMenuContextProvider>
//         {currentSection === 'Home' && (
//           <>
//             <Home />
//           </>
//         )}
//         {currentSection === 'Analysis' && <Analysis />}
//         <BottomMenu
//           currentSection={currentSection}
//           setCurrentSection={setCurrentSection}
//         />
//       </TopMenuContextProvider>
//     </GestureHandlerRootView>
//   );
// };
// export default HomeScreen;


