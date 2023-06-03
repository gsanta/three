:warning: This project is under heavy development and not ready for professional use

[![build](https://circleci.com/gh/gsanta/spright.svg?style=shield)](https://app.circleci.com/pipelines/github/gsanta/spright?branch=master)


Spright is a pixel art drawing tool similar to [Aseprite](https://github.com/aseprite/aseprite) or [Piskel](https://github.com/piskelapp/piskel) with the ambition of providing a better user experience for generating art.

# For developers

Under the hood there is a c++ application (the **editor** folder) which provides the whole editing experience (the drawing canvas, the different editing tools, animation, etc.). For the rendering we use OpenGL that will be compiled (with all the other c++ stuff) with the help of emscripten into js/webassembly.

For the client UI elements we use React, Redux and Chakra UI as the main libraries (the **client** folder).

There is also an experimental Ruby on Rails backend (the **backend** folder) that will be responsible for user handling and persisting user projects, but it's not going to be in production for a while.

[How to compile the code](https://github.com/gsanta/spright/wiki/How-to-compile-the-code)
