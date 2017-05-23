

### 1.js是引用传递还是值传递呢？

[问题来源](https://stackoverflow.com/questions/518000/is-javascript-a-pass-by-reference-or-pass-by-value-language)

原始类型如**Undefined、Null、Boolean、Number 和 String**是值传递，但是对象的话，就有点难懂了，他们既可以是值传递也可以是引用传递。下面看一个例子：

```javascript
function changeStuff(a, b, c) {
  a = a * 10;
  b.item = "changed";
  c = {item: "changed"};
}

var num = 10;
var obj1 = {item: "unchanged"};
var obj2 = {item: "unchanged"};

changeStuff(num, obj1, obj2);

console.log(num);
console.log(obj1.item);    
console.log(obj2.item);
```

最后的结果输出：

```javascript
10
changed
unchanged
```

如果js是纯的值传递，那么函数外的`obj1.item`不会被改变，如果是引用传递的话，那么所有的值都会被改变，`num`会变成`100`，`obj2.item`会变成`changed`。

> In practical terms, this means that if you change the parameter itself (as with `num` and `obj2`), that won't affect the item that was fed into the parameter. But if you change the INTERNALS of the parameter, that will propagate back up (as with `obj1`).

根据实践可得出，如果你改变参数本身（如num和obj2）那么，被传入函数的参数本身会不被改变。但是你如果改变参数的内部，那么他会将传入的参数备份。这种传参的方式叫做[call-by-sharing](http://en.wikipedia.org/wiki/Evaluation_strategy#Call_by_sharing)(共享传递)。

### Call by sharing

*Call by sharing* (also referred to as *call by object* or *call by object-sharing*) is an evaluation strategy first named by [Barbara Liskov](https://en.wikipedia.org/wiki/Barbara_Liskov) et al. for the language [CLU](https://en.wikipedia.org/wiki/CLU_programming_language) in 1974.[[5\]](https://en.wikipedia.org/wiki/Evaluation_strategy#cite_note-CLU_Reference_Manual-5) It is used by languages such as [Python](https://en.wikipedia.org/wiki/Python_(programming_language)),[[6\]](https://en.wikipedia.org/wiki/Evaluation_strategy#cite_note-Lundh_Call_By_Object-6) [Iota](https://en.wikipedia.org/wiki/Iota_and_Jot),[[7\]](https://en.wikipedia.org/wiki/Evaluation_strategy#cite_note-7) [Java](https://en.wikipedia.org/wiki/Java_(programming_language)) (for object references), [Ruby](https://en.wikipedia.org/wiki/Ruby_(programming_language)), [JavaScript](https://en.wikipedia.org/wiki/JavaScript), Scheme, OCaml, [AppleScript](https://en.wikipedia.org/wiki/AppleScript), and many others. However, the term "call by sharing" is not in common use; the terminology is inconsistent across different sources. For example, in the Java community, they say that Java is call by value.[[8\]](https://en.wikipedia.org/wiki/Evaluation_strategy#cite_note-8) Call by sharing implies that values in the language are based on objects rather than [primitive types](https://en.wikipedia.org/wiki/Primitive_types), i.e. that all values are "[boxed](https://en.wikipedia.org/wiki/Boxed_type)".

The semantics of call by sharing differ from call by reference in that assignments to function arguments within the function aren't visible to the caller (unlike by reference semantics)[*citation needed*], so e.g. if a variable was passed, it is not possible to simulate an assignment on that variable in the caller's scope. However, since the function has access to the same object as the caller (no copy is made), mutations to those objects, if the objects are [mutable](https://en.wikipedia.org/wiki/Mutable_object), within the function are visible to the caller, which may appear to differ from call by value semantics. Mutations of a mutable object within the function are visible to the caller because the object is not copied or cloned — it is shared. For example, in Python, lists are mutable, so:

```
def f(l):
    l.append(1)
m = []
f(m)
print(m)
```

outputs `[1]` because the `append` method modifies the object on which it is called.

Assignments within a function are not noticeable to the caller, because, in these languages, an assignment binds a variable to a different object rather than mutating the object. Since the rebound variable only exists within the scope of the function, the counterpart in the caller retains its original binding. Compare the Python mutation above with this code that binds the formal argument to a new object:

```
def f(l):
    l = [1]
m = []
f(m)
print(m)
```

outputs `[]`, because the statement `l = [1]` reassigns a new list to the *variable* rather than to the location it references.

For [immutable objects](https://en.wikipedia.org/wiki/Immutable_object), there is no real difference between call by sharing and call by value, except if object identity is visible in the language. The use of call by sharing with mutable objects is an alternative to [input/output parameters](https://en.wikipedia.org/wiki/Output_parameter):[[9\]](https://en.wikipedia.org/wiki/Evaluation_strategy#cite_note-CA1021-9) the parameter is not assigned to (the argument is not overwritten and object identity is not changed), but the object (argument) is mutated.

Although this term has widespread usage in the Python community, identical semantics in other languages such as Java and Visual Basic are often described as call by value, where the value is implied to be a reference to the object.[*citation needed*]