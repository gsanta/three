Feature: Building
  Scenario: Adding walls to a building
    Given I have a building base with id 'base-1'
    When I select tool 'add'
    And I hover over block 'base-1' and part '#2'
    And I select template 'wall-1'
    And I set next uuid to 'wall-1'
    And I press pointer
    Then parent for block 'wall-1' is 'base-1'
    And block 'wall-1' is in slot '#2' of block 'base-1'
    When I hover over block 'base-1' and part '#3'
    And I set next uuid to 'wall-2'
    And I press pointer
    Then parent for block 'wall-2' is 'base-1'
    And block 'wall-2' is in slot '#3' of block 'base-1'

  Scenario: Removing walls from a building
    Given I have a building base with id 'base-1'
    When I select tool 'add'
    And I hover over block 'base-1' and part '#2'
    And I select template 'wall-1'
    And I set next uuid to 'wall-1'
    And I press pointer
    And I select tool 'erase'
    And I press pointer over block 'wall-1'
    Then block 'base-1' does not have a child 'wall-1'
    And block 'wall-1' does not exist
    And block 'wall-1' is not in slot '#2' of block 'base-1'








