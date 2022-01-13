import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  ActivityIndicator,
  Alert,
  Animated,
  FlatList,
  Image,
  ImagePropTypes,
  Modal,
  Pressable,
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
}
  
interface IState{
    modalVisible: boolean
}

class Settings extends React.Component<Iprops,IState> {
    constructor(props: Iprops) {
        super(props)
        this.state ={
            modalVisible: false
        }
    }

    render() {
        return(<View style={{backgroundColor: "#fff", width: '100%', height: '100%'}}>
            <TouchableOpacity style={{backgroundColor: "#fff", flexDirection: 'row', margin: 20}} onPress={() => this.setState({modalVisible: !this.state.modalVisible})}>
                <Ionicons name="close-circle-outline" size={28}/>
                <Text style={{fontSize:18, fontWeight:"400", marginLeft: 20}}>Update Data Manually</Text>
            </TouchableOpacity>
            <View style={styles.centeredView}>
                <Modal
                    animationType="slide"
                    transparent={true}
                    visible={this.state.modalVisible}
                    onRequestClose={() => this.setState({modalVisible: false})}
                >
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                        <Text style={styles.modalText}>Are you sure?</Text>
                        <View style={{flexDirection: 'row', justifyContent:'space-evenly', width: '100%'}}>
                            <TouchableOpacity style={{borderWidth: 1, borderRadius: 10, width: '25%', justifyContent:'center', alignItems: 'center'}} onPress={() => {AsyncStorage.clear(), this.setState({modalVisible: false})}}>
                                <Text>Yes</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={{borderWidth: 1, borderRadius: 10, width: '25%', justifyContent:'center', alignItems: 'center'}} onPress={() =>this.setState({modalVisible: false})}>
                                <Text>No</Text>
                            </TouchableOpacity>
                        </View>
                        </View>
                    </View>
                </Modal>
            </View>
        </View>);
    }
}

const styles = StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2
    },
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center"
    }
  });

export default Settings