var AppDispatcher = require('../dispatcher/AppDispatcher'),
    ActionTypes   = require('../../constants/AppConstants');


module.exports = {

  setChartType: function(chartID, chartType){
    //console.log("Set Chart Type: " + chartType);
    AppDispatcher.dispatch({
      type      : ActionTypes.SET_CHART_TYPE,
      chartID   : chartID,
      chartType : chartType
    })
  },

  selectCounty: function(chartID, countyID){
    console.log("Select county: " + countyID);
    AppDispatcher.dispatch({
      type     : ActionTypes.SELECT_COUNTY,
      chartID  : chartID,
      countyID : countyID
    })
  },

  deselectCounty: function(chartID, countyID){
    console.log("Unselect county: " + countyID);
    AppDispatcher.dispatch({
      type     : ActionTypes.DESELECT_COUNTY,
      chartID  : chartID,
      countyID : countyID
    })
  }

 };
