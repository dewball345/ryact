(function(){
"use strict";
var ՐՏ_1, ՐՏ_2, ՐՏ_3, ՐՏ_4, ՐՏ_5, ՐՏ_6, ՐՏ_13, ՐՏ_14, ՐՏ_15, ՐՏ_16;
function ՐՏ_bind(fn, thisArg) {
    var ret;
    if (fn.orig) {
        fn = fn.orig;
    }
    if (thisArg === false) {
        return fn;
    }
    ret = function() {
        return fn.apply(thisArg, arguments);
    };
    ret.orig = fn;
    return ret;
}
function ՐՏ_rebindAll(thisArg, rebind) {
    if (rebind === void 0) {
        rebind = true;
    }
    for (var p in thisArg) {
        if (thisArg[p] && thisArg[p].orig) {
            if (rebind) {
                thisArg[p] = ՐՏ_bind(thisArg[p], thisArg);
            } else {
                thisArg[p] = thisArg[p].orig;
            }
        }
    }
}
function ՐՏ_with__name__(fn, name) {
    fn.__name__ = name;
    return fn;
}
function ՐՏ_extends(child, parent) {
    child.prototype = Object.create(parent.prototype);
    child.prototype.__base__ = parent;
    child.prototype.constructor = child;
}
function ՐՏ_in(val, arr) {
    if (typeof arr.indexOf === "function") {
        return arr.indexOf(val) !== -1;
    } else if (typeof arr.has === "function") {
        return arr.has(val);
    }
    return arr.hasOwnProperty(val);
}
function ՐՏ_Iterable(iterable) {
    var tmp;
    if (iterable.constructor === [].constructor || iterable.constructor === "".constructor || (tmp = Array.prototype.slice.call(iterable)).length) {
        return tmp || iterable;
    }
    if (Set && iterable.constructor === Set) {
        return Array.from(iterable);
    }
    return Object.keys(iterable);
}
function len(obj) {
    var tmp;
    if (obj.constructor === [].constructor || obj.constructor === "".constructor || (tmp = Array.prototype.slice.call(obj)).length) {
        return (tmp || obj).length;
    }
    if (Set && obj.constructor === Set) {
        return obj.size;
    }
    return Object.keys(obj).length;
}
function min(a) {
    return Math.min.apply(null, Array.isArray(a) ? a : arguments);
}
function ՐՏ_print() {
    if (typeof console === "object") {
        console.log.apply(console, arguments);
    }
}
function range(start, stop, step) {
    var length, idx, range;
    if (arguments.length <= 1) {
        stop = start || 0;
        start = 0;
    }
    step = arguments[2] || 1;
    length = Math.max(Math.ceil((stop - start) / step), 0);
    idx = 0;
    range = new Array(length);
    while (idx < length) {
        range[idx++] = start;
        start += step;
    }
    return range;
}
function ՐՏ_eq(a, b) {
    var ՐՏitr10, ՐՏidx10;
    var i;
    if (a === b) {
        return true;
    }
    if (a === void 0 || b === void 0 || a === null || b === null) {
        return false;
    }
    if (a.constructor !== b.constructor) {
        return false;
    }
    if (Array.isArray(a)) {
        if (a.length !== b.length) {
            return false;
        }
        for (i = 0; i < a.length; i++) {
            if (!ՐՏ_eq(a[i], b[i])) {
                return false;
            }
        }
        return true;
    } else if (a.constructor === Object) {
        if (Object.keys(a).length !== Object.keys(b).length) {
            return false;
        }
        ՐՏitr10 = ՐՏ_Iterable(a);
        for (ՐՏidx10 = 0; ՐՏidx10 < ՐՏitr10.length; ՐՏidx10++) {
            i = ՐՏitr10[ՐՏidx10];
            if (!ՐՏ_eq(a[i], b[i])) {
                return false;
            }
        }
        return true;
    } else if (Set && a.constructor === Set || Map && a.constructor === Map) {
        if (a.size !== b.size) {
            return false;
        }
        for (i of a) {
            if (!b.has(i)) {
                return false;
            }
        }
        return true;
    } else if (a.constructor === Date) {
        return a.getTime() === b.getTime();
    } else if (typeof a.__eq__ === "function") {
        return a.__eq__(b);
    }
    return false;
}
class IndexError extends Error {
    constructor (message) {
        super();
        var self = this;
        self.name = "IndexError";
        self.message = message;
    }
}
class TypeError extends Error {
    constructor (message) {
        super();
        var self = this;
        self.name = "TypeError";
        self.message = message;
    }
}
var ՐՏ_modules = {};
ՐՏ_modules["random"] = {};
ՐՏ_modules["ryact.baseclasses"] = {};
ՐՏ_modules["ryact"] = {};
ՐՏ_modules["main_code.main"] = {};
ՐՏ_modules["main_code"] = {};

(function(){
    var __name__ = "random";

    var _$rapyd$_seed_state, _$rapyd$_get_random_byte;
    _$rapyd$_seed_state = {
        key: [],
        key_i: 0,
        key_j: 0
    };
    _$rapyd$_get_random_byte = function() {
        _$rapyd$_seed_state.key_i = (_$rapyd$_seed_state.key_i + 1) % 256;
        _$rapyd$_seed_state.key_j = (_$rapyd$_seed_state.key_j + _$rapyd$_seed_state.key[_$rapyd$_seed_state.key_i]) % 256;
        [_$rapyd$_seed_state.key[_$rapyd$_seed_state.key_i], _$rapyd$_seed_state.key[_$rapyd$_seed_state.key_j]] = [ _$rapyd$_seed_state.key[_$rapyd$_seed_state.key_j], _$rapyd$_seed_state.key[_$rapyd$_seed_state.key_i] ];
        return _$rapyd$_seed_state.key[(_$rapyd$_seed_state.key[_$rapyd$_seed_state.key_i] + _$rapyd$_seed_state.key[_$rapyd$_seed_state.key_j]) % 256];
    };
    function seed(x=new Date().getTime()) {
        var i, j;
        if (typeof x === "number") {
            x = x.toString();
        } else if (typeof x !== "string") {
            throw new TypeError("unhashable type: '" + typeof x + "'");
        }
        for (i = 0; i < 256; i++) {
            _$rapyd$_seed_state.key[i] = i;
        }
        j = 0;
        for (i = 0; i < 256; i++) {
            j = (j + _$rapyd$_seed_state.key[i] + x.charCodeAt(i % x.length)) % 256;
            [_$rapyd$_seed_state.key[i], _$rapyd$_seed_state.key[j]] = [ _$rapyd$_seed_state.key[j], _$rapyd$_seed_state.key[i] ];
        }
    }
    seed();
    function random() {
        var n, m, i;
        n = 0;
        m = 1;
        for (i = 0; i < 8; i++) {
            n += _$rapyd$_get_random_byte() * m;
            m *= 256;
        }
        return n / 0x10000000000000000;
    }
    function randrange() {
        return choice(range.apply(this, arguments));
    }
    function randint(a, b) {
        return parseInt(random() * (b - a + 1) + a);
    }
    function uniform(a, b) {
        return random() * (b - a) + a;
    }
    function choice(seq) {
        if (seq.length > 0) {
            return seq[Math.floor(random() * seq.length)];
        } else {
            throw new IndexError();
        }
    }
    function shuffle(x, random_f=random) {
        var i, j;
        for (i = 0; i < x.length; i++) {
            j = Math.floor(random_f() * (i + 1));
            [x[i], x[j]] = [ x[j], x[i] ];
        }
        return x;
    }
    function sample(population, k) {
        var ՐՏitr1, ՐՏidx1;
        var x, i, j;
        x = population.slice();
        ՐՏitr1 = ՐՏ_Iterable(range(population.length - 1, population.length - k - 1, -1));
        for (ՐՏidx1 = 0; ՐՏidx1 < ՐՏitr1.length; ՐՏidx1++) {
            i = ՐՏitr1[ՐՏidx1];
            j = Math.floor(random() * (i + 1));
            [x[i], x[j]] = [ x[j], x[i] ];
        }
        return x.slice(population.length - k);
    }
    ՐՏ_modules["random"]["_$rapyd$_seed_state"] = _$rapyd$_seed_state;
    ՐՏ_modules["random"]["_$rapyd$_get_random_byte"] = _$rapyd$_get_random_byte;
    ՐՏ_modules["random"]["seed"] = seed;
    ՐՏ_modules["random"]["random"] = random;
    ՐՏ_modules["random"]["randrange"] = randrange;
    ՐՏ_modules["random"]["randint"] = randint;
    ՐՏ_modules["random"]["uniform"] = uniform;
    ՐՏ_modules["random"]["choice"] = choice;
    ՐՏ_modules["random"]["shuffle"] = shuffle;
    ՐՏ_modules["random"]["sample"] = sample;
})();

(function(){
    var __name__ = "ryact.baseclasses";

    var random = ՐՏ_modules["random"];
    
    var cre = (ՐՏ_1 = function cre(elem, attrs, children=[]) {
        var ՐՏitr2, ՐՏidx2, ՐՏitr3, ՐՏidx3;
        var element, attr, child;
        element = document.createElement(elem);
        ՐՏitr2 = ՐՏ_Iterable(Object.keys(attrs));
        for (ՐՏidx2 = 0; ՐՏidx2 < ՐՏitr2.length; ՐՏidx2++) {
            attr = ՐՏitr2[ՐՏidx2];
            if (attr === "innerText" || attr === "innerHTML" || attr === "onclick" || attr === "onchange") {
                element[attr] = attrs[attr];
            } else {
                element.setAttribute(attr, attrs[attr]);
            }
        }
        ՐՏitr3 = ՐՏ_Iterable(children);
        for (ՐՏidx3 = 0; ՐՏidx3 < ՐՏitr3.length; ՐՏidx3++) {
            child = ՐՏitr3[ՐՏidx3];
            element.appendChild(child);
        }
        return element;
    }, Object.defineProperty(ՐՏ_1, "__doc__", {
        value: "Function to create dom trees in ryact.undefined\n\n...\n\nParameters\n----------\nelem : HTML element\n    This is the element that will have the children in it\n\nattrs: Dict\n    This is a dictionary of attributes\n\nchildren: List[HTML element]\n    This is the children that will be added\n\nReturns\n-------\nHTML Element\n    Combined element with parent and children"
    }), ՐՏ_1);
    var css = (ՐՏ_2 = function css(cssObject) {
        var ՐՏitr4, ՐՏidx4;
        var compiledString, obj, string;
        compiledString = "";
        ՐՏitr4 = ՐՏ_Iterable(Object.keys(cssObject));
        for (ՐՏidx4 = 0; ՐՏidx4 < ՐՏitr4.length; ՐՏidx4++) {
            obj = ՐՏitr4[ՐՏidx4];
            string = obj + ":" + cssObject[obj] + ";";
            compiledString += string;
        }
        return compiledString;
    }, Object.defineProperty(ՐՏ_2, "__doc__", {
        value: "Converts a css dictionary into a style string. This is mostly syntatic sugar.\n\n...\n\nParameters\n----------\ncssObject : Dict\n    This is the element that will have the children in it\n\nReturns\n-------\nString\n    Css string"
    }), ՐՏ_2);
    var asyncSequence = (ՐՏ_3 = function asyncSequence(funcList) {
        var ՐՏitr5, ՐՏidx5;
        var state, func;
        function asyncdef(asyncoper, after) {
            return asyncoper.then(after);
        }
        state = funcList[0]();
        ՐՏitr5 = ՐՏ_Iterable(funcList.slice(1));
        for (ՐՏidx5 = 0; ՐՏidx5 < ՐՏitr5.length; ՐՏidx5++) {
            func = ՐՏitr5[ՐՏidx5];
            state = asyncdef(state, func);
        }
    }, Object.defineProperty(ՐՏ_3, "__doc__", {
        value: "Runs a sequence of asynchronous functions and then everything after.undefined\nClosest thing to async/await in rapydscript\n\n...\n\nParameters\n----------\nfuncList : List[Function]\n    This is the element that will have the list of functions\n\nReturns\n-------\nNone"
    }), ՐՏ_3);
    var Base = (ՐՏ_4 = class Base {
        render () {
            var self = this;
        }
    }, (function(){
        Object.defineProperties(ՐՏ_4.prototype, {
            __doc__: {
                enumerable: true, 
                writable: true, 
                value: "The Base(as mentioned in the class name) class, the one which all stateless and stateful components come from\n\n...\n\nAttributes\n----------\nYou can pass props through the constructor. This is optional; no props need to be passed for this to work\n\nMethods\n-------\nrender() -> an HTML element\n    Initial rendering of content"
            }
        });
    })(), ՐՏ_4);
    var GenerateContainers = (ՐՏ_5 = class GenerateContainers {
        constructor () {
            var self = this;
            self.outerId = "id" + random.randint(1, 9999999999).toString();
            self.innerId = "id" + random.randint(1, 9999999999).toString();
            self.container = cre("div", {
                "id": self.outerId
            });
            self.content = cre("div", {
                "id": self.innerId
            });
        }
    }, (function(){
        Object.defineProperties(ՐՏ_5.prototype, {
            __doc__: {
                enumerable: true, 
                writable: true, 
                value: "Class is used to generate containers that are identified and dom-diffed during setState()\n\n...\n\nAttributes\n----------\nself.outerId : str\n    The id of the first identifier in setState.undefined\n\nself.innerId : str\n    The id of the second identifier in setState.undefined\n\nself.container: html.DIV\n    This is the first identifier in setState. Breact uses a simpleundefined\n    getElementById to access this container. The content container\n    resides in here\n\nself.content: html.DIV\n    This is the second identifier in setState, and holds the mainundefined\n    content. This container is dom-diffed in the StatefulSegment\n    class or deleted and reupdated in the OLD_StatefulSegment class\n\nMethods\n-------\nNone"
            }
        });
    })(), ՐՏ_5);
    var StatefulSegment = (ՐՏ_6 = class StatefulSegment extends Base {
        constructor () {
            super();
            var self = this;
            self.oi = new GenerateContainers();
            self.state = {};
            ՐՏ_rebindAll(self);
        }
        render () {
            var self = this;
            self.oi.content.replaceChildren(self.update());
            self.oi.container.replaceChildren(self.oi.content);
            return self.oi.container;
        }
        update () {
            var self = this;
        }
        setState (attrs, one_state_change=false) {
            var ՐՏitr6, ՐՏidx6;
            var self = this;
            var attr, old, update, uChildren;
            ՐՏitr6 = ՐՏ_Iterable(Object.keys(attrs));
            for (ՐՏidx6 = 0; ՐՏidx6 < ՐՏitr6.length; ՐՏidx6++) {
                attr = ՐՏitr6[ՐՏidx6];
                self.state[attr] = attrs[attr];
            }
            ՐՏ_print("executed");
            function find_diffs(o, n, op) {
                var ՐՏ_7, ՐՏ_8, ՐՏ_9, ՐՏ_10, ՐՏ_11, ՐՏ_12, ՐՏitr7, ՐՏidx7, ՐՏitr8, ՐՏidx8;
                var oldChildren, newChildren, i;
                oldChildren = Array.from(o);
                newChildren = Array.from(n);
                for (i = 0; i < min(len(oldChildren), len(newChildren)); i++) {
                    if (((ՐՏ_7 = oldChildren[i]) === (ՐՏ_8 = newChildren[i]) || typeof ՐՏ_7 === "object" && ՐՏ_eq(ՐՏ_7, ՐՏ_8))) {
                        ՐՏ_print("they're the same thing!");
                        if (len(oldChildren[i].children) === 0 && len(newChildren[i].children) === 0) {
                            if (((ՐՏ_9 = oldChildren[i].innerHTML) !== (ՐՏ_10 = newChildren[i].innerHTML) && (typeof ՐՏ_9 !== "object" || !ՐՏ_eq(ՐՏ_9, ՐՏ_10)))) {
                                oldChildren[i].innerHTML = newChildren[i].innerHTML;
                            }
                        } else {
                            find_diffs(oldChildren[i].children, newChildren[i].children, oldChildren[i]);
                        }
                    } else if (((ՐՏ_11 = oldChildren[i]) !== (ՐՏ_12 = newChildren[i]) && (typeof ՐՏ_11 !== "object" || !ՐՏ_eq(ՐՏ_11, ՐՏ_12)))) {
                        oldChildren[i].parentNode.replaceChild(newChildren[i], oldChildren[i]);
                    }
                }
                if (len(newChildren) > len(oldChildren)) {
                    ՐՏitr7 = ՐՏ_Iterable(newChildren.slice(len(oldChildren)));
                    for (ՐՏidx7 = 0; ՐՏidx7 < ՐՏitr7.length; ՐՏidx7++) {
                        i = ՐՏitr7[ՐՏidx7];
                        op.appendChild(i);
                    }
                } else if (len(oldChildren) > len(newChildren)) {
                    ՐՏitr8 = ՐՏ_Iterable(oldChildren.slice(len(newChildren)));
                    for (ՐՏidx8 = 0; ՐՏidx8 < ՐՏitr8.length; ՐՏidx8++) {
                        i = ՐՏitr8[ՐՏidx8];
                        i.remove();
                    }
                }
            }
            old = document.getElementById(self.oi.innerId).children;
            update = self.update(one_state_change);
            uChildren = [ update ];
            find_diffs(old, uChildren, document.getElementById(self.oi.innerId));
        }
    }, (function(){
        Object.defineProperties(ՐՏ_6.prototype, {
            __doc__: {
                enumerable: true, 
                writable: true, 
                value: "Class is used for stateful components. Content in here is meant to be changed.undefined\n\n...\n\nAttributes\n----------\nYou can pass props through the constructor, though this is optional\n\nMethods\n-------\nrender() -> HTML Element\n    Initial render of StatefulSegment\n\nupdate() -> HTML Element\n    New content that will be placed when state changes.\n\nsetState() -> None\n    Changes states and updates DOM by first identifying container that needs to be changed and dom-diffing"
            }
        });
    })(), ՐՏ_6);
    var OLD_StatefulSegment = (ՐՏ_13 = class OLD_StatefulSegment extends Base {
        constructor () {
            super();
            var self = this;
            self.oi = new GenerateContainers();
            self.state = {};
            ՐՏ_rebindAll(self);
        }
        render () {
            var self = this;
            self.oi.content.replaceChildren(self.update());
            self.oi.container.replaceChildren(self.oi.content);
            return self.oi.container;
        }
        update () {
            var self = this;
        }
        setState (attrs, one_state_change=false) {
            var ՐՏitr9, ՐՏidx9;
            var self = this;
            var attr;
            ՐՏitr9 = ՐՏ_Iterable(Object.keys(attrs));
            for (ՐՏidx9 = 0; ՐՏidx9 < ՐՏitr9.length; ՐՏidx9++) {
                attr = ՐՏitr9[ՐՏidx9];
                self.state[attr] = attrs[attr];
            }
            document.getElementById(self.oi.innerId).remove();
            self.oi.content = cre("div", {
                "id": self.oi.innerId
            });
            self.oi.content.appendChild(self.update(one_state_change));
            document.getElementById(self.oi.outerId).appendChild(self.oi.content);
        }
    }, (function(){
        Object.defineProperties(ՐՏ_13.prototype, {
            __doc__: {
                enumerable: true, 
                writable: true, 
                value: "Former class for stateful components. Content in here is meant to be changed.undefined\nThe difference between this and the new one is that there is no dom-diffing here. Content is simply removed and replaced.\nFor Big stateful components, this can be a burden. If the new class doesn't work for you, please use this one.\nAlso, feel free to submit an issue or pr.\n\n...\n\nAttributes\n----------\nYou can pass props through the constructor, though this is optional\n\nMethods\n-------\nrender() -> HTML Element\n    Initial render of StatefulSegment\n\nupdate() -> HTML Element\n    New content that will be placed when state changes.\n\nsetState() -> None\n    Changes states and updates DOM by first identifying container that needs to be changed and removing/replacing them"
            }
        });
    })(), ՐՏ_13);
    var Link = (ՐՏ_14 = class Link extends Base {
        constructor (link) {
            super();
            var self = this;
            self.link = link;
            ՐՏ_rebindAll(self);
        }
        render (child) {
            var self = this;
            function link(e) {
                window.location.hash = "#" + self.link;
            }
            child.onclick = link;
            return child;
        }
    }, (function(){
        Object.defineProperties(ՐՏ_14.prototype, {
            __doc__: {
                enumerable: true, 
                writable: true, 
                value: "A link class for router. Similar to HTML <a> tag but for client-side routing\n\n...\n\nAttributes\n----------\nlink : str\n    The path that it will navigate to\n\nMethods\n-------\nrender() -> HTML Element\n    Initial render of Link element"
            }
        });
    })(), ՐՏ_14);
    var Redirect = (ՐՏ_15 = class Redirect extends Base {
        constructor (link) {
            super();
            var self = this;
            self.link = link;
            ՐՏ_rebindAll(self);
        }
        render () {
            var self = this;
            window.location.hash = self.link;
        }
    }, (function(){
        Object.defineProperties(ՐՏ_15.prototype, {
            __doc__: {
                enumerable: true, 
                writable: true, 
                value: "A redirect class for router.undefined\n\n...\n\nAttributes\n----------\nlink : str\n    The path that it will navigate to\n\nMethods\n-------\nrender() -> None\n    Initial render of Redirect element"
            }
        });
    })(), ՐՏ_15);
    var Router = (ՐՏ_16 = class Router extends StatefulSegment {
        constructor (routes, err_component) {
            super();
            var self = this;
            self.oi = new GenerateContainers();
            self.routes = routes;
            self.err_component = err_component;
            ՐՏ_rebindAll(self);
        }
        findComponentByPath (path) {
            var self = this;
            if (ՐՏ_in(path, self.routes)) {
                return self.routes[path];
            } else {
                return null;
            }
        }
        updateHash (window, e) {
            var self = this;
            self.setState({});
        }
        render (updater) {
            var self = this;
            self.oi.content.replaceChildren(self.update());
            self.oi.container.replaceChildren(self.oi.content);
            window.onload = updater;
            window.onhashchange = updater;
            return self.oi.container;
        }
        update (one_state_change=false) {
            var ՐՏ_17;
            var self = this;
            var path, component, comp;
            path = window.location.hash.slice(1);
            if (path === "") {
                window.location.hash = "#/";
                path = "/";
            }
            component = self.findComponentByPath(path);
            if ((component === (ՐՏ_17 = null) || typeof component === "object" && ՐՏ_eq(component, ՐՏ_17))) {
                component = self.err_component;
            }
            comp = component();
            return comp;
        }
    }, (function(){
        Object.defineProperties(ՐՏ_16.prototype, {
            __doc__: {
                enumerable: true, 
                writable: true, 
                value: "Router class. This allows client side routing.\n\n...\n\nAttributes\n----------\nroutes : Dict\n    a dictionary of routes and their corresponding components\n\nerr_component: Base or StatefulSegment or OLD_StatefulSegment\n    if something wrong happens this component will show up. If this error isundefined\n    because of the source code, file an issue or pr on github.\n\nMethods\n-------\nfindComponentByPath(path: str) -> Base or StatefulSegment or OLD_StatefulSegment\n    Finds the corresponding component for router path\n\nupdateHash() -> None\n    Rerenders components when hash url changed.\n\nrender() -> HTML Element\n    Initial render of Link element\n\nrender() -> HTML Element\n    Initial render of Link element\n\nupdate() -> HTML Element\n    Return new component for route.undefined"
            }
        });
    })(), ՐՏ_16);
    ՐՏ_modules["ryact.baseclasses"]["cre"] = cre;
    ՐՏ_modules["ryact.baseclasses"]["css"] = css;
    ՐՏ_modules["ryact.baseclasses"]["asyncSequence"] = asyncSequence;
    ՐՏ_modules["ryact.baseclasses"]["Base"] = Base;
    ՐՏ_modules["ryact.baseclasses"]["GenerateContainers"] = GenerateContainers;
    ՐՏ_modules["ryact.baseclasses"]["StatefulSegment"] = StatefulSegment;
    ՐՏ_modules["ryact.baseclasses"]["OLD_StatefulSegment"] = OLD_StatefulSegment;
    ՐՏ_modules["ryact.baseclasses"]["Link"] = Link;
    ՐՏ_modules["ryact.baseclasses"]["Redirect"] = Redirect;
    ՐՏ_modules["ryact.baseclasses"]["Router"] = Router;
})();

(function(){
    var __name__ = "ryact";

    ՐՏ_modules["ryact"]["baseclasses"] = ՐՏ_modules["ryact.baseclasses"];

})();

(function(){
    var __name__ = "main_code.main";

    var cre = ՐՏ_modules["ryact.baseclasses"].cre;
    var css = ՐՏ_modules["ryact.baseclasses"].css;
    var Base = ՐՏ_modules["ryact.baseclasses"].Base;
    var asyncSequence = ՐՏ_modules["ryact.baseclasses"].asyncSequence;
    
    function apiCallSequence() {
        function a() {
            return fetch("https://jsonplaceholder.typicode.com/todos/1");
        }
        function b(result) {
            return result.json();
        }
        function c(json) {
            ՐՏ_print(json);
        }
        asyncSequence([ a, b, c ]);
    }
    function apiCallThen() {
        var result;
        result = fetch("https://jsonplaceholder.typicode.com/todos/1").then(function(result) {
            result.json().then(function(mjson) {
                ՐՏ_print(mjson);
            });
        });
    }
    apiCallSequence();
    class MyApp extends Base {
        render () {
            var self = this;
            return cre("h1", {
                "style": css({
                    "margin": "20px",
                    "color": "blue",
                    "font-family": "sans-serif"
                }),
                "innerText": "Hello ryact! Rapydscript is great, but ryact makes it better!"
            });
        }
    }
    function run_app() {
        document.getElementById("root").appendChild(new MyApp().render());
    }
    ՐՏ_modules["main_code.main"]["apiCallSequence"] = apiCallSequence;
    ՐՏ_modules["main_code.main"]["apiCallThen"] = apiCallThen;
    ՐՏ_modules["main_code.main"]["MyApp"] = MyApp;
    ՐՏ_modules["main_code.main"]["run_app"] = run_app;
})();

(function(){
    var __name__ = "main_code";

    ՐՏ_modules["main_code"]["main"] = ՐՏ_modules["main_code.main"];

})();

(function(){

    var __name__ = "__main__";

    var run_app = ՐՏ_modules["main_code.main"].run_app;
    
    run_app();
})();
})();
