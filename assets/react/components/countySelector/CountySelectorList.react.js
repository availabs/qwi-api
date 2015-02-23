'use strict';


var React                  = require('react'),
    CountySelectorListItem = require('./CountySelectorListItem.react.js'),
    fipsCodes              = require('../../../data/nys_fips');


var CountySelectorList = React.createClass ({

  generateListItems: function () {
    var props = this.props;

    return Object.keys(fipsCodes).map(function(countyName, i) {

      var fipsCode = fipsCodes[countyName],
          selected = (props.selectedCounties.indexOf(fipsCode) !== -1) ? true : false;

      return (<CountySelectorListItem
                key          = { i }
                toggleCounty = { selected ? props.deselectCounty : props.selectCounty } 
                fipsCode     = { fipsCode } 
                countyName   = { countyName } 
                selected     = { selected }
              />);
    });
  },
 
  render: function () {
    var classes = 'countySelectorList ' +  (this.props.active ? 'active' : 'inactive');

    return ( <ul className={classes}>{this.generateListItems()}</ul>);
  }
});


module.exports = CountySelectorList;
