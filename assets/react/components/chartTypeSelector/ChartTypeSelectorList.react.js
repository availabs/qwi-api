'use strict';

var React = require('react'),
    ChartTypeSelectorListItem = require('./ChartTypeSelectorListItem.react');


var ChartTypeSelectorList = React.createClass ({

  generateListItems: function () {
    var props = this.props;

    // Build the list.
    return this.props.renderers.map(function(renderer, i) {

      return (<ChartTypeSelectorListItem
                key={i}
                setChartType={function() { props.setChartType.call(null, renderer); }} 
                renderer={renderer}
                selected={(props.currentChartType === renderer) ? true : false }
              />);
    });
  },
 
  render: function () {
    var classes = 'rendererSelectorList ' +  (this.props.active ? 'active' : 'inactive');

    return ( <ul className={classes}>{this.generateListItems()}</ul>);
  }

});


module.exports = ChartTypeSelectorList;
