(function(){

    var app=angular.module("main",[]);
    app.filter('trust2Html', ['$sce',function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    }]);
    app.controller("mainController",['$sce','$q','$scope','$timeout','$filter',function($sce,$q,$scope,$timeout,$filter){
        this.authorName="良岳";
        this.authorTxt="";
        this.doRefresh=function () {

            var c=document.getElementById("cvsMp");
            var ctx=c.getContext("2d");
            ctx.clearRect(0,0,c.width,c.height);
            var img=document.getElementById("myimg");
            var scaleN=Math.min(img.width,img.height)/232;
            if(scaleN!=0){

                console.log(scaleN);

                ctx.scale(1/scaleN,1/scaleN);
                ctx.drawImage(img,255*scaleN-img.width/2,282*scaleN-img.height/2);

                ctx.scale(scaleN,scaleN);
            }
            var img=document.getElementById("imgMpTemp");
            ctx.drawImage(img,0,0);
            ctx.fillStyle='#03125e';
            ctx.font="56px 'Senty Golden Bell 新蒂金钟体'";
            ctx.fillText(this.authorName,498,239);
            ctx.fillStyle='#92969c';
            ctx.font="bold 30px '宋体'";
            ctx.fontStyle="bold";
            var txtLs=this.authorTxt.split("\n");
            for(var i=0;i<txtLs.length;i++)
                ctx.fillText(txtLs[i],505,340+56*i);
        }
    }]);
})();


function Id(id){
    return document.getElementById(id);
}
function changeToop(){
    var file = Id("file");
    if(file.value==''){
        //设置默认图片
        Id("myimg").src='';
    }else{
        preImg("file","myimg");
    }
}
//获取input[file]图片的url Important
function getFileUrl(fileId) {
    var url;
    var file = Id(fileId);
    var agent = navigator.userAgent;
    if (agent.indexOf("MSIE")>=1) {
        url = file.value;
    } else if(agent.indexOf("Firefox")>0) {
        url = window.URL.createObjectURL(file.files.item(0));
    } else if(agent.indexOf("Chrome")>0) {
        url = window.URL.createObjectURL(file.files.item(0));
    }
    return url;
}
//读取图片后预览
function preImg(fileId,imgId) {
    var imgPre =Id(imgId);
    imgPre.src = getFileUrl(fileId);
}