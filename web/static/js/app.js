vm = new Vue({
  el: '#app',
  data: {
    trails: null,
  },
  created: function() {
    var self = this;
    $.getJSON('/static/data/trails.json', function (data) {
      self.trails = data;
    });
  }
})

Vue.component('trail-listing', {
  props: ['trail'],
  template: '#trail-listing-tpl',
})



// Initialize Firebase
/*  not using firebase for now
var config = {
  apiKey: "AIzaSyCJoxhsDXOZKUnr4WkqQPw9iEI-kmOGhpA",
  authDomain: "trails-across-new-mexico.firebaseapp.com",
  databaseURL: "https://trails-across-new-mexico.firebaseio.com",
  projectId: "trails-across-new-mexico",
  storageBucket: "trails-across-new-mexico.appspot.com",
  messagingSenderId: "1051009422594"
};
firebaseApp = firebase.initializeApp(config);
var db = firebaseApp.database()
*/
