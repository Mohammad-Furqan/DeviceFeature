import { View ,StyleSheet, Alert} from "react-native";
import { Colors } from "../../constants/colors";
import OutlinedButton from "../UI/OutlinedButton";
import {getCurrentPositionAsync,useForegroundPermissions,PermissionStatus} from 'expo-location'
import { version } from "react/cjs/react.production.min";
import { useNavigation } from "@react-navigation/native";
//expo install expo-location
function LocationPicker(){
    const [locationPermissionInformation ,requestPermission] = useForegroundPermissions();
    const navigation = useNavigation();

    async function verifyPermissions(){
        if(locationPermissionInformation.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if(locationPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert('Insufficient Permissions !',
            'You need to grant Location permission to use this App.'
            );
            return false;
        }
        return true;
    }

    async function getLocationHandler(){
        const hasPermission = await verifyPermissions();
        if(!hasPermission){
            return;
        }

        const location = await getCurrentPositionAsync();
        console.log(location);
    }
    function pickOnMapHandler(){
        navigation.navigate('Map'); 
    }

    return (
        <View >
            <View style={styles.mapPreview}></View>
            <View style={styles.actions}>
                <OutlinedButton icon='location' onPress={getLocationHandler}>Locate User</OutlinedButton>
                <OutlinedButton icon='map' onPress={pickOnMapHandler}>Pick on Map</OutlinedButton>
            </View>
        </View>
    );
}

export default LocationPicker;
const styles=StyleSheet.create({
    mapPreview:{
        width:'100%',
        height:200,
        marginVertical:8,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.primary100,
        borderRadius:4,
    },
    actions:{
        flexDirection:'row',
        justifyContent:'space-between',
        alignItems:'center',
    }

});