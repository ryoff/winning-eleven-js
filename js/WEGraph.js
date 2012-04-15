/*
 * jQuery Winning Eleven Graph @VERSION
 *
 * Copyright (c) 2009 ryoff
 */
(function() {
    jQuery.fn.WEGraph = function(config){
        if (!!window.opera&&!window.console) {console={log:opera.postError}};
        var defaults = {
            max        : 100,
            tableWidth : 300,
            limitBreak : 0,
            data       : []
        };
        var opt = jQuery.extend(defaults, config);
        var init = {
            color: {
                1: "#fff",
                2: "#cf0",
                3: "#ff0",
                4: "#f93",
                5: "#f36"
            },
            WEWidth: {
                tableWdt  : opt.tableWidth + "px",
                td1Wdt    : parseInt(opt.tableWidth*0.60) + "px",
                td2Wdt    : parseInt(opt.tableWidth*0.13) + "px",
                td3Wdt    : parseInt(opt.tableWidth*0.23) + "px",
                divOutWdt : parseInt(opt.tableWidth*0.23*0.9) + "px"
            },
            errStatus: 0,
            errMaxId: 8,
            errMsg: {
                1: "data is blank",
                2: "the type of max is needed number",
                4: "the type of tableWidth is needed number",
                8: "limitBreak is 0 or 1"
            }
        };
        function checkOpt() {
            if (!(typeof opt.data == "object" && opt.data.length > 0)) init.errStatus += 1;
            if (!(typeof opt.max == "number" && opt.max > 0)) init.errStatus += 2;
            if (!(typeof opt.tableWidth == "number" && opt.tableWidth > 0)) init.errStatus += 4;
            if (!(typeof opt.limitBreak == "number" && (opt.limitBreak == 1 || opt.limitBreak == 0))) init.errStatus += 8;
            return (init.errStatus > 0) ? false : true ;
        };
        function changeColor(num) {
            var c = 1;
            if (num > parseInt(74*opt.max/100)) c++;
            if (num > parseInt(79*opt.max/100)) c++;
            if (num > parseInt(89*opt.max/100)) c++;
            if (num > parseInt(94*opt.max/100)) c++;
            return c;
        }
        function getDivSize(num, WEGDiv) {
            return parseInt(num*parseInt(WEGDiv.css("width"))/opt.max) + "px";
        };

        function view() {
            var WEGTable = $(document.createElement('table')).addClass("WEGraphTable")
                                                             .css("width", init.WEWidth["tableWdt"]);
            for (var i = 0; i < opt.data.length; i++) {
                var dataPoint = (opt.data[i][1] > opt.max && opt.limitBreak == 0) ? opt.max : opt.data[i][1] ;
                var WEColor = init.color[changeColor(dataPoint)];
                var WEGTr = $(document.createElement('tr')).addClass("WEGraphTr");
                var WEGTd1 = $(document.createElement('td')).html(opt.data[i][0])
                                                            .addClass("WEGraphTd1")
                                                            .css("width", init.WEWidth["td1Wdt"]);
                var WEGTd2 = $(document.createElement('td')).html(dataPoint)
                                                            .addClass("WEGraphTd2")
                                                            .css("width", init.WEWidth["td2Wdt"])
                                                            .css("color", WEColor);
                var WEGTd3 = $(document.createElement('td')).addClass("WEGraphTd3")
                                                            .css("width", init.WEWidth["td3Wdt"]);
                var WEGDiv = $(document.createElement('div')).addClass("WEGraphDivOut")
                                                             .css("width", init.WEWidth["divOutWdt"]);
                var WEGDivIn = $(document.createElement('div')).addClass("WEGraphDivIn")
                                                               .css("width", getDivSize(dataPoint, WEGDiv))
                                                               .css("background", WEColor);

                WEGDiv.append(WEGDivIn);
                WEGTd3.append(WEGDiv);
                WEGTable.append(WEGTr.append(WEGTd1,WEGTd2,WEGTd3));
            };
            return WEGTable;
        };
        function errView() {
            if (init.errStatus < 1) return false; 
            if (init.errStatus >= init.errMaxId) {
                console.log(init.errMsg[init.errMaxId]);
                init.errStatus -= init.errMaxId;
            }
            init.errMaxId /= 2;
            errView();
        }
        if (!checkOpt()) {
            errView();
        }
        this.append(view());
    };
})(jQuery);
