import React, { Component } from "react";
import {
  Text,
  ScrollView,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from "react-native";

import { connect } from "react-redux";

import CardItem from "../components/ui/Card/CardItem";

//global vars
import vars from "../config/styles";

import CardHistoryItem from "./Cards/CardHistoryItem";
import CardCircle from "./Cards/CardCircle";

import { SET_ACTIVE_CARD } from "../store/actions";

//map redux state to properties
const mapStateToProps = state => {
  return {
    ...state
  };
};

//map redux dispatch function to properties
const mapDispatchToProps = dispatch => {
  return {
    SET_ACTIVE_CARD: card => {
      dispatch(SET_ACTIVE_CARD(card));
    }
  };
};

class ClientCardDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: this.props.user.activeCard,
      markedInitial: this.props.user.activeCard.marked
        ? this.props.user.activeCard.marked
        : 0
    };
  }

  editCard(type) {
    const { activeCard } = this.state;

    let total = activeCard.card.settings.marks.total;
    let marked = activeCard.marked;

    switch (type) {
      case "add":
        marked++;
        break;
      case "remove":
        marked--;
        break;
      case "completed":
        marked = total;
        break;
    }

    if (marked >= 0 && marked <= total) {
      activeCard.marked = marked;
      this.props.SET_ACTIVE_CARD(activeCard);
    }
  }

  save() {}

  render() {
    const item = this.state.activeCard;

    const card = item.card;

    const total = card.settings.marks.total;
    const marked = item.marked ? item.marked : 0;
    const remaining = total - marked;
    return (
      <ScrollView style={styles.container}>
        <View style={styles.horizontal}>
          <Text style={styles.title}>Dettaglio tessera</Text>
          {item.marked === this.state.markedInitial || (
            <TouchableOpacity
              onPress={() => this.save()}
              activeOpacity={0.8}
              style={[styles.button, { backgroundColor: "#68CE00" }]}
            >
              <Text style={styles.buttonText}>Salva</Text>
            </TouchableOpacity>
          )}
        </View>
        <View style={styles.cardContainer}>
          <CardItem
            settings={item}
            navigation={this.props.navigation}
            navigateTo="none"
            cardFullWidth={false}
          />
        </View>
        <View style={styles.cardInfoContainer}>
          <View style={styles.cardDetailsContainer}>
            {card.settings.hasOwnProperty("name") && (
              <Text style={styles.title}>{card.settings.name}</Text>
            )}
            <View style={styles.cardActionsContainer}>
              <TouchableOpacity
                onPress={() => this.editCard("add")}
                activeOpacity={0.8}
                style={[
                  styles.cardActionButton,
                  { backgroundColor: "#72E81F" }
                ]}
              >
                <Text style={styles.cardActionButtonText}>
                  Aggiungi Bollino
                </Text>
              </TouchableOpacity>
              <TouchableOpacity
                onPress={() => this.editCard("remove")}
                activeOpacity={0.8}
                style={[
                  styles.cardActionButton,
                  { backgroundColor: "#FF0D05" }
                ]}
              >
                <Text style={styles.cardActionButtonText}>Rimuovi Bollino</Text>
              </TouchableOpacity>
            </View>
            {item.marked === total && (
              <View style={styles.cardActionsContainer}>
                <TouchableOpacity
                  onPress={() => this.editCard("completed")}
                  activeOpacity={0.8}
                  style={[
                    styles.cardActionButton,
                    { backgroundColor: "#10E5E8" }
                  ]}
                >
                  <Text style={styles.cardActionButtonText}>
                    Riscatta Omaggio
                  </Text>
                </TouchableOpacity>
              </View>
            )}
            <View style={styles.cardAnalyticsContainer}>
              <View style={styles.cardAnalyticsItem}>
                <CardCircle
                  number={marked}
                  color="#fff"
                  backgroundColor="#72E81F"
                />
                <Text style={styles.cardAnalyticsItemText}>
                  {marked !== 1 ? "bollini" : "bollino"}
                </Text>
              </View>
              <View style={styles.cardAnalyticsItem}>
                <CardCircle
                  number={remaining}
                  color="#fff"
                  backgroundColor="#FF0D05"
                />
                <Text style={styles.cardAnalyticsItemText}>
                  {remaining !== 1 ? "mancanti" : "mancante"}
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.cardDetailsContainer}>
            {/* Cronologia */}
            <Text style={styles.title}>Cronologia</Text>
            <View style={styles.cardHistoryContainer}>
              {this.getHistory(item.history)}
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  getHistory(history) {
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
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F4F4"
  },
  horizontal: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingTop: 10,
    paddingHorizontal: 10
  },
  button: {
    backgroundColor: vars.color.secondary,
    borderRadius: 5,
    paddingHorizontal: 10
  },
  buttonText: {
    fontFamily: vars.font.regular,
    fontSize: 20,
    color: "#fff",
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  cardContainer: {
    paddingVertical: 12,
    alignItems: "center"
  },
  cardInfoContainer: {
    backgroundColor: "#fff",
    borderRadius: 10,
    shadowColor: vars.cardDetails.style.shadow.color,
    shadowOffset: vars.cardDetails.style.shadow.offset,
    shadowOpacity: vars.cardDetails.style.shadow.opacity,
    shadowRadius: vars.cardDetails.style.shadow.radius,
    elevation: 1
  },
  cardDetailsContainer: {
    padding: 12
  },
  title: {
    fontSize: 25,
    fontFamily: vars.font.bold,
    color: vars.color.title
  },
  description: {
    fontSize: 16,
    fontFamily: vars.font.regular,
    color: vars.color.subtitle,
    marginTop: 5
  },
  descriptionTitle: {
    fontSize: 20,
    fontFamily: vars.font.bold,
    color: vars.color.title,
    marginTop: 10
  },
  map: {
    height: 150
  },
  cardAnalyticsContainer: {
    paddingVertical: 12,
    flexDirection: "row",
    justifyContent: "center"
  },
  cardAnalyticsItem: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  cardAnalyticsItemText: {
    fontSize: 20,
    fontFamily: vars.font.regular,
    padding: 8
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
  cardHistoryItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 5
  },
  cardHistoryIcon: {},
  cardHistoryTextContainer: {
    marginLeft: 12
  },
  cardHistoryText: {
    fontFamily: vars.font.regular,
    fontSize: 18,
    color: "#3c3c3c"
  },
  cardHistoryDateContainer: {
    flex: 1
  },
  cardHistoryDate: {
    fontFamily: vars.font.regular,
    fontSize: 14,
    color: "#7B7B7B",
    textAlign: "right"
  },
  cardActionsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10
  },
  cardActionButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 5
  },
  cardActionButtonText: {
    fontFamily: vars.font.regular,
    fontSize: 20,
    color: "#fff"
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ClientCardDetails);
