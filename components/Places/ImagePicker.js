import { View,Button, Alert, Image, Text,StyleSheet } from "react-native";
import { launchCameraAsync,useCameraPermissions,PermissionStatus } from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/colors";

function ImagePicker(){
    const [pickedImage,setPickedImage] = useState();
    const [cameraPermissionInformation,requestPermission] = useCameraPermissions();

    async function verifyPermissions(){
        if(cameraPermissionInformation.status === PermissionStatus.UNDETERMINED){
            const permissionResponse = await requestPermission();
            return permissionResponse.granted;
        }
        if(cameraPermissionInformation.status === PermissionStatus.DENIED){
            Alert.alert('Insufficient Permissions !',
            'You need to grant camera permission to use this App.'
            );
            return false;
        }
        return true; //not in UNDETERMINED state and Not DENIED, so we do have the permission to use the camera
    }

    async function takeImageHandler(){
        const hasPermission = await verifyPermissions();
        if(!hasPermission){ //false 
            return ; //to cancel the execution of this function ,
        }

        const image = await launchCameraAsync({
            allowsEditing:true,
            aspect:[16,9],
            quality:0.5,
        });
        // console.log(image); below storing image object state
        setPickedImage(image.assets[0]?.uri);
        console.log(image);
        console.log(image.assets.uri)
    }
    let imagePreview = <Text>No image taken yet.</Text>;

    if(pickedImage){
        imagePreview=<Image style={styles.image} source={{uri:pickedImage}} />;
    }
    
    return (
    <View>
        <View style={styles.imagePreview}>
            {imagePreview}
        </View>
        <Button title='take image' onPress={takeImageHandler}/>
    </View>
    );
}

export default ImagePicker;
const styles=StyleSheet.create({
    imagePreview:{
        width:'100%',
        height:200,
        marginVertical:8,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor:Colors.primary100,
        borderRadius:4,

    },
    image:{
        width:'100%',
        height:'100%',
    }
});