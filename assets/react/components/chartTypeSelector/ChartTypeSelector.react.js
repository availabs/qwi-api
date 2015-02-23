'use strict';

var React = require('react'),
    ChartTypeSelectorList = require('./ChartTypeSelectorList.react');


var ChartTypeSelector = React.createClass ({

  getInitialState: function () {
    return { active: false };
  },

  toggleSelectionList: function () {
    this.setState({ active: !this.state.active });
  },
   
  render: function () {
    return ( 
      <div className='chartTypeSelector'>
        <h4 className='chartTypeSelectorButton' onClick={this.toggleSelectionList}>Chart Type</h4>
        <ChartTypeSelectorList 
          setChartType={this.props.setChartType} 
          active={this.state.active} 
          currentChartType={this.props.currentChartType}
          renderers={this.props.renderers}
        />
      </div> 
    );
  }
});



module.exports = ChartTypeSelector;
