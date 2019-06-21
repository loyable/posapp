import React, { Component } from "react";
import vars from "../config/styles";

import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Share,
  Dimensions,
  Animated,
  ActivityIndicator
} from "react-native";

import { connect } from "react-redux";

import Utils from "../config/utils";

//SVG Library
import SVG from "react-native-remote-svg";

const { width, height } = Dimensions.get("window");

import QRCodeScanner from "react-native-qrcode-scanner";

import { REQUEST_USER } from "../store/actions";

//map redux state to properties
const mapStateToProps = state => {
  return {
    ...state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    REQUEST_USER(userID, callback) {
      dispatch(REQUEST_USER(userID, callback));
    }
  };
};

class QRCodeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      success: false,
      isLoading: false
    };
  }

  loadUser(userID) {
    this.setState({ isLoading: true });
    this.props.REQUEST_USER(userID, user => {
      this.setState({ isLoading: false });
      if (user.hasOwnProperty("user")) {
        this.props.navigation.navigate("ClientDetails");
        this.setState({ success: true });
      } else {
        this.scanner.reactivate();
      }
    });
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <TouchableOpacity
          onPress={() => this.loadUser("4048ed6b-bcad-4e73-9852-1ba4c585acdb")}
        >
          <Text style={styles.overlayText}>Inquadra il codice QR</Text>
        </TouchableOpacity>

        <QRCodeScanner
          ref={scanner => (this.scanner = scanner)}
          onRead={e => this.loadUser(e.data)}
        />
        {!this.state.isLoading ? (
          <View style={styles.boxContainer}>
            <SVG
              style={styles.box}
              source={require("../assets/icons/qrcodebox.svg")}
            />
          </View>
        ) : (
          <View style={styles.boxContainer}>
            <ActivityIndicator size="large" color="#fff" />
          </View>
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  overlayText: {
    fontFamily: vars.font.regular,
    fontSize: 22,
    marginBottom: 10,
    textAlign: "center",
    color: "#000"
  },
  boxContainer: {
    position: "absolute",
    top: 0,
    right: 0,
    left: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center"
  },
  box: {
    width: 350,
    height: 350
  },
  loadingContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QRCodeScreen);
