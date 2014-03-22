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