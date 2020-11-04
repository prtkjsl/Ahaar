$("#find").click(function(){

    if($("select").val()==="Restaurants" || $("#quantity").val()===""){
        $("table").html("");
        $("#head1").html("");
        $("#head2").html("");
        $("span").html("InValid Input!");
        return;
    }
    var r = recommend($("select").val(), Number($("#quantity").val()));
    $("table").html("");
    $("span").html("");

    $("#head1").html("<u>Recommended NGO</u>");

    $("#recommend table").append("<thead class='thead-dark'></thead>");
    $("#recommend table thead").append("<tr></tr>");
    $("#recommend table thead tr").append("<th scope='col'>S.No.</th>");
    $("#recommend table thead tr").append("<th scope='col'>NGO</th>");
    $("#recommend table thead tr").append("<th scope='col'>Distance</th>");
    $("#recommend table").append("<tbody id='result'>");

    for(var i=0; i < r.length; i++){
        var sno = i+1;
        $("#result").append("<tr></tr>");
        $("#result tr:last-child").append("<th scope='row'>"+ sno + "</th>");
        $("#result tr:last-child").append("<td>" + r[i] + "</td>");
        $("#result tr:last-child").append("<td>"+ shortDist[restaurants[$("select").val()]][ngo[r[i]]] + " km </td>");
    }

    var s = [];
    var obj = {};
    var value = Object.values(ngo);
    for(var i=0; i<value.length; i++){
        s.push(shortDist[restaurants[$("select").val()]][value[i]]);
        obj[getKeyByValue(ngo, value[i])] = shortDist[restaurants[$("select").val()]][value[i]];
    }
    s = s.sort();
    //console.log(s);
    //console.log(obj);
    var short=[];
    for(var i=0; i<s.length; i++){
        //console.log(shortDist[restaurants[$("select").val()]].indexOf(s[i]));
        short.push(getKeyByValue(obj,s[i]));
    }

    $("#head2").html("<u>Other Available NGOs</u>");

    $("#complete table").append("<thead class='thead-dark'></thead>");
    $("#complete table thead").append("<tr></tr>");
    $("#complete table thead tr").append("<th scope='col'>S.No.</th>");
    $("#complete table thead tr").append("<th scope='col'>NGO</th>");
    $("#complete table thead tr").append("<th scope='col'>Distance</th>");
    $("#complete table").append("<tbody id='all'>");
    
    for(var i=0; i < short.length; i++){
        var sno = i+1;
        $("#all").append("<tr></tr>");
        $("#all tr:last-child").append("<th scope='row'>"+ sno + "</th>");
        $("#all tr:last-child").append("<td>" + short[i] + "</td>");
        $("#all tr:last-child").append("<td>"+ shortDist[restaurants[$("select").val()]][ngo[short[i]]] + " km </td>");
    }

})

var restaurants={R1:0,R2:1,R3:5,R4:6,R5:9};
var ngo={N1:2,N2:3,N3:4,N4:7,N5:8};
var ngoreq={N1:50,N2:50,N3:80,N4:100,N5:140};




var INF = 99999, V = 10; 
    
    function cloneGrid(grid) {
        // Clone the 1st dimension (column)
        const newGrid = [...grid]
        // Clone each row
        newGrid.forEach((row, rowIndex) => newGrid[rowIndex] = [...row])
        return newGrid;
    }	

    function shortestDistance(dist) 
    { 
        var dist = [];  
        dist = cloneGrid(graph);

        for (var k = 0; k < V; k++) { 
            // Pick all vertices as source one by one 
            for (var i = 0; i < V; i++) { 
                // Pick all vertices as destination for the 
                // above picked source 
                for (var j = 0; j < V; j++) 
                { 
                    // If vertex k is on the shortest path from 
                    // i to j, then update the value of dist[i][j] 
                    dist[i][j] = Math.min(dist[i][k] + dist[k][j], dist[i][j]);
                }
            }
        } 
        
        return dist;
    }
    



var graph = [[0,12,INF,INF,INF,INF,INF,INF,INF,INF], 
            [12,0,INF,INF,25,26,INF,INF,INF,INF], 
            [INF, INF, 0, INF,INF,22,INF,INF,INF,INF], 
            [INF,INF,INF,0,INF,INF,8,INF,INF,INF],
            [INF,25,INF,INF,0,INF,13,INF,INF,INF],
            [INF,26,22,INF,INF,0,30,18,36,INF],
            [INF,INF,INF,8,13,30,0,INF,INF,INF],
            [INF,INF,INF,INF,INF,18,INF,0,20,32],
            [INF,INF,INF,INF,INF,36,INF,20,0,INF],
            [INF,INF,INF,INF,INF,INF,INF,32,INF,0]];

var shortDist = shortestDistance(graph);
console.log(shortDist);

function getKeyByValue(object, value) { 
	return Object.keys(object).find(key => object[key] === value); 
} 


function get_key(val){
    var x=[];
    
    for(var key in ngoreq) {
        if(val === ngoreq[key]){
            x.push(key);
        }
    }
   
    return x ;
}

function recommend(res,avl){
    var l = [];
    
    var value = Object.values(ngoreq);
    for(var i=0; i < value.length; i++){
        if(l.length !== 0){
            if(value[i] !== l[0]){
                break;
            }    
        }
            
        if(avl <= value[i]){
            l.push(value[i]);
        }
    }  
    
    var m=INF;
    var r=[];
    
    if(l.length !== 1){
        
        var keys = get_key(l[0]);
        console.log(keys);
        for(var i=0; i < keys.length; i++ ){
            
            if(shortDist[restaurants[res]][ngo[keys[i]]] < m){
                m = shortDist[restaurants[res]][ngo[keys[i]]];
                r[0] = keys[i];
            }
        }
    }
    else{
        r=get_key(l[0]);
    }
    return r;
}

//console.log(recommend("R1",20));
