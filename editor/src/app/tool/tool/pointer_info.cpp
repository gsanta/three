#include "pointer_info.h"

namespace spright
{
namespace editor
{

    PointerInfo::PointerInfo() : buttons{false, false, false}
    {
    }

    bool PointerInfo::isLeftButtonDown() const
    {
        return buttons[0];
    }

    bool PointerInfo::isRightButtonDown() const
    {
        return buttons[1];
    }

    bool PointerInfo::isMiddleButtonDown() const
    {
        return buttons[2];
    }

} // namespace editor
} // namespace spright
