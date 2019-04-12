
class shop{
	constructor(){
		this.SettlementTrade();
	}
	SettlementTrade(){
		var that = this;
		$.ajax({
			type:"get",
			url:"json/products.json",
			dataType: "json",
		  	success: function(res) {
			that.SettlementDsiplay(res);
  			}			
		});
	}
	SettlementDsiplay(res){
		this.good = JSON.parse($.cookie("sum"));
		console.log(this.good);
		console.log(res)
		var str = "";
		for(var i=0;i<res.length;i++){
			for(var j=0;j<this.good.length;j++){
				if(res[i].productId == this.good[j].productId){
					console.log(res[i])
					str+=`<li productId="${res[i].productId}">
					<input type="checkbox" name="but1" class="but1" value="" />
					<img src="${res[i].smallImage}" />
					<p>${res[i].brandName}</p>
					<i>￥${res[i].marketPrice}</i>
					<div class="amount-t">						
					<span class="jian">-</span>
					<b>${this.good[j].num}</b>
					<span class="add">+</span>
					</div>
					<em>${res[i].marketPrice*this.good[j].num}</em>
					<div class="delete" data-remove="${this.good[j].productId}">
						删除
					</div>
				</li>`
				}
			}
		}
		$("#settlement").children("ul").html(str);
	
			var sum = 0;
			var sum2= 0;
		$("#settlement").children("ul").children("li").children("input").on("click",function(){
			if(this.checked){				
				sum += parseInt($(this).parent().children("em").html());
				$(".gather").children("em").html("总金额："+sum+"元")
				sum2 += parseInt($(this).parent().children(".amount-t").children("b").html())
				 $(".gather").children("b").html("总金额："+sum2+"个")
			}else{
				sum-=parseInt($(this).parent().children("em").html());
				$(".gather").children("em").html("总金额："+sum+"元")
				sum2 -= parseInt($(this).parent().children(".amount-t").children("b").html())
				 $(".gather").children("b").html("总金额："+sum2+"个")				
			}
		})
		
		
		
		
		
		
		
		$(".gather").children("span").children("#butAll").on("click",function(){
			if(this.checked){
				$('#butAll')[0].checked=true;
				var arr=$('#settlement').find('li input');
				for(var i=0;i<arr.length;i++){
					arr[i].checked=true;
				}
				this.em = $("#settlement").children("ul").children("li").children("em");
				this.b = $(".amount-t").children("b");
				
				for(var i=0;i<this.em.length;i++){
					sum += parseFloat(this.em[i].innerText);
				}
				for(var i=0;i<this.b.length;i++){
					sum2 += parseFloat(this.b[i].innerText);
				}
				$(".gather").children("em").html("总金额："+sum+"元")
				$(".gather").children("b").html("总数量："+sum2+"个")
				$("#settlement").children("ul").children("li").children("input").attr("checked","checked");
				
			}else{
				$('#settlement').find('li input').removeAttr("checked")
			
//				$(this).children("#butAll").removeAttr("checked")
				$(".gather").children("em").html("总金额：")
				$(".gather").children("b").html("总数量：")
				$("#settlement").children("ul").children("li").children("input").removeAttr("checked");
			}
		});
		this.SettlementNumber();
}
	SettlementNumber(){
	var that = this;
	$("#settlement").children("ul").children("li").children(".amount-t").children(".add").on("click",function(){					       			$(this).parent().children("b").html(parseInt($(this).parent().children("b").html())+1); 
						        $('.add').attr('readonly', false);
						        this.b = $(this).parent().children("b");
						        this.good = JSON.parse($.cookie("sum"))
						        for(var i=0;i<this.good.length;i++){
									if(this.good[i].productId == $(this).parent().parent().attr("productId")){
										break;
									}
								}
						        this.good[i].num=this.b.html();
						        $.cookie("sum",JSON.stringify(this.good))
						       })
	$("#settlement").children("ul").children("li").children(".amount-t").children(".jian").on("click",function(){
						if($(this).parent().children("b").html() == 1){
								 $(this).parent().children("b").html(1)
							}else{
								$(this).parent().children("b").html(parseInt($(this).parent().children("b").html())-1)
							}
							
							 this.b = $(this).parent().children("b");
						        this.good = JSON.parse($.cookie("sum"))
						        for(var i=0;i<this.good.length;i++){
									if(this.good[i].productId == $(this).parent().parent().attr("productId")){
										break;
									}
								}
						        this.good[i].num=this.b.html();
						        $.cookie("sum",JSON.stringify(this.good))
	})

		this.SettlementDelete();
		this.SettlementDeleteAll();
}
	SettlementDelete(){
		var that = this;
		$("#settlement").children("ul").children("li").children(".delete").on("click",function(){
//			console.log($(this))
			that.id = $("#settlement").children("ul").children("li").children(".delete").attr("data-remove");
			$(this).parent().remove();
			that.CookieDelete();
		})
			
	}

	SettlementDeleteAll(){
		var that = this;
		$(".gather").children("i").on("click",function(){
			$(this).parent().parent().children("ul").children("li").remove()
			$.cookie("sum",null)
		})
	}
	CookieDelete(){
		console.log(this.id)
		for(var i=0;i<this.good.length;i++){
			if(this.good[i].productId == this.id){
				break;
			}
		}
		this.good.splice(i,1)
		$.cookie("sum",JSON.stringify(this.good))
	}
}
new shop();
