// Container for BarChart. 
// Wraps the specific BarChart types, allowing dynamic redraw on user chart selection.
// Towards goal of a base BarChart with swappable components.

var BaseChart = React.createClass ({

  // Depends on a default chart type chosen by BaseChart's owner.
  componentDidMount: function() {
    this.props.chart.init(this.getDOMNode());
  },

  shouldComponentUpdate: function (nextProps) {
    var nextCounties,
        prevCounties,
        that = this,
        i;

    // ??? Equality of functions ???
    if (nextProps.chart.type !== this.props.chart.type) {
      setTimeout(function() { nextProps.chart(that.getDOMNode(), nextProps.selectedCounties); }, 0); // FIXME: Redundant
      return false;
    }

    // Did the selected counties change ?
    if (nextProps.selectedCounties.length === this.props.selectedCounties.length) {

      nextCounties = nextProps.selectedCounties.slice();
      prevCounties = this.props.selectedCounties.slice();
  
      nextCounties.sort();
      prevCounties.sort();

      for (i = 0; (i < nextCounties.length) && (nextCounties[i] === prevCounties[i]); ++i) { ; }

      if (i === nextCounties.length) {
        return false;
      }
    } 

    setTimeout(function() { nextProps.chart(that.getDOMNode(), nextProps.selectedCounties); }, 0); // ??? Necessary?

    return false;
  },

  render : function() { return ( <div/> ); }

});
