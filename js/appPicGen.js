(function(){

    var app=angular.module("main",[]);
    app.filter('trust2Html', ['$sce',function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    }]);
    app.controller("mainController",['$sce','$q','$scope','$timeout','$filter',function($sce,$q,$scope,$timeout,$filter){
        this.authorName="";
        this.authorTxt="";
        this.coverTxt="";
        this.doRefresh=function () {
            authorName=this.authorName;
            authorTxt=this.authorTxt;
            coverTxt=this.coverTxt;
            doRefresh();
        }
    }]);
})();


window.onload=function () {
    var waitTillLoad=function () {
        //console.log("waiting...");
        var img1 = document.getElementById("imgMpTemp");
        var img2 = document.getElementById("imgCovTemp");
        if(img1.width!=0 && img2.width!=0)doRefresh();
        else setTimeout(waitTillLoad,10);
    };
    setTimeout(waitTillLoad,10);

};

function Id(id){
    return document.getElementById(id);
}
function changeToop(fid,iid){
    var file = Id(fid);
    if(file.value==''){
        //设置默认图片
        Id(iid).src='';
    }else{
        preImg(fid,iid);
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
    setTimeout(doRefresh,10);
}

function doRefresh() {
    {

        var c = document.getElementById("cvsMp");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        var img = document.getElementById("imgPicHead");
        var scaleN = Math.min(img.width, img.height) / 232;
        if (scaleN != 0) {

            console.log(scaleN);

            ctx.scale(1 / scaleN, 1 / scaleN);
            ctx.drawImage(img, 255 * scaleN - img.width / 2, 282 * scaleN - img.height / 2);

            ctx.scale(scaleN, scaleN);
        }
        var img = document.getElementById("imgMpTemp");
        ctx.drawImage(img, 0, 0);
        ctx.fillStyle = '#03125e';
        ctx.font = "56px 'Senty Golden Bell 新蒂金钟体'";
        ctx.fillText(authorName, 498, 239);
        ctx.fillStyle = '#92969c';
        ctx.font = "bold 30px '宋体'";
        ctx.fontStyle = "bold";
        var txtLs = authorTxt.split("\n");
        for (var i = 0; i < txtLs.length; i++)
            ctx.fillText(txtLs[i], 505, 340 + 56 * i);
    }
    {
        var c = document.getElementById("cvsCov");
        var ctx = c.getContext("2d");
        ctx.clearRect(0, 0, c.width, c.height);
        var img = document.getElementById("imgCovBkg");
        var scaleN = Math.min(img.width/900, img.height/500);
        if (scaleN != 0) {
            //console.log(scaleN);
            ctx.scale(1 / scaleN, 1 / scaleN);
            ctx.drawImage(img,0,0);
            ctx.scale(scaleN, scaleN);
        }
        var img = document.getElementById("imgCovTemp");
        ctx.drawImage(img, 0, 0);
        ctx.fillStyle = '#000000';
        var txtLs = coverTxt.split("\n");
        var fontSz=48;
        var yy=true;
        while(yy) {
            yy=false;
            ctx.font = fontSz - (txtLs.length - 1) * 8 + "px 'Senty Golden Bell 新蒂金钟体'";
            for (var i = 0; i < txtLs.length; i++)
                if (ctx.measureText(txtLs[i]).width > 320) {
                    fontSz -= 4;
                    yy = true;
                    break;
                }
        }
        for (var i = 0; i < txtLs.length; i++)
            ctx.fillText(txtLs[i], 570-ctx.measureText(txtLs[i]).width/2, 265-(txtLs.length-1)*4-(48-fontSz)/2-(56-(txtLs.length-1)*8)*(txtLs.length-1)/2 + 56 * i);
    }
}