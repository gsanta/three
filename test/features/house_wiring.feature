Feature: House wiring
  Scenario: Wiring a house
    Given I have a scene with:
      | TYPE            | ID        | PARENT          | POS   |
      | building-base-1 | base-1-id | -               | 1,3,0 |
      | wall-1          | wall-4-id | base-1-id:wall4 | -     |
      | wall-1          | wall-3-id | base-1-id:wall3 | -     |
    When I select tool 'cable'
    And I press pointer over block 'wall-4-id'
    Then Editor mode is 'wiring'
    When I set next uuid to 'cable-1-id'
    And I have an intersection with:
      | BLOCK     | PART  | B_BOX_CENTER |
      | wall-4-id | root  | 1.5,1.7,3.5  |
    And I press pointer over block 'base-1-id'
    And I have an intersection with:
      | BLOCK     | PART        | B_BOX_CENTER |
      | base-1-id | wall-join-2 | 5,1.7,3.5    |
    And I press pointer over block 'base-1-id'
    And I have an intersection with:
      | BLOCK     | PART        | B_BOX_CENTER |
      | wall-3-id | root        | 5,1.7,2      |
    And I press pointer over block 'wall-3-id'
    Then Points for cable 'cable-1-id' are:
      | WORLD_POS     | BLOCK     |
      | 1.5,1.7,3.5   | wall-4-id |
      | 5,1.7,3.5     | base-1-id |
      | 5,1.7,2       | wall-3-id |

  Scenario: Deleting walls with wire
    Given I have a scene with:
      | TYPE            | ID        | PARENT          | POS   |
      | building-base-1 | base-1-id | -               | 1,3,0 |
      | wall-1          | wall-4-id | base-1-id:wall4 | -     |
      | wall-1          | wall-3-id | base-1-id:wall3 | -     |
    And I have a cable for house 'base-1-id' with cable id 'cable-1-id':
      | WORLD_POS   | BLOCK     | PART        |
      | 1.5,1.7,3.5 | wall-4-id | root        |
      | 5,1.7,3.5   | base-1-id | wall-join-2 |
      | 5,1.7,2     | wall-3-id | root        |
      | 5,1.7,1     | base-1-id | wall-join-3 |
    When I select tool 'erase'
    And I press pointer over block 'wall-3-id'
    Then block 'cable-1-id' does not exist

  Scenario: Deleting house with wire
    Given I have a scene with:
      | TYPE            | ID        | PARENT          | POS   |
      | building-base-1 | base-1-id | -               | 1,3,0 |
      | wall-1          | wall-4-id | base-1-id:wall4 | -     |
      | wall-1          | wall-3-id | base-1-id:wall3 | -     |
    And I have a cable for house 'base-1-id' with cable id 'cable-1-id':
      | WORLD_POS   | BLOCK     | PART        |
      | 1.5,1.7,3.5 | wall-4-id | root        |
      | 5,1.7,3.5   | base-1-id | wall-join-2 |
      | 5,1.7,2     | wall-3-id | root        |
      | 5,1.7,1     | base-1-id | wall-join-3 |
    When I select tool 'erase'
    And I press pointer over block 'base-1-id'
    Then block 'cable-1-id' does not exist
