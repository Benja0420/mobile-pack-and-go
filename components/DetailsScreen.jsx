import { View, Text } from 'react-native';

function DetailsScreen({ route }) {
  const { item } = route.params;
  return (
    <View>
      <Text>{item.name}</Text>
    </View>
  );
}

export default DetailsScreen;