import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, Button, Image, TouchableOpacity, StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import paypal from '../source/LCRd0.jpg';

function CartScreen() {
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const fetchCart = async () => {
    try {
      const storedCart = await AsyncStorage.getItem('cart');
      setCart(storedCart ? JSON.parse(storedCart) : []);
    } catch (e) {
      console.error(e);
    }
  };

  const updateCart = async (updatedCart, callback) => {
    try {
      await AsyncStorage.setItem('cart', JSON.stringify(updatedCart));
      if (callback) {
        callback();
      }
    } catch (e) {
      console.error(e);
    }
  };

  const removeFromCart = async (productId) => {
    try {
      const updatedCart = cart.filter(item => item._id !== productId);
      await updateCart(updatedCart, () => {
        setCart(updatedCart);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const calculateTotal = () => {
    let totalCost = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(totalCost);
  };

  const changeQuantity = (productId, amount) => {
    const updatedCart = cart.map(item =>
      item._id === productId ? { ...item, quantity: item.quantity + amount } : item
    );
    updateCart(updatedCart, () => {
      setCart(updatedCart);
    });
  };

  useEffect(() => {
    fetchCart();
  }, [cart]);

  useEffect(() => {
    calculateTotal();
  }, [cart]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Cart</Text>
      <FlatList
        data={cart}
        keyExtractor={item => String(item._id)}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Image style={styles.itemImage} source={{ uri: item.photo }} />
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price}</Text>
            <View style={styles.quantityControl}>
              <TouchableOpacity onPress={() => changeQuantity(item._id, -1)} disabled={item.quantity <= 1}>
                <Text style={styles.controlButton}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{item.quantity}</Text>
              <TouchableOpacity onPress={() => changeQuantity(item._id, 1)}>
                <Text style={styles.controlButton}>+</Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => removeFromCart(item._id)}>
              <Text style={styles.trashButton}>🗑️</Text>
            </TouchableOpacity>
          </View>
        )}
      />
      <Text style={styles.totalText}>Total: ${total.toFixed(2)}</Text>
      <Image
      style={styles.paypal} 
      source={paypal}
      />
    </View>
  );
}
export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  trashButton: {
    fontSize: 24,
    padding: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  itemContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  itemImage: {
    width: 50,
    height: 50,
    marginRight: 8,
  },
  itemName: {
    fontSize: 18,
    flex: 1,
  },
  itemPrice: {
    fontSize: 16,
  },
  quantityControl: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  controlButton: {
    padding: 8,
    fontSize: 16,
  },
  quantityText: {
    padding: 8,
    fontSize: 16,
  },
  totalText: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'right',
    marginTop: 16,
  },
  paypal: {
    marginTop: 20,
    alignSelf: 'center',
    width: "75%",
    height: 120,
  },
});
