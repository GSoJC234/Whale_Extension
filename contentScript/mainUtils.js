var memoBoxIdx = 1;
var folderIdx = 1;
var totalCosts = 0;
var totalHour = 0;
var totalMin = 0;

initialize();

function initialize(){
    $(document).ready( function() {
        $(".memoBox_0").load("../inputform/memoBox.html", function(){
            setSrcDestMemoValue("0");
            $(".memoBox_0").find("#sourceButton").on("click", function(event){
                var source = $(".memoBox_0").find("#source").val();
                createTabMenu(source);
            });
            $(".memoBox_0").find("#destButton").on("click", function(event){
                var dest = $(".memoBox_0").find("#dest").val();
                createTabMenu(dest);
            });
            $(".memoBox_0").find("#cost").on("keyup", function(){
                calculateTotalCost($("#memoContainer")[0]);
            });
            $(".memoBox_0").find("#time_hour").on("keyup", function(){
                calculateTotalHour($("#memoContainer")[0]);
            });
            $(".memoBox_0").find("#time_min").on("keyup", function(){
                calculateTotalMin($("#memoContainer")[0]);
            });
            $(".memoBox_0").find("#createMemo").on("click", function(){
                createMemoBox($(".memoBox_0")[0]);
            });
            $(".memoBox_0").find("#deleteMemo").on("click", function(){ // 처음 메모 삭제 선택
                $( ".delete-error" ).fadeIn( 200 ).delay( 900 ).fadeOut( 300 );
            });
            $(".memoBox_0").find("#subMemoButton").on("click", function(event){ // 처음 메모 삭제 선택
                var type = $(".memoBox_0").find("#subMemoType").val();
                if(type == "false"){
                    $(".memoBox_0").find("#subMemoInput").fadeIn(200);
                    $(".memoBox_0").find("#subMemoType").val("true");
                } else {
                    $(".memoBox_0").find("#subMemoInput").fadeOut(200);
                    $(".memoBox_0").find("#subMemoType").val("false");
                }
            });
        });
        $("#clipBoard").click(function(){
            copyToClipBoard($("#memoContainer")[0]);
        });
        $("#clear").click(function(){
            clearAllMemos($("#memoContainer")[0]);
        });
        $("#save").click(function(){
            updateFolders();
        });
        $("#folderNamseSaveButton").click(function(){
            addFolder();
            $("#addFolderForm").fadeOut(100);
        });
        $("#folderNamseRemoveButton").click(function(){
            removeFolder();
            $("#removeFolderForm").fadeOut(100);
        });
        $("#addFolderButton").click(function(){
            $("#addFolderForm").fadeIn(100);
        });
        $("#removeFolder").click(function(){
            $("#removeFolderForm").fadeIn(100);
        });
        initFolderStructure();
    });
}
function createMemoBox(currElement) {
    var memoBoxDiv = document.createElement('div');
    memoBoxDiv.setAttribute("class", "memoBox_"+(memoBoxIdx));
    currElement.parentNode.insertBefore(memoBoxDiv, currElement.nextSibling);
    $(".memoBox_"+memoBoxIdx).load("../inputform/memoBox.html", function(){
        setSrcDestMemoValue(memoBoxIdx.toString());
        $(".memoBox_"+memoBoxIdx).find("#sourceButton").on("click", function(event){
            var source = $(".memoBox_"+event.target.parentNode.value).find("#source").val();
            createTabMenu(source);
        });
        $(".memoBox_"+memoBoxIdx).find("#destButton").on("click", function(event){
            var dest = $(".memoBox_"+event.target.parentNode.value).find("#dest").val();
            createTabMenu(dest);
        });
        $(".memoBox_"+memoBoxIdx).find("#cost").on("keyup", function(){
            calculateTotalCost(memoBoxDiv.parentNode);
        });
        $(".memoBox_"+memoBoxIdx).find("#time_hour").on("keyup", function(){
            calculateTotalHour(memoBoxDiv.parentNode);
        });
        $(".memoBox_"+memoBoxIdx).find("#time_min").on("keyup", function(){
            calculateTotalMin(memoBoxDiv.parentNode);
        });
        $(".memoBox_"+memoBoxIdx).find("#createMemo").on("click", function(){
            createMemoBox(memoBoxDiv);
        });
        $(".memoBox_"+memoBoxIdx).find("#deleteMemo").on("click", function(){
            deleteMemoBox(memoBoxDiv);
        });
        $(".memoBox_"+memoBoxIdx).find("#subMemoButton").on("click", function(event){ // 처음 메모 삭제 선택
            var type = $(".memoBox_"+event.target.parentNode.value).find("#subMemoType").val();
            if(type == "false"){
                $(".memoBox_"+event.target.parentNode.value).find("#subMemoInput").fadeIn(200);
                $(".memoBox_"+event.target.parentNode.value).find("#subMemoType").val("true");
            } else {
                $(".memoBox_"+event.target.parentNode.value).find("#subMemoInput").fadeOut(200);
                $(".memoBox_"+event.target.parentNode.value).find("#subMemoType").val("false");
            }
        });
        memoBoxIdx += 1;
    });
}

function createMemoBoxWithData(currElement, data) {
    var memoBoxDiv = document.createElement('div');
    console.log("memoBoxIdx : " + memoBoxIdx);
    memoBoxDiv.setAttribute("class", "memoBox_"+(memoBoxIdx));
    currElement.parentNode.insertBefore(memoBoxDiv, currElement.nextSibling);
    $(".memoBox_"+memoBoxIdx).load("../inputform/memoBox.html", function(){
        setSrcDestMemoValue(memoBoxIdx.toString());
        $(".memoBox_"+memoBoxIdx).find("#sourceButton").on("click", function(event){
            var source = $(".memoBox_"+event.target.parentNode.value).find("#source").val();
            createTabMenu(source);
        });
        $(".memoBox_"+memoBoxIdx).find("#destButton").on("click", function(event){
            var dest = $(".memoBox_"+event.target.parentNode.value).find("#dest").val();
            createTabMenu(dest);
        });
        $(".memoBox_"+memoBoxIdx).find("#cost").on("keyup", function(){
            calculateTotalCost(memoBoxDiv.parentNode);
        });
        $(".memoBox_"+memoBoxIdx).find("#time_hour").on("keyup", function(){
            calculateTotalHour(memoBoxDiv.parentNode);
        });
        $(".memoBox_"+memoBoxIdx).find("#time_min").on("keyup", function(){
            calculateTotalMin(memoBoxDiv.parentNode);
        });
        $(".memoBox_"+memoBoxIdx).find("#createMemo").on("click", function(){
            createMemoBox(memoBoxDiv);
        });
        $(".memoBox_"+memoBoxIdx).find("#deleteMemo").on("click", function(){
            deleteMemoBox(memoBoxDiv);
        });
        $(".memoBox_"+memoBoxIdx).find("#subMemoButton").on("click", function(event){ // 처음 메모 삭제 선택
            var type = $(".memoBox_"+event.target.parentNode.value).find("#subMemoType").val();
            if(type == "false"){
                $(".memoBox_"+event.target.parentNode.value).find("#subMemoInput").fadeIn(200);
                $(".memoBox_"+event.target.parentNode.value).find("#subMemoType").val("true");
            } else {
                $(".memoBox_"+event.target.parentNode.value).find("#subMemoInput").fadeOut(200);
                $(".memoBox_"+event.target.parentNode.value).find("#subMemoType").val("false");
            }
        });
        $(".memoBox_"+memoBoxIdx).find("#source").val(data[0]);
        $(".memoBox_"+memoBoxIdx).find("#dest").val(data[1]);
        $(".memoBox_"+memoBoxIdx).find("#transportation").val(data[2]).attr("selected", "selected");
        $(".memoBox_"+memoBoxIdx).find("#cost").val(data[3]);
        $(".memoBox_"+memoBoxIdx).find("#time_hour").val(data[4]);
        $(".memoBox_"+memoBoxIdx).find("#time_min").val(data[5]);
        $(".memoBox_"+memoBoxIdx).find("#subMemoInput").val(data[6]);
        memoBoxIdx += 1;
    });
}

function setSrcDestMemoValue(idx){
    $(".memoBox_"+idx).find("#sourceButton").attr("value", idx);
    $(".memoBox_"+idx).find("#sourceButtonIcon").attr("value", idx);
    $(".memoBox_"+idx).find("#destButton").attr("value", idx);
    $(".memoBox_"+idx).find("#destButtonIcon").attr("value", idx);
    $(".memoBox_"+idx).find("#subMemoButton").attr("value", idx);
    $(".memoBox_"+idx).find("#subMemoButtonIcon").attr("value", idx);
}

function deleteMemoBox(currElement){
    currElement.parentNode.removeChild(currElement);
    calculateTotalCost($("#memoContainer")[0]);
    calculateTotalHour($("#memoContainer")[0]);
    calculateTotalMin($("#memoContainer")[0]);
}

function createTabMenu(query){

    whale.tabs.create({
        url:"https://map.naver.com/v5/search/"+query+"?",
        selected:true  // We open the tab in the background
    })
    whale.sidebarAction.show();
}

function calculateTotalCost(parentNode){
    var cost = 0;
    for(var i = 0; i < parentNode.children.length; i++){
        var className = parentNode.children[i].className;
        var value = parseInt($("."+className).find("#cost").val());
        if(!isNaN(value)){
            cost += value;
        }
    }

    totalCosts = cost;
    $("#totalCost").text(totalCosts + " 원");
}

function calculateTotalHour(parentNode){
    var time = 0;
    for(var i = 0; i < parentNode.children.length; i++){
        var className = parentNode.children[i].className;
        var hour = parseInt($("."+className).find("#time_hour").val());
        if(!isNaN(hour)){
            time += hour;
        }
    }

    totalHour = time;
    totalTime = totalHour * 60 + totalMin;
    $("#totalTime").text(parseInt(totalTime/60) + " 시간 " + parseInt(totalTime%60) + " 분");
}

function calculateTotalMin(parentNode){
    var time = 0;

    for(var i = 0; i < parentNode.children.length; i++){
        var className = parentNode.children[i].className;
        var min = parseInt($("."+className).find("#time_min").val());
        if(!isNaN(min)){
            time += min;
        }
    }

    totalMin = time;
    totalTime = totalHour * 60 + totalMin;
    $("#totalTime").text(parseInt(totalTime/60) + " 시간 " + parseInt(totalTime%60) + " 분");
}

function copyToClipBoard(parentNode){
    var temp = document.createElement("textarea");
    document.body.appendChild(temp);
    temp.value = transformMemoIntoString(parentNode);
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
    //$( ".copy-success" ).fadeIn( 200 ).delay( 900 ).fadeOut( 300 );
}

function transformMemoIntoString(parentNode){
    var totalTime = totalHour * 60 + totalMin;
    var str = "총 경유지 수 : " + parseInt(parentNode.children.length) + "\n" + "총 비용 : " + totalCosts +"\n" + "총 시간 : " + parseInt(totalTime/60) + " 시간 " + parseInt(totalTime%60) + " 분 \n\n";

    for(var i = 0; i < parentNode.children.length; i++){
        var className = parentNode.children[i].className;
        var source = $("."+className).find("#source").val();
        var dest = $("."+className).find("#dest").val();
        var transport = $("."+className).find("#transportation").val();
        var cost = $("."+className).find("#cost").val();
        var hour = $("."+className).find("#time_hour").val();
        var min = $("."+className).find("#time_min").val();
        var subMemo = $("."+className).find("#subMemoInput").val();

        str += "출발지 : " + source + "\n" + "도착지 : " + dest + "\n" + "이동수단 : " + transport + "\n" + "비용 : " + cost + "\n" + "시간 : " + hour + " 시간 " + min + " 분 " + "\n"+"간단 메모 : "  + subMemo + "\n\n";
    }

    return str;
}

function clearAllMemos(parentNode){

    $(".memoBox_0").find("#source").val("");
    $(".memoBox_0").find("#dest").val("");
    $(".memoBox_0").find("#transportation").val("기타").attr("selected", "selected");
    $(".memoBox_0").find("#cost").val("");
    $(".memoBox_0").find("#time_hour").val("");
    $(".memoBox_0").find("#time_min").val("");
    $(".memoBox_0").find("#subMemoInput").val("");

    for(var i = 1; i < parentNode.children.length; i++){
        deleteMemoBox(parentNode.children[i]);
    }
    memoBoxIdx = 1;
    calculateTotalCost($("#memoContainer")[0]);
    calculateTotalHour($("#memoContainer")[0]);
    calculateTotalMin($("#memoContainer")[0]);
}

function transformMemoIntoSaveData(parentNode){
    var str = $("#memoTitle").val()+"\n";
    for(var i = 0; i < parentNode.children.length; i++){
        var className = parentNode.children[i].className;
        var source = $("."+className).find("#source").val();
        var dest = $("."+className).find("#dest").val();
        var transport = $("."+className).find("#transportation").val();
        var cost = $("."+className).find("#cost").val();
        var hour = $("."+className).find("#time_hour").val();
        var min = $("."+className).find("#time_min").val();
        var subMemo = $("."+className).find("#subMemoInput").val();
        str += source + " " + dest +" " + transport + " " + cost + " " + hour + " " + min + " " + subMemo + "\n";
    }
    return str;
}

function updateFolders(){
    var parentNode = $("#all_folder_list")[0];
    $("#select-save-folder").empty();
    for(var idx = 0; idx < parentNode.children.length-3; idx++){
        var title = parentNode.children[idx].children[0].innerText;
        $("#select-save-folder").append("<option value='"+title+"'>"+title+"</option>");
    }
}

function defaultMemoKey(folderName){
    var count = 1;
    var parentNode = getFolderNodeFromName(folderName);
    for(var idx = 0; idx < parentNode.children[1].children.length; idx++){
        var memoTitle = parentNode.children[1].children[idx].innerText.trim();
        if(memoTitle.match("나의 일정-").length > 0){
            count++;
        }
    }
    return "나의 일정-"+count;
}

function saveMemos(parentNode, folderName){
    var memoObject = {};
    var memoKey = $("#memoTitle").val();
    if(memoKey.length == 0)
        memoKey = defaultMemoKey(folderName);
    var value = transformMemoIntoSaveData(parentNode);
    memoObject[memoKey] = value;


    whale.storage.sync.get(memoKey, function(result){
        if(Object.keys(result).length == 0){
            whale.storage.sync.set(memoObject, function() {
                var parentNode = getFolderNodeFromName(folderName).children[1];
                var menuElement = document.createElement('li');
                menuElement.innerHTML = "<a href=\"#\"> <img src=\"/images/folder_sub.png\" width=\"12px\" hegith=\"12px\">  "+ memoKey +"</a></li>";
                menuElement.onclick = function(){
                    loadMemos(memoKey);
                };
                console.log(menuElement);
                console.log(parentNode);
                parentNode.insertBefore(menuElement, parentNode.lastChild);
                updateFolderStructure();
            });
        }
        else {
            whale.storage.sync.remove(memoKey, function(result){
                var parentNode = getFolderNodeFromName(folderName).children[1];
                for(var idx = 0; idx < parentNode.children.length; idx++){
                    var removedTitle = parentNode.children[idx].innerText;
                    if(removedTitle.trim() == memoKey.trim()){
                        parentNode.removeChild(parentNode.children[idx]);
                    }
                }
                whale.storage.sync.set(memoObject, function() {
                    var parentNode = getFolderNodeFromName(folderName).children[1];
                    var menuElement = document.createElement('li');
                    menuElement.innerHTML = "<a href=\"#\"> <img src=\"/images/folder_sub.png\" width=\"12px\" hegith=\"12px\">  "+ memoKey +"</a></li>";
                    menuElement.onclick = function(){
                        loadMemos(memoKey);
                    };
                    console.log(menuElement);
                    console.log(parentNode);
                    parentNode.insertBefore(menuElement, parentNode.lastChild);
                    updateFolderStructure();
                });
            });
        }
    });


}

function loadMemos(memoKey){
    whale.storage.sync.get(memoKey, function(result) {
        var value = result[memoKey];
        clearAllMemos($("#memoContainer")[0]);

        var title = value.split("\n")[0];
        $("#memoTitle").val(title);

        var firstMemoBox = value.split("\n")[1];

        $(".memoBox_0").find("#source").val(firstMemoBox.split(" ")[0]);
        $(".memoBox_0").find("#dest").val(firstMemoBox.split(" ")[1]);
        $(".memoBox_0").find("#transportation").val(firstMemoBox.split(" ")[2]).attr("selected", "selected");
        $(".memoBox_0").find("#cost").val(firstMemoBox.split(" ")[3]);
        $(".memoBox_0").find("#time_hour").val(firstMemoBox.split(" ")[4]);
        $(".memoBox_0").find("#time_min").val(firstMemoBox.split(" ")[5]);
        $(".memoBox_0").find("#subMemoInput").val(firstMemoBox.split(" ")[6]);

        var numMemo = value.split("\n").length;
        for(var i = 3; i < numMemo ; i++){
            var memoBox = value.split("\n")[i-1];
            var parentNode = $("#memoContainer")[0];
            createMemoBoxWithData(parentNode.children[i-3], memoBox.split(" "));
        }
        calculateTotalCost($("#memoContainer")[0]);
        calculateTotalHour($("#memoContainer")[0]);
        calculateTotalMin($("#memoContainer")[0]);
    });
}

function updateFolderStructure(){

    var parentNode = $("#all_folder_list")[0];

    var allFolder = {};
    var allFolderKey = "All_Folder";
    var allFolderValue = new Array();
    for(var idx = 0; idx < parentNode.children.length-3; idx++){
        allFolderValue[idx]=parentNode.children[idx].children[0].innerText.trim();
    }
    allFolder[allFolderKey] = allFolderValue;
    whale.storage.sync.set(allFolder, function(){
        console.log("allFolder[allFolderKey] = " + allFolderValue );
    });

    for(var idx = 0; idx < parentNode.children.length-3; idx++){
        var folder= {};
        var folderKey=parentNode.children[idx].children[0].innerText.toString().trim();
        var folderValue = new Array();
        if(parentNode.children[idx].children[1] != undefined){
            for(var idx2 = 0; idx2 < parentNode.children[idx].children[1].childElementCount; idx2++){
                folderValue[idx2] = parentNode.children[idx].children[1].children[idx2].innerText.toString().trim();
            }
        }
        folder[folderKey] = folderValue;
        console.log("folderKey, folderValue : " + folderKey +"<>"+folderValue);
        whale.storage.sync.set(folder, function(){

        });
    }
}

function initFolderStructure(){
    var allFolderKey = "All_Folder";
    whale.storage.sync.get(allFolderKey, function(result){
        if(Object.keys(result).length > 0){
            var folderNames = result[allFolderKey];
            console.log(folderNames);
            for(var idx = 0; idx < folderNames.length; idx++){
                var name = folderNames[idx];
                if(name == "기본 폴더" || name == "나의 폴더" || name =="전체 폴더")
                    continue;
                addFolderWithName(name);
            }
            for(var idx = 0; idx < folderNames.length; idx++){
                var folderKey = folderNames[idx];
                folderKey = folderKey.toString().trim();
                console.log("Debug Folder Key : " + folderKey);
                whale.storage.sync.get(folderKey, function(result2){
                    if(Object.keys(result2).length > 0){
                        var folderMemos = result2[Object.keys(result2)[0]];
                        console.log("Debug result2");
                        console.log(result2);
                        console.log(folderMemos);
                        for(var idx2 = 0; idx2 < folderMemos.length; idx2++){
                            var memoKey = folderMemos[idx2];
                            console.log(memoKey);
                            var menuElement = document.createElement('li');
                            menuElement.innerHTML = "<a href=\"#\"> <img src=\"/images/folder_sub.png\" width=\"12px\" hegith=\"12px\">  "+ memoKey +"</a></li>";
                            menuElement.onclick = function(){
                                loadMemos(memoKey);
                            };
                            var parentNode = getFolderNodeFromName(Object.keys(result2)[0]).children[1];
                            parentNode.insertBefore(menuElement, parentNode.lastChild);
                        }
                    }
                });
            }

        }
    });
}

function nonValidFolderName(folderName){
    if(folderName.trim().length == 0){
        return true;
    }
    var parentNode = $("#all_folder_list")[0];
    for(var idx = 0; idx < parentNode.children.length-3; idx++){
        var title = parentNode.children[idx].children[0].innerText;
        if(title.trim().toString() == folderName.trim().toString()) {
            return true;
        }
    }
    return false;
}

function setAcordion(customFolderID){
    var Accordion = function(el, multiple) {
        this.el = el || {};
        // more then one submenu open?
        this.multiple = multiple || false;

        var dropdownlink = $("#"+customFolderID).find('.dropdownlink');
        dropdownlink.on('click',
            { el: this.el, multiple: this.multiple },
            this.dropdown);
    };

    Accordion.prototype.dropdown = function(e) {
        var $el = e.data.el,
            $this = $(this),
            //this is the ul.submenuItems
            $next = $this.next();

        $next.slideToggle();
        $this.parent().toggleClass('open');

        if(!e.data.multiple) {
            //show only one menu at the same time
            $el.find('.submenuItems').not($next).slideUp().parent().removeClass('open');
        }
    };
    var accordion = new Accordion($('.accordion-menu'), false);
}



function addFolder(){
    var folderName = " "+$("#folderNameSaveInput").val();
    if(nonValidFolderName(folderName)){
        $( ".make-same-name-directory" ).fadeIn( 200 ).delay( 900 ).fadeOut( 300 );
        return false;
    }
    var folderDiv = document.createElement('li');
    folderDiv.setAttribute("id", "customFolder_"+folderIdx);


    var dropdownlink = document.createElement('div');
    dropdownlink.setAttribute("class", "dropdownlink");
    var ariaHidden = document.createElement('i');
    ariaHidden.setAttribute('aria-hidden', 'true');
    var ariaHidden2 = document.createElement('i');
    ariaHidden2.setAttribute('aria-hidden', 'true');
    var text = document.createTextNode(folderName);
    var img = document.createElement('img');
    img.setAttribute("src", "/images/folder_main.png");
    img.setAttribute("width", "27px");
    img.setAttribute("height", "27px");
    dropdownlink.insertBefore(ariaHidden, null);
    dropdownlink.insertBefore(img, null);
    dropdownlink.insertBefore(text, null);
    dropdownlink.insertBefore(ariaHidden2, null);

    var submenuItems = document.createElement('ul');
    submenuItems.setAttribute('class', 'submenuItems');


    folderDiv.insertBefore(dropdownlink, null);
    folderDiv.insertBefore(submenuItems, null);

    var parentNode = $("#all_folder_list")[0];
    parentNode.insertBefore(folderDiv, $("#my_folder")[0]);
    setAcordion("customFolder_"+folderIdx);
    folderIdx++;
    updateFolderStructure();
    $( ".make-directory" ).fadeIn( 200 ).delay( 900 ).fadeOut( 300 );
}

function addFolderWithName(folderName){
    var folderDiv = document.createElement('li');
    folderDiv.setAttribute("id", "customFolder_"+folderIdx);


    var dropdownlink = document.createElement('div');
    dropdownlink.setAttribute("class", "dropdownlink");
    var ariaHidden = document.createElement('i');
    ariaHidden.setAttribute('aria-hidden', 'true');
    var ariaHidden2 = document.createElement('i');
    ariaHidden2.setAttribute('aria-hidden', 'true');
    var text = document.createTextNode(folderName);
    var img = document.createElement('img');
    img.setAttribute("src", "/images/folder_main.png");
    img.setAttribute("width", "27px");
    img.setAttribute("height", "27px");
    dropdownlink.insertBefore(ariaHidden, null);
    dropdownlink.insertBefore(img, null);
    dropdownlink.insertBefore(text, null);
    dropdownlink.insertBefore(ariaHidden2, null);

    var submenuItems = document.createElement('ul');
    submenuItems.setAttribute('class', 'submenuItems');


    folderDiv.insertBefore(dropdownlink, null);
    folderDiv.insertBefore(submenuItems, null);

    var parentNode = $("#all_folder_list")[0];
    parentNode.insertBefore(folderDiv, $("#my_folder")[0]);
    setAcordion("customFolder_"+folderIdx);
    folderIdx++;
}

function getFolderNodeFromName(folderName){
    var parentNode = $("#all_folder_list")[0];
    for(var idx = 0; idx < parentNode.children.length-3; idx++){
        var title = parentNode.children[idx].children[0].innerText;
        if(title.trim().toString() == folderName.trim().toString()){
            return parentNode.children[idx];
        }
    }
}

function removeFolder(){
    var folderName = $("#folderNameRemoveInput").val();
    var parentNode = $("#all_folder_list")[0];
    for(var idx = 0; idx < parentNode.children.length-3; idx++){
        var title = parentNode.children[idx].children[0].innerText;
        if(title.trim().toString() == folderName.trim().toString()){
            parentNode.removeChild(parentNode.children[idx]);
            folderIdx--;
            break;
        }
    }
}



/* SELECT-REMOVE 신규 기능 */
function makeSelectFolderListTag(){
    var parentFolderNode = $("#all_folder_list")[0];
    var folderName = "";
    var folderSelectTag = "<select id=\"remove-select\">";
    for(var idx = 0; idx < parentFolderNode.children.length-3; idx++){
        folderName = parentFolderNode.children[idx].children[0].innerText.trim();
        folderSelectTag += "<option value=\"" + folderName + "\">";
        folderSelectTag += folderName;
        folderSelectTag += "</option>"
    }
    folderSelectTag += "</select>";
    $("#folder-select-div").append(folderSelectTag); 
}


// 폴더 삭제 창 -> SELECT 박스 생성 
$( "#removeFolder-v2" ).click(function() {
    makeSelectFolderListTag();
    //$("#folder-select-div").append(folderSelectTag); 
});


// 팝업창 [폴더 삭제]  -> 폴더 삭제 Action
$( ".folder-remove-ok" ).click(function() {
    var folderName = $("#remove-select option:selected").val()
    var parentNode = $("#all_folder_list")[0];
    for(var idx = 1; idx < parentNode.children.length-4; idx++){
        var title = parentNode.children[idx].children[0].innerText;
        if(title.trim().toString() == folderName.trim().toString()){
            parentNode.removeChild(parentNode.children[idx]);
            updateFolderStructure();
            $( ".remove-directory" ).fadeIn( 200 ).delay( 900 ).fadeOut( 300 );
            break;
        }
    }
    
    $("#remove-select").remove();
    makeSelectFolderListTag();
});


// 아코디언 -> [폴더 삭제] 버튼 클릭했을 때
$( "#removeFolder-v2" ).click(function() {
    $('#overlay, #overlay-over-sidebar').fadeIn(100);
    $('.folder-remove-info-popup').fadeIn(200);
});

// 팝업창 -> [취소] 버튼 클릭했을 때
$( ".folder-remove-cancel" ).click(function() {
    $('#overlay, #overlay-over-sidebar').fadeOut(100);
    $('.folder-remove-info-popup').fadeOut(200);
    $("#remove-select").remove();
});

// 팝업창 -> 검은 색깔을 클릭했을 때 
$( "#overlay-over-sidebar" ).click(function() {
    $('#overlay, #overlay-over-sidebar').fadeOut(100);
    $('.folder-remove-info-popup').fadeOut(200);
    $("#remove-select").remove();
});
/* END SELECT-REMOVE 신규 기능 */