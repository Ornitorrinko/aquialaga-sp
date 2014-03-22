$(document).ready(function(){
	var content = $('#content'),
		header	= $('#header'),
		footer	= $('#footer');
	

	var height = ($(window).height() - header.height() - footer.height() - 40);
	content.height(height);
});
