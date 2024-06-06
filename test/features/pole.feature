Feature: Pole
  Scenario: Joining poles with cables
    Given I have an empty canvas
    When I select tool 'add'
    And I select template 'pole-1'
    And I move pointer to 0,0.1,5
    And I press pointer
    And I move pointer to 0,0.1,10
    And I press pointer
    And I select tool 'select'
    And I press pointer at 0,0.1,5
    And I press pointer at 0,0.1,10
    And I select tool 'cable'
    And I execute tool
    And I examine block at 0,0.1,5
    Then cable for block 'examined' and pin '#2' ends at position 1.114,9.436,5.01
    And cable for block 'examined' and pin '#3' ends at position -0.475,9.436,5.01
    And cable for block 'examined' and pin '#4' ends at position -1.113,9.436,5.01
    When I examine block at 0,0.1,10
    Then cable for block 'examined' and pin '#2' ends at position 1.114,9.436,10.01
    And cable for block 'examined' and pin '#3' ends at position -0.475,9.436,10.01
    And cable for block 'examined' and pin '#4' ends at position -1.113,9.436,10.01

  Scenario: Removing a pole
    Given I have an empty canvas
    When I select tool 'add'
    And I select template 'pole-1'
    And I move pointer to 0,0.1,5
    And I press pointer
    And I move pointer to 0,0.1,10
    And I press pointer
    And I select tool 'select'
    And I press pointer at 0,0.1,5
    And I press pointer at 0,0.1,10
    And I select tool 'cable'
    And I execute tool
    When I select tool 'erase'
    And I press pointer at 0,0.1,5
    Then block at 0,0.1,5 does not exist
    When I examine block at 0,0.1,10
    Then pin 'pin1' of block 'examined' is empty
    Then pin 'pin2' of block 'examined' is empty
    Then pin 'pin3' of block 'examined' is empty



