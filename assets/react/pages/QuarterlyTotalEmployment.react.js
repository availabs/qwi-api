'use strict';

var React             = require('react'),
    Charts            = require('../../charts'),
    BaseChart         = require('../charts/BaseChart.react'),
    ChartTypeSelector = require('../components').ChartTypeSelector,
    CountySelector    = require('../components').CountySelector;

var ChartStore    = require('../../flux/stores/ChartStore'),
    ActionCreator = require('../../flux/actions/ActionCreator');

var FlakeId    = require('flake-idgen'),
    flakeIdGen = new FlakeId();


var renderers = { 
    'overlappedBarChart' : Charts.OverlappedBarChart(),
    'stackedBarChart'    : Charts.StackedBarChart(),
    'groupedBarChart'    : Charts.GroupedBarChart(),
    'voronoiLineChart'   : Charts.VoronoiLineChart()
};


var QuarterlyTotalEmploymentMain = React.createClass ({

  getInitialState: function () {
    return { chartID: flakeIdGen.next(), renderer: renderers.voronoiLineChart, selectedCounties: [] };  
  },

  componentWillMount: function () {
    ActionCreator.setChartType(this.state.chartID, this.state.renderer.type);
  },

  componentDidMount: function () {
    ChartStore.addChangeListener(this._onChange);
  },

  componentDidUnmount: function () {
    ChartStore.removeChangeListener(this._onChange);
  },

  _onChange: function () {
    this.setState({ renderer: renderers[ChartStore.getChartType(this.state.chartID)], //FIXME
                    selectedCounties: ChartStore.getSelectedCounties(this.state.chartID)
                  });
  },
  
  setChartType: function (renderer) {
    ActionCreator.setChartType(this.state.chartID, renderer);
  },
  
  selectCounty: function (countyID) {
    ActionCreator.selectCounty(this.state.chartID, countyID)
  },

  deselectCounty: function (countyID) {
    ActionCreator.deselectCounty(this.state.chartID, countyID)
  },
  

  render : function () {
    return (
      <div>
        <BaseChart  className='baseChart' 
            chartID          = { this.state.chartID } 
            renderer         = { this.state.renderer } 
            selectedCounties = { this.state.selectedCounties } 
        />

        <div className='chartTypeSelector'>
          <ChartTypeSelector 
            blah= {console.log(this)}
            setChartType     = { this.setChartType } 
            currentChartType = { this.state.renderer.type }
            renderers        = { Object.keys(renderers) } 
          />
        </div>

        <div className='countySelector'>
          <CountySelector 
            selectCounty     = { this.selectCounty } 
            deselectCounty   = { this.deselectCounty } 
            selectedCounties = { this.state.selectedCounties } />
        </div>
      </div> 
    );
  }
})

React.render (<QuarterlyTotalEmploymentMain />, document.getElementById('container'));
