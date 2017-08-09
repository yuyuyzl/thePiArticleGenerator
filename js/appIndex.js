(function(){

    window.onload=function () {
        var scrolls=document.getElementsByClassName("scrollWrapper");
        console.log(scrolls.length);
        for(var i=0;i<scrolls.length;i++){
            scrolls[i].style.height=document.body.clientHeight-5+'px';
        }
    }

    var app=angular.module("main",[]);
    app.filter('trust2Html', ['$sce',function($sce) {
        return function(val) {
            return $sce.trustAsHtml(val);
        };
    }]);
    app.controller("mainController",['$sce','$q','$scope','$timeout','$filter',function($sce,$q,$scope,$timeout,$filter){
        this.mainHtml=template;
        this.artiTitle=window.localStorage.getItem("artiTitle");
        if(!this.artiTitle)
            this.artiTitle="标题";
        this.artiMaintxt=window.localStorage.getItem("artiMaintxt");
        if(!this.artiMaintxt)
            this.artiMaintxt="";
        this.artiResSrc=window.localStorage.getItem("artiResSrc");
        if(!this.artiResSrc)
            this.artiResSrc="";
        this.artiCredit=window.localStorage.getItem("artiCredit");
        if(!this.artiCredit)
            this.artiCredit="运维 / 鱼";

        this.clear=function (){
            if(confirm("确定要清空全部吗？")) {
                this.artiTitle = "标题";
                this.artiMaintxt = "";
                this.artiResSrc = "";
                this.artiCredit = "运维 / 鱼";
            }
        }
        this.getMainHtml=function () {
            var text=this.mainHtml;
            var titleHtml="";
            for(var i=0;i<this.artiTitle.length;i++){
                titleHtml+='<p style="margin: 0px; padding: 0px; box-sizing: border-box;">'+this.artiTitle[i]+'<br style="box-sizing: border-box;"/></p>'
            }
            text=text.replace("<!--TITLE-->",titleHtml);
            var mainTxt=this.artiMaintxt;
            var pmt="";
            while (pmt!=mainTxt){
                pmt=mainTxt;
                mainTxt=mainTxt.replace(" ","&nbsp;");
            }
            var textSpls=mainTxt.split("**");
            var mainTxt=textSpls[0];
            for(var i=1;i<textSpls.length;i++)mainTxt+=(i%2==0?'</b>':'<b>')+textSpls[i];

            textSpls=mainTxt.split("__");
            var mainTxt=textSpls[0];
            for(var i=1;i<textSpls.length;i++)mainTxt+=(i%2==0?'</em>':'<em style="color: #AAA;font-style: normal">')+textSpls[i];

            textSpls=mainTxt.split("^^");
            var mainTxt=textSpls[0];
            for(var i=1;i<textSpls.length;i++)mainTxt+=(i%2==0?'</em>':'<em style="font-size:12px;font-style: normal">')+textSpls[i];

            var paras=mainTxt.split('\n');
            var mainTxtHtml="";
            for(var i=0;i<paras.length;i++){
                if(paras[i].trim().length==0)paras[i]='&nbsp;';
                if(paras[i].substring(0,4)=='_PIC'){
                    var isrc=paras[i].substring(4);
                    if(isrc!="") {
                        mainTxtHtml +=
                            '<section class="" style="text-align:center;margin-top: 24px;margin-bottom:24px;box-sizing: border-box;">' +
                            '<img class="" src="' + isrc + '" style="vertical-align: middle; box-sizing: border-box; width: 100% !important; height: auto !important; visibility: visible !important;"  />' +
                            '</section>';
                    }else{
                        mainTxtHtml+="\n<!--IMG-->\n"
                    }
                }else
                mainTxtHtml+='<p style="white-space: normal; margin: 0px; padding: 0px; box-sizing: border-box;">'+paras[i]+'</p>';
            }

            var txtCredit=this.artiCredit;
            var creditHtml="";
            for(var i=0;i<this.artiCredit.length;i++)
                if(this.artiCredit[i]==' ')creditHtml+='&nbsp';else creditHtml+=this.artiCredit[i];

            paras=creditHtml.split('\n');
            creditHtml="";
            for(var i=0;i<paras.length;i++){
                if(paras[i].trim().length==0)paras[i]='&nbsp;';
                creditHtml+='<p style="box-sizing: border-box;">'+paras[i]+'</p>';
            }

            text=text.replace("<!--MAINTXT-->",mainTxtHtml);
            text=text.replace("<!--CREDIT-->",creditHtml);
            var resSrcs=this.artiResSrc.split('\n');
            textSpls=text.split("<!--IMG-->");
            text=textSpls[0];
            for(var i=1;i<textSpls.length;i++){
                if (resSrcs != null && resSrcs.length > i - 1 && resSrcs[i - 1] != "") text +=
                    '<section class="" style="text-align:center;margin-top: 24px;margin-bottom:24px;box-sizing: border-box;">' +
                    '<img class="" src="' + resSrcs[i - 1] + '" style="vertical-align: middle; box-sizing: border-box; width: 100% !important; height: auto !important; visibility: visible !important;"  />' +
                    '</section>';
                else text +=
                    '<section class="" style="text-align:center;margin-top: 24px;margin-bottom:24px;box-sizing: border-box;">' +
                    '</section>';
                text+=textSpls[i];
            }

            window.localStorage.setItem("artiTitle",this.artiTitle);
            window.localStorage.setItem("artiMaintxt",this.artiMaintxt);
            window.localStorage.setItem("artiResSrc",this.artiResSrc);
            window.localStorage.setItem("artiCredit",this.artiCredit);
            return text;
        }
    }]);
})();