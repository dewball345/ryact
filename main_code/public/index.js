(function(){
"use strict";
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
    var ՐՏitr9, ՐՏidx9;
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
        ՐՏitr9 = ՐՏ_Iterable(a);
        for (ՐՏidx9 = 0; ՐՏidx9 < ՐՏitr9.length; ՐՏidx9++) {
            i = ՐՏitr9[ՐՏidx9];
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
    
    function cre(elem, attrs, children=[]) {
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
    }
    function css(cssObject) {
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
    }
    class Base {
        render () {
            var self = this;
        }
    }
    class GenerateContainers {
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
    }
    class StatefulSegment extends Base {
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
            var ՐՏitr5, ՐՏidx5;
            var self = this;
            var attr, old, update, uChildren;
            ՐՏitr5 = ՐՏ_Iterable(Object.keys(attrs));
            for (ՐՏidx5 = 0; ՐՏidx5 < ՐՏitr5.length; ՐՏidx5++) {
                attr = ՐՏitr5[ՐՏidx5];
                self.state[attr] = attrs[attr];
            }
            ՐՏ_print("executed");
            function find_diffs(o, n, op) {
                var ՐՏ_1, ՐՏ_2, ՐՏ_3, ՐՏ_4, ՐՏ_5, ՐՏ_6, ՐՏitr6, ՐՏidx6, ՐՏitr7, ՐՏidx7;
                var oldChildren, newChildren, i;
                oldChildren = Array.from(o);
                newChildren = Array.from(n);
                for (i = 0; i < min(len(oldChildren), len(newChildren)); i++) {
                    if (((ՐՏ_1 = oldChildren[i]) === (ՐՏ_2 = newChildren[i]) || typeof ՐՏ_1 === "object" && ՐՏ_eq(ՐՏ_1, ՐՏ_2))) {
                        ՐՏ_print("they're the same thing!");
                        if (len(oldChildren[i].children) === 0 && len(newChildren[i].children) === 0) {
                            if (((ՐՏ_3 = oldChildren[i].innerHTML) !== (ՐՏ_4 = newChildren[i].innerHTML) && (typeof ՐՏ_3 !== "object" || !ՐՏ_eq(ՐՏ_3, ՐՏ_4)))) {
                                oldChildren[i].innerHTML = newChildren[i].innerHTML;
                            }
                        } else {
                            find_diffs(oldChildren[i].children, newChildren[i].children, oldChildren[i]);
                        }
                    } else if (((ՐՏ_5 = oldChildren[i]) !== (ՐՏ_6 = newChildren[i]) && (typeof ՐՏ_5 !== "object" || !ՐՏ_eq(ՐՏ_5, ՐՏ_6)))) {
                        oldChildren[i].parentNode.replaceChild(newChildren[i], oldChildren[i]);
                    }
                }
                if (len(newChildren) > len(oldChildren)) {
                    ՐՏitr6 = ՐՏ_Iterable(newChildren.slice(len(oldChildren)));
                    for (ՐՏidx6 = 0; ՐՏidx6 < ՐՏitr6.length; ՐՏidx6++) {
                        i = ՐՏitr6[ՐՏidx6];
                        op.appendChild(i);
                    }
                } else if (len(oldChildren) > len(newChildren)) {
                    ՐՏitr7 = ՐՏ_Iterable(oldChildren.slice(len(newChildren)));
                    for (ՐՏidx7 = 0; ՐՏidx7 < ՐՏitr7.length; ՐՏidx7++) {
                        i = ՐՏitr7[ՐՏidx7];
                        i.remove();
                    }
                }
            }
            old = document.getElementById(self.oi.innerId).children;
            update = self.update(one_state_change);
            uChildren = [ update ];
            find_diffs(old, uChildren, document.getElementById(self.oi.innerId));
        }
    }
    class OLD_StatefulSegment extends Base {
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
            var ՐՏitr8, ՐՏidx8;
            var self = this;
            var attr;
            ՐՏitr8 = ՐՏ_Iterable(Object.keys(attrs));
            for (ՐՏidx8 = 0; ՐՏidx8 < ՐՏitr8.length; ՐՏidx8++) {
                attr = ՐՏitr8[ՐՏidx8];
                self.state[attr] = attrs[attr];
            }
            document.getElementById(self.oi.innerId).remove();
            self.oi.content = cre("div", {
                "id": self.oi.innerId
            });
            self.oi.content.appendChild(self.update(one_state_change));
            document.getElementById(self.oi.outerId).appendChild(self.oi.content);
        }
    }
    class Link extends Base {
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
    }
    class Redirect extends Base {
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
    }
    class Router extends StatefulSegment {
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
            var ՐՏ_7;
            var self = this;
            var path, component, comp;
            path = window.location.hash.slice(1);
            if (path === "") {
                window.location.hash = "#/";
                path = "/";
            }
            component = self.findComponentByPath(path);
            if ((component === (ՐՏ_7 = null) || typeof component === "object" && ՐՏ_eq(component, ՐՏ_7))) {
                component = self.err_component;
            }
            comp = component();
            return comp;
        }
    }
    ՐՏ_modules["ryact.baseclasses"]["cre"] = cre;
    ՐՏ_modules["ryact.baseclasses"]["css"] = css;
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
