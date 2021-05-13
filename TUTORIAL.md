# Prerequisites
I highly suggest you view the rapydscript documentation. It covers vital parts of the rapydscript language, include a few of the nuances that it may have...

# Tutorial
Let's learn the basics of breact by building a simple todolist app.

# Installation
Make sure to view README.md for this

# Setup
Before we get started, create these files so that your directory structure looks like this:

```
main_code/
├─ todo.pyj
├─ main.pyj
├─ public/
│  ├─ index.html
│  ├─ index.js
```

# HTML
The html code already has a boilerplate in it. Let's review it.

```
<!DOCTYPE html>
<!--[if lt IE 7]>      <html class="no-js lt-ie9 lt-ie8 lt-ie7"> <![endif]-->
<!--[if IE 7]>         <html class="no-js lt-ie9 lt-ie8"> <![endif]-->
<!--[if IE 8]>         <html class="no-js lt-ie9"> <![endif]-->
<!--[if gt IE 8]>      <html class="no-js"> <!--<![endif]-->
<html>
    <head>
        <meta charset="utf-8">
        <meta http-equiv="X-UA-Compatible" content="IE=edge">
        <title>Ryact App</title>
        <meta name="description" content="your description">
        <meta name="viewport" content="width=device-width, initial-scale=1">
        <!-- <link rel="stylesheet" href=""> -->
    </head>
    <body>
        <!--[if lt IE 7]>
            <p class="browsehappy">You are using an <strong>outdated</strong> browser. Please <a href="#">upgrade your browser</a> to improve your experience.</p>
        <![endif]-->
        <div id="root"></div>
        <script src="index.js" async defer></script>
    </body>
</html>
```

Replace the title, and description with what you believe is a good title and description for this app. 
For me, i'm going to replace the title with `Todo List` and the description with `this is a todolist`

In addition, i'm going to add bootstrap to this project as well. This is just to make it look better, but you don't have to. I suggest
you do, because it will show you how to link your app with existing libaries. 

Replace the commented line on line 35 with the link to bootstrap:
`<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.0/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-wEmeIV1mKuiNpC+IOBjI7aAzPcEZeedi5yW5f2yOq55WWLwNGmvvx4Um1vskeMj0" crossorigin="anonymous">`

# Python Boilerplate

Technically, this isn't python exactly, but its syntax is mostly the same. If you know python, you will be able to use rapydscript. Rapydscript code uses the `.pyj` extension,
and if you're using an IDE, it may consider it like a `txt` file. Make sure you change your IDE settings so that it treats Rapydscript files like python.

Let's visit `main.py` and review the boilerplate code already inside of it.

```
#Here we are importing the base classes from the ryact library; An important thing to note is that rapydscript does not support star imports, as they can be abused.
#Generally, it isn't a good practice to use it, so its not that bad of a problem, anyway.
from ryact.baseclasses import cre, css, Base

#MyApp is a stateless component(it does not change, so therefore it doesn't inherit the setState method)
class MyApp(Base):
    #this is what will be rendered. 
    def render(self):
        # simply put, the cre() function is used to creat dom trees. Here, i am creating an h1 element with a 
        # 20px margin, blue color, and sans-serif font. It's innerText is "Hello ryact..."
        # If you were to convert this to html, you would get 
        # <h1 style="margin:20px;color:blue;font-family:sans-serif">Hello ryact! Rapydscript is great, but ryact makes it better!</h1>
        return cre(
            "h1", {
                #The css function converts a dictionary into a css string. This is mainly for ease of readability, and is optional to use.
                "style":
                css({
                    "margin": "20px",
                    "color": "blue",
                    "font-family": "sans-serif"
                }),
                # to set the text of a header, use the innerText attribute. There is an innerHTML attribute as well, but I STRONGLY recommend
                # to not use it. Instead, keep your children in a third argument, which is a list of html elements.
                "innerText":
                "Hello ryact! Rapydscript is great, but ryact makes it better!"
            })

#You need to have this function, as it is called in execute.pyj. If you don't know what that is, it is a function that is called in the compilation stage.
#It references this function and calls it.
def run_app():
    # this appends our component into the "root" div. Unlike react you have to manually call the .render() function. This is deliberate, because it allows you to pass props
    # that are used throughout the whole class as well as passing arguments to the render() function that may only need to be used by that function.
    document.getElementById("root").appendChild(MyApp().render())
```

# todo.py


### How ryact changes state
`
Ryact's main difference in react is that there is no virtual dom; instead, stateful components are marked with a unique id, and are referenced and changed during setState(). 
Each stateful component is wrapped with two containers- an outer one(for identifying the stateful component), and an inner one(for identifying the content within the component 
to replace). Once Ryact identifies the containers that are needed to change state, it then uses a dom-diffing algorithm to identify which exact parts have changed. This is to prevent 
unnecessarily erasing and rewriting big Stateful components. Like Breact, Ryact used to just delete and rerender the entire stateful component. This is fine in some
situations but for nested components, it can be quite burdening. If StatefulSegment does not work for you, or for some reason you want to use the old method, 
use the OLD_StatefulSegment class instead.
the GenerateContainers class generates the unique containers with unique ids, and they are stored in the self.oi instance variable.
Remember, in a stateful component, the main code is written in an update() function. This is the code that will be rerendered during changes. 
You do not want to put forms and stuff here, as they will be reloaded, and so will the content in them(though the data entered should be intact). 
This will make for an irritating process, so as a workaround, define them in a Stateless component and manage their state in a stateful container, 
that handles state but doesn't render anything. 
`

Here is the code that we will use to create the todolist. With this you can enter a todoitem and click a button. The item will be logged in to the list.

Here is the code:

```
#here is our main imports
from ryact.baseclasses import cre, Base, GenerateContainers, StatefulSegment, css

#This is a stateful segement. This list changes. 
class List(StatefulSegment):
    def __init__(self):
        #boilerplate - generating the containers that will be identified for state
        self.oi = GenerateContainers()
        #state variable with list of items
        self.state = {"items": []}
    #updating state
    def update(self):
        #Using list comprehension to render the list of items
        return cre("ul", {},
                   [cre("li", {"innerText": i}) for i in self.state["items"]])

'''
Here we are creating a TxtManager class. This stores the text information that is being typed without reloading the textbox component and removing what is typed already
'''
class TxtManager(StatefulSegment):
    def __init__(self):
        self.oi = GenerateContainers()
        self.state = {"todotext": ""}
    #this is just for managing the state, so it doesn't need to return anything
    def update(self):
        return cre("div", {})

'''
This class has the list of todo items, and a form which you can use to enter a new item. The ordinary components in here will not change, so this is a Stateless class
'''
class Todo(Base):
    def render(self):
        #initialize the text manager class that handles input state
        txt = TxtManager()
        
        #Updates the text in the TxtManager class
        def change(e):
            txt.setState({"todotext": e.target.value})
        #adds the item to the List component
        def updateState():
            lst.state["items"].append(txt.state["todotext"])
            lst.setState({"items": lst.state["items"]})
            
        #the list of items
        lst = List()
        #This is just a button
        btn = cre(
            "button", {
                "innerText": "Click to add",
                "class": "btn btn-primary col-sm m-2",
                "onclick": updateState
            })
        #Rendering everything together
        return cre(
            #this is to vertically and horizontally center
            "div", {
                "class":
                "container-sm d-flex flex-column justify-content-center align-items-center",
                "style": css({"min-height": "100vh"}),
            }, [
                cre("h1", {"innerText": "todo list"}),
                txt.render(),
                lst.render(),
                cre("div", {"class": "row"}, [
                    cre(
                        "input", {
                            "type": "text",
                            "onchange": change,
                            "class": "col-sm form-control m-2"
                        }),
                    btn,
                ])
            ])

```

# Now back to the home page...

Add `from todo import Todo` at the top. This is so that we can access the `Todo` class

In the `run_app` function...

`
def run_app():
    document.getElementById("root").appendChild(Todo().render())
`

##### And we're done!
If all works well, you should see:
![image](https://user-images.githubusercontent.com/30184788/118161698-ba999c80-b3d4-11eb-9079-f3e3f2930abe.png)

If you have any problems, please put them in the issues tab in this repo.
