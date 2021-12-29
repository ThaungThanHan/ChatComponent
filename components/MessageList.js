import React from 'react';
import {Text,ScrollView,View,Image,StyleSheet,FlatList,TouchableOpacity} from 'react-native'
import MapView, {Marker} from 'react-native-maps';

const MessageList = ({messages}) => {
    const testing = JSON.stringify(messages);

    const renderMessageBody = ({type,text,uri,coordinate}) => {
        switch(type){
            case 'text':
                return(
                <Text style={styles.ChatText}>
                    {text}
                </Text>
                );
            case 'image':
                return <Image source={{uri:uri}} style={{width:200,height:200,resizeMode:"contain"}} />;
            case 'location':
                return(
                <MapView style={styles.map} loadingEnabled={true}
                    region={{latitude:coordinate.latitude,longitude:coordinate.longitude,
                    latitudeDelta:0.01,longitudeDelta:0.01
                    }}>
                <Marker coordinate={{latitude:coordinate.latitude,longitude:coordinate.longitude}}
                    title={"Title1"} />
                </MapView>   
                );
            default:
                return <Text>Nothing</Text>;
        }
    }  

    const renderMessageItem = ({item}) => {
        return(
            <View style={styles.messageRow}>
            <TouchableOpacity>
                {renderMessageBody(item)}
            </TouchableOpacity>
            </View>
        )
    }

    return (
        <>
        <ScrollView style={styles.scrollview} nestedScrollEnabled={true}>
        <FlatList style={styles.FlatContainer}
            data={messages}
            renderItem={renderMessageItem}
        />
        </ScrollView>
        </>
    )
}

const styles = StyleSheet.create({
    FlatContainer:{
        flex:1,overflow:"visible",marginTop:0,padding:0
    },
    ChatText:{
        borderWidth:0,padding:10,borderRadius:30,backgroundColor:"#38c3f5",
        color:"white",fontSize:19,marginBottom:10
    },
    scrollview:{
        width:"100%"
    },
    messageRow:{
        flexDirection:"row",             // must be "row" here, so the width for each text won't be constant.
                                         // making it "row", put others on another line since theres no space at end.
        justifyContent:"flex-end",
        marginBottom:4,
        marginTop:0,
        marginRight:10
    },
    map:{
    width: 200,
    height: 200,
    }
})

export default MessageList;