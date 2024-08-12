Feature: House
  Scenario: Adding walls to a house
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

  Scenario: Removing walls from a house
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
    And slot '#2' of block 'base-1' is not occupied

  Scenario: Adding a device to floor
    Given I have a scene with:
      | TYPE            | ID        | PARENT          | POS   |
      | building-base-1 | base-1-id | -               | 1,3,0 |
      | wall-1          | wall-4-id | base-1-id:wall4 | -     |
      | wall-1          | wall-3-id | base-1-id:wall3 | -     |
    When I select tool 'add'
    And I select template 'washing-machine-1'
    And I set next uuid to 'washing-machine-id-1'
    And I press pointer over block 'base-1-id' and part 'floor' at position '1.5,3,0'
    Then I have a block 'washing-machine-id-1' with properties
      | PARENT    | POSITION |
      | base-1-id | 0.5,0,0  |

  Scenario: Removing a device from floor
    Given I have a scene with:
      | TYPE              | ID        | PARENT          | POS     |
      | building-base-1   | base-1-id | -               | 1,3,0   |
      | wall-1            | wall-4-id | base-1-id:wall4 | -       |
      | wall-1            | wall-3-id | base-1-id:wall3 | -       |
      | washing-machine-1 | wm-1-id   | base-1-id:floor  | 1.5,3,0 |
    And I select tool 'erase'
    And I press pointer over block 'wm-1-id'
    Then block 'base-1-id' does not have a child 'wm-1-id'
    Then block 'wm-1-id' does not exist









