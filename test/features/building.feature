Feature: Building
  Scenario: Adding walls to a building
    Given I have a building base with id 'base-1'
    When I select a block at position 0,0,0 with part '#2'
    And I add template 'wall-1' with id 'wall-1' to the selected part
    Then parent for block 'wall-1' is 'base-1'
    And block 'wall-1' is in slot '#2' of block 'base-1'
    When I select a block at position 0,0,0 with part '#3'
    And I add template 'wall-1' with id 'wall-2' to the selected part
    Then parent for block 'wall-2' is 'base-1'
    And block 'wall-2' is in slot '#3' of block 'base-1'

  Scenario: Removing walls from a building
    Given I have a building base with id 'base-1'
    When I select a block at position 0,0,0 with part '#2'
    And I add template 'wall-1' with id 'wall-1' to the selected part
    And I select tool 'erase'
    And I press pointer over block 'wall-1'
    Then block 'base-1' does not have a child 'wall-1'
    And block 'wall-1' does not exist
    And block 'wall-1' is not in slot '#2' of block 'base-1'








