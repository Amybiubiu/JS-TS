# TypeScirpt Syntax

## Basic Types

```ts
// Bool
let isDone: boolean = false;
// Number
let hex: number = 0xf00d;
//String
let sentence: string = `Hello,show the ${ isDone },
and wrap the text`;
//Array
let list: number[] = [2, 0, 0];
let newList: Array<boolean> = [false, true]; //generic
// Tuple
let x: [string, number] = ['Sara', 8];  // x[0] == 'Sara'
// Enum
enum Color {Red = 1, Green = 2, Blue = 4}
let c: Color = Color.Green;   // regard green as a member of Color type
// Any
let notSure: any = 4;
notSure = 'maybe a string';
notSure = 2;   //It is different with type inference.
// Void

// Null and Undefined

// Never -> error handle

// Object
```

## Interfaces

```ts
interface Point {
    readonly x: number;
    readonly y: number;
}
interface SquareConfig {
    color?: string;
    width?: number;
}
```