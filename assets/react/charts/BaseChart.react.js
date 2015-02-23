'use strict';

var React     = require('react'),
    DataStore = require('../../flux/stores/DataStore');


var BaseChart = React.createClass ({

  getInitialState: function() {
    return { data: [] };
  },

  componentDidMount: function() {
    DataStore.addChangeListener(this._onChange);
    this.props.renderer.init(this.getDOMNode());
  },

  shouldComponentUpdate: function (nextProps) {
    if (this.props.renderer !== nextProps.renderer) {
      nextProps.renderer(this.getDOMNode(), this.state.data);
    }
    return false;
  },

  _onChange: function() {
    var theData = DataStore.getData(this.props.chartID);
    this.setState({ data: theData });
    this.props.renderer(this.getDOMNode(), theData);
  },

  render : function() { return ( <div/> ); }

});


module.exports = BaseChart;

