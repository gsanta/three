#pragma once

#include <iomanip>
#include <sstream>

#define COLOR_RED 0xff0000ff
#define COLOR_GREEN 0xff00ff00
#define COLOR_BLUE 0xffff0000
#define COLOR_YELLOW 0xff00ffff
#define COLOR_SPRIGHT_ORANGE 0xFF266CCE

#define COLOR_DARK_GREY 0Xff787878
#define COLOR_LIGHT_GREY 0XffE0E0E0

template <typename T>
inline std::string int_to_hex(T i)
{
    std::stringstream stream;
    stream << "0x" << std::setfill('0') << std::setw(sizeof(T) * 2) << std::hex << i;
    return stream.str();
}
