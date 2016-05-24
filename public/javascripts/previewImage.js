
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

    var reader = new FileReader();

    reader.addEventListener("load",function(){
        preview.src=reader.result;

    }, false);
    submit.addEventListener("click", function(){
        animateProgress.style.display="block";
        fadeOut(fileLabel);
        fadeOut(submit);

    },false);
    if(image){
        reader.readAsDataURL(image);
    }
}


$( "input" ).change(function() {
    $( "div.form-preview" ).fadeIn( 500 );

});





