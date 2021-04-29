import React from 'react';
import * as d3 from 'd3';

class StreamChart extends React.Component {
    componentDidMount() {
    this.drawChart();
}

    drawChart() {
        // set the dimensions and margins of the graph
        var margin = {top: 20, right: 30, bottom: 30, left: 60},
        width = this.props.width - margin.left - margin.right,
        height = this.props.height - margin.top - margin.bottom;

        // append the svg object to the body of the page
        var svg = this.svg
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform",
                "translate(" + margin.left + "," + margin.top + ")");


        

        // Parse the Data
        //d3.csv("https://raw.githubusercontent.com/holtzy/data_to_viz/master/Example_dataset/5_OneCatSevNumOrdered_wide.csv", function(data) {
        d3.csv(this.props.data, function(data) {
        // List of groups = header of the csv files
            var keys = data.columns.slice(1)

            // Add X axis
            var x = d3.scaleLinear()
            .domain([1, 52])
            .range([ 0, width ]);

            svg.append("g")
                .attr("transform", "translate(0," + height + ")")
                .call(d3.axisBottom(x).ticks(52));


            var gridlines = d3.axisBottom()
                .ticks(52)
                .tickFormat("")
                .tickSize(height)
                .scale(x);

            svg.append("g")
                .attr("class", "grid")
                .call(gridlines)  

            // Add Y axis
            var y = d3.scaleLinear()
                .domain([-750, 750])
                .range([ height, 0 ]);
            
           
            // color palette
            var color = d3.scaleOrdinal()
                .domain(keys)
                .range(["#F94D50","#f3722c","#f8961e","#f9844a","#f9c74f","#90be6d","#43aa8b","#4d908e","#277da1"])

            //stack the data?
            var stackedData = d3.stack()
                .offset(d3.stackOffsetSilhouette)
                .keys(keys)
                (data)


            var Tooltip = svg
                .append("text")
                .attr("x", 35)
                .attr("y", 25)
                .style("opacity", 0)
                .style("font-size", 17)

            var mouseover = function(d) {
                console.log(d)
                Tooltip.style("opacity", 1)
                d3.selectAll(".myArea").style("opacity", .2)
                d3.select(this)
                .style("stroke", "white")
                .style("opacity", 1)
            }

            var mousemove = function(d,i) {
            // Gets the key
                let grp = keys[i]
                // Gets the week
                let mousex = d3.mouse(this);
                mousex = mousex[0];
                let invert = Math.floor(x.invert(mousex));

                // Sets tooltip to the new string
                Tooltip.text("Week " + invert + "- " + grp + ": "  + data[invert-1][grp]);
            }

            var mouseleave = function(d) {
                Tooltip.style("opacity", 0)
                d3.selectAll(".myArea").style("opacity", 1).style("stroke", "none")
            }

            // Show the areas
            svg
                .selectAll("mylayers")
                .data(stackedData)
                .enter()
                .append("path")
                .attr("class", "myArea")
                    .style("fill", function(d) { return color(d.key); })
                .attr("d", d3.area()
                    .curve(d3.curveMonotoneX)
                    .x(function(d, i) { return x(d.data.week_number); })
                    .y0(function(d) { return y(d[0]); })
                    .y1(function(d) { return y(d[1]); })
                )
                .on("mouseover", mouseover)
                .on("mousemove", mousemove)
                .on("mouseleave", mouseleave)

        })
    }

    render(){
        return <svg width={this.props.width} height={this.props.height}
                ref={handle => {this.svg = d3.select(handle)}}></svg>
    }

}

export default StreamChart;