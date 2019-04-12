;(function(){
	$(function(){
		$.ajax({
		type:"post",
		url:"../json/index2.json",
		dataType:"json",
		success:function(){
//		var str = "";
//		for(var i=0;i<json.length;i++){
//			str += '<div class="box"><img src="'+ json[i].src +'"/><p>'+ json[i].name +'</p><span>'+ json[i].price +'</span></div>';
//		}
//		$("#cont").html("str");
console.log(1)
		}
		})
	})
		
})()
