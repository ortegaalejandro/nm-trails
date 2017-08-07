// Define a new component called <trail-listing>
Vue.component('trail-list', {
  // Takes an array of trails as a property
  props: ['trails'],

  // Use the template defined with the id="trail-list-tpl"
  template: '#trail-list-tpl',
})

Vue.component('trail-listing', {
  // Takes one object named "trail" as a property
  props: ['trail'],

  // Use the template defined with the id="trail-listing-tpl"
  template: '#trail-listing-tpl',
})

Vue.component('trail-details', {
  // Takes one object named "trail" as a property
  props: ['trail'],

  // Use the template defined with the id="trail-details-tpl"
  template: '#trail-details-tpl',
})


// vm stands for "view-model"
vm = new Vue({
  // Bind this view-model to the element with id="app"
  el: '#app',

  // Declare what data is in this view-model
  data: {
    trails: null,
    currentView: 'trail-list',
  },

  // This gets executed when this view-model is created
  created: function() {
    // Load the data from our static JSON files
    var self = this;
    $.getJSON('/static/data/trails.json', function (data) {
      self.trails = data;
      console.log(data);
    });
  },
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
