var width = window.innerWidth,
    height = window.innerHeight;

var svg = d3.select("body")
            .append("svg")
            .attr("width", width)
            .attr("height", height);

var c20 = d3.scale.category20();

var force = d3.layout.force()
              .gravity(0.05)
              .distance(100)
              .charge(-100)
              .size([width, height]);

d3.json("graph-data", function(error, json) {

    if (error) throw error;

    force.nodes(json.nodes)
         .links(json.links)
         .start();

    var link = svg.selectAll(".link")
    .data(json.links)
    .enter().append("line")
        .attr("class", "link");

    var node = svg.selectAll(".node")
    .data(json.nodes)
    .enter().append("g")
        .attr("class", "node")
        .call(force.drag);

    node.append("circle")
        .attr('fill', function(d,i) { return c20(i) })
        .attr("cx", 0)
        .attr("dy", 0)
        .attr("r", 16);

    node.append("text")
        .attr("dx", 18)
        .attr("dy", ".35em")
        .text(function(d) { return d.name });

    force.on("tick", function() {
        link.attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    });

});
