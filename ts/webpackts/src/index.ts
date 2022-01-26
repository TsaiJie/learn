import {sum} from './sum';

let name: string = `Gene`;
let age: number = 37;
let sentence: string = `Hello, my name is ${name}.

I'll be ${age + 1} years old next month.`;

console.log(sentence);

// 数组
let list: number[] = [1, 2, 3];
let list2: Array<number> = [1, 2, 3];
console.log(list, list2);

// 元祖
let x: [string, number];
x = ['hello', 11];

let someValue: any = 'this is a string';
let strLength: number = (<string>someValue).length;
strLength = (someValue as string).length;
