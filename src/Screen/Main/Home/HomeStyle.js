import { StyleSheet } from "react-native";

export default StyleSheet.create({
    container: {
        backgroundColor: '#201520',
        padding: 15,
        paddingTop: 25,
    },
    // Top layout
    topLayout: {
        width: '100%',
        height: 100,
        flexDirection: 'row',
    },
    // Left layout
    leftLayout: {
        width: '75%',
        justifyContent: 'center',
    },
    text: {
        color: '#EFE3C8',
        fontSize: 22,
    },
    // Right layout
    rightLayout: {
        width: '25%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    imgAvatar: {
        width: 65,
        height: 65,
        borderWidth: 2,
        borderColor: '#EFE3C8',
        borderRadius: 100,
        overflow: 'hidden',
    },
    // Bottom layout
    bottomLayout: {
        marginTop: 10,
        height: '85%', 
    },
    imgFeature:{
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
    },  
    imgFeatureBox: {
        width: 330,
        height: 180,
        backgroundColor: 'red',
        marginRight: 13,
        borderRadius: 30,
        overflow: 'hidden',
    },
    listHeader: {
        color: '#EFE3C8',
        fontSize: 23,
        marginBottom: 10,
        fontWeight: 'bold'
    }
})