type TOverloadArguments = Function

function overload() {
	const args: Array<TOverloadArguments> = Array.from<TOverloadArguments>(arguments);
	let functions: Array<Function> = [];

	for (let i = 0; i !== args.length; i++) {
		if (typeof (args[i]) === 'function') {
			functions[args[i].length] = args[i]; // => the {args[i].length} construct returns the number of accepted function arguments
		}
	}

	return function () {
		functions[arguments.length].apply(this, arguments)
	}
}

const getPosition = overload(
// @ts-ignore
	
	function (x, y) {
		console.log(x, y)
	}
	,
	function (str, num, str2) {
		console.log(str, num, str2)
	}
);

getPosition(1, 2, 3)
