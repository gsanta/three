Feature: Grid
  Scenario: Having a seen with blocks based on grid pos
    Given I have a scene with:
      | TYPE   | ID       | PARENT | GRIDINDEX |
      | pole-1 | pole-1   | -      | 10        |
    Then the current grid scene is:
      | BLOCK  | GRIDINDEX |
      | pole-1 | 10        |

  Scenario: Adding a block sets the grid properties
    When I select tool 'add'
    And I select template 'two-story-house-1'
    And I set next uuids to:
      | UUID    | TYPE              |
      | house-1 | two-story-house-1 |
    And I move pointer to grid position '5,5'
    And I press pointer
    Then the current grid scene is:
      | BLOCK   | GRIDPOS |
      | house-1 | 5,5     |

  @only
  Scenario: Deleting a block removes the grid properties
    Given I have a scene with:
      | TYPE   | ID     | PARENT | GRIDINDEX |
      | pole-1 | pole-1 | -      | 10        |
    When I select tool 'erase'
    And I hover over block 'pole-1'
    And I press pointer
    Then the grid at index '10' is empty
