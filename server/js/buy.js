;(function(){
		$.ajax({
		type:"post",
		url:"json/products.json",
		dataType:"json",
		success:function(res){
		var str = "";
		for(var i=0;i<res.length;i++){
			str += `<li class="box" buyindex="${res[i].productId}"><img src="${res[i].smallImage}"/><p>${res[i].productName}</p><span>价格:${res[i].marketPrice}</span></li>`;
		}
		$("#cont").html(str);
	
		$(".box").click(function(){
			$.cookie("buy",$(this).attr("buyindex"))
			$(location).attr('href', './foods.html')
			
		})
		}
		})
})()
