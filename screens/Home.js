import React from "react";
import { Platform, StyleSheet, Text, View, Button,StatusBar } from "react-native";


export default class Home extends React.Component {
    static navigationOptions = {
        title: "Home",
        headerStyle: {
            backgroundColor: "#73C6B6"
        }
    };
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.headerText}>Home</Text>
                <Text style={styles.headerText}>Create a New Profile Screen </Text>
                <Button
                    title="Go to new Profile"
                    onPress={() => this.props.navigation.push("Profile")}
                />
            </View>

        );
    }
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#F5FCFF"
    },
    headerText: {
        fontSize: 20,
        textAlign: "center",
        margin: 10,
        fontWeight: "bold"
    }
});

//export default Home;