/**
 * Created by g on 2014/11/21.
 */
exit=0;
function init(){
    document.querySelector("#wrap").setAttribute("class","page_welcome_to_menu");
    document.querySelector("#welcome").setAttribute("class","welcomekeyframe");
    document.querySelector("#logo").setAttribute("class","logokeyframe");

    document.querySelector("#return_to_menu").addEventListener("click",function(){
    	exit=0;
        document.querySelector("#wrap").setAttribute("class","page_page_to_menu");
    });
    plus.key.addEventListener('backbutton',function(){
    	if(exit==1){
    		exit=0;
    		document.querySelector("#wrap").setAttribute("class","page_page_to_menu");
    	}else{
    		if(confirm('确认退出？')){
				plus.runtime.quit();
			}
    	}

	},false);
	document.addEventListener('touchstart',function(){
	    return false;
	},true);
	// 禁止选择
	document.oncontextmenu=function(){
		return false;
	};
}
var start = null;
var element = document.getElementById("SomeElementYouWantToAnimate");
/*
function step(timestamp) {
    if (!start) start = timestamp;
    var progress = timestamp - start;
    element.style.left = Math.min(progress/10, 200) + "px";
    if (progress < 2000) {
        window.requestAnimationFrame(step);
    }
}
window.requestAnimationFrame(step);
*/
function _getmenus(){
	document.querySelector("#menus_ul").innerHTML="";
	var url="http://www.dobezoo.com/wainews/menu.json";
	var xhr = new plus.net.XMLHttpRequest();
	xhr.onreadystatechange = function () {
        switch ( xhr.readyState ) {
            case 4:
                if ( xhr.status == 200 ) {
                	// 保存到本地文件中
                	
                	var txt=xhr.responseText;
                	txt=JSON.parse(txt);
                	for(i=0;i<txt.length;i++){
                		var li=document.createElement("li");
                		var img=document.createElement("img");
                		img.src="http://www.dobezoo.com/wainews/icons/"+txt[i].icon;
                		var span=document.createElement("span");
                		span.innerHTML=txt[i].title;
                		li.appendChild(img);
                		li.appendChild(span);
                		li.setAttribute("link",txt[i].link);
                		li.addEventListener("click",function(){
                			_getlink(this.getAttribute("link"));
				            document.querySelector("#wrap").setAttribute("class","page_menu_to_page");
				        });
                		document.querySelector("#menus_ul").appendChild(li);
                	}
                } else {
                	console.log( "获取升级数据，联网请求失败："+xhr.status );
                }
                break;
            default :
                break;
        }
	}
	xhr.open( "GET", url );
	xhr.send();
}
function _getlink(link){
	exit=1;
	var url="http://www.dobezoo.com/wainews/news/"+link+".html";
	document.querySelector("#text").innerHTML='<div class="logopan"><div class="logo"><img src="res/logo.png" width="100%"></div></div>';
	var xhr = new plus.net.XMLHttpRequest();
	xhr.onreadystatechange = function () {
        switch ( xhr.readyState ) {
            case 4:
                if ( xhr.status == 200 ) {
                	var txt=xhr.responseText;
                	document.querySelector("#text").innerHTML=txt;
                } else {
                	console.log( "获取升级数据，联网请求失败："+xhr.status );
                }
                break;
            default :
                break;
        }
	}
	xhr.open( "GET", url );
	xhr.send();
}
document.addEventListener('plusready', function(){
   init();
   _getmenus();
});