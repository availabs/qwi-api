'use strict';

var React             = require('react'),
    Charts            = require('../../charts'),
    BaseChart         = require('../charts/BaseChart.react'),
    ChartTypeSelector = require('../components').ChartTypeSelector,
    CountySelector    = require('../components').CountySelector;


var QuarterlyTotalEmploymentMain = React.createClass ({

  chartTypes : { 
    'overlappedBarChart' : Charts.OverlappedBarChart,
    'stackedBarChart'    : Charts.StackedBarChart,
    'groupedBarChart'    : Charts.GroupedBarChart,
    'voronoiLineChart'   : Charts.VoronoiLineChart
  },

  // Note: chartType is an instance of a specific chartType.
  getInitialState: function () {
    return { selectedCounties: [], chartType: this.chartTypes.voronoiLineChart() };  
  },


  handleCountySelectionChange: function (countyFIPSCode) {

    var newSelectedCounties = this.state.selectedCounties.slice(),
        index = newSelectedCounties.indexOf(countyFIPSCode);

    if (index === -1) {
      newSelectedCounties.push(countyFIPSCode);
    } else {
      newSelectedCounties.splice(index, 1);
    }

    this.setState( { selectedCounties: newSelectedCounties });
  },
  
  // ??? Cache the types once instantiated ???
  handleChartTypeChange: function (chartType) {
    this.setState( { chartType: this.chartTypes[chartType]() });
  },
  

  render : function () {

    return (
      <div>
        <BaseChart className='baseChart' chart={this.state.chartType} selectedCounties={ this.state.selectedCounties } />
        <div className='chartTypeSelector'>
          <ChartTypeSelector 
            notifySelectionChange={ this.handleChartTypeChange } 
            currentChartType={ this.state.chartType.type }
            chartTypes={ Object.keys(this.chartTypes) }
          />
        </div>
        <div className='countySelector'>
          <CountySelector 
            selectedCounties={this.state.selectedCounties} 
            notifySelectionChange={ this.handleCountySelectionChange } 
          />
        </div>
      </div> 
    );
  }

})

React.render (<QuarterlyTotalEmploymentMain />, document.getElementById('container'));

