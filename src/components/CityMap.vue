<template>
    <div>
        <svg id="map">
        </svg>
    </div>
</template>

<script>
    import * as d3 from 'd3'

    function getMap(buildings, residental, commercial, school, { width = 750, height = 600, scale = 500000} = {}) {
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
                if (d.properties.type == 'residental' && residental)
                    return '#f0ad4e';
                else if (d.properties.type == 'commercial' && commercial)
                    return '#5bc0de'
                else if (d.properties.type == 'school' && school)
                    return '#5cb85c';
                else
                    return '#bbb';
            });

        svg.append("g").attr("id",'feature')

        return {
            width,
            height,
            svg,
            projection,
            path
        };
    }

    function addFeatureDistributionColor(buildings, data, { width = 750, height = 600, scale = 500000} = {}){
        
        d3.select('#feature').selectAll("*").remove();

        const projection = d3.geoIdentity()
            .reflectY(true)
            .fitSize([width, height], buildings)

        const path = d3.geoPath()
            .projection(projection);

        const gfeature = d3.select('#feature')

        var max = Math.max(...data.map(d =>{return d.value}))
        var min = Math.min(...data.map(d =>{return d.value}))
        var median = (max+min)/2
        var myColor = d3.scaleLinear().domain([min, median, max])
            .range(["yellow", "orange", "red"])

        gfeature
            .selectAll("circle")
            .data(data)
            .join("circle")
            .attr("d", path)
            .attr("cx", d => {  return projection([d.x, d.y])[0] } )
            .attr("cy", d =>  { return projection([d.x, d.y])[1] } )
            .attr("r",  4)
            .style("fill",  function(d){ return myColor(d.value)})
            .style("stroke", function(d){return myColor(d.value) })
            .attr("fill-opacity", 0.5)
            .attr("stroke", function(d){return myColor(d.value) })
            .attr("stroke-width", 0.5);
    }


    export default {
        name: "CityMap",
        data: function(){
            return {
                buildings: {},
                map: {},
            }
        },      
        props:{
            resActive: {
                type: Boolean,
                default: false
            },
            resData: {
                type: Array,
                default: []
            },
            commActive: {
                type: Boolean,
                default: false
            },
            schActive: {
                type: Boolean,
                default: false
            },
            featureToShow: {
                type: String,
                default: '',
            }
        },
        async mounted(){

            this.buildings = await d3.json('datasets/maps/building.json')
            this.map = getMap(this.buildings, this.resActive, this.commActive, this.schActive)

        },
        methods: {
            addFeature(){  
                var data = []
                switch(this.featureToShow){
                    case "rent":
                        data = this.resData.map(d => {
                            return { value: d.rent, x: d.x, y: d.y }
                        })
                    break
                    case "occupancy":
                        data = this.resData.map(d => {
                            return { value: d.occupancy, x: d.x, y: d.y }
                        })
                    break
                    case "rooms":
                        data = this.resData.map(d => {
                            return { value: d.rooms, x: d.x, y: d.y }
                        })
                    break
                    case "units":
                        data = this.resData.map(d => {
                            return { value: d.totalUnits, x: d.x, y: d.y }
                        })
                    break
                }
                addFeatureDistributionColor(this.buildings, data)
            },

        },
        watch:{
           featureToShow: function(){
                this.addFeature();
           },
           resData: function(){
                this.addFeature();
            },
           resActive: function(){
                this.map = getMap(this.buildings, this.resActive, this.commActive, this.schActive)
            },
            commActive: function(){
            this.map = getMap(this.buildings, this.resActive, this.commActive, this.schActive)
            },
            schActive: function(){
            this.map = getMap(this.buildings, this.resActive, this.commActive, this.schActive)
            },
        }
    }
</script>
