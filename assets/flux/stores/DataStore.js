'use strict';


var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes   = require('../../constants/AppConstants'),
    BaseStore     = require('./BaseStore'),
    ChartStore    = require('./ChartStore'),
    d3            = require('d3');


var _data = {};


function _updateData (chartID, data) {
  _data[chartID] = data;
}


var DataStore = (function() {

  var store = Object.create(BaseStore);

  store.getData = function(chartID) {
    return _data[chartID];
  };

  return store;

})();



DataStore.dispatchToken = AppDispatcher.register(function(payload) {
  var chartID = payload.chartID;
  var counties;


  switch(payload.type) {

    case ActionTypes.SELECT_COUNTY:
    case ActionTypes.DESELECT_COUNTY:
      AppDispatcher.waitFor([ChartStore.dispatchToken]);
      
      counties = ChartStore.getSelectedCounties(chartID);
      console.log(counties);

      if (counties) {
       d3.json("quarterly_total_employment/") // FIXME
        .header("Content-Type", "application/json")
        .post(JSON.stringify({ 'county_ids': counties }), function(error, data) {
          _updateData(chartID, data);
          DataStore.emitChange();
        });
      } else {
        _updateData(chartID, []);
      }

    break;

    default:
      // do nothing
  }
});



module.exports = DataStore;
