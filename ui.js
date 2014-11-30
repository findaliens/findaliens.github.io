function getlist(){S
    xmlhttp=new XMLHttpRequest();
    //xmlhttp.open("GET","http://www.findaliens.com/json/list.json",true);
    all_page_hide();
    document.getElementById("list").innerHTML="";
    document.getElementById("list_page").style.display="block";
    xmlhttp.open("GET","json/list.json",true);
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
                    span.innerHTML=arr[i].title;

                    li.setAttribute("title",arr[i].title);
                    li.setAttribute("link",arr[i].link);
                    li.setAttribute("newsid",arr[i].newsid);
                    li.appendChild(img);
                    li.appendChild(span);

                    li.onclick=function(){
                        getnews(this.getAttribute("newsid"));
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
    //xmlhttp.open("GET","http://www.findaliens.com/json/list.json",true);
    xmlhttp.open("GET","news/"+id+".html",true);
    xmlhttp.send(null);
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4){// 4 = "loaded"
            if (xmlhttp.status==200){// 200 = OK
                document.getElementById("text").innerHTML=xmlhttp.responseText;

                // ...our code here...
            }else{
                alert("Problem retrieving XML data");
            }
        }
    }
}
function init(){
    if(isNaN(parseInt(query("id")))){
        getlist();
    }else{
        var id=(parseInt(query("id")));
        getnews(id);
    }
}
function all_page_hide(){
    var pages=document.getElementsByClassName("page");
    for(i=0;i<pages.length;i++){
        pages[i].style.display="none";
    }
}
function gohome(){
    all_page_hide();
    document.getElementById("text").innerHTML="";
    getlist();
}
function query(name){
    var result = location.search.match(new RegExp("[\?\&]" + name+ "=([^\&]+)","i"));
    if(result == null || result.length < 1){
        return "";
    }
    return result[1];
}
window.addEventListener("load",init,false);