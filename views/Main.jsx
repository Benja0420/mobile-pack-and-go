import React, { useState } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StoreScreen from "../components/StoreScreen.jsx";
import ProductsScreen from "../components/ProductsScreen.jsx";
import CartScreen from "../components/CartScreen.jsx";
import Icon from 'react-native-vector-icons/Ionicons';

const Tab = createBottomTabNavigator();

function Main() {
  const [showDetailsTab, setShowDetailsTab] = useState(false); 
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === 'Store') {
            iconName = focused ? 'home' : 'home-outline';
          } else if (route.name === 'Products') {
            iconName = focused ? 'list' : 'list-outline';
          } else if (route.name === 'Cart') {
            iconName = focused ? 'cart' : 'cart-outline';
          }
          return <Icon name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: 'rgb(231, 197, 147)',
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: [
          {
            display: 'flex'
          },
          null
        ]
      })}
    >
      <Tab.Screen name="Store" component={StoreScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Products" component={ProductsScreen} options={{ headerShown: false }}/>
      <Tab.Screen name="Cart" component={CartScreen} options={{ headerShown: false }}/>
    </Tab.Navigator>
  );
}

export default Main;