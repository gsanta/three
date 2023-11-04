#pragma once

#include "uuid.h"

#include <iostream>

namespace spright
{
namespace engine
{
    class UuidGenerator
    {
    public:
        static UuidGenerator &getInstance();

        UuidGenerator(const UuidGenerator &) = delete;

        void operator=(const UuidGenerator &) = delete;

        std::string generate();

    private:
        UuidGenerator();

    private:
        std::random_device m_RandomDevice;

        std::ranlux48_base m_Generator;

        std::unique_ptr<uuids::basic_uuid_random_generator<std::ranlux48_base>> m_Gen;
    };
} // namespace engine
} // namespace spright
