var CountySelector = React.createClass ( {


  getInitialState: function () {
    return { active: false };
  },


  toggleSelectionList: function () {
    this.setState({ active: !this.state.active });
  },
   

  render: function () {
    return ( 
      <div className='countySelector'>
        <h4 className='countySelectorButton' onClick={this.toggleSelectionList}>NYS Counties</h4>
        <CountySelectorList 
          notifySelectionChange={this.props.notifySelectionChange} 
          active={this.state.active} 
          selectedCounties={this.props.selectedCounties}
        />
      </div> 
    );
  }

});
