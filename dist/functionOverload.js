function overload() {
    const args = Array.from(arguments);
    let functions = [];
    
    for (let i = 0; i !== args.length; i++) {
        if (typeof(args[i]) === 'function') {
            functions[args[i].length] = args[i];
        } else if (args[i] instanceof Array) {
            const argArr = args[i];
            
            if (argArr[0] instanceof Object && argArr[1] instanceof Function) {
                functions[args[i][1].length] = args[i];
            }
        } else { 
            continue;
        }
    }
    
    return function() {
        const callElement = functions[arguments.length];
        
        if (callElement instanceof Function) {
            return functions[arguments.length].apply(this, arguments);
            
        } else if (callElement instanceof Array && callElement.length === 2) {
            const typesOfCallElement = Object.values(callElement[0]);
            let mathingTypes = [];

            if (!(callElement[0] instanceof Object)) {
                throw new SyntaxError('First argument of array must be a type Object.')
            }

            if (!(callElement[1] instanceof Function)) {
                throw new SyntaxError('Second argument of array must be a type Function.')
            }

            for (let i = 0; i !== Array.from(arguments).length; i++) {

                if (typeof typesOfCallElement[i] !== 'string') {
                    mathingTypes = ['0'];
                    throw new SyntaxError('Type must be a string!')
                }

                mathingTypes = [...mathingTypes, typeof(Array.from(arguments)[i]) === typesOfCallElement[i].toLowerCase() ?
                    '1' : '0'
                ]
            }
            
            const isMatchingTypes = mathingTypes.find((i) => i === "0");

            if (isMatchingTypes === undefined) {
                return functions[arguments.length][1].apply(this, arguments);
            } else {
                throw new SyntaxError(`You have a mistake in your arguments type!`);
            }
        } else {
            throw new SyntaxError('Argument must be type Function or Array of Object with arguments type and function with that arguments.');
        }
    };
}
