'use strict';


var React = require('react'),
    CountySelectorListItem = require('./CountySelectorListItem.react.js');


var CountySelectorListItem = React.createClass ({

  handleClick: function () {
    this.props.toggleCounty(this.props.fipsCode);
  },

  render: function () {
    return (
      <li className = { 'countySelectorListItem ' + (this.props.selected ? 'selected' : '') }
          onClick   = { this.handleClick } 
          key       = { this.props.key } 
          fipsCode  = { this.props.fipsCode } > 

            {this.props.countyName}

      </li>
    );
  }
});



module.exports = CountySelectorListItem;
