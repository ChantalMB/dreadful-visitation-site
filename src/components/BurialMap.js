import React from 'react';
import * as d3 from 'd3';
import '../css/maps.css'
import { selection } from 'd3';

let secretWeekSelector = 1;

class BurialMap extends React.Component {
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
        secretWeekSelector = this.props.selector;
        console.log('t:' + this.props.selector)

        let svg = this.svg;
        let g = svg.select('g');
        //console.log(g.size());
        let mapLayer = g.select('g.map-layer');
        console.log(mapLayer.size());

        let color = d3.scaleThreshold()
        .domain([1, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 700])
        .range(["#efe6b4","#f6d27f","#fdc14a","#fb9d22","#f57e00",'#ec720f',"#ea5110","#e22828",'#bd251d',"#ab212a",'#88202a',"#762334","#4e1824"]);

        // get weekly count
        function pCount(d){
            let week = 'week' + secretWeekSelector;
            console.log('WeekCount:' + week)
            return d.properties[week];
        }

        // Get province color
        function fillFn(d){
            let c = pCount(d);
            return color(c);
        }

        let all = mapLayer.selectAll('path');
        console.log(all.size());
        all.style('fill', function(d){return fillFn(d);});
    }

    drawChart() {
        let width = this.props.width,
        height = this.props.height,
        centered;

        secretWeekSelector = this.props.selector;
        console.log('t:' + this.props.selector)

        // Define color scale
        let color = d3.scaleThreshold()
        .domain([1, 30, 60, 90, 120, 150, 180, 210, 240, 270, 300, 330, 700])
        .range(["#efe6b4","#f6d27f","#fdc14a","#fb9d22","#f57e00",'#ec720f',"#ea5110","#e22828",'#bd251d',"#ab212a",'#88202a',"#762334","#4e1824"]);

        let projection = d3.geoMercator()
            .scale(200000)
            // Center the Map in London
            .center([-0.10629450633040443, 51.5231191276096])
            .translate([width / 2, height / 2]);

        let path = d3.geoPath()
        .projection(projection);

        // Set svg width & height
        let svg = this.svg

        // Add background
        svg.append('rect')
        .attr('class', 'background')
        .attr('width', width)
        .attr('height', height)
        .on('click', clicked);

        let g = svg.append('g');

        let effectLayer = g.append('g')
        .classed('effect-layer', true);

        let mapLayer = g.append('g')
        .classed('map-layer', true);

        let chartLayer = g.append('g')
        .classed('chart-layer', true)

        let bigText = g.append('text')
        .classed('big-text', true)
        .attr('x', 20)
        .attr('y', 45);

        let countText = g.append('text')
        .classed('count-text', true)
        .attr('x', 23)
        .attr('y', 70);

        // Load map data
        d3.json(this.props.data, function(error, mapData) {
            let features = mapData.features;
        // Draw each parish as a path
        mapLayer.selectAll('path')
            .data(features)
            .enter().append('path')
            .attr('d', path)
            .attr('vector-effect', 'non-scaling-stroke')
            .style('fill', fillFn)
            .on('mouseover', mouseover)
            .on('mouseout', mouseout)
            .on('click', clicked);
        });

        // Get parish name
        function nameFn(d){
            return d && d.properties ? d.properties.parish : null;
        }

        // get weekly count
        function pCount(d){
            let week = 'week' + secretWeekSelector;
            console.log('WeekCount:' + week)
            return d.properties[week];
        }

        // Get province color
        function fillFn(d){
            let c = pCount(d);
            return color(c);
        }

        // When clicked, zoom in
        function clicked(d) {
        let x, y, k;

        // Compute centroid of the selected path
        if (d && centered !== d) {
            let centroid = path.centroid(d);
            x = centroid[0];
            y = centroid[1];
            k = 4;
            centered = d;
        } else {
            x = width / 2;
            y = height / 2;
            k = 1;
            centered = null;
        }

        // Highlight the clicked parish
        mapLayer.selectAll('path')
            .style('fill', function(d){return centered && d===centered ? '#D5708B' : fillFn(d);});

        // Zoom
        g.transition()
            .duration(750)
            .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')scale(' + k + ')translate(' + -x + ',' + -y + ')');
        }

        // --------------- MOUSE EVENTS ---------------

        function mouseover(d){
        // Highlight hovered parish
        d3.select(this).style('fill', 'orange');

        // Draw effects
        textArt(nameFn(d));
        disCount(pCount(d));
        }

        function mouseout(d){
        // Reset province color
        mapLayer.selectAll('path')
            .style('fill', function(d){return centered && d===centered ? '#D5708B' : fillFn(d);});

        // Remove effect text
        effectLayer.selectAll('text').transition()
            .style('opacity', 0)
            .remove();

        // Clear province name
        bigText.text('');
        countText.text('')
        }

        // ---------------- TEXT STYLING -----------------

        let BASE_FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif";

        let FONTS = [
            "Open Sans",
            "Josefin Slab",
            "Arvo",
            "Lato",
            "Vollkorn",
            "Abril Fatface",
            "Old StandardTT",
            "Droid+Sans",
            "Lobster",
            "Inconsolata",
            "Montserrat",
            "Playfair Display",
            "Karla",
            "Alegreya",
            "Libre Baskerville",
            "Merriweather",
            "Lora",
            "Archivo Narrow",
            "Neuton",
            "Signika",
            "Questrial",
            "Fjalla One",
            "Bitter",
            "letela Round"
        ];

        function textArt(text){
        // Use random font
        let fontIndex = Math.round(Math.random() * FONTS.length);
        let fontFamily = FONTS[fontIndex] + ', ' + BASE_FONT;

        bigText
            .style('font-family', fontFamily)
            .text(text);
        }

        function disCount(count){
        let fontFamily = BASE_FONT;
        countText
            .style('font-family', fontFamily)
            .text("# of burials: " + count);

        }
        this.svg = svg;
    }

    render(){
        return <svg width={this.props.width} height={this.props.height}
            ref={handle => {this.svg = d3.select(handle)}}></svg>
    }

}

export default BurialMap;