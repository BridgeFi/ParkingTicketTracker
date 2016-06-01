
function fadeOut(view){
    view.style.opacity=1;

    (function fadeAway(){
        if((view.style.opacity -= .1) < 0){
            view.style.visibility="hidden";
        }else{
            requestAnimationFrame(fadeAway);
        }
    })();

}

function previewImage() {

    var image=document.getElementById("fileChooseId").files[0];
    var preview=document.getElementById("imagePreviewId");
    var submit=document.getElementById("submitId");
    var animateProgress=document.getElementById("animateProgressId");
    var fileLabel=document.getElementById("fileLabelId");
    var filePrev=document.getElementById("previewForm");

    var reader = new FileReader();

    reader.onload= function(e){
        preview.src=reader.result;
    }

    if(image){
        reader.readAsDataURL(image);

    }else{
        fade(filePrev,false);
        image.value=null;
    }

    submit.addEventListener("click", function(){
        animateProgress.style.display="block";
        fade(fileLabel,false);
        fade(submit,false);
        fileLabel.value=null;
    },false);

}

$( "input" ).change(function() {
    $( "div.form-preview" ).fadeIn( 500 );
    //this.value=null;

});

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

module.exports.previewImage=previewImage;





