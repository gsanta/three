Feature: Erase
  Scenario: Erasing a selected block
    Given I have canvas with a block 'road-1'
    When I select a block at position 0,0,0
    And I examine block at 0,0,0
    Then block 'examined' is selected
    When I select tool 'erase'
    And I press pointer at 0,0,0
    Then no blocks are selected
