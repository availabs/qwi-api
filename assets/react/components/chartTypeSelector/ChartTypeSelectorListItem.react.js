'use strict';

var React = require('react');



var ChartTypeSelectorListItem = React.createClass ({
    
  handleClick: function () {
    if (this.props.selected === true) return;

    this.props.notifySelectionChange(this.props.chartType);
  },

  render: function () {
    var name = this.props.chartType.replace( /([A-Z])/g, " $1" );

    name = name.charAt(0).toUpperCase() + name.slice(1);

    return (
      <li onClick={this.handleClick} className={'chartTypeSelectorListItem ' + (this.props.selected ? 'selected' : '') }>
        {name}
      </li>
    );
  }
});



module.exports = ChartTypeSelectorListItem;
