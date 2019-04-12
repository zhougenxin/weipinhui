
	class foods{
		constructor(){
			this.buy()
		}
		buy(){
			var that = this;
			$.ajax({
		   	url:"json/products.json",
		   	type: "GET",
		   	dataType: "json",
		  	 success: function(res) {	
				that.buyDisplay(res);
				
  			}
		  })
		}
		buyDisplay(res){
			var str = "";
			for (var i=0;i<res.length;i++) {
					if(res[i].productId ==$.cookie("buy")){
						str+=`<div class="size" buyindex="${res[i].productId}">
							<div class="max">
								<img src="${res[i].smallImage}"/>
								<span></span>
								<p></p>
							</div>
							<div class="cont">
								<img src="${res[i].smallImage}"/>	
							</div>
						</div>
						<div class="price">
							<p class="brandShowName">${res[i].brandShowName}</p>
							<div class="productName">${res[i].productName}</div>
							<div class="subTitle">${res[i].subTitle}</div>
							<div class="money">
								单价:￥<span class="marketPrice">${res[i].marketPrice}</span>
								<div class="amount">
									数量:
									<span class="jian">-</span>
									<b>1</b>
									<span class="add">+</span>
								</div>
								<div>婴幼儿奶粉，多买多送，送完为止。</div>
							</div>
							<span class="go">加入购物车</span>
							<a href="shop.html" class="go1">去结算</a>
						</div>`
			}
		}
			$(".shop1").html(str);
			new fn();
			this.foods1();
			this.Num();
		}
		foods1(){
			$(".go").on("click",function(){
				this.ad=$(".amount").children("b").html();
				this.god=$(".size").attr("buyindex");
				if($.cookie("sum") == null){
						this.goods = [{productId:$(".size").attr("buyindex"),num:this.ad}];
						$.cookie("sum",JSON.stringify(this.goods));
					}
					else{
						var onoff = true;
						this.goods = JSON.parse($.cookie("sum"))
						this.goods.forEach((v)=>{
						if(v.productId == $(".size").attr("buyindex")){
							v.num =parseInt(v.num)+parseInt(this.ad);
							onoff = false;
						}
						})
						if(onoff){
						this.goods.push({
							productId:this.god,
							num:this.ad
						})
					}						
					}
					$.cookie("sum",JSON.stringify(this.goods));
					console.log($.cookie("sum"));
			});
			}
		Num(){
				var i = 1;
				$(".amount").children(".jian").on("click",function(){
					if($(".amount").children("b").html() == 1){
						$(".amount").children("b").html(1)
					}else{
						$(".amount").children("b").html(--i)
					}
				})
				$(".amount").children(".add").on("click",function(){
						$(".amount").children("b").html(++i)
				})
			}
		}
		
	new foods();
	function fn(){
				this.box=document.querySelector(".max");
				this.span=this.box.children[1];
				this.cont=document.querySelector(".cont");
				this.img=this.cont.children[0];
				this.init();
			}
			fn.prototype.init=function(){
				var that =this;
				this.box.onmouseover=function(){
					that.show();
				}
				this.box.onmouseout=function(){
					that.hide();
				}
			};
			fn.prototype.show=function(){
				this.span.style.display="block"
				this.cont.style.display="block"
				this.mousemove();
			};
			fn.prototype.hide=function(){
				this.span.style.display="none"
				this.cont.style.display="none"
			};
			fn.prototype.mousemove=function(){
				var that=this;
				this.box.onmousemove=function(ele){
					var e=ele||window.event;
					that.getX(e);
				}
			};
			fn.prototype.getX=function(e){
				this.l=e.offsetX - this.span.offsetWidth/2;
				this.t=e.offsetY - this.span.offsetHeight/2;
				if(this.l<0){
					this.l=0;
				}
				if(this.t<0){
					this.t=0;
				}
				if(this.l>this.box.offsetWidth-this.span.offsetWidth){
					this.l=this.box.offsetWidth-this.span.offsetWidth
				}
				if(this.t>this.box.offsetHeight-this.span.offsetHeight){
					this.t=this.box.offsetHeight-this.span.offsetHeight
				}
				this.span.style.left=this.l+"px"
				this.span.style.top=this.t +"px"
				
				this.x=this.l/(this.box.offsetWidth-this.span.offsetWidth)
				this.y=this.t/(this.box.offsetHeight-this.span.offsetHeight)
				this.move();
			};
			fn.prototype.move=function(){
				this.img.style.left=-this.x * (this.img.offsetWidth-this.cont.offsetWidth)+"px";
				this.img.style.top=-this.y * (this.img.offsetHeight-this.cont.offsetHeight)+"px";
			};
