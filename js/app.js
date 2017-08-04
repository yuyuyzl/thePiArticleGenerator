(function(){
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

        this.getMainHtml=function () {
            var text=this.mainHtml;
            var titleHtml="";
            for(var i=0;i<this.artiTitle.length;i++){
                titleHtml+='<p style="margin: 0px; padding: 0px; box-sizing: border-box;">'+this.artiTitle[i]+'<br style="box-sizing: border-box;"/></p>'
            }
            text=text.replace("<!--TITLE-->",titleHtml);

            var textSpls=this.artiMaintxt.split("**");
            var mainTxt=textSpls[0];
            for(var i=1;i<textSpls.length;i++)mainTxt+=(i%2==0?'</b>':'<b>')+textSpls[i];

            textSpls=mainTxt.split("__");
            var mainTxt=textSpls[0];
            for(var i=1;i<textSpls.length;i++)mainTxt+=(i%2==0?'</em>':'<em style="color: #AAA;font-style: normal">')+textSpls[i];

            textSpls=mainTxt.split("^^");
            var mainTxt=textSpls[0];
            for(var i=1;i<textSpls.length;i++)mainTxt+=(i%2==0?'</em>':'<em style="font-size:12px;font-style: normal">')+textSpls[i];


            mainTxt=mainTxt.replace("\n_PIC\n","<!--IMG-->");

            var paras=mainTxt.split('\n');
            var mainTxtHtml="";
            for(var i=0;i<paras.length;i++){
                if(paras[i].trim().length==0)paras[i]='&nbsp;';
                mainTxtHtml+='<p style="white-space: normal; margin: 0px; padding: 0px; box-sizing: border-box;">'+paras[i]+'</p>';
            }

            text=text.replace("<!--MAINTXT-->",mainTxtHtml);
            var resSrcs=this.artiResSrc.split('\n');
            textSpls=text.split("<!--IMG-->");
            text=textSpls[0];
            for(var i=1;i<textSpls.length;i++){
                if(resSrcs!=null)
                    if(resSrcs.length>i-1)
                        if(resSrcs[i-1]!="")text+=
                            '<section class="" style="text-align:center;margin-top: 24px;margin-bottom:24px;box-sizing: border-box;">' +
                            '<img class="" src="'+resSrcs[i-1]+'" style="vertical-align: middle; box-sizing: border-box; width: 100% !important; height: auto !important; visibility: visible !important;"  />' +
                            '</section>';
                text+=textSpls[i];
            }

            window.localStorage.setItem("artiTitle",this.artiTitle);
            window.localStorage.setItem("artiMaintxt",this.artiMaintxt);
            window.localStorage.setItem("artiResSrc",this.artiResSrc);
            return text;
        }
    }]);
})();