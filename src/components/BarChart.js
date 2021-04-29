import React from 'react';
import * as d3 from 'd3';
import { interpolateOranges } from 'd3-scale-chromatic';


let secretWeekSelector = 1;

class BarChart extends React.Component {
    componentDidMount() {
        this.drawChart();
    }

    componentDidUpdate(prevProps, prevState) {
        if (prevProps.selector !== this.props.selector) {
            console.log('b: ' + this.props.selector)

            this.updateChart();
        }
    }

    updateChart() {
        this.svg.selectAll('g').remove();

        secretWeekSelector = this.props.selector;
        console.log('t:' + this.props.selector)

        var margin = {top: 30, right: 30, bottom: 115, left: 60},
        width = this.props.width - margin.left - margin.right,
        height = this.props.height - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = this.svg
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        var color = d3.scaleOrdinal()
            .domain(82)
            .range(["#F94D50","#f9c74f","#43aa8b","#4d908e","#277da1"])



        // Parse the Data
        d3.csv(this.props.data, function(data) {

        // X axis
        var x = d3.scaleBand()
        .range([ 0, width ])
        .domain(data.map(function(d) { return d.cause; }))
        .padding(0.2);
        svg.append("g")
        .attr("transform", "translate(0," + height + ")")
        .call(d3.axisBottom(x))
        .selectAll("text")
            .attr("transform", "translate(-12,5)rotate(-75)")
            .style("text-anchor", "end");

        var max = d3.max(data, function(d) { return +d[secretWeekSelector]; } );
        // colour.domain([-max, max]);

        // Add Y axis
        var y = d3.scaleLinear()
        .domain([0, max + 5])
        .range([ height, 0]);
        svg.append("g")
        .call(d3.axisLeft(y));

        var gridlines = d3.axisLeft()
            .tickFormat("")
            .tickSize(-width)
            .scale(y);

        svg.append("g")
            .attr("class", "grid")
            .call(gridlines);

        // Bars
        svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
            .attr("x", function(d) { return x(d.cause); })
            .attr("y", function(d) { return y(d[secretWeekSelector]); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(d[secretWeekSelector]); })
            .attr("fill", function(d) { return color(82); })
            // .attr("fill", function(d) {
            // return colour(d['1'])
            // })


        })
    }

    drawChart() {
        secretWeekSelector = this.props.selector;
        console.log('t:' + this.props.selector)

        var margin = {top: 30, right: 30, bottom: 115, left: 60},
        width = this.props.width - margin.left - margin.right,
        height = this.props.height - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = this.svg
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .attr("id", "bar")
        .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");

        // var colour = d3.scaleSequential(d3.schemeCategory10);
        
        var color = d3.scaleOrdinal()
            .domain(82)
            .range(["#F94D50","#f9c74f","#43aa8b","#4d908e","#277da1"])


        // Parse the Data
        d3.csv(this.props.data, function(data) {

        // X axis
        var x = d3.scaleBand()
            .range([ 0, width ])
            .domain(data.map(function(d) { return d.cause; }))
            .padding(0.2);

        svg.append("g")
            .attr("transform", "translate(0," + height + ")")
            .call(d3.axisBottom(x))
            .selectAll("text")
                .attr("transform", "translate(-12,5)rotate(-75)")
                .style("text-anchor", "end");

        var max = d3.max(data, function(d) { return +d[secretWeekSelector]; } );
        // colour.domain([-max, max]);

        // Add Y axis
        var y = d3.scaleLinear()
            .domain([0, max + 5])
            .range([ height, 0])

        svg.append("g")
            .call(d3.axisLeft(y))
        
        var gridlines = d3.axisLeft()
            .tickFormat("")
            .tickSize(-width)
            .scale(y);

        svg.append("g")
            .attr("class", "grid")
            .call(gridlines);


        // Bars
        svg.selectAll("mybar")
        .data(data)
        .enter()
        .append("rect")
            .attr("x", function(d) { return x(d.cause); })
            .attr("y", function(d) { return y(d[secretWeekSelector]); })
            .attr("width", x.bandwidth())
            .attr("height", function(d) { return height - y(d[secretWeekSelector]); })
            .attr("fill", function(d) { return color(82); })
            // .attr("fill", function(d) {
            // return colour(d['1'])
            // })


        })
    }

    render(){
        return <svg width={this.props.width} height={this.props.height}
                ref={handle => {this.svg = d3.select(handle)}}></svg>
    }

}

export default BarChart;