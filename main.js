(function(scope){
'use strict';

function F(arity, fun, wrapper) {
  wrapper.a = arity;
  wrapper.f = fun;
  return wrapper;
}

function F2(fun) {
  return F(2, fun, function(a) { return function(b) { return fun(a,b); }; })
}
function F3(fun) {
  return F(3, fun, function(a) {
    return function(b) { return function(c) { return fun(a, b, c); }; };
  });
}
function F4(fun) {
  return F(4, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return fun(a, b, c, d); }; }; };
  });
}
function F5(fun) {
  return F(5, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return fun(a, b, c, d, e); }; }; }; };
  });
}
function F6(fun) {
  return F(6, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return fun(a, b, c, d, e, f); }; }; }; }; };
  });
}
function F7(fun) {
  return F(7, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return fun(a, b, c, d, e, f, g); }; }; }; }; }; };
  });
}
function F8(fun) {
  return F(8, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) {
    return fun(a, b, c, d, e, f, g, h); }; }; }; }; }; }; };
  });
}
function F9(fun) {
  return F(9, fun, function(a) { return function(b) { return function(c) {
    return function(d) { return function(e) { return function(f) {
    return function(g) { return function(h) { return function(i) {
    return fun(a, b, c, d, e, f, g, h, i); }; }; }; }; }; }; }; };
  });
}

function A2(fun, a, b) {
  return fun.a === 2 ? fun.f(a, b) : fun(a)(b);
}
function A3(fun, a, b, c) {
  return fun.a === 3 ? fun.f(a, b, c) : fun(a)(b)(c);
}
function A4(fun, a, b, c, d) {
  return fun.a === 4 ? fun.f(a, b, c, d) : fun(a)(b)(c)(d);
}
function A5(fun, a, b, c, d, e) {
  return fun.a === 5 ? fun.f(a, b, c, d, e) : fun(a)(b)(c)(d)(e);
}
function A6(fun, a, b, c, d, e, f) {
  return fun.a === 6 ? fun.f(a, b, c, d, e, f) : fun(a)(b)(c)(d)(e)(f);
}
function A7(fun, a, b, c, d, e, f, g) {
  return fun.a === 7 ? fun.f(a, b, c, d, e, f, g) : fun(a)(b)(c)(d)(e)(f)(g);
}
function A8(fun, a, b, c, d, e, f, g, h) {
  return fun.a === 8 ? fun.f(a, b, c, d, e, f, g, h) : fun(a)(b)(c)(d)(e)(f)(g)(h);
}
function A9(fun, a, b, c, d, e, f, g, h, i) {
  return fun.a === 9 ? fun.f(a, b, c, d, e, f, g, h, i) : fun(a)(b)(c)(d)(e)(f)(g)(h)(i);
}




var _JsArray_empty = [];

function _JsArray_singleton(value)
{
    return [value];
}

function _JsArray_length(array)
{
    return array.length;
}

var _JsArray_initialize = F3(function(size, offset, func)
{
    var result = new Array(size);

    for (var i = 0; i < size; i++)
    {
        result[i] = func(offset + i);
    }

    return result;
});

var _JsArray_initializeFromList = F2(function (max, ls)
{
    var result = new Array(max);

    for (var i = 0; i < max && ls.b; i++)
    {
        result[i] = ls.a;
        ls = ls.b;
    }

    result.length = i;
    return _Utils_Tuple2(result, ls);
});

var _JsArray_unsafeGet = F2(function(index, array)
{
    return array[index];
});

var _JsArray_unsafeSet = F3(function(index, value, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[index] = value;
    return result;
});

var _JsArray_push = F2(function(value, array)
{
    var length = array.length;
    var result = new Array(length + 1);

    for (var i = 0; i < length; i++)
    {
        result[i] = array[i];
    }

    result[length] = value;
    return result;
});

var _JsArray_foldl = F3(function(func, acc, array)
{
    var length = array.length;

    for (var i = 0; i < length; i++)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_foldr = F3(function(func, acc, array)
{
    for (var i = array.length - 1; i >= 0; i--)
    {
        acc = A2(func, array[i], acc);
    }

    return acc;
});

var _JsArray_map = F2(function(func, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = func(array[i]);
    }

    return result;
});

var _JsArray_indexedMap = F3(function(func, offset, array)
{
    var length = array.length;
    var result = new Array(length);

    for (var i = 0; i < length; i++)
    {
        result[i] = A2(func, offset + i, array[i]);
    }

    return result;
});

var _JsArray_slice = F3(function(from, to, array)
{
    return array.slice(from, to);
});

var _JsArray_appendN = F3(function(n, dest, source)
{
    var destLen = dest.length;
    var itemsToCopy = n - destLen;

    if (itemsToCopy > source.length)
    {
        itemsToCopy = source.length;
    }

    var size = destLen + itemsToCopy;
    var result = new Array(size);

    for (var i = 0; i < destLen; i++)
    {
        result[i] = dest[i];
    }

    for (var i = 0; i < itemsToCopy; i++)
    {
        result[i + destLen] = source[i];
    }

    return result;
});



var _List_Nil = { $: 0 };
var _List_Nil_UNUSED = { $: '[]' };

function _List_Cons(hd, tl) { return { $: 1, a: hd, b: tl }; }
function _List_Cons_UNUSED(hd, tl) { return { $: '::', a: hd, b: tl }; }


var _List_cons = F2(_List_Cons);

function _List_fromArray(arr)
{
	var out = _List_Nil;
	for (var i = arr.length; i--; )
	{
		out = _List_Cons(arr[i], out);
	}
	return out;
}

function _List_toArray(xs)
{
	for (var out = []; xs.b; xs = xs.b) // WHILE_CONS
	{
		out.push(xs.a);
	}
	return out;
}

var _List_map2 = F3(function(f, xs, ys)
{
	for (var arr = []; xs.b && ys.b; xs = xs.b, ys = ys.b) // WHILE_CONSES
	{
		arr.push(A2(f, xs.a, ys.a));
	}
	return _List_fromArray(arr);
});

var _List_map3 = F4(function(f, xs, ys, zs)
{
	for (var arr = []; xs.b && ys.b && zs.b; xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A3(f, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map4 = F5(function(f, ws, xs, ys, zs)
{
	for (var arr = []; ws.b && xs.b && ys.b && zs.b; ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A4(f, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_map5 = F6(function(f, vs, ws, xs, ys, zs)
{
	for (var arr = []; vs.b && ws.b && xs.b && ys.b && zs.b; vs = vs.b, ws = ws.b, xs = xs.b, ys = ys.b, zs = zs.b) // WHILE_CONSES
	{
		arr.push(A5(f, vs.a, ws.a, xs.a, ys.a, zs.a));
	}
	return _List_fromArray(arr);
});

var _List_sortBy = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		return _Utils_cmp(f(a), f(b));
	}));
});

var _List_sortWith = F2(function(f, xs)
{
	return _List_fromArray(_List_toArray(xs).sort(function(a, b) {
		var ord = A2(f, a, b);
		return ord === elm$core$Basics$EQ ? 0 : ord === elm$core$Basics$LT ? -1 : 1;
	}));
});



// LOG

var _Debug_log = F2(function(tag, value)
{
	return value;
});

var _Debug_log_UNUSED = F2(function(tag, value)
{
	console.log(tag + ': ' + _Debug_toString(value));
	return value;
});


// TODOS

function _Debug_todo(moduleName, region)
{
	return function(message) {
		_Debug_crash(8, moduleName, region, message);
	};
}

function _Debug_todoCase(moduleName, region, value)
{
	return function(message) {
		_Debug_crash(9, moduleName, region, value, message);
	};
}


// TO STRING

function _Debug_toString(value)
{
	return '<internals>';
}

function _Debug_toString_UNUSED(value)
{
	return _Debug_toAnsiString(false, value);
}

function _Debug_toAnsiString(ansi, value)
{
	if (typeof value === 'function')
	{
		return _Debug_internalColor(ansi, '<function>');
	}

	if (typeof value === 'boolean')
	{
		return _Debug_ctorColor(ansi, value ? 'True' : 'False');
	}

	if (typeof value === 'number')
	{
		return _Debug_numberColor(ansi, value + '');
	}

	if (value instanceof String)
	{
		return _Debug_charColor(ansi, "'" + _Debug_addSlashes(value, true) + "'");
	}

	if (typeof value === 'string')
	{
		return _Debug_stringColor(ansi, '"' + _Debug_addSlashes(value, false) + '"');
	}

	if (typeof value === 'object' && '$' in value)
	{
		var tag = value.$;

		if (typeof tag === 'number')
		{
			return _Debug_internalColor(ansi, '<internals>');
		}

		if (tag[0] === '#')
		{
			var output = [];
			for (var k in value)
			{
				if (k === '$') continue;
				output.push(_Debug_toAnsiString(ansi, value[k]));
			}
			return '(' + output.join(',') + ')';
		}

		if (tag === 'Set_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Set')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Set$toList(value));
		}

		if (tag === 'RBNode_elm_builtin' || tag === 'RBEmpty_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Dict')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Dict$toList(value));
		}

		if (tag === 'Array_elm_builtin')
		{
			return _Debug_ctorColor(ansi, 'Array')
				+ _Debug_fadeColor(ansi, '.fromList') + ' '
				+ _Debug_toAnsiString(ansi, elm$core$Array$toList(value));
		}

		if (tag === '::' || tag === '[]')
		{
			var output = '[';

			value.b && (output += _Debug_toAnsiString(ansi, value.a), value = value.b)

			for (; value.b; value = value.b) // WHILE_CONS
			{
				output += ',' + _Debug_toAnsiString(ansi, value.a);
			}
			return output + ']';
		}

		var output = '';
		for (var i in value)
		{
			if (i === '$') continue;
			var str = _Debug_toAnsiString(ansi, value[i]);
			var c0 = str[0];
			var parenless = c0 === '{' || c0 === '(' || c0 === '[' || c0 === '<' || c0 === '"' || str.indexOf(' ') < 0;
			output += ' ' + (parenless ? str : '(' + str + ')');
		}
		return _Debug_ctorColor(ansi, tag) + output;
	}

	if (typeof value === 'object')
	{
		var output = [];
		for (var key in value)
		{
			var field = key[0] === '_' ? key.slice(1) : key;
			output.push(_Debug_fadeColor(ansi, field) + ' = ' + _Debug_toAnsiString(ansi, value[key]));
		}
		if (output.length === 0)
		{
			return '{}';
		}
		return '{ ' + output.join(', ') + ' }';
	}

	return _Debug_internalColor(ansi, '<internals>');
}

function _Debug_addSlashes(str, isChar)
{
	var s = str
		.replace(/\\/g, '\\\\')
		.replace(/\n/g, '\\n')
		.replace(/\t/g, '\\t')
		.replace(/\r/g, '\\r')
		.replace(/\v/g, '\\v')
		.replace(/\0/g, '\\0');

	if (isChar)
	{
		return s.replace(/\'/g, '\\\'');
	}
	else
	{
		return s.replace(/\"/g, '\\"');
	}
}

function _Debug_ctorColor(ansi, string)
{
	return ansi ? '\x1b[96m' + string + '\x1b[0m' : string;
}

function _Debug_numberColor(ansi, string)
{
	return ansi ? '\x1b[95m' + string + '\x1b[0m' : string;
}

function _Debug_stringColor(ansi, string)
{
	return ansi ? '\x1b[93m' + string + '\x1b[0m' : string;
}

function _Debug_charColor(ansi, string)
{
	return ansi ? '\x1b[92m' + string + '\x1b[0m' : string;
}

function _Debug_fadeColor(ansi, string)
{
	return ansi ? '\x1b[37m' + string + '\x1b[0m' : string;
}

function _Debug_internalColor(ansi, string)
{
	return ansi ? '\x1b[94m' + string + '\x1b[0m' : string;
}



// CRASH


function _Debug_crash(identifier)
{
	throw new Error('https://github.com/elm/core/blob/1.0.0/hints/' + identifier + '.md');
}


function _Debug_crash_UNUSED(identifier, fact1, fact2, fact3, fact4)
{
	switch(identifier)
	{
		case 0:
			throw new Error('What node should I take over? In JavaScript I need something like:\n\n    Elm.Main.init({\n        node: document.getElementById("elm-node")\n    })\n\nYou need to do this with any Browser.sandbox or Browser.element program.');

		case 1:
			throw new Error('Browser.application programs cannot handle URLs like this:\n\n    ' + document.location.href + '\n\nWhat is the root? The root of your file system? Try looking at this program with `elm reactor` or some other server.');

		case 2:
			var jsonErrorString = fact1;
			throw new Error('Problem with the flags given to your Elm program on initialization.\n\n' + jsonErrorString);

		case 3:
			var portName = fact1;
			throw new Error('There can only be one port named `' + portName + '`, but your program has multiple.');

		case 4:
			var portName = fact1;
			var problem = fact2;
			throw new Error('Trying to send an unexpected type of value through port `' + portName + '`:\n' + problem);

		case 5:
			throw new Error('Trying to use `(==)` on functions.\nThere is no way to know if functions are "the same" in the Elm sense.\nRead more about this at https://package.elm-lang.org/packages/elm/core/latest/Basics#== which describes why it is this way and what the better version will look like.');

		case 6:
			var moduleName = fact1;
			throw new Error('Your page is loading multiple Elm scripts with a module named ' + moduleName + '. Maybe a duplicate script is getting loaded accidentally? If not, rename one of them so I know which is which!');

		case 8:
			var moduleName = fact1;
			var region = fact2;
			var message = fact3;
			throw new Error('TODO in module `' + moduleName + '` ' + _Debug_regionToString(region) + '\n\n' + message);

		case 9:
			var moduleName = fact1;
			var region = fact2;
			var value = fact3;
			var message = fact4;
			throw new Error(
				'TODO in module `' + moduleName + '` from the `case` expression '
				+ _Debug_regionToString(region) + '\n\nIt received the following value:\n\n    '
				+ _Debug_toString(value).replace('\n', '\n    ')
				+ '\n\nBut the branch that handles it says:\n\n    ' + message.replace('\n', '\n    ')
			);

		case 10:
			throw new Error('Bug in https://github.com/elm/virtual-dom/issues');

		case 11:
			throw new Error('Cannot perform mod 0. Division by zero error.');
	}
}

function _Debug_regionToString(region)
{
	if (region.bH.W === region.aE.W)
	{
		return 'on line ' + region.bH.W;
	}
	return 'on lines ' + region.bH.W + ' through ' + region.aE.W;
}



// EQUALITY

function _Utils_eq(x, y)
{
	for (
		var pair, stack = [], isEqual = _Utils_eqHelp(x, y, 0, stack);
		isEqual && (pair = stack.pop());
		isEqual = _Utils_eqHelp(pair.a, pair.b, 0, stack)
		)
	{}

	return isEqual;
}

function _Utils_eqHelp(x, y, depth, stack)
{
	if (depth > 100)
	{
		stack.push(_Utils_Tuple2(x,y));
		return true;
	}

	if (x === y)
	{
		return true;
	}

	if (typeof x !== 'object' || x === null || y === null)
	{
		typeof x === 'function' && _Debug_crash(5);
		return false;
	}

	/**_UNUSED/
	if (x.$ === 'Set_elm_builtin')
	{
		x = elm$core$Set$toList(x);
		y = elm$core$Set$toList(y);
	}
	if (x.$ === 'RBNode_elm_builtin' || x.$ === 'RBEmpty_elm_builtin')
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	/**/
	if (x.$ < 0)
	{
		x = elm$core$Dict$toList(x);
		y = elm$core$Dict$toList(y);
	}
	//*/

	for (var key in x)
	{
		if (!_Utils_eqHelp(x[key], y[key], depth + 1, stack))
		{
			return false;
		}
	}
	return true;
}

var _Utils_equal = F2(_Utils_eq);
var _Utils_notEqual = F2(function(a, b) { return !_Utils_eq(a,b); });



// COMPARISONS

// Code in Generate/JavaScript.hs, Basics.js, and List.js depends on
// the particular integer values assigned to LT, EQ, and GT.

function _Utils_cmp(x, y, ord)
{
	if (typeof x !== 'object')
	{
		return x === y ? /*EQ*/ 0 : x < y ? /*LT*/ -1 : /*GT*/ 1;
	}

	/**_UNUSED/
	if (x instanceof String)
	{
		var a = x.valueOf();
		var b = y.valueOf();
		return a === b ? 0 : a < b ? -1 : 1;
	}
	//*/

	/**/
	if (!x.$)
	//*/
	/**_UNUSED/
	if (x.$[0] === '#')
	//*/
	{
		return (ord = _Utils_cmp(x.a, y.a))
			? ord
			: (ord = _Utils_cmp(x.b, y.b))
				? ord
				: _Utils_cmp(x.c, y.c);
	}

	// traverse conses until end of a list or a mismatch
	for (; x.b && y.b && !(ord = _Utils_cmp(x.a, y.a)); x = x.b, y = y.b) {} // WHILE_CONSES
	return ord || (x.b ? /*GT*/ 1 : y.b ? /*LT*/ -1 : /*EQ*/ 0);
}

var _Utils_lt = F2(function(a, b) { return _Utils_cmp(a, b) < 0; });
var _Utils_le = F2(function(a, b) { return _Utils_cmp(a, b) < 1; });
var _Utils_gt = F2(function(a, b) { return _Utils_cmp(a, b) > 0; });
var _Utils_ge = F2(function(a, b) { return _Utils_cmp(a, b) >= 0; });

var _Utils_compare = F2(function(x, y)
{
	var n = _Utils_cmp(x, y);
	return n < 0 ? elm$core$Basics$LT : n ? elm$core$Basics$GT : elm$core$Basics$EQ;
});


// COMMON VALUES

var _Utils_Tuple0 = 0;
var _Utils_Tuple0_UNUSED = { $: '#0' };

function _Utils_Tuple2(a, b) { return { a: a, b: b }; }
function _Utils_Tuple2_UNUSED(a, b) { return { $: '#2', a: a, b: b }; }

function _Utils_Tuple3(a, b, c) { return { a: a, b: b, c: c }; }
function _Utils_Tuple3_UNUSED(a, b, c) { return { $: '#3', a: a, b: b, c: c }; }

function _Utils_chr(c) { return c; }
function _Utils_chr_UNUSED(c) { return new String(c); }


// RECORDS

function _Utils_update(oldRecord, updatedFields)
{
	var newRecord = {};

	for (var key in oldRecord)
	{
		newRecord[key] = oldRecord[key];
	}

	for (var key in updatedFields)
	{
		newRecord[key] = updatedFields[key];
	}

	return newRecord;
}


// APPEND

var _Utils_append = F2(_Utils_ap);

function _Utils_ap(xs, ys)
{
	// append Strings
	if (typeof xs === 'string')
	{
		return xs + ys;
	}

	// append Lists
	if (!xs.b)
	{
		return ys;
	}
	var root = _List_Cons(xs.a, ys);
	xs = xs.b
	for (var curr = root; xs.b; xs = xs.b) // WHILE_CONS
	{
		curr = curr.b = _List_Cons(xs.a, ys);
	}
	return root;
}



// MATH

var _Basics_add = F2(function(a, b) { return a + b; });
var _Basics_sub = F2(function(a, b) { return a - b; });
var _Basics_mul = F2(function(a, b) { return a * b; });
var _Basics_fdiv = F2(function(a, b) { return a / b; });
var _Basics_idiv = F2(function(a, b) { return (a / b) | 0; });
var _Basics_pow = F2(Math.pow);

var _Basics_remainderBy = F2(function(b, a) { return a % b; });

// https://www.microsoft.com/en-us/research/wp-content/uploads/2016/02/divmodnote-letter.pdf
var _Basics_modBy = F2(function(modulus, x)
{
	var answer = x % modulus;
	return modulus === 0
		? _Debug_crash(11)
		:
	((answer > 0 && modulus < 0) || (answer < 0 && modulus > 0))
		? answer + modulus
		: answer;
});


// TRIGONOMETRY

var _Basics_pi = Math.PI;
var _Basics_e = Math.E;
var _Basics_cos = Math.cos;
var _Basics_sin = Math.sin;
var _Basics_tan = Math.tan;
var _Basics_acos = Math.acos;
var _Basics_asin = Math.asin;
var _Basics_atan = Math.atan;
var _Basics_atan2 = F2(Math.atan2);


// MORE MATH

function _Basics_toFloat(x) { return x; }
function _Basics_truncate(n) { return n | 0; }
function _Basics_isInfinite(n) { return n === Infinity || n === -Infinity; }

var _Basics_ceiling = Math.ceil;
var _Basics_floor = Math.floor;
var _Basics_round = Math.round;
var _Basics_sqrt = Math.sqrt;
var _Basics_log = Math.log;
var _Basics_isNaN = isNaN;


// BOOLEANS

function _Basics_not(bool) { return !bool; }
var _Basics_and = F2(function(a, b) { return a && b; });
var _Basics_or  = F2(function(a, b) { return a || b; });
var _Basics_xor = F2(function(a, b) { return a !== b; });



function _Char_toCode(char)
{
	var code = char.charCodeAt(0);
	if (0xD800 <= code && code <= 0xDBFF)
	{
		return (code - 0xD800) * 0x400 + char.charCodeAt(1) - 0xDC00 + 0x10000
	}
	return code;
}

function _Char_fromCode(code)
{
	return _Utils_chr(
		(code < 0 || 0x10FFFF < code)
			? '\uFFFD'
			:
		(code <= 0xFFFF)
			? String.fromCharCode(code)
			:
		(code -= 0x10000,
			String.fromCharCode(Math.floor(code / 0x400) + 0xD800)
			+
			String.fromCharCode(code % 0x400 + 0xDC00)
		)
	);
}

function _Char_toUpper(char)
{
	return _Utils_chr(char.toUpperCase());
}

function _Char_toLower(char)
{
	return _Utils_chr(char.toLowerCase());
}

function _Char_toLocaleUpper(char)
{
	return _Utils_chr(char.toLocaleUpperCase());
}

function _Char_toLocaleLower(char)
{
	return _Utils_chr(char.toLocaleLowerCase());
}



var _String_cons = F2(function(chr, str)
{
	return chr + str;
});

function _String_uncons(string)
{
	var word = string.charCodeAt(0);
	return word
		? elm$core$Maybe$Just(
			0xD800 <= word && word <= 0xDBFF
				? _Utils_Tuple2(_Utils_chr(string[0] + string[1]), string.slice(2))
				: _Utils_Tuple2(_Utils_chr(string[0]), string.slice(1))
		)
		: elm$core$Maybe$Nothing;
}

var _String_append = F2(function(a, b)
{
	return a + b;
});

function _String_length(str)
{
	return str.length;
}

var _String_map = F2(function(func, string)
{
	var len = string.length;
	var array = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = string.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			array[i] = func(_Utils_chr(string[i] + string[i+1]));
			i += 2;
			continue;
		}
		array[i] = func(_Utils_chr(string[i]));
		i++;
	}
	return array.join('');
});

var _String_filter = F2(function(isGood, str)
{
	var arr = [];
	var len = str.length;
	var i = 0;
	while (i < len)
	{
		var char = str[i];
		var word = str.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += str[i];
			i++;
		}

		if (isGood(_Utils_chr(char)))
		{
			arr.push(char);
		}
	}
	return arr.join('');
});

function _String_reverse(str)
{
	var len = str.length;
	var arr = new Array(len);
	var i = 0;
	while (i < len)
	{
		var word = str.charCodeAt(i);
		if (0xD800 <= word && word <= 0xDBFF)
		{
			arr[len - i] = str[i + 1];
			i++;
			arr[len - i] = str[i - 1];
			i++;
		}
		else
		{
			arr[len - i] = str[i];
			i++;
		}
	}
	return arr.join('');
}

var _String_foldl = F3(function(func, state, string)
{
	var len = string.length;
	var i = 0;
	while (i < len)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		i++;
		if (0xD800 <= word && word <= 0xDBFF)
		{
			char += string[i];
			i++;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_foldr = F3(function(func, state, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		state = A2(func, _Utils_chr(char), state);
	}
	return state;
});

var _String_split = F2(function(sep, str)
{
	return str.split(sep);
});

var _String_join = F2(function(sep, strs)
{
	return strs.join(sep);
});

var _String_slice = F3(function(start, end, str) {
	return str.slice(start, end);
});

function _String_trim(str)
{
	return str.trim();
}

function _String_trimLeft(str)
{
	return str.replace(/^\s+/, '');
}

function _String_trimRight(str)
{
	return str.replace(/\s+$/, '');
}

function _String_words(str)
{
	return _List_fromArray(str.trim().split(/\s+/g));
}

function _String_lines(str)
{
	return _List_fromArray(str.split(/\r\n|\r|\n/g));
}

function _String_toUpper(str)
{
	return str.toUpperCase();
}

function _String_toLower(str)
{
	return str.toLowerCase();
}

var _String_any = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (isGood(_Utils_chr(char)))
		{
			return true;
		}
	}
	return false;
});

var _String_all = F2(function(isGood, string)
{
	var i = string.length;
	while (i--)
	{
		var char = string[i];
		var word = string.charCodeAt(i);
		if (0xDC00 <= word && word <= 0xDFFF)
		{
			i--;
			char = string[i] + char;
		}
		if (!isGood(_Utils_chr(char)))
		{
			return false;
		}
	}
	return true;
});

var _String_contains = F2(function(sub, str)
{
	return str.indexOf(sub) > -1;
});

var _String_startsWith = F2(function(sub, str)
{
	return str.indexOf(sub) === 0;
});

var _String_endsWith = F2(function(sub, str)
{
	return str.length >= sub.length &&
		str.lastIndexOf(sub) === str.length - sub.length;
});

var _String_indexes = F2(function(sub, str)
{
	var subLen = sub.length;

	if (subLen < 1)
	{
		return _List_Nil;
	}

	var i = 0;
	var is = [];

	while ((i = str.indexOf(sub, i)) > -1)
	{
		is.push(i);
		i = i + subLen;
	}

	return _List_fromArray(is);
});


// TO STRING

function _String_fromNumber(number)
{
	return number + '';
}


// INT CONVERSIONS

function _String_toInt(str)
{
	var total = 0;
	var code0 = str.charCodeAt(0);
	var start = code0 == 0x2B /* + */ || code0 == 0x2D /* - */ ? 1 : 0;

	for (var i = start; i < str.length; ++i)
	{
		var code = str.charCodeAt(i);
		if (code < 0x30 || 0x39 < code)
		{
			return elm$core$Maybe$Nothing;
		}
		total = 10 * total + code - 0x30;
	}

	return i == start
		? elm$core$Maybe$Nothing
		: elm$core$Maybe$Just(code0 == 0x2D ? -total : total);
}


// FLOAT CONVERSIONS

function _String_toFloat(s)
{
	// check if it is a hex, octal, or binary number
	if (s.length === 0 || /[\sxbo]/.test(s))
	{
		return elm$core$Maybe$Nothing;
	}
	var n = +s;
	// faster isNaN check
	return n === n ? elm$core$Maybe$Just(n) : elm$core$Maybe$Nothing;
}

function _String_fromList(chars)
{
	return _List_toArray(chars).join('');
}




/**_UNUSED/
function _Json_errorToString(error)
{
	return elm$json$Json$Decode$errorToString(error);
}
//*/


// CORE DECODERS

function _Json_succeed(msg)
{
	return {
		$: 0,
		a: msg
	};
}

function _Json_fail(msg)
{
	return {
		$: 1,
		a: msg
	};
}

var _Json_decodeInt = { $: 2 };
var _Json_decodeBool = { $: 3 };
var _Json_decodeFloat = { $: 4 };
var _Json_decodeValue = { $: 5 };
var _Json_decodeString = { $: 6 };

function _Json_decodeList(decoder) { return { $: 7, b: decoder }; }
function _Json_decodeArray(decoder) { return { $: 8, b: decoder }; }

function _Json_decodeNull(value) { return { $: 9, c: value }; }

var _Json_decodeField = F2(function(field, decoder)
{
	return {
		$: 10,
		d: field,
		b: decoder
	};
});

var _Json_decodeIndex = F2(function(index, decoder)
{
	return {
		$: 11,
		e: index,
		b: decoder
	};
});

function _Json_decodeKeyValuePairs(decoder)
{
	return {
		$: 12,
		b: decoder
	};
}

function _Json_mapMany(f, decoders)
{
	return {
		$: 13,
		f: f,
		g: decoders
	};
}

var _Json_andThen = F2(function(callback, decoder)
{
	return {
		$: 14,
		b: decoder,
		h: callback
	};
});

function _Json_oneOf(decoders)
{
	return {
		$: 15,
		g: decoders
	};
}


// DECODING OBJECTS

var _Json_map1 = F2(function(f, d1)
{
	return _Json_mapMany(f, [d1]);
});

var _Json_map2 = F3(function(f, d1, d2)
{
	return _Json_mapMany(f, [d1, d2]);
});

var _Json_map3 = F4(function(f, d1, d2, d3)
{
	return _Json_mapMany(f, [d1, d2, d3]);
});

var _Json_map4 = F5(function(f, d1, d2, d3, d4)
{
	return _Json_mapMany(f, [d1, d2, d3, d4]);
});

var _Json_map5 = F6(function(f, d1, d2, d3, d4, d5)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5]);
});

var _Json_map6 = F7(function(f, d1, d2, d3, d4, d5, d6)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6]);
});

var _Json_map7 = F8(function(f, d1, d2, d3, d4, d5, d6, d7)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7]);
});

var _Json_map8 = F9(function(f, d1, d2, d3, d4, d5, d6, d7, d8)
{
	return _Json_mapMany(f, [d1, d2, d3, d4, d5, d6, d7, d8]);
});


// DECODE

var _Json_runOnString = F2(function(decoder, string)
{
	try
	{
		var value = JSON.parse(string);
		return _Json_runHelp(decoder, value);
	}
	catch (e)
	{
		return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'This is not valid JSON! ' + e.message, _Json_wrap(string)));
	}
});

var _Json_run = F2(function(decoder, value)
{
	return _Json_runHelp(decoder, _Json_unwrap(value));
});

function _Json_runHelp(decoder, value)
{
	switch (decoder.$)
	{
		case 3:
			return (typeof value === 'boolean')
				? elm$core$Result$Ok(value)
				: _Json_expecting('a BOOL', value);

		case 2:
			if (typeof value !== 'number') {
				return _Json_expecting('an INT', value);
			}

			if (-2147483647 < value && value < 2147483647 && (value | 0) === value) {
				return elm$core$Result$Ok(value);
			}

			if (isFinite(value) && !(value % 1)) {
				return elm$core$Result$Ok(value);
			}

			return _Json_expecting('an INT', value);

		case 4:
			return (typeof value === 'number')
				? elm$core$Result$Ok(value)
				: _Json_expecting('a FLOAT', value);

		case 6:
			return (typeof value === 'string')
				? elm$core$Result$Ok(value)
				: (value instanceof String)
					? elm$core$Result$Ok(value + '')
					: _Json_expecting('a STRING', value);

		case 9:
			return (value === null)
				? elm$core$Result$Ok(decoder.c)
				: _Json_expecting('null', value);

		case 5:
			return elm$core$Result$Ok(_Json_wrap(value));

		case 7:
			if (!Array.isArray(value))
			{
				return _Json_expecting('a LIST', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _List_fromArray);

		case 8:
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			return _Json_runArrayDecoder(decoder.b, value, _Json_toElmArray);

		case 10:
			var field = decoder.d;
			if (typeof value !== 'object' || value === null || !(field in value))
			{
				return _Json_expecting('an OBJECT with a field named `' + field + '`', value);
			}
			var result = _Json_runHelp(decoder.b, value[field]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Field, field, result.a));

		case 11:
			var index = decoder.e;
			if (!Array.isArray(value))
			{
				return _Json_expecting('an ARRAY', value);
			}
			if (index >= value.length)
			{
				return _Json_expecting('a LONGER array. Need index ' + index + ' but only see ' + value.length + ' entries', value);
			}
			var result = _Json_runHelp(decoder.b, value[index]);
			return (elm$core$Result$isOk(result)) ? result : elm$core$Result$Err(A2(elm$json$Json$Decode$Index, index, result.a));

		case 12:
			if (typeof value !== 'object' || value === null || Array.isArray(value))
			{
				return _Json_expecting('an OBJECT', value);
			}

			var keyValuePairs = _List_Nil;
			// TODO test perf of Object.keys and switch when support is good enough
			for (var key in value)
			{
				if (value.hasOwnProperty(key))
				{
					var result = _Json_runHelp(decoder.b, value[key]);
					if (!elm$core$Result$isOk(result))
					{
						return elm$core$Result$Err(A2(elm$json$Json$Decode$Field, key, result.a));
					}
					keyValuePairs = _List_Cons(_Utils_Tuple2(key, result.a), keyValuePairs);
				}
			}
			return elm$core$Result$Ok(elm$core$List$reverse(keyValuePairs));

		case 13:
			var answer = decoder.f;
			var decoders = decoder.g;
			for (var i = 0; i < decoders.length; i++)
			{
				var result = _Json_runHelp(decoders[i], value);
				if (!elm$core$Result$isOk(result))
				{
					return result;
				}
				answer = answer(result.a);
			}
			return elm$core$Result$Ok(answer);

		case 14:
			var result = _Json_runHelp(decoder.b, value);
			return (!elm$core$Result$isOk(result))
				? result
				: _Json_runHelp(decoder.h(result.a), value);

		case 15:
			var errors = _List_Nil;
			for (var temp = decoder.g; temp.b; temp = temp.b) // WHILE_CONS
			{
				var result = _Json_runHelp(temp.a, value);
				if (elm$core$Result$isOk(result))
				{
					return result;
				}
				errors = _List_Cons(result.a, errors);
			}
			return elm$core$Result$Err(elm$json$Json$Decode$OneOf(elm$core$List$reverse(errors)));

		case 1:
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, decoder.a, _Json_wrap(value)));

		case 0:
			return elm$core$Result$Ok(decoder.a);
	}
}

function _Json_runArrayDecoder(decoder, value, toElmValue)
{
	var len = value.length;
	var array = new Array(len);
	for (var i = 0; i < len; i++)
	{
		var result = _Json_runHelp(decoder, value[i]);
		if (!elm$core$Result$isOk(result))
		{
			return elm$core$Result$Err(A2(elm$json$Json$Decode$Index, i, result.a));
		}
		array[i] = result.a;
	}
	return elm$core$Result$Ok(toElmValue(array));
}

function _Json_toElmArray(array)
{
	return A2(elm$core$Array$initialize, array.length, function(i) { return array[i]; });
}

function _Json_expecting(type, value)
{
	return elm$core$Result$Err(A2(elm$json$Json$Decode$Failure, 'Expecting ' + type, _Json_wrap(value)));
}


// EQUALITY

function _Json_equality(x, y)
{
	if (x === y)
	{
		return true;
	}

	if (x.$ !== y.$)
	{
		return false;
	}

	switch (x.$)
	{
		case 0:
		case 1:
			return x.a === y.a;

		case 3:
		case 2:
		case 4:
		case 6:
		case 5:
			return true;

		case 9:
			return x.c === y.c;

		case 7:
		case 8:
		case 12:
			return _Json_equality(x.b, y.b);

		case 10:
			return x.d === y.d && _Json_equality(x.b, y.b);

		case 11:
			return x.e === y.e && _Json_equality(x.b, y.b);

		case 13:
			return x.f === y.f && _Json_listEquality(x.g, y.g);

		case 14:
			return x.h === y.h && _Json_equality(x.b, y.b);

		case 15:
			return _Json_listEquality(x.g, y.g);
	}
}

function _Json_listEquality(aDecoders, bDecoders)
{
	var len = aDecoders.length;
	if (len !== bDecoders.length)
	{
		return false;
	}
	for (var i = 0; i < len; i++)
	{
		if (!_Json_equality(aDecoders[i], bDecoders[i]))
		{
			return false;
		}
	}
	return true;
}


// ENCODE

var _Json_encode = F2(function(indentLevel, value)
{
	return JSON.stringify(_Json_unwrap(value), null, indentLevel) + '';
});

function _Json_wrap_UNUSED(value) { return { $: 0, a: value }; }
function _Json_unwrap_UNUSED(value) { return value.a; }

function _Json_wrap(value) { return value; }
function _Json_unwrap(value) { return value; }

function _Json_emptyArray() { return []; }
function _Json_emptyObject() { return {}; }

var _Json_addField = F3(function(key, value, object)
{
	object[key] = _Json_unwrap(value);
	return object;
});

function _Json_addEntry(func)
{
	return F2(function(entry, array)
	{
		array.push(_Json_unwrap(func(entry)));
		return array;
	});
}

var _Json_encodeNull = _Json_wrap(null);



// TASKS

function _Scheduler_succeed(value)
{
	return {
		$: 0,
		a: value
	};
}

function _Scheduler_fail(error)
{
	return {
		$: 1,
		a: error
	};
}

function _Scheduler_binding(callback)
{
	return {
		$: 2,
		b: callback,
		c: null
	};
}

var _Scheduler_andThen = F2(function(callback, task)
{
	return {
		$: 3,
		b: callback,
		d: task
	};
});

var _Scheduler_onError = F2(function(callback, task)
{
	return {
		$: 4,
		b: callback,
		d: task
	};
});

function _Scheduler_receive(callback)
{
	return {
		$: 5,
		b: callback
	};
}


// PROCESSES

var _Scheduler_guid = 0;

function _Scheduler_rawSpawn(task)
{
	var proc = {
		$: 0,
		e: _Scheduler_guid++,
		f: task,
		g: null,
		h: []
	};

	_Scheduler_enqueue(proc);

	return proc;
}

function _Scheduler_spawn(task)
{
	return _Scheduler_binding(function(callback) {
		callback(_Scheduler_succeed(_Scheduler_rawSpawn(task)));
	});
}

function _Scheduler_rawSend(proc, msg)
{
	proc.h.push(msg);
	_Scheduler_enqueue(proc);
}

var _Scheduler_send = F2(function(proc, msg)
{
	return _Scheduler_binding(function(callback) {
		_Scheduler_rawSend(proc, msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});

function _Scheduler_kill(proc)
{
	return _Scheduler_binding(function(callback) {
		var task = proc.f;
		if (task.$ === 2 && task.c)
		{
			task.c();
		}

		proc.f = null;

		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
}


/* STEP PROCESSES

type alias Process =
  { $ : tag
  , id : unique_id
  , root : Task
  , stack : null | { $: SUCCEED | FAIL, a: callback, b: stack }
  , mailbox : [msg]
  }

*/


var _Scheduler_working = false;
var _Scheduler_queue = [];


function _Scheduler_enqueue(proc)
{
	_Scheduler_queue.push(proc);
	if (_Scheduler_working)
	{
		return;
	}
	_Scheduler_working = true;
	while (proc = _Scheduler_queue.shift())
	{
		_Scheduler_step(proc);
	}
	_Scheduler_working = false;
}


function _Scheduler_step(proc)
{
	while (proc.f)
	{
		var rootTag = proc.f.$;
		if (rootTag === 0 || rootTag === 1)
		{
			while (proc.g && proc.g.$ !== rootTag)
			{
				proc.g = proc.g.i;
			}
			if (!proc.g)
			{
				return;
			}
			proc.f = proc.g.b(proc.f.a);
			proc.g = proc.g.i;
		}
		else if (rootTag === 2)
		{
			proc.f.c = proc.f.b(function(newRoot) {
				proc.f = newRoot;
				_Scheduler_enqueue(proc);
			});
			return;
		}
		else if (rootTag === 5)
		{
			if (proc.h.length === 0)
			{
				return;
			}
			proc.f = proc.f.b(proc.h.shift());
		}
		else // if (rootTag === 3 || rootTag === 4)
		{
			proc.g = {
				$: rootTag === 3 ? 0 : 1,
				b: proc.f.b,
				i: proc.g
			};
			proc.f = proc.f.d;
		}
	}
}



function _Process_sleep(time)
{
	return _Scheduler_binding(function(callback) {
		var id = setTimeout(function() {
			callback(_Scheduler_succeed(_Utils_Tuple0));
		}, time);

		return function() { clearTimeout(id); };
	});
}




// PROGRAMS


var _Platform_worker = F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bq,
		impl.bN,
		impl.bK,
		function() { return function() {} }
	);
});



// INITIALIZE A PROGRAM


function _Platform_initialize(flagDecoder, args, init, update, subscriptions, stepperBuilder)
{
	var result = A2(_Json_run, flagDecoder, _Json_wrap(args ? args['flags'] : undefined));
	elm$core$Result$isOk(result) || _Debug_crash(2 /**_UNUSED/, _Json_errorToString(result.a) /**/);
	var managers = {};
	result = init(result.a);
	var model = result.a;
	var stepper = stepperBuilder(sendToApp, model);
	var ports = _Platform_setupEffects(managers, sendToApp);

	function sendToApp(msg, viewMetadata)
	{
		result = A2(update, msg, model);
		stepper(model = result.a, viewMetadata);
		_Platform_dispatchEffects(managers, result.b, subscriptions(model));
	}

	_Platform_dispatchEffects(managers, result.b, subscriptions(model));

	return ports ? { ports: ports } : {};
}



// TRACK PRELOADS
//
// This is used by code in elm/browser and elm/http
// to register any HTTP requests that are triggered by init.
//


var _Platform_preload;


function _Platform_registerPreload(url)
{
	_Platform_preload.add(url);
}



// EFFECT MANAGERS


var _Platform_effectManagers = {};


function _Platform_setupEffects(managers, sendToApp)
{
	var ports;

	// setup all necessary effect managers
	for (var key in _Platform_effectManagers)
	{
		var manager = _Platform_effectManagers[key];

		if (manager.a)
		{
			ports = ports || {};
			ports[key] = manager.a(key, sendToApp);
		}

		managers[key] = _Platform_instantiateManager(manager, sendToApp);
	}

	return ports;
}


function _Platform_createManager(init, onEffects, onSelfMsg, cmdMap, subMap)
{
	return {
		b: init,
		c: onEffects,
		d: onSelfMsg,
		e: cmdMap,
		f: subMap
	};
}


function _Platform_instantiateManager(info, sendToApp)
{
	var router = {
		g: sendToApp,
		h: undefined
	};

	var onEffects = info.c;
	var onSelfMsg = info.d;
	var cmdMap = info.e;
	var subMap = info.f;

	function loop(state)
	{
		return A2(_Scheduler_andThen, loop, _Scheduler_receive(function(msg)
		{
			var value = msg.a;

			if (msg.$ === 0)
			{
				return A3(onSelfMsg, router, value, state);
			}

			return cmdMap && subMap
				? A4(onEffects, router, value.i, value.j, state)
				: A3(onEffects, router, cmdMap ? value.i : value.j, state);
		}));
	}

	return router.h = _Scheduler_rawSpawn(A2(_Scheduler_andThen, loop, info.b));
}



// ROUTING


var _Platform_sendToApp = F2(function(router, msg)
{
	return _Scheduler_binding(function(callback)
	{
		router.g(msg);
		callback(_Scheduler_succeed(_Utils_Tuple0));
	});
});


var _Platform_sendToSelf = F2(function(router, msg)
{
	return A2(_Scheduler_send, router.h, {
		$: 0,
		a: msg
	});
});



// BAGS


function _Platform_leaf(home)
{
	return function(value)
	{
		return {
			$: 1,
			k: home,
			l: value
		};
	};
}


function _Platform_batch(list)
{
	return {
		$: 2,
		m: list
	};
}


var _Platform_map = F2(function(tagger, bag)
{
	return {
		$: 3,
		n: tagger,
		o: bag
	}
});



// PIPE BAGS INTO EFFECT MANAGERS


function _Platform_dispatchEffects(managers, cmdBag, subBag)
{
	var effectsDict = {};
	_Platform_gatherEffects(true, cmdBag, effectsDict, null);
	_Platform_gatherEffects(false, subBag, effectsDict, null);

	for (var home in managers)
	{
		_Scheduler_rawSend(managers[home], {
			$: 'fx',
			a: effectsDict[home] || { i: _List_Nil, j: _List_Nil }
		});
	}
}


function _Platform_gatherEffects(isCmd, bag, effectsDict, taggers)
{
	switch (bag.$)
	{
		case 1:
			var home = bag.k;
			var effect = _Platform_toEffect(isCmd, home, taggers, bag.l);
			effectsDict[home] = _Platform_insert(isCmd, effect, effectsDict[home]);
			return;

		case 2:
			for (var list = bag.m; list.b; list = list.b) // WHILE_CONS
			{
				_Platform_gatherEffects(isCmd, list.a, effectsDict, taggers);
			}
			return;

		case 3:
			_Platform_gatherEffects(isCmd, bag.o, effectsDict, {
				p: bag.n,
				q: taggers
			});
			return;
	}
}


function _Platform_toEffect(isCmd, home, taggers, value)
{
	function applyTaggers(x)
	{
		for (var temp = taggers; temp; temp = temp.q)
		{
			x = temp.p(x);
		}
		return x;
	}

	var map = isCmd
		? _Platform_effectManagers[home].e
		: _Platform_effectManagers[home].f;

	return A2(map, applyTaggers, value)
}


function _Platform_insert(isCmd, newEffect, effects)
{
	effects = effects || { i: _List_Nil, j: _List_Nil };

	isCmd
		? (effects.i = _List_Cons(newEffect, effects.i))
		: (effects.j = _List_Cons(newEffect, effects.j));

	return effects;
}



// PORTS


function _Platform_checkPortName(name)
{
	if (_Platform_effectManagers[name])
	{
		_Debug_crash(3, name)
	}
}



// OUTGOING PORTS


function _Platform_outgoingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		e: _Platform_outgoingPortMap,
		r: converter,
		a: _Platform_setupOutgoingPort
	};
	return _Platform_leaf(name);
}


var _Platform_outgoingPortMap = F2(function(tagger, value) { return value; });


function _Platform_setupOutgoingPort(name)
{
	var subs = [];
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Process_sleep(0);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, cmdList, state)
	{
		for ( ; cmdList.b; cmdList = cmdList.b) // WHILE_CONS
		{
			// grab a separate reference to subs in case unsubscribe is called
			var currentSubs = subs;
			var value = _Json_unwrap(converter(cmdList.a));
			for (var i = 0; i < currentSubs.length; i++)
			{
				currentSubs[i](value);
			}
		}
		return init;
	});

	// PUBLIC API

	function subscribe(callback)
	{
		subs.push(callback);
	}

	function unsubscribe(callback)
	{
		// copy subs into a new array in case unsubscribe is called within a
		// subscribed callback
		subs = subs.slice();
		var index = subs.indexOf(callback);
		if (index >= 0)
		{
			subs.splice(index, 1);
		}
	}

	return {
		subscribe: subscribe,
		unsubscribe: unsubscribe
	};
}



// INCOMING PORTS


function _Platform_incomingPort(name, converter)
{
	_Platform_checkPortName(name);
	_Platform_effectManagers[name] = {
		f: _Platform_incomingPortMap,
		r: converter,
		a: _Platform_setupIncomingPort
	};
	return _Platform_leaf(name);
}


var _Platform_incomingPortMap = F2(function(tagger, finalTagger)
{
	return function(value)
	{
		return tagger(finalTagger(value));
	};
});


function _Platform_setupIncomingPort(name, sendToApp)
{
	var subs = _List_Nil;
	var converter = _Platform_effectManagers[name].r;

	// CREATE MANAGER

	var init = _Scheduler_succeed(null);

	_Platform_effectManagers[name].b = init;
	_Platform_effectManagers[name].c = F3(function(router, subList, state)
	{
		subs = subList;
		return init;
	});

	// PUBLIC API

	function send(incomingValue)
	{
		var result = A2(_Json_run, converter, _Json_wrap(incomingValue));

		elm$core$Result$isOk(result) || _Debug_crash(4, name, result.a);

		var value = result.a;
		for (var temp = subs; temp.b; temp = temp.b) // WHILE_CONS
		{
			sendToApp(temp.a(value));
		}
	}

	return { send: send };
}



// EXPORT ELM MODULES
//
// Have DEBUG and PROD versions so that we can (1) give nicer errors in
// debug mode and (2) not pay for the bits needed for that in prod mode.
//


function _Platform_export(exports)
{
	scope['Elm']
		? _Platform_mergeExportsProd(scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsProd(obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6)
				: _Platform_mergeExportsProd(obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}


function _Platform_export_UNUSED(exports)
{
	scope['Elm']
		? _Platform_mergeExportsDebug('Elm', scope['Elm'], exports)
		: scope['Elm'] = exports;
}


function _Platform_mergeExportsDebug(moduleName, obj, exports)
{
	for (var name in exports)
	{
		(name in obj)
			? (name == 'init')
				? _Debug_crash(6, moduleName)
				: _Platform_mergeExportsDebug(moduleName + '.' + name, obj[name], exports[name])
			: (obj[name] = exports[name]);
	}
}




// HELPERS


var _VirtualDom_divertHrefToApp;

var _VirtualDom_doc = typeof document !== 'undefined' ? document : {};


function _VirtualDom_appendChild(parent, child)
{
	parent.appendChild(child);
}

var _VirtualDom_init = F4(function(virtualNode, flagDecoder, debugMetadata, args)
{
	// NOTE: this function needs _Platform_export available to work

	/**/
	var node = args['node'];
	//*/
	/**_UNUSED/
	var node = args && args['node'] ? args['node'] : _Debug_crash(0);
	//*/

	node.parentNode.replaceChild(
		_VirtualDom_render(virtualNode, function() {}),
		node
	);

	return {};
});



// TEXT


function _VirtualDom_text(string)
{
	return {
		$: 0,
		a: string
	};
}



// NODE


var _VirtualDom_nodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 1,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_node = _VirtualDom_nodeNS(undefined);



// KEYED NODE


var _VirtualDom_keyedNodeNS = F2(function(namespace, tag)
{
	return F2(function(factList, kidList)
	{
		for (var kids = [], descendantsCount = 0; kidList.b; kidList = kidList.b) // WHILE_CONS
		{
			var kid = kidList.a;
			descendantsCount += (kid.b.b || 0);
			kids.push(kid);
		}
		descendantsCount += kids.length;

		return {
			$: 2,
			c: tag,
			d: _VirtualDom_organizeFacts(factList),
			e: kids,
			f: namespace,
			b: descendantsCount
		};
	});
});


var _VirtualDom_keyedNode = _VirtualDom_keyedNodeNS(undefined);



// CUSTOM


function _VirtualDom_custom(factList, model, render, diff)
{
	return {
		$: 3,
		d: _VirtualDom_organizeFacts(factList),
		g: model,
		h: render,
		i: diff
	};
}



// MAP


var _VirtualDom_map = F2(function(tagger, node)
{
	return {
		$: 4,
		j: tagger,
		k: node,
		b: 1 + (node.b || 0)
	};
});



// LAZY


function _VirtualDom_thunk(refs, thunk)
{
	return {
		$: 5,
		l: refs,
		m: thunk,
		k: undefined
	};
}

var _VirtualDom_lazy = F2(function(func, a)
{
	return _VirtualDom_thunk([func, a], function() {
		return func(a);
	});
});

var _VirtualDom_lazy2 = F3(function(func, a, b)
{
	return _VirtualDom_thunk([func, a, b], function() {
		return A2(func, a, b);
	});
});

var _VirtualDom_lazy3 = F4(function(func, a, b, c)
{
	return _VirtualDom_thunk([func, a, b, c], function() {
		return A3(func, a, b, c);
	});
});

var _VirtualDom_lazy4 = F5(function(func, a, b, c, d)
{
	return _VirtualDom_thunk([func, a, b, c, d], function() {
		return A4(func, a, b, c, d);
	});
});

var _VirtualDom_lazy5 = F6(function(func, a, b, c, d, e)
{
	return _VirtualDom_thunk([func, a, b, c, d, e], function() {
		return A5(func, a, b, c, d, e);
	});
});

var _VirtualDom_lazy6 = F7(function(func, a, b, c, d, e, f)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f], function() {
		return A6(func, a, b, c, d, e, f);
	});
});

var _VirtualDom_lazy7 = F8(function(func, a, b, c, d, e, f, g)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g], function() {
		return A7(func, a, b, c, d, e, f, g);
	});
});

var _VirtualDom_lazy8 = F9(function(func, a, b, c, d, e, f, g, h)
{
	return _VirtualDom_thunk([func, a, b, c, d, e, f, g, h], function() {
		return A8(func, a, b, c, d, e, f, g, h);
	});
});



// FACTS


var _VirtualDom_on = F2(function(key, handler)
{
	return {
		$: 'a0',
		n: key,
		o: handler
	};
});
var _VirtualDom_style = F2(function(key, value)
{
	return {
		$: 'a1',
		n: key,
		o: value
	};
});
var _VirtualDom_property = F2(function(key, value)
{
	return {
		$: 'a2',
		n: key,
		o: value
	};
});
var _VirtualDom_attribute = F2(function(key, value)
{
	return {
		$: 'a3',
		n: key,
		o: value
	};
});
var _VirtualDom_attributeNS = F3(function(namespace, key, value)
{
	return {
		$: 'a4',
		n: key,
		o: { f: namespace, o: value }
	};
});



// XSS ATTACK VECTOR CHECKS


function _VirtualDom_noScript(tag)
{
	return tag == 'script' ? 'p' : tag;
}

function _VirtualDom_noOnOrFormAction(key)
{
	return /^(on|formAction$)/i.test(key) ? 'data-' + key : key;
}

function _VirtualDom_noInnerHtmlOrFormAction(key)
{
	return key == 'innerHTML' || key == 'formAction' ? 'data-' + key : key;
}

function _VirtualDom_noJavaScriptUri(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,'')) ? '' : value;
}

function _VirtualDom_noJavaScriptUri_UNUSED(value)
{
	return /^javascript:/i.test(value.replace(/\s/g,''))
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}

function _VirtualDom_noJavaScriptOrHtmlUri(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value) ? '' : value;
}

function _VirtualDom_noJavaScriptOrHtmlUri_UNUSED(value)
{
	return /^\s*(javascript:|data:text\/html)/i.test(value)
		? 'javascript:alert("This is an XSS vector. Please use ports or web components instead.")'
		: value;
}



// MAP FACTS


var _VirtualDom_mapAttribute = F2(function(func, attr)
{
	return (attr.$ === 'a0')
		? A2(_VirtualDom_on, attr.n, _VirtualDom_mapHandler(func, attr.o))
		: attr;
});

function _VirtualDom_mapHandler(func, handler)
{
	var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

	// 0 = Normal
	// 1 = MayStopPropagation
	// 2 = MayPreventDefault
	// 3 = Custom

	return {
		$: handler.$,
		a:
			!tag
				? A2(elm$json$Json$Decode$map, func, handler.a)
				:
			A3(elm$json$Json$Decode$map2,
				tag < 3
					? _VirtualDom_mapEventTuple
					: _VirtualDom_mapEventRecord,
				elm$json$Json$Decode$succeed(func),
				handler.a
			)
	};
}

var _VirtualDom_mapEventTuple = F2(function(func, tuple)
{
	return _Utils_Tuple2(func(tuple.a), tuple.b);
});

var _VirtualDom_mapEventRecord = F2(function(func, record)
{
	return {
		bu: func(record.bu),
		bI: record.bI,
		bB: record.bB
	}
});



// ORGANIZE FACTS


function _VirtualDom_organizeFacts(factList)
{
	for (var facts = {}; factList.b; factList = factList.b) // WHILE_CONS
	{
		var entry = factList.a;

		var tag = entry.$;
		var key = entry.n;
		var value = entry.o;

		if (tag === 'a2')
		{
			(key === 'className')
				? _VirtualDom_addClass(facts, key, _Json_unwrap(value))
				: facts[key] = _Json_unwrap(value);

			continue;
		}

		var subFacts = facts[tag] || (facts[tag] = {});
		(tag === 'a3' && key === 'class')
			? _VirtualDom_addClass(subFacts, key, value)
			: subFacts[key] = value;
	}

	return facts;
}

function _VirtualDom_addClass(object, key, newClass)
{
	var classes = object[key];
	object[key] = classes ? classes + ' ' + newClass : newClass;
}



// RENDER


function _VirtualDom_render(vNode, eventNode)
{
	var tag = vNode.$;

	if (tag === 5)
	{
		return _VirtualDom_render(vNode.k || (vNode.k = vNode.m()), eventNode);
	}

	if (tag === 0)
	{
		return _VirtualDom_doc.createTextNode(vNode.a);
	}

	if (tag === 4)
	{
		var subNode = vNode.k;
		var tagger = vNode.j;

		while (subNode.$ === 4)
		{
			typeof tagger !== 'object'
				? tagger = [tagger, subNode.j]
				: tagger.push(subNode.j);

			subNode = subNode.k;
		}

		var subEventRoot = { j: tagger, p: eventNode };
		var domNode = _VirtualDom_render(subNode, subEventRoot);
		domNode.elm_event_node_ref = subEventRoot;
		return domNode;
	}

	if (tag === 3)
	{
		var domNode = vNode.h(vNode.g);
		_VirtualDom_applyFacts(domNode, eventNode, vNode.d);
		return domNode;
	}

	// at this point `tag` must be 1 or 2

	var domNode = vNode.f
		? _VirtualDom_doc.createElementNS(vNode.f, vNode.c)
		: _VirtualDom_doc.createElement(vNode.c);

	if (_VirtualDom_divertHrefToApp && vNode.c == 'a')
	{
		domNode.addEventListener('click', _VirtualDom_divertHrefToApp(domNode));
	}

	_VirtualDom_applyFacts(domNode, eventNode, vNode.d);

	for (var kids = vNode.e, i = 0; i < kids.length; i++)
	{
		_VirtualDom_appendChild(domNode, _VirtualDom_render(tag === 1 ? kids[i] : kids[i].b, eventNode));
	}

	return domNode;
}



// APPLY FACTS


function _VirtualDom_applyFacts(domNode, eventNode, facts)
{
	for (var key in facts)
	{
		var value = facts[key];

		key === 'a1'
			? _VirtualDom_applyStyles(domNode, value)
			:
		key === 'a0'
			? _VirtualDom_applyEvents(domNode, eventNode, value)
			:
		key === 'a3'
			? _VirtualDom_applyAttrs(domNode, value)
			:
		key === 'a4'
			? _VirtualDom_applyAttrsNS(domNode, value)
			:
		(key !== 'value' || key !== 'checked' || domNode[key] !== value) && (domNode[key] = value);
	}
}



// APPLY STYLES


function _VirtualDom_applyStyles(domNode, styles)
{
	var domNodeStyle = domNode.style;

	for (var key in styles)
	{
		domNodeStyle[key] = styles[key];
	}
}



// APPLY ATTRS


function _VirtualDom_applyAttrs(domNode, attrs)
{
	for (var key in attrs)
	{
		var value = attrs[key];
		value
			? domNode.setAttribute(key, value)
			: domNode.removeAttribute(key);
	}
}



// APPLY NAMESPACED ATTRS


function _VirtualDom_applyAttrsNS(domNode, nsAttrs)
{
	for (var key in nsAttrs)
	{
		var pair = nsAttrs[key];
		var namespace = pair.f;
		var value = pair.o;

		value
			? domNode.setAttributeNS(namespace, key, value)
			: domNode.removeAttributeNS(namespace, key);
	}
}



// APPLY EVENTS


function _VirtualDom_applyEvents(domNode, eventNode, events)
{
	var allCallbacks = domNode.elmFs || (domNode.elmFs = {});

	for (var key in events)
	{
		var newHandler = events[key];
		var oldCallback = allCallbacks[key];

		if (!newHandler)
		{
			domNode.removeEventListener(key, oldCallback);
			allCallbacks[key] = undefined;
			continue;
		}

		if (oldCallback)
		{
			var oldHandler = oldCallback.q;
			if (oldHandler.$ === newHandler.$)
			{
				oldCallback.q = newHandler;
				continue;
			}
			domNode.removeEventListener(key, oldCallback);
		}

		oldCallback = _VirtualDom_makeCallback(eventNode, newHandler);
		domNode.addEventListener(key, oldCallback,
			_VirtualDom_passiveSupported
			&& { passive: elm$virtual_dom$VirtualDom$toHandlerInt(newHandler) < 2 }
		);
		allCallbacks[key] = oldCallback;
	}
}



// PASSIVE EVENTS


var _VirtualDom_passiveSupported;

try
{
	window.addEventListener('t', null, Object.defineProperty({}, 'passive', {
		get: function() { _VirtualDom_passiveSupported = true; }
	}));
}
catch(e) {}



// EVENT HANDLERS


function _VirtualDom_makeCallback(eventNode, initialHandler)
{
	function callback(event)
	{
		var handler = callback.q;
		var result = _Json_runHelp(handler.a, event);

		if (!elm$core$Result$isOk(result))
		{
			return;
		}

		var tag = elm$virtual_dom$VirtualDom$toHandlerInt(handler);

		// 0 = Normal
		// 1 = MayStopPropagation
		// 2 = MayPreventDefault
		// 3 = Custom

		var value = result.a;
		var message = !tag ? value : tag < 3 ? value.a : value.bu;
		var stopPropagation = tag == 1 ? value.b : tag == 3 && value.bI;
		var currentEventNode = (
			stopPropagation && event.stopPropagation(),
			(tag == 2 ? value.b : tag == 3 && value.bB) && event.preventDefault(),
			eventNode
		);
		var tagger;
		var i;
		while (tagger = currentEventNode.j)
		{
			if (typeof tagger == 'function')
			{
				message = tagger(message);
			}
			else
			{
				for (var i = tagger.length; i--; )
				{
					message = tagger[i](message);
				}
			}
			currentEventNode = currentEventNode.p;
		}
		currentEventNode(message, stopPropagation); // stopPropagation implies isSync
	}

	callback.q = initialHandler;

	return callback;
}

function _VirtualDom_equalEvents(x, y)
{
	return x.$ == y.$ && _Json_equality(x.a, y.a);
}



// DIFF


// TODO: Should we do patches like in iOS?
//
// type Patch
//   = At Int Patch
//   | Batch (List Patch)
//   | Change ...
//
// How could it not be better?
//
function _VirtualDom_diff(x, y)
{
	var patches = [];
	_VirtualDom_diffHelp(x, y, patches, 0);
	return patches;
}


function _VirtualDom_pushPatch(patches, type, index, data)
{
	var patch = {
		$: type,
		r: index,
		s: data,
		t: undefined,
		u: undefined
	};
	patches.push(patch);
	return patch;
}


function _VirtualDom_diffHelp(x, y, patches, index)
{
	if (x === y)
	{
		return;
	}

	var xType = x.$;
	var yType = y.$;

	// Bail if you run into different types of nodes. Implies that the
	// structure has changed significantly and it's not worth a diff.
	if (xType !== yType)
	{
		if (xType === 1 && yType === 2)
		{
			y = _VirtualDom_dekey(y);
			yType = 1;
		}
		else
		{
			_VirtualDom_pushPatch(patches, 0, index, y);
			return;
		}
	}

	// Now we know that both nodes are the same $.
	switch (yType)
	{
		case 5:
			var xRefs = x.l;
			var yRefs = y.l;
			var i = xRefs.length;
			var same = i === yRefs.length;
			while (same && i--)
			{
				same = xRefs[i] === yRefs[i];
			}
			if (same)
			{
				y.k = x.k;
				return;
			}
			y.k = y.m();
			var subPatches = [];
			_VirtualDom_diffHelp(x.k, y.k, subPatches, 0);
			subPatches.length > 0 && _VirtualDom_pushPatch(patches, 1, index, subPatches);
			return;

		case 4:
			// gather nested taggers
			var xTaggers = x.j;
			var yTaggers = y.j;
			var nesting = false;

			var xSubNode = x.k;
			while (xSubNode.$ === 4)
			{
				nesting = true;

				typeof xTaggers !== 'object'
					? xTaggers = [xTaggers, xSubNode.j]
					: xTaggers.push(xSubNode.j);

				xSubNode = xSubNode.k;
			}

			var ySubNode = y.k;
			while (ySubNode.$ === 4)
			{
				nesting = true;

				typeof yTaggers !== 'object'
					? yTaggers = [yTaggers, ySubNode.j]
					: yTaggers.push(ySubNode.j);

				ySubNode = ySubNode.k;
			}

			// Just bail if different numbers of taggers. This implies the
			// structure of the virtual DOM has changed.
			if (nesting && xTaggers.length !== yTaggers.length)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			// check if taggers are "the same"
			if (nesting ? !_VirtualDom_pairwiseRefEqual(xTaggers, yTaggers) : xTaggers !== yTaggers)
			{
				_VirtualDom_pushPatch(patches, 2, index, yTaggers);
			}

			// diff everything below the taggers
			_VirtualDom_diffHelp(xSubNode, ySubNode, patches, index + 1);
			return;

		case 0:
			if (x.a !== y.a)
			{
				_VirtualDom_pushPatch(patches, 3, index, y.a);
			}
			return;

		case 1:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKids);
			return;

		case 2:
			_VirtualDom_diffNodes(x, y, patches, index, _VirtualDom_diffKeyedKids);
			return;

		case 3:
			if (x.h !== y.h)
			{
				_VirtualDom_pushPatch(patches, 0, index, y);
				return;
			}

			var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
			factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

			var patch = y.i(x.g, y.g);
			patch && _VirtualDom_pushPatch(patches, 5, index, patch);

			return;
	}
}

// assumes the incoming arrays are the same length
function _VirtualDom_pairwiseRefEqual(as, bs)
{
	for (var i = 0; i < as.length; i++)
	{
		if (as[i] !== bs[i])
		{
			return false;
		}
	}

	return true;
}

function _VirtualDom_diffNodes(x, y, patches, index, diffKids)
{
	// Bail if obvious indicators have changed. Implies more serious
	// structural changes such that it's not worth it to diff.
	if (x.c !== y.c || x.f !== y.f)
	{
		_VirtualDom_pushPatch(patches, 0, index, y);
		return;
	}

	var factsDiff = _VirtualDom_diffFacts(x.d, y.d);
	factsDiff && _VirtualDom_pushPatch(patches, 4, index, factsDiff);

	diffKids(x, y, patches, index);
}



// DIFF FACTS


// TODO Instead of creating a new diff object, it's possible to just test if
// there *is* a diff. During the actual patch, do the diff again and make the
// modifications directly. This way, there's no new allocations. Worth it?
function _VirtualDom_diffFacts(x, y, category)
{
	var diff;

	// look for changes and removals
	for (var xKey in x)
	{
		if (xKey === 'a1' || xKey === 'a0' || xKey === 'a3' || xKey === 'a4')
		{
			var subDiff = _VirtualDom_diffFacts(x[xKey], y[xKey] || {}, xKey);
			if (subDiff)
			{
				diff = diff || {};
				diff[xKey] = subDiff;
			}
			continue;
		}

		// remove if not in the new facts
		if (!(xKey in y))
		{
			diff = diff || {};
			diff[xKey] =
				!category
					? (typeof x[xKey] === 'string' ? '' : null)
					:
				(category === 'a1')
					? ''
					:
				(category === 'a0' || category === 'a3')
					? undefined
					:
				{ f: x[xKey].f, o: undefined };

			continue;
		}

		var xValue = x[xKey];
		var yValue = y[xKey];

		// reference equal, so don't worry about it
		if (xValue === yValue && xKey !== 'value' && xKey !== 'checked'
			|| category === 'a0' && _VirtualDom_equalEvents(xValue, yValue))
		{
			continue;
		}

		diff = diff || {};
		diff[xKey] = yValue;
	}

	// add new stuff
	for (var yKey in y)
	{
		if (!(yKey in x))
		{
			diff = diff || {};
			diff[yKey] = y[yKey];
		}
	}

	return diff;
}



// DIFF KIDS


function _VirtualDom_diffKids(xParent, yParent, patches, index)
{
	var xKids = xParent.e;
	var yKids = yParent.e;

	var xLen = xKids.length;
	var yLen = yKids.length;

	// FIGURE OUT IF THERE ARE INSERTS OR REMOVALS

	if (xLen > yLen)
	{
		_VirtualDom_pushPatch(patches, 6, index, {
			v: yLen,
			i: xLen - yLen
		});
	}
	else if (xLen < yLen)
	{
		_VirtualDom_pushPatch(patches, 7, index, {
			v: xLen,
			e: yKids
		});
	}

	// PAIRWISE DIFF EVERYTHING ELSE

	for (var minLen = xLen < yLen ? xLen : yLen, i = 0; i < minLen; i++)
	{
		var xKid = xKids[i];
		_VirtualDom_diffHelp(xKid, yKids[i], patches, ++index);
		index += xKid.b || 0;
	}
}



// KEYED DIFF


function _VirtualDom_diffKeyedKids(xParent, yParent, patches, rootIndex)
{
	var localPatches = [];

	var changes = {}; // Dict String Entry
	var inserts = []; // Array { index : Int, entry : Entry }
	// type Entry = { tag : String, vnode : VNode, index : Int, data : _ }

	var xKids = xParent.e;
	var yKids = yParent.e;
	var xLen = xKids.length;
	var yLen = yKids.length;
	var xIndex = 0;
	var yIndex = 0;

	var index = rootIndex;

	while (xIndex < xLen && yIndex < yLen)
	{
		var x = xKids[xIndex];
		var y = yKids[yIndex];

		var xKey = x.a;
		var yKey = y.a;
		var xNode = x.b;
		var yNode = y.b;

		// check if keys match

		if (xKey === yKey)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNode, localPatches, index);
			index += xNode.b || 0;

			xIndex++;
			yIndex++;
			continue;
		}

		// look ahead 1 to detect insertions and removals.

		var xNext = xKids[xIndex + 1];
		var yNext = yKids[yIndex + 1];

		if (xNext)
		{
			var xNextKey = xNext.a;
			var xNextNode = xNext.b;
			var oldMatch = yKey === xNextKey;
		}

		if (yNext)
		{
			var yNextKey = yNext.a;
			var yNextNode = yNext.b;
			var newMatch = xKey === yNextKey;
		}


		// swap x and y
		if (newMatch && oldMatch)
		{
			index++;
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			_VirtualDom_insertNode(changes, localPatches, xKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNextNode, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		// insert y
		if (newMatch)
		{
			index++;
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			_VirtualDom_diffHelp(xNode, yNextNode, localPatches, index);
			index += xNode.b || 0;

			xIndex += 1;
			yIndex += 2;
			continue;
		}

		// remove x
		if (oldMatch)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 1;
			continue;
		}

		// remove x, insert y
		if (xNext && xNextKey === yNextKey)
		{
			index++;
			_VirtualDom_removeNode(changes, localPatches, xKey, xNode, index);
			_VirtualDom_insertNode(changes, localPatches, yKey, yNode, yIndex, inserts);
			index += xNode.b || 0;

			index++;
			_VirtualDom_diffHelp(xNextNode, yNextNode, localPatches, index);
			index += xNextNode.b || 0;

			xIndex += 2;
			yIndex += 2;
			continue;
		}

		break;
	}

	// eat up any remaining nodes with removeNode and insertNode

	while (xIndex < xLen)
	{
		index++;
		var x = xKids[xIndex];
		var xNode = x.b;
		_VirtualDom_removeNode(changes, localPatches, x.a, xNode, index);
		index += xNode.b || 0;
		xIndex++;
	}

	while (yIndex < yLen)
	{
		var endInserts = endInserts || [];
		var y = yKids[yIndex];
		_VirtualDom_insertNode(changes, localPatches, y.a, y.b, undefined, endInserts);
		yIndex++;
	}

	if (localPatches.length > 0 || inserts.length > 0 || endInserts)
	{
		_VirtualDom_pushPatch(patches, 8, rootIndex, {
			w: localPatches,
			x: inserts,
			y: endInserts
		});
	}
}



// CHANGES FROM KEYED DIFF


var _VirtualDom_POSTFIX = '_elmW6BL';


function _VirtualDom_insertNode(changes, localPatches, key, vnode, yIndex, inserts)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		entry = {
			c: 0,
			z: vnode,
			r: yIndex,
			s: undefined
		};

		inserts.push({ r: yIndex, A: entry });
		changes[key] = entry;

		return;
	}

	// this key was removed earlier, a match!
	if (entry.c === 1)
	{
		inserts.push({ r: yIndex, A: entry });

		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(entry.z, vnode, subPatches, entry.r);
		entry.r = yIndex;
		entry.s.s = {
			w: subPatches,
			A: entry
		};

		return;
	}

	// this key has already been inserted or moved, a duplicate!
	_VirtualDom_insertNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, yIndex, inserts);
}


function _VirtualDom_removeNode(changes, localPatches, key, vnode, index)
{
	var entry = changes[key];

	// never seen this key before
	if (!entry)
	{
		var patch = _VirtualDom_pushPatch(localPatches, 9, index, undefined);

		changes[key] = {
			c: 1,
			z: vnode,
			r: index,
			s: patch
		};

		return;
	}

	// this key was inserted earlier, a match!
	if (entry.c === 0)
	{
		entry.c = 2;
		var subPatches = [];
		_VirtualDom_diffHelp(vnode, entry.z, subPatches, index);

		_VirtualDom_pushPatch(localPatches, 9, index, {
			w: subPatches,
			A: entry
		});

		return;
	}

	// this key has already been removed or moved, a duplicate!
	_VirtualDom_removeNode(changes, localPatches, key + _VirtualDom_POSTFIX, vnode, index);
}



// ADD DOM NODES
//
// Each DOM node has an "index" assigned in order of traversal. It is important
// to minimize our crawl over the actual DOM, so these indexes (along with the
// descendantsCount of virtual nodes) let us skip touching entire subtrees of
// the DOM if we know there are no patches there.


function _VirtualDom_addDomNodes(domNode, vNode, patches, eventNode)
{
	_VirtualDom_addDomNodesHelp(domNode, vNode, patches, 0, 0, vNode.b, eventNode);
}


// assumes `patches` is non-empty and indexes increase monotonically.
function _VirtualDom_addDomNodesHelp(domNode, vNode, patches, i, low, high, eventNode)
{
	var patch = patches[i];
	var index = patch.r;

	while (index === low)
	{
		var patchType = patch.$;

		if (patchType === 1)
		{
			_VirtualDom_addDomNodes(domNode, vNode.k, patch.s, eventNode);
		}
		else if (patchType === 8)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var subPatches = patch.s.w;
			if (subPatches.length > 0)
			{
				_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
			}
		}
		else if (patchType === 9)
		{
			patch.t = domNode;
			patch.u = eventNode;

			var data = patch.s;
			if (data)
			{
				data.A.s = domNode;
				var subPatches = data.w;
				if (subPatches.length > 0)
				{
					_VirtualDom_addDomNodesHelp(domNode, vNode, subPatches, 0, low, high, eventNode);
				}
			}
		}
		else
		{
			patch.t = domNode;
			patch.u = eventNode;
		}

		i++;

		if (!(patch = patches[i]) || (index = patch.r) > high)
		{
			return i;
		}
	}

	var tag = vNode.$;

	if (tag === 4)
	{
		var subNode = vNode.k;

		while (subNode.$ === 4)
		{
			subNode = subNode.k;
		}

		return _VirtualDom_addDomNodesHelp(domNode, subNode, patches, i, low + 1, high, domNode.elm_event_node_ref);
	}

	// tag must be 1 or 2 at this point

	var vKids = vNode.e;
	var childNodes = domNode.childNodes;
	for (var j = 0; j < vKids.length; j++)
	{
		low++;
		var vKid = tag === 1 ? vKids[j] : vKids[j].b;
		var nextLow = low + (vKid.b || 0);
		if (low <= index && index <= nextLow)
		{
			i = _VirtualDom_addDomNodesHelp(childNodes[j], vKid, patches, i, low, nextLow, eventNode);
			if (!(patch = patches[i]) || (index = patch.r) > high)
			{
				return i;
			}
		}
		low = nextLow;
	}
	return i;
}



// APPLY PATCHES


function _VirtualDom_applyPatches(rootDomNode, oldVirtualNode, patches, eventNode)
{
	if (patches.length === 0)
	{
		return rootDomNode;
	}

	_VirtualDom_addDomNodes(rootDomNode, oldVirtualNode, patches, eventNode);
	return _VirtualDom_applyPatchesHelp(rootDomNode, patches);
}

function _VirtualDom_applyPatchesHelp(rootDomNode, patches)
{
	for (var i = 0; i < patches.length; i++)
	{
		var patch = patches[i];
		var localDomNode = patch.t
		var newNode = _VirtualDom_applyPatch(localDomNode, patch);
		if (localDomNode === rootDomNode)
		{
			rootDomNode = newNode;
		}
	}
	return rootDomNode;
}

function _VirtualDom_applyPatch(domNode, patch)
{
	switch (patch.$)
	{
		case 0:
			return _VirtualDom_applyPatchRedraw(domNode, patch.s, patch.u);

		case 4:
			_VirtualDom_applyFacts(domNode, patch.u, patch.s);
			return domNode;

		case 3:
			domNode.replaceData(0, domNode.length, patch.s);
			return domNode;

		case 1:
			return _VirtualDom_applyPatchesHelp(domNode, patch.s);

		case 2:
			if (domNode.elm_event_node_ref)
			{
				domNode.elm_event_node_ref.j = patch.s;
			}
			else
			{
				domNode.elm_event_node_ref = { j: patch.s, p: patch.u };
			}
			return domNode;

		case 6:
			var data = patch.s;
			for (var i = 0; i < data.i; i++)
			{
				domNode.removeChild(domNode.childNodes[data.v]);
			}
			return domNode;

		case 7:
			var data = patch.s;
			var kids = data.e;
			var i = data.v;
			var theEnd = domNode.childNodes[i];
			for (; i < kids.length; i++)
			{
				domNode.insertBefore(_VirtualDom_render(kids[i], patch.u), theEnd);
			}
			return domNode;

		case 9:
			var data = patch.s;
			if (!data)
			{
				domNode.parentNode.removeChild(domNode);
				return domNode;
			}
			var entry = data.A;
			if (typeof entry.r !== 'undefined')
			{
				domNode.parentNode.removeChild(domNode);
			}
			entry.s = _VirtualDom_applyPatchesHelp(domNode, data.w);
			return domNode;

		case 8:
			return _VirtualDom_applyPatchReorder(domNode, patch);

		case 5:
			return patch.s(domNode);

		default:
			_Debug_crash(10); // 'Ran into an unknown patch!'
	}
}


function _VirtualDom_applyPatchRedraw(domNode, vNode, eventNode)
{
	var parentNode = domNode.parentNode;
	var newNode = _VirtualDom_render(vNode, eventNode);

	if (!newNode.elm_event_node_ref)
	{
		newNode.elm_event_node_ref = domNode.elm_event_node_ref;
	}

	if (parentNode && newNode !== domNode)
	{
		parentNode.replaceChild(newNode, domNode);
	}
	return newNode;
}


function _VirtualDom_applyPatchReorder(domNode, patch)
{
	var data = patch.s;

	// remove end inserts
	var frag = _VirtualDom_applyPatchReorderEndInsertsHelp(data.y, patch);

	// removals
	domNode = _VirtualDom_applyPatchesHelp(domNode, data.w);

	// inserts
	var inserts = data.x;
	for (var i = 0; i < inserts.length; i++)
	{
		var insert = inserts[i];
		var entry = insert.A;
		var node = entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u);
		domNode.insertBefore(node, domNode.childNodes[insert.r]);
	}

	// add end inserts
	if (frag)
	{
		_VirtualDom_appendChild(domNode, frag);
	}

	return domNode;
}


function _VirtualDom_applyPatchReorderEndInsertsHelp(endInserts, patch)
{
	if (!endInserts)
	{
		return;
	}

	var frag = _VirtualDom_doc.createDocumentFragment();
	for (var i = 0; i < endInserts.length; i++)
	{
		var insert = endInserts[i];
		var entry = insert.A;
		_VirtualDom_appendChild(frag, entry.c === 2
			? entry.s
			: _VirtualDom_render(entry.z, patch.u)
		);
	}
	return frag;
}


function _VirtualDom_virtualize(node)
{
	// TEXT NODES

	if (node.nodeType === 3)
	{
		return _VirtualDom_text(node.textContent);
	}


	// WEIRD NODES

	if (node.nodeType !== 1)
	{
		return _VirtualDom_text('');
	}


	// ELEMENT NODES

	var attrList = _List_Nil;
	var attrs = node.attributes;
	for (var i = attrs.length; i--; )
	{
		var attr = attrs[i];
		var name = attr.name;
		var value = attr.value;
		attrList = _List_Cons( A2(_VirtualDom_attribute, name, value), attrList );
	}

	var tag = node.tagName.toLowerCase();
	var kidList = _List_Nil;
	var kids = node.childNodes;

	for (var i = kids.length; i--; )
	{
		kidList = _List_Cons(_VirtualDom_virtualize(kids[i]), kidList);
	}
	return A3(_VirtualDom_node, tag, attrList, kidList);
}

function _VirtualDom_dekey(keyedNode)
{
	var keyedKids = keyedNode.e;
	var len = keyedKids.length;
	var kids = new Array(len);
	for (var i = 0; i < len; i++)
	{
		kids[i] = keyedKids[i].b;
	}

	return {
		$: 1,
		c: keyedNode.c,
		d: keyedNode.d,
		e: kids,
		f: keyedNode.f,
		b: keyedNode.b
	};
}



// ELEMENT


var _Debugger_element;

var _Browser_element = _Debugger_element || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bq,
		impl.bN,
		impl.bK,
		function(sendToApp, initialModel) {
			var view = impl.bP;
			/**/
			var domNode = args['node'];
			//*/
			/**_UNUSED/
			var domNode = args && args['node'] ? args['node'] : _Debug_crash(0);
			//*/
			var currNode = _VirtualDom_virtualize(domNode);

			return _Browser_makeAnimator(initialModel, function(model)
			{
				var nextNode = view(model);
				var patches = _VirtualDom_diff(currNode, nextNode);
				domNode = _VirtualDom_applyPatches(domNode, currNode, patches, sendToApp);
				currNode = nextNode;
			});
		}
	);
});



// DOCUMENT


var _Debugger_document;

var _Browser_document = _Debugger_document || F4(function(impl, flagDecoder, debugMetadata, args)
{
	return _Platform_initialize(
		flagDecoder,
		args,
		impl.bq,
		impl.bN,
		impl.bK,
		function(sendToApp, initialModel) {
			var divertHrefToApp = impl.Z && impl.Z(sendToApp)
			var view = impl.bP;
			var title = _VirtualDom_doc.title;
			var bodyNode = _VirtualDom_doc.body;
			var currNode = _VirtualDom_virtualize(bodyNode);
			return _Browser_makeAnimator(initialModel, function(model)
			{
				_VirtualDom_divertHrefToApp = divertHrefToApp;
				var doc = view(model);
				var nextNode = _VirtualDom_node('body')(_List_Nil)(doc.be);
				var patches = _VirtualDom_diff(currNode, nextNode);
				bodyNode = _VirtualDom_applyPatches(bodyNode, currNode, patches, sendToApp);
				currNode = nextNode;
				_VirtualDom_divertHrefToApp = 0;
				(title !== doc.bM) && (_VirtualDom_doc.title = title = doc.bM);
			});
		}
	);
});



// ANIMATION


var _Browser_requestAnimationFrame =
	typeof requestAnimationFrame !== 'undefined'
		? requestAnimationFrame
		: function(callback) { setTimeout(callback, 1000 / 60); };


function _Browser_makeAnimator(model, draw)
{
	draw(model);

	var state = 0;

	function updateIfNeeded()
	{
		state = state === 1
			? 0
			: ( _Browser_requestAnimationFrame(updateIfNeeded), draw(model), 1 );
	}

	return function(nextModel, isSync)
	{
		model = nextModel;

		isSync
			? ( draw(model),
				state === 2 && (state = 1)
				)
			: ( state === 0 && _Browser_requestAnimationFrame(updateIfNeeded),
				state = 2
				);
	};
}



// APPLICATION


function _Browser_application(impl)
{
	var onUrlChange = impl.by;
	var onUrlRequest = impl.bz;
	var key = function() { key.a(onUrlChange(_Browser_getUrl())); };

	return _Browser_document({
		Z: function(sendToApp)
		{
			key.a = sendToApp;
			_Browser_window.addEventListener('popstate', key);
			_Browser_window.navigator.userAgent.indexOf('Trident') < 0 || _Browser_window.addEventListener('hashchange', key);

			return F2(function(domNode, event)
			{
				if (!event.ctrlKey && !event.metaKey && !event.shiftKey && event.button < 1 && !domNode.target && !domNode.download)
				{
					event.preventDefault();
					var href = domNode.href;
					var curr = _Browser_getUrl();
					var next = elm$url$Url$fromString(href).a;
					sendToApp(onUrlRequest(
						(next
							&& curr.a_ === next.a_
							&& curr.aL === next.aL
							&& curr.aX.a === next.aX.a
						)
							? elm$browser$Browser$Internal(next)
							: elm$browser$Browser$External(href)
					));
				}
			});
		},
		bq: function(flags)
		{
			return A3(impl.bq, flags, _Browser_getUrl(), key);
		},
		bP: impl.bP,
		bN: impl.bN,
		bK: impl.bK
	});
}

function _Browser_getUrl()
{
	return elm$url$Url$fromString(_VirtualDom_doc.location.href).a || _Debug_crash(1);
}

var _Browser_go = F2(function(key, n)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		n && history.go(n);
		key();
	}));
});

var _Browser_pushUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.pushState({}, '', url);
		key();
	}));
});

var _Browser_replaceUrl = F2(function(key, url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function() {
		history.replaceState({}, '', url);
		key();
	}));
});



// GLOBAL EVENTS


var _Browser_fakeNode = { addEventListener: function() {}, removeEventListener: function() {} };
var _Browser_doc = typeof document !== 'undefined' ? document : _Browser_fakeNode;
var _Browser_window = typeof window !== 'undefined' ? window : _Browser_fakeNode;

var _Browser_on = F3(function(node, eventName, sendToSelf)
{
	return _Scheduler_spawn(_Scheduler_binding(function(callback)
	{
		function handler(event)	{ _Scheduler_rawSpawn(sendToSelf(event)); }
		node.addEventListener(eventName, handler, _VirtualDom_passiveSupported && { passive: true });
		return function() { node.removeEventListener(eventName, handler); };
	}));
});

var _Browser_decodeEvent = F2(function(decoder, event)
{
	var result = _Json_runHelp(decoder, event);
	return elm$core$Result$isOk(result) ? elm$core$Maybe$Just(result.a) : elm$core$Maybe$Nothing;
});



// PAGE VISIBILITY


function _Browser_visibilityInfo()
{
	return (typeof _VirtualDom_doc.hidden !== 'undefined')
		? { bm: 'hidden', S: 'visibilitychange' }
		:
	(typeof _VirtualDom_doc.mozHidden !== 'undefined')
		? { bm: 'mozHidden', S: 'mozvisibilitychange' }
		:
	(typeof _VirtualDom_doc.msHidden !== 'undefined')
		? { bm: 'msHidden', S: 'msvisibilitychange' }
		:
	(typeof _VirtualDom_doc.webkitHidden !== 'undefined')
		? { bm: 'webkitHidden', S: 'webkitvisibilitychange' }
		: { bm: 'hidden', S: 'visibilitychange' };
}



// ANIMATION FRAMES


function _Browser_rAF()
{
	return _Scheduler_binding(function(callback)
	{
		var id = requestAnimationFrame(function() {
			callback(_Scheduler_succeed(Date.now()));
		});

		return function() {
			cancelAnimationFrame(id);
		};
	});
}


function _Browser_now()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(Date.now()));
	});
}



// DOM STUFF


function _Browser_withNode(id, doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			var node = document.getElementById(id);
			callback(node
				? _Scheduler_succeed(doStuff(node))
				: _Scheduler_fail(elm$browser$Browser$Dom$NotFound(id))
			);
		});
	});
}


function _Browser_withWindow(doStuff)
{
	return _Scheduler_binding(function(callback)
	{
		_Browser_requestAnimationFrame(function() {
			callback(_Scheduler_succeed(doStuff()));
		});
	});
}


// FOCUS and BLUR


var _Browser_call = F2(function(functionName, id)
{
	return _Browser_withNode(id, function(node) {
		node[functionName]();
		return _Utils_Tuple0;
	});
});



// WINDOW VIEWPORT


function _Browser_getViewport()
{
	return {
		bG: _Browser_getScene(),
		bb: {
			P: _Browser_window.pageXOffset,
			x: _Browser_window.pageYOffset,
			i: _Browser_doc.documentElement.clientWidth,
			al: _Browser_doc.documentElement.clientHeight
		}
	};
}

function _Browser_getScene()
{
	var body = _Browser_doc.body;
	var elem = _Browser_doc.documentElement;
	return {
		i: Math.max(body.scrollWidth, body.offsetWidth, elem.scrollWidth, elem.offsetWidth, elem.clientWidth),
		al: Math.max(body.scrollHeight, body.offsetHeight, elem.scrollHeight, elem.offsetHeight, elem.clientHeight)
	};
}

var _Browser_setViewport = F2(function(x, y)
{
	return _Browser_withWindow(function()
	{
		_Browser_window.scroll(x, y);
		return _Utils_Tuple0;
	});
});



// ELEMENT VIEWPORT


function _Browser_getViewportOf(id)
{
	return _Browser_withNode(id, function(node)
	{
		return {
			bG: {
				i: node.scrollWidth,
				al: node.scrollHeight
			},
			bb: {
				P: node.scrollLeft,
				x: node.scrollTop,
				i: node.clientWidth,
				al: node.clientHeight
			}
		};
	});
}


var _Browser_setViewportOf = F3(function(id, x, y)
{
	return _Browser_withNode(id, function(node)
	{
		node.scrollLeft = x;
		node.scrollTop = y;
		return _Utils_Tuple0;
	});
});



// ELEMENT


function _Browser_getElement(id)
{
	return _Browser_withNode(id, function(node)
	{
		var rect = node.getBoundingClientRect();
		var x = _Browser_window.pageXOffset;
		var y = _Browser_window.pageYOffset;
		return {
			bG: _Browser_getScene(),
			bb: {
				P: x,
				x: y,
				i: _Browser_doc.documentElement.clientWidth,
				al: _Browser_doc.documentElement.clientHeight
			},
			bj: {
				P: x + rect.left,
				x: y + rect.top,
				i: rect.width,
				al: rect.height
			}
		};
	});
}



// LOAD and RELOAD


function _Browser_reload(skipCache)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		_VirtualDom_doc.location.reload(skipCache);
	}));
}

function _Browser_load(url)
{
	return A2(elm$core$Task$perform, elm$core$Basics$never, _Scheduler_binding(function(callback)
	{
		try
		{
			_Browser_window.location = url;
		}
		catch(err)
		{
			// Only Firefox can throw a NS_ERROR_MALFORMED_URI exception here.
			// Other browsers reload the page, so let's be consistent about that.
			_VirtualDom_doc.location.reload(false);
		}
	}));
}



function _Time_now(millisToPosix)
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(millisToPosix(Date.now())));
	});
}

var _Time_setInterval = F2(function(interval, task)
{
	return _Scheduler_binding(function(callback)
	{
		var id = setInterval(function() { _Scheduler_rawSpawn(task); }, interval);
		return function() { clearInterval(id); };
	});
});

function _Time_here()
{
	return _Scheduler_binding(function(callback)
	{
		callback(_Scheduler_succeed(
			A2(elm$time$Time$customZone, -(new Date().getTimezoneOffset()), _List_Nil)
		));
	});
}


function _Time_getZoneName()
{
	return _Scheduler_binding(function(callback)
	{
		try
		{
			var name = elm$time$Time$Name(Intl.DateTimeFormat().resolvedOptions().timeZone);
		}
		catch (e)
		{
			var name = elm$time$Time$Offset(new Date().getTimezoneOffset());
		}
		callback(_Scheduler_succeed(name));
	});
}


// CREATE

var _Regex_never = /.^/;

var _Regex_fromStringWith = F2(function(options, string)
{
	var flags = 'g';
	if (options.bv) { flags += 'm'; }
	if (options.bg) { flags += 'i'; }

	try
	{
		return elm$core$Maybe$Just(new RegExp(string, flags));
	}
	catch(error)
	{
		return elm$core$Maybe$Nothing;
	}
});


// USE

var _Regex_contains = F2(function(re, string)
{
	return string.match(re) !== null;
});


var _Regex_findAtMost = F3(function(n, re, str)
{
	var out = [];
	var number = 0;
	var string = str;
	var lastIndex = re.lastIndex;
	var prevLastIndex = -1;
	var result;
	while (number++ < n && (result = re.exec(string)))
	{
		if (prevLastIndex == re.lastIndex) break;
		var i = result.length - 1;
		var subs = new Array(i);
		while (i > 0)
		{
			var submatch = result[i];
			subs[--i] = submatch
				? elm$core$Maybe$Just(submatch)
				: elm$core$Maybe$Nothing;
		}
		out.push(A4(elm$regex$Regex$Match, result[0], result.index, number, _List_fromArray(subs)));
		prevLastIndex = re.lastIndex;
	}
	re.lastIndex = lastIndex;
	return _List_fromArray(out);
});


var _Regex_replaceAtMost = F4(function(n, re, replacer, string)
{
	var count = 0;
	function jsReplacer(match)
	{
		if (count++ >= n)
		{
			return match;
		}
		var i = arguments.length - 3;
		var submatches = new Array(i);
		while (i > 0)
		{
			var submatch = arguments[i];
			submatches[--i] = submatch
				? elm$core$Maybe$Just(submatch)
				: elm$core$Maybe$Nothing;
		}
		return replacer(A4(elm$regex$Regex$Match, match, arguments[arguments.length - 2], count, _List_fromArray(submatches)));
	}
	return string.replace(re, jsReplacer);
});

var _Regex_splitAtMost = F3(function(n, re, str)
{
	var string = str;
	var out = [];
	var start = re.lastIndex;
	var restoreLastIndex = re.lastIndex;
	while (n--)
	{
		var result = re.exec(string);
		if (!result) break;
		out.push(string.slice(start, result.index));
		start = re.lastIndex;
	}
	out.push(string.slice(start));
	re.lastIndex = restoreLastIndex;
	return _List_fromArray(out);
});

var _Regex_infinity = Infinity;




// STRINGS


var _Parser_isSubString = F5(function(smallString, offset, row, col, bigString)
{
	var smallLength = smallString.length;
	var isGood = offset + smallLength <= bigString.length;

	for (var i = 0; isGood && i < smallLength; )
	{
		var code = bigString.charCodeAt(offset);
		isGood =
			smallString[i++] === bigString[offset++]
			&& (
				code === 0x000A /* \n */
					? ( row++, col=1 )
					: ( col++, (code & 0xF800) === 0xD800 ? smallString[i++] === bigString[offset++] : 1 )
			)
	}

	return _Utils_Tuple3(isGood ? offset : -1, row, col);
});



// CHARS


var _Parser_isSubChar = F3(function(predicate, offset, string)
{
	return (
		string.length <= offset
			? -1
			:
		(string.charCodeAt(offset) & 0xF800) === 0xD800
			? (predicate(_Utils_chr(string.substr(offset, 2))) ? offset + 2 : -1)
			:
		(predicate(_Utils_chr(string[offset]))
			? ((string[offset] === '\n') ? -2 : (offset + 1))
			: -1
		)
	);
});


var _Parser_isAsciiCode = F3(function(code, offset, string)
{
	return string.charCodeAt(offset) === code;
});



// NUMBERS


var _Parser_chompBase10 = F2(function(offset, string)
{
	for (; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (code < 0x30 || 0x39 < code)
		{
			return offset;
		}
	}
	return offset;
});


var _Parser_consumeBase = F3(function(base, offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var digit = string.charCodeAt(offset) - 0x30;
		if (digit < 0 || base <= digit) break;
		total = base * total + digit;
	}
	return _Utils_Tuple2(offset, total);
});


var _Parser_consumeBase16 = F2(function(offset, string)
{
	for (var total = 0; offset < string.length; offset++)
	{
		var code = string.charCodeAt(offset);
		if (0x30 <= code && code <= 0x39)
		{
			total = 16 * total + code - 0x30;
		}
		else if (0x41 <= code && code <= 0x46)
		{
			total = 16 * total + code - 55;
		}
		else if (0x61 <= code && code <= 0x66)
		{
			total = 16 * total + code - 87;
		}
		else
		{
			break;
		}
	}
	return _Utils_Tuple2(offset, total);
});



// FIND STRING


var _Parser_findSubString = F5(function(smallString, offset, row, col, bigString)
{
	var newOffset = bigString.indexOf(smallString, offset);
	var target = newOffset < 0 ? bigString.length : newOffset + smallString.length;

	while (offset < target)
	{
		var code = bigString.charCodeAt(offset++);
		code === 0x000A /* \n */
			? ( col=1, row++ )
			: ( col++, (code & 0xF800) === 0xD800 && offset++ )
	}

	return _Utils_Tuple3(newOffset, row, col);
});



var _Bitwise_and = F2(function(a, b)
{
	return a & b;
});

var _Bitwise_or = F2(function(a, b)
{
	return a | b;
});

var _Bitwise_xor = F2(function(a, b)
{
	return a ^ b;
});

function _Bitwise_complement(a)
{
	return ~a;
};

var _Bitwise_shiftLeftBy = F2(function(offset, a)
{
	return a << offset;
});

var _Bitwise_shiftRightBy = F2(function(offset, a)
{
	return a >> offset;
});

var _Bitwise_shiftRightZfBy = F2(function(offset, a)
{
	return a >>> offset;
});




// VIRTUAL-DOM WIDGETS


var _Markdown_toHtml = F3(function(options, factList, rawMarkdown)
{
	return _VirtualDom_custom(
		factList,
		{
			a: options,
			b: rawMarkdown
		},
		_Markdown_render,
		_Markdown_diff
	);
});



// WIDGET IMPLEMENTATION


function _Markdown_render(model)
{
	return A2(_Markdown_replace, model, _VirtualDom_doc.createElement('div'));
}


function _Markdown_diff(x, y)
{
	return x.b === y.b && x.a === y.a
		? false
		: _Markdown_replace(y);
}


var _Markdown_replace = F2(function(model, div)
{
	div.innerHTML = _Markdown_marked(model.b, _Markdown_formatOptions(model.a));
	return div;
});



// ACTUAL MARKDOWN PARSER


var _Markdown_marked = function() {
	// catch the `marked` object regardless of the outer environment.
	// (ex. a CommonJS module compatible environment.)
	// note that this depends on marked's implementation of environment detection.
	var module = {};
	var exports = module.exports = {};

	/**
	 * marked - a markdown parser
	 * Copyright (c) 2011-2014, Christopher Jeffrey. (MIT Licensed)
	 * https://github.com/chjj/marked
	 * commit cd2f6f5b7091154c5526e79b5f3bfb4d15995a51
	 */
	(function(){var block={newline:/^\n+/,code:/^( {4}[^\n]+\n*)+/,fences:noop,hr:/^( *[-*_]){3,} *(?:\n+|$)/,heading:/^ *(#{1,6}) *([^\n]+?) *#* *(?:\n+|$)/,nptable:noop,lheading:/^([^\n]+)\n *(=|-){2,} *(?:\n+|$)/,blockquote:/^( *>[^\n]+(\n(?!def)[^\n]+)*\n*)+/,list:/^( *)(bull) [\s\S]+?(?:hr|def|\n{2,}(?! )(?!\1bull )\n*|\s*$)/,html:/^ *(?:comment *(?:\n|\s*$)|closed *(?:\n{2,}|\s*$)|closing *(?:\n{2,}|\s*$))/,def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +["(]([^\n]+)[")])? *(?:\n+|$)/,table:noop,paragraph:/^((?:[^\n]+\n?(?!hr|heading|lheading|blockquote|tag|def))+)\n*/,text:/^[^\n]+/};block.bullet=/(?:[*+-]|\d+\.)/;block.item=/^( *)(bull) [^\n]*(?:\n(?!\1bull )[^\n]*)*/;block.item=replace(block.item,"gm")(/bull/g,block.bullet)();block.list=replace(block.list)(/bull/g,block.bullet)("hr","\\n+(?=\\1?(?:[-*_] *){3,}(?:\\n+|$))")("def","\\n+(?="+block.def.source+")")();block.blockquote=replace(block.blockquote)("def",block.def)();block._tag="(?!(?:"+"a|em|strong|small|s|cite|q|dfn|abbr|data|time|code"+"|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo"+"|span|br|wbr|ins|del|img)\\b)\\w+(?!:/|[^\\w\\s@]*@)\\b";block.html=replace(block.html)("comment",/<!--[\s\S]*?-->/)("closed",/<(tag)[\s\S]+?<\/\1>/)("closing",/<tag(?:"[^"]*"|'[^']*'|[^'">])*?>/)(/tag/g,block._tag)();block.paragraph=replace(block.paragraph)("hr",block.hr)("heading",block.heading)("lheading",block.lheading)("blockquote",block.blockquote)("tag","<"+block._tag)("def",block.def)();block.normal=merge({},block);block.gfm=merge({},block.normal,{fences:/^ *(`{3,}|~{3,})[ \.]*(\S+)? *\n([\s\S]*?)\s*\1 *(?:\n+|$)/,paragraph:/^/,heading:/^ *(#{1,6}) +([^\n]+?) *#* *(?:\n+|$)/});block.gfm.paragraph=replace(block.paragraph)("(?!","(?!"+block.gfm.fences.source.replace("\\1","\\2")+"|"+block.list.source.replace("\\1","\\3")+"|")();block.tables=merge({},block.gfm,{nptable:/^ *(\S.*\|.*)\n *([-:]+ *\|[-| :]*)\n((?:.*\|.*(?:\n|$))*)\n*/,table:/^ *\|(.+)\n *\|( *[-:]+[-| :]*)\n((?: *\|.*(?:\n|$))*)\n*/});function Lexer(options){this.tokens=[];this.tokens.links={};this.options=options||marked.defaults;this.rules=block.normal;if(this.options.gfm){if(this.options.tables){this.rules=block.tables}else{this.rules=block.gfm}}}Lexer.rules=block;Lexer.lex=function(src,options){var lexer=new Lexer(options);return lexer.lex(src)};Lexer.prototype.lex=function(src){src=src.replace(/\r\n|\r/g,"\n").replace(/\t/g,"    ").replace(/\u00a0/g," ").replace(/\u2424/g,"\n");return this.token(src,true)};Lexer.prototype.token=function(src,top,bq){var src=src.replace(/^ +$/gm,""),next,loose,cap,bull,b,item,space,i,l;while(src){if(cap=this.rules.newline.exec(src)){src=src.substring(cap[0].length);if(cap[0].length>1){this.tokens.push({type:"space"})}}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);cap=cap[0].replace(/^ {4}/gm,"");this.tokens.push({type:"code",text:!this.options.pedantic?cap.replace(/\n+$/,""):cap});continue}if(cap=this.rules.fences.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"code",lang:cap[2],text:cap[3]||""});continue}if(cap=this.rules.heading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[1].length,text:cap[2]});continue}if(top&&(cap=this.rules.nptable.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].split(/ *\| */)}this.tokens.push(item);continue}if(cap=this.rules.lheading.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"heading",depth:cap[2]==="="?1:2,text:cap[1]});continue}if(cap=this.rules.hr.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"hr"});continue}if(cap=this.rules.blockquote.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"blockquote_start"});cap=cap[0].replace(/^ *> ?/gm,"");this.token(cap,top,true);this.tokens.push({type:"blockquote_end"});continue}if(cap=this.rules.list.exec(src)){src=src.substring(cap[0].length);bull=cap[2];this.tokens.push({type:"list_start",ordered:bull.length>1});cap=cap[0].match(this.rules.item);next=false;l=cap.length;i=0;for(;i<l;i++){item=cap[i];space=item.length;item=item.replace(/^ *([*+-]|\d+\.) +/,"");if(~item.indexOf("\n ")){space-=item.length;item=!this.options.pedantic?item.replace(new RegExp("^ {1,"+space+"}","gm"),""):item.replace(/^ {1,4}/gm,"")}if(this.options.smartLists&&i!==l-1){b=block.bullet.exec(cap[i+1])[0];if(bull!==b&&!(bull.length>1&&b.length>1)){src=cap.slice(i+1).join("\n")+src;i=l-1}}loose=next||/\n\n(?!\s*$)/.test(item);if(i!==l-1){next=item.charAt(item.length-1)==="\n";if(!loose)loose=next}this.tokens.push({type:loose?"loose_item_start":"list_item_start"});this.token(item,false,bq);this.tokens.push({type:"list_item_end"})}this.tokens.push({type:"list_end"});continue}if(cap=this.rules.html.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:this.options.sanitize?"paragraph":"html",pre:!this.options.sanitizer&&(cap[1]==="pre"||cap[1]==="script"||cap[1]==="style"),text:cap[0]});continue}if(!bq&&top&&(cap=this.rules.def.exec(src))){src=src.substring(cap[0].length);this.tokens.links[cap[1].toLowerCase()]={href:cap[2],title:cap[3]};continue}if(top&&(cap=this.rules.table.exec(src))){src=src.substring(cap[0].length);item={type:"table",header:cap[1].replace(/^ *| *\| *$/g,"").split(/ *\| */),align:cap[2].replace(/^ *|\| *$/g,"").split(/ *\| */),cells:cap[3].replace(/(?: *\| *)?\n$/,"").split("\n")};for(i=0;i<item.align.length;i++){if(/^ *-+: *$/.test(item.align[i])){item.align[i]="right"}else if(/^ *:-+: *$/.test(item.align[i])){item.align[i]="center"}else if(/^ *:-+ *$/.test(item.align[i])){item.align[i]="left"}else{item.align[i]=null}}for(i=0;i<item.cells.length;i++){item.cells[i]=item.cells[i].replace(/^ *\| *| *\| *$/g,"").split(/ *\| */)}this.tokens.push(item);continue}if(top&&(cap=this.rules.paragraph.exec(src))){src=src.substring(cap[0].length);this.tokens.push({type:"paragraph",text:cap[1].charAt(cap[1].length-1)==="\n"?cap[1].slice(0,-1):cap[1]});continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);this.tokens.push({type:"text",text:cap[0]});continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return this.tokens};var inline={escape:/^\\([\\`*{}\[\]()#+\-.!_>])/,autolink:/^<([^ >]+(@|:\/)[^ >]+)>/,url:noop,tag:/^<!--[\s\S]*?-->|^<\/?\w+(?:"[^"]*"|'[^']*'|[^'">])*?>/,link:/^!?\[(inside)\]\(href\)/,reflink:/^!?\[(inside)\]\s*\[([^\]]*)\]/,nolink:/^!?\[((?:\[[^\]]*\]|[^\[\]])*)\]/,strong:/^_\_([\s\S]+?)_\_(?!_)|^\*\*([\s\S]+?)\*\*(?!\*)/,em:/^\b_((?:[^_]|_\_)+?)_\b|^\*((?:\*\*|[\s\S])+?)\*(?!\*)/,code:/^(`+)\s*([\s\S]*?[^`])\s*\1(?!`)/,br:/^ {2,}\n(?!\s*$)/,del:noop,text:/^[\s\S]+?(?=[\\<!\[_*`]| {2,}\n|$)/};inline._inside=/(?:\[[^\]]*\]|[^\[\]]|\](?=[^\[]*\]))*/;inline._href=/\s*<?([\s\S]*?)>?(?:\s+['"]([\s\S]*?)['"])?\s*/;inline.link=replace(inline.link)("inside",inline._inside)("href",inline._href)();inline.reflink=replace(inline.reflink)("inside",inline._inside)();inline.normal=merge({},inline);inline.pedantic=merge({},inline.normal,{strong:/^_\_(?=\S)([\s\S]*?\S)_\_(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,em:/^_(?=\S)([\s\S]*?\S)_(?!_)|^\*(?=\S)([\s\S]*?\S)\*(?!\*)/});inline.gfm=merge({},inline.normal,{escape:replace(inline.escape)("])","~|])")(),url:/^(https?:\/\/[^\s<]+[^<.,:;"')\]\s])/,del:/^~~(?=\S)([\s\S]*?\S)~~/,text:replace(inline.text)("]|","~]|")("|","|https?://|")()});inline.breaks=merge({},inline.gfm,{br:replace(inline.br)("{2,}","*")(),text:replace(inline.gfm.text)("{2,}","*")()});function InlineLexer(links,options){this.options=options||marked.defaults;this.links=links;this.rules=inline.normal;this.renderer=this.options.renderer||new Renderer;this.renderer.options=this.options;if(!this.links){throw new Error("Tokens array requires a `links` property.")}if(this.options.gfm){if(this.options.breaks){this.rules=inline.breaks}else{this.rules=inline.gfm}}else if(this.options.pedantic){this.rules=inline.pedantic}}InlineLexer.rules=inline;InlineLexer.output=function(src,links,options){var inline=new InlineLexer(links,options);return inline.output(src)};InlineLexer.prototype.output=function(src){var out="",link,text,href,cap;while(src){if(cap=this.rules.escape.exec(src)){src=src.substring(cap[0].length);out+=cap[1];continue}if(cap=this.rules.autolink.exec(src)){src=src.substring(cap[0].length);if(cap[2]==="@"){text=cap[1].charAt(6)===":"?this.mangle(cap[1].substring(7)):this.mangle(cap[1]);href=this.mangle("mailto:")+text}else{text=escape(cap[1]);href=text}out+=this.renderer.link(href,null,text);continue}if(!this.inLink&&(cap=this.rules.url.exec(src))){src=src.substring(cap[0].length);text=escape(cap[1]);href=text;out+=this.renderer.link(href,null,text);continue}if(cap=this.rules.tag.exec(src)){if(!this.inLink&&/^<a /i.test(cap[0])){this.inLink=true}else if(this.inLink&&/^<\/a>/i.test(cap[0])){this.inLink=false}src=src.substring(cap[0].length);out+=this.options.sanitize?this.options.sanitizer?this.options.sanitizer(cap[0]):escape(cap[0]):cap[0];continue}if(cap=this.rules.link.exec(src)){src=src.substring(cap[0].length);this.inLink=true;out+=this.outputLink(cap,{href:cap[2],title:cap[3]});this.inLink=false;continue}if((cap=this.rules.reflink.exec(src))||(cap=this.rules.nolink.exec(src))){src=src.substring(cap[0].length);link=(cap[2]||cap[1]).replace(/\s+/g," ");link=this.links[link.toLowerCase()];if(!link||!link.href){out+=cap[0].charAt(0);src=cap[0].substring(1)+src;continue}this.inLink=true;out+=this.outputLink(cap,link);this.inLink=false;continue}if(cap=this.rules.strong.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.strong(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.em.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.em(this.output(cap[2]||cap[1]));continue}if(cap=this.rules.code.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.codespan(escape(cap[2],true));continue}if(cap=this.rules.br.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.br();continue}if(cap=this.rules.del.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.del(this.output(cap[1]));continue}if(cap=this.rules.text.exec(src)){src=src.substring(cap[0].length);out+=this.renderer.text(escape(this.smartypants(cap[0])));continue}if(src){throw new Error("Infinite loop on byte: "+src.charCodeAt(0))}}return out};InlineLexer.prototype.outputLink=function(cap,link){var href=escape(link.href),title=link.title?escape(link.title):null;return cap[0].charAt(0)!=="!"?this.renderer.link(href,title,this.output(cap[1])):this.renderer.image(href,title,escape(cap[1]))};InlineLexer.prototype.smartypants=function(text){if(!this.options.smartypants)return text;return text.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014\/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014\/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")};InlineLexer.prototype.mangle=function(text){if(!this.options.mangle)return text;var out="",l=text.length,i=0,ch;for(;i<l;i++){ch=text.charCodeAt(i);if(Math.random()>.5){ch="x"+ch.toString(16)}out+="&#"+ch+";"}return out};function Renderer(options){this.options=options||{}}Renderer.prototype.code=function(code,lang,escaped){if(this.options.highlight){var out=this.options.highlight(code,lang);if(out!=null&&out!==code){escaped=true;code=out}}if(!lang){return"<pre><code>"+(escaped?code:escape(code,true))+"\n</code></pre>"}return'<pre><code class="'+this.options.langPrefix+escape(lang,true)+'">'+(escaped?code:escape(code,true))+"\n</code></pre>\n"};Renderer.prototype.blockquote=function(quote){return"<blockquote>\n"+quote+"</blockquote>\n"};Renderer.prototype.html=function(html){return html};Renderer.prototype.heading=function(text,level,raw){return"<h"+level+' id="'+this.options.headerPrefix+raw.toLowerCase().replace(/[^\w]+/g,"-")+'">'+text+"</h"+level+">\n"};Renderer.prototype.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"};Renderer.prototype.list=function(body,ordered){var type=ordered?"ol":"ul";return"<"+type+">\n"+body+"</"+type+">\n"};Renderer.prototype.listitem=function(text){return"<li>"+text+"</li>\n"};Renderer.prototype.paragraph=function(text){return"<p>"+text+"</p>\n"};Renderer.prototype.table=function(header,body){return"<table>\n"+"<thead>\n"+header+"</thead>\n"+"<tbody>\n"+body+"</tbody>\n"+"</table>\n"};Renderer.prototype.tablerow=function(content){return"<tr>\n"+content+"</tr>\n"};Renderer.prototype.tablecell=function(content,flags){var type=flags.header?"th":"td";var tag=flags.align?"<"+type+' style="text-align:'+flags.align+'">':"<"+type+">";return tag+content+"</"+type+">\n"};Renderer.prototype.strong=function(text){return"<strong>"+text+"</strong>"};Renderer.prototype.em=function(text){return"<em>"+text+"</em>"};Renderer.prototype.codespan=function(text){return"<code>"+text+"</code>"};Renderer.prototype.br=function(){return this.options.xhtml?"<br/>":"<br>"};Renderer.prototype.del=function(text){return"<del>"+text+"</del>"};Renderer.prototype.link=function(href,title,text){if(this.options.sanitize){try{var prot=decodeURIComponent(unescape(href)).replace(/[^\w:]/g,"").toLowerCase()}catch(e){return""}if(prot.indexOf("javascript:")===0||prot.indexOf("vbscript:")===0||prot.indexOf("data:")===0){return""}}var out='<a href="'+href+'"';if(title){out+=' title="'+title+'"'}out+=">"+text+"</a>";return out};Renderer.prototype.image=function(href,title,text){var out='<img src="'+href+'" alt="'+text+'"';if(title){out+=' title="'+title+'"'}out+=this.options.xhtml?"/>":">";return out};Renderer.prototype.text=function(text){return text};function Parser(options){this.tokens=[];this.token=null;this.options=options||marked.defaults;this.options.renderer=this.options.renderer||new Renderer;this.renderer=this.options.renderer;this.renderer.options=this.options}Parser.parse=function(src,options,renderer){var parser=new Parser(options,renderer);return parser.parse(src)};Parser.prototype.parse=function(src){this.inline=new InlineLexer(src.links,this.options,this.renderer);this.tokens=src.reverse();var out="";while(this.next()){out+=this.tok()}return out};Parser.prototype.next=function(){return this.token=this.tokens.pop()};Parser.prototype.peek=function(){return this.tokens[this.tokens.length-1]||0};Parser.prototype.parseText=function(){var body=this.token.text;while(this.peek().type==="text"){body+="\n"+this.next().text}return this.inline.output(body)};Parser.prototype.tok=function(){switch(this.token.type){case"space":{return""}case"hr":{return this.renderer.hr()}case"heading":{return this.renderer.heading(this.inline.output(this.token.text),this.token.depth,this.token.text)}case"code":{return this.renderer.code(this.token.text,this.token.lang,this.token.escaped)}case"table":{var header="",body="",i,row,cell,flags,j;cell="";for(i=0;i<this.token.header.length;i++){flags={header:true,align:this.token.align[i]};cell+=this.renderer.tablecell(this.inline.output(this.token.header[i]),{header:true,align:this.token.align[i]})}header+=this.renderer.tablerow(cell);for(i=0;i<this.token.cells.length;i++){row=this.token.cells[i];cell="";for(j=0;j<row.length;j++){cell+=this.renderer.tablecell(this.inline.output(row[j]),{header:false,align:this.token.align[j]})}body+=this.renderer.tablerow(cell)}return this.renderer.table(header,body)}case"blockquote_start":{var body="";while(this.next().type!=="blockquote_end"){body+=this.tok()}return this.renderer.blockquote(body)}case"list_start":{var body="",ordered=this.token.ordered;while(this.next().type!=="list_end"){body+=this.tok()}return this.renderer.list(body,ordered)}case"list_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.token.type==="text"?this.parseText():this.tok()}return this.renderer.listitem(body)}case"loose_item_start":{var body="";while(this.next().type!=="list_item_end"){body+=this.tok()}return this.renderer.listitem(body)}case"html":{var html=!this.token.pre&&!this.options.pedantic?this.inline.output(this.token.text):this.token.text;return this.renderer.html(html)}case"paragraph":{return this.renderer.paragraph(this.inline.output(this.token.text))}case"text":{return this.renderer.paragraph(this.parseText())}}};function escape(html,encode){return html.replace(!encode?/&(?!#?\w+;)/g:/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#39;")}function unescape(html){return html.replace(/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/g,function(_,n){n=n.toLowerCase();if(n==="colon")return":";if(n.charAt(0)==="#"){return n.charAt(1)==="x"?String.fromCharCode(parseInt(n.substring(2),16)):String.fromCharCode(+n.substring(1))}return""})}function replace(regex,opt){regex=regex.source;opt=opt||"";return function self(name,val){if(!name)return new RegExp(regex,opt);val=val.source||val;val=val.replace(/(^|[^\[])\^/g,"$1");regex=regex.replace(name,val);return self}}function noop(){}noop.exec=noop;function merge(obj){var i=1,target,key;for(;i<arguments.length;i++){target=arguments[i];for(key in target){if(Object.prototype.hasOwnProperty.call(target,key)){obj[key]=target[key]}}}return obj}function marked(src,opt,callback){if(callback||typeof opt==="function"){if(!callback){callback=opt;opt=null}opt=merge({},marked.defaults,opt||{});var highlight=opt.highlight,tokens,pending,i=0;try{tokens=Lexer.lex(src,opt)}catch(e){return callback(e)}pending=tokens.length;var done=function(err){if(err){opt.highlight=highlight;return callback(err)}var out;try{out=Parser.parse(tokens,opt)}catch(e){err=e}opt.highlight=highlight;return err?callback(err):callback(null,out)};if(!highlight||highlight.length<3){return done()}delete opt.highlight;if(!pending)return done();for(;i<tokens.length;i++){(function(token){if(token.type!=="code"){return--pending||done()}return highlight(token.text,token.lang,function(err,code){if(err)return done(err);if(code==null||code===token.text){return--pending||done()}token.text=code;token.escaped=true;--pending||done()})})(tokens[i])}return}try{if(opt)opt=merge({},marked.defaults,opt);return Parser.parse(Lexer.lex(src,opt),opt)}catch(e){e.message+="\nPlease report this to https://github.com/chjj/marked.";if((opt||marked.defaults).silent){return"<p>An error occured:</p><pre>"+escape(e.message+"",true)+"</pre>"}throw e}}marked.options=marked.setOptions=function(opt){merge(marked.defaults,opt);return marked};marked.defaults={gfm:true,tables:true,breaks:false,pedantic:false,sanitize:false,sanitizer:null,mangle:true,smartLists:false,silent:false,highlight:null,langPrefix:"lang-",smartypants:false,headerPrefix:"",renderer:new Renderer,xhtml:false};marked.Parser=Parser;marked.parser=Parser.parse;marked.Renderer=Renderer;marked.Lexer=Lexer;marked.lexer=Lexer.lex;marked.InlineLexer=InlineLexer;marked.inlineLexer=InlineLexer.output;marked.parse=marked;if(typeof module!=="undefined"&&typeof exports==="object"){module.exports=marked}else if(typeof define==="function"&&define.amd){define(function(){return marked})}else{this.marked=marked}}).call(function(){return this||(typeof window!=="undefined"?window:global)}());

	return module.exports;
}();


// FORMAT OPTIONS FOR MARKED IMPLEMENTATION

function _Markdown_formatOptions(options)
{
	function toHighlight(code, lang)
	{
		if (!lang && elm$core$Maybe$isJust(options.aD))
		{
			lang = options.aD.a;
		}

		if (typeof hljs !== 'undefined' && lang && hljs.listLanguages().indexOf(lang) >= 0)
		{
			return hljs.highlight(lang, code, true).value;
		}

		return code;
	}

	var gfm = options.aJ.a;

	return {
		highlight: toHighlight,
		gfm: gfm,
		tables: gfm && gfm.bL,
		breaks: gfm && gfm.bf,
		sanitize: options.a2,
		smartypants: options.a4
	};
}
var author$project$Main$UrlChanged = function (a) {
	return {$: 4, a: a};
};
var author$project$Main$UrlRequest = function (a) {
	return {$: 3, a: a};
};
var author$project$Editor$CodeArea$Scroll = F2(
	function (top, left) {
		return {aQ: left, a9: top};
	});
var author$project$Editor$TextStyle$Hex = function (a) {
	return {$: 1, a: a};
};
var author$project$Editor$TextStyle$DefaultColor = {$: 0};
var elm$core$Basics$False = 1;
var author$project$Editor$TextStyle$backgroundColor = function (background) {
	return {R: background, I: false, J: false, V: false, ab: author$project$Editor$TextStyle$DefaultColor};
};
var elm$core$Basics$True = 0;
var author$project$Editor$TextStyle$italic = function (style) {
	return _Utils_update(
		style,
		{J: true});
};
var author$project$Editor$TextStyle$textColor = function (text) {
	return {R: author$project$Editor$TextStyle$DefaultColor, I: false, J: false, V: false, ab: text};
};
var elm$core$Basics$apL = F2(
	function (f, x) {
		return f(x);
	});
var elm$core$Dict$RBEmpty_elm_builtin = {$: -2};
var elm$core$Dict$empty = elm$core$Dict$RBEmpty_elm_builtin;
var elm$core$Dict$Black = 1;
var elm$core$Dict$RBNode_elm_builtin = F5(
	function (a, b, c, d, e) {
		return {$: -1, a: a, b: b, c: c, d: d, e: e};
	});
var elm$core$Elm$JsArray$foldr = _JsArray_foldr;
var elm$core$Array$foldr = F3(
	function (func, baseCase, _n0) {
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = F2(
			function (node, acc) {
				if (!node.$) {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldr, helper, acc, subTree);
				} else {
					var values = node.a;
					return A3(elm$core$Elm$JsArray$foldr, func, acc, values);
				}
			});
		return A3(
			elm$core$Elm$JsArray$foldr,
			helper,
			A3(elm$core$Elm$JsArray$foldr, func, baseCase, tail),
			tree);
	});
var elm$core$Basics$EQ = 1;
var elm$core$Basics$LT = 0;
var elm$core$List$cons = _List_cons;
var elm$core$Array$toList = function (array) {
	return A3(elm$core$Array$foldr, elm$core$List$cons, _List_Nil, array);
};
var elm$core$Basics$GT = 2;
var elm$core$Dict$foldr = F3(
	function (func, acc, t) {
		foldr:
		while (true) {
			if (t.$ === -2) {
				return acc;
			} else {
				var key = t.b;
				var value = t.c;
				var left = t.d;
				var right = t.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldr, func, acc, right)),
					$temp$t = left;
				func = $temp$func;
				acc = $temp$acc;
				t = $temp$t;
				continue foldr;
			}
		}
	});
var elm$core$Dict$toList = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, list) {
				return A2(
					elm$core$List$cons,
					_Utils_Tuple2(key, value),
					list);
			}),
		_List_Nil,
		dict);
};
var elm$core$Dict$keys = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, keyList) {
				return A2(elm$core$List$cons, key, keyList);
			}),
		_List_Nil,
		dict);
};
var elm$core$Set$toList = function (_n0) {
	var dict = _n0;
	return elm$core$Dict$keys(dict);
};
var elm$core$Basics$compare = _Utils_compare;
var elm$core$Dict$Red = 0;
var elm$core$Dict$balance = F5(
	function (color, key, value, left, right) {
		if ((right.$ === -1) && (!right.a)) {
			var _n1 = right.a;
			var rK = right.b;
			var rV = right.c;
			var rLeft = right.d;
			var rRight = right.e;
			if ((left.$ === -1) && (!left.a)) {
				var _n3 = left.a;
				var lK = left.b;
				var lV = left.c;
				var lLeft = left.d;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					0,
					key,
					value,
					A5(elm$core$Dict$RBNode_elm_builtin, 1, lK, lV, lLeft, lRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 1, rK, rV, rLeft, rRight));
			} else {
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					color,
					rK,
					rV,
					A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, left, rLeft),
					rRight);
			}
		} else {
			if ((((left.$ === -1) && (!left.a)) && (left.d.$ === -1)) && (!left.d.a)) {
				var _n5 = left.a;
				var lK = left.b;
				var lV = left.c;
				var _n6 = left.d;
				var _n7 = _n6.a;
				var llK = _n6.b;
				var llV = _n6.c;
				var llLeft = _n6.d;
				var llRight = _n6.e;
				var lRight = left.e;
				return A5(
					elm$core$Dict$RBNode_elm_builtin,
					0,
					lK,
					lV,
					A5(elm$core$Dict$RBNode_elm_builtin, 1, llK, llV, llLeft, llRight),
					A5(elm$core$Dict$RBNode_elm_builtin, 1, key, value, lRight, right));
			} else {
				return A5(elm$core$Dict$RBNode_elm_builtin, color, key, value, left, right);
			}
		}
	});
var elm$core$Dict$insertHelp = F3(
	function (key, value, dict) {
		if (dict.$ === -2) {
			return A5(elm$core$Dict$RBNode_elm_builtin, 0, key, value, elm$core$Dict$RBEmpty_elm_builtin, elm$core$Dict$RBEmpty_elm_builtin);
		} else {
			var nColor = dict.a;
			var nKey = dict.b;
			var nValue = dict.c;
			var nLeft = dict.d;
			var nRight = dict.e;
			var _n1 = A2(elm$core$Basics$compare, key, nKey);
			switch (_n1) {
				case 0:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						A3(elm$core$Dict$insertHelp, key, value, nLeft),
						nRight);
				case 1:
					return A5(elm$core$Dict$RBNode_elm_builtin, nColor, nKey, value, nLeft, nRight);
				default:
					return A5(
						elm$core$Dict$balance,
						nColor,
						nKey,
						nValue,
						nLeft,
						A3(elm$core$Dict$insertHelp, key, value, nRight));
			}
		}
	});
var elm$core$Dict$insert = F3(
	function (key, value, dict) {
		var _n0 = A3(elm$core$Dict$insertHelp, key, value, dict);
		if ((_n0.$ === -1) && (!_n0.a)) {
			var _n1 = _n0.a;
			var k = _n0.b;
			var v = _n0.c;
			var l = _n0.d;
			var r = _n0.e;
			return A5(elm$core$Dict$RBNode_elm_builtin, 1, k, v, l, r);
		} else {
			var x = _n0;
			return x;
		}
	});
var elm$core$List$foldl = F3(
	function (func, acc, list) {
		foldl:
		while (true) {
			if (!list.b) {
				return acc;
			} else {
				var x = list.a;
				var xs = list.b;
				var $temp$func = func,
					$temp$acc = A2(func, x, acc),
					$temp$list = xs;
				func = $temp$func;
				acc = $temp$acc;
				list = $temp$list;
				continue foldl;
			}
		}
	});
var elm$core$Dict$fromList = function (assocs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, dict) {
				var key = _n0.a;
				var value = _n0.b;
				return A3(elm$core$Dict$insert, key, value, dict);
			}),
		elm$core$Dict$empty,
		assocs);
};
var elm$core$Tuple$pair = F2(
	function (a, b) {
		return _Utils_Tuple2(a, b);
	});
var author$project$Editor$CodeArea$defaultStyles = elm$core$Dict$fromList(
	_List_fromArray(
		[
			A2(
			elm$core$Tuple$pair,
			'highlight',
			author$project$Editor$TextStyle$backgroundColor(
				author$project$Editor$TextStyle$Hex('#ffecec'))),
			A2(
			elm$core$Tuple$pair,
			'comment',
			author$project$Editor$TextStyle$italic(
				author$project$Editor$TextStyle$textColor(
					author$project$Editor$TextStyle$Hex('#969896')))),
			A2(
			elm$core$Tuple$pair,
			'eq',
			author$project$Editor$TextStyle$textColor(
				author$project$Editor$TextStyle$Hex('#d73a49'))),
			A2(
			elm$core$Tuple$pair,
			'scope',
			author$project$Editor$TextStyle$textColor(
				author$project$Editor$TextStyle$Hex('#0086b3'))),
			A2(
			elm$core$Tuple$pair,
			'comb',
			author$project$Editor$TextStyle$textColor(
				author$project$Editor$TextStyle$Hex('#63a35c'))),
			A2(
			elm$core$Tuple$pair,
			'var',
			author$project$Editor$TextStyle$textColor(
				author$project$Editor$TextStyle$Hex('#795da3')))
		]));
var elm$core$Basics$negate = function (n) {
	return -n;
};
var author$project$Editor$CodeArea$init = function (_n0) {
	return {
		T: '',
		G: '',
		ag: -1,
		an: 10,
		ai: true,
		as: false,
		aj: '',
		Y: A2(author$project$Editor$CodeArea$Scroll, 0, 0),
		at: _List_Nil,
		ak: author$project$Editor$CodeArea$defaultStyles
	};
};
var author$project$Editor$Data$placeholder = '\r\n[**Start composing**](#NEW) your own set of combinators.\r\n\r\nOr select one of the well-known computational systems:\r\n\r\n  [**SKIY**](#SKIY) or [**BCKWY**](#BCKWY).\r\n\r\nOr try playing [**this**](#BINARYLOGIC1) binary logic example.\r\n\r\nRead more about combinatory logic in [**Wikipedia**](https://en.wikipedia.org/wiki/Combinatory_logic).\r\n\r\nAnnotating combinators with color and optional weight (see examples above) allows to play the [**Combinatris**](http://dirk.rave.org/combinatris/how-to-play.html) game.\r\n\r\nUnlike the original game, expressions don\'t reduce completely at once, but step by step, so that you could stop infinite loops.\r\nScoring also is slightly different but intuitive.\r\n\r\nUse arrow keys or screen buttons to play the game.\r\n\r\nThe project is coded in [**Elm**](http://elm-lang.org/) language.\r\n\r\nThe project is open source on [**GitHub**](https://github.com/undwad/elm-combinatris).\r\n';
var elm$core$Basics$identity = function (x) {
	return x;
};
var elm$core$Array$branchFactor = 32;
var elm$core$Array$Array_elm_builtin = F4(
	function (a, b, c, d) {
		return {$: 0, a: a, b: b, c: c, d: d};
	});
var elm$core$Basics$ceiling = _Basics_ceiling;
var elm$core$Basics$fdiv = _Basics_fdiv;
var elm$core$Basics$logBase = F2(
	function (base, number) {
		return _Basics_log(number) / _Basics_log(base);
	});
var elm$core$Basics$toFloat = _Basics_toFloat;
var elm$core$Array$shiftStep = elm$core$Basics$ceiling(
	A2(elm$core$Basics$logBase, 2, elm$core$Array$branchFactor));
var elm$core$Elm$JsArray$empty = _JsArray_empty;
var elm$core$Array$empty = A4(elm$core$Array$Array_elm_builtin, 0, elm$core$Array$shiftStep, elm$core$Elm$JsArray$empty, elm$core$Elm$JsArray$empty);
var elm$core$Array$Leaf = function (a) {
	return {$: 1, a: a};
};
var elm$core$Array$SubTree = function (a) {
	return {$: 0, a: a};
};
var elm$core$Elm$JsArray$initializeFromList = _JsArray_initializeFromList;
var elm$core$List$reverse = function (list) {
	return A3(elm$core$List$foldl, elm$core$List$cons, _List_Nil, list);
};
var elm$core$Array$compressNodes = F2(
	function (nodes, acc) {
		compressNodes:
		while (true) {
			var _n0 = A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodes);
			var node = _n0.a;
			var remainingNodes = _n0.b;
			var newAcc = A2(
				elm$core$List$cons,
				elm$core$Array$SubTree(node),
				acc);
			if (!remainingNodes.b) {
				return elm$core$List$reverse(newAcc);
			} else {
				var $temp$nodes = remainingNodes,
					$temp$acc = newAcc;
				nodes = $temp$nodes;
				acc = $temp$acc;
				continue compressNodes;
			}
		}
	});
var elm$core$Basics$apR = F2(
	function (x, f) {
		return f(x);
	});
var elm$core$Basics$eq = _Utils_equal;
var elm$core$Tuple$first = function (_n0) {
	var x = _n0.a;
	return x;
};
var elm$core$Array$treeFromBuilder = F2(
	function (nodeList, nodeListSize) {
		treeFromBuilder:
		while (true) {
			var newNodeSize = elm$core$Basics$ceiling(nodeListSize / elm$core$Array$branchFactor);
			if (newNodeSize === 1) {
				return A2(elm$core$Elm$JsArray$initializeFromList, elm$core$Array$branchFactor, nodeList).a;
			} else {
				var $temp$nodeList = A2(elm$core$Array$compressNodes, nodeList, _List_Nil),
					$temp$nodeListSize = newNodeSize;
				nodeList = $temp$nodeList;
				nodeListSize = $temp$nodeListSize;
				continue treeFromBuilder;
			}
		}
	});
var elm$core$Basics$add = _Basics_add;
var elm$core$Basics$floor = _Basics_floor;
var elm$core$Basics$gt = _Utils_gt;
var elm$core$Basics$max = F2(
	function (x, y) {
		return (_Utils_cmp(x, y) > 0) ? x : y;
	});
var elm$core$Basics$mul = _Basics_mul;
var elm$core$Basics$sub = _Basics_sub;
var elm$core$Elm$JsArray$length = _JsArray_length;
var elm$core$Array$builderToArray = F2(
	function (reverseNodeList, builder) {
		if (!builder.e) {
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.f),
				elm$core$Array$shiftStep,
				elm$core$Elm$JsArray$empty,
				builder.f);
		} else {
			var treeLen = builder.e * elm$core$Array$branchFactor;
			var depth = elm$core$Basics$floor(
				A2(elm$core$Basics$logBase, elm$core$Array$branchFactor, treeLen - 1));
			var correctNodeList = reverseNodeList ? elm$core$List$reverse(builder.g) : builder.g;
			var tree = A2(elm$core$Array$treeFromBuilder, correctNodeList, builder.e);
			return A4(
				elm$core$Array$Array_elm_builtin,
				elm$core$Elm$JsArray$length(builder.f) + treeLen,
				A2(elm$core$Basics$max, 5, depth * elm$core$Array$shiftStep),
				tree,
				builder.f);
		}
	});
var elm$core$Basics$idiv = _Basics_idiv;
var elm$core$Basics$lt = _Utils_lt;
var elm$core$Elm$JsArray$initialize = _JsArray_initialize;
var elm$core$Array$initializeHelp = F5(
	function (fn, fromIndex, len, nodeList, tail) {
		initializeHelp:
		while (true) {
			if (fromIndex < 0) {
				return A2(
					elm$core$Array$builderToArray,
					false,
					{g: nodeList, e: (len / elm$core$Array$branchFactor) | 0, f: tail});
			} else {
				var leaf = elm$core$Array$Leaf(
					A3(elm$core$Elm$JsArray$initialize, elm$core$Array$branchFactor, fromIndex, fn));
				var $temp$fn = fn,
					$temp$fromIndex = fromIndex - elm$core$Array$branchFactor,
					$temp$len = len,
					$temp$nodeList = A2(elm$core$List$cons, leaf, nodeList),
					$temp$tail = tail;
				fn = $temp$fn;
				fromIndex = $temp$fromIndex;
				len = $temp$len;
				nodeList = $temp$nodeList;
				tail = $temp$tail;
				continue initializeHelp;
			}
		}
	});
var elm$core$Basics$le = _Utils_le;
var elm$core$Basics$remainderBy = _Basics_remainderBy;
var elm$core$Array$initialize = F2(
	function (len, fn) {
		if (len <= 0) {
			return elm$core$Array$empty;
		} else {
			var tailLen = len % elm$core$Array$branchFactor;
			var tail = A3(elm$core$Elm$JsArray$initialize, tailLen, len - tailLen, fn);
			var initialFromIndex = (len - tailLen) - elm$core$Array$branchFactor;
			return A5(elm$core$Array$initializeHelp, fn, initialFromIndex, len, _List_Nil, tail);
		}
	});
var elm$core$Maybe$Just = function (a) {
	return {$: 0, a: a};
};
var elm$core$Maybe$Nothing = {$: 1};
var elm$core$Result$Err = function (a) {
	return {$: 1, a: a};
};
var elm$core$Result$Ok = function (a) {
	return {$: 0, a: a};
};
var elm$core$Result$isOk = function (result) {
	if (!result.$) {
		return true;
	} else {
		return false;
	}
};
var elm$json$Json$Decode$Failure = F2(
	function (a, b) {
		return {$: 3, a: a, b: b};
	});
var elm$json$Json$Decode$Field = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$json$Json$Decode$Index = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$json$Json$Decode$OneOf = function (a) {
	return {$: 2, a: a};
};
var elm$core$Basics$and = _Basics_and;
var elm$core$Basics$append = _Utils_append;
var elm$core$Basics$or = _Basics_or;
var elm$core$Char$toCode = _Char_toCode;
var elm$core$Char$isLower = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (97 <= code) && (code <= 122);
};
var elm$core$Char$isUpper = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 90) && (65 <= code);
};
var elm$core$Char$isAlpha = function (_char) {
	return elm$core$Char$isLower(_char) || elm$core$Char$isUpper(_char);
};
var elm$core$Char$isDigit = function (_char) {
	var code = elm$core$Char$toCode(_char);
	return (code <= 57) && (48 <= code);
};
var elm$core$Char$isAlphaNum = function (_char) {
	return elm$core$Char$isLower(_char) || (elm$core$Char$isUpper(_char) || elm$core$Char$isDigit(_char));
};
var elm$core$List$length = function (xs) {
	return A3(
		elm$core$List$foldl,
		F2(
			function (_n0, i) {
				return i + 1;
			}),
		0,
		xs);
};
var elm$core$List$map2 = _List_map2;
var elm$core$List$rangeHelp = F3(
	function (lo, hi, list) {
		rangeHelp:
		while (true) {
			if (_Utils_cmp(lo, hi) < 1) {
				var $temp$lo = lo,
					$temp$hi = hi - 1,
					$temp$list = A2(elm$core$List$cons, hi, list);
				lo = $temp$lo;
				hi = $temp$hi;
				list = $temp$list;
				continue rangeHelp;
			} else {
				return list;
			}
		}
	});
var elm$core$List$range = F2(
	function (lo, hi) {
		return A3(elm$core$List$rangeHelp, lo, hi, _List_Nil);
	});
var elm$core$List$indexedMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$map2,
			f,
			A2(
				elm$core$List$range,
				0,
				elm$core$List$length(xs) - 1),
			xs);
	});
var elm$core$String$all = _String_all;
var elm$core$String$fromInt = _String_fromNumber;
var elm$core$String$join = F2(
	function (sep, chunks) {
		return A2(
			_String_join,
			sep,
			_List_toArray(chunks));
	});
var elm$core$String$uncons = _String_uncons;
var elm$core$String$split = F2(
	function (sep, string) {
		return _List_fromArray(
			A2(_String_split, sep, string));
	});
var elm$json$Json$Decode$indent = function (str) {
	return A2(
		elm$core$String$join,
		'\n    ',
		A2(elm$core$String$split, '\n', str));
};
var elm$json$Json$Encode$encode = _Json_encode;
var elm$json$Json$Decode$errorOneOf = F2(
	function (i, error) {
		return '\n\n(' + (elm$core$String$fromInt(i + 1) + (') ' + elm$json$Json$Decode$indent(
			elm$json$Json$Decode$errorToString(error))));
	});
var elm$json$Json$Decode$errorToString = function (error) {
	return A2(elm$json$Json$Decode$errorToStringHelp, error, _List_Nil);
};
var elm$json$Json$Decode$errorToStringHelp = F2(
	function (error, context) {
		errorToStringHelp:
		while (true) {
			switch (error.$) {
				case 0:
					var f = error.a;
					var err = error.b;
					var isSimple = function () {
						var _n1 = elm$core$String$uncons(f);
						if (_n1.$ === 1) {
							return false;
						} else {
							var _n2 = _n1.a;
							var _char = _n2.a;
							var rest = _n2.b;
							return elm$core$Char$isAlpha(_char) && A2(elm$core$String$all, elm$core$Char$isAlphaNum, rest);
						}
					}();
					var fieldName = isSimple ? ('.' + f) : ('[\'' + (f + '\']'));
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, fieldName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 1:
					var i = error.a;
					var err = error.b;
					var indexName = '[' + (elm$core$String$fromInt(i) + ']');
					var $temp$error = err,
						$temp$context = A2(elm$core$List$cons, indexName, context);
					error = $temp$error;
					context = $temp$context;
					continue errorToStringHelp;
				case 2:
					var errors = error.a;
					if (!errors.b) {
						return 'Ran into a Json.Decode.oneOf with no possibilities' + function () {
							if (!context.b) {
								return '!';
							} else {
								return ' at json' + A2(
									elm$core$String$join,
									'',
									elm$core$List$reverse(context));
							}
						}();
					} else {
						if (!errors.b.b) {
							var err = errors.a;
							var $temp$error = err,
								$temp$context = context;
							error = $temp$error;
							context = $temp$context;
							continue errorToStringHelp;
						} else {
							var starter = function () {
								if (!context.b) {
									return 'Json.Decode.oneOf';
								} else {
									return 'The Json.Decode.oneOf at json' + A2(
										elm$core$String$join,
										'',
										elm$core$List$reverse(context));
								}
							}();
							var introduction = starter + (' failed in the following ' + (elm$core$String$fromInt(
								elm$core$List$length(errors)) + ' ways:'));
							return A2(
								elm$core$String$join,
								'\n\n',
								A2(
									elm$core$List$cons,
									introduction,
									A2(elm$core$List$indexedMap, elm$json$Json$Decode$errorOneOf, errors)));
						}
					}
				default:
					var msg = error.a;
					var json = error.b;
					var introduction = function () {
						if (!context.b) {
							return 'Problem with the given value:\n\n';
						} else {
							return 'Problem with the value at json' + (A2(
								elm$core$String$join,
								'',
								elm$core$List$reverse(context)) + ':\n\n    ');
						}
					}();
					return introduction + (elm$json$Json$Decode$indent(
						A2(elm$json$Json$Encode$encode, 4, json)) + ('\n\n' + msg));
			}
		}
	});
var elm$json$Json$Encode$list = F2(
	function (func, entries) {
		return _Json_wrap(
			A3(
				elm$core$List$foldl,
				_Json_addEntry(func),
				_Json_emptyArray(0),
				entries));
	});
var elm$json$Json$Encode$string = _Json_wrap;
var author$project$Port$readCache = _Platform_outgoingPort(
	'readCache',
	function ($) {
		var a = $.a;
		var b = $.b;
		return A2(
			elm$json$Json$Encode$list,
			elm$core$Basics$identity,
			_List_fromArray(
				[
					elm$json$Json$Encode$string(a),
					elm$json$Json$Encode$string(b)
				]));
	});
var author$project$Editor$Port$readSlotNum = author$project$Port$readCache(
	_Utils_Tuple2('combinatris_slot_num', 'readSlotNumCallback'));
var author$project$Lang$Lang$emptyLang = elm$core$Dict$fromList(_List_Nil);
var author$project$Misc$perform = F2(
	function (cmd, model) {
		return _Utils_Tuple2(model, cmd);
	});
var author$project$Editor$Editor$init = function (_n0) {
	var model = author$project$Editor$CodeArea$init(0);
	return A2(
		author$project$Misc$perform,
		author$project$Editor$Port$readSlotNum,
		{
			k: _Utils_update(
				model,
				{T: 'exprarea', an: 1, ai: false, as: true}),
			l: elm$core$Result$Ok(_List_Nil),
			B: _Utils_update(
				model,
				{T: 'langarea', an: 10, ai: true, aj: author$project$Editor$Data$placeholder}),
			n: elm$core$Result$Ok(author$project$Lang$Lang$emptyLang),
			ah: elm$core$Maybe$Nothing,
			_: '1',
			au: _List_Nil
		});
};
var author$project$Game$Types$Landscape = 1;
var author$project$Game$Types$Orient = function (a) {
	return {$: 11, a: a};
};
var author$project$Game$Types$Portrait = 0;
var elm$core$Basics$ge = _Utils_ge;
var author$project$Game$Game$doOrient = F2(
	function (w, h) {
		return author$project$Game$Types$Orient(
			(_Utils_cmp(w, h) > -1) ? 1 : 0);
	});
var author$project$Game$Types$Row = F5(
	function (expr, html, width, score, canReduce) {
		return {az: canReduce, t: expr, aM: html, X: score, i: width};
	});
var author$project$Game$Game$makeRow = A5(author$project$Game$Types$Row, _List_Nil, _List_Nil, 0, 0, false);
var author$project$Game$Types$Idle = {$: 0};
var author$project$Game$Types$Playing = 0;
var elm$browser$Browser$External = function (a) {
	return {$: 1, a: a};
};
var elm$browser$Browser$Internal = function (a) {
	return {$: 0, a: a};
};
var elm$browser$Browser$Dom$NotFound = elm$core$Basics$identity;
var elm$core$Basics$never = function (_n0) {
	never:
	while (true) {
		var nvr = _n0;
		var $temp$_n0 = nvr;
		_n0 = $temp$_n0;
		continue never;
	}
};
var elm$core$Task$Perform = elm$core$Basics$identity;
var elm$core$Task$succeed = _Scheduler_succeed;
var elm$core$Task$init = elm$core$Task$succeed(0);
var elm$core$List$foldrHelper = F4(
	function (fn, acc, ctr, ls) {
		if (!ls.b) {
			return acc;
		} else {
			var a = ls.a;
			var r1 = ls.b;
			if (!r1.b) {
				return A2(fn, a, acc);
			} else {
				var b = r1.a;
				var r2 = r1.b;
				if (!r2.b) {
					return A2(
						fn,
						a,
						A2(fn, b, acc));
				} else {
					var c = r2.a;
					var r3 = r2.b;
					if (!r3.b) {
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(fn, c, acc)));
					} else {
						var d = r3.a;
						var r4 = r3.b;
						var res = (ctr > 500) ? A3(
							elm$core$List$foldl,
							fn,
							acc,
							elm$core$List$reverse(r4)) : A4(elm$core$List$foldrHelper, fn, acc, ctr + 1, r4);
						return A2(
							fn,
							a,
							A2(
								fn,
								b,
								A2(
									fn,
									c,
									A2(fn, d, res))));
					}
				}
			}
		}
	});
var elm$core$List$foldr = F3(
	function (fn, acc, ls) {
		return A4(elm$core$List$foldrHelper, fn, acc, 0, ls);
	});
var elm$core$List$map = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, acc) {
					return A2(
						elm$core$List$cons,
						f(x),
						acc);
				}),
			_List_Nil,
			xs);
	});
var elm$core$Task$andThen = _Scheduler_andThen;
var elm$core$Task$map = F2(
	function (func, taskA) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return elm$core$Task$succeed(
					func(a));
			},
			taskA);
	});
var elm$core$Task$map2 = F3(
	function (func, taskA, taskB) {
		return A2(
			elm$core$Task$andThen,
			function (a) {
				return A2(
					elm$core$Task$andThen,
					function (b) {
						return elm$core$Task$succeed(
							A2(func, a, b));
					},
					taskB);
			},
			taskA);
	});
var elm$core$Task$sequence = function (tasks) {
	return A3(
		elm$core$List$foldr,
		elm$core$Task$map2(elm$core$List$cons),
		elm$core$Task$succeed(_List_Nil),
		tasks);
};
var elm$core$Platform$sendToApp = _Platform_sendToApp;
var elm$core$Task$spawnCmd = F2(
	function (router, _n0) {
		var task = _n0;
		return _Scheduler_spawn(
			A2(
				elm$core$Task$andThen,
				elm$core$Platform$sendToApp(router),
				task));
	});
var elm$core$Task$onEffects = F3(
	function (router, commands, state) {
		return A2(
			elm$core$Task$map,
			function (_n0) {
				return 0;
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Task$spawnCmd(router),
					commands)));
	});
var elm$core$Task$onSelfMsg = F3(
	function (_n0, _n1, _n2) {
		return elm$core$Task$succeed(0);
	});
var elm$core$Task$cmdMap = F2(
	function (tagger, _n0) {
		var task = _n0;
		return A2(elm$core$Task$map, tagger, task);
	});
_Platform_effectManagers['Task'] = _Platform_createManager(elm$core$Task$init, elm$core$Task$onEffects, elm$core$Task$onSelfMsg, elm$core$Task$cmdMap);
var elm$core$Task$command = _Platform_leaf('Task');
var elm$core$Task$perform = F2(
	function (toMessage, task) {
		return elm$core$Task$command(
			A2(elm$core$Task$map, toMessage, task));
	});
var elm$json$Json$Decode$map = _Json_map1;
var elm$json$Json$Decode$map2 = _Json_map2;
var elm$json$Json$Decode$succeed = _Json_succeed;
var elm$virtual_dom$VirtualDom$toHandlerInt = function (handler) {
	switch (handler.$) {
		case 0:
			return 0;
		case 1:
			return 1;
		case 2:
			return 2;
		default:
			return 3;
	}
};
var elm$core$String$length = _String_length;
var elm$core$String$slice = _String_slice;
var elm$core$String$dropLeft = F2(
	function (n, string) {
		return (n < 1) ? string : A3(
			elm$core$String$slice,
			n,
			elm$core$String$length(string),
			string);
	});
var elm$core$String$startsWith = _String_startsWith;
var elm$url$Url$Http = 0;
var elm$url$Url$Https = 1;
var elm$core$String$indexes = _String_indexes;
var elm$core$String$isEmpty = function (string) {
	return string === '';
};
var elm$core$String$left = F2(
	function (n, string) {
		return (n < 1) ? '' : A3(elm$core$String$slice, 0, n, string);
	});
var elm$core$String$contains = _String_contains;
var elm$core$String$toInt = _String_toInt;
var elm$url$Url$Url = F6(
	function (protocol, host, port_, path, query, fragment) {
		return {aI: fragment, aL: host, aV: path, aX: port_, a_: protocol, a$: query};
	});
var elm$url$Url$chompBeforePath = F5(
	function (protocol, path, params, frag, str) {
		if (elm$core$String$isEmpty(str) || A2(elm$core$String$contains, '@', str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, ':', str);
			if (!_n0.b) {
				return elm$core$Maybe$Just(
					A6(elm$url$Url$Url, protocol, str, elm$core$Maybe$Nothing, path, params, frag));
			} else {
				if (!_n0.b.b) {
					var i = _n0.a;
					var _n1 = elm$core$String$toInt(
						A2(elm$core$String$dropLeft, i + 1, str));
					if (_n1.$ === 1) {
						return elm$core$Maybe$Nothing;
					} else {
						var port_ = _n1;
						return elm$core$Maybe$Just(
							A6(
								elm$url$Url$Url,
								protocol,
								A2(elm$core$String$left, i, str),
								port_,
								path,
								params,
								frag));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			}
		}
	});
var elm$url$Url$chompBeforeQuery = F4(
	function (protocol, params, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '/', str);
			if (!_n0.b) {
				return A5(elm$url$Url$chompBeforePath, protocol, '/', params, frag, str);
			} else {
				var i = _n0.a;
				return A5(
					elm$url$Url$chompBeforePath,
					protocol,
					A2(elm$core$String$dropLeft, i, str),
					params,
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompBeforeFragment = F3(
	function (protocol, frag, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '?', str);
			if (!_n0.b) {
				return A4(elm$url$Url$chompBeforeQuery, protocol, elm$core$Maybe$Nothing, frag, str);
			} else {
				var i = _n0.a;
				return A4(
					elm$url$Url$chompBeforeQuery,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					frag,
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$chompAfterProtocol = F2(
	function (protocol, str) {
		if (elm$core$String$isEmpty(str)) {
			return elm$core$Maybe$Nothing;
		} else {
			var _n0 = A2(elm$core$String$indexes, '#', str);
			if (!_n0.b) {
				return A3(elm$url$Url$chompBeforeFragment, protocol, elm$core$Maybe$Nothing, str);
			} else {
				var i = _n0.a;
				return A3(
					elm$url$Url$chompBeforeFragment,
					protocol,
					elm$core$Maybe$Just(
						A2(elm$core$String$dropLeft, i + 1, str)),
					A2(elm$core$String$left, i, str));
			}
		}
	});
var elm$url$Url$fromString = function (str) {
	return A2(elm$core$String$startsWith, 'http://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		0,
		A2(elm$core$String$dropLeft, 7, str)) : (A2(elm$core$String$startsWith, 'https://', str) ? A2(
		elm$url$Url$chompAfterProtocol,
		1,
		A2(elm$core$String$dropLeft, 8, str)) : elm$core$Maybe$Nothing);
};
var elm$browser$Browser$Dom$setViewport = _Browser_setViewport;
var elm$core$Basics$always = F2(
	function (a, _n0) {
		return a;
	});
var author$project$Misc$resetViewport = function (msg) {
	return A2(
		elm$core$Task$perform,
		elm$core$Basics$always(msg),
		A2(elm$browser$Browser$Dom$setViewport, 0, 0));
};
var elm$json$Json$Encode$bool = _Json_wrap;
var author$project$Port$captureTouches = _Platform_outgoingPort('captureTouches', elm$json$Json$Encode$bool);
var elm$browser$Browser$Dom$getViewport = _Browser_withWindow(_Browser_getViewport);
var elm$core$Array$repeat = F2(
	function (n, e) {
		return A2(
			elm$core$Array$initialize,
			n,
			function (_n0) {
				return e;
			});
	});
var elm$core$Basics$composeL = F3(
	function (g, f, x) {
		return g(
			f(x));
	});
var elm$core$Platform$Cmd$batch = _Platform_batch;
var ohanhi$keyboard$Keyboard$Arrows$Arrows = F2(
	function (x, y) {
		return {P: x, x: y};
	});
var author$project$Game$Game$init = F3(
	function (styles, weights, lang) {
		var width = 30;
		var interval = 700.0;
		var height = 5;
		var doOrient1 = function (_n0) {
			var scene = _n0.bG;
			return A2(author$project$Game$Game$doOrient, scene.i, scene.al);
		};
		return A2(
			A2(elm$core$Basics$composeL, author$project$Misc$perform, elm$core$Platform$Cmd$batch),
			_List_fromArray(
				[
					author$project$Port$captureTouches(true),
					author$project$Misc$resetViewport(author$project$Game$Types$Idle),
					A2(elm$core$Task$perform, doOrient1, elm$browser$Browser$Dom$getViewport)
				]),
			{
				ax: A2(ohanhi$keyboard$Keyboard$Arrows$Arrows, 0, 0),
				s: elm$core$Maybe$Nothing,
				al: height,
				u: interval,
				am: _List_Nil,
				A: lang,
				aq: elm$core$Maybe$Nothing,
				aU: 1,
				m: A2(elm$core$Array$repeat, height, author$project$Game$Game$makeRow),
				X: 0,
				N: 0,
				ac: {
					T: 'dummyarea',
					G: '',
					ag: -1,
					an: 1,
					ai: false,
					as: true,
					aj: '',
					Y: A2(author$project$Editor$CodeArea$Scroll, 0, 0),
					at: _List_Nil,
					ak: styles
				},
				av: weights,
				i: width
			});
	});
var author$project$Main$Editor = 0;
var author$project$Main$EditorMsg = function (a) {
	return {$: 1, a: a};
};
var elm$core$Platform$Cmd$map = _Platform_map;
var author$project$Main$mapEditor = F2(
	function (model, _n0) {
		var editor = _n0.a;
		var msg = _n0.b;
		return A2(
			author$project$Misc$perform,
			A2(elm$core$Platform$Cmd$map, author$project$Main$EditorMsg, msg),
			_Utils_update(
				model,
				{y: editor, E: 0}));
	});
var author$project$Main$init = F3(
	function (_n0, url, key) {
		var _n1 = author$project$Editor$Editor$init(0);
		var editor = _n1.a;
		var msg = _n1.b;
		var _n2 = A3(author$project$Game$Game$init, elm$core$Dict$empty, _List_Nil, elm$core$Dict$empty);
		var game = _n2.a;
		return A2(
			author$project$Main$mapEditor,
			{y: editor, U: game, ap: key, aS: url, E: 0},
			_Utils_Tuple2(editor, msg));
	});
var author$project$Editor$CodeArea$SetText = function (a) {
	return {$: 0, a: a};
};
var elm$json$Json$Decode$string = _Json_decodeString;
var author$project$Editor$Port$readSlotCallback = _Platform_incomingPort('readSlotCallback', elm$json$Json$Decode$string);
var author$project$Editor$Port$readSlotNumCallback = _Platform_incomingPort('readSlotNumCallback', elm$json$Json$Decode$string);
var author$project$Editor$Types$ChangeSlot = function (a) {
	return {$: 7, a: a};
};
var author$project$Editor$Types$LangArea = function (a) {
	return {$: 1, a: a};
};
var elm$core$Platform$Sub$batch = _Platform_batch;
var author$project$Editor$Editor$subscribe = function (model) {
	return elm$core$Platform$Sub$batch(
		_List_fromArray(
			[
				author$project$Editor$Port$readSlotNumCallback(author$project$Editor$Types$ChangeSlot),
				author$project$Editor$Port$readSlotCallback(
				A2(elm$core$Basics$composeL, author$project$Editor$Types$LangArea, author$project$Editor$CodeArea$SetText))
			]));
};
var author$project$Game$Types$KeyPress = function (a) {
	return {$: 9, a: a};
};
var author$project$Game$Types$Move = function (a) {
	return {$: 5, a: a};
};
var author$project$Game$Types$TouchStart = function (a) {
	return {$: 10, a: a};
};
var author$project$Misc$appendIf = F3(
	function (cond, items, list) {
		return cond ? _Utils_ap(list, items) : list;
	});
var author$project$Port$touchCallback = _Platform_incomingPort('touchCallback', elm$json$Json$Decode$string);
var elm$browser$Browser$Events$Window = 1;
var elm$browser$Browser$Events$MySub = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var elm$browser$Browser$Events$State = F2(
	function (subs, pids) {
		return {aW: pids, a6: subs};
	});
var elm$browser$Browser$Events$init = elm$core$Task$succeed(
	A2(elm$browser$Browser$Events$State, _List_Nil, elm$core$Dict$empty));
var elm$browser$Browser$Events$nodeToKey = function (node) {
	if (!node) {
		return 'd_';
	} else {
		return 'w_';
	}
};
var elm$browser$Browser$Events$addKey = function (sub) {
	var node = sub.a;
	var name = sub.b;
	return _Utils_Tuple2(
		_Utils_ap(
			elm$browser$Browser$Events$nodeToKey(node),
			name),
		sub);
};
var elm$browser$Browser$Events$Event = F2(
	function (key, event) {
		return {aF: event, aP: key};
	});
var elm$core$Platform$sendToSelf = _Platform_sendToSelf;
var elm$browser$Browser$Events$spawn = F3(
	function (router, key, _n0) {
		var node = _n0.a;
		var name = _n0.b;
		var actualNode = function () {
			if (!node) {
				return _Browser_doc;
			} else {
				return _Browser_window;
			}
		}();
		return A2(
			elm$core$Task$map,
			function (value) {
				return _Utils_Tuple2(key, value);
			},
			A3(
				_Browser_on,
				actualNode,
				name,
				function (event) {
					return A2(
						elm$core$Platform$sendToSelf,
						router,
						A2(elm$browser$Browser$Events$Event, key, event));
				}));
	});
var elm$core$Dict$foldl = F3(
	function (func, acc, dict) {
		foldl:
		while (true) {
			if (dict.$ === -2) {
				return acc;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var $temp$func = func,
					$temp$acc = A3(
					func,
					key,
					value,
					A3(elm$core$Dict$foldl, func, acc, left)),
					$temp$dict = right;
				func = $temp$func;
				acc = $temp$acc;
				dict = $temp$dict;
				continue foldl;
			}
		}
	});
var elm$core$Dict$merge = F6(
	function (leftStep, bothStep, rightStep, leftDict, rightDict, initialResult) {
		var stepState = F3(
			function (rKey, rValue, _n0) {
				stepState:
				while (true) {
					var list = _n0.a;
					var result = _n0.b;
					if (!list.b) {
						return _Utils_Tuple2(
							list,
							A3(rightStep, rKey, rValue, result));
					} else {
						var _n2 = list.a;
						var lKey = _n2.a;
						var lValue = _n2.b;
						var rest = list.b;
						if (_Utils_cmp(lKey, rKey) < 0) {
							var $temp$rKey = rKey,
								$temp$rValue = rValue,
								$temp$_n0 = _Utils_Tuple2(
								rest,
								A3(leftStep, lKey, lValue, result));
							rKey = $temp$rKey;
							rValue = $temp$rValue;
							_n0 = $temp$_n0;
							continue stepState;
						} else {
							if (_Utils_cmp(lKey, rKey) > 0) {
								return _Utils_Tuple2(
									list,
									A3(rightStep, rKey, rValue, result));
							} else {
								return _Utils_Tuple2(
									rest,
									A4(bothStep, lKey, lValue, rValue, result));
							}
						}
					}
				}
			});
		var _n3 = A3(
			elm$core$Dict$foldl,
			stepState,
			_Utils_Tuple2(
				elm$core$Dict$toList(leftDict),
				initialResult),
			rightDict);
		var leftovers = _n3.a;
		var intermediateResult = _n3.b;
		return A3(
			elm$core$List$foldl,
			F2(
				function (_n4, result) {
					var k = _n4.a;
					var v = _n4.b;
					return A3(leftStep, k, v, result);
				}),
			intermediateResult,
			leftovers);
	});
var elm$core$Dict$union = F2(
	function (t1, t2) {
		return A3(elm$core$Dict$foldl, elm$core$Dict$insert, t2, t1);
	});
var elm$core$Process$kill = _Scheduler_kill;
var elm$browser$Browser$Events$onEffects = F3(
	function (router, subs, state) {
		var stepRight = F3(
			function (key, sub, _n6) {
				var deads = _n6.a;
				var lives = _n6.b;
				var news = _n6.c;
				return _Utils_Tuple3(
					deads,
					lives,
					A2(
						elm$core$List$cons,
						A3(elm$browser$Browser$Events$spawn, router, key, sub),
						news));
			});
		var stepLeft = F3(
			function (_n4, pid, _n5) {
				var deads = _n5.a;
				var lives = _n5.b;
				var news = _n5.c;
				return _Utils_Tuple3(
					A2(elm$core$List$cons, pid, deads),
					lives,
					news);
			});
		var stepBoth = F4(
			function (key, pid, _n2, _n3) {
				var deads = _n3.a;
				var lives = _n3.b;
				var news = _n3.c;
				return _Utils_Tuple3(
					deads,
					A3(elm$core$Dict$insert, key, pid, lives),
					news);
			});
		var newSubs = A2(elm$core$List$map, elm$browser$Browser$Events$addKey, subs);
		var _n0 = A6(
			elm$core$Dict$merge,
			stepLeft,
			stepBoth,
			stepRight,
			state.aW,
			elm$core$Dict$fromList(newSubs),
			_Utils_Tuple3(_List_Nil, elm$core$Dict$empty, _List_Nil));
		var deadPids = _n0.a;
		var livePids = _n0.b;
		var makeNewPids = _n0.c;
		return A2(
			elm$core$Task$andThen,
			function (pids) {
				return elm$core$Task$succeed(
					A2(
						elm$browser$Browser$Events$State,
						newSubs,
						A2(
							elm$core$Dict$union,
							livePids,
							elm$core$Dict$fromList(pids))));
			},
			A2(
				elm$core$Task$andThen,
				function (_n1) {
					return elm$core$Task$sequence(makeNewPids);
				},
				elm$core$Task$sequence(
					A2(elm$core$List$map, elm$core$Process$kill, deadPids))));
	});
var elm$core$List$maybeCons = F3(
	function (f, mx, xs) {
		var _n0 = f(mx);
		if (!_n0.$) {
			var x = _n0.a;
			return A2(elm$core$List$cons, x, xs);
		} else {
			return xs;
		}
	});
var elm$core$List$filterMap = F2(
	function (f, xs) {
		return A3(
			elm$core$List$foldr,
			elm$core$List$maybeCons(f),
			_List_Nil,
			xs);
	});
var elm$browser$Browser$Events$onSelfMsg = F3(
	function (router, _n0, state) {
		var key = _n0.aP;
		var event = _n0.aF;
		var toMessage = function (_n2) {
			var subKey = _n2.a;
			var _n3 = _n2.b;
			var node = _n3.a;
			var name = _n3.b;
			var decoder = _n3.c;
			return _Utils_eq(subKey, key) ? A2(_Browser_decodeEvent, decoder, event) : elm$core$Maybe$Nothing;
		};
		var messages = A2(elm$core$List$filterMap, toMessage, state.a6);
		return A2(
			elm$core$Task$andThen,
			function (_n1) {
				return elm$core$Task$succeed(state);
			},
			elm$core$Task$sequence(
				A2(
					elm$core$List$map,
					elm$core$Platform$sendToApp(router),
					messages)));
	});
var elm$browser$Browser$Events$subMap = F2(
	function (func, _n0) {
		var node = _n0.a;
		var name = _n0.b;
		var decoder = _n0.c;
		return A3(
			elm$browser$Browser$Events$MySub,
			node,
			name,
			A2(elm$json$Json$Decode$map, func, decoder));
	});
_Platform_effectManagers['Browser.Events'] = _Platform_createManager(elm$browser$Browser$Events$init, elm$browser$Browser$Events$onEffects, elm$browser$Browser$Events$onSelfMsg, 0, elm$browser$Browser$Events$subMap);
var elm$browser$Browser$Events$subscription = _Platform_leaf('Browser.Events');
var elm$browser$Browser$Events$on = F3(
	function (node, name, decoder) {
		return elm$browser$Browser$Events$subscription(
			A3(elm$browser$Browser$Events$MySub, node, name, decoder));
	});
var elm$json$Json$Decode$field = _Json_decodeField;
var elm$json$Json$Decode$int = _Json_decodeInt;
var elm$browser$Browser$Events$onResize = function (func) {
	return A3(
		elm$browser$Browser$Events$on,
		1,
		'resize',
		A2(
			elm$json$Json$Decode$field,
			'target',
			A3(
				elm$json$Json$Decode$map2,
				func,
				A2(elm$json$Json$Decode$field, 'innerWidth', elm$json$Json$Decode$int),
				A2(elm$json$Json$Decode$field, 'innerHeight', elm$json$Json$Decode$int))));
};
var elm$core$Platform$Sub$map = _Platform_map;
var elm$time$Time$Every = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$time$Time$State = F2(
	function (taggers, processes) {
		return {aZ: processes, a7: taggers};
	});
var elm$time$Time$init = elm$core$Task$succeed(
	A2(elm$time$Time$State, elm$core$Dict$empty, elm$core$Dict$empty));
var elm$core$Dict$get = F2(
	function (targetKey, dict) {
		get:
		while (true) {
			if (dict.$ === -2) {
				return elm$core$Maybe$Nothing;
			} else {
				var key = dict.b;
				var value = dict.c;
				var left = dict.d;
				var right = dict.e;
				var _n1 = A2(elm$core$Basics$compare, targetKey, key);
				switch (_n1) {
					case 0:
						var $temp$targetKey = targetKey,
							$temp$dict = left;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
					case 1:
						return elm$core$Maybe$Just(value);
					default:
						var $temp$targetKey = targetKey,
							$temp$dict = right;
						targetKey = $temp$targetKey;
						dict = $temp$dict;
						continue get;
				}
			}
		}
	});
var elm$time$Time$addMySub = F2(
	function (_n0, state) {
		var interval = _n0.a;
		var tagger = _n0.b;
		var _n1 = A2(elm$core$Dict$get, interval, state);
		if (_n1.$ === 1) {
			return A3(
				elm$core$Dict$insert,
				interval,
				_List_fromArray(
					[tagger]),
				state);
		} else {
			var taggers = _n1.a;
			return A3(
				elm$core$Dict$insert,
				interval,
				A2(elm$core$List$cons, tagger, taggers),
				state);
		}
	});
var elm$core$Process$spawn = _Scheduler_spawn;
var elm$time$Time$Name = function (a) {
	return {$: 0, a: a};
};
var elm$time$Time$Offset = function (a) {
	return {$: 1, a: a};
};
var elm$time$Time$Zone = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$time$Time$customZone = elm$time$Time$Zone;
var elm$time$Time$setInterval = _Time_setInterval;
var elm$time$Time$spawnHelp = F3(
	function (router, intervals, processes) {
		if (!intervals.b) {
			return elm$core$Task$succeed(processes);
		} else {
			var interval = intervals.a;
			var rest = intervals.b;
			var spawnTimer = elm$core$Process$spawn(
				A2(
					elm$time$Time$setInterval,
					interval,
					A2(elm$core$Platform$sendToSelf, router, interval)));
			var spawnRest = function (id) {
				return A3(
					elm$time$Time$spawnHelp,
					router,
					rest,
					A3(elm$core$Dict$insert, interval, id, processes));
			};
			return A2(elm$core$Task$andThen, spawnRest, spawnTimer);
		}
	});
var elm$time$Time$onEffects = F3(
	function (router, subs, _n0) {
		var processes = _n0.aZ;
		var rightStep = F3(
			function (_n6, id, _n7) {
				var spawns = _n7.a;
				var existing = _n7.b;
				var kills = _n7.c;
				return _Utils_Tuple3(
					spawns,
					existing,
					A2(
						elm$core$Task$andThen,
						function (_n5) {
							return kills;
						},
						elm$core$Process$kill(id)));
			});
		var newTaggers = A3(elm$core$List$foldl, elm$time$Time$addMySub, elm$core$Dict$empty, subs);
		var leftStep = F3(
			function (interval, taggers, _n4) {
				var spawns = _n4.a;
				var existing = _n4.b;
				var kills = _n4.c;
				return _Utils_Tuple3(
					A2(elm$core$List$cons, interval, spawns),
					existing,
					kills);
			});
		var bothStep = F4(
			function (interval, taggers, id, _n3) {
				var spawns = _n3.a;
				var existing = _n3.b;
				var kills = _n3.c;
				return _Utils_Tuple3(
					spawns,
					A3(elm$core$Dict$insert, interval, id, existing),
					kills);
			});
		var _n1 = A6(
			elm$core$Dict$merge,
			leftStep,
			bothStep,
			rightStep,
			newTaggers,
			processes,
			_Utils_Tuple3(
				_List_Nil,
				elm$core$Dict$empty,
				elm$core$Task$succeed(0)));
		var spawnList = _n1.a;
		var existingDict = _n1.b;
		var killTask = _n1.c;
		return A2(
			elm$core$Task$andThen,
			function (newProcesses) {
				return elm$core$Task$succeed(
					A2(elm$time$Time$State, newTaggers, newProcesses));
			},
			A2(
				elm$core$Task$andThen,
				function (_n2) {
					return A3(elm$time$Time$spawnHelp, router, spawnList, existingDict);
				},
				killTask));
	});
var elm$time$Time$Posix = elm$core$Basics$identity;
var elm$time$Time$millisToPosix = elm$core$Basics$identity;
var elm$time$Time$now = _Time_now(elm$time$Time$millisToPosix);
var elm$time$Time$onSelfMsg = F3(
	function (router, interval, state) {
		var _n0 = A2(elm$core$Dict$get, interval, state.a7);
		if (_n0.$ === 1) {
			return elm$core$Task$succeed(state);
		} else {
			var taggers = _n0.a;
			var tellTaggers = function (time) {
				return elm$core$Task$sequence(
					A2(
						elm$core$List$map,
						function (tagger) {
							return A2(
								elm$core$Platform$sendToApp,
								router,
								tagger(time));
						},
						taggers));
			};
			return A2(
				elm$core$Task$andThen,
				function (_n1) {
					return elm$core$Task$succeed(state);
				},
				A2(elm$core$Task$andThen, tellTaggers, elm$time$Time$now));
		}
	});
var elm$time$Time$subMap = F2(
	function (f, _n0) {
		var interval = _n0.a;
		var tagger = _n0.b;
		return A2(
			elm$time$Time$Every,
			interval,
			A2(elm$core$Basics$composeL, f, tagger));
	});
_Platform_effectManagers['Time'] = _Platform_createManager(elm$time$Time$init, elm$time$Time$onEffects, elm$time$Time$onSelfMsg, 0, elm$time$Time$subMap);
var elm$time$Time$subscription = _Platform_leaf('Time');
var elm$time$Time$every = F2(
	function (interval, tagger) {
		return elm$time$Time$subscription(
			A2(elm$time$Time$Every, interval, tagger));
	});
var ohanhi$keyboard$Keyboard$Down = function (a) {
	return {$: 0, a: a};
};
var ohanhi$keyboard$Keyboard$Up = function (a) {
	return {$: 1, a: a};
};
var elm$browser$Browser$Events$Document = 0;
var elm$browser$Browser$Events$onKeyDown = A2(elm$browser$Browser$Events$on, 0, 'keydown');
var ohanhi$keyboard$Keyboard$RawKey = elm$core$Basics$identity;
var ohanhi$keyboard$Keyboard$eventKeyDecoder = A2(
	elm$json$Json$Decode$field,
	'key',
	A2(elm$json$Json$Decode$map, elm$core$Basics$identity, elm$json$Json$Decode$string));
var ohanhi$keyboard$Keyboard$downs = function (toMsg) {
	return elm$browser$Browser$Events$onKeyDown(
		A2(elm$json$Json$Decode$map, toMsg, ohanhi$keyboard$Keyboard$eventKeyDecoder));
};
var elm$browser$Browser$Events$onKeyUp = A2(elm$browser$Browser$Events$on, 0, 'keyup');
var ohanhi$keyboard$Keyboard$ups = function (toMsg) {
	return elm$browser$Browser$Events$onKeyUp(
		A2(elm$json$Json$Decode$map, toMsg, ohanhi$keyboard$Keyboard$eventKeyDecoder));
};
var ohanhi$keyboard$Keyboard$subscriptions = elm$core$Platform$Sub$batch(
	_List_fromArray(
		[
			ohanhi$keyboard$Keyboard$downs(ohanhi$keyboard$Keyboard$Down),
			ohanhi$keyboard$Keyboard$ups(ohanhi$keyboard$Keyboard$Up)
		]));
var author$project$Game$Game$subscribe = function (model) {
	return elm$core$Platform$Sub$batch(
		A3(
			author$project$Misc$appendIf,
			!model.N,
			_List_fromArray(
				[
					A2(elm$time$Time$every, model.u, author$project$Game$Types$Move),
					A2(elm$core$Platform$Sub$map, author$project$Game$Types$KeyPress, ohanhi$keyboard$Keyboard$subscriptions),
					author$project$Port$touchCallback(author$project$Game$Types$TouchStart)
				]),
			_List_fromArray(
				[
					elm$browser$Browser$Events$onResize(author$project$Game$Game$doOrient)
				])));
};
var author$project$Main$GameMsg = function (a) {
	return {$: 2, a: a};
};
var author$project$Main$subscribe = function (_n0) {
	var scope = _n0.E;
	var editor = _n0.y;
	var game = _n0.U;
	if (!scope) {
		return A2(
			elm$core$Platform$Sub$map,
			author$project$Main$EditorMsg,
			author$project$Editor$Editor$subscribe(editor));
	} else {
		return A2(
			elm$core$Platform$Sub$map,
			author$project$Main$GameMsg,
			author$project$Game$Game$subscribe(game));
	}
};
var elm$core$String$trim = _String_trim;
var author$project$Editor$Data$exampleBCKWY = elm$core$String$trim('\r\nBxyz = x(yz) -- #FF851B %1\r\nCxyz = xzy   -- #B10DC9 %1\r\nKxy  = x     -- #85144b %3\r\nWxy  = xyy   -- #39CCCC %1\r\nYx   = x(Yx) -- #f00    %1\r\n\r\nS = B(BW)(BBC)\r\nI = SKK\r\n');
var author$project$Editor$Data$exampleBINARYLOGIC1 = elm$core$String$trim('\r\n​Txy = x      -- true  #006E51 %3\r\nFxy = y      -- false #B10DC9 %3\r\nNx  = xFT    -- not   #00f    %2\r\nAxy = xyx    -- and   #CE3175 %2\r\nOxy = xxy    -- or    #FE840E %2\r\nXxy = xy(Ny) -- xor   #DD4132 %2\r\nYx  = x(Yx)  -- rec   #f00    %2\r\n');
var author$project$Editor$Data$exampleSKIY = elm$core$String$trim('\r\nIx   = x      -- #0074D9 %3\r\nKxy  = x      -- #85144b %2\r\nSxyz = xz(yz) -- #3D9970 %2\r\nYx   = x(Yx)  -- #f00    %2\r\n\r\nB = S(KS)K\r\nC = S(BBS)(KK)\r\nW = SS(SK)\r\n');
var elm$core$Basics$composeR = F3(
	function (f, g, x) {
		return g(
			f(x));
	});
var elm$core$List$takeReverse = F3(
	function (n, list, kept) {
		takeReverse:
		while (true) {
			if (n <= 0) {
				return kept;
			} else {
				if (!list.b) {
					return kept;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs,
						$temp$kept = A2(elm$core$List$cons, x, kept);
					n = $temp$n;
					list = $temp$list;
					kept = $temp$kept;
					continue takeReverse;
				}
			}
		}
	});
var elm$core$List$takeTailRec = F2(
	function (n, list) {
		return elm$core$List$reverse(
			A3(elm$core$List$takeReverse, n, list, _List_Nil));
	});
var elm$core$List$takeFast = F3(
	function (ctr, n, list) {
		if (n <= 0) {
			return _List_Nil;
		} else {
			var _n0 = _Utils_Tuple2(n, list);
			_n0$1:
			while (true) {
				_n0$5:
				while (true) {
					if (!_n0.b.b) {
						return list;
					} else {
						if (_n0.b.b.b) {
							switch (_n0.a) {
								case 1:
									break _n0$1;
								case 2:
									var _n2 = _n0.b;
									var x = _n2.a;
									var _n3 = _n2.b;
									var y = _n3.a;
									return _List_fromArray(
										[x, y]);
								case 3:
									if (_n0.b.b.b.b) {
										var _n4 = _n0.b;
										var x = _n4.a;
										var _n5 = _n4.b;
										var y = _n5.a;
										var _n6 = _n5.b;
										var z = _n6.a;
										return _List_fromArray(
											[x, y, z]);
									} else {
										break _n0$5;
									}
								default:
									if (_n0.b.b.b.b && _n0.b.b.b.b.b) {
										var _n7 = _n0.b;
										var x = _n7.a;
										var _n8 = _n7.b;
										var y = _n8.a;
										var _n9 = _n8.b;
										var z = _n9.a;
										var _n10 = _n9.b;
										var w = _n10.a;
										var tl = _n10.b;
										return (ctr > 1000) ? A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A2(elm$core$List$takeTailRec, n - 4, tl))))) : A2(
											elm$core$List$cons,
											x,
											A2(
												elm$core$List$cons,
												y,
												A2(
													elm$core$List$cons,
													z,
													A2(
														elm$core$List$cons,
														w,
														A3(elm$core$List$takeFast, ctr + 1, n - 4, tl)))));
									} else {
										break _n0$5;
									}
							}
						} else {
							if (_n0.a === 1) {
								break _n0$1;
							} else {
								break _n0$5;
							}
						}
					}
				}
				return list;
			}
			var _n1 = _n0.b;
			var x = _n1.a;
			return _List_fromArray(
				[x]);
		}
	});
var elm$core$List$take = F2(
	function (n, list) {
		return A3(elm$core$List$takeFast, 0, n, list);
	});
var elm$core$String$lines = _String_lines;
var author$project$Editor$CodeArea$cutLines = function (max) {
	return A2(
		elm$core$Basics$composeR,
		elm$core$String$lines,
		A2(
			elm$core$Basics$composeR,
			elm$core$List$take(max),
			elm$core$String$join('\n')));
};
var author$project$Editor$CodeArea$update = F2(
	function (msg, model) {
		if (!msg.$) {
			var code = msg.a;
			return _Utils_update(
				model,
				{
					G: A2(author$project$Editor$CodeArea$cutLines, model.an, code)
				});
		} else {
			var scroll = msg.a;
			return _Utils_update(
				model,
				{Y: scroll});
		}
	});
var author$project$Editor$Data$slots = A2(
	elm$core$List$map,
	elm$core$String$fromInt,
	A2(elm$core$List$range, 1, 5));
var elm$core$Result$map = F2(
	function (func, ra) {
		if (!ra.$) {
			var a = ra.a;
			return elm$core$Result$Ok(
				func(a));
		} else {
			var e = ra.a;
			return elm$core$Result$Err(e);
		}
	});
var author$project$Editor$Editor$map = elm$core$Result$map;
var author$project$Editor$Port$readSlot = function (slot) {
	return author$project$Port$readCache(
		_Utils_Tuple2('combinatris_slot' + slot, 'readSlotCallback'));
};
var author$project$Port$writeCache = _Platform_outgoingPort(
	'writeCache',
	function ($) {
		var a = $.a;
		var b = $.b;
		return A2(
			elm$json$Json$Encode$list,
			elm$core$Basics$identity,
			_List_fromArray(
				[
					elm$json$Json$Encode$string(a),
					elm$json$Json$Encode$string(b)
				]));
	});
var author$project$Editor$Port$writeSlot = F2(
	function (slot, code) {
		return author$project$Port$writeCache(
			_Utils_Tuple2('combinatris_slot' + slot, code));
	});
var author$project$Editor$Port$writeSlotNum = function (slot) {
	return author$project$Port$writeCache(
		_Utils_Tuple2('combinatris_slot_num', slot));
};
var author$project$Editor$Types$PrependNext = function (a) {
	return {$: 4, a: a};
};
var author$project$Editor$Types$RandomTerm = {$: 5};
var author$project$Editor$Types$ReadCache = {$: 6};
var author$project$Lang$Game$canInsertTerm = function (expr) {
	canInsertTerm:
	while (true) {
		_n0$2:
		while (true) {
			if (expr.b) {
				switch (expr.a.$) {
					case 1:
						if (expr.a.b === '_') {
							var _n1 = expr.a;
							var rest = expr.b;
							return true;
						} else {
							break _n0$2;
						}
					case 3:
						var _n2 = expr.a;
						var scope = _n2.b;
						var rest = expr.b;
						var $temp$expr = scope;
						expr = $temp$expr;
						continue canInsertTerm;
					default:
						break _n0$2;
				}
			} else {
				break _n0$2;
			}
		}
		return false;
	}
};
var elm$core$Dict$values = function (dict) {
	return A3(
		elm$core$Dict$foldr,
		F3(
			function (key, value, valueList) {
				return A2(elm$core$List$cons, value, valueList);
			}),
		_List_Nil,
		dict);
};
var elm$core$List$filter = F2(
	function (isGood, list) {
		return A3(
			elm$core$List$foldr,
			F2(
				function (x, xs) {
					return isGood(x) ? A2(elm$core$List$cons, x, xs) : xs;
				}),
			_List_Nil,
			list);
	});
var elm$core$List$head = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(x);
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$core$Maybe$map = F2(
	function (f, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return elm$core$Maybe$Just(
				f(value));
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var elm$core$Maybe$withDefault = F2(
	function (_default, maybe) {
		if (!maybe.$) {
			var value = maybe.a;
			return value;
		} else {
			return _default;
		}
	});
var elm$regex$Regex$Match = F4(
	function (match, index, number, submatches) {
		return {bo: index, bt: match, bx: number, bJ: submatches};
	});
var elm$regex$Regex$find = _Regex_findAtMost(_Regex_infinity);
var elm$regex$Regex$fromStringWith = _Regex_fromStringWith;
var elm$regex$Regex$never = _Regex_never;
var elm_community$maybe_extra$Maybe$Extra$traverse = function (f) {
	var step = F2(
		function (e, acc) {
			var _n0 = f(e);
			if (_n0.$ === 1) {
				return elm$core$Maybe$Nothing;
			} else {
				var x = _n0.a;
				return A2(
					elm$core$Maybe$map,
					elm$core$List$cons(x),
					acc);
			}
		});
	return A2(
		elm$core$List$foldr,
		step,
		elm$core$Maybe$Just(_List_Nil));
};
var elm_community$maybe_extra$Maybe$Extra$combine = elm_community$maybe_extra$Maybe$Extra$traverse(elm$core$Basics$identity);
var elm_community$maybe_extra$Maybe$Extra$isJust = function (m) {
	if (m.$ === 1) {
		return false;
	} else {
		return true;
	}
};
var author$project$Lang$Game$getAttrs = F3(
	function (pattern, f, lang) {
		var regex = A2(
			elm$core$Maybe$withDefault,
			elm$regex$Regex$never,
			A2(
				elm$regex$Regex$fromStringWith,
				{bg: true, bv: false},
				pattern));
		var tryPair = function (decl) {
			var comb = decl.b;
			var comment = decl.e;
			return A2(
				elm$core$Maybe$map,
				A2(
					elm$core$Basics$composeL,
					elm$core$Tuple$pair(comb),
					f),
				elm$core$List$head(
					A2(
						elm$core$List$map,
						function ($) {
							return $.bt;
						},
						A2(elm$regex$Regex$find, regex, comment))));
		};
		return A2(
			elm$core$Maybe$withDefault,
			_List_Nil,
			elm_community$maybe_extra$Maybe$Extra$combine(
				A2(
					elm$core$List$filter,
					elm_community$maybe_extra$Maybe$Extra$isJust,
					A2(
						elm$core$List$map,
						tryPair,
						elm$core$Dict$values(lang)))));
	});
var author$project$Lang$Game$getStyles = A2(
	elm$core$Basics$composeR,
	A2(
		author$project$Lang$Game$getAttrs,
		'#[0-9a-f]{6}|#[0-9a-f]{3}',
		A2(elm$core$Basics$composeL, author$project$Editor$TextStyle$textColor, author$project$Editor$TextStyle$Hex)),
	elm$core$Dict$fromList);
var author$project$Lang$Types$Scope = F3(
	function (a, b, c) {
		return {$: 3, a: a, b: b, c: c};
	});
var author$project$Lang$Types$Var = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$core$List$repeatHelp = F3(
	function (result, n, value) {
		repeatHelp:
		while (true) {
			if (n <= 0) {
				return result;
			} else {
				var $temp$result = A2(elm$core$List$cons, value, result),
					$temp$n = n - 1,
					$temp$value = value;
				result = $temp$result;
				n = $temp$n;
				value = $temp$value;
				continue repeatHelp;
			}
		}
	});
var elm$core$List$repeat = F2(
	function (n, value) {
		return A3(elm$core$List$repeatHelp, _List_Nil, n, value);
	});
var author$project$Lang$Game$makeScope = function (len) {
	return A3(
		author$project$Lang$Types$Scope,
		0,
		A2(
			elm$core$List$repeat,
			len,
			A2(author$project$Lang$Types$Var, 0, '_')),
		0);
};
var author$project$Lang$Types$Comb = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$core$List$maximum = function (list) {
	if (list.b) {
		var x = list.a;
		var xs = list.b;
		return elm$core$Maybe$Just(
			A3(elm$core$List$foldl, elm$core$Basics$max, x, xs));
	} else {
		return elm$core$Maybe$Nothing;
	}
};
var elm$core$List$sum = function (numbers) {
	return A3(elm$core$List$foldl, elm$core$Basics$add, 0, numbers);
};
var author$project$Lang$Game$getWeights = function (lang) {
	var toWeight = function (_n1) {
		var comb = _n1.a;
		var weight = _n1.b;
		return _Utils_Tuple2(
			weight,
			A2(author$project$Lang$Types$Comb, 0, comb));
	};
	var getArgsLen = function (decl) {
		var args = decl.c;
		return elm$core$List$length(args);
	};
	var maxLen = A2(
		elm$core$Maybe$withDefault,
		3,
		elm$core$List$maximum(
			A2(
				elm$core$List$map,
				getArgsLen,
				elm$core$Dict$values(lang))));
	var fromString = A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			A2(
				elm$core$Basics$composeL,
				elm$core$Basics$toFloat,
				elm$core$Maybe$withDefault(1)),
			elm$core$String$toInt),
		elm$core$String$dropLeft(1));
	var weights = A2(
		elm$core$List$map,
		toWeight,
		A3(author$project$Lang$Game$getAttrs, '%\\d+', fromString, lang));
	var sum = elm$core$List$sum(
		A2(elm$core$List$map, elm$core$Tuple$first, weights));
	var scopeWeight = (sum * 0.25) / (maxLen - 1);
	var scopes = A2(
		elm$core$List$map,
		A2(
			elm$core$Basics$composeL,
			elm$core$Tuple$pair(scopeWeight),
			author$project$Lang$Game$makeScope),
		A2(elm$core$List$range, 2, maxLen));
	return (elm$core$List$length(weights) > 0) ? _Utils_ap(weights, scopes) : _List_Nil;
};
var author$project$Lang$Types$Arg = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var author$project$Lang$Types$UndefinedCombinator = function (a) {
	return {$: 2, a: a};
};
var author$project$Lang$Types$UndefinedVariable = function (a) {
	return {$: 4, a: a};
};
var author$project$Misc$flip = F3(
	function (f, y, x) {
		return A2(f, x, y);
	});
var elm$core$Dict$member = F2(
	function (key, dict) {
		var _n0 = A2(elm$core$Dict$get, key, dict);
		if (!_n0.$) {
			return true;
		} else {
			return false;
		}
	});
var elm$core$Set$member = F2(
	function (key, _n0) {
		var dict = _n0;
		return A2(elm$core$Dict$member, key, dict);
	});
var elm$core$Result$map2 = F3(
	function (func, ra, rb) {
		if (ra.$ === 1) {
			var x = ra.a;
			return elm$core$Result$Err(x);
		} else {
			var a = ra.a;
			if (rb.$ === 1) {
				var x = rb.a;
				return elm$core$Result$Err(x);
			} else {
				var b = rb.a;
				return elm$core$Result$Ok(
					A2(func, a, b));
			}
		}
	});
var elm_community$result_extra$Result$Extra$combine = A2(
	elm$core$List$foldr,
	elm$core$Result$map2(elm$core$List$cons),
	elm$core$Result$Ok(_List_Nil));
var author$project$Lang$Check$checkTerm = F4(
	function (combs, args, checkVar, term) {
		switch (term.$) {
			case 0:
				var col = term.a;
				var comb = term.b;
				return A2(elm$core$Set$member, comb, combs) ? elm$core$Result$Ok(
					A2(author$project$Lang$Types$Comb, col, comb)) : elm$core$Result$Err(
					author$project$Lang$Types$UndefinedCombinator(comb));
			case 1:
				var col = term.a;
				var _var = term.b;
				return A2(elm$core$Set$member, _var, args) ? elm$core$Result$Ok(
					A2(author$project$Lang$Types$Arg, col, _var)) : (checkVar(_var) ? elm$core$Result$Ok(
					A2(author$project$Lang$Types$Var, col, _var)) : elm$core$Result$Err(
					author$project$Lang$Types$UndefinedVariable(_var)));
			case 2:
				var col = term.a;
				var arg = term.b;
				return elm$core$Result$Ok(
					A2(author$project$Lang$Types$Arg, col, arg));
			default:
				var col1 = term.a;
				var expr = term.b;
				var col2 = term.c;
				return A2(
					elm$core$Result$map,
					A2(
						author$project$Misc$flip,
						author$project$Lang$Types$Scope(col1),
						col2),
					elm_community$result_extra$Result$Extra$combine(
						A3(
							elm$core$List$foldr,
							A2(
								elm$core$Basics$composeL,
								elm$core$List$cons,
								A3(author$project$Lang$Check$checkTerm, combs, args, checkVar)),
							_List_Nil,
							expr)));
		}
	});
var author$project$Lang$Types$Impossible = {$: 0};
var author$project$Lang$Check$checkExpr = F4(
	function (combs, args, checkVar, expr) {
		var _n0 = A4(
			author$project$Lang$Check$checkTerm,
			combs,
			args,
			checkVar,
			A3(author$project$Lang$Types$Scope, 0, expr, 0));
		if (_n0.$ === 1) {
			var err = _n0.a;
			return elm$core$Result$Err(err);
		} else {
			if (_n0.a.$ === 3) {
				var _n1 = _n0.a;
				var expr1 = _n1.b;
				return elm$core$Result$Ok(expr1);
			} else {
				return elm$core$Result$Err(author$project$Lang$Types$Impossible);
			}
		}
	});
var elm$core$Set$Set_elm_builtin = elm$core$Basics$identity;
var elm$core$Set$empty = elm$core$Dict$empty;
var elm$core$Set$insert = F2(
	function (key, _n0) {
		var dict = _n0;
		return A3(elm$core$Dict$insert, key, 0, dict);
	});
var elm$core$Set$fromList = function (list) {
	return A3(elm$core$List$foldl, elm$core$Set$insert, elm$core$Set$empty, list);
};
var author$project$Lang$Game$prependTerm = F3(
	function (term, lang, expr) {
		var insert = function (expr1) {
			_n0$2:
			while (true) {
				if (expr1.b) {
					switch (expr1.a.$) {
						case 1:
							if (expr1.a.b === '_') {
								var _n1 = expr1.a;
								var rest = expr1.b;
								return author$project$Lang$Game$canInsertTerm(rest) ? A2(
									elm$core$List$cons,
									A2(author$project$Lang$Types$Var, 0, '_'),
									insert(rest)) : A2(elm$core$List$cons, term, rest);
							} else {
								break _n0$2;
							}
						case 3:
							var _n2 = expr1.a;
							var scope = _n2.b;
							var rest = expr1.b;
							return A2(
								elm$core$List$cons,
								A3(
									author$project$Lang$Types$Scope,
									0,
									insert(scope),
									0),
								rest);
						default:
							break _n0$2;
					}
				} else {
					break _n0$2;
				}
			}
			return expr1;
		};
		var prepend = function (expr1) {
			if (expr1.b && (expr1.a.$ === 3)) {
				var _n5 = expr1.a;
				var scope = _n5.b;
				var rest = expr1.b;
				return author$project$Lang$Game$canInsertTerm(scope) ? A2(
					elm$core$List$cons,
					A3(
						author$project$Lang$Types$Scope,
						0,
						insert(scope),
						0),
					rest) : A2(elm$core$List$cons, term, expr1);
			} else {
				return A2(elm$core$List$cons, term, expr1);
			}
		};
		var combs = elm$core$Set$fromList(
			elm$core$Dict$keys(lang));
		var termRes = A4(
			author$project$Lang$Check$checkExpr,
			combs,
			elm$core$Set$empty,
			elm$core$Basics$always(true),
			_List_fromArray(
				[term]));
		if (!termRes.$) {
			return prepend(expr);
		} else {
			return expr;
		}
	});
var author$project$Lang$Lang$replaceArg = F2(
	function (_n0, expr) {
		var arg = _n0.a;
		var term = _n0.b;
		var replace1 = author$project$Lang$Lang$replaceArg(
			_Utils_Tuple2(arg, term));
		if (!expr.b) {
			return _List_Nil;
		} else {
			switch (expr.a.$) {
				case 0:
					var _n2 = expr.a;
					var comb = _n2.b;
					var rest = expr.b;
					return A2(
						elm$core$List$cons,
						A2(author$project$Lang$Types$Comb, 0, comb),
						replace1(rest));
				case 3:
					var _n3 = expr.a;
					var scope = _n3.b;
					var rest = expr.b;
					return A2(
						elm$core$List$cons,
						A3(
							author$project$Lang$Types$Scope,
							0,
							replace1(scope),
							0),
						replace1(rest));
				case 1:
					var _n4 = expr.a;
					var _var = _n4.b;
					var rest = expr.b;
					return A2(
						elm$core$List$cons,
						A2(author$project$Lang$Types$Var, 0, _var),
						replace1(rest));
				default:
					var _n5 = expr.a;
					var arg1 = _n5.b;
					var rest = expr.b;
					return _Utils_eq(arg1, arg) ? A2(
						elm$core$List$cons,
						term,
						replace1(rest)) : A2(
						elm$core$List$cons,
						A2(author$project$Lang$Types$Arg, 0, arg1),
						replace1(rest));
			}
		}
	});
var elm$core$List$drop = F2(
	function (n, list) {
		drop:
		while (true) {
			if (n <= 0) {
				return list;
			} else {
				if (!list.b) {
					return list;
				} else {
					var x = list.a;
					var xs = list.b;
					var $temp$n = n - 1,
						$temp$list = xs;
					n = $temp$n;
					list = $temp$list;
					continue drop;
				}
			}
		}
	});
var elm_community$list_extra$List$Extra$splitAt = F2(
	function (n, xs) {
		return _Utils_Tuple2(
			A2(elm$core$List$take, n, xs),
			A2(elm$core$List$drop, n, xs));
	});
var elm_community$list_extra$List$Extra$zip = elm$core$List$map2(elm$core$Tuple$pair);
var author$project$Lang$Lang$reduceComb = F3(
	function (lang, comb, expr) {
		var _n0 = A2(elm$core$Dict$get, comb, lang);
		if (!_n0.$) {
			var _n1 = _n0.a;
			var args = _n1.c;
			var repl = _n1.d;
			var len = elm$core$List$length(args);
			var _n2 = A2(elm_community$list_extra$List$Extra$splitAt, len, expr);
			var args1 = _n2.a;
			var rest1 = _n2.b;
			return _Utils_eq(
				len,
				elm$core$List$length(args1)) ? elm$core$Maybe$Just(
				_Utils_ap(
					A3(
						elm$core$List$foldl,
						author$project$Lang$Lang$replaceArg,
						repl,
						A2(elm_community$list_extra$List$Extra$zip, args, args1)),
					rest1)) : elm$core$Maybe$Nothing;
		} else {
			return elm$core$Maybe$Nothing;
		}
	});
var author$project$Lang$Game$reduceLeft = F2(
	function (lang, expr) {
		_n0$2:
		while (true) {
			if (expr.b) {
				switch (expr.a.$) {
					case 3:
						var _n1 = expr.a;
						var scope = _n1.b;
						var rest = expr.b;
						return _Utils_ap(scope, rest);
					case 0:
						var _n2 = expr.a;
						var comb = _n2.b;
						var rest = expr.b;
						return A2(
							elm$core$Maybe$withDefault,
							expr,
							A3(author$project$Lang$Lang$reduceComb, lang, comb, rest));
					default:
						break _n0$2;
				}
			} else {
				break _n0$2;
			}
		}
		return expr;
	});
var author$project$Lang$Lang$getTermOffsets = function (term) {
	switch (term.$) {
		case 0:
			var col = term.a;
			return _List_fromArray(
				[col]);
		case 1:
			var col = term.a;
			return _List_fromArray(
				[col]);
		case 2:
			var col = term.a;
			return _List_fromArray(
				[col]);
		default:
			var col1 = term.a;
			var col2 = term.c;
			return _List_fromArray(
				[col1, col2]);
	}
};
var elm$core$List$append = F2(
	function (xs, ys) {
		if (!ys.b) {
			return xs;
		} else {
			return A3(elm$core$List$foldr, elm$core$List$cons, ys, xs);
		}
	});
var elm$core$List$concat = function (lists) {
	return A3(elm$core$List$foldr, elm$core$List$append, _List_Nil, lists);
};
var elm$core$List$concatMap = F2(
	function (f, list) {
		return elm$core$List$concat(
			A2(elm$core$List$map, f, list));
	});
var elm_community$maybe_extra$Maybe$Extra$or = F2(
	function (ma, mb) {
		if (ma.$ === 1) {
			return mb;
		} else {
			return ma;
		}
	});
var author$project$Lang$Lang$getReductionOffsets = F2(
	function (lang, expr) {
		var getReductionOffsets1 = F2(
			function (idx, expr1) {
				getReductionOffsets1:
				while (true) {
					if (expr1.b) {
						switch (expr1.a.$) {
							case 0:
								var _n1 = expr1.a;
								var col = _n1.a;
								var comb = _n1.b;
								var rest = expr1.b;
								var _n2 = A2(elm$core$Dict$get, comb, lang);
								if (!_n2.$) {
									var _n3 = _n2.a;
									var args = _n3.c;
									var repl = _n3.d;
									var len = elm$core$List$length(args);
									var _n4 = A2(elm_community$list_extra$List$Extra$splitAt, len, rest);
									var args1 = _n4.a;
									return _Utils_eq(
										len,
										elm$core$List$length(args1)) ? elm$core$Maybe$Just(
										A2(
											elm$core$List$cons,
											col,
											A2(elm$core$List$concatMap, author$project$Lang$Lang$getTermOffsets, args1))) : elm$core$Maybe$Nothing;
								} else {
									return elm$core$Maybe$Nothing;
								}
							case 3:
								var _n5 = expr1.a;
								var col1 = _n5.a;
								var scope = _n5.b;
								var col2 = _n5.c;
								var rest = expr1.b;
								if (!scope.b) {
									return elm$core$Maybe$Just(
										_List_fromArray(
											[col1, col2]));
								} else {
									if (!scope.b.b) {
										var term = scope.a;
										return elm$core$Maybe$Just(
											_List_fromArray(
												[col1, col2]));
									} else {
										return (!idx) ? elm$core$Maybe$Just(
											_List_fromArray(
												[col1, col2])) : A2(
											elm_community$maybe_extra$Maybe$Extra$or,
											A2(getReductionOffsets1, 0, scope),
											A2(getReductionOffsets1, idx + 1, rest));
									}
								}
							default:
								var rest = expr1.b;
								var $temp$idx = idx + 1,
									$temp$expr1 = rest;
								idx = $temp$idx;
								expr1 = $temp$expr1;
								continue getReductionOffsets1;
						}
					} else {
						return elm$core$Maybe$Nothing;
					}
				}
			});
		return A2(
			elm$core$Maybe$withDefault,
			_List_Nil,
			A2(getReductionOffsets1, 0, expr));
	});
var elm$parser$Parser$Advanced$Good = F3(
	function (a, b, c) {
		return {$: 0, a: a, b: b, c: c};
	});
var elm$parser$Parser$Advanced$Parser = elm$core$Basics$identity;
var elm$parser$Parser$Advanced$getCol = function (s) {
	return A3(elm$parser$Parser$Advanced$Good, false, s.aB, s);
};
var elm$parser$Parser$getCol = elm$parser$Parser$Advanced$getCol;
var elm$parser$Parser$Advanced$Bad = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$parser$Parser$Advanced$map2 = F3(
	function (func, _n0, _n1) {
		var parseA = _n0;
		var parseB = _n1;
		return function (s0) {
			var _n2 = parseA(s0);
			if (_n2.$ === 1) {
				var p = _n2.a;
				var x = _n2.b;
				return A2(elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p1 = _n2.a;
				var a = _n2.b;
				var s1 = _n2.c;
				var _n3 = parseB(s1);
				if (_n3.$ === 1) {
					var p2 = _n3.a;
					var x = _n3.b;
					return A2(elm$parser$Parser$Advanced$Bad, p1 || p2, x);
				} else {
					var p2 = _n3.a;
					var b = _n3.b;
					var s2 = _n3.c;
					return A3(
						elm$parser$Parser$Advanced$Good,
						p1 || p2,
						A2(func, a, b),
						s2);
				}
			}
		};
	});
var elm$parser$Parser$Advanced$keeper = F2(
	function (parseFunc, parseArg) {
		return A3(elm$parser$Parser$Advanced$map2, elm$core$Basics$apL, parseFunc, parseArg);
	});
var elm$parser$Parser$keeper = elm$parser$Parser$Advanced$keeper;
var elm$parser$Parser$Advanced$succeed = function (a) {
	return function (s) {
		return A3(elm$parser$Parser$Advanced$Good, false, a, s);
	};
};
var elm$parser$Parser$succeed = elm$parser$Parser$Advanced$succeed;
var elm$parser$Parser$ExpectingVariable = {$: 7};
var elm$parser$Parser$Advanced$AddRight = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var elm$parser$Parser$Advanced$DeadEnd = F4(
	function (row, col, problem, contextStack) {
		return {aB: col, bi: contextStack, bC: problem, bF: row};
	});
var elm$parser$Parser$Advanced$Empty = {$: 0};
var elm$parser$Parser$Advanced$fromState = F2(
	function (s, x) {
		return A2(
			elm$parser$Parser$Advanced$AddRight,
			elm$parser$Parser$Advanced$Empty,
			A4(elm$parser$Parser$Advanced$DeadEnd, s.bF, s.aB, x, s.c));
	});
var elm$parser$Parser$Advanced$isSubChar = _Parser_isSubChar;
var elm$parser$Parser$Advanced$varHelp = F7(
	function (isGood, offset, row, col, src, indent, context) {
		varHelp:
		while (true) {
			var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, offset, src);
			if (_Utils_eq(newOffset, -1)) {
				return {aB: col, c: context, d: indent, b: offset, bF: row, a: src};
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$src = src,
						$temp$indent = indent,
						$temp$context = context;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					src = $temp$src;
					indent = $temp$indent;
					context = $temp$context;
					continue varHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$src = src,
						$temp$indent = indent,
						$temp$context = context;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					src = $temp$src;
					indent = $temp$indent;
					context = $temp$context;
					continue varHelp;
				}
			}
		}
	});
var elm$parser$Parser$Advanced$variable = function (i) {
	return function (s) {
		var firstOffset = A3(elm$parser$Parser$Advanced$isSubChar, i.bH, s.b, s.a);
		if (_Utils_eq(firstOffset, -1)) {
			return A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, i.aG));
		} else {
			var s1 = _Utils_eq(firstOffset, -2) ? A7(elm$parser$Parser$Advanced$varHelp, i.br, s.b + 1, s.bF + 1, 1, s.a, s.d, s.c) : A7(elm$parser$Parser$Advanced$varHelp, i.br, firstOffset, s.bF, s.aB + 1, s.a, s.d, s.c);
			var name = A3(elm$core$String$slice, s.b, s1.b, s.a);
			return A2(elm$core$Set$member, name, i.bD) ? A2(
				elm$parser$Parser$Advanced$Bad,
				false,
				A2(elm$parser$Parser$Advanced$fromState, s, i.aG)) : A3(elm$parser$Parser$Advanced$Good, true, name, s1);
		}
	};
};
var elm$parser$Parser$variable = function (i) {
	return elm$parser$Parser$Advanced$variable(
		{aG: elm$parser$Parser$ExpectingVariable, br: i.br, bD: i.bD, bH: i.bH});
};
var author$project$Lang$Parse$char = F2(
	function (pred, ctor) {
		return A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$keeper,
				elm$parser$Parser$succeed(ctor),
				elm$parser$Parser$getCol),
			elm$parser$Parser$variable(
				{
					br: elm$core$Basics$always(false),
					bD: elm$core$Set$empty,
					bH: pred
				}));
	});
var author$project$Lang$Parse$isComb = elm$core$Char$isUpper;
var author$project$Lang$Parse$comb = author$project$Lang$Parse$char(author$project$Lang$Parse$isComb);
var elm$core$List$singleton = function (value) {
	return _List_fromArray(
		[value]);
};
var elm$parser$Parser$Loop = function (a) {
	return {$: 0, a: a};
};
var author$project$Lang$Parse$loopAppend = function (list) {
	return A2(
		elm$core$Basics$composeL,
		A2(
			elm$core$Basics$composeL,
			elm$parser$Parser$Loop,
			elm$core$Basics$append(list)),
		elm$core$List$singleton);
};
var elm$parser$Parser$Advanced$chompWhileHelp = F5(
	function (isGood, offset, row, col, s0) {
		chompWhileHelp:
		while (true) {
			var newOffset = A3(elm$parser$Parser$Advanced$isSubChar, isGood, offset, s0.a);
			if (_Utils_eq(newOffset, -1)) {
				return A3(
					elm$parser$Parser$Advanced$Good,
					_Utils_cmp(s0.b, offset) < 0,
					0,
					{aB: col, c: s0.c, d: s0.d, b: offset, bF: row, a: s0.a});
			} else {
				if (_Utils_eq(newOffset, -2)) {
					var $temp$isGood = isGood,
						$temp$offset = offset + 1,
						$temp$row = row + 1,
						$temp$col = 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				} else {
					var $temp$isGood = isGood,
						$temp$offset = newOffset,
						$temp$row = row,
						$temp$col = col + 1,
						$temp$s0 = s0;
					isGood = $temp$isGood;
					offset = $temp$offset;
					row = $temp$row;
					col = $temp$col;
					s0 = $temp$s0;
					continue chompWhileHelp;
				}
			}
		}
	});
var elm$parser$Parser$Advanced$chompWhile = function (isGood) {
	return function (s) {
		return A5(elm$parser$Parser$Advanced$chompWhileHelp, isGood, s.b, s.bF, s.aB, s);
	};
};
var elm$parser$Parser$chompWhile = elm$parser$Parser$Advanced$chompWhile;
var author$project$Lang$Parse$spaces = elm$parser$Parser$chompWhile(
	function (c) {
		return (c === ' ') || ((c === '\t') || (c === '\u200b'));
	});
var author$project$Lang$Parse$isVar = function (ch) {
	return ('_' === ch) || elm$core$Char$isLower(ch);
};
var author$project$Lang$Parse$var = author$project$Lang$Parse$char(author$project$Lang$Parse$isVar);
var elm$parser$Parser$Advanced$ignorer = F2(
	function (keepParser, ignoreParser) {
		return A3(elm$parser$Parser$Advanced$map2, elm$core$Basics$always, keepParser, ignoreParser);
	});
var elm$parser$Parser$ignorer = elm$parser$Parser$Advanced$ignorer;
var elm$parser$Parser$Advanced$Append = F2(
	function (a, b) {
		return {$: 2, a: a, b: b};
	});
var elm$parser$Parser$Advanced$oneOfHelp = F3(
	function (s0, bag, parsers) {
		oneOfHelp:
		while (true) {
			if (!parsers.b) {
				return A2(elm$parser$Parser$Advanced$Bad, false, bag);
			} else {
				var parse = parsers.a;
				var remainingParsers = parsers.b;
				var _n1 = parse(s0);
				if (!_n1.$) {
					var step = _n1;
					return step;
				} else {
					var step = _n1;
					var p = step.a;
					var x = step.b;
					if (p) {
						return step;
					} else {
						var $temp$s0 = s0,
							$temp$bag = A2(elm$parser$Parser$Advanced$Append, bag, x),
							$temp$parsers = remainingParsers;
						s0 = $temp$s0;
						bag = $temp$bag;
						parsers = $temp$parsers;
						continue oneOfHelp;
					}
				}
			}
		}
	});
var elm$parser$Parser$Advanced$oneOf = function (parsers) {
	return function (s) {
		return A3(elm$parser$Parser$Advanced$oneOfHelp, s, elm$parser$Parser$Advanced$Empty, parsers);
	};
};
var elm$parser$Parser$oneOf = elm$parser$Parser$Advanced$oneOf;
var author$project$Lang$Parse$appendTerm = function (list) {
	return A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(
				author$project$Lang$Parse$loopAppend(list)),
			author$project$Lang$Parse$spaces),
		A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						author$project$Lang$Parse$comb(author$project$Lang$Types$Comb),
						author$project$Lang$Parse$var(author$project$Lang$Types$Var)
					])),
			author$project$Lang$Parse$spaces));
};
var elm$parser$Parser$Done = function (a) {
	return {$: 1, a: a};
};
var elm$parser$Parser$Advanced$map = F2(
	function (func, _n0) {
		var parse = _n0;
		return function (s0) {
			var _n1 = parse(s0);
			if (!_n1.$) {
				var p = _n1.a;
				var a = _n1.b;
				var s1 = _n1.c;
				return A3(
					elm$parser$Parser$Advanced$Good,
					p,
					func(a),
					s1);
			} else {
				var p = _n1.a;
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, p, x);
			}
		};
	});
var elm$parser$Parser$map = elm$parser$Parser$Advanced$map;
var author$project$Lang$Parse$untilOther = function (list) {
	return A2(
		elm$parser$Parser$map,
		elm$core$Basics$always(
			elm$parser$Parser$Done(list)),
		elm$parser$Parser$succeed(0));
};
var elm$parser$Parser$Advanced$Done = function (a) {
	return {$: 1, a: a};
};
var elm$parser$Parser$Advanced$Loop = function (a) {
	return {$: 0, a: a};
};
var elm$parser$Parser$toAdvancedStep = function (step) {
	if (!step.$) {
		var s = step.a;
		return elm$parser$Parser$Advanced$Loop(s);
	} else {
		var a = step.a;
		return elm$parser$Parser$Advanced$Done(a);
	}
};
var elm$parser$Parser$Advanced$loopHelp = F4(
	function (p, state, callback, s0) {
		loopHelp:
		while (true) {
			var _n0 = callback(state);
			var parse = _n0;
			var _n1 = parse(s0);
			if (!_n1.$) {
				var p1 = _n1.a;
				var step = _n1.b;
				var s1 = _n1.c;
				if (!step.$) {
					var newState = step.a;
					var $temp$p = p || p1,
						$temp$state = newState,
						$temp$callback = callback,
						$temp$s0 = s1;
					p = $temp$p;
					state = $temp$state;
					callback = $temp$callback;
					s0 = $temp$s0;
					continue loopHelp;
				} else {
					var result = step.a;
					return A3(elm$parser$Parser$Advanced$Good, p || p1, result, s1);
				}
			} else {
				var p1 = _n1.a;
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, p || p1, x);
			}
		}
	});
var elm$parser$Parser$Advanced$loop = F2(
	function (state, callback) {
		return function (s) {
			return A4(elm$parser$Parser$Advanced$loopHelp, false, state, callback, s);
		};
	});
var elm$parser$Parser$loop = F2(
	function (state, callback) {
		return A2(
			elm$parser$Parser$Advanced$loop,
			state,
			function (s) {
				return A2(
					elm$parser$Parser$map,
					elm$parser$Parser$toAdvancedStep,
					callback(s));
			});
	});
var elm$parser$Parser$ExpectingSymbol = function (a) {
	return {$: 8, a: a};
};
var elm$parser$Parser$Advanced$Token = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$core$Basics$not = _Basics_not;
var elm$parser$Parser$Advanced$isSubString = _Parser_isSubString;
var elm$parser$Parser$Advanced$token = function (_n0) {
	var str = _n0.a;
	var expecting = _n0.b;
	var progress = !elm$core$String$isEmpty(str);
	return function (s) {
		var _n1 = A5(elm$parser$Parser$Advanced$isSubString, str, s.b, s.bF, s.aB, s.a);
		var newOffset = _n1.a;
		var newRow = _n1.b;
		var newCol = _n1.c;
		return _Utils_eq(newOffset, -1) ? A2(
			elm$parser$Parser$Advanced$Bad,
			false,
			A2(elm$parser$Parser$Advanced$fromState, s, expecting)) : A3(
			elm$parser$Parser$Advanced$Good,
			progress,
			0,
			{aB: newCol, c: s.c, d: s.d, b: newOffset, bF: newRow, a: s.a});
	};
};
var elm$parser$Parser$Advanced$symbol = elm$parser$Parser$Advanced$token;
var elm$parser$Parser$symbol = function (str) {
	return elm$parser$Parser$Advanced$symbol(
		A2(
			elm$parser$Parser$Advanced$Token,
			str,
			elm$parser$Parser$ExpectingSymbol(str)));
};
var author$project$Lang$Parse$expr = function () {
	var appendComb = function (list) {
		return elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					author$project$Lang$Parse$appendTerm(list),
					appendScope(list),
					author$project$Lang$Parse$untilOther(list)
				]));
	};
	var appendScope = function (list) {
		return A2(
			elm$parser$Parser$keeper,
			elm$parser$Parser$succeed(
				author$project$Lang$Parse$loopAppend(list)),
			A2(
				elm$parser$Parser$ignorer,
				A2(
					elm$parser$Parser$ignorer,
					A2(
						elm$parser$Parser$keeper,
						A2(
							elm$parser$Parser$keeper,
							A2(
								elm$parser$Parser$keeper,
								elm$parser$Parser$succeed(author$project$Lang$Types$Scope),
								A2(
									elm$parser$Parser$ignorer,
									A2(
										elm$parser$Parser$ignorer,
										elm$parser$Parser$getCol,
										elm$parser$Parser$symbol('(')),
									author$project$Lang$Parse$spaces)),
							A2(
								elm$parser$Parser$ignorer,
								A2(elm$parser$Parser$loop, _List_Nil, appendComb),
								author$project$Lang$Parse$spaces)),
						A2(
							elm$parser$Parser$ignorer,
							elm$parser$Parser$getCol,
							elm$parser$Parser$symbol(')'))),
					author$project$Lang$Parse$spaces),
				author$project$Lang$Parse$untilOther(list)));
	};
	var tryAppend = function (list) {
		return elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					author$project$Lang$Parse$appendTerm(list),
					appendScope(list),
					author$project$Lang$Parse$untilOther(list)
				]));
	};
	return A2(elm$parser$Parser$loop, _List_Nil, tryAppend);
}();
var author$project$Lang$Types$SemanticsError = F2(
	function (a, b) {
		return {$: 1, a: a, b: b};
	});
var author$project$Lang$Types$SyntaxError = function (a) {
	return {$: 0, a: a};
};
var elm$core$Result$andThen = F2(
	function (callback, result) {
		if (!result.$) {
			var value = result.a;
			return callback(value);
		} else {
			var msg = result.a;
			return elm$core$Result$Err(msg);
		}
	});
var elm$core$Result$mapError = F2(
	function (f, result) {
		if (!result.$) {
			var v = result.a;
			return elm$core$Result$Ok(v);
		} else {
			var e = result.a;
			return elm$core$Result$Err(
				f(e));
		}
	});
var elm$parser$Parser$DeadEnd = F3(
	function (row, col, problem) {
		return {aB: col, bC: problem, bF: row};
	});
var elm$parser$Parser$problemToDeadEnd = function (p) {
	return A3(elm$parser$Parser$DeadEnd, p.bF, p.aB, p.bC);
};
var elm$parser$Parser$Advanced$bagToList = F2(
	function (bag, list) {
		bagToList:
		while (true) {
			switch (bag.$) {
				case 0:
					return list;
				case 1:
					var bag1 = bag.a;
					var x = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2(elm$core$List$cons, x, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
				default:
					var bag1 = bag.a;
					var bag2 = bag.b;
					var $temp$bag = bag1,
						$temp$list = A2(elm$parser$Parser$Advanced$bagToList, bag2, list);
					bag = $temp$bag;
					list = $temp$list;
					continue bagToList;
			}
		}
	});
var elm$parser$Parser$Advanced$run = F2(
	function (_n0, src) {
		var parse = _n0;
		var _n1 = parse(
			{aB: 1, c: _List_Nil, d: 1, b: 0, bF: 1, a: src});
		if (!_n1.$) {
			var value = _n1.b;
			return elm$core$Result$Ok(value);
		} else {
			var bag = _n1.b;
			return elm$core$Result$Err(
				A2(elm$parser$Parser$Advanced$bagToList, bag, _List_Nil));
		}
	});
var elm$parser$Parser$run = F2(
	function (parser, source) {
		var _n0 = A2(elm$parser$Parser$Advanced$run, parser, source);
		if (!_n0.$) {
			var a = _n0.a;
			return elm$core$Result$Ok(a);
		} else {
			var problems = _n0.a;
			return elm$core$Result$Err(
				A2(elm$core$List$map, elm$parser$Parser$problemToDeadEnd, problems));
		}
	});
var author$project$Lang$Lang$makeExpr = F3(
	function (lang, checkVar, str) {
		var combs = elm$core$Set$fromList(
			elm$core$Dict$keys(lang));
		var args = elm$core$Set$fromList(_List_Nil);
		return A2(
			elm$core$Result$andThen,
			A2(
				elm$core$Basics$composeL,
				elm$core$Result$mapError(
					author$project$Lang$Types$SemanticsError(1)),
				A3(author$project$Lang$Check$checkExpr, combs, args, checkVar)),
			A2(
				elm$core$Result$mapError,
				author$project$Lang$Types$SyntaxError,
				A2(elm$parser$Parser$run, author$project$Lang$Parse$expr, str)));
	});
var elm$core$Tuple$second = function (_n0) {
	var y = _n0.b;
	return y;
};
var elm_community$list_extra$List$Extra$count = function (predicate) {
	return A2(
		elm$core$List$foldl,
		F2(
			function (x, acc) {
				return predicate(x) ? (acc + 1) : acc;
			}),
		0);
};
var elm_community$list_extra$List$Extra$uniqueHelp = F4(
	function (f, existing, remaining, accumulator) {
		uniqueHelp:
		while (true) {
			if (!remaining.b) {
				return elm$core$List$reverse(accumulator);
			} else {
				var first = remaining.a;
				var rest = remaining.b;
				var computedFirst = f(first);
				if (A2(elm$core$Set$member, computedFirst, existing)) {
					var $temp$f = f,
						$temp$existing = existing,
						$temp$remaining = rest,
						$temp$accumulator = accumulator;
					f = $temp$f;
					existing = $temp$existing;
					remaining = $temp$remaining;
					accumulator = $temp$accumulator;
					continue uniqueHelp;
				} else {
					var $temp$f = f,
						$temp$existing = A2(elm$core$Set$insert, computedFirst, existing),
						$temp$remaining = rest,
						$temp$accumulator = A2(elm$core$List$cons, first, accumulator);
					f = $temp$f;
					existing = $temp$existing;
					remaining = $temp$remaining;
					accumulator = $temp$accumulator;
					continue uniqueHelp;
				}
			}
		}
	});
var elm_community$list_extra$List$Extra$uniqueBy = F2(
	function (f, list) {
		return A4(elm_community$list_extra$List$Extra$uniqueHelp, f, elm$core$Set$empty, list, _List_Nil);
	});
var author$project$Lang$Check$findFirstDuplicateBy = F2(
	function (f, list) {
		var isDuplicate = A2(
			elm$core$Basics$composeL,
			elm$core$Basics$lt(1),
			elm$core$Tuple$second);
		var count = function (x) {
			return A2(
				elm_community$list_extra$List$Extra$count,
				A2(
					elm$core$Basics$composeL,
					elm$core$Basics$eq(x),
					f),
				list);
		};
		var pairWithCount = function (x) {
			return _Utils_Tuple2(
				x,
				count(
					f(x)));
		};
		return A2(
			elm$core$Maybe$map,
			elm$core$Tuple$first,
			elm$core$List$head(
				A2(
					elm$core$List$filter,
					isDuplicate,
					A2(
						elm$core$List$map,
						pairWithCount,
						A2(
							elm_community$list_extra$List$Extra$uniqueBy,
							f,
							elm$core$List$reverse(list))))));
	});
var author$project$Lang$Check$getComb = function (_n0) {
	var comb = _n0.b;
	return comb;
};
var author$project$Lang$Check$toPair = function (decl) {
	return _Utils_Tuple2(
		author$project$Lang$Check$getComb(decl),
		decl);
};
var author$project$Lang$Types$DuplicateCombinator = function (a) {
	return {$: 1, a: a};
};
var author$project$Lang$Check$buildLang = function (decls) {
	var _n0 = A2(author$project$Lang$Check$findFirstDuplicateBy, author$project$Lang$Check$getComb, decls);
	if (_n0.$ === 1) {
		return elm$core$Result$Ok(
			elm$core$Dict$fromList(
				A2(elm$core$List$map, author$project$Lang$Check$toPair, decls)));
	} else {
		var _n1 = _n0.a;
		var row = _n1.a;
		var comb = _n1.b;
		return elm$core$Result$Err(
			A2(
				author$project$Lang$Types$SemanticsError,
				row,
				author$project$Lang$Types$DuplicateCombinator(comb)));
	}
};
var author$project$Lang$Types$DuplicateArgument = function (a) {
	return {$: 3, a: a};
};
var author$project$Lang$Check$checkArgs = function (args) {
	var _n0 = A2(author$project$Lang$Check$findFirstDuplicateBy, elm$core$Basics$identity, args);
	if (_n0.$ === 1) {
		return elm$core$Result$Ok(args);
	} else {
		var ch = _n0.a;
		return elm$core$Result$Err(
			author$project$Lang$Types$DuplicateArgument(ch));
	}
};
var author$project$Lang$Types$Decl = F5(
	function (a, b, c, d, e) {
		return {$: 0, a: a, b: b, c: c, d: d, e: e};
	});
var author$project$Lang$Check$checkDecl = F2(
	function (combs, decl) {
		var row = decl.a;
		var comb = decl.b;
		var args = decl.c;
		var expr = decl.d;
		var comment = decl.e;
		return A2(
			elm$core$Result$mapError,
			author$project$Lang$Types$SemanticsError(row),
			A2(
				elm$core$Result$map,
				A2(
					author$project$Misc$flip,
					A3(author$project$Lang$Types$Decl, row, comb, args),
					comment),
				A2(
					elm$core$Result$andThen,
					A3(
						author$project$Lang$Check$checkExpr,
						combs,
						elm$core$Set$fromList(args),
						elm$core$Basics$always(false)),
					A2(
						elm$core$Result$map,
						elm$core$Basics$always(expr),
						author$project$Lang$Check$checkArgs(args)))));
	});
var author$project$Lang$Check$checkLang = function (lang) {
	var combs = elm$core$Set$fromList(
		elm$core$Dict$keys(lang));
	return A2(
		elm$core$Result$map,
		A2(
			elm$core$Basics$composeL,
			elm$core$Dict$fromList,
			elm$core$List$map(author$project$Lang$Check$toPair)),
		elm_community$result_extra$Result$Extra$combine(
			A3(
				elm$core$List$foldr,
				A2(
					elm$core$Basics$composeL,
					elm$core$List$cons,
					author$project$Lang$Check$checkDecl(combs)),
				_List_Nil,
				elm$core$Dict$values(lang))));
};
var author$project$Lang$Parse$arg = author$project$Lang$Parse$char(author$project$Lang$Parse$isVar);
var author$project$Lang$Parse$args = function () {
	var appendArg = function (list) {
		return A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$ignorer,
				elm$parser$Parser$succeed(
					author$project$Lang$Parse$loopAppend(list)),
				author$project$Lang$Parse$spaces),
			A2(
				elm$parser$Parser$ignorer,
				author$project$Lang$Parse$arg(
					elm$core$Basics$always(elm$core$Basics$identity)),
				author$project$Lang$Parse$spaces));
	};
	var tryAppend = function (list) {
		return elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					appendArg(list),
					author$project$Lang$Parse$untilOther(list)
				]));
	};
	return A2(elm$parser$Parser$loop, _List_Nil, tryAppend);
}();
var elm$parser$Parser$ExpectingEnd = {$: 10};
var elm$parser$Parser$Advanced$end = function (x) {
	return function (s) {
		return _Utils_eq(
			elm$core$String$length(s.a),
			s.b) ? A3(elm$parser$Parser$Advanced$Good, false, 0, s) : A2(
			elm$parser$Parser$Advanced$Bad,
			false,
			A2(elm$parser$Parser$Advanced$fromState, s, x));
	};
};
var elm$parser$Parser$end = elm$parser$Parser$Advanced$end(elm$parser$Parser$ExpectingEnd);
var elm$parser$Parser$Advanced$mapChompedString = F2(
	function (func, _n0) {
		var parse = _n0;
		return function (s0) {
			var _n1 = parse(s0);
			if (_n1.$ === 1) {
				var p = _n1.a;
				var x = _n1.b;
				return A2(elm$parser$Parser$Advanced$Bad, p, x);
			} else {
				var p = _n1.a;
				var a = _n1.b;
				var s1 = _n1.c;
				return A3(
					elm$parser$Parser$Advanced$Good,
					p,
					A2(
						func,
						A3(elm$core$String$slice, s0.b, s1.b, s0.a),
						a),
					s1);
			}
		};
	});
var elm$parser$Parser$Advanced$getChompedString = function (parser) {
	return A2(elm$parser$Parser$Advanced$mapChompedString, elm$core$Basics$always, parser);
};
var elm$parser$Parser$getChompedString = elm$parser$Parser$Advanced$getChompedString;
var author$project$Lang$Parse$comment = elm$parser$Parser$getChompedString(
	A2(
		elm$parser$Parser$ignorer,
		A2(
			elm$parser$Parser$ignorer,
			author$project$Lang$Parse$spaces,
			elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						A2(
						elm$parser$Parser$ignorer,
						A2(
							elm$parser$Parser$ignorer,
							elm$parser$Parser$succeed(0),
							elm$parser$Parser$symbol('--')),
						elm$parser$Parser$chompWhile(
							A2(
								elm$core$Basics$composeL,
								elm$core$Basics$not,
								elm$core$Basics$eq('\n')))),
						elm$parser$Parser$succeed(0)
					]))),
		elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					elm$parser$Parser$symbol('\n'),
					elm$parser$Parser$symbol('\r'),
					elm$parser$Parser$end
				]))));
var elm$parser$Parser$Advanced$getRow = function (s) {
	return A3(elm$parser$Parser$Advanced$Good, false, s.bF, s);
};
var elm$parser$Parser$getRow = elm$parser$Parser$Advanced$getRow;
var author$project$Lang$Parse$decl = A2(
	elm$parser$Parser$keeper,
	A2(
		elm$parser$Parser$keeper,
		A2(
			elm$parser$Parser$keeper,
			A2(
				elm$parser$Parser$keeper,
				A2(
					elm$parser$Parser$keeper,
					elm$parser$Parser$succeed(author$project$Lang$Types$Decl),
					elm$parser$Parser$getRow),
				A2(
					elm$parser$Parser$ignorer,
					author$project$Lang$Parse$comb(
						elm$core$Basics$always(elm$core$Basics$identity)),
					author$project$Lang$Parse$spaces)),
			A2(
				elm$parser$Parser$ignorer,
				A2(
					elm$parser$Parser$ignorer,
					A2(elm$parser$Parser$ignorer, author$project$Lang$Parse$args, author$project$Lang$Parse$spaces),
					elm$parser$Parser$symbol('=')),
				author$project$Lang$Parse$spaces)),
		author$project$Lang$Parse$expr),
	author$project$Lang$Parse$comment);
var author$project$Lang$Parse$untilEnd = function (list) {
	return A2(
		elm$parser$Parser$ignorer,
		elm$parser$Parser$succeed(
			elm$parser$Parser$Done(list)),
		elm$parser$Parser$end);
};
var author$project$Lang$Parse$lang = function () {
	var skipWhitespace = function (list) {
		return A2(
			elm$parser$Parser$ignorer,
			elm$parser$Parser$succeed(
				elm$parser$Parser$Loop(list)),
			elm$parser$Parser$oneOf(
				_List_fromArray(
					[
						elm$parser$Parser$symbol(' '),
						elm$parser$Parser$symbol('\t'),
						elm$parser$Parser$symbol('\n'),
						elm$parser$Parser$symbol('\r'),
						elm$parser$Parser$symbol('\u200b')
					])));
	};
	var appendDecl = function (list) {
		return A2(
			elm$parser$Parser$keeper,
			elm$parser$Parser$succeed(
				author$project$Lang$Parse$loopAppend(list)),
			author$project$Lang$Parse$decl);
	};
	var tryAppend = function (list) {
		return elm$parser$Parser$oneOf(
			_List_fromArray(
				[
					appendDecl(list),
					author$project$Lang$Parse$untilEnd(list),
					skipWhitespace(list)
				]));
	};
	return A2(elm$parser$Parser$loop, _List_Nil, tryAppend);
}();
var author$project$Lang$Lang$makeLang = function (str) {
	return A2(
		elm$core$Result$andThen,
		author$project$Lang$Check$checkLang,
		A2(
			elm$core$Result$andThen,
			author$project$Lang$Check$buildLang,
			A2(
				elm$core$Result$mapError,
				author$project$Lang$Types$SyntaxError,
				A2(elm$parser$Parser$run, author$project$Lang$Parse$lang, str))));
};
var author$project$Lang$Lang$reduceExpr = F2(
	function (lang, expr) {
		var reduceExpr1 = F2(
			function (idx, expr1) {
				if (expr1.b) {
					switch (expr1.a.$) {
						case 0:
							var _n1 = expr1.a;
							var comb = _n1.b;
							var rest = expr1.b;
							return A3(author$project$Lang$Lang$reduceComb, lang, comb, rest);
						case 3:
							var _n2 = expr1.a;
							var scope = _n2.b;
							var rest = expr1.b;
							if (!scope.b) {
								return elm$core$Maybe$Just(rest);
							} else {
								if (!scope.b.b) {
									var term = scope.a;
									return elm$core$Maybe$Just(
										A2(elm$core$List$cons, term, rest));
								} else {
									return (!idx) ? elm$core$Maybe$Just(
										_Utils_ap(scope, rest)) : A2(
										elm_community$maybe_extra$Maybe$Extra$or,
										A2(
											elm$core$Maybe$map,
											A2(
												elm$core$Basics$composeL,
												A2(author$project$Misc$flip, elm$core$List$cons, rest),
												A2(
													author$project$Misc$flip,
													author$project$Lang$Types$Scope(0),
													0)),
											A2(reduceExpr1, 0, scope)),
										A2(
											elm$core$Maybe$map,
											elm$core$List$cons(
												A3(author$project$Lang$Types$Scope, 0, scope, 0)),
											A2(reduceExpr1, idx + 1, rest)));
								}
							}
						default:
							var term = expr1.a;
							var rest = expr1.b;
							return A2(
								elm$core$Maybe$map,
								elm$core$List$cons(term),
								A2(reduceExpr1, idx + 1, rest));
					}
				} else {
					return elm$core$Maybe$Nothing;
				}
			});
		return A2(
			elm$core$Maybe$withDefault,
			expr,
			A2(reduceExpr1, 0, expr));
	});
var author$project$Lang$Show$showChars = F3(
	function (show, str, list) {
		showChars:
		while (true) {
			if (list.b) {
				var head = list.a;
				var rest = list.b;
				var $temp$show = show,
					$temp$str = _Utils_ap(
					str,
					show(head)),
					$temp$list = rest;
				show = $temp$show;
				str = $temp$str;
				list = $temp$list;
				continue showChars;
			} else {
				return str;
			}
		}
	});
var author$project$Lang$Show$showTerm = function (term) {
	switch (term.$) {
		case 0:
			var ch = term.b;
			return ch;
		case 1:
			var ch = term.b;
			return ch;
		case 2:
			var ch = term.b;
			return ch;
		default:
			var expr = term.b;
			return '(' + (author$project$Lang$Show$cyclic$showExpr()(expr) + ')');
	}
};
function author$project$Lang$Show$cyclic$showExpr() {
	return A2(author$project$Lang$Show$showChars, author$project$Lang$Show$showTerm, '');
}
var author$project$Lang$Show$showExpr = author$project$Lang$Show$cyclic$showExpr();
author$project$Lang$Show$cyclic$showExpr = function () {
	return author$project$Lang$Show$showExpr;
};
var author$project$Misc$goto = A2(
	elm$core$Basics$composeL,
	elm$core$Task$perform(elm$core$Basics$identity),
	elm$core$Task$succeed);
var elm$core$Dict$isEmpty = function (dict) {
	if (dict.$ === -2) {
		return true;
	} else {
		return false;
	}
};
var elm$core$List$any = F2(
	function (isOkay, list) {
		any:
		while (true) {
			if (!list.b) {
				return false;
			} else {
				var x = list.a;
				var xs = list.b;
				if (isOkay(x)) {
					return true;
				} else {
					var $temp$isOkay = isOkay,
						$temp$list = xs;
					isOkay = $temp$isOkay;
					list = $temp$list;
					continue any;
				}
			}
		}
	});
var elm$core$List$member = F2(
	function (x, xs) {
		return A2(
			elm$core$List$any,
			function (a) {
				return _Utils_eq(a, x);
			},
			xs);
	});
var elm$core$Platform$Cmd$none = elm$core$Platform$Cmd$batch(_List_Nil);
var elm$core$Result$withDefault = F2(
	function (def, result) {
		if (!result.$) {
			var a = result.a;
			return a;
		} else {
			return def;
		}
	});
var elm$random$Random$Generate = elm$core$Basics$identity;
var elm$core$Bitwise$shiftRightZfBy = _Bitwise_shiftRightZfBy;
var elm$random$Random$Seed = F2(
	function (a, b) {
		return {$: 0, a: a, b: b};
	});
var elm$random$Random$next = function (_n0) {
	var state0 = _n0.a;
	var incr = _n0.b;
	return A2(elm$random$Random$Seed, ((state0 * 1664525) + incr) >>> 0, incr);
};
var elm$random$Random$initialSeed = function (x) {
	var _n0 = elm$random$Random$next(
		A2(elm$random$Random$Seed, 0, 1013904223));
	var state1 = _n0.a;
	var incr = _n0.b;
	var state2 = (state1 + x) >>> 0;
	return elm$random$Random$next(
		A2(elm$random$Random$Seed, state2, incr));
};
var elm$time$Time$posixToMillis = function (_n0) {
	var millis = _n0;
	return millis;
};
var elm$random$Random$init = A2(
	elm$core$Task$andThen,
	function (time) {
		return elm$core$Task$succeed(
			elm$random$Random$initialSeed(
				elm$time$Time$posixToMillis(time)));
	},
	elm$time$Time$now);
var elm$random$Random$step = F2(
	function (_n0, seed) {
		var generator = _n0;
		return generator(seed);
	});
var elm$random$Random$onEffects = F3(
	function (router, commands, seed) {
		if (!commands.b) {
			return elm$core$Task$succeed(seed);
		} else {
			var generator = commands.a;
			var rest = commands.b;
			var _n1 = A2(elm$random$Random$step, generator, seed);
			var value = _n1.a;
			var newSeed = _n1.b;
			return A2(
				elm$core$Task$andThen,
				function (_n2) {
					return A3(elm$random$Random$onEffects, router, rest, newSeed);
				},
				A2(elm$core$Platform$sendToApp, router, value));
		}
	});
var elm$random$Random$onSelfMsg = F3(
	function (_n0, _n1, seed) {
		return elm$core$Task$succeed(seed);
	});
var elm$random$Random$Generator = elm$core$Basics$identity;
var elm$random$Random$map = F2(
	function (func, _n0) {
		var genA = _n0;
		return function (seed0) {
			var _n1 = genA(seed0);
			var a = _n1.a;
			var seed1 = _n1.b;
			return _Utils_Tuple2(
				func(a),
				seed1);
		};
	});
var elm$random$Random$cmdMap = F2(
	function (func, _n0) {
		var generator = _n0;
		return A2(elm$random$Random$map, func, generator);
	});
_Platform_effectManagers['Random'] = _Platform_createManager(elm$random$Random$init, elm$random$Random$onEffects, elm$random$Random$onSelfMsg, elm$random$Random$cmdMap);
var elm$random$Random$command = _Platform_leaf('Random');
var elm$random$Random$generate = F2(
	function (tagger, generator) {
		return elm$random$Random$command(
			A2(elm$random$Random$map, tagger, generator));
	});
var elm$core$Basics$abs = function (n) {
	return (n < 0) ? (-n) : n;
};
var elm$core$Bitwise$and = _Bitwise_and;
var elm$core$Bitwise$xor = _Bitwise_xor;
var elm$random$Random$peel = function (_n0) {
	var state = _n0.a;
	var word = (state ^ (state >>> ((state >>> 28) + 4))) * 277803737;
	return ((word >>> 22) ^ word) >>> 0;
};
var elm$random$Random$float = F2(
	function (a, b) {
		return function (seed0) {
			var seed1 = elm$random$Random$next(seed0);
			var range = elm$core$Basics$abs(b - a);
			var n1 = elm$random$Random$peel(seed1);
			var n0 = elm$random$Random$peel(seed0);
			var lo = (134217727 & n1) * 1.0;
			var hi = (67108863 & n0) * 1.0;
			var val = ((hi * 1.34217728e8) + lo) / 9.007199254740992e15;
			var scaled = (val * range) + a;
			return _Utils_Tuple2(
				scaled,
				elm$random$Random$next(seed1));
		};
	});
var elm$random$Random$getByWeight = F3(
	function (_n0, others, countdown) {
		getByWeight:
		while (true) {
			var weight = _n0.a;
			var value = _n0.b;
			if (!others.b) {
				return value;
			} else {
				var second = others.a;
				var otherOthers = others.b;
				if (_Utils_cmp(
					countdown,
					elm$core$Basics$abs(weight)) < 1) {
					return value;
				} else {
					var $temp$_n0 = second,
						$temp$others = otherOthers,
						$temp$countdown = countdown - elm$core$Basics$abs(weight);
					_n0 = $temp$_n0;
					others = $temp$others;
					countdown = $temp$countdown;
					continue getByWeight;
				}
			}
		}
	});
var elm$random$Random$weighted = F2(
	function (first, others) {
		var normalize = function (_n0) {
			var weight = _n0.a;
			return elm$core$Basics$abs(weight);
		};
		var total = normalize(first) + elm$core$List$sum(
			A2(elm$core$List$map, normalize, others));
		return A2(
			elm$random$Random$map,
			A2(elm$random$Random$getByWeight, first, others),
			A2(elm$random$Random$float, 0, total));
	});
var author$project$Editor$Editor$update = F2(
	function (msg, model) {
		var showExpr1 = function (m) {
			return _Utils_update(
				m,
				{
					k: A2(
						author$project$Editor$CodeArea$update,
						author$project$Editor$CodeArea$SetText(
							author$project$Lang$Show$showExpr(
								A2(elm$core$Result$withDefault, _List_Nil, m.l))),
						m.k)
				});
		};
		var setStyles = F2(
			function (styles, m) {
				return _Utils_update(
					m,
					{ak: styles});
			});
		var setOpacity = F2(
			function (opacity, m) {
				return _Utils_update(
					m,
					{as: opacity});
			});
		var reduceExpr1 = F2(
			function (mode, m) {
				return _Utils_update(
					m,
					{
						l: function () {
							if (!mode) {
								return A3(elm$core$Result$map2, author$project$Lang$Lang$reduceExpr, m.n, m.l);
							} else {
								return A3(elm$core$Result$map2, author$project$Lang$Game$reduceLeft, m.n, m.l);
							}
						}()
					});
			});
		var randomTerm1 = A2(
			elm$random$Random$generate,
			author$project$Editor$Types$PrependNext,
			A2(
				elm$random$Random$weighted,
				_Utils_Tuple2(
					0.0,
					A3(author$project$Lang$Types$Scope, 0, _List_Nil, 0)),
				model.au));
		var prependNext1 = F2(
			function (next, m) {
				return _Utils_update(
					m,
					{
						l: function () {
							var _n6 = m.ah;
							if (!_n6.$) {
								var term = _n6.a;
								return A3(
									elm$core$Result$map2,
									author$project$Lang$Game$prependTerm(term),
									m.n,
									m.l);
							} else {
								return m.l;
							}
						}(),
						ah: elm$core$Maybe$Just(next)
					});
			});
		var langAreaUpdate1 = F2(
			function (msg1, m) {
				return _Utils_update(
					m,
					{
						B: A2(author$project$Editor$CodeArea$update, msg1, m.B)
					});
			});
		var joinStyles1 = function (m) {
			var styles1 = A2(
				elm$core$Result$withDefault,
				elm$core$Dict$empty,
				A2(author$project$Editor$Editor$map, author$project$Lang$Game$getStyles, m.n));
			var styles = A2(elm$core$Dict$union, styles1, author$project$Editor$CodeArea$defaultStyles);
			return _Utils_update(
				m,
				{
					k: A3(
						elm$core$Basics$apL,
						setOpacity,
						A3(elm$core$Basics$composeL, elm$core$Basics$not, elm$core$Dict$isEmpty, styles1),
						A2(setStyles, styles, m.k)),
					B: A2(setStyles, styles, m.B)
				});
		};
		var getReductionOffsets1 = function (m) {
			var exprCode = m.k;
			return _Utils_update(
				m,
				{
					k: _Utils_update(
						exprCode,
						{
							at: A2(
								elm$core$Result$withDefault,
								true,
								A2(author$project$Editor$Editor$map, author$project$Lang$Game$canInsertTerm, m.l)) ? _List_Nil : A2(
								elm$core$Result$withDefault,
								_List_Nil,
								A3(elm$core$Result$map2, author$project$Lang$Lang$getReductionOffsets, m.n, m.l))
						})
				});
		};
		var getErrorLine = function (res) {
			_n3$2:
			while (true) {
				if (res.$ === 1) {
					if (res.a.$ === 1) {
						var _n4 = res.a;
						var row = _n4.a;
						return row;
					} else {
						if (res.a.a.b) {
							var _n5 = res.a.a;
							var de = _n5.a;
							return de.bF;
						} else {
							break _n3$2;
						}
					}
				} else {
					break _n3$2;
				}
			}
			return -1;
		};
		var highlightError = F2(
			function (res, m) {
				return _Utils_update(
					m,
					{
						ag: getErrorLine(res)
					});
			});
		var highlightExpr1 = function (m) {
			return _Utils_update(
				m,
				{
					k: A2(highlightError, m.l, m.k)
				});
		};
		var highlightLang1 = function (m) {
			return _Utils_update(
				m,
				{
					B: A2(highlightError, m.n, m.B)
				});
		};
		var exprAreaUpdate1 = F2(
			function (msg1, m) {
				return _Utils_update(
					m,
					{
						k: A2(author$project$Editor$CodeArea$update, msg1, m.k)
					});
			});
		var changeSlot1 = F2(
			function (slot, m) {
				return _Utils_update(
					m,
					{
						_: A2(elm$core$List$member, slot, author$project$Editor$Data$slots) ? slot : m._
					});
			});
		var buildWeights1 = function (m) {
			return _Utils_update(
				m,
				{
					au: A2(
						elm$core$Result$withDefault,
						_List_Nil,
						A2(author$project$Editor$Editor$map, author$project$Lang$Game$getWeights, m.n))
				});
		};
		var buildLang1 = F2(
			function (code, m) {
				return _Utils_update(
					m,
					{
						n: author$project$Lang$Lang$makeLang(code),
						ah: elm$core$Maybe$Nothing
					});
			});
		var buildExpr1 = F2(
			function (code, m) {
				return _Utils_update(
					m,
					{
						l: A2(
							elm$core$Result$andThen,
							function (lang) {
								return A3(
									author$project$Lang$Lang$makeExpr,
									lang,
									elm$core$Basics$always(true),
									code);
							},
							m.n)
					});
			});
		var updateExpr1 = function (m) {
			return getReductionOffsets1(
				highlightExpr1(
					A2(buildExpr1, m.k.G, m)));
		};
		var updateLang1 = F2(
			function (code, m) {
				return updateExpr1(
					showExpr1(
						A2(
							buildExpr1,
							'',
							buildWeights1(
								highlightLang1(
									joinStyles1(
										A2(buildLang1, code, m)))))));
			});
		switch (msg.$) {
			case 0:
				return A2(author$project$Misc$perform, elm$core$Platform$Cmd$none, model);
			case 1:
				var msg1 = msg.a;
				if (!msg1.$) {
					var code = msg1.a;
					return A2(
						A2(elm$core$Basics$composeL, author$project$Misc$perform, elm$core$Platform$Cmd$batch),
						_List_fromArray(
							[
								A2(author$project$Editor$Port$writeSlot, model._, code),
								author$project$Misc$goto(author$project$Editor$Types$RandomTerm)
							]),
						A2(
							updateLang1,
							code,
							A2(langAreaUpdate1, msg1, model)));
				} else {
					return A2(
						author$project$Misc$perform,
						elm$core$Platform$Cmd$none,
						A2(langAreaUpdate1, msg1, model));
				}
			case 2:
				var msg1 = msg.a;
				if (!msg1.$) {
					var code = msg1.a;
					return A2(
						author$project$Misc$perform,
						elm$core$Platform$Cmd$none,
						updateExpr1(
							A2(exprAreaUpdate1, msg1, model)));
				} else {
					return A2(
						author$project$Misc$perform,
						elm$core$Platform$Cmd$none,
						A2(exprAreaUpdate1, msg1, model));
				}
			case 3:
				var mode = msg.a;
				return A2(
					author$project$Misc$perform,
					elm$core$Platform$Cmd$none,
					updateExpr1(
						showExpr1(
							A2(reduceExpr1, mode, model))));
			case 4:
				var term = msg.a;
				return A2(
					author$project$Misc$perform,
					elm$core$Platform$Cmd$none,
					updateExpr1(
						showExpr1(
							A2(prependNext1, term, model))));
			case 5:
				return A2(author$project$Misc$perform, randomTerm1, model);
			case 6:
				return A2(
					author$project$Misc$perform,
					author$project$Editor$Port$readSlot(model._),
					model);
			default:
				var slot = msg.a;
				return A2(
					A2(elm$core$Basics$composeL, author$project$Misc$perform, elm$core$Platform$Cmd$batch),
					_List_fromArray(
						[
							author$project$Editor$Port$writeSlotNum(slot),
							author$project$Misc$goto(author$project$Editor$Types$ReadCache)
						]),
					A2(changeSlot1, slot, model));
		}
	});
var author$project$Editor$Utils$isLangStyled = function (model) {
	return elm$core$List$length(model.au) > 0;
};
var elm$core$String$cons = _String_cons;
var elm$core$String$fromChar = function (_char) {
	return A2(elm$core$String$cons, _char, '');
};
var elm$core$String$fromList = _String_fromList;
var elm$core$String$foldr = _String_foldr;
var elm$core$String$toList = function (string) {
	return A3(elm$core$String$foldr, elm$core$List$cons, _List_Nil, string);
};
var elm$virtual_dom$VirtualDom$node = function (tag) {
	return _VirtualDom_node(
		_VirtualDom_noScript(tag));
};
var elm$html$Html$node = elm$virtual_dom$VirtualDom$node;
var elm$virtual_dom$VirtualDom$text = _VirtualDom_text;
var elm$html$Html$text = elm$virtual_dom$VirtualDom$text;
var elm$html$Html$Attributes$stringProperty = F2(
	function (key, string) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$string(string));
	});
var elm$html$Html$Attributes$class = elm$html$Html$Attributes$stringProperty('className');
var elm$html$Html$Attributes$classList = function (classes) {
	return elm$html$Html$Attributes$class(
		A2(
			elm$core$String$join,
			' ',
			A2(
				elm$core$List$map,
				elm$core$Tuple$first,
				A2(elm$core$List$filter, elm$core$Tuple$second, classes))));
};
var elm$virtual_dom$VirtualDom$style = _VirtualDom_style;
var elm$html$Html$Attributes$style = elm$virtual_dom$VirtualDom$style;
var author$project$Editor$CodeArea$viewString = F2(
	function (model, str) {
		var depthToOpacity = function (depth) {
			switch (depth) {
				case 0:
					return '1.0';
				case 1:
					return '0.5';
				case 2:
					return '0.4';
				case 3:
					return '0.3';
				default:
					return '0.2';
			}
		};
		var commentStart = A2(
			elm$core$Maybe$withDefault,
			elm$core$String$length(str),
			elm$core$List$head(
				A2(elm$core$String$indexes, '--', str)));
		var charToStyle = function (ch) {
			switch (ch) {
				case '=':
					return 'eq';
				case '(':
					return 'scope';
				case ')':
					return 'scope';
				default:
					return A2(
						elm$core$Dict$member,
						elm$core$String$fromChar(ch),
						model.ak) ? elm$core$String$fromChar(ch) : (author$project$Lang$Parse$isComb(ch) ? 'comb' : (author$project$Lang$Parse$isVar(ch) ? 'var' : ''));
			}
		};
		var viewChar = F3(
			function (depth, idx, ch) {
				var style1 = (_Utils_cmp(idx, commentStart) < 0) ? charToStyle(ch) : 'comment';
				var s = elm$core$String$fromList(
					_List_fromArray(
						[ch]));
				return elm$core$String$isEmpty(style1) ? elm$html$Html$text(s) : A2(
					elm$html$Html$node(
						A2(elm$core$List$member, idx + 1, model.at) ? 'strong' : 'span'),
					_List_fromArray(
						[
							elm$html$Html$Attributes$classList(
							_List_fromArray(
								[
									_Utils_Tuple2('codearea-' + style1, true)
								])),
							A2(
							elm$html$Html$Attributes$style,
							'opacity',
							model.as ? depthToOpacity(depth) : '1.0')
						]),
					_List_fromArray(
						[
							elm$html$Html$text(s)
						]));
			});
		var viewHead = F3(
			function (depth, idx, chars) {
				if (chars.b) {
					var ch = chars.a;
					var rest = chars.b;
					switch (ch) {
						case '(':
							return A2(
								elm$core$List$cons,
								A3(viewChar, depth, idx, ch),
								A3(viewHead, depth + 1, idx + 1, rest));
						case ')':
							return A2(
								elm$core$List$cons,
								A3(viewChar, depth - 1, idx, ch),
								A3(viewHead, depth - 1, idx + 1, rest));
						default:
							return A2(
								elm$core$List$cons,
								A3(viewChar, depth, idx, ch),
								A3(viewHead, depth, idx + 1, rest));
					}
				} else {
					return _List_Nil;
				}
			});
		return A3(
			viewHead,
			0,
			0,
			elm$core$String$toList(str));
	});
var elm$virtual_dom$VirtualDom$map = _VirtualDom_map;
var elm$html$Html$map = elm$virtual_dom$VirtualDom$map;
var author$project$Game$View$viewString = function (theme) {
	return A2(
		elm$core$Basics$composeR,
		author$project$Editor$CodeArea$viewString(theme),
		elm$core$List$map(
			elm$html$Html$map(
				elm$core$Basics$always(author$project$Game$Types$Idle))));
};
var author$project$Lang$Show$showDecl = function (_n0) {
	var comb = _n0.b;
	var args = _n0.c;
	var expr = _n0.d;
	return comb + (A2(elm$core$String$join, '', args) + (' = ' + author$project$Lang$Show$showExpr(expr)));
};
var author$project$Game$Game$makeCurr = F2(
	function (model, term) {
		var html = A2(
			author$project$Game$View$viewString,
			model.ac,
			author$project$Lang$Show$showTerm(term));
		var info = function () {
			if (!term.$) {
				var comb = term.b;
				var _n1 = A2(elm$core$Dict$get, comb, model.A);
				if (!_n1.$) {
					var decl = _n1.a;
					return A2(
						author$project$Game$View$viewString,
						model.ac,
						author$project$Lang$Show$showDecl(decl));
				} else {
					return html;
				}
			} else {
				return html;
			}
		}();
		return {
			aM: html,
			bp: info,
			a8: term,
			i: elm$core$List$length(html),
			P: 0,
			x: elm$core$Basics$floor(model.al / 2)
		};
	});
var author$project$Game$Types$Next = function (a) {
	return {$: 4, a: a};
};
var author$project$Game$Game$nextCurr = A2(
	elm$core$Basics$composeR,
	elm$random$Random$weighted(
		_Utils_Tuple2(
			0.0,
			A3(author$project$Lang$Types$Scope, 0, _List_Nil, 0))),
	elm$random$Random$generate(author$project$Game$Types$Next));
var author$project$Game$Game$scoreFactor = function (model) {
	return (model.u < 100) ? 10 : ((model.u < 300) ? 3 : ((model.u < 500) ? 2 : 1));
};
var author$project$Lang$Game$startsWith = function (start) {
	return A2(
		elm$core$Basics$composeL,
		elm$core$Basics$eq(start),
		elm$core$List$take(
			elm$core$List$length(start)));
};
var author$project$Lang$Game$canReduceLeft = F2(
	function (offsets, expr) {
		return A2(
			elm$core$Maybe$withDefault,
			false,
			A2(
				elm$core$Maybe$map,
				A2(author$project$Misc$flip, author$project$Lang$Game$startsWith, offsets),
				A2(
					elm$core$Maybe$map,
					author$project$Lang$Lang$getTermOffsets,
					elm$core$List$head(expr))));
	});
var elm$core$List$isEmpty = function (xs) {
	if (!xs.b) {
		return true;
	} else {
		return false;
	}
};
var author$project$Game$Game$updateRow = F2(
	function (model, row) {
		var theme = model.ac;
		var code = author$project$Lang$Show$showExpr(row.t);
		var expr = A2(
			elm$core$Result$withDefault,
			row.t,
			A3(
				author$project$Lang$Lang$makeExpr,
				model.A,
				elm$core$Basics$eq('_'),
				code));
		var offsets = author$project$Lang$Game$canInsertTerm(expr) ? _List_Nil : A2(author$project$Lang$Lang$getReductionOffsets, model.A, expr);
		var strong = A2(author$project$Lang$Game$canReduceLeft, offsets, expr) ? offsets : _List_Nil;
		var html = A2(
			author$project$Game$View$viewString,
			_Utils_update(
				theme,
				{at: strong}),
			code);
		var width = elm$core$List$length(html);
		var score = row.X + (A2(elm$core$Basics$max, 0, row.i - width) * author$project$Game$Game$scoreFactor(model));
		return _Utils_update(
			row,
			{
				az: A2(elm$core$Basics$composeL, elm$core$Basics$not, elm$core$List$isEmpty)(strong),
				t: expr,
				aM: html,
				X: score,
				i: width
			});
	});
var author$project$Game$Game$prependRow = F3(
	function (term, model, row) {
		var expr = A3(author$project$Lang$Game$prependTerm, term, model.A, row.t);
		return A2(
			author$project$Game$Game$updateRow,
			model,
			_Utils_update(
				row,
				{t: expr}));
	});
var author$project$Game$Game$reduceRow = F2(
	function (model, row) {
		var expr = row.az ? A2(author$project$Lang$Game$reduceLeft, model.A, row.t) : row.t;
		return A2(
			author$project$Game$Game$updateRow,
			model,
			_Utils_update(
				row,
				{t: expr}));
	});
var author$project$Game$Types$Down = {$: 7};
var author$project$Game$Types$Finished = 2;
var author$project$Game$Types$Pause = {$: 2};
var author$project$Game$Types$Paused = 1;
var author$project$Game$Types$Resume = {$: 3};
var author$project$Game$Types$Start = {$: 1};
var author$project$Game$Types$Throw = {$: 8};
var author$project$Game$Types$Up = {$: 6};
var elm$core$Array$bitMask = 4294967295 >>> (32 - elm$core$Array$shiftStep);
var elm$core$Elm$JsArray$unsafeGet = _JsArray_unsafeGet;
var elm$core$Array$getHelp = F3(
	function (shift, index, tree) {
		getHelp:
		while (true) {
			var pos = elm$core$Array$bitMask & (index >>> shift);
			var _n0 = A2(elm$core$Elm$JsArray$unsafeGet, pos, tree);
			if (!_n0.$) {
				var subTree = _n0.a;
				var $temp$shift = shift - elm$core$Array$shiftStep,
					$temp$index = index,
					$temp$tree = subTree;
				shift = $temp$shift;
				index = $temp$index;
				tree = $temp$tree;
				continue getHelp;
			} else {
				var values = _n0.a;
				return A2(elm$core$Elm$JsArray$unsafeGet, elm$core$Array$bitMask & index, values);
			}
		}
	});
var elm$core$Bitwise$shiftLeftBy = _Bitwise_shiftLeftBy;
var elm$core$Array$tailIndex = function (len) {
	return (len >>> 5) << 5;
};
var elm$core$Array$get = F2(
	function (index, _n0) {
		var len = _n0.a;
		var startShift = _n0.b;
		var tree = _n0.c;
		var tail = _n0.d;
		return ((index < 0) || (_Utils_cmp(index, len) > -1)) ? elm$core$Maybe$Nothing : ((_Utils_cmp(
			index,
			elm$core$Array$tailIndex(len)) > -1) ? elm$core$Maybe$Just(
			A2(elm$core$Elm$JsArray$unsafeGet, elm$core$Array$bitMask & index, tail)) : elm$core$Maybe$Just(
			A3(elm$core$Array$getHelp, startShift, index, tree)));
	});
var elm$core$Elm$JsArray$foldl = _JsArray_foldl;
var elm$core$Elm$JsArray$indexedMap = _JsArray_indexedMap;
var elm$core$Array$indexedMap = F2(
	function (func, _n0) {
		var len = _n0.a;
		var tree = _n0.c;
		var tail = _n0.d;
		var initialBuilder = {
			g: _List_Nil,
			e: 0,
			f: A3(
				elm$core$Elm$JsArray$indexedMap,
				func,
				elm$core$Array$tailIndex(len),
				tail)
		};
		var helper = F2(
			function (node, builder) {
				if (!node.$) {
					var subTree = node.a;
					return A3(elm$core$Elm$JsArray$foldl, helper, builder, subTree);
				} else {
					var leaf = node.a;
					var offset = builder.e * elm$core$Array$branchFactor;
					var mappedLeaf = elm$core$Array$Leaf(
						A3(elm$core$Elm$JsArray$indexedMap, func, offset, leaf));
					return {
						g: A2(elm$core$List$cons, mappedLeaf, builder.g),
						e: builder.e + 1,
						f: builder.f
					};
				}
			});
		return A2(
			elm$core$Array$builderToArray,
			true,
			A3(elm$core$Elm$JsArray$foldl, helper, initialBuilder, tree));
	});
var elm$core$Elm$JsArray$map = _JsArray_map;
var elm$core$Array$map = F2(
	function (func, _n0) {
		var len = _n0.a;
		var startShift = _n0.b;
		var tree = _n0.c;
		var tail = _n0.d;
		var helper = function (node) {
			if (!node.$) {
				var subTree = node.a;
				return elm$core$Array$SubTree(
					A2(elm$core$Elm$JsArray$map, helper, subTree));
			} else {
				var values = node.a;
				return elm$core$Array$Leaf(
					A2(elm$core$Elm$JsArray$map, func, values));
			}
		};
		return A4(
			elm$core$Array$Array_elm_builtin,
			len,
			startShift,
			A2(elm$core$Elm$JsArray$map, helper, tree),
			A2(elm$core$Elm$JsArray$map, func, tail));
	});
var elm$core$List$all = F2(
	function (isOkay, list) {
		return !A2(
			elm$core$List$any,
			A2(elm$core$Basics$composeL, elm$core$Basics$not, isOkay),
			list);
	});
var ohanhi$keyboard$Keyboard$Character = function (a) {
	return {$: 0, a: a};
};
var ohanhi$keyboard$Keyboard$characterKey = function (_n0) {
	var value = _n0;
	return (elm$core$String$length(value) === 1) ? elm$core$Maybe$Just(
		ohanhi$keyboard$Keyboard$Character(value)) : elm$core$Maybe$Nothing;
};
var ohanhi$keyboard$Keyboard$Backspace = {$: 26};
var ohanhi$keyboard$Keyboard$Clear = {$: 27};
var ohanhi$keyboard$Keyboard$Copy = {$: 28};
var ohanhi$keyboard$Keyboard$CrSel = {$: 29};
var ohanhi$keyboard$Keyboard$Cut = {$: 30};
var ohanhi$keyboard$Keyboard$Delete = {$: 31};
var ohanhi$keyboard$Keyboard$EraseEof = {$: 32};
var ohanhi$keyboard$Keyboard$ExSel = {$: 33};
var ohanhi$keyboard$Keyboard$Insert = {$: 34};
var ohanhi$keyboard$Keyboard$Paste = {$: 35};
var ohanhi$keyboard$Keyboard$Redo = {$: 36};
var ohanhi$keyboard$Keyboard$Undo = {$: 37};
var ohanhi$keyboard$Keyboard$editingKey = function (_n0) {
	var value = _n0;
	switch (value) {
		case 'Backspace':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Backspace);
		case 'Clear':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Clear);
		case 'Copy':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Copy);
		case 'CrSel':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$CrSel);
		case 'Cut':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Cut);
		case 'Delete':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Delete);
		case 'EraseEof':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$EraseEof);
		case 'ExSel':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ExSel);
		case 'Insert':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Insert);
		case 'Paste':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Paste);
		case 'Redo':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Redo);
		case 'Undo':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Undo);
		default:
			return elm$core$Maybe$Nothing;
	}
};
var ohanhi$keyboard$Keyboard$F1 = {$: 38};
var ohanhi$keyboard$Keyboard$F10 = {$: 47};
var ohanhi$keyboard$Keyboard$F11 = {$: 48};
var ohanhi$keyboard$Keyboard$F12 = {$: 49};
var ohanhi$keyboard$Keyboard$F13 = {$: 50};
var ohanhi$keyboard$Keyboard$F14 = {$: 51};
var ohanhi$keyboard$Keyboard$F15 = {$: 52};
var ohanhi$keyboard$Keyboard$F16 = {$: 53};
var ohanhi$keyboard$Keyboard$F17 = {$: 54};
var ohanhi$keyboard$Keyboard$F18 = {$: 55};
var ohanhi$keyboard$Keyboard$F19 = {$: 56};
var ohanhi$keyboard$Keyboard$F2 = {$: 39};
var ohanhi$keyboard$Keyboard$F20 = {$: 57};
var ohanhi$keyboard$Keyboard$F3 = {$: 40};
var ohanhi$keyboard$Keyboard$F4 = {$: 41};
var ohanhi$keyboard$Keyboard$F5 = {$: 42};
var ohanhi$keyboard$Keyboard$F6 = {$: 43};
var ohanhi$keyboard$Keyboard$F7 = {$: 44};
var ohanhi$keyboard$Keyboard$F8 = {$: 45};
var ohanhi$keyboard$Keyboard$F9 = {$: 46};
var ohanhi$keyboard$Keyboard$functionKey = function (_n0) {
	var value = _n0;
	switch (value) {
		case 'F1':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F1);
		case 'F2':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F2);
		case 'F3':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F3);
		case 'F4':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F4);
		case 'F5':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F5);
		case 'F6':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F6);
		case 'F7':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F7);
		case 'F8':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F8);
		case 'F9':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F9);
		case 'F10':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F10);
		case 'F11':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F11);
		case 'F12':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F12);
		case 'F13':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F13);
		case 'F14':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F14);
		case 'F15':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F15);
		case 'F16':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F16);
		case 'F17':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F17);
		case 'F18':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F18);
		case 'F19':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F19);
		case 'F20':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$F20);
		default:
			return elm$core$Maybe$Nothing;
	}
};
var ohanhi$keyboard$Keyboard$ChannelDown = {$: 85};
var ohanhi$keyboard$Keyboard$ChannelUp = {$: 86};
var ohanhi$keyboard$Keyboard$MediaFastForward = {$: 87};
var ohanhi$keyboard$Keyboard$MediaPause = {$: 88};
var ohanhi$keyboard$Keyboard$MediaPlay = {$: 89};
var ohanhi$keyboard$Keyboard$MediaPlayPause = {$: 90};
var ohanhi$keyboard$Keyboard$MediaRecord = {$: 91};
var ohanhi$keyboard$Keyboard$MediaRewind = {$: 92};
var ohanhi$keyboard$Keyboard$MediaStop = {$: 93};
var ohanhi$keyboard$Keyboard$MediaTrackNext = {$: 94};
var ohanhi$keyboard$Keyboard$MediaTrackPrevious = {$: 95};
var ohanhi$keyboard$Keyboard$mediaKey = function (_n0) {
	var value = _n0;
	switch (value) {
		case 'ChannelDown':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ChannelDown);
		case 'ChannelUp':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ChannelUp);
		case 'MediaFastForward':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MediaFastForward);
		case 'MediaPause':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MediaPause);
		case 'MediaPlay':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MediaPlay);
		case 'MediaPlayPause':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MediaPlayPause);
		case 'MediaRecord':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MediaRecord);
		case 'MediaRewind':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MediaRewind);
		case 'MediaStop':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MediaStop);
		case 'MediaTrackNext':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MediaTrackNext);
		case 'MediaTrackPrevious':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MediaTrackPrevious);
		default:
			return elm$core$Maybe$Nothing;
	}
};
var ohanhi$keyboard$Keyboard$Alt = {$: 1};
var ohanhi$keyboard$Keyboard$AltGraph = {$: 2};
var ohanhi$keyboard$Keyboard$CapsLock = {$: 3};
var ohanhi$keyboard$Keyboard$Control = {$: 4};
var ohanhi$keyboard$Keyboard$Fn = {$: 5};
var ohanhi$keyboard$Keyboard$FnLock = {$: 6};
var ohanhi$keyboard$Keyboard$Hyper = {$: 7};
var ohanhi$keyboard$Keyboard$Meta = {$: 8};
var ohanhi$keyboard$Keyboard$NumLock = {$: 9};
var ohanhi$keyboard$Keyboard$ScrollLock = {$: 10};
var ohanhi$keyboard$Keyboard$Shift = {$: 11};
var ohanhi$keyboard$Keyboard$Super = {$: 12};
var ohanhi$keyboard$Keyboard$Symbol = {$: 13};
var ohanhi$keyboard$Keyboard$SymbolLock = {$: 14};
var ohanhi$keyboard$Keyboard$modifierKey = function (_n0) {
	var value = _n0;
	switch (value) {
		case 'Alt':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Alt);
		case 'AltGraph':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$AltGraph);
		case 'CapsLock':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$CapsLock);
		case 'Control':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Control);
		case 'Fn':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Fn);
		case 'FnLock':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$FnLock);
		case 'Hyper':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Hyper);
		case 'Meta':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Meta);
		case 'NumLock':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$NumLock);
		case 'ScrollLock':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ScrollLock);
		case 'Shift':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Shift);
		case 'Super':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Super);
		case 'OS':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Super);
		case 'Symbol':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Symbol);
		case 'SymbolLock':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$SymbolLock);
		default:
			return elm$core$Maybe$Nothing;
	}
};
var ohanhi$keyboard$Keyboard$ArrowDown = {$: 18};
var ohanhi$keyboard$Keyboard$ArrowLeft = {$: 19};
var ohanhi$keyboard$Keyboard$ArrowRight = {$: 20};
var ohanhi$keyboard$Keyboard$ArrowUp = {$: 21};
var ohanhi$keyboard$Keyboard$End = {$: 22};
var ohanhi$keyboard$Keyboard$Home = {$: 23};
var ohanhi$keyboard$Keyboard$PageDown = {$: 24};
var ohanhi$keyboard$Keyboard$PageUp = {$: 25};
var ohanhi$keyboard$Keyboard$navigationKey = function (_n0) {
	var value = _n0;
	switch (value) {
		case 'ArrowDown':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ArrowDown);
		case 'ArrowLeft':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ArrowLeft);
		case 'ArrowRight':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ArrowRight);
		case 'ArrowUp':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ArrowUp);
		case 'Down':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ArrowDown);
		case 'Left':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ArrowLeft);
		case 'Right':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ArrowRight);
		case 'Up':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ArrowUp);
		case 'End':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$End);
		case 'Home':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Home);
		case 'PageDown':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$PageDown);
		case 'PageUp':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$PageUp);
		default:
			return elm$core$Maybe$Nothing;
	}
};
var ohanhi$keyboard$Keyboard$oneOf = F2(
	function (fns, key) {
		oneOf:
		while (true) {
			if (!fns.b) {
				return elm$core$Maybe$Nothing;
			} else {
				var fn = fns.a;
				var rest = fns.b;
				var _n1 = fn(key);
				if (!_n1.$) {
					var a = _n1.a;
					return elm$core$Maybe$Just(a);
				} else {
					var $temp$fns = rest,
						$temp$key = key;
					fns = $temp$fns;
					key = $temp$key;
					continue oneOf;
				}
			}
		}
	});
var ohanhi$keyboard$Keyboard$AppSwitch = {$: 73};
var ohanhi$keyboard$Keyboard$Call = {$: 74};
var ohanhi$keyboard$Keyboard$Camera = {$: 75};
var ohanhi$keyboard$Keyboard$CameraFocus = {$: 76};
var ohanhi$keyboard$Keyboard$EndCall = {$: 77};
var ohanhi$keyboard$Keyboard$GoBack = {$: 78};
var ohanhi$keyboard$Keyboard$GoHome = {$: 79};
var ohanhi$keyboard$Keyboard$HeadsetHook = {$: 80};
var ohanhi$keyboard$Keyboard$LastNumberRedial = {$: 81};
var ohanhi$keyboard$Keyboard$MannerMode = {$: 83};
var ohanhi$keyboard$Keyboard$Notification = {$: 82};
var ohanhi$keyboard$Keyboard$VoiceDial = {$: 84};
var ohanhi$keyboard$Keyboard$phoneKey = function (_n0) {
	var value = _n0;
	switch (value) {
		case 'AppSwitch':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$AppSwitch);
		case 'Call':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Call);
		case 'Camera':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Camera);
		case 'CameraFocus':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$CameraFocus);
		case 'EndCall':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$EndCall);
		case 'GoBack':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$GoBack);
		case 'GoHome':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$GoHome);
		case 'HeadsetHook':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$HeadsetHook);
		case 'LastNumberRedial':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$LastNumberRedial);
		case 'Notification':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Notification);
		case 'MannerMode':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$MannerMode);
		case 'VoiceDial':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$VoiceDial);
		default:
			return elm$core$Maybe$Nothing;
	}
};
var ohanhi$keyboard$Keyboard$Again = {$: 58};
var ohanhi$keyboard$Keyboard$Attn = {$: 59};
var ohanhi$keyboard$Keyboard$Cancel = {$: 60};
var ohanhi$keyboard$Keyboard$ContextMenu = {$: 61};
var ohanhi$keyboard$Keyboard$Escape = {$: 62};
var ohanhi$keyboard$Keyboard$Execute = {$: 63};
var ohanhi$keyboard$Keyboard$Find = {$: 64};
var ohanhi$keyboard$Keyboard$Finish = {$: 65};
var ohanhi$keyboard$Keyboard$Help = {$: 66};
var ohanhi$keyboard$Keyboard$Pause = {$: 67};
var ohanhi$keyboard$Keyboard$Play = {$: 68};
var ohanhi$keyboard$Keyboard$Props = {$: 69};
var ohanhi$keyboard$Keyboard$Select = {$: 70};
var ohanhi$keyboard$Keyboard$ZoomIn = {$: 71};
var ohanhi$keyboard$Keyboard$ZoomOut = {$: 72};
var ohanhi$keyboard$Keyboard$uiKey = function (_n0) {
	var value = _n0;
	switch (value) {
		case 'Again':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Again);
		case 'Attn':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Attn);
		case 'Cancel':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Cancel);
		case 'ContextMenu':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ContextMenu);
		case 'Escape':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Escape);
		case 'Execute':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Execute);
		case 'Find':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Find);
		case 'Finish':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Finish);
		case 'Help':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Help);
		case 'Pause':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Pause);
		case 'Play':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Play);
		case 'Props':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Props);
		case 'Select':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Select);
		case 'ZoomIn':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ZoomIn);
		case 'ZoomOut':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$ZoomOut);
		default:
			return elm$core$Maybe$Nothing;
	}
};
var ohanhi$keyboard$Keyboard$Enter = {$: 15};
var ohanhi$keyboard$Keyboard$Spacebar = {$: 17};
var ohanhi$keyboard$Keyboard$Tab = {$: 16};
var ohanhi$keyboard$Keyboard$whitespaceKey = function (_n0) {
	var value = _n0;
	switch (value) {
		case 'Enter':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Enter);
		case 'Tab':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Tab);
		case 'Spacebar':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Spacebar);
		case ' ':
			return elm$core$Maybe$Just(ohanhi$keyboard$Keyboard$Spacebar);
		default:
			return elm$core$Maybe$Nothing;
	}
};
var ohanhi$keyboard$Keyboard$anyKey = ohanhi$keyboard$Keyboard$oneOf(
	_List_fromArray(
		[ohanhi$keyboard$Keyboard$characterKey, ohanhi$keyboard$Keyboard$modifierKey, ohanhi$keyboard$Keyboard$whitespaceKey, ohanhi$keyboard$Keyboard$navigationKey, ohanhi$keyboard$Keyboard$editingKey, ohanhi$keyboard$Keyboard$functionKey, ohanhi$keyboard$Keyboard$uiKey, ohanhi$keyboard$Keyboard$phoneKey, ohanhi$keyboard$Keyboard$mediaKey]));
var elm$core$Basics$neq = _Utils_notEqual;
var ohanhi$keyboard$Keyboard$insert = F3(
	function (keyParser, rawKey, list) {
		var _n0 = keyParser(rawKey);
		if (!_n0.$) {
			var key = _n0.a;
			return A2(
				elm$core$List$cons,
				key,
				A2(
					elm$core$List$filter,
					elm$core$Basics$neq(key),
					list));
		} else {
			return list;
		}
	});
var ohanhi$keyboard$Keyboard$remove = F3(
	function (keyParser, rawKey, list) {
		var _n0 = keyParser(rawKey);
		if (!_n0.$) {
			var key = _n0.a;
			return A2(
				elm$core$List$filter,
				elm$core$Basics$neq(key),
				list);
		} else {
			return list;
		}
	});
var ohanhi$keyboard$Keyboard$updateWithParser = F3(
	function (keyParser, msg, state) {
		if (!msg.$) {
			var key = msg.a;
			return A3(ohanhi$keyboard$Keyboard$insert, keyParser, key, state);
		} else {
			var key = msg.a;
			return A3(ohanhi$keyboard$Keyboard$remove, keyParser, key, state);
		}
	});
var ohanhi$keyboard$Keyboard$update = ohanhi$keyboard$Keyboard$updateWithParser(ohanhi$keyboard$Keyboard$anyKey);
var ohanhi$keyboard$Keyboard$Arrows$boolToInt = function (bool) {
	return bool ? 1 : 0;
};
var ohanhi$keyboard$Keyboard$Arrows$arrows = function (keys) {
	var toInt = function (key) {
		return ohanhi$keyboard$Keyboard$Arrows$boolToInt(
			A2(elm$core$List$member, key, keys));
	};
	var x = toInt(ohanhi$keyboard$Keyboard$ArrowRight) - toInt(ohanhi$keyboard$Keyboard$ArrowLeft);
	var y = toInt(ohanhi$keyboard$Keyboard$ArrowUp) - toInt(ohanhi$keyboard$Keyboard$ArrowDown);
	return {P: x, x: y};
};
var author$project$Game$Game$update = F2(
	function (msg, model) {
		var touchstart = F2(
			function (id, m1) {
				switch (id) {
					case 'Pause':
						return A2(author$project$Game$Game$update, author$project$Game$Types$Pause, m1);
					case 'Resume':
						return A2(author$project$Game$Game$update, author$project$Game$Types$Resume, m1);
					case 'Restart':
						return A2(author$project$Game$Game$update, author$project$Game$Types$Start, m1);
					case '⇧':
						return A2(author$project$Game$Game$update, author$project$Game$Types$Up, m1);
					case '⇩':
						return A2(author$project$Game$Game$update, author$project$Game$Types$Down, m1);
					case '⇨':
						return A2(author$project$Game$Game$update, author$project$Game$Types$Throw, m1);
					default:
						return A2(author$project$Misc$perform, elm$core$Platform$Cmd$none, m1);
				}
			});
		var sumScores = A2(
			elm$core$Basics$composeL,
			A2(
				elm$core$Basics$composeL,
				elm$core$List$sum,
				elm$core$List$map(
					function ($) {
						return $.X;
					})),
			elm$core$Array$toList);
		var reduce = elm$core$Array$map(
			author$project$Game$Game$reduceRow(model));
		var prepend = F2(
			function (c, n) {
				return elm$core$Array$indexedMap(
					function (i) {
						return _Utils_eq(i, n) ? A2(author$project$Game$Game$prependRow, c, model) : elm$core$Basics$identity;
					});
			});
		var keyboard = F2(
			function (msg1, m1) {
				var keys = A2(ohanhi$keyboard$Keyboard$update, msg1, m1.am);
				var arrows = ohanhi$keyboard$Keyboard$Arrows$arrows(keys);
				var m2 = _Utils_update(
					m1,
					{ax: arrows, am: keys});
				return (arrows.x > 0) ? A2(author$project$Game$Game$update, author$project$Game$Types$Up, m2) : ((arrows.x < 0) ? A2(author$project$Game$Game$update, author$project$Game$Types$Down, m2) : ((arrows.P > 0) ? A2(author$project$Game$Game$update, author$project$Game$Types$Throw, m2) : A2(author$project$Misc$perform, elm$core$Platform$Cmd$none, m2)));
			});
		var incY = F2(
			function (dy, curr) {
				return _Utils_update(
					curr,
					{x: curr.x + dy});
			});
		var incX = F2(
			function (dx, curr) {
				return _Utils_update(
					curr,
					{P: curr.P + dx});
			});
		var canPlay = A2(
			elm$core$Basics$composeL,
			elm$core$List$all(
				A2(
					elm$core$Basics$composeL,
					elm$core$Basics$gt(model.i),
					function ($) {
						return $.i;
					})),
			elm$core$Array$toList);
		var canMove = F2(
			function (x, y) {
				return A2(
					elm$core$Basics$composeL,
					A2(
						elm$core$Basics$composeL,
						A2(
							elm$core$Basics$composeL,
							A2(
								elm$core$Basics$composeL,
								elm$core$Basics$lt(x),
								elm$core$Basics$sub(model.i)),
							elm$core$Maybe$withDefault(model.i)),
						elm$core$Maybe$map(
							function ($) {
								return $.i;
							})),
					elm$core$Array$get(y));
			});
		var control = F2(
			function (dy, m) {
				var _n7 = m.s;
				if (!_n7.$) {
					var curr = _n7.a;
					var _n8 = A3(canMove, curr.P + curr.i, curr.x + dy, m.m);
					if (_n8) {
						return _Utils_update(
							m,
							{
								s: elm$core$Maybe$Just(
									A2(incY, dy, curr))
							});
					} else {
						return m;
					}
				} else {
					return m;
				}
			});
		var move = F2(
			function (dx, m) {
				var _n5 = m.s;
				if (!_n5.$) {
					var curr = _n5.a;
					var _n6 = A3(canMove, (curr.P + dx) + curr.i, curr.x, m.m);
					if (_n6) {
						return _Utils_update(
							m,
							{
								s: elm$core$Maybe$Just(
									A2(incX, dx, curr)),
								m: reduce(m.m)
							});
					} else {
						return _Utils_update(
							m,
							{
								s: elm$core$Maybe$Nothing,
								m: A3(prepend, curr.a8, curr.x, m.m)
							});
					}
				} else {
					return _Utils_update(
						m,
						{
							m: reduce(m.m)
						});
				}
			});
		switch (msg.$) {
			case 0:
				return A2(author$project$Misc$perform, elm$core$Platform$Cmd$none, model);
			case 11:
				var orient = msg.a;
				return A2(
					author$project$Misc$perform,
					elm$core$Platform$Cmd$none,
					_Utils_update(
						model,
						{aU: orient}));
			case 1:
				return A3(author$project$Game$Game$init, model.ac.ak, model.av, model.A);
			case 2:
				return A2(
					author$project$Misc$perform,
					author$project$Port$captureTouches(false),
					_Utils_update(
						model,
						{N: 1}));
			case 3:
				return A2(
					author$project$Misc$perform,
					author$project$Port$captureTouches(true),
					_Utils_update(
						model,
						{N: 0}));
			case 4:
				var c = msg.a;
				return A2(
					author$project$Misc$perform,
					elm$core$Platform$Cmd$none,
					_Utils_update(
						model,
						{
							s: model.aq,
							aq: elm$core$Maybe$Just(
								A2(author$project$Game$Game$makeCurr, model, c))
						}));
			case 6:
				return A2(
					author$project$Misc$perform,
					elm$core$Platform$Cmd$none,
					A2(control, -1, model));
			case 7:
				return A2(
					author$project$Misc$perform,
					elm$core$Platform$Cmd$none,
					A2(control, 1, model));
			case 8:
				return A2(
					author$project$Misc$perform,
					elm$core$Platform$Cmd$none,
					A2(move, model.i, model));
			case 9:
				var key = msg.a;
				return A2(keyboard, key, model);
			case 10:
				var id = msg.a;
				return A2(touchstart, id, model);
			default:
				var model1 = A2(move, 1, model);
				var model2 = _Utils_update(
					model1,
					{
						u: model.u - ((model.u / author$project$Game$Game$scoreFactor(model)) / 1000),
						X: sumScores(model1.m),
						N: canPlay(model1.m) ? 0 : 2
					});
				var _n1 = _Utils_Tuple2(model2.s, model2.N);
				_n1$2:
				while (true) {
					switch (_n1.b) {
						case 0:
							if (_n1.a.$ === 1) {
								var _n2 = _n1.a;
								var _n3 = _n1.b;
								return A2(
									author$project$Misc$perform,
									author$project$Game$Game$nextCurr(model.av),
									model2);
							} else {
								break _n1$2;
							}
						case 2:
							var _n4 = _n1.b;
							return A2(
								author$project$Misc$perform,
								author$project$Port$captureTouches(false),
								model2);
						default:
							break _n1$2;
					}
				}
				return A2(author$project$Misc$perform, elm$core$Platform$Cmd$none, model2);
		}
	});
var author$project$Main$Game = 1;
var author$project$Main$mapGame = F2(
	function (model, _n0) {
		var game = _n0.a;
		var msg = _n0.b;
		return A2(
			author$project$Misc$perform,
			A2(elm$core$Platform$Cmd$map, author$project$Main$GameMsg, msg),
			_Utils_update(
				model,
				{U: game, E: 1}));
	});
var elm$browser$Browser$Navigation$pushUrl = _Browser_pushUrl;
var elm$url$Url$addPort = F2(
	function (maybePort, starter) {
		if (maybePort.$ === 1) {
			return starter;
		} else {
			var port_ = maybePort.a;
			return starter + (':' + elm$core$String$fromInt(port_));
		}
	});
var elm$url$Url$addPrefixed = F3(
	function (prefix, maybeSegment, starter) {
		if (maybeSegment.$ === 1) {
			return starter;
		} else {
			var segment = maybeSegment.a;
			return _Utils_ap(
				starter,
				_Utils_ap(prefix, segment));
		}
	});
var elm$url$Url$toString = function (url) {
	var http = function () {
		var _n0 = url.a_;
		if (!_n0) {
			return 'http://';
		} else {
			return 'https://';
		}
	}();
	return A3(
		elm$url$Url$addPrefixed,
		'#',
		url.aI,
		A3(
			elm$url$Url$addPrefixed,
			'?',
			url.a$,
			_Utils_ap(
				A2(
					elm$url$Url$addPort,
					url.aX,
					_Utils_ap(http, url.aL)),
				url.aV)));
};
var author$project$Main$pushUrl = F2(
	function (_n0, url) {
		var navkey = _n0.ap;
		return A2(
			elm$browser$Browser$Navigation$pushUrl,
			navkey,
			elm$url$Url$toString(url));
	});
var elm$browser$Browser$Navigation$replaceUrl = _Browser_replaceUrl;
var author$project$Main$resetUrl = function (_n0) {
	var navkey = _n0.ap;
	var navurl = _n0.aS;
	return A2(
		elm$browser$Browser$Navigation$replaceUrl,
		navkey,
		elm$url$Url$toString(
			_Utils_update(
				navurl,
				{aI: elm$core$Maybe$Nothing})));
};
var author$project$Main$setLangText = A2(
	elm$core$Basics$composeL,
	A2(
		elm$core$Basics$composeL,
		A2(elm$core$Basics$composeL, author$project$Misc$goto, author$project$Main$EditorMsg),
		author$project$Editor$Types$LangArea),
	author$project$Editor$CodeArea$SetText);
var author$project$Main$startGame = function (model) {
	var editor = model.y;
	return A2(
		author$project$Main$mapGame,
		model,
		A3(
			author$project$Game$Game$init,
			editor.B.ak,
			editor.au,
			A2(elm$core$Result$withDefault, elm$core$Dict$empty, editor.n)));
};
var author$project$Main$thenPerform = F2(
	function (msg1, _n0) {
		var model = _n0.a;
		var msg = _n0.b;
		return _Utils_Tuple2(
			model,
			elm$core$Platform$Cmd$batch(
				_List_fromArray(
					[msg, msg1])));
	});
var elm$browser$Browser$Navigation$load = _Browser_load;
var author$project$Main$update = F2(
	function (msg, model) {
		var _n0 = _Utils_Tuple2(msg, model.E);
		_n0$5:
		while (true) {
			switch (_n0.a.$) {
				case 1:
					if (!_n0.b) {
						var msg1 = _n0.a.a;
						var _n1 = _n0.b;
						return A2(
							author$project$Main$mapEditor,
							model,
							A2(author$project$Editor$Editor$update, msg1, model.y));
					} else {
						break _n0$5;
					}
				case 2:
					if (_n0.b === 1) {
						var msg1 = _n0.a.a;
						var _n2 = _n0.b;
						return A2(
							author$project$Main$mapGame,
							model,
							A2(author$project$Game$Game$update, msg1, model.U));
					} else {
						break _n0$5;
					}
				case 4:
					if (!_n0.b) {
						var url = _n0.a.a;
						var _n3 = _n0.b;
						var _n4 = url.aI;
						_n4$5:
						while (true) {
							if (!_n4.$) {
								switch (_n4.a) {
									case 'BINARYLOGIC1':
										return A2(
											author$project$Main$thenPerform,
											author$project$Main$resetUrl(model),
											A2(
												author$project$Misc$perform,
												author$project$Main$setLangText(author$project$Editor$Data$exampleBINARYLOGIC1),
												model));
									case 'SKIY':
										return A2(
											author$project$Main$thenPerform,
											author$project$Main$resetUrl(model),
											A2(
												author$project$Misc$perform,
												author$project$Main$setLangText(author$project$Editor$Data$exampleSKIY),
												model));
									case 'BCKWY':
										return A2(
											author$project$Main$thenPerform,
											author$project$Main$resetUrl(model),
											A2(
												author$project$Misc$perform,
												author$project$Main$setLangText(author$project$Editor$Data$exampleBCKWY),
												model));
									case 'NEW':
										return A2(
											author$project$Main$thenPerform,
											author$project$Main$resetUrl(model),
											A2(
												author$project$Misc$perform,
												author$project$Main$setLangText('\u200b'),
												model));
									case 'game':
										return author$project$Editor$Utils$isLangStyled(model.y) ? author$project$Main$startGame(model) : A2(
											author$project$Misc$perform,
											author$project$Main$resetUrl(model),
											model);
									default:
										break _n4$5;
								}
							} else {
								break _n4$5;
							}
						}
						return A2(author$project$Misc$perform, elm$core$Platform$Cmd$none, model);
					} else {
						var _n5 = _n0.b;
						return A2(
							A2(elm$core$Basics$composeL, author$project$Misc$perform, elm$core$Platform$Cmd$batch),
							_List_fromArray(
								[
									author$project$Main$resetUrl(model),
									author$project$Port$captureTouches(false)
								]),
							_Utils_update(
								model,
								{E: 0}));
					}
				case 3:
					var req = _n0.a.a;
					if (!req.$) {
						var url = req.a;
						return A2(
							author$project$Misc$perform,
							A2(author$project$Main$pushUrl, model, url),
							model);
					} else {
						var url = req.a;
						return A2(
							author$project$Misc$perform,
							elm$browser$Browser$Navigation$load(url),
							model);
					}
				default:
					break _n0$5;
			}
		}
		return A2(author$project$Misc$perform, elm$core$Platform$Cmd$none, model);
	});
var elm$virtual_dom$VirtualDom$lazy = _VirtualDom_lazy;
var elm$html$Html$Lazy$lazy = elm$virtual_dom$VirtualDom$lazy;
var author$project$Editor$CodeArea$lazy = elm$html$Html$Lazy$lazy;
var elm$html$Html$code = _VirtualDom_node('code');
var elm$html$Html$div = _VirtualDom_node('div');
var elm$html$Html$pre = _VirtualDom_node('pre');
var elm$virtual_dom$VirtualDom$attribute = F2(
	function (key, value) {
		return A2(
			_VirtualDom_attribute,
			_VirtualDom_noOnOrFormAction(key),
			_VirtualDom_noJavaScriptOrHtmlUri(value));
	});
var elm$html$Html$Attributes$attribute = elm$virtual_dom$VirtualDom$attribute;
var author$project$Editor$CodeArea$viewCode = function (model) {
	var viewLine = F2(
		function (index, str) {
			return A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$classList(
						_List_fromArray(
							[
								_Utils_Tuple2('codearea-line', model.ai),
								_Utils_Tuple2(
								'codearea-highlight',
								(model.ag >= 0) && _Utils_eq(model.ag, 1 + index))
							])),
						A2(
						elm$html$Html$Attributes$attribute,
						'data-codearea-lc',
						elm$core$String$fromInt(1 + index))
					]),
				A2(author$project$Editor$CodeArea$viewString, model, str));
		});
	return A2(
		elm$html$Html$pre,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('codearea')
			]),
		elm$core$List$singleton(
			A2(
				elm$html$Html$code,
				_List_Nil,
				A2(
					elm$core$List$indexedMap,
					viewLine,
					elm$core$String$lines(model.G)))));
};
var author$project$Editor$CodeArea$OnScroll = function (a) {
	return {$: 1, a: a};
};
var elm$html$Html$textarea = _VirtualDom_node('textarea');
var elm$html$Html$Attributes$boolProperty = F2(
	function (key, bool) {
		return A2(
			_VirtualDom_property,
			key,
			elm$json$Json$Encode$bool(bool));
	});
var elm$html$Html$Attributes$spellcheck = elm$html$Html$Attributes$boolProperty('spellcheck');
var elm$html$Html$Attributes$value = elm$html$Html$Attributes$stringProperty('value');
var elm$virtual_dom$VirtualDom$Normal = function (a) {
	return {$: 0, a: a};
};
var elm$virtual_dom$VirtualDom$on = _VirtualDom_on;
var elm$html$Html$Events$on = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Normal(decoder));
	});
var elm$html$Html$Events$alwaysStop = function (x) {
	return _Utils_Tuple2(x, true);
};
var elm$virtual_dom$VirtualDom$MayStopPropagation = function (a) {
	return {$: 1, a: a};
};
var elm$html$Html$Events$stopPropagationOn = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$MayStopPropagation(decoder));
	});
var elm$json$Json$Decode$at = F2(
	function (fields, decoder) {
		return A3(elm$core$List$foldr, elm$json$Json$Decode$field, decoder, fields);
	});
var elm$html$Html$Events$targetValue = A2(
	elm$json$Json$Decode$at,
	_List_fromArray(
		['target', 'value']),
	elm$json$Json$Decode$string);
var elm$html$Html$Events$onInput = function (tagger) {
	return A2(
		elm$html$Html$Events$stopPropagationOn,
		'input',
		A2(
			elm$json$Json$Decode$map,
			elm$html$Html$Events$alwaysStop,
			A2(elm$json$Json$Decode$map, tagger, elm$html$Html$Events$targetValue)));
};
var author$project$Editor$CodeArea$viewFakeTextArea = function (model) {
	return A2(
		elm$html$Html$textarea,
		_List_fromArray(
			[
				elm$html$Html$Attributes$value(model.G),
				elm$html$Html$Attributes$classList(
				_List_fromArray(
					[
						_Utils_Tuple2('textarea', true),
						_Utils_Tuple2('textarea-lc', model.ai),
						_Utils_Tuple2(model.T, true)
					])),
				elm$html$Html$Events$onInput(author$project$Editor$CodeArea$SetText),
				elm$html$Html$Attributes$spellcheck(false),
				A2(
				elm$html$Html$Events$on,
				'scroll',
				A2(
					elm$json$Json$Decode$map,
					author$project$Editor$CodeArea$OnScroll,
					A3(
						elm$json$Json$Decode$map2,
						author$project$Editor$CodeArea$Scroll,
						A2(
							elm$json$Json$Decode$at,
							_List_fromArray(
								['target', 'scrollTop']),
							elm$json$Json$Decode$int),
						A2(
							elm$json$Json$Decode$at,
							_List_fromArray(
								['target', 'scrollLeft']),
							elm$json$Json$Decode$int))))
			]),
		_List_Nil);
};
var author$project$Editor$CodeArea$viewCodeArea = function (model) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$classList(
				_List_fromArray(
					[
						_Utils_Tuple2('container', true),
						_Utils_Tuple2('codearea', true),
						_Utils_Tuple2(model.T, true),
						_Utils_Tuple2(model.T + '-view', true)
					]))
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$div,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('view-container'),
						A2(
						elm$html$Html$Attributes$style,
						'transform',
						'translate(' + (elm$core$String$fromInt(-model.Y.aQ) + ('px, ' + (elm$core$String$fromInt(-model.Y.a9) + 'px)')))),
						A2(elm$html$Html$Attributes$style, 'will-change', 'transform')
					]),
				_List_fromArray(
					[
						A2(author$project$Editor$CodeArea$lazy, author$project$Editor$CodeArea$viewCode, model)
					])),
				author$project$Editor$CodeArea$viewFakeTextArea(model)
			]));
};
var elm_explorations$markdown$Markdown$defaultOptions = {
	aD: elm$core$Maybe$Nothing,
	aJ: elm$core$Maybe$Just(
		{bf: false, bL: false}),
	a2: true,
	a4: false
};
var elm$core$Maybe$isJust = function (maybe) {
	if (!maybe.$) {
		return true;
	} else {
		return false;
	}
};
var elm_explorations$markdown$Markdown$toHtmlWith = _Markdown_toHtml;
var elm_explorations$markdown$Markdown$toHtml = elm_explorations$markdown$Markdown$toHtmlWith(elm_explorations$markdown$Markdown$defaultOptions);
var author$project$Editor$CodeArea$viewPlaceholderArea = function (model) {
	return A2(elm_explorations$markdown$Markdown$toHtml, _List_Nil, model.aj);
};
var elm$core$String$fromFloat = _String_fromNumber;
var author$project$Editor$TextStyle$colorToCss = F2(
	function (property, color) {
		switch (color.$) {
			case 0:
				return '';
			case 1:
				var hex = color.a;
				return property + (hex + ';');
			case 2:
				var r = color.a;
				var g = color.b;
				var b = color.c;
				return property + ('rgb(' + (elm$core$String$fromInt(r) + (', ' + (elm$core$String$fromInt(g) + (',' + (elm$core$String$fromInt(b) + ');'))))));
			default:
				var r = color.a;
				var g = color.b;
				var b = color.c;
				var a = color.d;
				return property + ('rgba(' + (elm$core$String$fromInt(r) + (', ' + (elm$core$String$fromInt(g) + (',' + (elm$core$String$fromInt(b) + (', ' + (elm$core$String$fromFloat(a) + ');'))))))));
		}
	});
var elm$core$String$concat = function (strings) {
	return A2(elm$core$String$join, '', strings);
};
var author$project$Editor$TextStyle$styleToCss = function (_n0) {
	var isBold = _n0.I;
	var isItalic = _n0.J;
	var isUnderline = _n0.V;
	var text = _n0.ab;
	var background = _n0.R;
	return elm$core$String$concat(
		_List_fromArray(
			[
				isBold ? 'font-weight: bold;' : '',
				isItalic ? 'font-style: italic;' : '',
				isUnderline ? 'text-decoration: underline;' : '',
				A2(author$project$Editor$TextStyle$colorToCss, 'color: ', text),
				A2(author$project$Editor$TextStyle$colorToCss, 'background: ', background)
			]));
};
var author$project$Editor$TextStyle$toCssClass = function (_n0) {
	var selectors = _n0.a;
	var style = _n0.b;
	return elm$core$String$isEmpty(selectors) ? '' : (selectors + (' {' + (author$project$Editor$TextStyle$styleToCss(style) + '}')));
};
var author$project$Editor$TextStyle$toCss = A2(
	elm$core$Basics$composeR,
	elm$core$List$map(author$project$Editor$TextStyle$toCssClass),
	elm$core$String$concat);
var elm$core$Tuple$mapFirst = F2(
	function (func, _n0) {
		var x = _n0.a;
		var y = _n0.b;
		return _Utils_Tuple2(
			func(x),
			y);
	});
var author$project$Editor$CodeArea$view = function (model) {
	return A2(
		elm$html$Html$div,
		_List_Nil,
		_List_fromArray(
			[
				A3(
				elm$html$Html$node,
				'style',
				_List_Nil,
				_List_fromArray(
					[
						elm$html$Html$text('.textarea {caret-color: #24292e;}' + '.textarea::selection { background-color: rgba(0,0,0,0.2); }')
					])),
				A3(
				elm$html$Html$node,
				'style',
				_List_Nil,
				elm$core$List$singleton(
					elm$html$Html$text(
						author$project$Editor$TextStyle$toCss(
							A2(
								elm$core$List$map,
								elm$core$Tuple$mapFirst(
									elm$core$Basics$append('.codearea-')),
								elm$core$Dict$toList(model.ak)))))),
				(elm$core$String$isEmpty(model.G) && (!elm$core$String$isEmpty(model.aj))) ? author$project$Editor$CodeArea$viewPlaceholderArea(model) : author$project$Editor$CodeArea$viewCodeArea(model)
			]));
};
var author$project$Editor$Types$ExprArea = function (a) {
	return {$: 2, a: a};
};
var author$project$Editor$Utils$isLangReady = function (model) {
	return A2(
		elm$core$Result$withDefault,
		false,
		A2(
			elm$core$Result$map,
			A2(elm$core$Basics$composeL, elm$core$Basics$not, elm$core$Dict$isEmpty),
			model.n));
};
var elm$html$Html$br = _VirtualDom_node('br');
var author$project$Editor$View$break = A2(
	elm$html$Html$div,
	_List_fromArray(
		[
			A2(elm$html$Html$Attributes$style, 'height', '10px')
		]),
	_List_fromArray(
		[
			A2(elm$html$Html$br, _List_Nil, _List_Nil)
		]));
var elm$core$List$intersperse = F2(
	function (sep, xs) {
		if (!xs.b) {
			return _List_Nil;
		} else {
			var hd = xs.a;
			var tl = xs.b;
			var step = F2(
				function (x, rest) {
					return A2(
						elm$core$List$cons,
						sep,
						A2(elm$core$List$cons, x, rest));
				});
			var spersed = A3(elm$core$List$foldr, step, _List_Nil, tl);
			return A2(elm$core$List$cons, hd, spersed);
		}
	});
var author$project$Editor$View$display = A2(
	elm$core$Basics$composeR,
	elm$core$String$lines,
	A2(
		elm$core$Basics$composeR,
		elm$core$List$map(elm$html$Html$text),
		A2(
			elm$core$Basics$composeR,
			elm$core$List$intersperse(
				A2(elm$html$Html$br, _List_Nil, _List_Nil)),
			elm$html$Html$div(_List_Nil))));
var elm$core$String$replace = F3(
	function (before, after, string) {
		return A2(
			elm$core$String$join,
			after,
			A2(elm$core$String$split, before, string));
	});
var author$project$Lang$Show$showEscapeSymbols = A2(
	elm$core$Basics$composeR,
	A2(elm$core$String$replace, '\n', '\\n'),
	A2(elm$core$String$replace, '\r', '\\r'));
var author$project$Lang$Show$showProblem = function (problem) {
	switch (problem.$) {
		case 0:
			var str = problem.a;
			return 'Expecting \'' + (str + '\'');
		case 1:
			return 'Expecting integer';
		case 2:
			return 'Expecting hex';
		case 3:
			return 'Expecting octal';
		case 4:
			return 'Expecting binary';
		case 5:
			return 'Expecting float';
		case 6:
			return 'Expecting number';
		case 7:
			return 'Expecting variable';
		case 8:
			var str = problem.a;
			return 'Expecting symbol \'' + (author$project$Lang$Show$showEscapeSymbols(str) + '\'');
		case 9:
			var str = problem.a;
			return 'Expecting keyword \'' + (str + '\'');
		case 10:
			return 'Expecting end';
		case 11:
			return 'Unexpected char';
		case 12:
			var str = problem.a;
			return 'Problem \'' + (str + '\'');
		default:
			return 'Bad repeat';
	}
};
var author$project$Lang$Show$showDeadEnd = function (de) {
	return author$project$Lang$Show$showProblem(de.bC);
};
var author$project$Lang$Show$showSemanticsError = function (err) {
	switch (err.$) {
		case 0:
			return 'Impossible';
		case 1:
			var ch = err.a;
			return 'Duplicate combinator \'' + (ch + '\'');
		case 2:
			var ch = err.a;
			return 'Undefined combinator \'' + (ch + '\'');
		case 3:
			var ch = err.a;
			return 'Duplicate argument \'' + (ch + '\'');
		default:
			var ch = err.a;
			return 'Undefined variable \'' + (ch + '\'');
	}
};
var author$project$Lang$Show$showError = function (err) {
	if (!err.$) {
		var perr = err.a;
		return A2(
			elm$core$String$join,
			'\n',
			A2(elm$core$List$map, author$project$Lang$Show$showDeadEnd, perr));
	} else {
		var verr = err.b;
		return author$project$Lang$Show$showSemanticsError(verr);
	}
};
var author$project$Editor$View$errors = function (model) {
	var _n0 = model.n;
	if (!_n0.$) {
		var _n1 = model.l;
		if (!_n1.$) {
			return author$project$Editor$View$display('');
		} else {
			var err = _n1.a;
			return author$project$Editor$View$display(
				author$project$Lang$Show$showError(err));
		}
	} else {
		var err = _n0.a;
		return author$project$Editor$View$display(
			author$project$Lang$Show$showError(err));
	}
};
var author$project$Editor$Types$Idle = {$: 0};
var elm$virtual_dom$VirtualDom$Custom = function (a) {
	return {$: 3, a: a};
};
var elm$html$Html$Events$custom = F2(
	function (event, decoder) {
		return A2(
			elm$virtual_dom$VirtualDom$on,
			event,
			elm$virtual_dom$VirtualDom$Custom(decoder));
	});
var author$project$Misc$disableContextMenu = function (msg) {
	return A2(
		elm$html$Html$Events$custom,
		'contextmenu',
		A2(
			elm$json$Json$Decode$map,
			elm$core$Basics$always(
				{bu: msg, bB: true, bI: true}),
			elm$json$Json$Decode$succeed(msg)));
};
var author$project$Editor$View$horzDiv = elm$html$Html$div(
	_List_fromArray(
		[
			A2(elm$html$Html$Attributes$style, 'display', 'flex'),
			A2(elm$html$Html$Attributes$style, 'width', '100%'),
			A2(elm$html$Html$Attributes$style, 'display', 'table'),
			author$project$Misc$disableContextMenu(author$project$Editor$Types$Idle)
		]));
var author$project$Editor$View$leftDiv = elm$html$Html$div(
	_List_fromArray(
		[
			A2(elm$html$Html$Attributes$style, 'float', 'left')
		]));
var elm$html$Html$a = _VirtualDom_node('a');
var elm$html$Html$Attributes$href = function (url) {
	return A2(
		elm$html$Html$Attributes$stringProperty,
		'href',
		_VirtualDom_noJavaScriptUri(url));
};
var author$project$Editor$View$playButton = function (model) {
	return A2(
		elm$html$Html$a,
		_List_fromArray(
			[
				elm$html$Html$Attributes$href('#game')
			]),
		_List_fromArray(
			[
				elm$html$Html$text('Play Combinatris')
			]));
};
var elm$html$Html$button = _VirtualDom_node('button');
var elm$html$Html$Attributes$disabled = elm$html$Html$Attributes$boolProperty('disabled');
var elm$html$Html$Events$onClick = function (msg) {
	return A2(
		elm$html$Html$Events$on,
		'click',
		elm$json$Json$Decode$succeed(msg));
};
var author$project$Editor$View$prependButton = function (model) {
	return A2(
		elm$html$Html$button,
		_List_fromArray(
			[
				elm$html$Html$Events$onClick(author$project$Editor$Types$RandomTerm),
				elm$html$Html$Attributes$class('bttn-bordered bttn-md bttn-success'),
				elm$html$Html$Attributes$disabled(
				A3(elm$core$Basics$composeL, elm$core$Basics$not, author$project$Editor$Utils$isLangStyled, model)),
				A2(elm$html$Html$Attributes$style, 'marginBottom', '10px')
			]),
		A2(
			elm$core$List$map,
			elm$html$Html$map(
				elm$core$Basics$always(author$project$Editor$Types$Idle)),
			A2(
				elm$core$Maybe$withDefault,
				_List_fromArray(
					[
						elm$html$Html$text('Random')
					]),
				A2(
					elm$core$Maybe$map,
					A2(
						elm$core$Basics$composeL,
						author$project$Editor$CodeArea$viewString(model.B),
						author$project$Lang$Show$showTerm),
					model.ah))));
};
var author$project$Editor$Types$Left = 1;
var author$project$Editor$Types$Normal = 0;
var author$project$Editor$Types$ReduceExpr = function (a) {
	return {$: 3, a: a};
};
var author$project$Editor$View$map = elm$core$Result$map;
var author$project$Editor$View$reduceButton = function (model) {
	var left = A2(
		elm$core$Result$withDefault,
		false,
		A2(
			author$project$Editor$View$map,
			author$project$Lang$Game$canReduceLeft(model.k.at),
			model.l));
	return A2(
		elm$html$Html$button,
		_List_fromArray(
			[
				elm$html$Html$Events$onClick(
				left ? author$project$Editor$Types$ReduceExpr(1) : author$project$Editor$Types$ReduceExpr(0)),
				elm$html$Html$Attributes$class(
				'bttn-simple bttn-md ' + (left ? 'bttn-success' : 'bttn-primary')),
				elm$html$Html$Attributes$disabled(
				elm$core$List$length(model.k.at) <= 0),
				A2(elm$html$Html$Attributes$style, 'marginBottom', '10px')
			]),
		_List_fromArray(
			[
				elm$html$Html$text('Reduce')
			]));
};
var author$project$Editor$View$rightDiv = elm$html$Html$div(
	_List_fromArray(
		[
			A2(elm$html$Html$Attributes$style, 'float', 'right')
		]));
var author$project$Editor$View$slotButton = F2(
	function (model, slot) {
		return A2(
			elm$html$Html$button,
			_List_fromArray(
				[
					elm$html$Html$Events$onClick(
					author$project$Editor$Types$ChangeSlot(slot)),
					elm$html$Html$Attributes$class(
					(_Utils_eq(slot, model._) ? 'bttn-simple' : 'bttn-bordered') + ' bttn-md bttn-primary'),
					A2(elm$html$Html$Attributes$style, 'marginRight', '10px'),
					A2(elm$html$Html$Attributes$style, 'marginBottom', '10px')
				]),
			_List_fromArray(
				[
					elm$html$Html$text(slot)
				]));
	});
var elm$html$Html$h2 = _VirtualDom_node('h2');
var author$project$Editor$View$view = function (model) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				A2(elm$html$Html$Attributes$style, 'font-family', 'monospace')
			]),
		A3(
			author$project$Misc$appendIf,
			author$project$Editor$Utils$isLangStyled(model),
			_List_fromArray(
				[
					author$project$Editor$View$playButton(model)
				]),
			A3(
				author$project$Misc$appendIf,
				true,
				_List_fromArray(
					[
						author$project$Editor$View$errors(model),
						author$project$Editor$View$break,
						author$project$Editor$View$horzDiv(
						_List_fromArray(
							[
								author$project$Editor$View$leftDiv(
								_List_fromArray(
									[
										author$project$Editor$View$prependButton(model)
									])),
								author$project$Editor$View$rightDiv(
								_List_fromArray(
									[
										author$project$Editor$View$reduceButton(model)
									]))
							])),
						author$project$Editor$View$break
					]),
				A3(
					author$project$Misc$appendIf,
					author$project$Editor$Utils$isLangReady(model),
					_List_fromArray(
						[
							A2(
							elm$html$Html$map,
							author$project$Editor$Types$ExprArea,
							author$project$Editor$CodeArea$view(model.k)),
							author$project$Editor$View$break
						]),
					_List_fromArray(
						[
							A2(
							elm$html$Html$h2,
							_List_Nil,
							_List_fromArray(
								[
									elm$html$Html$text('Combinatris in Elm')
								])),
							author$project$Editor$View$break,
							author$project$Editor$View$horzDiv(
							A2(
								elm$core$List$map,
								author$project$Editor$View$slotButton(model),
								author$project$Editor$Data$slots)),
							author$project$Editor$View$break,
							A2(
							elm$html$Html$map,
							author$project$Editor$Types$LangArea,
							author$project$Editor$CodeArea$view(model.B)),
							author$project$Editor$View$break
						])))));
};
var author$project$Game$View$break = A2(
	elm$html$Html$div,
	_List_fromArray(
		[
			A2(elm$html$Html$Attributes$style, 'height', '10px')
		]),
	_List_fromArray(
		[
			A2(elm$html$Html$br, _List_Nil, _List_Nil)
		]));
var author$project$Game$View$horzDiv = elm$html$Html$div(
	_List_fromArray(
		[
			A2(elm$html$Html$Attributes$style, 'display', 'flex'),
			A2(elm$html$Html$Attributes$style, 'width', '100%'),
			A2(elm$html$Html$Attributes$style, 'display', 'table'),
			A2(elm$html$Html$Attributes$style, 'white-space', 'pre')
		]));
var elm$html$Html$Attributes$id = elm$html$Html$Attributes$stringProperty('id');
var author$project$Game$View$showControlButton = F2(
	function (txt, msg) {
		return A2(
			elm$html$Html$button,
			_List_fromArray(
				[
					elm$html$Html$Attributes$class('bttn-bordered bttn-lg bttn-primary'),
					elm$html$Html$Events$onClick(msg),
					A2(elm$html$Html$Attributes$style, 'width', '1.5cm'),
					A2(elm$html$Html$Attributes$style, 'height', '1.5cm'),
					A2(elm$html$Html$Attributes$style, 'font-size', '1.0cm'),
					author$project$Misc$disableContextMenu(author$project$Game$Types$Idle),
					elm$html$Html$Attributes$id(txt)
				]),
			_List_fromArray(
				[
					elm$html$Html$text(txt)
				]));
	});
var elm$html$Html$table = _VirtualDom_node('table');
var elm$html$Html$td = _VirtualDom_node('td');
var elm$html$Html$tr = _VirtualDom_node('tr');
var author$project$Game$View$showControls = function (model) {
	return A2(
		elm$html$Html$table,
		_List_fromArray(
			[
				A2(elm$html$Html$Attributes$style, 'display', 'block'),
				A2(elm$html$Html$Attributes$style, 'margin', '0 auto 0'),
				A2(elm$html$Html$Attributes$style, 'position', 'fixed'),
				A2(elm$html$Html$Attributes$style, 'right', '10px'),
				A2(elm$html$Html$Attributes$style, 'bottom', '10px'),
				elm$html$Html$Attributes$class('no-user-select')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$tr,
				_List_Nil,
				_List_fromArray(
					[
						A2(elm$html$Html$td, _List_Nil, _List_Nil),
						A2(
						elm$html$Html$td,
						_List_fromArray(
							[
								A2(elm$html$Html$Attributes$style, 'padding', '10px 0')
							]),
						_List_fromArray(
							[
								A2(author$project$Game$View$showControlButton, '⇧', author$project$Game$Types$Up)
							]))
					])),
				A2(
				elm$html$Html$tr,
				_List_Nil,
				_List_fromArray(
					[
						A2(
						elm$html$Html$td,
						_List_fromArray(
							[
								A2(elm$html$Html$Attributes$style, 'padding', '0 10px')
							]),
						_List_fromArray(
							[
								A2(author$project$Game$View$showControlButton, '⇨', author$project$Game$Types$Throw)
							])),
						A2(
						elm$html$Html$td,
						_List_Nil,
						_List_fromArray(
							[
								A2(author$project$Game$View$showControlButton, '⇩', author$project$Game$Types$Down)
							]))
					]))
			]));
};
var author$project$Game$View$showGameButton = function (state) {
	var _n0 = function () {
		switch (state) {
			case 0:
				return _Utils_Tuple3('Pause', author$project$Game$Types$Pause, 'bttn-danger');
			case 1:
				return _Utils_Tuple3('Resume', author$project$Game$Types$Resume, 'bttn-success');
			default:
				return _Utils_Tuple3('Restart', author$project$Game$Types$Start, 'bttn-success');
		}
	}();
	var txt = _n0.a;
	var msg = _n0.b;
	var bttn = _n0.c;
	return A2(
		elm$html$Html$button,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('bttn-simple bttn-md ' + bttn),
				A2(elm$html$Html$Attributes$style, 'margin', '0 auto 0'),
				A2(elm$html$Html$Attributes$style, 'position', 'fixed'),
				A2(elm$html$Html$Attributes$style, 'left', '10px'),
				A2(elm$html$Html$Attributes$style, 'bottom', '10px'),
				elm$html$Html$Events$onClick(msg),
				author$project$Misc$disableContextMenu(author$project$Game$Types$Idle),
				elm$html$Html$Attributes$id(txt)
			]),
		_List_fromArray(
			[
				elm$html$Html$text(txt)
			]));
};
var author$project$Game$View$coloredText = F2(
	function (clr, txt) {
		return A2(
			elm$html$Html$div,
			_List_fromArray(
				[
					A2(elm$html$Html$Attributes$style, 'color', clr)
				]),
			_List_fromArray(
				[
					elm$html$Html$text(txt)
				]));
	});
var author$project$Game$View$fontSize = function (model) {
	return 'calc(100vw / ' + (elm$core$String$fromFloat(model.i * 1.1) + ')');
};
var author$project$Game$View$padRight = F2(
	function (n, html) {
		return _Utils_ap(
			html,
			A2(
				elm$core$List$repeat,
				n - elm$core$List$length(html),
				elm$html$Html$text(' ')));
	});
var elm$core$Bitwise$shiftRightBy = _Bitwise_shiftRightBy;
var elm$core$String$repeatHelp = F3(
	function (n, chunk, result) {
		return (n <= 0) ? result : A3(
			elm$core$String$repeatHelp,
			n >> 1,
			_Utils_ap(chunk, chunk),
			(!(n & 1)) ? result : _Utils_ap(result, chunk));
	});
var elm$core$String$repeat = F2(
	function (n, chunk) {
		return A3(elm$core$String$repeatHelp, n, chunk, '');
	});
var elm$core$String$padRight = F3(
	function (n, _char, string) {
		return _Utils_ap(
			string,
			A2(
				elm$core$String$repeat,
				n - elm$core$String$length(string),
				elm$core$String$fromChar(_char)));
	});
var elm$html$Html$Attributes$hidden = elm$html$Html$Attributes$boolProperty('hidden');
var author$project$Game$View$showInfo = function (model) {
	var pad = model.i - 7;
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('centered')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$table,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('centered-table'),
						A2(
						elm$html$Html$Attributes$style,
						'font-size',
						author$project$Game$View$fontSize(model)),
						A2(elm$html$Html$Attributes$style, 'white-space', 'pre')
					]),
				_List_fromArray(
					[
						A2(
						elm$html$Html$tr,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								elm$html$Html$td,
								_List_Nil,
								_List_fromArray(
									[
										A2(author$project$Game$View$coloredText, '#bdc3c7', 'Now:   ')
									])),
								A2(
								elm$html$Html$td,
								_List_Nil,
								A2(
									author$project$Game$View$padRight,
									pad,
									A2(
										elm$core$Maybe$withDefault,
										_List_Nil,
										A2(
											elm$core$Maybe$map,
											function ($) {
												return $.bp;
											},
											model.s))))
							])),
						A2(
						elm$html$Html$tr,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								elm$html$Html$td,
								_List_Nil,
								_List_fromArray(
									[
										A2(author$project$Game$View$coloredText, '#bdc3c7', 'Next:  ')
									])),
								A2(
								elm$html$Html$td,
								_List_Nil,
								A2(
									author$project$Game$View$padRight,
									pad,
									A2(
										elm$core$Maybe$withDefault,
										_List_Nil,
										A2(
											elm$core$Maybe$map,
											function ($) {
												return $.bp;
											},
											model.aq))))
							])),
						A2(
						elm$html$Html$tr,
						_List_Nil,
						_List_fromArray(
							[
								A2(
								elm$html$Html$td,
								_List_Nil,
								_List_fromArray(
									[
										A2(author$project$Game$View$coloredText, '#bdc3c7', 'Score: ')
									])),
								A2(
								elm$html$Html$td,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										author$project$Game$View$coloredText,
										'#3993d0',
										A3(
											elm$core$String$padRight,
											pad,
											' ',
											elm$core$String$fromInt(model.X)))
									]))
							])),
						A2(
						elm$html$Html$tr,
						_List_fromArray(
							[
								elm$html$Html$Attributes$hidden(1 === model.aU)
							]),
						_List_fromArray(
							[
								A2(
								elm$html$Html$td,
								_List_Nil,
								_List_fromArray(
									[
										A2(author$project$Game$View$coloredText, '#bdc3c7', 'Hint:  ')
									])),
								A2(
								elm$html$Html$td,
								_List_Nil,
								_List_fromArray(
									[
										A2(
										author$project$Game$View$coloredText,
										'#85144b',
										A3(elm$core$String$padRight, pad, ' ', 'Try landscape mode!'))
									]))
							]))
					]))
			]));
};
var author$project$Game$View$showRow = F3(
	function (model, y, row) {
		var makeSpaces = function (n) {
			return A2(
				author$project$Game$View$viewString,
				model.ac,
				A2(elm$core$String$repeat, n, '_'));
		};
		var spaces = function () {
			var _n0 = model.s;
			if (!_n0.$) {
				var curr = _n0.a;
				if (_Utils_eq(y, curr.x)) {
					var spaces2 = makeSpaces(((model.i - row.i) - curr.P) - curr.i);
					var spaces1 = makeSpaces(curr.P);
					return _Utils_ap(
						spaces1,
						_Utils_ap(curr.aM, spaces2));
				} else {
					return makeSpaces(model.i - row.i);
				}
			} else {
				return makeSpaces(model.i - row.i);
			}
		}();
		var html = _Utils_ap(spaces, row.aM);
		return A2(
			elm$html$Html$tr,
			_List_Nil,
			A2(
				elm$core$List$map,
				A2(
					elm$core$Basics$composeL,
					elm$html$Html$td(_List_Nil),
					elm$core$List$singleton),
				A2(
					elm$core$List$drop,
					elm$core$List$length(html) - model.i,
					html)));
	});
var author$project$Game$View$showTable = function (model) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				elm$html$Html$Attributes$class('centered')
			]),
		_List_fromArray(
			[
				A2(
				elm$html$Html$table,
				_List_fromArray(
					[
						elm$html$Html$Attributes$class('centered-table'),
						A2(
						elm$html$Html$Attributes$style,
						'font-size',
						author$project$Game$View$fontSize(model)),
						A2(elm$html$Html$Attributes$style, 'white-space', 'pre')
					]),
				A2(
					elm$core$List$indexedMap,
					author$project$Game$View$showRow(model),
					elm$core$Array$toList(model.m)))
			]));
};
var author$project$Game$View$view = function (model) {
	return A2(
		elm$html$Html$div,
		_List_fromArray(
			[
				A2(elm$html$Html$Attributes$style, 'font-family', 'monospace')
			]),
		_List_fromArray(
			[
				author$project$Game$View$break,
				author$project$Game$View$horzDiv(
				_List_fromArray(
					[
						author$project$Game$View$showTable(model)
					])),
				author$project$Game$View$break,
				author$project$Game$View$horzDiv(
				_List_fromArray(
					[
						author$project$Game$View$showInfo(model)
					])),
				author$project$Game$View$break,
				author$project$Game$View$showGameButton(model.N),
				(!model.N) ? author$project$Game$View$showControls(model) : A2(elm$html$Html$div, _List_Nil, _List_Nil),
				A2(
				elm$html$Html$map,
				elm$core$Basics$always(author$project$Game$Types$Idle),
				author$project$Editor$CodeArea$view(model.ac))
			]));
};
var author$project$Main$view = function (_n0) {
	var scope = _n0.E;
	var editor = _n0.y;
	var game = _n0.U;
	return {
		be: _List_fromArray(
			[
				function () {
				if (!scope) {
					return A2(
						elm$html$Html$map,
						author$project$Main$EditorMsg,
						author$project$Editor$View$view(editor));
				} else {
					return A2(
						elm$html$Html$map,
						author$project$Main$GameMsg,
						author$project$Game$View$view(game));
				}
			}()
			]),
		bM: 'Combinatris in Elm'
	};
};
var elm$browser$Browser$application = _Browser_application;
var author$project$Main$main = elm$browser$Browser$application(
	{bq: author$project$Main$init, by: author$project$Main$UrlChanged, bz: author$project$Main$UrlRequest, bK: author$project$Main$subscribe, bN: author$project$Main$update, bP: author$project$Main$view});
_Platform_export({'Main':{'init':author$project$Main$main(
	elm$json$Json$Decode$succeed(0))(0)}});}(this));