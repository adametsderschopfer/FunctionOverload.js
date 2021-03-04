function overload() 
{
    function arrayTypeChecker(arr) 
    {
        if (!(arr[0] instanceof Object)) 
        {
            throw new SyntaxError('First argument of array must be a type Object.');
        }

        if (!(arr[1] instanceof Function)) 
        {
            throw new SyntaxError('Second argument of array must be a type Function.');
        }
        
        return true
    }

    const args = Array.from(arguments);
    let functions = [];
    
    if (!args.length) 
    {
        throw new SyntaxError('Overload function must take at least one argument');
    }
    
    for (let i = 0; i !== args.length; i++) 
    {
        if (typeof(args[i]) === 'function') 
        {
            functions[args[i].length] = args[i];
        } else if (args[i] instanceof Array) 
        {
            const argArray = args[i];

            if (arrayTypeChecker(argArray)) 
            {
                functions[args[i][1].length] = args[i];
            }
        } else 
        { 
            continue;
        }
    }
    
    if (!functions.length) 
    {
        throw new SyntaxError('None of the input parameters were specified correctly, the function must accept a function or an array where the first argument is an object with the typing of the input parameter, and the second is the typed function');
    }
    
    return function() 
    {
        if (!arguments.length)
        {
            return new SyntaxError('Arguments must be specified');
        }
    
        const callElement = functions[arguments.length];
        
        if (callElement instanceof Function) 
        {
            return functions[arguments.length].apply(this, arguments);
        } else if (callElement instanceof Array && callElement.length === 2) 
        {
            const typesOfCallElement = Object.values(callElement[0]);
            if (arrayTypeChecker(callElement)) 
            {
                for (let i = 0; i !== Array.from(arguments).length; i++) 
                {
                    if (typeof typesOfCallElement[i] !== 'string') 
                    {
                        throw new SyntaxError('Type must be a string!');
                    }

                    if (typeof(Array.from(arguments)[i]) !== typesOfCallElement[i].toLowerCase())
                    {
                        throw new SyntaxError(`You have a mistake in your arguments type!`);
                    }
                }

                return functions[arguments.length][1].apply(this, arguments);
            }
        } else 
        {
            throw new SyntaxError('Argument must be type Function or Array of Object with arguments type and function with that arguments.');
        }
    };
}
