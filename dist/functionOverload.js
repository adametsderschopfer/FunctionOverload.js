export function overload() {
    const args = Array.from(arguments);
    let functions = [];
    for (let i = 0; i !== args.length; i++) {
        if (typeof(args[i]) === 'function') {
            functions[args[i].length] = args[i];
        }
        if (args[i] instanceof Array) {
            const argArr = args[i];
            if (argArr[0] instanceof Object && argArr[1] instanceof Function) {
                functions[args[i][1].length] = args[i];
            }
        }
    }
    return function() {
        const callElement = functions[arguments.length];
        if (callElement instanceof Function) {
            return functions[arguments.length].apply(this, arguments);
        } else if (callElement instanceof Array) {
            const typesOfCallElement = Object.values(callElement[0]);
            let call = false;
            let mathingTypes = [];

            for (let i = 0; i !== Array.from(arguments).length; i++) {

                if (typeof typesOfCallElement[i] !== 'string') {
                    console.log(new SyntaxError('Type must be a string!'));
                    mathingTypes = ['0'];
                    break;
                }

                mathingTypes = [...mathingTypes, typeof(Array.from(arguments)[i]) === typesOfCallElement[i].toLowerCase() ?
                    '1' : '0'
                ]
            }

            const isMatchingTypes = mathingTypes.find((i) => i === "0");

            if (isMatchingTypes === undefined) {
                return functions[arguments.length][1].apply(this, arguments);
            } else {
                console.error(SyntaxError(`You have a mistake in your arguments type!`));
            }
        }
    };
}
