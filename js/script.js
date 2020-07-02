$(function(){
    var limit = 6;
    var page_id = localStorage.getItem('page_id') ? localStorage.getItem('page_id'):1;
    
    if(localStorage.getItem('page_id')){
        getVideo ();
    }
    var offset = limit*(page_id-1);
function getVideo () {
    var info = $('.search').val();
    var data = localStorage.getItem('info')?localStorage.getItem('info'): localStorage.setItem('info', info);
    console.log(data);
    var key='AIzaSyB3Nb9X0_31EQI6EMbD_IioekGmNFxFfIc';
    console.log(info);
    $ . ajax ({ 
                url : `https://www.googleapis.com/youtube/v3/search?key=${key}&q=${data}&maxResults=50`,
                method : 'GET' , 
                dataType:'json',
                success : function (data){
                    for(var j = offset;j<limit+offset; j++ ){
                         var el = $('<div>').attr('class','videoItem');
                        var item =$(`<iframe width="360" height="215" src="https://www.youtube.com/embed/${data.items[j].id.videoId}" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>`);
                        el.append(item);
                        $('.data').append(el);
                    }
                   
                    var rows =  data.items.length;
                     var page_count = Math.ceil(rows/limit);
                    
                    for(var i = 1; i<=page_count; i++){
                        var a= $('<a>').attr('href','').html(i);
                        $('.pagination').append(a);
                    }
                    
                    $(document).on('click','a', function(){
                        var content = $(this).html();
                        localStorage.setItem('page_id',content);
                    })
                    }, 
                error : function ( response ){ 
                        console.log ( " Request Failed " );
                    } 
     }); 
} 


    $('button').on('click', function(){
       getVideo();
    })
})