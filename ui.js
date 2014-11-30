app_url="http://www.findaliens.com";
function getlist(){
    xmlhttp=new XMLHttpRequest();
    all_page_hide();
    document.getElementById("list").innerHTML="";
    document.getElementById("list_page").style.display="block";
    xmlhttp.open("GET",app_url+"/json/list.json",true);
    xmlhttp.send(null);
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4){// 4 = "loaded"
            if (xmlhttp.status==200){// 200 = OK
                
                var arr=JSON.parse(xmlhttp.responseText);
                for(i=0;i<arr.length;i++){
                    var li=document.createElement("li");
                    var img=document.createElement("img");
                    var span=document.createElement("span");

                    img.src=arr[i].icon;
                    img.style.display="none";
                    img.onload=function(){
                        this.style.display="block";
                    }
                    //arr[i].icon;
                    span.innerHTML=arr[i].title;

                    li.setAttribute("title",arr[i].title);
                    li.setAttribute("link",arr[i].link);
                    li.setAttribute("newsid",arr[i].newsid);
                    li.appendChild(img);
                    li.appendChild(span);

                    if(arr[i].type=="video"){
                        var player_icon_pan=document.createElement("p");

                        var player_icon=document.createElement("b");
                        player_icon_pan.appendChild(player_icon);
                        li.appendChild(player_icon_pan);
                    }
                    li.onclick=function(){
                        //getnews(this.getAttribute("newsid"));
                        window.location.href=app_url+"?id="+this.getAttribute("newsid");
                    }
                    document.getElementById("list").appendChild(li);
                }
            // ...our code here...
            }else{
                alert("Problem retrieving XML data");
            }
        }
    }
}
function getnews(id){
    all_page_hide();
    document.getElementById("news_page").style.display="block";
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET",app_url+"/news/"+id+".html",true);
    xmlhttp.send(null);
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4){// 4 = "loaded"
            if (xmlhttp.status==200){// 200 = OK
                document.getElementById("text").innerHTML=xmlhttp.responseText;
                document.title=document.getElementById("text").getElementsByTagName("h1")[0].innerHTML;
                // ...our code here...
            }else{
                alert("Problem retrieving XML data");
            }
        }
    }
}
function init(){
    app_href=window.location.href;
    app_href=app_href.split("?")[0];
    if(isNaN(parseInt(query("id")))){
        getlist();
    }else{
        var id=(parseInt(query("id")));
        getnews(id);
        document.getElementById("home").style.display="block";
    }
    var img=new Image()
    img.src="http://img.users.51.la/17472754.asp";
}
function all_page_hide(){
    var pages=document.getElementsByClassName("page");
    for(i=0;i<pages.length;i++){
        pages[i].style.display="none";
    }
}
function gohome(){
    window.location.href=app_href;
    //all_page_hide();
    //document.getElementById("text").innerHTML="";
    //getlist();
}
function query(name){
    var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
    if(result == null || result.length < 1){
        return "";
    }
    return result[1];
}
window.addEventListener("load",init,false);