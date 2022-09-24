import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  ActivityIndicator,
  Alert,
  Animated,
  FlatList,
  Image,
  ImagePropTypes,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  Touchable,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
import LottieView from 'lottie-react-native';


interface Iprops {
  navigation: any
}

interface IState{
  shipsData: any
  dataBackup: any
  isLoading: boolean
  scrollY: any
  query: any
  selectedTab: any
  gearData: any
  gearBackup: any
  gearQuery: any
}

class Home extends React.Component<Iprops,IState> {
  constructor(props: Iprops) {
    super(props)
    this.state ={
      shipsData: {},
      dataBackup: {},
      isLoading: true,
      scrollY: new Animated.Value(0),
      query: null,
      selectedTab: true,
      gearData: {},
      gearBackup: {},
      gearQuery: null,
    }
  }


  async componentDidMount() {
    let value = await this.getData() //does not work due to exceeding 2mb limit set by android
    let gearVal = await this.getGearData()
    if(value == null || gearVal == null) {
      this.storeData()
    } else {
      this.setState({
        shipsData: value,
        dataBackup: value,
        isLoading: false,
        gearData: gearVal,
        gearBackup: gearVal
      })
    }
  }
  storeData = async () => {
    fetch(
      "https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/ships.json",
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json'
        },}).then((response) => response.json()).then(async (responseData) => {
            await AsyncStorage.setItem('@jsonFile', JSON.stringify(responseData))
            this.setState({
              shipsData: responseData,
              dataBackup: responseData
            })
        }).then(() => {
          fetch("https://raw.githubusercontent.com/AzurAPI/azurapi-js-setup/master/dist/equipments.json",
          {
            method: 'GET',
            headers: {
              Accept: 'application/json',
              'Content-Type': 'application/json'
            },}).then((response) => response.json()).then(async (responseData) => {
              await AsyncStorage.setItem('@gearVal', JSON.stringify(responseData))
              
              this.setState({
                gearData: responseData,
                gearBackup: responseData,
                isLoading: false,
              })
          })
        })
  }

  getData = async () => {
    try{
      let val = await AsyncStorage.getItem('@jsonFile')
      return val
    } catch(e) {
      console.log(e)
    }
  }

  getGearData = async () => {
    try{
      let val = await AsyncStorage.getItem('@gearVal')
      return val
    } catch(e) {

    }
  }

  getColor(rarity: string) {
    if(rarity == 'Normal') {
      return '#fff'
    } else if (rarity == 'Rare') {
      return '#00CED1'
    } else if (rarity == 'Elite') {
      return '#7F00FF'
    } else if (rarity == 'Super Rare') {
      return '#FFA500'
    } else return '#000'
  }

  _renderItem = ({item, index}) => {
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    let colorType = this.getColor(item.rarity)
    const inputRange = [
      -1,
      0,
      130 * index,
      130 * (index + 2)
    ]
    const opacityinputRange = [
      -1,
      0,
      130 * index,
      130 * (index + .5)
    ]
    const scale = this.state.scrollY.interpolate(
      {
        inputRange,
        outputRange: [
          1,1,1,0
        ]
      }
    )
    const opacity = this.state.scrollY.interpolate(
      {
        inputRange: opacityinputRange,
        outputRange: [
          1,1,1,0
        ]
      }
    )
    return(
      <AnimatedTouchable style ={{flexDirection: 'row', padding: 20, marginBottom: 20, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 12,
      shadowColor: "#000", shadowOffset: {
        width: 0, height: 10
      }, shadowOpacity: 0.3, shadowRadius: 20,opacity, transform:[{scale}]}} onPress={() => this.props.route.params.navigation.navigate('Ship', {shipData: item, navigation: this.props.route.params.navigation}, {title:item.names.en})}>
          <Image source={{uri: item.thumbnail}} style={{width: 70, height: 70, marginRight: 10, borderRadius: 70}}/>
          <View>
            <Text style={{fontSize: 14, fontWeight: '700'}}>{item.names.en}</Text>
            <Text style={{fontSize: 12, opacity: .7}}>{item.hullType}</Text>
            <Text style={{fontSize: 10, opacity: .8, color: colorType}}>{item.rarity}</Text>
          </View>
      </AnimatedTouchable>
    )
  }

  setFlatList= (event) => {
    let query = event
    this.setState({
      query: query,
    })
    if(query=="") {
      this.setState({
        shipsData: this.state.dataBackup
      })
    } else {
      let dataToSearch = this.state.dataBackup
      query = query.toLowerCase()
      dataToSearch = dataToSearch.filter(x => x.names.en.toLowerCase().match(query))
      this.setState({
        shipsData: dataToSearch
      })
    }
  }

  setGearList= (event) => {
    let query = event
    this.setState({
      gearQuery: query,
    })
    if(query=="") {
      this.setState({
        gearData: this.state.gearBackup
      })
    } else {
      let dataToSearch = this.state.gearBackup
      query = query.toLowerCase()
      dataToSearch = dataToSearch.filter(x => x.id.toLowerCase().match(query))
      this.setState({
        gearData: dataToSearch
      })
    }
  }

  _renderGearItem= ({item, index}) => {
    const AnimatedTouchable = Animated.createAnimatedComponent(TouchableOpacity);
    const inputRange = [
      -1,
      0,
      130 * index,
      130 * (index + 2)
    ]
    const opacityinputRange = [
      -1,
      0,
      130 * index,
      130 * (index + .5)
    ]
    const scale = this.state.scrollY.interpolate(
      {
        inputRange,
        outputRange: [
          1,1,1,0
        ]
      }
    )
    const opacity = this.state.scrollY.interpolate(
      {
        inputRange: opacityinputRange,
        outputRange: [
          1,1,1,0
        ]
      }
    )
    return(
      <AnimatedTouchable style ={{flexDirection: 'row', padding: 20, marginBottom: 20, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 12,
      shadowColor: "#000", shadowOffset: {
        width: 0, height: 10
      }, shadowOpacity: 0.3, shadowRadius: 20,opacity, transform:[{scale}]}} onPress={() => this.props.route.params.navigation.navigate('Gear', {gearData: item, navigation: this.props.route.params.navigation}, {title:item.id})}>
          <Image source={{uri: item.image}} style={{width: 70, height: 70, marginRight: 10, borderRadius: 70}}/>
          <View style={{width: '100%',  flexShrink: 1, flex: 1}}>
            <Text style={{fontSize: 14, fontWeight: '700', flexWrap:'wrap'}}>{item.names.wiki}</Text>
            <Text style={{fontSize: 12, opacity: .7}}>{item.category}</Text>
          </View>
      </AnimatedTouchable>);
  }

  render() {
    if(this.state.isLoading) {
      return(
        <View style={{flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff'}}>
          <LottieView source={require('../../assets/lottie-json/dbLoad.json')} autoPlay loop/>
        </View>
      )
    } else {
      return (
        <LinearGradient
          colors={['#373B44', '#4286f4', '#373B44']}
          style={{
            flex: 1,
          }}
        >
          {
            this.state.selectedTab ? (<View style={styles.header}>
              <TextInput
                placeholder='Enter Ship Name'
                placeholderTextColor="grey"
                value={this.state.query}
                onChangeText={(event) => this.setFlatList(event)}
                style={styles.input}
              />
            </View>) :
            (<View style={styles.header}>
                <TextInput
                placeholder='Enter Gear Name'
                placeholderTextColor="grey"
                value={this.state.gearQuery}
                onChangeText={(event) => this.setGearList(event)}
                style={styles.input}
              />
            </View>)
          }
          
          {
             this.state.selectedTab ? (
               
              <View style={styles.safeAreaViewStyle}>
                <Animated.FlatList 
                  style={{width: '95%'}}
                  onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
                    {useNativeDriver: true}
                  )}
                  contentContainerStyle={{padding: 20}}
                  data={this.state.shipsData} 
                  renderItem={this._renderItem}
                  initialNumToRender={7}
                  keyExtractor={(item,index) => index.toString()}/>
              </View>
             ) : (
              <View style={styles.safeAreaViewStyle}>
                <Animated.FlatList 
                  style={{width: '95%'}}
                  onScroll={Animated.event(
                    [{nativeEvent: {contentOffset: {y: this.state.scrollY}}}],
                    {useNativeDriver: true}
                  )}
                  contentContainerStyle={{padding: 20}}
                  data={this.state.gearData} 
                  renderItem={this._renderGearItem}
                  initialNumToRender={7}
                  keyExtractor={(item,index) => index.toString()}/>
              </View>
             )
          }

          <View style={{height: 60,
            width: '100%',
            flexDirection: 'row',
            backgroundColor: '#fff',
            justifyContent: 'space-evenly', }}>
            <TouchableOpacity style={{marginTop: 20, flexDirection: 'row'}} onPress={() => this.setState({selectedTab: true, scrollY: new Animated.Value(0)})}>
              <Ionicons name='boat-outline' size={22} color="#000"/>
              <Text style={{fontWeight: this.state.selectedTab ? "bold" : "normal"}}>Ships</Text>
            </TouchableOpacity>
            <TouchableOpacity style={{marginTop: 20, flexDirection: 'row'}} onPress={() => this.setState({selectedTab: false, scrollY: new Animated.Value(0)})}>
              <Ionicons name='cog-outline' size={22} color="#000"/>
              <Text style={{fontWeight: this.state.selectedTab ? "normal" : "bold"}}>Gear</Text>
            </TouchableOpacity>
          </View>
        </LinearGradient>
      );
    }
  }
}

const styles = StyleSheet.create({
safeAreaViewStyle: {
    flex:1, 
    justifyContent: 'center', 
    alignItems: 'center',
},
textStyle: {
    fontWeight: 'bold',
    fontSize: 30,
    color: '#20315F',
    fontFamily: 'Roboto-Bold'
},
header:{
  height: 80,
  width: '100%',
  backgroundColor: '#ff5b77',
  justifyContent: 'center',
  alignContent: 'center',
  alignItems: 'center'
},
input: {
  height: 45,
  width: '90%',
  backgroundColor: '#fff',
  borderRadius: 20,
  padding: 5,
  paddingLeft: 10
}
});

export default Home;