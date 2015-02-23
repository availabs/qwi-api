'use strict';

// Controls overall layout of the dashboard,
// adding charts, determining their layout, etc.

var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes   = require('../../constants/AppConstants').ActionTypes,
    BaseStore     = require('./BaseStore');


var UIStore = (function() {
  
  var store = Object.create(BaseStore);

  return store;
})();



UIStore.dispatchToken = AppDispatcher.register(function(payload) {

  switch(payload.type) {

    default:
      // do nothing
      
  }
});


module.exports = UIStore;
