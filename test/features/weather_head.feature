Feature: Weather head
  Scenario: Adding a weather head to a house
    Given I have a scene with:
      | TYPE            | ID        | PARENT       | POS   |
      | building-base-1 | base-1-id | -            | 1,3,0 |
      | roof-1          | roof-1-id | base-1-id:#6 | -     |
    When I select tool 'add'
    And I select template 'weather-head-1'
    And I hover over block 'roof-1-id' and part '#2'
    And I press pointer over block 'roof-1-id' and part '#2' at 5,2,1
    Then I have a block 'weather-head-1' at estimated position 4,-1,1

  @important
  Scenario: Adding a weather head to a house
    Given I have a scene with:
      | TYPE            | ID        | PARENT       | POS             |
      | building-base-1 | base-1-id | -            | 1,0,3           |
      | roof-1          | roof-1-id | base-1-id:#6 | -               |
      | weather-head-1  | wh-1-id   | base-1-id    | roof-1-id:1,0,0 |
    When I select tool 'add'
    And I select template 'weather-head-1'
    And I hover over block 'roof-1-id' and part '#2'
    And I press pointer over block 'roof-1-id' and part '#2' at 5,2,1
    Then I have a block 'weather-head-1' at estimated position 4,-1,1

