function alertify(title, msg, position, wait){
	var main = $('#main');
	var id = Math.floor((Math.random()*1000)+1);
	var html = '<div id="'+id+'" class="alert '+position+'">\
                <div class="alert-title">'+title+'</div>\
                <div class="alert-body">'+msg+'</div>\
            </div>'

    main.append(html);
	
	setTimeout(function(){
		$('#'+id).remove();
	},wait||4000);
}

$.ajaxSetup({
    cache: false
});

Array.prototype.contains = function(item) {
  	var i = this.length;

	while (i--) {
		if (this[i] === item) {
		  return true;
		}
	}

  	return false;
};