function resize(){
	var content = $('#main'),
		popupButton = $('#btn-popup'),
		positionButton = $('#btn-current-pos'),
		footer 	   = $('#footer');

	var height = ($(window).height() - $('#footer').height()-1);
	content.height(height);
	positionButton.show();
	popupButton.show();
}

$(document).ready(function(){
	resize();
});
