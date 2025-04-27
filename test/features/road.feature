# Feature: Road
#   Scenario: Snapping a road segment to another
#     Given I have an empty canvas
#     When I select tool 'add'
#     And I set next uuid to 'road-1-id'
#     And I select template 'road-1'
#     And I move pointer to '5,0,0'
#     And I press pointer
#     And I hover over block 'road-1-id' and part '#4'
#     And I press pointer
#     Then I have a block 'road-1' at estimated position 5,0.005,4
