import React from 'react';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Dimensions,
  FlatList,
  Image,
  ImageBackground,
  ImagePropTypes,
  LogBox,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';

interface Iprops {
}

interface IState{
    gearData:any
}

const {width, height} = Dimensions.get('screen')

class Gear extends React.Component<Iprops,IState> {
    constructor(props: Iprops) {
        super(props)
        this.state ={
            gearData: {},
        }
    }

    componentDidMount() {
        const {gearData} = this.props.route.params
        this.setState({
            gearData: gearData
        })
    }

    render() {
        const animation = this.state.gearData.misc && this.state.gearData.misc.animation
        const dataStat = this.state.gearData && this.state.gearData.tiers
        const finalDat = dataStat && dataStat[dataStat.length - 1]
        const datStat = finalDat && finalDat.stats
        const ammoType = datStat && datStat.ammoType && datStat.ammoType.formatted
        const angle = datStat && datStat.angle && datStat.angle.formatted
        const aa = datStat && datStat.antiair && datStat.antiair.formatted
        const characteristic =  datStat && datStat.characteristic && datStat.characteristic.formatted
        const damage = datStat && datStat.damage && datStat.damage.formatted
        const firepower = datStat && datStat.firepower && datStat.firepower.formatted
        const range = datStat && datStat.range && datStat.range.formatted
        const rateOfFire = datStat && datStat.rateOfFire && datStat.rateOfFire.formatted
        const spread = datStat && datStat.spread && datStat.spread.formatted
        console.log("dat",datStat)
        return(
            <View style={{flex: 2}}>
                <ScrollView>
                <View style={{flex: 1,alignItems: 'flex-start', justifyContent: 'flex-start',  marginBottom: -50, paddingTop: 50}}>
                    <View style={{alignItems:'center', justifyContent: 'center', width,}}>
                        <Text style={{fontSize: 20, fontWeight: '700', flexShrink: 1}}>{this.state.gearData.id}</Text>
                        <Text style={{fontSize: 20, fontWeight: '700'}}>{this.state.gearData.nationality}</Text>
                        <Text style={{fontSize: 15, fontWeight: '700', flexShrink: 1}}>{this.state.gearData.category}</Text>
                        <Image source={{uri: this.state.gearData.image}} resizeMode='contain' style={{width: 200, height: 200}}/>
                        <Image source={{uri: animation}} resizeMode='contain' style={{width: 300, height: 200}}/>
                    </View>
                    <View style={{flex: 1,width, height: 400, padding: 20}}>
                            <View style={{width: '100%', flexDirection: 'row'}}>
                                <View style={{flex: 0.4,flexDirection: 'row', justifyContent:'flex-start', alignItems:'center'}}>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "700", }}>Ammo Type: </Text>
                                </View>
                                <View style={{flex: 0.6}}>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "normal", textAlign: 'right'}}>{ammoType}</Text>
                                </View>
                            </View>
                            <View style={{ width: '100%', flexDirection: 'row'}}>
                                <View style={{flex: 0.4, flexDirection: 'row', justifyContent:'flex-start', alignItems:'center'}}>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "700", }}>Angle: </Text>
                                </View>
                                <View style={{ flex: 0.6}}>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "normal", textAlign: 'right'}}>{angle}</Text>
                                </View>
                            </View>
                            <View style={{ width: '100%', flexDirection: 'row'}}>
                                <View style={{flex: 0.4, flexDirection: 'row', justifyContent:'flex-start', alignItems:'center'}}>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "700", }}>Anti Air: </Text>
                                </View>
                                <View style={{flex: 0.6}}>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "normal", textAlign: 'right'}}>{aa}</Text>
                                </View>
                            </View>
                            <View style={{width: '100%', flexDirection: 'row'}}>
                                <View style={{flex: 0.4, flexDirection: 'row', justifyContent:'flex-start', alignItems:'center'}}>
                                   <Text style={{fontSize: 16, color: '#000', fontWeight: "700", }}>characteristic: </Text>
                                </View>
                                <View style={{flex: 0.6}}>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "normal", textAlign: 'right'}}>{characteristic}</Text>
                                </View>
                            </View>
                            <View style={{width: '100%', flexDirection: 'row'}}>
                                <View style={{flex: 0.4, flexDirection: 'row', justifyContent:'flex-start', alignItems:'center'}}>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "700", }}>Damage: </Text>
                                </View>
                                <View style={{flex: 0.6}}>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "normal", textAlign: 'right'}}>{damage}</Text>
                                </View>
                            </View>
                            <View style={{width: '100%', flexDirection: 'row'}}>
                                <View style={{flex: 0.4, flexDirection: 'row', justifyContent:'flex-start', alignItems:'center'}}>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "700", }}>firepower: </Text>
                                </View>
                                <View style={{flex: 0.6}}>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "normal", textAlign: 'right'}}>{firepower}</Text>
                                </View>
                            </View>
                            <View style={{width: '100%', flexDirection: 'row'}}>
                                <View style={{flex: 0.4, flexDirection: 'row', justifyContent:'flex-start', alignItems:'center'}}>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "700", }}>Range: </Text>
                                </View>
                                <View style={{flex: 0.6}}>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "normal", textAlign: 'right'}}>{range}</Text>
                                </View>
                            </View>
                            <View style={{ width: '100%', flexDirection: 'row'}}>
                                <View style={{flex: 0.4, flexDirection: 'row', justifyContent:'flex-start', alignItems:'center'}}>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "700", }}>RoF: </Text>
                                </View>
                                <View style={{flex: 0.6}}>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "normal", textAlign: 'right'}}>{rateOfFire}</Text>
                                </View>
                            </View>
                            <View style={{ width: '100%', flexDirection: 'row'}}>
                                <View style={{flex: 0.4, flexDirection: 'row', justifyContent:'flex-start', alignItems:'center'}}>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "700", }}>Spread: </Text>
                                </View>
                                <View style={{flex: 0.6}}>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "normal", textAlign: 'right'}}>{spread}</Text>
                                </View>
                            </View>
                    </View>
                </View>
                </ScrollView>
            </View>
        )
    }
}


export default Gear;
