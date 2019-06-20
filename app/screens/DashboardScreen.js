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
  Dimensions
} from "react-native";

import { connect } from "react-redux";

//SVG Library
import SVG from "react-native-remote-svg";

const { width, height } = Dimensions.get("window");

import AnalyticsItem from "../components/ui/Dashboard/AnalyticsItem";

//map redux state to properties
const mapStateToProps = state => {
  return {
    ...state
  };
};

class DashboardScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return (
      <SafeAreaView style={styles.container}>
        <Text style={styles.title}>Dashboard</Text>
        <View style={styles.analyticsContainer}>
          <AnalyticsItem color="#ff0400" number={80} description="Tessere" />
          <AnalyticsItem color="#10e5e8" number={15} description="Completate" />
          <AnalyticsItem color="#ffc445" number={50} description="Clienti" />
          <AnalyticsItem color="#72e81f" number={12} description="Bollini" />
        </View>
        <Text style={styles.title}>Classifica Clienti</Text>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: vars.color.background,
    flex: 1,
    padding: 10
  },
  title: {
    fontFamily: vars.font.bold,
    fontSize: 25,
    color: vars.color.title
  },
  subtitle: {
    fontFamily: vars.font.bold,
    fontSize: 25,
    color: vars.color.subtitle
  },
  description: {
    fontFamily: vars.font.regular,
    fontSize: 16,
    color: vars.color.description
  },
  analyticsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 10
  }
});

export default connect(mapStateToProps)(DashboardScreen);
