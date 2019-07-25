import React, { Component } from 'react';

import store from '../redux/store';


export default class LiveSection extends Component {
  state = {
    videoState: true,
    audioState: true,
  }

  

    reloadState = () => {
        this.setState({})
    }

    muteonoff = () => {
      this.setState({
        otherLiveMute: !this.state.otherLiveMute,
      })
    } 

    componentDidMount = () => {
      
      store.dispatch({
        type : 'state',
        tag : 'livevadeo',
        tagValue : this.reloadState,
        
      })

      store.dispatch({
        type : 'state',
        tag : 'muteonoff',
        tagValue : this.muteonoff,
        
      })
    };
    
    audioSwitch = () => {

      if (this.state.audioState === true) {
        store.getState().peer.send('audio->state->[off]')
      } else {
      store.getState().peer.send('audio->state->[on]')

      }
      this.setState({
        audioState :  this.state.audioState === true ? false : true,
      })

    }
    
    videoSwitch = () => {
      if (this.state.videoState === true) {

        store.getState().peer.send('video->state->[off]')
        document.querySelector('#liveVideo-you').pause();

      } else {
      document.querySelector('#liveVideo-you').load();
      store.getState().peer.send('video->state->[on]')

      }
      this.setState({
        videoState :  this.state.videoState === true ? false : true,
      })

    }
  render() {
    return (
      <div className="liveSection">
     <div className="V">

       
     <video autoPlay  muted={ this.state.otherLiveMute}  id='liveVideo'></video>
     
     
     </div>
     <div className="V">


     <video  autoPlay  muted={true} id='liveVideo-you'></video>
      </div>

      <div className="tools">

      <button onClick={this.videoSwitch}>{this.state.videoState === true  ? <i class="material-icons ">videocam</i> : <i class="material-icons ">videocam_off</i> }</button>
       
      <button onClick={this.audioSwitch}>{this.state.audioState === true  ? <i class="material-icons ">volume_up</i> : <i class="material-icons ">volume_off</i> }</button>
      

      </div>

     </div>
    )
  }
}
