/*
    项目负责人：赵强
    项目创建日期:2017.7.29
    最新更新:2017.7.31
    修改人员:赵强
    修改日期:
    修改原因:
    修改代码行数区间: 
*/
$(function(){
      var h=$(window).height();

    /* 手机登录 */
      $(".telePhone").height(h+"px"); 

      t=setInterval(function(){
        var chang=$("#username").val().length;
        var yanzheng=$("#checkCode").val().length;
        var sjyz=$("#message").val().length;
        var mima=$("#pwd").val().length;
        if(chang==11){
          $(".code button").css({"pointer-events":"auto","color":"#000","background":"#C1C1C1"});
          $(".code button").click(function(){
            var str=$(".telePhone_down .phone input").val();
            var ret=/^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
            if(ret.test(str)){
              var yanzheng=$(".telePhone .telePhone_down .tel .cod input").val().length;
              if(yanzheng==""){
                $(".shouji").empty();
                $(".shouji").append("<span>图片验证不能为空!</span>");
                $(".shouji").show(10);
                setTimeout(function(){
                  $(".shouji").hide(400);
                },1000);                   
              }else{
                var i=60;
                $(".code button").css({"pointer-events":"none","color":"#bbb","background":"none"});
                var a=setInterval(function() {
                  $(".code button").html("3分钟重新发送");
                  $(".code button").css({"pointer-events":"none","color":"#bbb","background":"none"});
                  i--;
                  if(i<0){
                    $(".code button").css({"pointer-events":"auto","color":"#666","background":"#C1C1C1"});
                    clearInterval(a);
                    $(".code button").html("获取验证码");
                  }
                }, 1000);
                clearInterval(t);
              }
            }else if(str==""){
              $(".shouji").empty();
              $(".shouji").append("<span>电话号不能为空!</span>");
              $(".shouji").show(10);
              setTimeout(function(){
                $(".shouji").hide(400);
              },1000);
            }else{
              $(".shouji").empty();
              $(".shouji").append("<span>电话号输入有误!</span>");
              $(".shouji").show(10);
              setTimeout(function(){
                $(".shouji").hide(400);
              },1000);
            }
          });
        }else{
          $(".code button").css({"pointer-events":"none","color":"#bbb", "background":"none"});
        }
      },1000);

      setInterval(function(){
        $(".sign button").click(function(){
          var chang=$("#username").val().length;
          var yanzheng=$("#checkCode").val().length;
          var sjyz=$("#message").val().length;
          var mima=$("#pwd").val().length;
          if(chang==0){
            $(".shouji").empty();
            $(".shouji").append("<span>电话号不能为空!</span>");
            $(".shouji").show(10);
            setTimeout(function(){
              $(".shouji").hide(400);
            },1000);
          }else if(chang>=12 || chang<=10){
            $(".shouji").empty();
            $(".shouji").append("<span>电话号输入有误!</span>");
            $(".shouji").show(10);
            setTimeout(function(){
              $(".shouji").hide(400);
            },1000);
          }else if(sjyz==0){
            $(".shouji").empty();
            $(".shouji").append("<span>短信验证不能为空!</span>");
            $(".shouji").show(10);
            setTimeout(function(){
              $(".shouji").hide(400);
            },1000);
            return;
          }else if(sjyz>=7 || sjyz<6){
            $(".shouji").empty();
            $(".shouji").append("<span>短信验证有误!</span>");
            $(".shouji").show(10);
            setTimeout(function(){
              $(".shouji").hide(400);
            },1000);
            return;
          }else if(mima==0){
            $(".shouji").empty();
            $(".shouji").append("<span>密码不能为空!</span>");
            $(".shouji").show(10);
            setTimeout(function(){
              $(".shouji").hide(400);
            },1000);
            return;
          }else if(mima<=5 || mima>=12){
            $(".shouji").empty();
            $(".shouji").append("<span>密码不正确!</span>");
            $(".shouji").show(10);
            setTimeout(function(){
              $(".shouji").hide(400);
            },1000);
            return;
          }
        });
      }, 1000);

/*********************************** ajax 验证 **********************************************/
      /* 手机号验证 */
        sure("#username",username);
      /* 短信验证码 */
        sure("#message",message);
      /* 设置密码 */
        sure("#pwd",pwd);

      /*验证方法*/
        function sure(one,two){
            $(one).blur(function(){
                var two = $(one).val();
                $.ajax({
                    url:"",
                    type:"",
                    data:{two:two},
                    success:function(data){
                        //接收后台返回的结果
                        if(data==true){
                            alert("数据正确");
                        }else{
                            alert("数据有误");
                        }
                    },
                    error:function(e){
                        //出错
                        alert("错误！！");
                    }
                });
            });
        };
/*********************************** ajax 验证结束 **********************************************/

    });

    var code; //在全局 定义验证码  
    function createCode() {
      code = "";
      var codeLength = 4;//验证码的长度  
      var checkCode = document.getElementById("checkCode");
      var selectChar = new Array(0, 1, 2, 3, 4, 5, 6, 7, 8, 9);//所有候选组成验证码的字符，当然也可以用中文的  
      for (var i = 0; i < codeLength; i++) {
        var charIndex = Math.floor(Math.random() * 10);
        code += selectChar[charIndex];
      }
      //alert(code);
      if (checkCode) {
        checkCode.className = "code";
        checkCode.value = code;
      }
    }
 
    function validate() {
      var inputCode = document.getElementById("input1").value;
      if (inputCode.length <= 0){
        $(".shouji").empty();
        $(".shouji").append("<span>请输入验证码!</span>");
        $(".shouji").show(10);
        setTimeout(function(){
          $(".shouji").hide(400);
        },1000);
        return;
      }else if (inputCode != code) {
        $(".shouji").empty();
        $(".shouji").append("<span>验证错误!</span>");
        $(".shouji").show(10);
        setTimeout(function(){
          $(".shouji").hide(400);
        },1000);
        return;
        createCode();//刷新验证码  
      }else{
        $(".shouji").empty();
        $(".shouji").append("<span>登录成功!</span>");
        $(".shouji").show(10);
        setTimeout(function(){
          $(".shouji").hide(400);
        },1000);
        return;
      }
    }