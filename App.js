import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import Main from './views/Main.jsx';
import Register from './views/Register.jsx';
import LogoTitle from './components/Logo.jsx';
import Login from './views/Login.jsx';

const Drawer = createDrawerNavigator();

function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator screenOptions={{ 
    drawerStyle: { 
      backgroundColor: 'rgb(231, 197, 147)'
    }}} initialRouteName="Main">
        <Drawer.Screen 
          name="Home" 
          component={Main} 
          options={{ 
            headerTitle: props => <LogoTitle {...props} />,
            headerStyle: {
              backgroundColor: 'rgb(231, 197, 147)',
            },
            headerTintColor: '#fff',
            headerTitleStyle: {
              fontWeight: 'bold',
            },
          }}
        />
        <Drawer.Screen 
          name="Profile" 
          component={Login}
          options={{
            headerStyle: {
              backgroundColor: 'rgb(231, 197, 147)',
            },
          }}
        />
        <Drawer.Screen 
          name="Sign Out" 
          component={Register}
          options={{
            headerStyle: {
              backgroundColor: 'rgb(231, 197, 147)',
            },
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}

export default App;