// http://strongriley.github.io/d3/tutorial/bar-2.html
'use strict';


var d3 = require('d3');



function groupedBarChart() {


  var margin = {top: 20, right: 20, bottom: 30, left: 60},
      width = 1400 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

  var x = d3.scale.ordinal()
      .rangeRoundBands([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(10, "Emps");

  var colors = d3.scale.category10(); //FIXME: Make Dynamic based on num of selected counties.


  // Call on shouldComponentUpdate
  function chart (domElem, counties) {

    counties = counties.map(function (county) {
      return +(county.trim());
    });

    d3.json("quarterly_total_employment/")
      .header("Content-Type", "application/json")
      .post(JSON.stringify({ 'county_ids': counties }), function(error, data) {

        d3.select(domElem).select('.dataVizArea').selectAll('*').remove();

          var barWidth;

          data = (function cleanData (rawData) {
              rawData = rawData.filter(function (d) { 
              if (!(d.year && d.quarter && d.county)) { return false }  

              d.county = +(d.county.trim());
              d.year = +(d.year.trim());
              d.quarter = +(d.quarter.trim()); 

              // ??? How to handle the missing rawData ????
              d.total_employment = d.total_employment ? +(d.total_employment.trim()) : 0;

              return true;
            })

            // This sorting order makes the bar overlapping work.
            rawData.sort(function (a, b) {
              if (a.year < b.year) {
                return -1;
              } else if (a.year > b.year) {
                return 1;
              } else if (a.quarter < b.quarter) {
                return -1;  
              } else if (a.quarter > b.quarter) {
                 return 1;
              } else if (a.total_employment < b.total_employment) { 
                return -1;
              } else if (a.total_employment > b.total_employment){
                return 1;
              } else {
                return 0;
              }
            });

            return rawData;
          })(data);
      

        (function updateScaling() {
          var years,
              i, j;
      
          // To handle cases of gaps in years. ??? A better way: https://github.com/mbostock/d3/wiki/Time-Scales ???
          years = d3.extent(data, function (d) { return d.year; });
          for (i = years[0] + 1, j = years[1]; i < j; ++i) {
            years.push(i);
          }
          x.domain(years.sort());

          y.domain(d3.extent(data, function(d) { return d.total_employment; }));

          barWidth = width / ((years.length + 1) * (4 * counties.length)); // get some separation between quarterly figure bars.
        })();
        

        (function updateChart() {
          var chart = d3.select(domElem).select(".chart"),
              bars  = d3.select(domElem).selectAll(".dataVizArea").selectAll(".bar").data(data),
              prevQuarter,
              i;

          chart.select('.x.axis').call(xAxis);
          chart.select('.y.axis').call(yAxis);

          function computeX(d) {
            if (d.quarter === prevQuarter) {
              ++i;
            } else {
              i = 0;
            }
            prevQuarter = d.quarter;
            
            // (offset for year) + (offset of quarter) + (offset for county) + (undo centering over axis notch) 
            return x(d.year) + ((d.quarter - 1)*(counties.length * barWidth)) + (i* barWidth) + (2 * counties.length * barWidth ); 
          }

          prevQuarter = null;
          bars.enter().append("rect")
              .attr("class", "bar")
              .style("fill", function (d) { return colors(counties.indexOf(d.county)); })
              .attr("x", computeX)
              .attr("width", barWidth)
              .attr("y", function(d) { return y(d.total_employment); })
              .attr("height", function(d) { return height - y(d.total_employment || 0); })
              .append("svg:title")
              .text(function(d) { return d.county + ': ' + d.total_employment; });

          bars.exit().remove();
        })();

    });
  };
  

  // Call on componentDidMount
  chart.init = function(domElem) {

      var chart = d3.select(domElem)
          .append('svg')
          .attr('class', 'chartContainer')
          .attr("width", width + margin.left + margin.right)
          .attr("height", height + margin.top + margin.bottom) 
          .append('g')
          .attr('class', 'chart')
          .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

      chart.append("g")
          .attr("class", "x axis")
          .attr("transform", "translate(0," + height + ")")
          .call(xAxis);

      chart.append("g")
          .attr("class", "y axis")
          .call(yAxis)
        .append("text")
          .attr("transform", "rotate(-90)")
          .attr("y", 6)
          .attr("dy", ".71em")
          .style("text-anchor", "end")
          .text("Total Private Sector Employment");

      chart.append("g")
          .attr("class", "dataVizArea");
  }  

  chart.type = 'groupedBarChart';

  return chart;
};

module.exports = groupedBarChart;
