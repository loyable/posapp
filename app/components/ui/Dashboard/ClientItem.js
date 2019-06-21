import React, { Component } from "react";
import { Text, View, StyleSheet } from "react-native";

import vars from "../../../config/styles";

class ClientItem extends Component {
  render() {
    const styles = StyleSheet.create(this.getStyles());
    return (
      <View style={styles.client}>
        <View style={styles.clientInfo}>
          <View style={styles.circle}>
            <Text style={styles.circleText}>{this.props.classifica}</Text>
          </View>
          <Text style={styles.phone}>{this.props.phone}</Text>
        </View>
        <View style={styles.clientAnalytics}>
          <View
            style={[styles.clientAnalyticsItem, { backgroundColor: "#FF0400" }]}
          >
            <Text style={styles.clientAnalyticsItemText}>
              {this.props.tessere}
            </Text>
          </View>
          <View
            style={[styles.clientAnalyticsItem, { backgroundColor: "#10E5E8" }]}
          >
            <Text style={styles.clientAnalyticsItemText}>
              {this.props.completate}
            </Text>
          </View>
          <View
            style={[styles.clientAnalyticsItem, { backgroundColor: "#72E81F" }]}
          >
            <Text style={styles.clientAnalyticsItemText}>
              {this.props.bollini}
            </Text>
          </View>
        </View>
      </View>
    );
  }
  getStyles() {
    let circleColor = "#9E0D05";

    switch (this.props.classifica) {
      case 1:
        circleColor = "#72E81F";
        break;
      case 2:
        circleColor = "#FFC445";
        break;
      case 3:
        circleColor = "#FF0400";
        break;
    }

    return {
      client: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#fff",
        padding: 10,
        marginBottom: 3,
        borderRadius: 10,
        elevation: 3,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 0
        },
        shadowOpacity: 0.2,
        shadowRadius: 6
      },
      clientInfo: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      },
      circle: {
        width: 40,
        height: 40,
        borderRadius: 20,
        backgroundColor: circleColor,
        justifyContent: "center",
        alignItems: "center"
      },
      circleText: {
        fontFamily: vars.font.bold,
        fontSize: 25,
        color: "#fff"
      },
      phone: {
        fontFamily: vars.font.regular,
        fontSize: 25,
        marginLeft: 5
      },
      clientAnalytics: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
      },
      clientAnalyticsItem: {
        marginLeft: 5,
        borderRadius: 10,
        height: 40,
        width: 60,
        justifyContent: "center",
        alignItems: "center"
      },
      clientAnalyticsItemText: {
        fontFamily: vars.font.bold,
        fontSize: 20,
        color: "#fff"
      }
    };
  }
}

export default ClientItem;
