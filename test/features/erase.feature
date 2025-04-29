Feature: Erase
  @only
  Scenario: Erasing a selected block
    Given I have a scene with:
      | TYPE   | ID       | PARENT | POS   |
      | pole-1 | pole-1-1 | -      | 0,0,0 |
    When I select a block at position 0,0,0
    And I examine block at 0,0,0
    Then block 'examined' is selected
    When I select tool 'erase'
    And I press pointer at 0,0,0
    Then no blocks are selected
