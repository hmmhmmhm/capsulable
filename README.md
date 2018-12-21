## Capsulable

[![Build Status](https://travis-ci.org/hmmhmmhm/capsulable.svg?branch=master)](https://travis-ci.org/hmmhmmhm/capsulable)

```
Pure JavaScript class encapsulation implementation module
```

<img src="https://image.flaticon.com/icons/svg/822/822143.svg" alt="icon" width="150"/>

Encapsulated modules help you use the concept of access limiting in JavaScript classes. Implement the concepts of encapsulation and concealment through the concept of closure variables.


[![한국어 문서는 요기로](https://github.com/hmmhmmhm/capsulable/blob/master/README-KR.md)]()


## Installation

```
npm i capsulable --save
```

--------------------------------------

## Why do I need this module?
The concept of the default variable in JavaScript contains the concept of a prvate and protected variable expressed in _ and __, but does not prevent other classes from reading that variable. In addition, for protected concepts, the concept of post-inheritance access restriction is still unclear. Class that require the hiding of internal variables need a clearer concept of access limiting the class variables.

## Can't I just make closure or symbol every time?

Of course it doesn't matter. However, if you want to create a different private variable space for each class instance (`which is not accessible from outside`), want to create a different protected variable space for each instance even after inheritance, or create a protected static variable space that is accessible only between certain packages each time, it is very annoying and can cause errors. Capsulable provides secure hidden and extensibility, and the concept of Protected and Protected Static variables between inheritance classes and packages.

--------------------------------------

## How to define encapsulated classes

Capable shares the data field through the `constructor` function of `class`. (This means that the Capable is ultimately always composed of child classes.) Classes that want to be encapsulated must inherit the data fields from the Coonstructr through the Capsulable in advance. Examples of grammar are marked as ES5, but can be implemented using ES6 via the Babel.

### Example of class definition

```js
// A.js
const Capsulable = require('capsulable')
const Field = Capsulable()

class A {
    constructor(_field){
        // Configure data fields.
        Field(this, _field)

        // The code below provides access to
        // the data fields when creating
        // functions within the class.
        Field(this).private
        Field(this).protected
        Field(this).protectedStatic
    }
}

module.exports = A
```


### Example of class encapsulation
```js
// index.js
const Capsulable = require('./capsulable')
const A = require('./A')

// Insert a class prototype in Capsulable,
// the encapsulated class is returned.
const SharedA = Capsulable(A)

// Can create instances through encapsulated classes.
let sharedA = new SharedA()
```
--------------------------------------


## Field Variable Approach
```js
Field(this).private
Field(this).protected
Field(this).protectedStatic
```
Capsulable modules generate what is called a data field for each class, which is available in the form of `private`, `protected`, and `protectedStatic` variables (`getter`). Data fields are created for each instance of the class, so when you access a data field, the instance must be given an argument in the field.


### Private Fields Usage
```js
Field(this).private.set(key, value) // => Boolean
Field(this).private.exist(key)  // => Boolean
Field(this).private.get(key) // => Object
Field(this).private.getAll() // => Object
Field(this).private.remove(key) // => Boolean
Field(this).private.removeAll() // => Boolean
```
Private fields have isolated spaces for each instance and are blocked from accessing other instances. If the developer does not write a code within the same class that exposes the 'field' to another instance, the hidden nature of the variable will be maintained.


### Protected Fields Usage
```js
Field(this).protected.set(className, key, value) // => Boolean
Field(this).protected.exist(className, key)  // => Boolean
Field(this).protected.get(className, key) // => Object
Field(this).protected.getAll(className) // => Object
Field(this).protected.remove(className, key) // => Boolean
Field(this).protected.removeAll(className) // => Boolean
```
Protected field has a isolated space for each instance and must provide the className you want to access as the first factor when using the function. The Protected field is suitable for data operations that must be shared only between the parent class and the child class (and the same package) when class inheritance occurs.


### Protected Static Fields Usage
```js
Field(this).protectedStatic.set(className, key, value) // => Boolean
Field(this).protectedStatic.exist(className, key)  // => Boolean
Field(this).protectedStatic.get(className, key) // => Object
Field(this).protectedStatic.getAll(className) // => Object
Field(this).protectedStatic.remove(className, key) // => Boolean
Field(this).protectedStatic.removeAll(className) // => Boolean
```
Protected Static field has a shared space with each instance and must provide the className you want to access as the first factor when using the function. The Protected Static field is suitable for data operations in which both parent and child classes operate the same data while all class instances share the same data.

--------------------------------------

## How to define encapsulated derived classes

If you want the parent and child classes to share data fields in the form of `Protected` and `ProtectedStatic` when you create the derived classes, you can implement them in the following ways: (The `Private` data field will not be shared even if you proceed.)

### Definition of derived classes
```js
// B.js
const Capsulable = require('capsulable')
const A = require('./A')

class B extends A {
    constructor(_field){
        // Derived classes must pass field objects
        // received through the constructor to the
        // parent class through the super keyword.
        super(_field)

        // Configure data fields.
        Field(this, _field)
    }
}

module.exports = B
```


### Derived class encapsulation
```js
// index.js
const Capsulable = require('./capsulable')
const B = require('./B')

// Insert a class prototype in Capsulable,
// the encapsulated class is returned.
const SharedB = Capsulable(B)

// Can create instances through encapsulated classes.
let sharedB = new SharedB()
```
--------------------------------------


## Derivation of classes already encapsulated

If you already encapsulate an original class as a Capable and want to get that class derived from another class again, you can implement this using the following method:

```js
// C.js
const Capsulable = require('./capsulable')
const B = require('./B')
const SharedB = Capsulable(B)

class C extends SharedB{
    constructor(inherit){
        // In Parent Class Capsulable,
        // accept the data field in reverse.
        let hook = {}
        super(hook)

        // Configure data fields.
        Field(this, hook.field)

        // In order to be able to be derived again,
        // the field creation object is copied when the class is derived.
        if(inherit) Capsulable(hook, inherit)
    }
}

module.exports = C

// index.js
const Capsulable = require('./capsulable')
const C = require('./C')

// Insert a class prototype in Capsulable,
// the encapsulated class is returned.
const SharedC = Capsulable(C)

// Can create instances through encapsulated classes.
let sharedC = new SharedC()
```
--------------------------------------


## How to Create Package Space

Capsulable  has a very small implementation of the Java Package concept. If you encapsulate multiple classes at once, the instances of those classes automatically share the `Protected` data field and the `Protected Static` data field.


#### Caution: the different class prototypes registered in one package cannot have overlapping names.
```js
// index.js
const A = require('./A')
const B = require('./B')
const C = require('./C')

// Can deliver class prototypes in a sequence of
// factors on a Capsulable. It will be consists of one package.
let packages = Capsulable([A, B, C])

// You can access the encapsulated
// class prototype through the packages.*
let packA = new packages.A()
let packB = new packages.B()
let packC = new packages.C()
```


### Load classes after package creation
```js
// index.js
const A = require('./A')
const B = require('./B')
const C = require('./C')
const D = require('./A')

// Can deliver class prototypes in a sequence of
// factors on a Capsulable. It will be consists of one package.
let packages = Capsulable([A, B, C])

// packages._load function allows you to add the
// desired class prototype to the package even
// after you configure the package space.
packages._load(D)

// You can access the encapsulated
// class prototype through the packages.*
let packD = new packages.D()
```

### Unload class since package creation
```js
packages._load(D)
let packD = new packages.D()

// package._unload function lets you
// delete the class prototype included
// in the package from the package.
packages._unload(D)

// If a class instance is already
// configured with a class circle
// added to the package, it does not affect that instance.
```
--------------------------------------

## Worklist

- [x] Implementing Private Variables
- [x] Implement Protected Variables
- [x] Implementing a Protected Static variable
- [x] Implementing a step-by-step initialization process for each variable
- [x] Implement Integrated Data Field
- [x] Implement transparent data field sharing based on inheritance
- [x] Implementing Protected Data Sharing between Packages
- [x] Implement Private Variable Factor Shortening with Helper
- [x] Add and re-encapsulate inheritance classes after encapsulation
- [x] Implement test units
- [x] Implement complete exclusion of dependencies by modularizing asset
- [ ] Implementing the constructor variable variable factor of the encapsulated class
- [ ] Implementing derivative class sharing with constructor variable of encapsulated class
- [ ] Implement final keyword function
--------------------------------------

## LICENSE

MIT
