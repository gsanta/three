#pragma once

#include "../event/event_emitter.h"

#ifdef SPARKY_EMSCRIPTEN
#include <emscripten/val.h>
#endif

namespace spright
{
namespace editing
{

    class EmscriptenEventEmitter : public EventEmitter
    {
    public:
        void emitChange(std::string eventType, nlohmann::json data) override;
    };
} // namespace editing
} // namespace spright
