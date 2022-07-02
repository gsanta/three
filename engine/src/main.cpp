#include <stdio.h>
#include <GLES2/gl2.h>
#include <emscripten.h>
#include <emscripten/html5.h>

int main(int argc, char** argv) 
{
    EmscriptenWebGLContextAttributes attrs;
    attrs.alpha = false;
    attrs.depth = true;
    attrs.stencil = true;
    attrs.antialias = true;
    attrs.premultipliedAlpha = false;
    attrs.preserveDrawingBuffer = false;
    // attrs.preferLowPowerToHighPerformance = false;
    attrs.failIfMajorPerformanceCaveat = false;
    attrs.majorVersion = 1;
    attrs.minorVersion = 0;
    attrs.enableExtensionsByDefault = false;

    int ctx = emscripten_webgl_create_context("canvas", &attrs);
    if(!ctx)
    {
        printf("Webgl ctx could not be created!\n");
        return -1;
    }    

    emscripten_webgl_make_context_current(ctx);
    glClearColor(0,0,1,1);
    glClear(GL_COLOR_BUFFER_BIT);

    return 1;
}
