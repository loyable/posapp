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
  Animated
} from "react-native";

import { connect } from "react-redux";

import Utils from "../config/utils";

//SVG Library
import SVG from "react-native-remote-svg";

const { width, height } = Dimensions.get("window");

import QRCodeScanner from "react-native-qrcode-scanner";

//map redux state to properties
const mapStateToProps = state => {
  return {
    ...state
  };
};

class QRCodeScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
      success: false
    };
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <Text style={styles.overlayText}>Inquadra il codice QR</Text>

        <QRCodeScanner onRead={e => alert(e.data)} />
        <View style={styles.boxContainer}>
          <SVG
            style={styles.box}
            source={require("../assets/icons/qrcodebox.svg")}
          />
        </View>
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
  }
});

export default connect(mapStateToProps)(QRCodeScreen);
