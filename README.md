Ryact: a react-like framework to build super-fast web apps in python.

![Lighthouse Metric](https://user-images.githubusercontent.com/30184788/118049818-288d8780-b333-11eb-9566-da231efcfd16.png)

This project was started by dewball345.

Ryact is similar to react, with components and state. The main difference, however, is that Breact doesn't have a virtual dom; instead, each stateful element (element that uses setState) is assigned a unique id and is retrieved and changed(by dom-diffing) when necessary. There isn't much that I have added - just the bare minimum, for now. The source code is around 300 lines of code, including the pre-built hash router. You can find the tutorial at: https://dev.to/pixari/build-a-very-basic-spa-javascript-router-2k4p

Ryact is powered by [rapydscript](https://github.com/atsepkov/RapydScript).

Installation
------------ 
The repo is set up so that you can clone it. You can install it by doing ```git clone https://github.com/dewball345/ryact```

If you haven't already, here are the steps in install RapydScript.

Type:
```
npm install rapydscript -g
```

Once, you have both cloned the repo and installed rapydscript, navigate to the directory and type:

```
rapydscript execute.pyj --output example/public/index.js --import_path ryact;example --beautify --es6
```

to view an example page

or type

```
rapydscript execute.pyj --output main_code/public/index.js --import_path ryact;main_code --beautify --es6
```
to see the output of your development code. 

Features
-------- 
1. 🐍 The most obvious: Use python(rapydscript, which shares the same syntax as python) instead of javscript
2. ⚛️ Work with a component-based system with state-management when developing SPA's
3. ✨Use preexisting libraries like bootstrap, tailwind, and more!
4. 🔥 Create webpages that are blazing fast

Usage
-----
A tutorial will be made soon

Directory Structure
-------------------
These are the main directories you should worry about
```
example/
├─ some .pyj files
├─ public/
│  ├─ index.html
│  ├─ index.js
main_code/
├─ main.pyj
├─ public/
│  ├─ index.html
│  ├─ index.js
ryact/
...
```
the main_code directory is where you type your, well, main code, and the example folder has an example of an app made with ryact. 

Caveats - When to use this vs Breact
----

| Breact  | Ryact |
| ------------- | ------------- |
| Designed for easy development  | Designed for speed; development may be harder  |
| Full python syntax  | Mostly python syntax, but some things, like: casting, lambdas, etc. may not work. Check the rapydscript documentation for more info  |
| Super slow speed  | Blazing fast code |
| Code is not precompiled in advance | Code is precompiled in advance, which makes things faster |
| You can use custom python modules | you cannot use many custom python modules |

Choose Wisely.

More documentation will be added later. 
