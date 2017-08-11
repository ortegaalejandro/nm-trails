
var sortByDistance = function(keys, entities, userPosition) {
  keys.sort(function(a, b) {
    var entityA = entities[a];
    var entityB = entities[b];
    var locCurrent = new LatLon(userPosition.coords.latitude, userPosition.coords.longitude);
    var locA = new LatLon(entityA.coords.latitude, entityA.coords.longitude);
    var locB = new LatLon(entityB.coords.latitude, entityB.coords.longitude);
    var distA = locA.distanceTo(locCurrent);
    var distB = locB.distanceTo(locCurrent);
    return distA - distB;
  });
};


// Wrapper around fetching of the JSON data to avoid fetching twice in a session
var TrailData = {
  _trails: null,
  _communities: null,

  getTrails: function() {
    if (this._trails == null) {
      return $.getJSON('/static/data/trails.json').then(function(trails) {
        this._trails = trails;
        return trails;
      }.bind(this))
    } else {
      return $.Deferred().resolve(this._trails).promise();
    }
  },

  getTrail: function(id) {
    return this.getTrails().then(function(trails) {
      return trails[id];
    });
  },

  getCommunities: function() {
    if (this._communities == null) {
      return $.getJSON('/static/data/communities.json').then(function(communities) {
        this._communities = communities;
        return communities;
      }.bind(this))
    } else {
      return $.Deferred().resolve(this._communities).promise();
    }
  },

  getCommunity: function(id) {
    return this.getCommunities().then(function(communities) {
      return communities[id];
    });
  },
};


// Define a new component called <trail-listing>
var trailList = Vue.component('trail-list', {
  // Use the template defined with the id="trail-list-tpl"
  template: '#trail-list-tpl',

  data: function() {
    return {
      trails: null,
      sortKeys: null,
    }
  },

  // This gets executed when this view-model is created
  created: function() {
    // Load the data from our static JSON files
    TrailData.getTrails().then(function(trails) {
      this.trails = trails;
      this.sortKeys = Object.keys(this.trails);
    }.bind(this)).then(function() {
      if ("geolocation" in navigator) {
        /* geolocation is available */
        navigator.geolocation.getCurrentPosition(this.sortTrails);
      } else {
        /* geolocation IS NOT available */
      }
    }.bind(this));
  },

  methods: {
    sortTrails: function(position) {
      sortByDistance(this.sortKeys, this.trails, position);
    },
  }
})

Vue.component('trail-listing', {
  props: ['trail', 'trailId'],

  // Use the template defined with the id="trail-listing-tpl"
  template: '#trail-listing-tpl',
})

Vue.component('dog-icon', {
  props: ['allowed'],

  // Use the template defined with the id="trail-listing-tpl"
  template: '#dog-icon-tpl',
})

var trailDetails = Vue.component('trail-details', {
  // id gets passed in as a prop from the router
  props: ['id'],

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
    this.fetchData();
  },

  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },

  methods: {
    fetchData: function() {
      this.loading = true;
      // Load the data from our static JSON files
      TrailData.getTrail(this.id).then(function(trail) {
        this.trail = trail;
        this.loading = false;
      }.bind(this));
    },
  },
})



// Duplicate Trails functionality for communities
// Define a new component called <community-listing>
var communityList = Vue.component('community-list', {
  // Use the template defined with the id="community-list-tpl"
  template: '#community-list-tpl',

  data: function() {
    return {
      communities: null,
      sortKeys: null,
    }
  },

  // This gets executed when this view-model is created
  created: function() {
    // Load the data from our static JSON files
    TrailData.getCommunities().then(function(data) {
      this.communities = data;
      this.sortKeys = Object.keys(this.communities);
    }.bind(this)).then(function() {
      if ("geolocation" in navigator) {
        /* geolocation is available */
        navigator.geolocation.getCurrentPosition(this.sortCommunities);
      } else {
        /* geolocation IS NOT available */
      }
    }.bind(this));
  },

  methods: {
    sortCommunities: function(position) {
      sortByDistance(this.sortKeys, this.communities, position);
    }
  }
})

Vue.component('community-listing', {
  // Takes one object named "community" as a property
  props: ['community', 'communityId'],

  // Use the template defined with the id="community-list-tpl"
  template: '#community-listing-tpl',
})

var communityDetails = Vue.component('community-details', {
  // id gets passed in as a prop from the router
  props: ['id'],

  // Use the template defined with the id="community-details-tpl"
  template: '#community-details-tpl',

  data: function() {
    return {
      community: null,
      loading: false,
    }
  },

  watch: {
    // call again the method if the route changes
    '$route': 'fetchData'
  },

  created: function() {
    this.fetchData();
  },

  // This gets executed when this view-model is created
  methods: {
    fetchData: function() {
      this.loading = true;
      // Load the data from our static JSON files
      TrailData.getCommunity(this.id).then(function(data) {
        this.community = data;
        this.loading = false;
      }.bind(this));
    },
  },
})
//Communities json


// Define the routes
var router = new VueRouter({
  routes: [
    { path: '/trails', component: trailList, meta: {title: "Trails"}},
    { path: '/trails/:id', component: trailDetails, props: true, meta: {title: "Trail Details"}},
    { path: '/communities', component: communityList, meta: {title: "Communities"}},
    { path: '/communities/:id', component: communityDetails, props:true, meta: {title: "Community Details"}},
    { path: '/', redirect: '/trails' },
  ]
})

// Update the title on each navigation event based on the meta.title fields defined above.
router.afterEach(function(to, from) {
  bus.$emit('new-title', to.meta.title);
});

// An empty Vue instance to serve as a central event bus
// https://vuejs.org/v2/guide/components.html#Non-Parent-Child-Communication
var bus = new Vue();

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
  // Bind it to the header
  el: '#header',

  data: {
    title: 'Trails Across New Mexico', // this should never be displayed
  },

  // "Inject" the same router
  router: router,

  created: function() {
    bus.$on('new-title', function(title) {
      this.title = title;
    }.bind(this));

    // Set initial title
    bus.$emit('new-title', this.$route.meta.title);
  },
})

new Vue({
  el: '#tab-bar',
  router: router,
})
