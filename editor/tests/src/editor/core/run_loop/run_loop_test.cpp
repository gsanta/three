#include "../src/editing/utils/run_loop/run_loop.h"
#include "../src/editing/utils/run_loop/test_timer.h"
#include "timed_mock.h"

#include <catch2/catch_test_macros.hpp>
#include <catch2/matchers/catch_matchers.hpp>

using namespace spright::editing;

TEST_CASE("RunLoop", "[run_loop]")
{
    SECTION("can add/remove timed objects")
    {
        TestTimer timer;
        RunLoop runLoop(&timer);

        TimedMock timed1(1);
        TimedMock timed2(2);
        runLoop.add(timed1);

        REQUIRE(runLoop.has(timed1) == true);
        REQUIRE(runLoop.has(timed2) == false);

        runLoop.remove(timed1);

        REQUIRE(runLoop.has(timed1) == false);

        REQUIRE_THROWS_WITH(runLoop.remove(timed1), "Failed to remove timed, not found");
    }
}
