var R = require('ramda');

function merge2Elems(a, b){
	if(!b) return a;
	if(R.type(b) === 'Object'){
		if(R.type(a) !== 'Object') return b;
		var keys = R.keys(b);
		return R.reduce(function(obj, key){
			obj[key] = merge2Elems(a[key], b[key]);
			return obj;
		},R.merge({}, a), keys);
	}

	if(R.type(b) === 'Array'){
		if(R.type(a) !== 'Array') return b;
		return R.concat(a, b);
	}
	return b;
}

module.exports = function(){
	return R.reduce(merge2Elems, null, arguments);
}