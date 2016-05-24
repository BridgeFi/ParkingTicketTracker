function fade(view, modeIn){
    if(modeIn){
        view.style.opacity=0;
        console.log("in");

        (function fadeAway(){
            if((view.style.opacity += .05) < 1){
                view.style.visibility="visible";
            }else{
                requestAnimationFrame(fadeAway);
            }
        })();

    }else{
        view.style.opacity=1;
        console.log("out");

        (function fadeAway(){
            if((view.style.opacity -= .05) < 0){
                view.style.visibility="hidden";
            }else{
                requestAnimationFrame(fadeAway);
            }
        })();

    }
}
