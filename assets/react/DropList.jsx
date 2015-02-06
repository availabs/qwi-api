var CountyRow = React.createClass ({

  getInitialState: function() {
    return { selected: false };  
  }, 

  handleClick: function(event) {
    var selected = !this.state.selected;

    this.setState({ selected: selected });
    this.props.notifySelectionChange(this.props.fipsID, selected)
  },
    
  render: function() {
    var classes = (this.state.selected ? 'selectedCounty ' : '') + "countyListItem";

    return (
      <li>
        <span onClick={this.handleClick} className={classes} key={this.props.key} fipsID={this.props.fipsID}>{this.props.countyName} </span>
      </li>
    );
  }
});


var DropList = React.createClass ( {

  render: function () {
    var clazzName = 'countySelectorList ' +  (this.props.active ? 'active' : 'inactive');

    var that = this; //??? This isn't done in the docs ???

    var counties = Object.keys(fipsCodes).map(function(countyName, i) {
      return (<CountyRow key={i} notifySelectionChange={that.props.notifySelectionChange} fipsID={fipsCodes[countyName]} countyName={countyName} />);
    });

    return ( 
      <div className={clazzName}>
        <ul className={'countyList'}>{counties}</ul>
      </div> 
    );
  }
});
