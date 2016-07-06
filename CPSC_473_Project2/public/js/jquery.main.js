$(function(){
    //original field values

    //reset progress bar
    $('#progress').css('width','0');
    $('#progress_text').html('0% Complete');

    //first_step
    $('form').submit(function(){ return false; });
    $('#submit_first').click(function(){
        //remove classes
        $('#first_step input').removeClass('error').removeClass('valid');

  
        $('#progress_text').html('33% Complete');
        $('#progress').css('width','113px');
                        //slide steps
        $('#first_step').slideUp();
        $('#second_step').slideDown();     
                           
    });


    $('#submit_second').click(function(){
        
               

                //update progress bar
                $('#progress_text').html('66% Complete');
                $('#progress').css('width','226px');
                
                //slide steps
                $('#second_step').slideUp();
                $('#third_step').slideDown();     
        
    });


    $('#submit_third').click(function(){
              
          
        //slide steps
            $('#progress_text').html('100% Complete');
            $('#progress').css('width','339px');
                     

        $('#third_step').slideUp();
        $('#fourth_step').slideDown();            
    });


    $('#submit_fourth').click(function(){
    
    var data=
     {
        username:$("#usernhidden").val(),
        quizzname:$("#quizzname").val(),
        category:$("#categories").val(),
        question1:$("#question1").val(),
        correct1:$("#correct1").val(),
        wrong1:$("#wrong1").val(),
        wrong2:$("#wrong2").val(),
        wrong3:$("#wrong3").val(),
        question2:$("#question2").val(),
        correct2:$("#correct2").val(),
        wrong4:$("#wrong4").val(),
        wrong5:$("#wrong5").val(),
        wrong6:$("#wrong6").val(),
        question3:$("#question3").val(),
        correct3:$("#correct3").val(),
        wrong7:$("#wrong7").val(),
        wrong8:$("#wrong8").val(),
        wrong9:$("#wrong9").val(),
        question4:$("#question4").val(),
        correct4:$("#correct4").val(),
        wrong10:$("#wrong10").val(),
        wrong11:$("#wrong11").val(),
        wrong12:$("#wrong12").val(),
        question5:$("#question5").val(),
        correct5:$("#correct5").val(),
        wrong13:$("#wrong13").val(),
        wrong14:$("#wrong14").val(),
        wrong15:$("#wrong15").val(),
        question6:$("#question6").val(),
        correct6:$("#correct6").val(),
        wrong16:$("#wrong16").val(),
        wrong17:$("#wrong17").val(),
        wrong18:$("#wrong18").val()
    };

      $.ajax({ 
       data: data,
       type:'POST',
       dataType:'json',
       url:"/createQuizz",
       success: function(response) { 
                $( "#content" ).html(" "); 
                
           }
      });
 
});
});