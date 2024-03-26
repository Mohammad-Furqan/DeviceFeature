import { View,Button, Alert } from "react-native";
import { launchCameraAsync,useCameraPermissions,PermissionStatus } from "expo-image-picker";

function ImagePicker(){
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
        console.log(image);
    }
    return (
    <View>
        <View>

        </View>
        <Button title='take image' onPress={takeImageHandler}/>
    </View>
    );
}

export default ImagePicker;