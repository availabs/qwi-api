var QuarterlyTotalEmploymentMain = React.createClass ({

  getInitialState: function() {
    return { selectedCounties: [], sidebarActive: false };  
  }, 

  toggleSidebar: function() {
    this.setState({ sidebarActive: !this.state.sidebarActive });
  },

  notifySelectionChange: function(countyCode, selected) {
    var newSelectedCounties = this.state.selectedCounties.slice();

    if (selected) {
      newSelectedCounties.push(countyCode);
    } else {
      newSelectedCounties.splice(newSelectedCounties.indexOf(countyCode), 1);
    }

    this.setState( { selectedCounties: newSelectedCounties });
  },

  render : function () {

    return (
      <div>
        <OverlappedBarChart className='overlappedBarChart' selectedCounties={ this.state.selectedCounties } />
        <h4 className='selectorButton' onClick={ this.toggleSidebar }>NYS Counties</h4>
        <div className='selectorSidebar'>
          <DropList notifySelectionChange={ this.notifySelectionChange } active={this.state.sidebarActive}/>
        </div>
      </div> 
    );
  }
})

React.render (<QuarterlyTotalEmploymentMain />, document.getElementById('container'));
