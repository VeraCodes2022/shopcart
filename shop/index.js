// 作用：把所有的DOM元素对象及相关的资源全部加载完毕之后，再来实现的时间函数
window.onload=function(){

  // 声明一个点击的缩略图下标
  var bigImgIndex=0;
  var imgssrc=goodsData.imagessrc;

  navPath()
// 路径导航的数据渲染 
    function navPath(){
    // 1. 先获取路径导航的页面元素navPath
        var navPath=document.getElementById('navPath');
        var path=goodsData.path;
        // 2. 再来获取所需要的数据从data.js 中获取 goodsData 
        // 3. 数据是动态产生的相应的DOM 元素也是动态产生的。
        // 4. 遍历数据只创建a 标签，不创建 i标签
        for(var i=0;i<path.length;i++){
            if(i== path.length-1 ){
                    // 创建a标签
            var aNode=document.createElement('a');
            aNode.innerText=path[i].title;
            // 让navPath追加a 
            navPath.appendChild(aNode)
            }else{
                // 创建I标签
                var aNode=document.createElement('a');
                aNode.href=path[i].url;
                aNode.innerText=path[i].title;
                var iNode=document.createElement('i');
                iNode.innerText='/';
            // 让navPath追加a i 
            navPath.appendChild(aNode)
            navPath.appendChild(iNode)}
    }

    }
// 放大镜的移入移出

bigClassBind()

function bigClassBind(){
/*
获取小图框元素，设置移入事件
移出时候 移除蒙版元素，大图框
*/ 
    var smallPic=document.getElementById('smallPic');
    smallPic.onmouseenter=function(){
    
        var leftTop=document.getElementById('leftTop');
        // 2. 动态创建蒙版元素和大图框大图片元素
        var maskDiv=document.createElement('div');
        maskDiv.className='mask';
        var bigPic=document.createElement('div');
        bigPic.id='bigPic';
        // 创建大图片元素
        var bigImg=document.createElement('img');
        bigImg.src=imgssrc[bigImgIndex].b;
        // 大图框追加大图片
        bigPic.appendChild(bigImg);
        smallPic.appendChild(maskDiv);
        // leftTop 元素追加大图框
        leftTop.appendChild(bigPic);
//设置移动事件
        smallPic.onmousemove=function(event){
            // x2= 鼠标点距离浏览器左侧的X轴的距离值 event.clientX
            // 小图框距离浏览器可视距离getBoundingClientRect().left 
            // a的值是蒙版宽度的一半 占位宽 mask.Div.offsetWidth/2
            // mask.style.left = event.clientX- smallPic.getBoundingClientRect().left-mask.Div.offsetWidth/2 +  'px'; 
            // mask.style.top= event.clientY-smallPic.getBoundingClientRect().top- mask.Div.offsetheight/2 +  'px'; 
          
            var left =event.clientX- smallPic.getBoundingClientRect().left - maskDiv.offsetWidth/2;
            var top=event.clientY -smallPic.getBoundingClientRect().top -maskDiv.offsetHeight/2;
              // 判断
              if(left<0){
                left=0
              }else if(left > smallPic.clientWidth-maskDiv.offsetWidth){
                left= smallPic.clientWidth-maskDiv.offsetWidth
              }
              if(top<0){
                top=0
              }else if(top>smallPic.clientHeight-maskDiv.offsetHeight){
                top=smallPic.clientHeight-maskDiv.offsetHeight
              }
            maskDiv.style.left=left+ 'px';
            maskDiv.style.top=top + 'px';
            // 实现了蒙版跟着鼠标点移动后需要将蒙版限定在小图框内。
            // 蒙版在小图框内移动距离/大图片在大图框内移动的距离
            //移动的比例关系=蒙版元素移动的距离/ 大图片元素移动的距离
            var scale=(smallPic.clientWidth-maskDiv.offsetWidth)/(bigImg.offsetWidth-bigPic.clientWidth);
            console.log(scale)
            bigImg.style.left= -left/scale + 'px';
            bigImg.style.top= -top/scale +'px';

        }
        smallPic.onmouseleave=function(){
            // 小图框移除蒙版元素
            smallPic.removeChild(maskDiv)
            leftTop.removeChild(bigPic)
        
        }
        
    }

    thumbnailList()
    // 动态渲染缩略图数据
    function thumbnailList(){
      /* 
      1. 获取ul
      2. 获取datajs 下 goodsData imagessrc 
      3. 遍历数组，根据数组的长度来创建Li元素内存imgage 标签
      */ 
      var ul=document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #piclist ul');
      var imagessrc=goodsData.imagessrc;
      for( var i=0;i<imagessrc.length;i++){
        var li=document.createElement('li')
        var img= document.createElement('img')
        li.appendChild(img)
        img.src=`${imagessrc[i].s}`
        ul.appendChild(li)
      }
    
    }

/*
1. 获取所有的Li元素，并发生循环点击事件
2.点击缩略图需要确定其下标位置 index 来找对应小图和大图src路径的值
*/ 
clickThumbnails()
  function clickThumbnails(){
    var  smallPic_img=document.querySelector('#wrapper #content .contentMain #center #left #leftTop #smallPic img');
    var lis=document.querySelectorAll('#wrapper #content .contentMain #center #left #leftBottom #piclist ul li');
    smallPic_img.src=imgssrc[0].s
    for(var i=0;i<lis.length;i++){
  // 点击事件之前给每一个li 贴一个自定义下标标签,
      lis[i].index=i  /* setAttribute('index',i)*/ 
      lis[i].onclick=function(){
        var idx=this.index   /*事件函数中的this 指向实际发生发生事件的目标对象*/
        bigImgIndex=idx
        smallPic_img.src=imgssrc[idx].s

      }
    }
}
/*
 点击左箭头缩略图向左移动，点击右箭头缩略图向右移动
 1. 先获取左右两边箭头元素
 2. 获取可视div ,ul ,所有li 元素
 3.发生点击事件
*/ 
arrowCarousel()
function arrowCarousel(){
  var leftarrow=document.querySelector('#wrapper #content .contentMain #center #left #leftBottom a:first-child');
  var rightarrow=document.querySelector('#wrapper #content .contentMain #center #left #leftBottom a:last-child');
  var ul=document.querySelector('#wrapper #content .contentMain #center #left #leftBottom #piclist ul');
  var lis=document.querySelectorAll('#wrapper #content .contentMain #center #left #leftBottom #piclist ul li');
  var start=0;
  var step= (lis[0].offsetWidth+20)*2;
  // 终点位置= ul 宽度 - div可视区域的宽度
  var end=(lis.length-5) * (lis[0].offsetWidth+20);

  leftarrow.onclick=function(){
    start-=step;
    if(start<0){start=0}
    ul.style.left= -start+'px'
  }

  rightarrow.onclick=function(){
    start+= step;
    if(start> end){start=end}
    ul.style.left= -start+'px';
  }
}}

rightTopData()
// 商品详情数据的动态渲染,右上半部分内容是根据具体的商品详情来表达的。商品的数据有变化，数据结构不变。
// 模板字符串是可以把标签读出来的。
function rightTopData(){
  var rightTop=document.querySelector('#wrapper #content .contentMain #center #right .rightTop');
  var details=goodsData.goodsDetail;
  var message=`
  <h3>${details.title}</h3>
  <p>推荐选择下方[移动优惠购]，手机套餐齐搞定，不用换号，每月还有话费返</p>
  <div class="pricewrap">
      <div class="pricetop">
          <span>价&nbsp;&nbsp;&nbsp;格</span>
          <div class="price">
              <span>¥</span>
              <p>${details.price}</p>
              <i>降价通知</i>
          </div>
          <p>
              <span>积累评价</span>
              <span>670000</span>
          </p>
      </div>
      <div class="pricebottom">
          <span>促&nbsp;&nbsp;&nbsp;销</span>
          <p>
              <span>${details.promoteSales.type}</span>
              <span>${details.promoteSales.content}</span>
          </p>
      </div>
  </div>
  <div class="support">
      <span>支&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;持</span>
      <p>${details.support}</p>
  </div>
  <div class="address">
      <span>配&nbsp;&nbsp;&nbsp;送&nbsp;&nbsp;&nbsp;至</span>
      <p>${details.address}</p>
  </div>`
  rightTop.innerHTML=message;

}

// 动态渲染商品参数
rightBottomData()
function rightBottomData(){
  var chooseWrap=document.querySelector('#wrapper #content .contentMain #center #right .rightBottom .chooseWrap');
  var crumbData=goodsData.goodsDetail.crumbData;
  for( var i=0;i<crumbData.length;i++){
    var dl=document.createElement('dl');
    var dt=document.createElement('dt');
    dt.innerHTML=crumbData[i].title;
    dl.appendChild(dt);

    var datas=crumbData[i].data;
    for(var j=0;j<datas.length;j++){
      var dd=document.createElement('dd');
      dd.innerHTML=datas[j].type;
      dl.appendChild(dd)
    }
    chooseWrap.appendChild(dl);
  }
}

// 点击选择参数变颜色

clickddBind()
function clickddBind(){
  var dlNodes=document.querySelectorAll('#wrapper #content .contentMain #center #right .rightBottom .chooseWrap dl');
  for( var i=0;i<dlNodes.length;i++){
    (function(){
      var ddNodes=dlNodes[i].querySelectorAll('dd');
      for(var j=0;j<ddNodes.length;j++){
  
        ddNodes[j].onclick=function(){
          for(var k=0;k<ddNodes.length;k++){
              ddNodes[k].style.color='#666';
          }
          this.style.color='red';
        }
      }
    })(i)
  }

}


}