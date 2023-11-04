#include "uuid_generator.h"

namespace spright
{
namespace engine
{

    UuidGenerator &UuidGenerator::getInstance()
    {
        static UuidGenerator instance;

        return instance;
    }

    UuidGenerator::UuidGenerator()
    {
        auto seed_data = std::array<int, 6>{};
        std::generate(std::begin(seed_data), std::end(seed_data), std::ref(m_RandomDevice));
        std::seed_seq seq(std::begin(seed_data), std::end(seed_data));
        m_Generator = std::ranlux48_base(seq);

        m_Gen.reset(new uuids::basic_uuid_random_generator<std::ranlux48_base>(m_Generator));
    }


    std::string UuidGenerator::generate()
    {
        return uuids::to_string((*m_Gen)());
    }
} // namespace engine
} // namespace spright
