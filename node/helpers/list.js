exports.removeValue = listRemoveValue

function listRemove(list, from, to) {
  var rest = list.slice((to || from) + 1 || this.length);
  list.length = from < 0 ? list.length + from : from;
  return list.push.apply(this, rest)
}

function listRemoveValue(list, value) {
	var i = list.indexOf( value )
	if ( i != -1 ) 
 		listRemove ( list, i )
}

