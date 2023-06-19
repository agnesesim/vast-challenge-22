<template>
    <div>
        <svg id="map">
        </svg>
    </div>
</template>

<script>
    import * as d3 from 'd3'

    
    function getMap(buildings, type, { width = 800, height = 750, scale = 500000} = {}) {
        const svg = d3.select('#map')
        .attr("width", width)
        .attr("height", height)

        const projection = d3.geoIdentity()
            .reflectY(true)
            .fitSize([width, height], buildings)
        const path = d3.geoPath()
            .projection(projection);
        
        svg.selectAll("path")
            .data(buildings.features)
            .join("path")
            .attr("d", path)
            .style("fill", function(d) {
                if (type){ 
                    if (d.properties.type == 'residental')
                        return '#f0ad4e';
                    else if (d.properties.type == 'commercial')
                        return '#5bc0de'
                    else if (d.properties.type == 'school')
                        return '#5cb85c';
                }
                else
                    return '#bbb';
            })
            .attr("fill-opacity", 0.5)


        svg.append("g").attr("id",'feature')
        svg.append("g").attr("id",'locals')

        return {
            width,
            height,
            svg,
            projection,
            path
        };
    }


    function addFeatureDistributionColor(buildings, data, {width = 800, height = 750, scale = 500000} = {}){
        
        d3.select('#feature').selectAll("*").remove();

        const projection = d3.geoIdentity()
            .reflectY(true)
            .fitSize([width, height], buildings)

        const path = d3.geoPath()
            .projection(projection);

        const gfeature = d3.select('#feature')

        gfeature
            .selectAll("circle")
            .data(data)
            .join("circle")
            .attr("d", path)
            .attr("cx", d => {  return projection([d.x, d.y])[0] } )
            .attr("cy", d =>  { return projection([d.x, d.y])[1] } )
            .attr("r",  4)
            .style("fill", d => d.color)
            .style("stroke", d => d.color)
            .attr("fill-opacity", 0.5)
            .attr("stroke", d => d.color)
            .attr("stroke-width", 0.5);
    }

    function addLocal(buildings, data, {width = 800, height = 750, scale = 500000} = {}){
        
        d3.select('#feature').selectAll("*").remove();

        const projection = d3.geoIdentity()
            .reflectY(true)
            .fitSize([width, height], buildings)

        const glocals = d3.select('#locals')

        var radius = d3.scaleSqrt([0, 120], [0, width/50 ])
        var color = //d3.scaleLinear(data.map(d => d.price), d3.schemeBlues[9]).unknown("black")
                       d3.scaleLinear()
                         .domain([Math.min(data.map(d => d.price)), Math.max(data.map(d => d.price))])
                         .range(["light blue",  "blue"])
        glocals
            .selectAll("rect")
            .data(data)
            .join("rect")
            .attr("width", d => radius(d.occupancy))
            .attr("height", d => radius(d.occupancy))
            .attr("x", d => {  return projection([d.x, d.y])[0] - radius(d.occupancy)/2} )
            .attr("y", d =>  { return projection([d.x, d.y])[1] - radius(d.occupancy)/2} )
            .style("fill", d => color(d.price))
            // .style("stroke", d => color(d.price))
            .attr("fill-opacity", 0.9)
            // .attr("stroke", d => color(d.price))
            // .attr("stroke-width", 0.5);
        console.log(glocals)
    }
    export default {
        name: "CityMapBuild",
        data: function(){
            return {
                buildings: {},
                map: {},
            }
        },      
        props:{
            colorType: {
                type: Boolean,
                default: false
            },
            data: {
                type: Array,
                default: []
            },
            locals: {
                type: Array,
                default: []
            }
        },
        async mounted(){

            this.buildings = await d3.json('datasets/maps/building.json')
            this.map = getMap(this.buildings, this.colorType)

        },
        watch:{
            colorType: function(){
                this.map = getMap(this.buildings, this.colorType)
            },
            data: function(){
                addFeatureDistributionColor(this.buildings, this.data);
            },
            locals: function(){
                addLocal(this.buildings, this.locals);
            },
        }
    }
</script>
