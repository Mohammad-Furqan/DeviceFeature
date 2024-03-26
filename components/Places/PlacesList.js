import { FlatList,View,Text ,StyleSheet} from "react-native";
import PlaceItem from "./PlaceItem";


function PlacesList({places}){
    if(!places || places.length === 0){
        return (
        <View style={styles.fallbackContainer}>
            <Text styles={styles.fallbackText}>
                No Places added yet - start added some!!
            </Text>
        </View>
        );
    }
    return (<FlatList 
                data={places} 
                keyExtractor={(item)=>item.id} 
                renderItem={({item})=><PlaceItem place={item} /> }/>);
}

export default PlacesList;
const styles=StyleSheet.create({
    fallbackContainer:{
        flex:1,
        justifyContent:'center',
        alignItems:'center',

    },
    fallbackText:{
        fontSize:16
    },
});