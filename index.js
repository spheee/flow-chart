var svg = d3.select("body")
    .append("svg")
    .attr("width", 1200)
    .attr("height", 900)
var start = svg.append("g")
    .attr("cursor", "pointer")
var rect = start.append("rect").attr("id", "rect1").attr("width", 100).attr("height", 60).attr("fill", "white")
    .attr('rx', 10).attr('ry', 10)
    .on('click', function () {
        setNewRect();
    })

var text =
    start.append("text")
    .attr("id", 'text1')

    .text(function () {
        return 'start'
    })
    .style("font-size", "18")
    .attr('y', function () {
        // debugger
        return d3.select('#rect1').node().getBoundingClientRect().top + d3.select('#rect1').node().getBoundingClientRect().height / 2
    })
    .attr('x', function () {
        return d3.select('#rect1').node().getBoundingClientRect().left + d3.select('#rect1').node().getBoundingClientRect().width / 2
    })
    .attr('dx', function () {

        return -this.getBBox().width / 2
    })
    .on('click', function () {
        setNewRect()
    })

function setNewRect() {
    var rect2 = start.append("rect").attr("id", "rect2").attr("width", 100).attr("height", 60).attr("fill", "white")
        .attr('rx', 10).attr('ry', 10).attr('x', 200)
        .call(d3.drag().on("start", started));
}

function started() {
    var circle = d3.select(this).classed("dragging", true);

    d3.event.on("drag", dragged).on("end", ended);

    function dragged() {
        // debugger
        circle.raise().attr("x",  d3.event.x).attr("y",  d3.event.y);
    }

    function ended() {
        circle.classed("dragging", false);
    }
}
