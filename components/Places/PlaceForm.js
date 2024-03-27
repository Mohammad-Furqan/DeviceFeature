import { useState } from "react";
import { Text,View,StyleSheet, TextInput, ScrollView } from "react-native";
import { Colors } from "../../constants/colors";
import Button from "../UI/Button";
import ImagePicker from "./ImagePicker";
import LocationPicker from "./LocationPicker";

function PlaceForm(){
    const [enteredTitle,setEnteredTitle]=useState('');

    function changeTitleHandler(enteredText){
        setEnteredTitle(enteredText);
    }

    return (
        <ScrollView style={styles.form}>
            <View>
                <Text style={styles.label}>The Place Form </Text>
                <TextInput style={styles.input}
                    onChangeText={changeTitleHandler}
                    value={enteredTitle} />  
            </View>
            <ImagePicker/>
            <LocationPicker/>
            <Button>Add Place</Button>
        </ScrollView>
    );
}

export default PlaceForm;
const styles= StyleSheet.create({
    form:{
        flex:1,
        // padding:24,
        paddingHorizontal:24,
        paddingTop:24,
        // paddingBottom:      
        

    },
    label:{
        fontWeight:'bold',
        marginBottom:4,
        color:Colors.primary500,
    },
    input:{
        marginVertical:8,
        paddingHorizontal:4,
        paddingVertical:8,
        fontSize:16,
        borderBottomColor:Colors.primary700,
        borderBottomWidth:2,
        backgroundColor:Colors.primary100,

    },
});