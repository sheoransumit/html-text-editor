document.onload = onStart();
function onStart(){
	// Get the <div> element with id="notepad"
	var list = document.getElementById("notepad");
	// As long as <div> has a child node, remove it
	while (list.hasChildNodes()) {   
	    list.removeChild(list.firstChild);
	}
	var newPost = document.createElement('p');
	var t = document.createTextNode("Drop text here..");
	// newPost.setAttribute("id", "contentid");
	newPost.setAttribute("class", "para");
	newPost.setAttribute("draggable", "true");
	newPost.setAttribute("ondragstart", "drag(event)");
	newPost.appendChild(t);
	document.getElementById("notepad").appendChild(newPost);
	// Get the <div> element with id="test"
	var testlist = document.getElementById("test");
	// As long as <div> has a child node, remove it
	while (testlist.hasChildNodes()) {   
	    testlist.removeChild(testlist.firstChild);
	}
}
// function runScript(e) {
//     if (e.keyCode == 13) {
//    	    var list = document.getElementsByClassName("para");
// 		for (var i = 0; i < list.length; i++) {
// 			list[i].setAttribute("id", "contentid" + i);
// 		}
// 		addDrop();
//     }
// }
// function addDrop(){
// 	var newItem;
// 	var textnode;
// 	var newlist = document.getElementsByClassName("para");
// 	var paraDiv = document.getElementById("notepad");
// 	for (var j = 0; j <= newlist.length; j++) {
// 		newItem = document.createElement("p");
// 		newItem.id = "droploc" + j;
// 		newItem.setAttribute("ondrop", "drop(event)");
// 		newItem.setAttribute("ondragover", "allowDrop(event)");
// 		// var t = document.createTextNode("Drop text here..");
// 		// newItem.appendChild(t);
// 		paraDiv.insertBefore(newItem, newlist[j]);
// 	}
// }
function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("html", ev.target.id);
}

function drop(ev) {
    ev.preventDefault();
    var data = ev.dataTransfer.getData("html");
    ev.target.appendChild(document.getElementById(data));
}

function makeBold(){
	document.execCommand('bold');
	isBold();
}
function makeUnderline(){
	document.execCommand('underline');
	isUnderlined();
}

function makeRed(){
	if(document.queryCommandValue("ForeColor") == 'rgb(255, 0, 0)'){
    	document.execCommand('foreColor', false, 'black');
    }
    else{
    	document.execCommand('foreColor', false, 'red');
    }
	isRed();
}
function isBold() {
    setInterval(function(){
    	if(document.queryCommandState("bold")){
    		document.getElementById("boldFont").style.fontWeight = "bold";
    	}
    	else{
    		document.getElementById("boldFont").style.fontWeight = "normal";
    	}
 }, 500);
}
function isUnderlined() {
    setInterval(function(){
    	if(document.queryCommandState("underline")){
    		document.getElementById("underlineFont").style.textDecoration = "underline";
    	}
    	else{
    		document.getElementById("underlineFont").style.textDecoration = "none";
    	}
 }, 500);
}
function isRed() {
    setInterval(function(){
    	if(document.queryCommandValue("ForeColor") == 'rgb(255, 0, 0)'){
    		document.getElementById("colorFont").style.color = 'rgb(255, 0, 0)';
    	}
    	else{
    		document.getElementById("colorFont").style.color= 'rgb(0, 0, 0)';
    	}
 }, 500);
}
function post(){
	// var content = document.getElementById("notepad").getElementsByTagName("p");
	var	contentParsed = document.getElementById('notepad');
	console.log(contentParsed);
	contentParsed = getTags(contentParsed);
	// console.log(contentParsed);
	document.getElementById('test').appendChild(contentParsed);
	var content = document.getElementById('test').getElementsByTagName('p');
	console.log(content);
	var newPosting = document.createElement("div");
	newPosting.setAttribute("class", "feeds");
	for(var k=0; k < content.length; k++){
		content[k].removeAttribute("id");
		content[k].removeAttribute("draggable");
		content[k].removeAttribute("ondragstart");
		newPosting.appendChild(content[k]);
		k--;
		//appendChild moves elements and not copies them, therefore array size gets decreased by one every time we append a child.
	}
	document.getElementById("feedPosts").insertBefore(newPosting, document.getElementById("feedPosts").childNodes[0]);
	userFeed();
	postFooter();
	onStart();

}
function userFeed(){
	var feedlist = document.getElementsByClassName("feeds");
	for (var i = 0; i < feedlist.length; i++) {
		feedlist[i].setAttribute("id", "feed" + i);
	}
}
function getTags(htmlBody){
	// console.log(xmlBody);
	// var newParent = document.createElement("div");
// 		newItem.id = "droploc" + j;
// 		newItem.setAttribute("ondrop", "drop(event)");
// 		newItem.setAttribute("ondragover", "allowDrop(event)");
// 		// var t = document.createTextNode("Drop text here..");
	// xmlBody = newParent.appendChild(xmlBody);
	// console.log(xmlBody);
	var	htmlString = htmlBody.innerHTML;
	htmlString = htmlString.replace(/&lt;/g, "<");
	htmlString = htmlString.replace(/&gt;/g, ">");
	htmlString = '<div>' + htmlString + '</div>';
	console.log(htmlString);
	var parser = new DOMParser();
	var doc = parser.parseFromString(htmlString, "text/html");
	console.log(doc.firstChild);
	return doc.firstChild;
	// var x;
	// var str = extractLinks;
 //    var patt1 =  /^<a.*</a>$/g;
 //    var result = str.match(patt1);
 //    var res = str.replace("Microsoft", "W3Schools");
 //    document.getElementById("demo").innerHTML = result;
 //    return x;
 //   	var xmlString = "<div id='foo'><a href='#'>Link</a><span></span></div>"
	// var parser = new DOMParser()
	// var doc = parser.parseFromString(xmlString, "text/xml");
}
function postFooter(){
	// Get the <div> element with id="notepad"
	var footlist = document.getElementById("footnote");
	// As long as <div> has a child node, remove it
	while (footlist.hasChildNodes()) {   
	    footlist.removeChild(footlist.firstChild);
	}
	var foot = document.getElementById('feedPosts');
	foot = foot.cloneNode(true);
	foot = foot.getElementsByTagName('a');
	var newFooterList = document.createElement("ul");
	var newLinkItem;
	for(var l = 0; l < foot.length; l++){
		newLinkItem = document.createElement("li");
	    console.log(foot[l]);
	    newLinkItem.appendChild(foot[l]);
		l--;
		newFooterList.appendChild(newLinkItem);
	}
	var newFooter = document.getElementById('footnote');
	newFooter.appendChild(newFooterList);
}