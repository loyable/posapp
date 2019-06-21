import React, { Component } from "react";
import vars from "../config/styles";

import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Share,
  Dimensions,
  FlatList
} from "react-native";

import { connect } from "react-redux";

//SVG Library
import SVG from "react-native-remote-svg";

import Card from "../components/ui/Card";

import Utils from "../config/utils";

import CardAnalyticsItem from "./Cards/CardAnalyticsItem";
import CardHistoryItem from "./Cards/CardHistoryItem";

const { width, height } = Dimensions.get("window");

//map redux state to properties
const mapStateToProps = state => {
  return {
    ...state
  };
};

//map redux dispatch to properties
const mapDispatchToProps = dispatch => {
  return {};
};

class ClientDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  getAnalytics(merchant) {
    let added = 0,
      completed = 0,
      marked = 0,
      registered;

    if (merchant.hasOwnProperty("merchant")) {
      merchant.cards.forEach(card => {
        added++;
        marked += card.marked;
        if (card.marked === card.card.settings.marks.total) {
          completed++;
        }
      });
    }
    if (merchant.hasOwnProperty("history")) {
      let history = merchant.history.sort((a, b) => a.time > b.time);
      registered = history[0].time;
    }

    return {
      added,
      completed,
      marked,
      registered
    };
  }

  getHistory(merchant) {
    let history = [];
    if (merchant.hasOwnProperty("history")) {
      history = merchant.history.sort((a, b) => a.time > b.time);
    }

    //Se l'utente NON ha associato l'esercente
    if (history.length === 0) {
      return (
        <View style={styles.noHistoryContainer}>
          <Text style={styles.noHistoryText}>Nessun movimento</Text>
        </View>
      );
    }

    return (
      <FlatList
        data={history}
        keyExtractor={item => item._id}
        renderItem={({ item }) => <CardHistoryItem history={item} />}
      />
    );
  }

  render() {
    const { activeUser } = this.props.user;

    //Copy user by value not by reference
    const userNew = JSON.parse(JSON.stringify(activeUser));

    const { merchants, phone, created } = userNew;
    //Calcolo delle statistiche
    const { added, completed, marked, registered } = this.getAnalytics(
      merchants
    );

    return (
      <SafeAreaView style={styles.container}>
        <ScrollView style={{ flex: 1 }}>
          <View style={styles.horizontal}>
            <Text style={styles.phone}>{phone}</Text>
            {registered && (
              <View style={styles.vertical}>
                <Text style={styles.registrationDateText}>Cliente dal</Text>
                <Text style={styles.registrationDate}>
                  {Utils.parseDateDays(registered)}
                </Text>
              </View>
            )}
          </View>
          <View style={styles.horizontal}>
            <Text style={styles.title}>Tessere abbinate</Text>
            <TouchableOpacity activeOpacity={0.8} style={styles.button}>
              <Text style={styles.buttonText}>Abbina tessera</Text>
            </TouchableOpacity>
          </View>
          <View style={styles.cardContainer}>
            {merchants.hasOwnProperty("merchant") ? (
              <Card
                settings={merchants}
                showInfo={false}
                navigation={this.props.navigation}
                navigateTo="ClientCardDetails"
                cardFullWidth={false}
              />
            ) : (
              <Text style={styles.noCardsText}>Nessuna tessera</Text>
            )}
          </View>
          <View style={styles.cardDetailsContainer}>
            <Text style={styles.title}>Dati storici</Text>
            <View style={styles.cardAnalyticsContainer}>
              <CardAnalyticsItem
                number={added}
                color="#fff"
                backgroundColor="#f00"
                text={["Tessere", "Abbinate"]}
              />
              <CardAnalyticsItem
                number={marked}
                color="#fff"
                backgroundColor="#FFC445"
                text={["Bollini", "Raccolti"]}
              />
              <CardAnalyticsItem
                number={completed}
                color="#fff"
                backgroundColor="#10E5E8"
                text={["Tessere", "Completate"]}
              />
            </View>
            <Text style={styles.title}>Cronologia</Text>

            {/* Cronologia */}
            <View style={styles.cardHistoryContainer}>
              {this.getHistory(merchants)}
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: vars.color.background,
    flex: 1
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    paddingTop: 10,
    paddingHorizontal: 10
  },
  vertical: {
    alignItems: "center"
  },
  phone: {
    fontFamily: vars.font.regular,
    fontSize: 35,
    color: "#696969"
  },
  registrationDateText: {
    fontFamily: vars.font.bold,
    fontSize: 18
  },
  registrationDate: {
    fontFamily: vars.font.regular,
    fontSize: 18,
    color: "#7b7b7b"
  },
  noCardsText: {
    fontFamily: vars.font.regular,
    fontSize: 20,
    textAlign: "center",
    marginHorizontal: 10
  },
  title: {
    fontFamily: vars.font.bold,
    fontSize: 25,
    color: vars.color.title
  },
  button: {
    backgroundColor: vars.color.secondary,
    borderRadius: 5
  },
  buttonText: {
    fontFamily: vars.font.regular,
    fontSize: 20,
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  cardDetailsContainer: {
    padding: 12
  },
  cardAnalyticsContainer: {
    padding: 12,
    flexDirection: "row"
  },
  cardAnalyticsTitle: {
    fontFamily: vars.font.bold,
    fontSize: 20
  },
  cardHistoryTitle: {
    fontFamily: vars.font.bold,
    fontSize: 20
  },
  cardHistoryContainer: {
    padding: 12
  },
  noHistoryContainer: {
    alignItems: "center"
  },
  noHistoryText: {
    fontFamily: vars.font.regular,
    fontSize: 16
  }
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientDetails);
