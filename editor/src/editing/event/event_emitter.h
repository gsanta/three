#pragma once
#include <algorithm>
#include <nlohmann/json.hpp>
#include <vector>

namespace spright
{
namespace editing
{

    class EventEmitter
    {
    public:
        inline virtual ~EventEmitter()
        {
        }
        virtual void emitChange(std::string eventType, nlohmann::json data) = 0;
    };
} // namespace editing
} // namespace spright
