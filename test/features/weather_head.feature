Feature: Weather head
  Scenario: Adding a weather head to a house
    Given I have a scene with:
      | TYPE            | ID        | PARENT       | POS   |
      | building-base-1 | base-1-id | -            | 1,3,0 |
      | roof-1          | roof-1-id | base-1-id:#6 | -     |
    When I select tool 'add'
    And I select template 'weather-head-1'
    And I hover over block 'roof-1-id' and part '#2'
    And I press pointer over block 'roof-1-id' and part '#2' at position '5,2,1'
    Then I have a block 'weather-head-1' at estimated position 4,-1,1

  @important
  Scenario: Connecting a weather head to a pole
    Given I have a scene with:
      | TYPE            | ID        | PARENT       | POS             |
      | building-base-1 | base-1-id | -            | 1,0,3           |
      | roof-1          | roof-1-id | base-1-id:#6 | -               |
      | weather-head-1  | wh-1-id   | base-1-id    | roof-1-id:1,0,0 |
      | pole-1          | pole-1-id | -            | 5,0,0           |
    When I select a block at position 0.9,3.4,0.04 with part '#2'
    And I select tool 'cable'
    And I store world position for part '#5' of block 'pole-1-id'
    And I move pointer to 'stored'
    And I press pointer over block 'pole-1-id' and part 'pin4' at position 'stored'
    Then cable for block 'pole-1-id' and pin '#5' ends at position 'stored'
    When I store world position for part '#2' of block 'wh-1-id'
    Then cable for block 'wh-1-id' and pin '#2' ends at position 'stored'

  Scenario: Erasing a weather head connected to a pole
    Given I have a scene with:
      | TYPE            | ID         | PARENT       | POS                   |
      | building-base-1 | base-1-id  | -            | 1,0,3                 |
      | roof-1          | roof-1-id  | base-1-id:#6 | -                     |
      | weather-head-1  | wh-1-id    | base-1-id    | roof-1-id:1,0,0       |
      | pole-1          | pole-1-id  | -            | 5,0,0                 |
      | cable-1         | cable-1-id | -            | wh-1-id#2:pole-1-id#5 |
    When I select tool 'erase'
    And I press pointer over block 'wh-1-id'
    Then block 'wh-1-id' does not exist
    And block 'cable-1-id' does not exist
    And pin '#5' of block 'pole-1-id' is empty

  Scenario: Erasing a pole connected to a weather head
    Given I have a scene with:
      | TYPE            | ID         | PARENT       | POS                   |
      | building-base-1 | base-1-id  | -            | 1,0,3                 |
      | roof-1          | roof-1-id  | base-1-id:#6 | -                     |
      | weather-head-1  | wh-1-id    | base-1-id    | roof-1-id:1,0,0       |
      | pole-1          | pole-1-id  | -            | 5,0,0                 |
      | cable-1         | cable-1-id | -            | pole-1-id#5:wh-1-id#2 |
    When I select tool 'erase'
    And I press pointer over block 'pole-1-id'
    Then block 'pole-1-id' does not exist
    And block 'cable-1-id' does not exist
    And pin '#2' of block 'wh-1-id' is empty

  Scenario: Moving a pole connected to a weather head
    Given I have a scene with:
      | TYPE            | ID         | PARENT       | POS                   |
      | building-base-1 | base-1-id  | -            | 1,0,3                 |
      | roof-1          | roof-1-id  | base-1-id:#6 | -                     |
      | weather-head-1  | wh-1-id    | base-1-id    | roof-1-id:1,0,0       |
      | pole-1          | pole-1-id  | -            | 5,0,0                 |
      | cable-1         | cable-1-id | -            | pole-1-id#5:wh-1-id#2 |
    When I select tool 'select'
    And I select a block at position 5,0,0
    And I drag pointer with delta '1,0,0'
    And I end drag
    And I store world position for part '#5' of block 'pole-1-id'
    Then cable for block 'pole-1-id' and pin '#5' ends at position 'stored'
