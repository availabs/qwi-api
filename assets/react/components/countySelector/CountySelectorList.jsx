var CountySelectorList = React.createClass ({


  generateListItems: function () {
    var props = this.props;

    return Object.keys(fipsCodes).map(function(countyName, i) {

      var fipsCode = fipsCodes[countyName];

      return (<CountySelectorListItem
                key={i}
                notifySelectionChange={props.notifySelectionChange} 
                fipsCode={fipsCode} 
                countyName={countyName} 
                selected={(props.selectedCounties.indexOf(fipsCode) !== -1) ? true : false }
              />);
    });
  },
 
   
  render: function () {
    var classes = 'countySelectorList ' +  (this.props.active ? 'active' : 'inactive');

    return ( <ul className={classes}>{this.generateListItems()}</ul>);
  }

});
