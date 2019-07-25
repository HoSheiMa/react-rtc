import React, { Component } from 'react'

import $ from 'jquery';

import store from '../redux/store';

export default class ChatSenderInput extends Component {

  typing  = (state) => {


    store.getState().peer.send(`Order->WriteState->[${state}]`);

  }

    sender = (event) => {

        var keypressed = event.key;
        var value = event.target.value;
        
        event.persist();
        
        
        if (keypressed === "Enter") {
          store.getState().peer.send('Order->WriteState->[false]')
          if (value.length == 0) return;
          store.dispatch({
            type : 'AddNewStateMessage',
            Message : value,
            
          });

          store.getState().peer.send(value)
          store.getState().NewComponent();
          event.target.value = '';

        } else {

          this.typing(true); // for on focus and not typing a new message
        }


        
    }
  render() {
    return (
      <div className="w-100 h-100">
    
      <input className="input-sender" disabled  onFocus={() => this.typing(true)} onBlur={() => this.typing(false)} onKeyPress={this.sender} />
        
      </div>
    )
  }
}
