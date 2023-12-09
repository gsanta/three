# Compilation

_Cmake_ is the build tool used to compile the editor in a platform independent way.

The **editor** can be run as a desktop application as well as it can be compiled into js/webassembly to use it inside a web application.
For development purposes it is more convenient to use the desktop version, and only compile and try it out inside the web application when the feature is ready.

There is a _Makefile_ in the editor root that contains convenience commands to make it easier to compile/tests/etc. the application

### **Building the desktop version**

First configure the cmake project

`make configure-desktop`

Then compile it

`make compile-desktop`

This will generate the file _spright_ into _editor/build/desktop/app/_

You can run this file from the command line `./spright` which should open the editor in a desktop window

Of course it's much more convenient to run the **spright** target from an IDE like **vscode**.





At the root of the github project

First configure the cmake project 
```
mkdir build
cd build
cmake ../editor
```
Then build the executable target
```
cmake --build . --target=spright
```
Run the executable
```
cd app #is important to cd into app otherwise the shader paths won't be correct
./spright
```
You should see a desktop application with a canvas ready to draw

---

### Building with vscode

It is more convenient to build with an IDE and it makes it possible to debug the **editor** with breakpoints.

# Tests

We are using Catch2 for unit testing, tests are written in BDD style.

## Compile and run tests

### From command line

`unit_tests` is the cmake targets responsible for compiling the tests.

From the project root go to the `editor` folder and create a `build` directory (it is git-ignored) then enter into build.

```
cd editor
mkdir build
cd build
```

Configure the cmake project, then compile the `unit_test` target.

```
cmake ..
cmake --build . --target unit_test
```

After compilation there should be a `test` folder within `build`.
Enter the `tests` folder and run the tests.

```
cd tests
./unit_tests
```
