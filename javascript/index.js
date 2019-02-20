bi = d3.select("#biasIndicator")
bm = d3.select("#biasMeter")
bias_score = 0
moveLeft = function() {
    width = bm.attr("width")
    bias_score = Math.max(-100, bias_score-20)
    bix1 = String((bias_score+100)/200*width*0.9 + width*0.05)
    bix2 = String((bias_score+100)/200*width*0.9 + width*0.05 + 10) 
    bix3 = String((bias_score+100)/200*width*0.9 + width*0.05 - 10)
    bi.attr("points",bix1+",75 "+ bix2+",90 "+bix3+",90")
}
moveCenter = function() {
    width = bm.attr("width")
    if (bias_score > 0) {
        bias_score = Math.max(0, bias_score-20)
    } else {
        bias_score = Math.min(0, bias_score+20)
    }
    bix1 = String((bias_score+100)/200*width*0.9 + width*0.05)
    bix2 = String((bias_score+100)/200*width*0.9 + width*0.05 + 10) 
    bix3 = String((bias_score+100)/200*width*0.9 + width*0.05 - 10)
    bi.attr("points",bix1+",75 "+ bix2+",90 "+bix3+",90")
}
moveRight = function() {
    width = bm.attr("width")
    bias_score = Math.min(100, bias_score+20)
    bix1 = String((bias_score+100)/200*width*0.9 + width*0.05)
    bix2 = String((bias_score+100)/200*width*0.9 + width*0.05 + 10) 
    bix3 = String((bias_score+100)/200*width*0.9 + width*0.05 - 10)
    bi.attr("points",bix1+",75 "+ bix2+",90 "+bix3+",90")
}