Vue.component('trail-listing', {
  props: ['trail'],
  template: '#trail-listing-tpl',
})

var app = new Vue({
  el: '#app',
  data: {
    trails: [
      { id: 0, name: 'Library Loop Trail', distance: '0.5 mile', difficulty: 'Easy' },
      { id: 1, name: 'South U.S. 550 Sidewalks', distance: '0.6 mile', difficulty: 'Easy' },
      { id: 2, name: 'Village Office to Saveway Market Loop', distance: '0.8 mile', difficulty: 'Easy' },
    ]
  }
})

