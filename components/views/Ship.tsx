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
    shipData: any
    imageData: any
    scrollX: any
    selectedTab: boolean
}

const {width, height} = Dimensions.get('screen')
const ITEM_WIDTH = width * 0.76
const ITEM_HEIGHT = ITEM_WIDTH  * 1.47
const logo = {
    faction: {
      de: require('../../assets/images/De_1.png'),
      bi: require('../../assets/images/Bi_1.png'),
      cn: require('../../assets/images/Cn_1.png'),
      en: require('../../assets/images/En_1.png'),
      Ff: require('../../assets/images/Ff_1.png'),
      Rn: require('../../assets/images/Rn_1.png'),
      Jp: require('../../assets/images/Jp_1.png'),
      Sn: require('../../assets/images/Sn_1.png'),
      Us: require('../../assets/images/Us_1.png'),
      Vf: require('../../assets/images/Vf_1.png'),
      other: require('../../assets/images/De_1.png'),
    }
  };

class Ship extends React.Component<Iprops,IState> {
    constructor(props: Iprops) {
        super(props)
        this.state ={
            shipData: {},
            imageData: {},
            scrollX: new Animated.Value(0),
            selectedTab: true
        }
    }

    componentDidMount() {
        LogBox.ignoreLogs(['VirtualizedLists should never be nested']);
        const {shipData} = this.props.route.params
        const data = shipData.skins.map((image, index)=> ({
            key: String(index),
            photo: image.image,
            avatar_url: image.chibi,
            background: image.background
        }))
        this.setState({
            shipData: shipData,
            imageData: data
        })
    }

    _renderItem = ({item, index}) => {
        const inputRange = [
            (index-1) * width,
            index* width,
            (index+1) * width
        ];
        const translateX = this.state.scrollX.interpolate({
            inputRange,
            outputRange: [
                -width * 0.7, 0, width * 0.7
            ]
        })
        return(
            <View style={{width, justifyContent: 'center', alignItems: 'center'}}>
                <View style={{borderRadius: 14, borderWidth: 10, borderColor:'#fff', shadowColor:'#000', shadowOffset: {
                            width: 0, height: 0
                        }, shadowOpacity: 0.5,
                        shadowRadius: 20, padding: 5, backgroundColor: 'white'}}>
                    <ImageBackground style={{width: ITEM_WIDTH, height: ITEM_HEIGHT,
                        justifyContent: "center"}}source={{uri: item.background}} resizeMode="cover">
                        <View style={{
                            width: ITEM_WIDTH, height: ITEM_HEIGHT, overflow:'hidden', alignItems: 'center',
                        }}>
                            <Animated.Image
                                source={{uri: item.photo}}
                                style={{width: ITEM_WIDTH, height: ITEM_HEIGHT, resizeMode: 'contain', transform:[
                                    {translateX}
                                ]}}
                            />
                        </View>
                    </ImageBackground>
                    <Image
                        source={{uri: item.avatar_url}}
                        style={{width: 60, height: 60, borderRadius: 60, borderWidth: 2, borderColor: 'white', position:'absolute', bottom: 0 }}
                    />
                </View>
            </View>
        )
    }

    _renderSkills= ({item, index}) => {
        return(
            <View style={{flex: 1, flexDirection: 'row' }} key={index}>
                <Image
                    source={{uri: item.icon}}
                    resizeMode='contain'
                    style={{width: 60, height: 60, marginVertical: 30, marginHorizontal: 5}}
                />
                <View style ={{width: '75%',flexDirection: 'column', margin: 10}}>
                    <Text style={{fontSize: 14, color: "#000", fontWeight:'bold'}}>{item.names.en}</Text>
                    <Text style={{flexShrink: 1, flexWrap: 'wrap'}}>{item.description}</Text>
                </View>
            </View>
        )
    }

    _getFactionPicture(faction) {
        if(faction == "Iron Blood") {
            return logo.faction.de
        } else if (faction == "Royal Navy") {
            return logo.faction.en
        } else if (faction == "Bilibili ") {
            return logo.faction.bi
        } else if (faction == "Eagle Union") {
            return logo.faction.Us
        } else if (faction == "Sakura Empire") {
            return logo.faction.Jp
        } else if (faction == "Dragon Empery") {
            return logo.faction.cn
        } else if (faction == "Northern Parliament") {
            return logo.faction.Sn
        }else if (faction == "Iris Libre") {
            return logo.faction.Ff
        }else if (faction == "Vichya Dominion") {
            return logo.faction.Vf
        }else if (faction == "Sardegna Empire") {
            return logo.faction.Rn
        }else {
            return logo.faction.other
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

      getContainerColor(nat) {
        if(nat == "Iron Blood") {
            return "#d59c9c"
        } else if (nat == "Royal Navy") {
        return "#d6e1f8"
        } else if (nat == "Bilibili ") {
            return "#cfd9ec"
        } else if (nat == "Eagle Union") {
            return "#0062aa"
        } else if (nat == "Sakura Empire") {
            return "#ffc0ca"
        } else if (nat == "Dragon Empery") {
            return "red"
        } else if (nat == "Northern Parliament") {
            return "#E8E2E2"
        }else if (nat == "Iris Libre") {
            return "#FFFFA7"
        }else if (nat == "Vichya Dominion") {
            return "#D2BD96"
        }else if (nat == "Sardegna Empire") {
            return "#C7F6B6"
        }else {
            return "#FDFCFC"
        }
      }

    render() {
        const name = this.state.shipData.names && this.state.shipData.names.en
        const hulltype = this.state.shipData.hullType
        const rarity = this.state.shipData.rarity
        let colorType = this.getColor(rarity)
        let statsHealth = this.state.shipData.stats && this.state.shipData.stats.level125 && this.state.shipData.stats.level125.health
        let statsantiair = this.state.shipData.stats && this.state.shipData.stats.level125 && this.state.shipData.stats.level125.antiair
        let statsaviation = this.state.shipData.stats && this.state.shipData.stats.level125 && this.state.shipData.stats.level125.aviation
        let statsevasion = this.state.shipData.stats && this.state.shipData.stats.level125 && this.state.shipData.stats.level125.evasion
        let statsfirepower = this.state.shipData.stats && this.state.shipData.stats.level125 && this.state.shipData.stats.level125.firepower
        let statsluck = this.state.shipData.stats && this.state.shipData.stats.level125 && this.state.shipData.stats.level125.luck
        let statsreload = this.state.shipData.stats && this.state.shipData.stats.level125 && this.state.shipData.stats.level125.reload
        let statsspeed = this.state.shipData.stats && this.state.shipData.stats.level125 && this.state.shipData.stats.level125.speed
        let statstorpedo = this.state.shipData.stats && this.state.shipData.stats.level125 && this.state.shipData.stats.level125.torpedo
        let statsantisubmarineWarfare = this.state.shipData.stats && this.state.shipData.stats.level125 && this.state.shipData.stats.level125.antisubmarineWarfare
        let statsarmor = this.state.shipData.stats && this.state.shipData.stats.level125 && this.state.shipData.stats.level125.armor
        let containerColor = this.getContainerColor(this.state.shipData.nationality)
        return(
            <ScrollView style={styles.safeAreaViewStyle}>
                <View style={{flex: 1,alignItems: 'flex-start', justifyContent: 'flex-start',  marginBottom: -50, width, height: 250, paddingTop: 50}}>
                    <View style={{flexDirection: 'row'}}>
                        <Image source={this._getFactionPicture(this.state.shipData.nationality)} resizeMode='contain' style={{width: 60, height: 60}}/>
                        <View style={{flexDirection: 'column', flex: 1}}>
                            <Text style={{fontSize: 30, fontWeight: '700', flexShrink: 1}}>{name}</Text>
                            <Text style={{fontSize: 15, fontWeight: '700'}}>{hulltype}</Text>
                            <Text style={{fontSize: 10, opacity: .8, color: colorType}}>{rarity}</Text>
                        </View>
                    </View>
                </View>
                <Animated.FlatList
                    data={this.state.imageData}
                    keyExtractor={item => item.key}
                    renderItem={this._renderItem}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    pagingEnabled
                    onScroll={Animated.event(
                        [{nativeEvent: {contentOffset: {x:this.state.scrollX}}}],
                        {useNativeDriver: true}
                    )}
                />
                {
                    this.state.selectedTab ? (
                        <View style={{alignItems: 'flex-start', justifyContent: 'flex-start', margin: 10, backgroundColor: containerColor, borderRadius: 5}}>
                            <View style={{width: '100%', flexDirection: 'row'}}>
                                <View style={{flex: 0.4, flexDirection: 'row', justifyContent:'flex-start', alignItems:'center'}}>
                                    <Image source={require('../../assets/images/health.png')} resizeMode='cover' style={{width: 15, height: 15, marginRight: 5}}/>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "700", }}>Health: </Text>
                                </View>
                                <View style={{flex: 0.6}}>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "normal", textAlign: 'right'}}>{statsHealth}</Text>
                                </View>
                            </View>
                            <View style={{ width: '100%', flexDirection: 'row'}}>
                                <View style={{flex: 0.4, flexDirection: 'row', justifyContent:'flex-start', alignItems:'center'}}>
                                    <Image source={require('../../assets/images/fp.png')} resizeMode='cover' style={{width: 15, height: 15, marginRight: 5}}/>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "700", }}>Firepower: </Text>
                                </View>
                                <View style={{ flex: 0.6}}>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "normal", textAlign: 'right'}}>{statsfirepower}</Text>
                                </View>
                            </View>
                            <View style={{ width: '100%', flexDirection: 'row'}}>
                                <View style={{flex: 0.4, flexDirection: 'row', justifyContent:'flex-start', alignItems:'center'}}>
                                    <Image source={require('../../assets/images/to.png')} resizeMode='cover' style={{width: 15, height: 15, marginRight: 5}}/>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "700", }}>Torpedo: </Text>
                                </View>
                                <View style={{flex: 0.6}}>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "normal", textAlign: 'right'}}>{statstorpedo}</Text>
                                </View>
                            </View>
                            <View style={{width: '100%', flexDirection: 'row'}}>
                                <View style={{flex: 0.4, flexDirection: 'row', justifyContent:'flex-start', alignItems:'center'}}>
                                    <Image source={require('../../assets/images/av.png')} resizeMode='cover' style={{width: 15, height: 15, marginRight: 5}}/>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "700", }}>Aviation: </Text>
                                </View>
                                <View style={{flex: 0.6}}>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "normal", textAlign: 'right'}}>{statsaviation}</Text>
                                </View>
                            </View>
                            <View style={{width: '100%', flexDirection: 'row'}}>
                                <View style={{flex: 0.4, flexDirection: 'row', justifyContent:'flex-start', alignItems:'center'}}>
                                    <Image source={require('../../assets/images/aa.png')} resizeMode='cover' style={{width: 15, height: 15, marginRight: 5}}/>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "700", }}>Anti Air: </Text>
                                </View>
                                <View style={{flex: 0.6}}>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "normal", textAlign: 'right'}}>{statsantiair}</Text>
                                </View>
                            </View>
                            <View style={{width: '100%', flexDirection: 'row'}}>
                                <View style={{flex: 0.4, flexDirection: 'row', justifyContent:'flex-start', alignItems:'center'}}>
                                    <Image source={require('../../assets/images/re.png')} resizeMode='cover' style={{width: 15, height: 15, marginRight: 5}}/>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "700", }}>Reload: </Text>
                                </View>
                                <View style={{flex: 0.6}}>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "normal", textAlign: 'right'}}>{statsreload}</Text>
                                </View>
                            </View>
                            <View style={{width: '100%', flexDirection: 'row'}}>
                                <View style={{flex: 0.4, flexDirection: 'row', justifyContent:'flex-start', alignItems:'center'}}>
                                    <Image source={require('../../assets/images/ev.png')} resizeMode='cover' style={{width: 15, height: 15, marginRight: 5}}/>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "700", }}>Evasion: </Text>
                                </View>
                                <View style={{flex: 0.6}}>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "normal", textAlign: 'right'}}>{statsevasion}</Text>
                                </View>
                            </View>
                            <View style={{ width: '100%', flexDirection: 'row'}}>
                                <View style={{flex: 0.4, flexDirection: 'row', justifyContent:'flex-start', alignItems:'center'}}>
                                    <Image source={require('../../assets/images/ar.png')} resizeMode='cover' style={{width: 15, height: 15, marginRight: 5}}/>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "700", }}>Armor: </Text>
                                </View>
                                <View style={{flex: 0.6}}>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "normal", textAlign: 'right'}}>{statsarmor}</Text>
                                </View>
                            </View>
                            <View style={{ width: '100%', flexDirection: 'row'}}>
                                <View style={{flex: 0.4, flexDirection: 'row', justifyContent:'flex-start', alignItems:'center'}}>
                                    <Image source={require('../../assets/images/spd.png')} resizeMode='contain' style={{width: 15, height: 15, marginRight: 5}}/>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "700", }}>Speed: </Text>
                                </View>
                                <View style={{flex: 0.6}}>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "normal", textAlign: 'right'}}>{statsspeed}</Text>
                                </View>
                            </View>
                            <View style={{width: '100%', flexDirection: 'row'}}>
                                <View style={{flex: 0.4, flexDirection: 'row', justifyContent:'flex-start', alignItems:'center'}}>
                                    <Image source={require('../../assets/images/Luck.png')} resizeMode='contain' style={{width: 15, height: 15, marginRight: 5}}/>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "700", }}>Luck: </Text>
                                </View>
                                <View style={{flex: 0.6}}>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "normal", textAlign: 'right'}}>{statsluck}</Text>
                                </View>
                            </View>
                            <View style={{width: '100%', flexDirection: 'row'}}>
                                <View style={{flex: 0.4, flexDirection: 'row', justifyContent:'flex-start', alignItems:'center'}}>
                                    <Image source={require('../../assets/images/asw.png')} resizeMode='contain' style={{width: 15, height: 15, marginRight: 5}}/>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "700", }}>ASW: </Text>
                                </View>
                                <View style={{flex: 0.6}}>
                                    <Text style={{fontSize: 16, color: '#000', fontWeight: "normal", textAlign: 'right'}}>{statsantisubmarineWarfare}</Text>
                                </View>
                            </View>
                        </View>
                    ) : (
                        <View style={{alignItems: 'flex-start', justifyContent: 'flex-start', margin: 10, backgroundColor: containerColor, borderRadius: 5}}>
                            <FlatList
                                data={this.state.shipData.skills}
                                keyExtractor={item => item.key}
                                renderItem={this._renderSkills}
                            />
                        </View>
                    )
                }
                <View style={{flexDirection: 'row', padding: 20, marginBottom: 20, backgroundColor: 'rgba(255,255,255,0.8)', borderRadius: 12,
                shadowColor: "#000", shadowOffset: {
                    width: 0, height: 10
                }, shadowOpacity: 0.3, shadowRadius: 20, marginHorizontal: 20}}>
                        <TouchableOpacity style={{flex: 0.5}} onPress={() => this.setState({selectedTab: true})}>
                            <Text style ={{justifyContent:'center', textAlign:'center',fontWeight: this.state.selectedTab ? "bold" : "normal"}}>Stats</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={{flex: 0.5}} onPress={() => this.setState({selectedTab: false})}>
                            <Text style ={{justifyContent:'center', textAlign:'center', fontWeight: this.state.selectedTab ? "normal" : "bold"}}>Skills</Text>
                        </TouchableOpacity>
                </View>
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    safeAreaViewStyle: {
        flex: 1
    },
    textStyle: {
        fontWeight: 'bold',
        fontSize: 30,
        color: '#20315F',
        fontFamily: 'Roboto-Bold'
    },
    gauge: {
        position: 'absolute',
        width: 50,
        height: 110,
        alignItems: 'center',
        justifyContent: 'center',
      },
      gaugeText: {
        backgroundColor: 'transparent',
        color: '#000',
        fontSize: 18,
      },
      container: { alignItems: 'flex-start', justifyContent: 'flex-start', margin: 30, borderColor: '#000', borderWidth: 1},
    });
export default Ship;