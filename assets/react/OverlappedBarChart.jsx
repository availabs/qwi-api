var chart = overlappedBarChart();

var OverlappedBarChart = React.createClass ({

  componentDidMount: function() {
    chart.init(this.getDOMNode());
  },

  shouldComponentUpdate: function(nextProps) {
    var stateArray,
        propsArray,
        that = this,
        i;

    if (nextProps.selectedCounties.length === this.props.selectedCounties.length) {
      stateArray = this.props.selectedCounties.slice();
      propsArray = nextProps.selectedCounties.slice();
  
      stateArray.sort();
      propsArray.sort();

      for (i = 0; (i < stateArray.length) && (stateArray[i] === propsArray[i]); ++i) { ; }

      if (i === stateArray.length) return false;
    } 

    setTimeout(function() { chart(that.getDOMNode(), nextProps.selectedCounties); }, 0); // ??? Necessary?

    return false;
  },

  render : function() { return ( <div/> ); }

});
