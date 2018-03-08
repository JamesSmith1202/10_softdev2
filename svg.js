var svg = document.getElementById('mySVG');
var coords = document.getElementById('coords');
var clear = document.getElementById('clear');
var mouseX;
var mouseY;
var radius = 20;
var startColor = "red";
var ns = "http://www.w3.org/2000/svg";

var newCircle = function(x, y, r, color){
    var c = {
      xcor: x,
      ycor: y,
      radius: r,
      circle: document.createElementNS(ns, "circle"),
      color: color,
      changeColor: function(e){
        if(this.getAttribute("fill") == "red"){
          this.setAttribute("fill", "green");
          this.color = "green";
        }
        else {
          e.target.remove(e);
          var circle = newCircle(Math.random() * svg.getBoundingClientRect().width, Math.random() * svg.getBoundingClientRect().height, radius, startColor);
          circle.display();
          coords.value = "["+mouseX+","+mouseY+"]";
        }
        e.stopPropagation();
      },
      display: function(){
        svg.appendChild(this.circle);
      },
      remove: function(e){
        delete e.target;
      }
    }
    c.circle.setAttribute("cx", x);
    c.circle.setAttribute("cy", y);
    c.circle.setAttribute("r", r);
    c.circle.setAttribute("fill", color);
    c.circle.addEventListener("click", c.changeColor, true);

    return c;
}

var placeDot = function(e){
    var bounds = svg.getBoundingClientRect();
    mouseX = e.pageX - bounds.left - scrollX;
    mouseY = e.pageY - bounds.top - scrollY;
    var circle = newCircle(mouseX, mouseY, radius, startColor);
    circle.display();
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
