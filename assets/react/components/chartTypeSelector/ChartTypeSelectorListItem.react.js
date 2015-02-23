'use strict';

var React         = require('react'),
    ActionCreator = require('../../../flux/actions/ActionCreator')



var ChartTypeSelectorListItem = React.createClass ({
    
  updateSelection: function () {
    this.props.setChartType();
  },

  render: function () {
    var name = this.props.renderer.replace( /([A-Z])/g, " $1" );

    name = name.charAt(0).toUpperCase() + name.slice(1);

    return (
      <li onClick={this.props.selected ? undefined : this.updateSelection} className={'rendererSelectorListItem ' + (this.props.selected ? 'selected' : '') }>
        {name}
      </li>
    );
  }
});



module.exports = ChartTypeSelectorListItem;
