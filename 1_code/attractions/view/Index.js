import React, {Component} from 'react';
import SuggestionsController from '../SuggestionsController';
export default class App extends React.Component {
    constructor(props){
        super(props);
    }

  render() {
    return (
      <SuggestionsController/>
    )
  }
}