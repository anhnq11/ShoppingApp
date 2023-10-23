import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        width: 170,
        height: 230,
        backgroundColor: '#362C36',
        borderRadius: 20,
        padding: 10,
        marginHorizontal: 7,
        marginBottom: 10
    },
    productImage:{
        width: '100%',
        height: '80%',
        backgroundColor: 'white',
        borderRadius: 15,
        overflow: 'hidden',   
    },
    productInfo:{
        flexDirection: 'row', 
        alignItems: 'center', 
        marginTop: 10,
        height: '15%',
        overflow: 'hidden',
    },
    text:{
        color: '#EFE3C8',
        fontSize: 18,
        fontWeight: 'bold',
        marginTop: 2,
        height: '80%',
    },
    addButton:{
        backgroundColor: '#EFE3C8',
        borderRadius: 5,
        height: '100%',
        width: '20%',
        marginLeft: '5%',
        justifyContent: 'center',
        alignItems: 'center',
    }
})