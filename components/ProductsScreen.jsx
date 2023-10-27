import { View, Text, FlatList, StyleSheet, Image, Pressable, TextInput } from 'react-native'
import { CheckBox } from 'react-native-elements';
import { useState, useEffect } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import axios from 'axios'



function ProductsScreen() {

  const addToCart = async (product) => {
    try {
      let cart = await AsyncStorage.getItem('cart');
      cart = cart == null ? [] : JSON.parse(cart);

      const productIndex = cart.findIndex(item => item._id === product._id);

      if (productIndex > -1) {
        cart[productIndex].quantity += 1;
      } else {
        cart.push({ ...product, quantity: 1 });
      }

      await AsyncStorage.setItem('cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  };

  const navigation = useNavigation();
  const [products, setProducts] = useState([])
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axios.get('https://4wpfcnkt-8000.brs.devtunnels.ms/products')
        setProducts(response.data.products)

      } catch (error) {
        console.log(error)

      }
    }
    const getCategories = async () => {
      try {
        const response = await axios.get('https://4wpfcnkt-8000.brs.devtunnels.ms/categories')
        setCategories(response.data)

      } catch (error) {
        console.log(error)

      }
    }
    getCategories()
    getProducts()
  }, [])

  const [search, setSearch] = useState(''); 
  const [selectedCategories, setSelectedCategories] = useState({}); 


  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategories[product.category.name];
    return matchesSearch && (matchesCategory || Object.keys(selectedCategories).length === 0);
  });

  return (
    <View style={styles.Background}>
      <Text style={{
        fontSize: 30,
        fontWeight: 'bold',
        textAlign: 'center',
        marginTop: 10,
        marginBottom: 10,
      }}>Products</Text>

      <TextInput
        style={styles.searchInput}
        value={search}
        placeholder="Search by name..."
        onChangeText={setSearch}
      />

      <View style={styles.categories}>
        {categories.map(category => (
          <View key={category._id} style={styles.category}>
            <CheckBox
              checked={!!selectedCategories[category.name]}
              onPress={() => {
                setSelectedCategories(prev => ({ ...prev, [category.name]: !prev[category.name] }));
              }}
            />
            <Text>{category.name}</Text>
          </View>
        ))}
      </View>
      <FlatList
        style={styles.list}
        data={filteredProducts}
        numColumns={2}
        keyExtractor={item => String(item._id)}
        renderItem={({ item }) => {
          return (
            <View style={styles.card}>
              <Image style={styles.cover} source={{ uri: item.photo }} />
              <Text style={styles.Name}>{item.name}</Text>
              <View>
                <Text style={styles.Price}>${item.price}</Text>
                <View style={styles.Buttons}>
                  <Pressable
                    onPress={() => addToCart(item)}
                    style={styles.Button}>
                    <Text style={styles.ButtonText}>Add to Cart</Text>
                  </Pressable>
                  <Pressable style={styles.Button} >
                    <Text style={styles.ButtonText}>Details</Text>
                  </Pressable>
                </View>
              </View>
            </View>
          )
        }}
      />
    </View>
  );
}

export default ProductsScreen

const styles = StyleSheet.create({
  Background: {
    backgroundColor: "white"
  },
  card: {
    width: '50%',
    height: 300,
    justifyContent: 'center',
  },
  cover: {
    width: "100%",
    height: 200,

  },
  Name: {
    fontSize: 16,
    fontWeight: 'semibold',
  },
  Price: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  Buttons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  Button: {
    backgroundColor: 'rgb(0, 87, 130)',
    width: "45%",
    height: 25,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  ButtonText: {
    color: 'white',
  },
  searchInput: {
    height: 40,
    width: '90%',
    alignSelf: 'center',
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  categories: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: 1,
  },
  category: {
    flexDirection: 'row',
    alignItems: 'center',
    margin: 1,
  },
});