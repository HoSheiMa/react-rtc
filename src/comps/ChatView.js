import React, { Component } from 'react'
import $ from 'jquery'
import store from '../redux/store';





export default class ChatView extends Component {
    
    NewComponentstate = () => {
        this.setState({});
    }

    componentDidMount() {
        console.log('Hello world!');
        
        store.dispatch({
            type: 'newComponent',
            newComponent : this.NewComponentstate
        })
        
    }
    
    autoscroll = false;

    componentWillUpdate () {
        var rootscroll = document.querySelector('.rootscroll');
        var fixedScrollHeight = rootscroll.scrollHeight - rootscroll.clientHeight
        var scrollTop = rootscroll.scrollTop;

        
        if (scrollTop === fixedScrollHeight) {
            // console.log('true');
            this.autoscroll = true;
        } else {
            // console.log('false');
            this.autoscroll = false;
            
        }
    }
    componentDidUpdate () {
        var rootscroll = document.querySelector('.rootscroll');

        if (this.autoscroll === true) {

            rootscroll.scrollTop = rootscroll.scrollHeight;
        }
        
    }
  
    render() {
      
    return (
      <div>    
      {
        store.getState().ChatViewState.map((item) => {
            var msg = item;


            return (
                <div key={Math.random() * 10000000}>
                <p className="text-view">
                    {(typeof msg === "object") ?  
                    <span className='text-primary'>Unkown </span> :
                     <span className='text-warning'>Unkown </span> }
                    {(typeof msg === "object") ? msg[0] : msg}
                </p>
                
            </div>
            ) 
        })
      }
      </div>
    )
  }
}
