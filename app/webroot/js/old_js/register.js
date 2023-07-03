// JavaScript Document

function open_register()
{
	var div ="<div class='register'></div>";
	$(div).appendTo($(document.body));
	var loading ="<div class='register_loading'><img src='"+_url+"/img/loader/metro/preloader-w8-cycle-white.gif' ></div>";
	$(loading).appendTo('.register');
	$('.register').bPopup({
	    easing: 'easeOutBack', //uses jQuery easing plugin
            speed: 450,
            transition: 'slideDown'
        });
	
	$.ajax({
			type:"POST",
			url:_url+'users/register_form',
			data:'',
	
			success:function(response){
				$('.register').html(response).fadeOut(100).fadeIn(1000); 
			}
		}) ;	
}


function check_field()
{
	if($('#register_name').val()==''){
		var error =generate('error',_enter_name,'topRight');
		setTimeout(function() {
	      $.noty.close(error.options.id);
	    }, 5000);
		 
		$('#register_name').css("border", "1px solid red");
		return false;
	}
	else $('#register_name').css("border", "medium none");
	
	if($('#user_name').val()==''){
		var error =generate('error',_enter_user_name,'topRight');
		setTimeout(function() {
	      $.noty.close(error.options.id);
	    }, 5000);
		 
		$('#user_name').css("border", "1px solid red");
		return false;
	}
	else $('#user_name').css("border", "medium none");
	
	var userReg = /^[0-9a-zA-Z_]+$/;
			
	if (!userReg.test( $('#user_name').val() ) ) {
		var error =generate('error',_enter_valid_user_name,'top');
		setTimeout(function() {
	      $.noty.close(error.options.id);
	    }, 10000);
		 
		$('#user_name').css("border", "1px solid red");
		return false;
	}else $('#user_name').css("border", "medium none");
	
	
	if($('#register_email').val()==''){
		var error =generate('error',_enter_email,'topRight');
		setTimeout(function() {
	      $.noty.close(error.options.id);
	    }, 5000);
		 
		$('#register_email').css("border", "1px solid red");
		return false;
	}
	else $('#register_email').css("border", "medium none");
	
	var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
			
	if (!emailReg.test( $('#register_email').val() ) ) {
		var error =generate('error',_enter_valid_email,'topRight');
		setTimeout(function() {
	      $.noty.close(error.options.id);
	    }, 5000);
		 
		$('#register_email').css("border", "1px solid red");
		return false;
	}else $('#register_email').css("border", "medium none");
	
	if($('#password').val()==''){
		var error =generate('error',_enter_password,'topRight');
		setTimeout(function() {
	      $.noty.close(error.options.id);
	    }, 5000);
		 
		$('#password').css("border", "1px solid red");
		return false;
	}
	else $('#password').css("border", "medium none");
	
	if($('#password').val().length<6){
		var error =generate('error',_enter_valid_length,'topRight');
		setTimeout(function() {
	      $.noty.close(error.options.id);
	    }, 5000);
		 
		$('#password').css("border", "1px solid red");
		return false;
	}
	else $('#password').css("border", "medium none");
	
	
	/*if($('#password').val()!=$('#confirm_password').val()){
		var error =generate('error',_not_valid_repassword,'topRight');
		setTimeout(function() {
	      $.noty.close(error.options.id);
	    }, 5000);
		 
		$('#confirm_password').css("border", "1px solid red");
		return false;
	}
	else $('#confirm_password').css("border", "medium none");*/
	
	return true;
}

function check_email(){
 	 
	var email = $('#register_email').val();
	 if(email==''){
		return false;
	}  
 	$.ajax({
			type:"POST",
			url:_url+'users/check_email',
			data:'email='+email,
			dataType: "json",
			success:function(response){
				// hide table row on success
				if(response.success == true) {
					if( response.message )
					  //jQuery('#register_email').validationEngine('showPrompt',response.message, 'pass');
					  var success =generate('success',response.message,'topRight');
						setTimeout(function() {
					      $.noty.close(success.options.id);
					    }, 5000);
					error=true;	
				}
				else 
				 {
					if( response.message )
					 // jQuery('#register_email').validationEngine('showPrompt',response.message,false,'register_email');
					 var error =generate('error',response.message,'topRight');
						setTimeout(function() {
					      $.noty.close(error.options.id);
					    }, 5000);
					error=false; 
				 }
				 					
				// show respsonse message
				if( response.message ) {
					//$('#register_email_message').html( response.message ).show(); 
				} 
			}
		});
	 
	 	
 }

function prev_page()
{
   var currentPage = $("#content .registerForm #end_page");
    $(currentPage).fadeOut(400,function(){
		//currentPage = $(currentPage).prev();
		$("#content .registerForm .pages:first-child").fadeIn(400);
	});
}


function submitForm(aaa)
{
	$(aaa).parent().submit();
}

$(document).ready(		
	function()
	{
      
		
		//home page icons:
		$(".boxes").mouseenter(function(e) {
	        $(".homeIcons .active" ,this).fadeIn(800);
	    });
		$(".boxes").mouseleave(function(e) {
	        $(".homeIcons .active" ,this).fadeOut(800);
	    });
		
		//register form
		
		$("#content .registerForm .pages .next").click(function(e) {
            var currentPage = $("#content .registerForm .pages:first-child");
			if(check_field()){
				$(currentPage).fadeOut(400,function(){
				currentPage = $(currentPage).next();
				$(currentPage).fadeIn(400);	
			  });	
			}						
	    });
		$("#content .registerForm #end_page .prev").click(function(e) {			 
			prev_page();
	    });
		
		/* $("form#UserRegisterForm").submit(function()
			{ 
				 
				if (check_field() ) {
					//UserRegisterForm.submit();
					return true;
				}
				
				return false;
				
			});*/
		 $("form#UserLoginAjaxForm").submit(function() {

				var email = $('#login_email').val();
				var password=$('#login_password').val();
				var login_captcha=$('#login_captcha').val();
				var remember_me = 0;
				
				 			 
				if($('#remember_me').attr('checked')=='checked')	  remember_me = 1;
				
				$('#register_ajax_loader').show();
				 	  
			      $.ajax({
						type:"POST",
						url:_url+'users/login',
						data:'email='+email+'&password='+password+'&remember_me='+remember_me+'&captcha='+login_captcha,
						dataType: "json",
						success:function(response){
							// hide loading image
							 $('#register_ajax_loader').hide();
							
							// hide table row on success
							if(response.success == true) {
								window.location.href=response.url;
								//window.navigate(_url ); 
							}
							if(response.visible_captcha == true) {
								$('#visible_captcha').fadeIn(400);
								$('#visible_captcha_box').fadeIn(400);
							}
												
							// show respsonse message
							if( response.message && response.success ==true) {
								//$('#register_ajax_msg').html( response.message ).show();
								/*var success =generate('success',response.message,'topRight');
								setTimeout(function() {
							      $.noty.close(success.options.id);
							    }, 3000);*/
								$.Zebra_Dialog(response.message, {
											    'type':     'confirmation',
											    'title':    _message,
												'modal': true ,
												'auto_close': 1500 ,
											    'buttons':  [
											                    {caption: _close, callback: function() { }}
											                ]
								});
								
							} 
							
							if( response.message && response.success ==false) {
								//$('#register_ajax_msg').html( response.message ).show();
								/*var error =generate('error',response.message,'topRight');
								setTimeout(function() {
							      $.noty.close(error.options.id);
							    }, 3000);*/
								$.Zebra_Dialog(response.message, {
										    'type':     'error',
										    'title':    _warning,
											'modal': true ,
										    'buttons':  [
										                    {caption: _close, callback: function() { }}
										                ]
							    });
							} 
						}
					});
		  
		 
		
		return false;
	});	

 

 
 

 
 
			 function check_captcha(){
			 	 
				var captcha = $('#captcha').val();
				 if(captcha==''){
					return false;
				}  
			 	$.ajax({
						type:"POST",
						url:_url+'users/check_captcha',
						data:'captcha='+captcha,
						dataType: "json",
						success:function(response){
							// hide table row on success
							if(response.success == true) {
								if( response.message )
								  //jQuery('#captcha').validationEngine('showPrompt',response.message, 'pass');
								error=true;	
							}
							else 
							 {
								if( response.message )
								  jQuery('#captcha').validationEngine('showPrompt',response.message,false,'captcha');
								error=false; 
							 }
							 					
							// show respsonse message
							if( response.message ) {
								//$('#').html( response.message ).show(); 
							} 
						}
					});
					 
				return error;	
			 }
			 
			 $('#captcha').focusout(function(){
				 
				check_captcha();	
			 });
			 
			 function valid_item()
			 {
				if (!check_email()) return false;
				return true;
			 }
			 
			 
			 /* register */
		$("form#UserRegisterForm").submit(function(e) {
		 
	  	e.preventDefault();

		var name = $('#register_name').val();
		var user_name = $('#user_name').val();
		var register_email = $('#register_email').val();
		var password=$('#password').val();
        var captcha=$('#register_captcha').val();

		if (check_field()) {
			
		
		$('.ajax_loader').show();
		 	  
	      $.ajax({
				type:"POST",
				url:_url+'users/ajax_register',
				data:"name="+name+'&register_email='+register_email+'&password='+password+'&user_name='+user_name+'&captcha='+captcha ,
				dataType: "json",
				success:function(response){
					
					if(response.success == true) {
						if( response.message )
						{
							var success =generate('success',response.message,'center');
							setTimeout(function() {
						      $.noty.close(success.options.id);
						    }, 15000);
							setTimeout("location.href = '"+_url+"';", 12000); 
							 
						}
						$('#ajax_result').html(response);
					}
					else 
					 {
						if( response.message )
						  {
						  	if(response.goto_prev_page == true){
                                  prev_page();
                              }
                            var error =generate('error',response.message,'topRight');
							setTimeout(function() {
						      $.noty.close(error.options.id);
						    }, 5000);
						  }
					 }
					 				
				}
			});
		  
		} 
		
		return false;
	});
	
	$('#register_email').focusout(function(){
			check_email();	
		 }); 
	$('#user_name').keypress(function(e){
		if(e.which===32){
			return false;
		}
	})
 
 
 	
	
	  
	
}); 