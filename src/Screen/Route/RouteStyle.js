import { StyleSheet } from "react-native";  

export default StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        backgroundColor: '#201520',
    },
    topLayout: {
        width: '100%',
        height: '80%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    bottomLayout: {
        width: '100%',
        height: '20%',
        justifyContent: 'flex-end',
        alignItems: 'center',
        paddingBottom: 5
    },
    button: {
        width: '80%',
        backgroundColor: '#EFE3C8',
        marginBottom: 10,
        borderRadius: 20,
        paddingVertical: 4,
        borderColor: '#EFE3C8',
        borderWidth: 2,
    },
    text: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 25,
        color: '#201520'
    }
})