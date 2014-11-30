function getlist(){
    xmlhttp=new XMLHttpRequest();
    xmlhttp.open("GET","http://www.findaliens.com/josn/list.json",false);
    xmlhttp.send();
    xmlhttp.onreadystatechange=function(){
        if (xmlhttp.readyState==4){// 4 = "loaded"
            if (xmlhttp.status==200){// 200 = OK
                alert(xmlhttp.responseText);
            // ...our code here...
            }else{
                alert("Problem retrieving XML data");
            }
        }
    }
}
function init(){
    getlist();
}
window.addEventListener("load",init,false);