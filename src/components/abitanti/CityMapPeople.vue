<template>
    <div>
        <svg id="map">
        </svg>
    </div>
</template>

<script>
    import * as d3 from 'd3'

    function getMap(buildings, { width = 750, height = 600, scale = 500000} = {}) {
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
            .style("fill", '#bbb');

        svg.append("g").attr("id",'feature')

        return {
            width,
            height,
            svg,
            projection,
            path
        };
    }

    // function addApartments( buildings, data, { width = 750, height = 600, scale = 500000} = {}){
        
    //     const svg = d3.select('#map')

    //     const projection = d3.geoIdentity()
    //         .reflectY(true)
    //         .fitSize([width, height], buildings)

    //     const path = d3.geoPath()
    //         .projection(projection);

    //         const color = d3.scaleOrdinal(d3.schemeTableau10);

    //     svg.selectAll("circle.geometry.coordinates")
    //         .data(data.features)
    //         .join("circle")
    //         .attr("d", path)
    //         .attr("cx", function (d) { return projection(d.geometry.coordinates)[0]; })
    //         .attr("cy", function (d) { return projection(d.geometry.coordinates)[1]; })
    //         .attr("r", "2px")
    //         .attr("fill", function (d) { return color((d.properties.group)); });     
    // }

    function addFeatureDistributionColor(buildings, data, dtype, { width = 750, height = 600, scale = 500000} = {}){
        
        d3.select('#feature').selectAll("*").remove();

        const projection = d3.geoIdentity()
            .reflectY(true)
            .fitSize([width, height], buildings)

        const path = d3.geoPath()
            .projection(projection);

        const gfeature = d3.select('#feature')

        var myColor = getScaleColor('linear', data)

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

    function getScaleColor(type, data){
        switch(type){
            case 'linear':
                var max = Math.max(...data.map(d =>{return d.value}))
                var min = Math.min(...data.map(d =>{return d.value}))
                var median = (max+min)/2

                return d3.scaleLinear()
                         .domain([min, median, max])
                         .range(["yellow", "orange", "red"])
            case 'ordinal': 
                return d3.scaleOrdinal(d3.schemeTableau10);
        }
    }

    export default {
        name: "CityMapPeople",
        data: function(){
            return {
                buildings: {},
                apartments: {},
                jobs: {},
                map: {},
            }
        },      
        props:{
            data: {
                type: Array,
                default: []
            },
            dataType: {
                type: String,
                default: 'linear'
            },
        },
        async mounted(){

            this.buildings = await d3.json('datasets/maps/building.json')
            this.apartments = await d3.json('datasets/maps/appartments.json')
            this.jobs = await d3.json('datasets/maps/jobs.json')


            this.map = getMap(this.buildings)
            //addApartments(this.buildings, this.apartments)
            //addApartments(this.buildings, this.jobs)


        },
        methods: {
            addFeature(){
                addFeatureDistributionColor(this.buildings, this.data, this.dataType);
            }
        },
        watch:{
           data: function(){
                this.addFeature();
            },
        }
    }
</script>