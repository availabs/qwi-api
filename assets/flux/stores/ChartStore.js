'use strict';


var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes   = require('../../constants/AppConstants'),
    BaseStore     = require('./BaseStore');


var _chartTypes = {},
    _selectedCounties = {};


function _setChartType (chartID, chartType) {
  console.log("_setChartType");
  console.log(chartType);
  _chartTypes[chartID] = chartType;
}

function _selectCounty (chartID, countyID) {
  if ( !_selectedCounties[chartID] ) {
    _selectedCounties[chartID] = [countyID];
  } else if ( _selectedCounties[chartID].indexOf(countyID) === -1 ) {
      _selectedCounties[chartID].push(countyID) ;
  } else {
    return;
  }
}

function _deselectCounty (chartID, countyID) {
  var i;

  if ( _selectedCounties[chartID] && (i = _selectedCounties[chartID].indexOf(countyID)) !== -1) {
    _selectedCounties[chartID].splice(i, 1);
  } 
}



var ChartStore = (function() {

  var store = Object.create(BaseStore);

  store.getChartType = function(chartID) {
    return _chartTypes[chartID];
  };

  store.getSelectedCounties = function(chartID) {
    var selectedCounties = _selectedCounties[chartID];
    return selectedCounties ? selectedCounties : []; 
  };

  return store;

})();



ChartStore.dispatchToken = AppDispatcher.register(function(payload) {

  switch(payload.type) {

    case ActionTypes.SET_CHART_TYPE:
      _setChartType(payload.chartID, payload.chartType);
      ChartStore.emitChange();
    break;

    case ActionTypes.SELECT_COUNTY:
      _selectCounty(payload.chartID, payload.countyID);
      ChartStore.emitChange();
    break;

    case ActionTypes.DESELECT_COUNTY:
      _deselectCounty(payload.chartID, payload.countyID);
      ChartStore.emitChange();
    break;

    default:
      // do nothing
  }
});



module.exports = ChartStore;
