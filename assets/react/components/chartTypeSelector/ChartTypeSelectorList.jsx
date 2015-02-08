var ChartTypeSelectorList = React.createClass ({


  generateListItems: function () {
    var props = this.props;

    return this.props.chartTypes.map(function(chartType, i) {

      return (<ChartTypeSelectorListItem
                key={i}
                notifySelectionChange={props.notifySelectionChange} 
                chartType={chartType}
                selected={(props.currentChartType === chartType) ? true : false }
              />);
    });
  },
 
   
  render: function () {
    var classes = 'chartTypeSelectorList ' +  (this.props.active ? 'active' : 'inactive');

    return ( <ul className={classes}>{this.generateListItems()}</ul>);
  }

});
