var svg = document.getElementById('mySVG');
var coords = document.getElementById('coords');
var clear = document.getElementById('clear');
var mouseX;
var mouseY;
var radius = 10;
var ns = "http://www.w3.org/2000/svg";

var newCircle = function(x, y, r){
    var c = {
       circle: document.createElementNS(ns, "circle"),
       changeColor: function(e){
            if(this.getAttribute("fill") == "red"){
                this.setAttribute("fill", "green");
            }
            else{
                this.setAttribute("fill", "red");
            }
            e.stopPropagation();
       },
       add: function(){
        svg.appendChild(this.circle);
       },
       deleteSpawn: function(e){
        this.remove();
        var circle = newCircle(Math.random() * svg.getBoundingClientRect().width, Math.random() * svg.getBoundingClientRect().height, radius);
        circle.add();
        coords.value = "["+mouseX+","+mouseY+"]";
        e.stopPropagation();
        }
    }
    c.circle.setAttribute("cx", x);
    c.circle.setAttribute("cy", y);
    c.circle.setAttribute("r", r);
    c.circle.setAttribute("fill", "red");
    c.circle.addEventListener("dblclick", c.deleteSpawn);
    c.circle.addEventListener("click", c.changeColor, true);

    return c;
}

var placeDot = function(e){
    var bounds = svg.getBoundingClientRect();
    mouseX = e.pageX - bounds.left - scrollX;
    mouseY = e.pageY - bounds.top - scrollY;
    var circle = newCircle(mouseX, mouseY, radius);
    circle.add();
    coords.value = "["+mouseX+","+mouseY+"]";
    e.stopPropagation();
}

var clearScreen = function(e){
    while(svg.hasChildNodes()){
        svg.removeChild(svg.firstChild);
    }
}

svg.addEventListener("click", placeDot);
clear.addEventListener("click", clearScreen);