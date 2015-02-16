// http://bl.ocks.org/mbostock/8033015
'use strict';


var d3 = require('d3');



function voronoiLineChart() {

  var months,
      monthFormat = d3.time.format("%Y-%m");

  var margin = {top: 20, right: 20, bottom: 30, left: 60},
      width = 1400 - margin.left - margin.right,
      height = 600 - margin.top - margin.bottom;

  var x = d3.time.scale()
        .range([0, width]);

  var y = d3.scale.linear()
      .range([height, 0]);

  var xAxis = d3.svg.axis()
      .scale(x)
      .orient("bottom");

  var yAxis = d3.svg.axis()
      .scale(y)
      .orient("left")
      .ticks(10, "Emps");

  var color = d3.scale.category20();

  var voronoi = d3.geom.voronoi()
      .x(function(d) { return x(d.date); })
      .y(function(d) { return y(d.total_employment); })
      .clipExtent([[-margin.left, -margin.top], [width + margin.right, height + margin.bottom]]);

  var line = d3.svg.line()
      .x(function(d) { return x(d.date);})
      .y(function(d) { return y(d.total_employment); });



  function chart (domElem, counties) {

    counties = counties.map(function (county) {
      return +(county.trim());
    });

    d3.json("quarterly_total_employment/")
      .header("Content-Type", "application/json")
      .post(JSON.stringify({ 'county_ids': counties }), function(error, data) {

        d3.select(domElem).select('.dataVizArea').selectAll('*').remove();

        var quarters = [],
            maxEmploymentTotal = 0;

        data = (function cleanData (rawData) {
            
            var dataByCounty = {};

            rawData.forEach( function (d) { 
              var county,
                  values;

              if (!(d.year && d.quarter && d.county && d.total_employment)) { return; }  

              county = +(d.county.trim()),

              values = {
                  county  : county,
                  quarter : +(d.quarter.trim()),
                  year    : +(d.year.trim()),
                  date    : monthFormat.parse(d.year.trim() + '-' + (+d.quarter.trim() * 3 - 1)),
                  total_employment : d.total_employment ? +(d.total_employment.trim()) : 0
              };

              quarters.push(values.date);

              if (values.total_employment > maxEmploymentTotal) {
                maxEmploymentTotal = values.total_employment;
              }

              if (dataByCounty[county]) {
                dataByCounty[county].push(values);
              } else {
                dataByCounty[county] = [values];
              }
            });

            // Transform object into array.
            return Object.keys(dataByCounty).map(function (county) { 

              dataByCounty[county].sort(function(a,b) {
                if (a['date'] > b['date']) {
                  return 1;
                } else if (a['date'] < b['date']) {
                  return -1;
                } else return 0;
              })

              return { county: county, values: dataByCounty[county] } 
            });
        })(data);
      
        (function updateScaling() {
          x.domain(d3.extent(quarters));
          y.domain([0, maxEmploymentTotal]);
        })();

        (function updateChart() {
          var chart    = d3.select(domElem).select(".chart"),
              vizArea  = d3.select(domElem).selectAll(".dataVizArea");

          chart.select('.x.axis').call(xAxis);
          chart.select('.y.axis').call(yAxis);

          vizArea.append("g")
              .attr("class", "counties")
            .selectAll("path")
              .data(data)
            .enter().append("path")
              .attr("d", function(d) { 
                var that = this;
                d.values.forEach(function(d) { d.line = that; }); // In the example, Bostock uses a circular reference.
                return line(d.values); 
              });

          var focus = vizArea.append("g")
              .attr("transform", "translate(-100,-100)")
              .attr("class", "focus");

          focus.append("circle")
              .attr("r", 3.5);

          focus.append("text")
              .attr("y", -10);

          var voronoiGroup = vizArea.append("g")
              .attr("class", "voronoi");

          voronoiGroup.selectAll("path")
              .data(voronoi(d3.nest()
                  .key(function(d) { return x(d.date) + "," + y(d.total_employment); })
                  .rollup(function(v) { return v[0]; })
                  .entries(d3.merge(data.map(function(d) { return d.values; })))
                  .map(function(d) { return d.values; })))
            .enter().append("path")
              .attr("d", function(d) { return "M" + d.join("L") + "Z"; })
              .datum(function(d) { return d.point; })
              .on("mouseover", mouseover)
              .on("mouseout", mouseout);

          function mouseover(d) {
            d3.select(d.line).classed("county--hover", true);
            d.line.parentNode.appendChild(d.line);
            focus.attr("transform", "translate(" + x(d.date) + "," + y(d.total_employment) + ")");
            focus.select("text").text(d.county + ': Q' + d.quarter + '_' + d.year + ', ' + d.total_employment);
          }

          function mouseout(d) {
            d3.select(d.line).classed("county--hover", false);
            focus.attr("transform", "translate(-100,-100)");
          }
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

  chart.type = 'voronoiLineChart';

  return chart;
}

module.exports = voronoiLineChart;
