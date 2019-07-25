import React, { Component } from 'react';

import store from '../redux/store';

export default class Writingstate extends Component {
  reloadApp = () => {
    this.setState({});
  }
    componentWillMount = () => {
      store.dispatch({
        type : 'state', 
        tag  : 'writing',
        tagValue : false,
    })
    store.dispatch({
      type : 'state', 
      tag  : 'writingComponent',
      tagValue : this.reloadApp,
  })
    };
    
  render() {
    return (
      <div className={store.getState().AppState.writing === true ?  'writingAnimationIn' : 'writingAnimationOut'}>

      <label  style={{fontSize : 18, color : '#00C851'}}>Writing..</label>
        
      </div>
    )
  }
}
