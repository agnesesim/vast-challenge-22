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
        }
    }
</script>
