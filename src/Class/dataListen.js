import store from '../redux/store';
import $ from 'jquery';


var listen = {

    to: function (data) {

        
          
        if (data === "video->state->[off]"){
          
            document.querySelector('#liveVideo').style.display = 'none';
            // document.querySelector('#liveVideo').pause();
            // document.querySelector('#liveVideo').srcObject = null;
                
            return this;
        }

        if (data === "video->state->[on]"){

            document.querySelector('#liveVideo').style.display = 'inline-block';
            // document.querySelector('#liveVideo').srcObject = window.remoteStream_;
            // document.querySelector('#liveVideo').load();
            return this;
        }

        if (data === "Order->WriteState->[true]"){
            store.dispatch({
              type : 'state', 
              tag  : 'writing',
              tagValue : true,
            })
            store.getState().AppState.writingComponent();
            return this;
          }
          if (data === "Order->WriteState->[false]") {
            store.dispatch({
              type : 'state', 
              tag  : 'writing',
              tagValue : false,
          })
          store.getState().AppState.writingComponent();
          return this;
          }

          if (data == "audio->state->[off]") {
            store.getState().AppState.muteonoff();

            return this;

          }

          if (data == "audio->state->[on]") {
            store.getState().AppState.muteonoff();
            return this;
        }

          store.dispatch({
            type : 'AddNewStateMessage',
            Message : [data]
            
          });
          store.getState().NewComponent();



        return this;
    }

}
var AdminControll = {


  ViewUsers: function (speer, tpeer) {


    // eslint-disable-next-line no-undef
    window.speer_ = new Peer();
    // eslint-disable-next-line no-undef
    window.tpeer_ = new Peer();

    window.speer_c = window.speer_.connect(speer)
    
    window.tpeer_c = window.tpeer_.connect(tpeer)

    window.speer_c.on('open', function(){
      // here you have conn.id
      window.speer_c.send('hi! speer_c');
    });

    window.tpeer_c.on('open', function(){
      // here you have conn.id
      window.tpeer_c.send('hi! tpeer_c');
    });


    var getUserMedia = (window.navigator.getUserMedia || window.navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia).bind(navigator);

    getUserMedia({video: true, audio: false}, function(stream) {
      console.log('here 1')
      var call = window.speer_.call(speer, stream);
      call.on('stream', function(remoteStream) {
        console.log('s', remoteStream)
        document.querySelector('#liveVideo').srcObject = remoteStream; // student
        // Show stream in some video/canvas element.
      });
    }, function(err) {
      console.log('Failed to get local stream' ,err);
    });


    getUserMedia({video: true, audio: false}, function(stream) {
      console.log('here 2')
      var call = window.tpeer_.call(tpeer, stream);
      call.on('stream', function(remoteStream) {
        // Show stream in some video/canvas element.
        console.log('t', remoteStream)
        document.querySelector('#liveVideo-you').srcObject = remoteStream; // teacher

      });
    }, function(err) {
      console.log('Failed to get local stream' ,err);
    });


    


  },

  send: function (type) {

    window.adminSendPeerLoop = setInterval( () => {

    
      if (window.adminSendPeer.open == true) {


     $.ajax({
      url: '../ajax/meet.php',
      type: 'post',
      data : {
        req : 'add_peer_ids_to_meet',
        type_: type, // ( student || teacher ).peer.id 
        idmeet: window.$_GET.idmeet,
        peerid: window.adminSendPeer.id,
      },
      success: (d) => {
        console.log(d);
      }
    });

    clearInterval(window.adminSendPeerLoop);

  }

})


  

  },
  Active : function () {

    // eslint-disable-next-line no-undef
    window.adminSendPeer = new Peer(); 

    window.adminSendPeer.on('open', function(){

    window.adminSendPeer.on('connection', function(conn) {
      conn.on('data', function(data){
        console.log(data);
      });

      var getUserMedia = (window.navigator.getUserMedia || window.navigator.webkitGetUserMedia || window.navigator.mozGetUserMedia).bind(navigator);

      conn.on('call',
       function(call) {
        getUserMedia({video: true, audio: true}, function(stream) {
          console.log('Calling you')
          call.answer(stream); // Answer the call with an A/V stream.
          // call.on('stream', function(remoteStream) {
          //   // Show stream in some video/canvas element.
          // });
        }, function(err) {
          console.log('Failed to get local stream' ,err);
        });
      });

    });
  });

  },

  

}



export {
  listen,
  AdminControll,
}
