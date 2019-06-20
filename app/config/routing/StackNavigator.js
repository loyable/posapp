import React from "react";

import { createStackNavigator } from "react-navigation";

import DashboardScreen from "../../screens/DashboardScreen";
import QRCodeScreen from "../../screens/QRCodeScreen";

import Header from "../../components/ui/Header";

export default createStackNavigator(
  {
    Dashboard: {
      screen: DashboardScreen,
      navigationOptions: ({ navigation }) => {
        return {
          header: <Header navigation={navigation} showBottomShadow={true} />
        };
      }
    },
    QRCode: {
      screen: QRCodeScreen,
      navigationOptions: ({ navigation }) => {
        return {
          header: <Header backArrow={true} navigation={navigation} />
        };
      }
    }
  },
  {
    headerTransitionPreset: "uikit",
    headerLayoutPreset: "center",
    headerMode: "screen",
    defaultNavigationOptions: ({ navigation }) => {
      return {
        header: <Header navigation={navigation} showBottomShadow={true} />
      };
    }
  }
);
