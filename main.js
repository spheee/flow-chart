var svg = d3.select("body")
    .append("svg")
    .attr("class", "flowChart")
    .attr("width", 1200)
    .attr("height", 900)

var g = new dagreD3.graphlib.Graph()
    .setGraph({})
    .setDefaultEdgeLabel(function () {
        return {};
    });
var states = [{
        label: "变更机票",
        id: 0,
    }, {
        label: "参数搜索",
        id: 1,
        pid: 0,

    }, {
        id: 2,
        pid: 1,
        label: "响应：查询客票信息",
        shape: "rect",
        class: "predefinition third"
    }, {
        id: 3,
        pid: 2,
        label: "逻辑判断",
        shape: "diamond"
    }, {
        id: 4,
        pid: 3,
        label: "响应：告知旅客",
        description: "航班正常",
        class: "predefinition"
    }, {
        id: 5,
        pid: 3,
        description: "航班取消/延误",
        label: "响应：确认起飞时间",
        class: "predefinition"
    }, {
        id: 6,
        pid: 4,
        // description: "航班取消/延误",
        label: "结束"
    },
    {
        id: 7,
        pid: 5,
        label: "参数搜索",
        class: "predefinition"
    },
    {
        id:8,
        pid:7,
        label:"逻辑判断",
        shape: "diamond"
    },{
        id:9,
        pid:8,
        label:"响应：发送新的航班信息",
        shape:"rect",
        description:"同意",
        class: "predefinition"        
    },{
        id:10,
        pid:8,
        label:"响应：查询新的航班信息",
        shape:"rect",
        description:"不同意",
        class: "predefinition third"        
    },{
        id: 6,
        pid: 9,
        // description: "航班取消/延误",
        label: "结束"
    },{
        id:11,
        pid:10,
        label:"逻辑判断",
        shape:"diamond"
    },
    {
        id:12,
        pid:11,
        description:"无航班或无票",
        label:"响应：告知旅客"
    },
    {
        id:13,
        pid:11,
        description:"无经济舱票",
        label:"响应：告知旅客"
        
    },{
        id:14,
        pid:11,
        label:"经济舱有票可控位",
        label:"响应：跳至确认起飞时间"
    },{
        id: 6,
        pid: 12,
        // description: "航班取消/延误",
        label: "结束"
    }
]

var printedArr = []
states.forEach(function (v) {
    // var value = states[v];
    // value.label = state;
    // debugger

    v.rx = v.ry = 5;
    g.setNode(v.id, v);
    // printedArr.push(new Array().concat(v.id, v.nid))    
    // if (v.nid && v.nid.length > 0) {
    //     for (let index = 0; index < v.nid.length; index++) {
    //         const element = v.nid[index];
    //         g.setEdge(v.id,element,{label:v.description})
    //         console.log(element)

    //     }
    // }
    if (v.pid >= 0) {
        // console.log(v.pid, v.id)
        /**
         * todo:判断
         */
        g.setEdge(v.pid, v.id, {
            label: v.description
        })
    }

});


// g.setEdge(0, 1)

// g.setNode(0, {
//     label: "变更机票",
// });
// g.setNode(1, {
//     label: "参数搜索",
//     shape: "rect",
//     class: "predefinition"
// });

// g.setNode(2, {
//     label: "响应：查询客票信息",
//     shape: "rect",
//     class: "predefinition third"
// });

// g.setNode(3, {
//     label: "逻辑判断",
//     shape: "diamond"
// })

// g.setNode(4, {
//     label: "航班正常",
//     shape: "diamond"
// })

// g.setNode(5, {
//     label: "航班取消/延误",
//     shape: "diamond"
// })

// g.setNode(6,{
//     label:"响应：告知旅客",
//     shape:"rect",
//     class:"predefinition"
// })
// g.setNode(7,{
//     label:"结束",
//     shape:"rect"
// })

// g.setEdge("变更机票", "参数搜索");


// g.setEdge(0, 1)
// g.setEdge(1, 2)
// g.setEdge(2, 3)
// g.setEdge(3,4)
// g.setEdge(3,5)
// g.setEdge(4,6)
// g.setEdge(6,7)


// Create the renderer
var render = new dagreD3.render();

// Set up an SVG group so that we can translate the final graph.
var svg = d3.select("svg"),
    svgGroup = svg.append("g");

// Run the renderer. This is what draws the final graph.
render(d3.select("svg g"), g);

// Center the graph
var xCenterOffset = (svg.attr("width") - g.graph().width) / 2;
svgGroup.attr("transform", "translate(" + xCenterOffset + ", 20)");
svg.attr("height", g.graph().height + 40);
