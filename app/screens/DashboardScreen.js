import React, { Component } from "react";
import vars from "../config/styles";

import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Share,
  Dimensions,
  RefreshControl,
  ActivityIndicator
} from "react-native";

import { connect } from "react-redux";

//SVG Library
import SVG from "react-native-remote-svg";

const { width, height } = Dimensions.get("window");

import AnalyticsItem from "../components/ui/Dashboard/AnalyticsItem";

import ClientItem from "../components/ui/Dashboard/ClientItem";

import { SET_MERCHANT_ID, REQUEST_MERCHANT } from "../store/actions";

//map redux state to properties
const mapStateToProps = state => {
  return {
    ...state
  };
};

const mapDispatchToProps = dispatch => {
  return {
    SET_MERCHANT_ID: merchantID => {
      dispatch(SET_MERCHANT_ID(merchantID));
    },
    REQUEST_MERCHANT: callback => {
      dispatch(REQUEST_MERCHANT(callback));
    }
  };
};

class DashboardScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      refreshing: false,
      isLoading: true
    };

    this.props.SET_MERCHANT_ID({
      id: "e61665bf-9d4b-478f-b82c-5db61efd84c1"
    });

    this.props.REQUEST_MERCHANT(() => {
      this.setState({ isLoading: false });
    });
  }

  onRefresh() {
    this.setState({ refreshing: true });
    this.props.REQUEST_MERCHANT(() => {
      this.setState({ refreshing: false });
    });
  }

  render() {
    const { merchant } = this.props.user;

    if (!this.state.isLoading) {
      var { tessere, completate, clienti, bollini } = merchant.stats;
    }

    return (
      <SafeAreaView style={{ flex: 1 }}>
        {!this.state.isLoading ? (
          <ScrollView
            contentContainerStyle={styles.container}
            refreshControl={
              <RefreshControl
                refreshing={this.state.refreshing}
                onRefresh={() => this.onRefresh()}
              />
            }
          >
            <Text style={styles.title}>Dashboard</Text>
            <View style={styles.analyticsContainer}>
              <AnalyticsItem
                color="#ff0400"
                number={tessere}
                description="Tessere"
              />
              <AnalyticsItem
                color="#10e5e8"
                number={completate}
                description="Completate"
              />
              <AnalyticsItem
                color="#ffc445"
                number={clienti}
                description="Clienti"
              />
              <AnalyticsItem
                color="#72e81f"
                number={bollini}
                description="Bollini"
              />
            </View>
            <Text style={styles.title}>Classifica Clienti</Text>
            <View style={styles.clientsContainer}>
              <ClientItem
                phone="+393391848457"
                classifica={1}
                tessere={2}
                completate={16}
                bollini={180}
              />
              <ClientItem
                phone="+393386318048"
                classifica={2}
                tessere={3}
                completate={12}
                bollini={110}
              />
              <ClientItem
                phone="+393357898922"
                classifica={3}
                tessere={3}
                completate={12}
                bollini={110}
              />
              <ClientItem
                phone="+393391848457"
                classifica={4}
                tessere={3}
                completate={12}
                bollini={110}
              />
              <ClientItem
                phone="+393391848457"
                classifica={5}
                tessere={3}
                completate={12}
                bollini={110}
              />
            </View>
          </ScrollView>
        ) : (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color="#000" />
          </View>
        )}
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: vars.color.background,
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
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  },
  clientsContainer: {}
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DashboardScreen);
