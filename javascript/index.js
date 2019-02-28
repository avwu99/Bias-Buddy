bi = d3.select("#biasIndicator")
bm = d3.select("#biasMeter")
bias_score = 0
toggleSourcesBtn = d3.select("#toggleSourcesBtn")
sources = d3.selectAll(".source")

//bias meter functions

moveLeft = function() {
    width = bm.attr("width")
    bias_score = Math.max(-100, bias_score-20)
    bix1 = String((bias_score+100)/200*width*0.9 + width*0.05)
    bix2 = String((bias_score+100)/200*width*0.9 + width*0.05 + 20) 
    bix3 = String((bias_score+100)/200*width*0.9 + width*0.05 - 20)
    bi.attr("points",bix1+",75 "+ bix2+",100 "+bix3+",100")
}

moveCenter = function() {
    width = bm.attr("width")
    if (bias_score > 0) {
        bias_score = Math.max(0, bias_score-20)
    } else {
        bias_score = Math.min(0, bias_score+20)
    }
    bix1 = String((bias_score+100)/200*width*0.9 + width*0.05)
    bix2 = String((bias_score+100)/200*width*0.9 + width*0.05 + 20) 
    bix3 = String((bias_score+100)/200*width*0.9 + width*0.05 - 20)
    bi.attr("points",bix1+",75 "+ bix2+",100 "+bix3+",100")
}

moveRight = function() {
    width = bm.attr("width")
    bias_score = Math.min(100, bias_score+20)
    bix1 = String((bias_score+100)/200*width*0.9 + width*0.05)
    bix2 = String((bias_score+100)/200*width*0.9 + width*0.05 + 20) 
    bix3 = String((bias_score+100)/200*width*0.9 + width*0.05 - 20)
    bi.attr("points",bix1+",75 "+ bix2+",100 "+bix3+",100")
}

//other functions

toggleSources = function() {
    if (toggleSourcesBtn.html() != "Hide Sources") {
        toggleSourcesBtn.attr("aria-pressed", "true")
        toggleSourcesBtn.attr("class", "btn btn-secondary text-center active")
        toggleSourcesBtn.html("Hide Sources")
        sources.style("display","block")
    } else {
        toggleSourcesBtn.attr("aria-pressed", "false")
        toggleSourcesBtn.attr("class", "btn btn-secondary text-center")
        toggleSourcesBtn.html("Show Sources")
        sources.style("display","none")
    }
}