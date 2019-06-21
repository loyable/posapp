import React, { Component } from "react";

import {
  View,
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Dimensions,
  ActivityIndicator
} from "react-native";

import { connect } from "react-redux";

import vars from "../../config/styles";

import SVG from "react-native-remote-svg";

//map redux state to properties
const mapStateToProps = state => {
  return {
    ...state
  };
};

//map redux dispatch function to properties
const mapDispatchToProps = dispatch => {
  return {};
};
class LoginScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <SVG
          style={styles.logo}
          source={require("../../assets/icons/logo.svg")}
        />
        <View style={form.container}>
          <View style={form.inputContainer}>
            <Text style={form.inputLabel}>Email</Text>
            <TextInput
              style={form.input}
              onChangeText={email => this.setState({ email })}
            />
          </View>
          <View style={form.inputContainer}>
            <Text style={form.inputLabel}>Password</Text>
            <TextInput
              style={form.input}
              onChangeText={password => this.setState({ password })}
            />
          </View>
          <TouchableOpacity
            activeOpacity={0.8}
            style={form.button}
            onPress={() => this.props.navigation.navigate("Dashboard")}
          >
            <Text style={form.buttonText}>Login</Text>
          </TouchableOpacity>
        </View>
        <View>
          <View>
            <Text style={styles.title}>Vuoi iscriverti come esercente?</Text>
            <Text style={styles.subtitle}>Visita il sito loyable.it!</Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: vars.color.background,
    flex: 1,
    alignItems: "center",
    justifyContent: "space-evenly"
  },
  logo: {
    width: 250,
    height: 150
  },
  title: {
    fontFamily: vars.font.bold,
    color: vars.color.title,
    fontSize: vars.fontSize.title,
    textAlign: "center"
  },
  subtitle: {
    fontFamily: vars.font.regular,
    color: vars.color.subtitle,
    fontSize: vars.fontSize.subtitle,
    textAlign: "center"
  },
  description: {
    fontFamily: vars.font.regular,
    color: vars.color.description,
    fontSize: vars.fontSize.description,
    textAlign: "center"
  },
  loading: {
    position: "absolute",
    backgroundColor: "rgba(0,0,0,0.1)",
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: "center",
    justifyContent: "center"
  }
});

const form = StyleSheet.create({
  container: {
    width: "80%"
  },
  inputContainer: {
    marginBottom: 10
  },
  input: {
    fontFamily: vars.font.regular,
    fontSize: 30,
    height: 54,
    borderWidth: 2,
    borderRadius: 10,
    borderColor: "#e5e5e5",
    paddingHorizontal: 15,
    paddingVertical: 10,
    color: "#525252",
    width: "100%"
  },
  inputLabel: {
    fontFamily: vars.font.bold,
    fontSize: 25,
    color: vars.color.title,
    marginBottom: 10
  },
  button: {
    marginTop: 13,
    padding: 12,
    backgroundColor: vars.color.secondary,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 1
  },
  buttonText: {
    color: "#fff",
    textAlign: "center",
    fontFamily: vars.font.regular,
    fontSize: vars.fontSize.button
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginScreen);
