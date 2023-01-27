#include "./my_lib.h"

std::uint32_t factorial(std::uint32_t number)
{
    return number <= 1 ? number : factorial(number - 1) * number;
}
