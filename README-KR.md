## Capsulable

[![Build Status](https://travis-ci.org/hmmhmmhm/capsulable.svg?branch=master)](https://travis-ci.org/hmmhmmhm/capsulable)

```
순수 자바스크립트 클래스 캡슐화 구현 모듈
```
<img src="https://image.flaticon.com/icons/svg/822/822143.svg" alt="icon" width="150"/>

캡슐러블 모듈은 자바스크립트 클래스에서 쉽게 접근제한자 개념을 사용할 수 있게 돕습니다. 클로저 개념을 통해 캡슐화 및 은닉화 개념을 구현합니다.

## 설치방법

```
npm i capsulable --save
```

--------------------------------------

## 왜 이 모듈이 필요한가요?

자바스크립트의 기본 변수개념에는 _ 와 __으로 표현하는 prvate 및 protected 변수 개념이 존재하지만, 타 클래스에서 해당 변수를 읽는 것을 막지는 못합니다. 또한 protected 개념의 경우 상속 이후 접근제한의 개념이 아직까지 모호합니다. 내부 변수의 은닉성이 필요한 클래스에는 클래스 변수에 보다 명확한 접근제한자 개념이 필요합니다.

## 그냥 Closure 나 Symbol 으로 매번 만들면 되지 않나요?

물론 그렇게 해도 상관은 없습니다. 하지만 클래스 인스턴스 마다 각기 다른 Private 변수 공간을 만들고 싶거나(`외부에서 접근할 수 없는`), 상속 이후에도 각기 인스턴스마다 다른 Protected 변수 공간을 만들고 싶거나, 특정 패키지 사이에서만 접근가능한 Protected Static 변수공간을 매번 직접 만든다면 다소 힘이 빠지는 작업일 수 있습니다. Capsulable 은 안전한 은닉성과 확장성, 그리고 상속 클래스 및 패키지 간의 Protected 및 Protected Static 변수 개념을 제공합니다.

--------------------------------------

## 캡슐화 된 클래스 정의방법

Capsulable 은 `class` 의 `constructor` 함수를 통해서 데이터 필드를 공유합니다. (이는 즉 Capsulable 이 최종적으로 항상 자식 클래스로 구성 됨을 의미합니다.) 캡슐화 하길 원하는 클래스는 사전에 Capsulable 을 통해서 constructor 에서 데이터 필드를 상속 받아야합니다. 예시 상 문법은 ES5로 표기되나, Babel을 통한 ES6 문법으로 구현해도 됩니다.

### 클래스 정의 예제

```js
// A.js
const Capsulable = require('capsulable')
const Field = Capsulable()

class A {
    constructor(_field){
        // 데이터 필드를 구성합니다.
        Field(this, _field)

        // 아래와 같은 코드를 통해서
        // 클래스 내 함수 작성 시
        // 데이터 필드에 접근 가능합니다.
        Field(this).private
        Field(this).protected
        Field(this).protectedStatic
    }
}

module.exports = A
```


### 클래스 캡슐화 예제
```js
// index.js
const Capsulable = require('./capsulable')
const A = require('./A')

// Capsulable에 클래스 원형을 넣으면
// 캡슐화 된 클래스가 반환됩니다.
const SharedA = Capsulable(A)

// 캡슐화 된 클래스를 통해서
// 인스턴스를 생성할 수 있습니다.
let sharedA = new SharedA()
```
--------------------------------------


## Field 변수 접근법
```js
Field(this).private
Field(this).protected
Field(this).protectedStatic
```
Capsulable 모듈은 각 클래스마다 데이터 필드라는 것을 생성하는데, 이 데이터 필드에는 `private`, `protected`, `protectedStatic` 변수형태(`getter`)로 제공됩니다. 데이터 필드는 클래스의 인스턴스마다 생성되므로 데이터 필드 접근시에는 인스턴스가 필드에 인자로 주어져야 합니다.


### Private 필드 사용법
```js
Field(this).private.set(key, value) // => Boolean
Field(this).private.exist(key)  // => Boolean
Field(this).private.get(key) // => Object
Field(this).private.getAll() // => Object
Field(this).private.remove(key) // => Boolean
Field(this).private.removeAll() // => Boolean
```
Private 필드는 각 인스턴스마다 격리된 공간을 가지며 타 인스턴스가 접근할 수 없도록 차단됩니다. 개발자가 같은 클래스 내에서 `Field(this)` 를 다른 인스턴스에게 노출시킬 수 있는 코드를 작성하지만 않는다면 변수의 은닉성은 유지될 것입니다.


### Protected 필드 사용법
```js
Field(this).protected.set(className, key, value) // => Boolean
Field(this).protected.exist(className, key)  // => Boolean
Field(this).protected.get(className, key) // => Object
Field(this).protected.getAll(className) // => Object
Field(this).protected.remove(className, key) // => Boolean
Field(this).protected.removeAll(className) // => Boolean
```
Protected 필드는 각 인스턴스마다 격리된 공간을 가지며, 접근하고자 하는 className 을 함수 사용시 맨 처음 인자로 제공해야합니다. Protected 필드는 클래스 상속이 발생했을때 부모 클래스와 자식 클래스 사이에만(또한 같은 패키지) 공유되어야 하는 데이터 운용에 적합합니다.


### Protected Static 필드 사용법
```js
Field(this).protectedStatic.set(className, key, value) // => Boolean
Field(this).protectedStatic.exist(className, key)  // => Boolean
Field(this).protectedStatic.get(className, key) // => Object
Field(this).protectedStatic.getAll(className) // => Object
Field(this).protectedStatic.remove(className, key) // => Boolean
Field(this).protectedStatic.removeAll(className) // => Boolean
```
Protected Static 필드는 각 인스턴스와 공유된 공간을 가지며, 접근하고자 하는 className을 함수 사용시 맨 처음 인자로 제공해야합니다. Protected Static 필드는 부모클래스와 자식클래스가 같은 데이터를 운용하면서 동시에 모든 클래스 인스턴스들이 같은 데이터를 공유해야 하는 데이터 운용에 적합합니다.

--------------------------------------

## 캡슐화 된 파생 클래스 정의방법 

파생 클래스를 생성했을 때 부모클래스와 자식클래스가 `Protected` 와 `ProtectedStatic` 형태의 데이터 필드를 공유하게 하려면 아래와 같은 방법을 통해 구현할 수 있습니다. (상속을 진행해도 `Private` 데이터 필드는 공유되지 않습니다.)

### 파생클래스 정의
```js
// B.js
const Capsulable = require('capsulable')
const A = require('./A')

class B extends A {
    constructor(_field){
        // 파생 클래스는 constructor 를 통해서
        // 받은 필드 객체를 super 키워드를 통해서
        // 반드시 부모 클래스로 넘겨야합니다.
        super(_field)

        // 데이터 필드를 구성합니다.
        Field(this, _field)
    }
}

module.exports = B
```


### 파생클래스 캡슐화
```js
// index.js
const Capsulable = require('./capsulable')
const B = require('./B')

// Capsulable에 클래스 원형을 넣으면
// 캡슐화 된 클래스가 반환됩니다.
const SharedB = Capsulable(B)

// 캡슐화 된 클래스를 통해서
// 인스턴스를 생성할 수 있습니다.
let sharedB = new SharedB()
```
--------------------------------------


## 이미 캡슐화 된 클래스의 파생방법 

이미 원 클래스를 Capsulable 로 캡슐화 시킨 이후에 다시한번 다른 클래스에서 해당 클래스를 파생받고 싶은 경우, 아래와 같은 방법을 통해 이를 구현할 수 있습니다.

```js
// C.js
const Capsulable = require('./capsulable')
const B = require('./B')
const SharedB = Capsulable(B)

class C extends SharedB{
    constructor(inherit){
        // 부모 클래스인 Capsulable 에서
        // 데이터 필드를 역으로 받아옵니다.
        let hook = {}
        super(hook)

        // 데이터 필드를 구성합니다.
        Field(this, hook.field)

        // 이후 다시한번 파생이 가능하도록,
        // 파생됐을 시 객체를 복사해줍니다.
        if(inherit) Capsulable(hook, inherit)
    }
}

module.exports = C

// index.js
const Capsulable = require('./capsulable')
const C = require('./C')

// Capsulable에 클래스 원형을 넣으면
// 캡슐화 된 클래스가 반환됩니다.
const SharedC = Capsulable(C)

// 캡슐화 된 클래스를 통해서
// 인스턴스를 생성할 수 있습니다.
let sharedC = new SharedC()
```
--------------------------------------


## 패키지 공간 생성방법

Capsulable 에는 Java 의 Package 개념이 미약하게 구현되어 있습니다. 아래처럼 여러 클래스를 한번에 캡슐화 할 경우, 해당 클래스들의 인스턴스들은 `Protected` 데이터 필드와 `Protected Static` 데이터 필드가 자동으로 공유됩니다.


#### 주의: 하나의 패키지에 등록되는 여러 클래스 원형들은 서로 이름이 겹칠 수 없습니다.
```js
// index.js
const A = require('./A')
const B = require('./B')
const C = require('./C')

// Capsulable 에 인자로
// 배열에 클래스 원형들을 담아 전달하면
// 이를 하나의 패키지로 구성합니다.
let packages = Capsulable([A, B, C])

// 아래와 같이 packages.* 를 통해
// 캡슐화 된 클래스 원형에 접근할 수 있습니다.
let packA = new packages.A()
let packB = new packages.B()
let packC = new packages.C()
```


### 패키지 생성 이후 클래스 로드
```js
// index.js
const A = require('./A')
const B = require('./B')
const C = require('./C')
const D = require('./A')

// Capsulable 에 인자로
// 배열에 클래스 원형들을 담아 전달하면
// 이를 하나의 패키지로 구성합니다.
let packages = Capsulable([A, B, C])

// packages._load 함수를 통해서
// 원하는 클래스 원형을 패키지 공간 구성
// 이후에도 해당 패키지에 추가시킬 수 있습니다.
packages._load(D)

// packages.* 를 통해서
// 추가된 클래스 원형에 접근 가능합니다.
let packD = new packages.D()
```

### 패키지 생성 이후 클래스 언로드
```js
packages._load(D)
let packD = new packages.D()

// packages._unload 함수를 통해서
// 패키지에 포함되어 있는 클래스 원형을
// 해당 패키지에서 삭제시킬 수 있습니다.
packages._unload(D)

// 이미 패키지에 추가된 클래스 원형으로
// 클래스 인스턴스가 구성된 경우
// 해당 인스턴스에는 영향이 없습니다.
```
--------------------------------------

## Final Class 구현

클래스 원형의 캡슐화 이후 파생 클래스를 더 이상 만들길 원치 않는 경우 Capsulable 함수 사용시 2번째 인자로 final 모드를 적용시킴으로써 파생 클래스와 데이터 필드를 공유하지 않도록 할 수 있습니다. (클래스의 파생을 완전히 막지는 못하나, 데이터 필드가 공유되는 것을 막을 수는 있습니다.)

```js
// index.js
const Capsulable = require('./capsulable')
const A = require('./A')

// 2번째 인자로 final을 적으면
// 파생클래스와 데이터 필드를 공유하지 않습니다.
const SharedA = Capsulable(A, 'final')

// 캡슐화 된 클래스를 통해서
// 인스턴스를 생성할 수 있습니다.
let sharedA = new SharedA()
```

--------------------------------------

## 작업 목록

- [x] Private 변수 구현
- [x] Protected 변수 구현
- [x] Protected Static 변수 구현
- [x] 각 변수의 단계별 초기화 과정 구현
- [x] 통합 데이터 필드 구현
- [x] 상속기반의 유출없는 데이터 필드 공유 구현
- [x] 패키지간 Protected 데이터 공유 구현
- [x] Helper 를 통한 Private 변수 인자단축 구현
- [x] 캡슐화 이후 상속 클래스 추가 및 재 캡슐화 구현
- [x] 테스트 유닛 구현
- [x] assert 가변모듈화 하여 종속성 완전 배제 구현
- [x] final 클래스 구현
- [ ] final 변수 구현
- [ ] 캡슐화 된 클래스의 constructor 가변변수 인자 구현
- [ ] 캡슐화 된 클래스의 constructor 가변변수의 파생클래스 공유 구현
--------------------------------------

## LICENSE

MIT
