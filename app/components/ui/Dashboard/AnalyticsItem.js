import React, { Component } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";

import vars from "../../../config/styles";

const { width } = Dimensions.get("window");

class AnalyticsItem extends Component {
  render() {
    const styles = StyleSheet.create(this.getStyles());
    return (
      <View style={styles.container}>
        <Text style={styles.number}>{this.props.number}</Text>
        <Text style={styles.description}>{this.props.description}</Text>
      </View>
    );
  }
  getStyles() {
    return {
      container: {
        width: (width - 40) / 4,
        backgroundColor: this.props.color,
        paddingHorizontal: 8,
        paddingVertical: 10,
        borderRadius: 10
      },
      number: {
        fontFamily: vars.font.bold,
        fontSize: 30,
        color: "#fff"
      },
      description: {
        fontFamily: vars.font.bold,
        fontSize: 15,
        color: "#fff"
      }
    };
  }
}

export default AnalyticsItem;
