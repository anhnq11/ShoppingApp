import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        width: '100%',
        height: '100%',
        backgroundColor: '#201520',
        padding: 15,
        paddingTop: 35,
    },
    topLayout: {
        width: '100%',
        height: 50,
        flexDirection: 'row',
    },
    // Left layout
    leftLayout: {
        width: '70%',
        height: '100%',
        justifyContent: 'center',
    },
    text: {
        color: '#EFE3C8',
        fontSize: 30,
        fontWeight: 'bold',
    },
    // Right layout
    rightLayout: {
        width: '30%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'flex-end'
    },
    imgAvatar: {
        width: 55,
        height: 55,
        borderWidth: 2,
        borderColor: '#EFE3C8',
        borderRadius: 100,
        overflow: 'hidden',
    },
    // Bottom layout
    bottomLayout: {
        marginTop: 10,
        height: '90%'
    },
    searchBox:{
        width: '100%',
        borderRadius: 20,
        borderColor: '#EFE3C8',
        color: '#EFE3C8',
        borderWidth: 2,
        marginBottom: 10,
        paddingVertical: 3,
        paddingHorizontal: 15,
        flexDirection: 'row',
        alignItems: 'center',
    },
    searchContent:{
        color: '#EFE3C8', 
        fontSize: 20
    }
})