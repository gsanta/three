#include "./editor_callbacks.h"

namespace spright
{
namespace editor
{
#ifdef SPARKY_EMSCRIPTEN
    EM_JS(void, on_active_frame_changed_callback, (int index), { editorCallbacks.onActiveFrameChanged(index); });
    void on_active_frame_changed(int index)
    {
        on_active_frame_changed_callback(index);
    }
#else
    void on_active_frame_changed(int index)
    {
    }
#endif
} // namespace editor
} // namespace spright
