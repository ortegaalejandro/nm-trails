// Define a new component called <trail-listing>
var trailList = Vue.component('trail-list', {
  // Takes an array of trails as a property
  // props: ['trails'],

  // Use the template defined with the id="trail-list-tpl"
  template: '#trail-list-tpl',

  data: function() {
    return {
      trails: null,
    }
  },

  // This gets executed when this view-model is created
  created: function() {
    // Load the data from our static JSON files
    $.getJSON('/static/data/trails.json', function (data) {
      this.trails = data;
      console.log(data);
    }.bind(this));
  },
})

Vue.component('trail-listing', {
  // Takes one object named "trail" as a property
  props: ['trail', 'trailId'],

  // Use the template defined with the id="trail-listing-tpl"
  template: '#trail-listing-tpl',
})

var trailDetails = Vue.component('trail-details', {
  // Takes one object named "trail" as a property
  props: ['id'],//['trail'],

  // Use the template defined with the id="trail-details-tpl"
  template: '#trail-details-tpl',

  data: function() {
    return {
      trail: null,
      loading: false,
    }
  },

  // This gets executed when this view-model is created
  created: function() {
    this.loading = true;
    // Load the data from our static JSON files
    $.getJSON('/static/data/trails.json', function (data) {
      this.trail = data[this.id];
      this.loading = false;
    }.bind(this));
  },
})


// Define the routes
var router = new VueRouter({
  routes: [
    { path: '/trails', component: trailList},
    { path: '/trails/:id', component: trailDetails, props: true},
    { path: '/', redirect: '/trails' }
  ]
})


// vm stands for "view-model"
vm = new Vue({
  // Bind this view-model to the element with id="app"
  el: '#app',

  // "Inject" the router we defined above into the application
  router: router,
})

// Create another view-model for the header, since the header
// has to be the first thing in the body and cannot be wrapped
// in the same div as the app content div
new Vue({
  el: '#header',
  router: router,
})

