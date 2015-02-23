var EventEmitter = require('events').EventEmitter,
    CHANGE_EVENT = require('../../constants/AppConstants').CHANGE_EVENT,
    assign       = require('object-assign');


var BaseStore = assign({}, EventEmitter.prototype, {

  emitChange: function() {
    this.emit(CHANGE_EVENT);
  },

  addChangeListener: function(callback) {
    this.on(CHANGE_EVENT, callback);
  },

  removeChangeListener: function(callback) {
    this.removeListener(CHANGE_EVENT, callback);
  },

  getMenu: function() {
    console.log('appstore.getmenu',_menus[_appSection])
    return _menus[_appSection];
  }

});


module.exports = BaseStore;
