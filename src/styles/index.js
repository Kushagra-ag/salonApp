import { StyleSheet, Dimensions } from 'react-native';
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
    container: {
        paddingVertical: 30,
        paddingHorizontal: 20
    },
    title: {
        paddingHorizontal: 10,
        paddingVertical: 20,
        fontSize: 20
    },
    heading: {
        fontSize: 25,
        paddingHorizontal: 15,
        marginVertical: 30,
        alignSelf: 'flex-start'
    },
    safeAreaView: {
        height: height,
    },
    listItem: {
        // This class is to be deleted
        marginBottom: 10
    },
    listItemBody: {
        marginBottom: 10
    },
    listImage: {
        width: 'auto',
        height: 100
    },
    primaryBtn: {
        backgroundColor: '#f85f6a'
    },
    buttonText: {
        fontWeight: 'bold',
        textTransform: 'uppercase',
        color: '#fff'
    },
    lightButtonText: {
        color: '#666'
    },
    mapContainer: {
        position: 'absolute',
        width: '100%',
        height: height
    },
    mapMarkerPin: {
        height: 24,
        width: 24
    },
    mapsTopPanel: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        position: 'absolute',
        top: 0,
        width: '100%',
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: '#edebed',
        zIndex: 10
    },
    mapsTopPanelText: {
        paddingHorizontal: 10,
        fontSize: 18
    },
    mapsBottomPanel: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        padding: 20,
        backgroundColor: '#fff',
        zIndex: 10
    },
    orderDetailsHeading: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
    orderDetailsView: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    sidebarContainer: {
        flex: 1,
        height: height
    },
    sidebarLabel: {
        fontSize: 16
    },
    sidebarFooter: {
        backgroundColor: '#fff',
        width: '100%',
        position: 'absolute',
        bottom: 0,
        borderTopColor: '#ddd',
        borderTopWidth: 1,
        padding: 20,
        zIndex: 10
    },
    errMsg: {
        flexDirection: 'column',
        flexWrap: 'wrap',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 30
    },
    footer: {
        // position:'absolute',
        // bottom: 0,
    }
});

export const horizontalAnimation = {
    gestureDirection: 'horizontal',
    cardStyleInterpolator: ({ current, layouts }) => {
        return {
            cardStyle: {
                transform: [
                    {
                        translateX: current.progress.interpolate({
                            inputRange: [0, 1],
                            outputRange: [layouts.screen.width, 0]
                        })
                    }
                ]
            }
        };
    }
};

export default styles;
