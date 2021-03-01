# FunctionOverload.js

The 'overload' function accepts 'x' arguments of type array, at index 0, we must have an object with the typing of each argument, and at index 1, there is the typed function itself.
It is possible to use without typing, by simple separation according to the length of the arguments

**Since Javascript is an interpreted language, the implementation of such things is, in principle, impossible, so you can get by with this function.**
**But using this approach suffers greatly from performance, so it is worth using such things in Javascript with caution and extreme necessity.**

## Example 
```
    const getSomethingValue = overload(
        [
            {x: Number, y: Number},
            function(x, y) { return [x, y] }       // Profit. We got a function with type checking! 
        ],
        
        function(x, y, z) { return [x, y, z] } // Function without type checking!
    );
```

Next, we get a function that we can use with a different number of arguments and different types.
```
 getSomethingValue(1, 2) // => [1, 2] <= In this case, we check for types
 getSomethingValue(1, 2, 3) // => [1, 2, 3]
```

If we do not have several functions with the same number of arguments, but different types, then an error will appear about the absence of a function with such types.

```
 getSomethingValue(1, '2') // => You have a mistake in your arguments type!
```

In this case, the error occurred due to the fact that this function takes the Number type as its second argument.
