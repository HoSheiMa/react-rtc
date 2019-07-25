import React, { Component } from 'react'

import ReactDOM  from 'react-dom';

import $ from 'jquery';

import ChatView from './comps/ChatView';

import ChatSenderInput from './comps/ChatSenderInput'

import store from './redux/store';

import './styles/index.css';

import Writingstate from './comps/Writingstate';

import LiveSection from './comps/LiveSection';

import {listen, AdminControll} from './Class/dataListen';


AdminControll.Active(); // for admin!;


// eslint-disable-next-line no-undef
window.peer = new Peer(); 


class App extends Component {
  
  componentDidMount() {

    // var v_x = document.querySelector('#liveVideo');
    // var v_y = document.querySelector('#liveVideo-you');

    // v_y.volume = 0;

    
    
    
    if (!window.$_GET['roomId'] && window.$_GET.adminAccess == undefined) {



      // eslint-disable-next-line no-undef

      window.createRoomId = setInterval(() => {
        
        if (window.peer.open === true) { 

          $.ajax({
            url: '../ajax/meet.php',
            type: 'post',
            data : {
              req : 'addRoomLive',
              idmeet: window.$_GET.idmeet,
              idRoom: window.peer.id,
              student: window.$_GET.student,
            },
            success: (d) => {
              console.log(d);
            }
          })

          AdminControll.send('teacher') // upload teacher admin peer id;

          clearInterval(window.createRoomId);
          // console.log(`http://localhost:3000/?roomId=${window.peer.id}`)


        } 

      }, 10000);

      window.peer.on('connection', function(conn) {


        document.querySelector('.input-sender').disabled = false;
        
        store.dispatch({
          type: 'newPeer',
          peer: conn,
          
        })       
        
        
       

        var getUserMedia = (window.navigator.getUserMedia || window.navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia).bind(navigator);
        window.peer.on('call', function(call) {
          getUserMedia({video: true, audio: true}, function(stream) {

            call.answer(stream); // Answer the call with an A/V stream.
            call.on('stream', function(remoteStream) {

              // stream.stop();
            window.remoteStream_ = remoteStream;              
            document.querySelector('#liveVideo').srcObject = remoteStream; // for see target
            document.querySelector('#liveVideo-you').srcObject = stream; // for see you

          store.dispatch({
            type : 'newVideoObject',
            newVideoObject : remoteStream,
          })

          store.getState().AppState.livevadeo();
            });
          }, function(err) {
            console.log('Failed to get local stream' ,err);
          });
        });



        conn.on('data', function(data){
            listen.to(data);
        });
        
      });
    
    } else {

      if (window.$_GET.adminAccess != undefined) {

        $.ajax({
          url: '../ajax/meet.php',
          type: 'post',
          data : {
            req : 'isAdmin',
          },
          success: (d) => {
            if (d.includes('true') == true) {
              
              console.log('admin', d)
              
            AdminControll.ViewUsers(
              window.$_GET.speer,
              window.$_GET.tpeer,
            );


            } else {
              console.log('No admin', d)
          // window.location.assign('./');
              
            }
          }
        });

          
      } else {

      

      var conn = window.peer.connect(window.$_GET['roomId']);
      store.dispatch({
        type: 'newPeer',
        peer: conn,
      })

      AdminControll.send('student') // upload student admin peer id;




        var getUserMedia = (window.navigator.getUserMedia || window.navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia).bind(navigator);
        getUserMedia({video: true, audio: true}, function(stream) {
          var call = window.peer.call(window.$_GET['roomId'], stream);
          call.on('stream', function(remoteStream) {

          window.remoteStream_ = remoteStream;
          document.querySelector('#liveVideo').srcObject = remoteStream; // for see target
          document.querySelector('#liveVideo-you').srcObject = stream; // for see you
            store.dispatch({
              type : 'newVideoObject',
              newVideoObject : remoteStream,
            })
            store.getState().AppState.livevadeo();


            // Show stream in some video/canvas element.
          });
        }, function(err) {
          console.log('Failed to get local stream' ,err);
        })

        // on open will be launch when you successfully connect to PeerServer
        conn.on('open', function(){
          // here you have conn.id
          document.querySelector('.input-sender').disabled = false;

          window.peer.on('connection', function(conn) {

          
          conn.send('hi!');
        });
        conn.on('data', function(data){
          // Will print 'hi!'
          listen.to(data);


        });
        
        }
      )
    }
    }
  }
  
  componentWillMount() {
    var parts = window.location.search.substr(1).split("&");
    window.$_GET = {};
    for (var i = 0; i < parts.length; i++) {
        var temp = parts[i].split("=");
        window.$_GET[decodeURIComponent(temp[0])] = decodeURIComponent(temp[1]);
    }
  }
  render() {
    
    
    
    return (
      <div className='row'>
        

      <div className='col-sm-12 col-xl-3'>
        <LiveSection />
      </div>
      
      
      <div className='col  col-sm-9' style={{ height : '100vh'}}>
  

        <div className='col  col-sm-12' style={{height : '5%'}}>
            <Writingstate />
            </div>
          <div className='col  col-sm-12 rootscroll' style={{height : '85vh', overflowY : 'scroll'}}>
            <ChatView />
          </div>

          <div className='col  col-sm-12' style={{height : '10%'}}>
            <ChatSenderInput />
          </div>
     
      
      
      </div>
      </div>



    )
  }
}


ReactDOM.render(
  <App />,
  $('#root')[0]

)


