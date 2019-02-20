bi = d3.select("#biasIndicator")
moveleft = function() {
    bi.attr("points","350,75 360,90 340,90")
}
movecenter = function() {
    bi.attr("points","450,75 460,90 440,90")
}
moveright = function() {
    bi.attr("points","550,75 560,90 540,90")
}