import { StyleSheet } from "react-native";  

export default StyleSheet.create({
    container:{
        width: '100%',
        height: '100%',
        backgroundColor: '#201520',
    },
    topLayout: {
        width: '100%',
        height: '45%',
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 30
    },
    bottomLayout: {
        width: '100%',
        height: '55%',
        alignItems: 'center',
        paddingBottom: 5
    },
    headerText:{
        color: '#EFE3C8',
        fontSize: 28,
        fontWeight: 'bold',
        marginBottom: 5
    },
    input:{
        width: '80%',
        borderRadius: 20,
        borderColor: '#EFE3C8',
        color: '#EFE3C8',
        borderWidth: 2,
        marginBottom: 10,
        fontSize: 20,
        paddingVertical: 5,
        paddingHorizontal: 20,
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
    },
    errorText:{
        width: '80%',
        textAlign: 'left',
        color: 'red',
        fontSize: 15,
        marginBottom: 10
    },
    loginBox:{
        width: '80%',
        borderWidth: 2,
        borderColor: '#EFE3C8',
        borderRadius: 20,
        padding: 5,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 10,
    },
    loginImgBox:{
        width: 30,
        height: 30,
    },
    loginImg:{
        width: '100%',
        height: '100%'
    },
    loginLabel:{
        fontSize: 20,
        fontWeight: '500',
        marginLeft: 5,
        color: '#EFE3C8'
    },
})