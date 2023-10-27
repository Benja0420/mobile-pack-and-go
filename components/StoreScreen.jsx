import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View, Image, ImageBackground, ScrollView} from 'react-native'
import carouselHome1 from "../source/carouselHome1.png"
import carouselHome2 from "../source/carouselHome2.png"
import carouselHome3 from "../source/carouselHome3.png"
import img1 from "../source/img1.png"
import img2 from "../source/img2.png"
import img3 from "../source/img3.png"
import img4 from "../source/img4.png"
import Backgroundxd from "../source/backgroundLetsGo.png"
import girlTravel from "../source/girlTravel.png"
import Swiper from 'react-native-swiper'
 
AppRegistry.registerComponent('myproject', () => StoreScreen)

export default class StoreScreen extends Component {
  render() {
    return (
      <ScrollView>
        <View style={styles.container}>
          <ImageBackground source={ Backgroundxd } style={styles.Backgroundxd}>
          <View style={styles.contenedor}>
          <Image style={styles.girlTravel} source={ girlTravel }/>
          <View>
            <Text style={{
              fontSize: 25,
              fontWeight: 'semibold',
            }}>Let's go</Text>
            <Text style={{
              fontSize: 30,
              fontWeight: 'bold',
              color: '#FEC600'
            }}>Travel</Text>
          <View style={styles.Travel}>
            <Text>At Pack&Go, we know that every trip is a new adventure. We invite you to discover a world of possibilities in our virtual corner designed especially for travel and adventure lovers. Your next destination starts here!</Text>
          </View>
          </View>
          </View>
          </ImageBackground>
        </View>
    <View style={styles.carousel}>
      <Swiper style={styles.wrapper} showsButtons={true}>
        <View style={styles.slide}>
          <Image style={styles.carouselImg} source={ carouselHome1 }/>
        </View>
        <View style={styles.slide}>
        <Image style={styles.carouselImg} source={ carouselHome2 }/>
        </View>
        <View style={styles.slide}>
        <Image style={styles.carouselImg} source={ carouselHome3 }/>
        </View>
      </Swiper>
    </View>
    <View 
    style={styles.contenedor2}
    >
      <Image 
      style={styles.Img}
      source={ img1 }
      />
      <Image 
      style={styles.Img}
      source={ img2 }
      />
    </View>
      <View 
    style={styles.contenedor2}
    >
      <Image 
      style={styles.Img}
      source={ img3 }
      />
      <Image 
      style={styles.Img}
      source={ img4 }
      />
    </View>
  </ScrollView>
    )}}

const styles = StyleSheet.create({
  contenedor: {
    flexDirection: 'row',
    alignItems: 'center',
    width: "100%",
    height: 350,
    gap: 10,
  },
  Backgroundxd: {
    width: "100%",
    height: 350,
  },
  girlTravel: {
    width: "40%",
    height: 300,
  },
  carousel: {
    height: 100,
  },
  wrapper: {},
  slide: {
    flex: 1,
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  bold: {
    fontWeight: 'bold'
  },
  Travel: {
    width: "60%",
    flexDirection: "row"
  },
  carouselImg: {
    width: "100%",
    height: 100,
  },
  contenedor2: {
    flexDirection: 'row',
    width: "100%",
    height: 350,
  },
  Img: {
    margin: 10,
    width: "45%",
    height: 290,
  },
})