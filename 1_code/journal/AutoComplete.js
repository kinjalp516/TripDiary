import React, { Component } from "react";
import {StyleSheet, Text, TouchableHighlight, TouchableOpacity, View, Dimensions} from "react-native";
import Autocomplete from "react-native-autocomplete-input";

// edited by: Kinjal Patel
// debugged by: Kinjal Patel

export default class AutoTags extends Component {
  state = {
    query: ""
  };

  renderTags = () => {
    if (this.props.renderTags) {
      return this.props.renderTags(this.props.tagsSelected);
    }

    const tagMargins = this.props.tagsOrientedBelow
      ? { marginBottom: 5 }
      : { marginTop: 5 };

    return (
      <View style={this.props.tagStyles || styles.tags}>
        {this.props.tagsSelected.map((t, i) => {
          return (
            <TouchableHighlight
              key={i}
              style={[tagMargins, styles.tag]}
              onPress={() => this.props.handleDelete(i)}
            >
              <Text style={styles.size}>{t.name}</Text>
            </TouchableHighlight>
          );
        })}
      </View>
    );
  };

  handleInput = text => {
    if (this.submitting) return;
    if (this.props.allowBackspace) {
      //TODO: on ios, delete last tag on backspace event && empty query
      //(impossible on android atm, no listeners for empty backspace)
    }
    if (this.props.onChangeText) return this.props.onChangeText(text);
    if (
      this.props.createTagOnSpace &&
      this.props.onCustomTagCreated &&
      text.length > 1 &&
      text.charAt(text.length - 1) === " "
    ) {
      this.setState({ query: "" });
      return this.props.onCustomTagCreated(text.trim());
    } else if (this.props.createTagOnSpace && !this.props.onCustomTagCreated) {
      console.error(
        "When enabling createTagOnSpace, you must provide an onCustomTagCreated function"
      );
    }

    if (text.charAt(text.length - 1) === "\n") {
      return; // prevent onSubmit bugs
    }

    this.setState({ query: text });
  };

  filterData = query => {
    if (!query || query.trim() == "" || !this.props.suggestions) {
      return;
    }
    if (this.props.filterData) {
      return this.props.filterData(query);
    }
    let suggestions = this.props.suggestions;
    let results = [];
    query = query.toUpperCase();
    suggestions.forEach(i => {
      if (i.name.toUpperCase().includes(query)) {
        results.push(i);
      }
    });
    return results;
  };

  onSubmitEditing = () => {
    const { query } = this.state;
    if (!this.props.onCustomTagCreated || query.trim() === "") return;
    this.setState({ query: "" }, () => this.props.onCustomTagCreated(query));

    // prevents an issue where handleInput() will overwrite
    // the query clear in some circumstances
    this.submitting = true;
    setTimeout(() => {
      this.submitting = false;
    }, 30);
  };

  addTag = tag => {
    this.props.handleAddition(tag);
    this.setState({ query: "" });
  };

  render() {
    const { query } = this.state;
    const data = this.filterData(query);

    return (
      <View style={styles.AutoTags}>
        {!this.props.tagsOrientedBelow &&
          this.props.tagsSelected &&
          this.renderTags()}
        <Autocomplete
          data={data}
          controlled={true}
          placeholder={this.props.placeholder}
          defaultValue={query}
          value={query}
          onChangeText={text => this.handleInput(text)}
          onSubmitEditing={this.onSubmitEditing}
          multiline={true}
          autoFocus={this.props.autoFocus === false ? false : true}
          renderItem={({ item, i }) => (
            <TouchableOpacity style={styles.dropdown} onPress={e => this.addTag(item)}>
              {this.props.renderSuggestion ? (
                this.props.renderSuggestion(item)
              ) : (
                <Text style={styles.size}>{item.name}</Text>
              )}
            </TouchableOpacity>
          )}
          inputContainerStyle={
            this.props.inputContainerStyle || styles.inputContainerStyle
          }
          containerStyle={this.props.containerStyle || styles.containerStyle}
          underlineColorAndroid="transparent"
          style={{ backgroundColor: "transparent" }}
          listContainerStyle={{
            backgroundColor: this.props.tagsOrientedBelow
              ? "pink"
              : "transparent"
          }}
          {...this.props}
        />
        {this.props.tagsOrientedBelow &&
          this.props.tagsSelected &&
          this.renderTags()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  AutoTags: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
  },
  dropdown: {
    padding:15,
  },
  size: {
    fontSize: 15
  },
  tags: {
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "flex-start",
    width: Dimensions.get('window').width,
  },
  tag: {
    backgroundColor: "#d0d2f5",
    justifyContent: "center",
    alignItems: "center",
    height: 40,
    marginLeft: 7,
    borderRadius: 30,
    paddingLeft: 15,
    paddingRight: 15
  },
  inputContainerStyle: {
    borderRadius: 0,
    paddingLeft: 5,
    height: 50,
    width: Dimensions.get('window').width,
    justifyContent: "center",
    borderColor: "transparent",
    alignItems: "stretch",
  },
  containerStyle: {
    minWidth: 200,
    maxWidth: 600,
  }
});