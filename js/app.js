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
            var paras=this.artiMaintxt.split('\n');
            var mainTxtHtml="";
            for(var i=0;i<paras.length;i++){
                if(paras[i].trim().length==0)paras[i]='&nbsp;';
                mainTxtHtml+='<p style="white-space: normal; margin: 0px; padding: 0px; box-sizing: border-box;">'+paras[i]+'</p>';
            }
            text=text.replace("<!--MAINTXT-->",mainTxtHtml);
            var resSrcs=this.artiResSrc.split('\n');
            var textSpls=text.split("<!--IMG-->");
            text=textSpls[0];
            for(var i=1;i<textSpls.length;i++){
                if(resSrcs!=null)
                    if(resSrcs.length>i-1)
                        if(resSrcs[i-1]!="")text+='<section  style="box-sizing:border-box;" >' +
                            '<section class="" style="text-align:center;margin-top: 10px;margin-bottom:10px;box-sizing: border-box;">' +
                            '<img class="" data-ratio="0.7765625" data-w="640" src="'+resSrcs[i-1]+'" style="max-width: 100%; vertical-align: middle; box-sizing: border-box;"  />' +
                            '</section>' +
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