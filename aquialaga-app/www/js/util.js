function alertify(title, msg, position, wait){
	var body = $('body');
	var id = Math.floor((Math.random()*1000)+1);
	var html = '<div id="'+id+'" class="alert '+position+'">\
                <div class="alert-title">'+title+'</div>\
                <div class="alert-body">'+msg+'</div>\
            </div>'

    body.append(html);
	
	setTimeout(function(){
		$('#'+id).remove();
	},wait||4000);
}

$.fn.button = function(str) {
	var current = $(this);
	if(str == 'loading'){
		current.attr('disabled')
		current.data('reset-text', current.text());
		current.text(current.data('loading-text') || 'loading');
	}else if(str == 'reset'){
		current.text(current.data('reset-text'));
	}
};