function ajax(options){
	let {type,url,data,_name,success,error,timeout}=options;
	let timer=null;
	type = type==undefined ? "get" : type;
	data=data==undefined?{}:data;
	timeout=timeout==undefined?10000:timeout;
	var str="";
	for(var i in data){
		str=str+i+"="+data[i]+"&";
	}
	if(type!="jsonp"){
		var ajax=new XMLHttpRequest();
		ajax.onreadystatechange=function(){
			if(ajax.readyState==4&&ajax.status==200){
				success(ajax.responseText);
			}else if(ajax.readyState==4&&ajax.status!=200){
				error(ajax.status)
			}
		}
	}
	switch(type){
		case "get":
		var d=new Date();
		url=url+"?"+str+"_zgxt="+d.getTime();
		ajax.open(type,url);
		ajax.send(null);
		break;
		case "post":
		str=str.slice(0,str.length-1);
		ajax.open(type,url)
		ajax.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
		ajax.send(str);
		break;
		case "jsonp":
		url=url+"?"+str+_name+"="+"abc";
		window.abc=function(res){
			success(res);
			error=function(){};
		}
		setTimeout(function(){
			error("timeout")
			success=function(){};
		},timeout)
		var script=document.createElement("script");
		script.src=url;
		document.body.appendChild(script);
		break;
	}
}