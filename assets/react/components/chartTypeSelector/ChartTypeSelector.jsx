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
          notifySelectionChange={this.props.notifySelectionChange} 
          active={this.state.active} 
          currentChartType={this.props.currentChartType}
          chartTypes={this.props.chartTypes}
        />
      </div> 
    );
  }

});



