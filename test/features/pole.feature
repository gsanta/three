Feature: Pole
  Scenario: Adding a pole joins it to the nearest pole
    Given I have a scene with:
      | TYPE   | ID       | PARENT | POS   |
      | pole-1 | pole-1-1 | -      | 1,0,0 |
    When I select tool 'add'
    And I select template 'pole-1'
    And I set next uuids to:
      | UUID      | TYPE    |
      | pole-1-2  | pole-1  |
      | cable-1-1 | cable-1 |
      | cable-1-2 | cable-1 |
      | cable-1-3 | cable-1 |
    And I move pointer to '5,0,0'
    And I press pointer
    Then I have blocks with properties
      | BLOCK    | POSITION     |
      | pole-1-2 | 6.28,0,-1.17 |
    And I wait block 'cable-1-1' to exist
    Then I have cables with properties
      | CABLE     | PARENT   | POSITION      |
      | cable-1-1 | pole-1-1 | pole-1-1:Pin1 |
      | cable-1-1 | pole-1-2 | pole-1-2:Pin1 |
      | cable-1-2 | pole-1-1 | pole-1-1:Pin2 |
      | cable-1-2 | pole-1-2 | pole-1-2:Pin2 |
      | cable-1-3 | pole-1-1 | pole-1-1:Pin3 |
      | cable-1-3 | pole-1-2 | pole-1-2:Pin3 |

  Scenario: Adding a pole auto-rotates it to align with the neigbours
    Given I have a scene with:
      | TYPE   | ID       | PARENT | POS    |
      | pole-1 | pole-1-1 | -      | 1,0,0  |
      | pole-1 | pole-1-2 | -      | 10,0,0 |
    And I wait block 'cable-1-1' to exist
    And I wait block 'cable-1-2' to exist
    And I wait block 'cable-1-3' to exist
    Then I have blocks with properties
      | BLOCK    | ROTATION |
      | pole-1-1 | 0,0,0    |
      | pole-1-2 | 0,0,0    |
    When I select tool 'add'
    And I select template 'pole-1'
    And I set next uuids to:
      | UUID     | TYPE     |
      | pole-1-3  | pole-1  |
      | cable-1-x | cable-1 |
      | cable-1-y | cable-1 |
      | cable-1-z | cable-1 |
    And I move pointer to '10,0,10'
    And I press pointer
    And I wait block 'pole-1-3' to exist
    Then I have blocks with properties
      | BLOCK    | POSITION    |
      | pole-1-3 | 6.28,0,6.32 |
    And I wait block 'cable-1-x' to exist
    Then I have blocks with properties
      | BLOCK    | ROTATION    |
      | pole-1-1 | 0,0,0       |
      | pole-1-2 | 0,-45,0     |
      | pole-1-3 | 0,-90,0     |

  Scenario: Removing a pole removes the associated cables as well
    Given I set next uuids to:
      | UUID      | TYPE    |
      | cable-1-1 | cable-1 |
      | cable-1-2 | cable-1 |
      | cable-1-3 | cable-1 |
      | cable-1-4 | cable-1 |
      | cable-1-5 | cable-1 |
      | cable-1-6 | cable-1 |
    And I have a scene with:
      | TYPE   | ID       | POS      |
      | pole-1 | pole-1-1 | 0,0.1,5  |
      | pole-1 | pole-1-2 | 0,0.1,15 |
      | pole-1 | pole-1-3 | 0,0.1,25 |
    Then my current scene is
      | BLOCK     | TYPE    | 
      | pole-1-1  | pole-1  |
      | pole-1-2  | pole-1  |
      | pole-1-3  | pole-1  |
      | cable-1-1 | cable-1 |
      | cable-1-2 | cable-1 |
      | cable-1-3 | cable-1 |
      | cable-1-4 | cable-1 |
      | cable-1-5 | cable-1 |
      | cable-1-6 | cable-1 |
    When I select tool 'erase'
    And I press pointer at 0,0.1,5
    Then block at 0,0.1,5 does not exist
    And my current scene is
      | BLOCK     | TYPE    |
      | pole-1-2  | pole-1  |
      | pole-1-3  | pole-1  |
      | cable-1-4 | cable-1 |
      | cable-1-5 | cable-1 |
      | cable-1-6 | cable-1 |
    When I press pointer at 0,0.1,10
    Then block at 0,0.1,10 does not exist
    And my current scene is
      | BLOCK     | TYPE    |
      | pole-1-3  | pole-1  |

  # Scenario: Moving a pole joined to two other poles, moves the cables as well
  #   Given I set next uuids to:
  #     | UUID      | TYPE    |
  #     | cable-1-1 | cable-1 |
  #     | cable-1-2 | cable-1 |
  #     | cable-1-3 | cable-1 |
  #     | cable-1-4 | cable-1 |
  #     | cable-1-5 | cable-1 |
  #     | cable-1-6 | cable-1 |
  #   And I have a scene with:
  #     | TYPE   | ID       | POS      |
  #     | pole-1 | pole-1-1 | 0,0.1,5  |
  #     | pole-1 | pole-1-2 | 0,0.1,10 |
  #     | pole-1 | pole-1-3 | 0,0.1,15 |
  #   When I select tool 'select'
  #   And I hover over block 'pole-1-2'
  #   And I press pointer
  #   And I drag pointer with delta '0,0,3'
  #   And I end drag
  #   And I wait for dirty blocks to update
  #   Then I have block 'pole-1-2' at estimated position ' 0,0.1,13'
  #   Then I have cables with properties
  #     | CABLE     | PARENT   | POSITION      |
  #     | cable-1-1 | pole-1-2 | pole-1-2:Pin1 |
  #     | cable-1-2 | pole-1-2 | pole-1-2:Pin2 |
  #     | cable-1-3 | pole-1-2 | pole-1-2:Pin3 |
  #     | cable-1-4 | pole-1-2 | pole-1-2:Pin1 |
  #     | cable-1-5 | pole-1-2 | pole-1-2:Pin2 |
  #     | cable-1-6 | pole-1-2 | pole-1-2:Pin3 |

  Scenario: Adding a transformer to a pole
    Given I have a scene with:
      | TYPE   | ID       | PARENT | POS   |
      | pole-1 | pole-1-1 | -      | 1,0,0 |
    And I set next uuids to:
        | UUID          | TYPE                              |
        | transformer-1 | distribution-transformer-single-1 |
    When I select tool 'add'
    And I select template 'distribution-transformer-single-1'
    And I hover over block 'pole-1-1' and part 'Pin4'
    And I press pointer
    And I wait mesh 'transformer-1' to exist
    And my current scene is
      | BLOCK         | TYPE                                | POSITION                          |
      | pole-1-1      | pole-1                              | -1.22, 0, -1.17                   |
      | transformer-1 | distribution-transformer-single-1   | pole-1-1:Pin4->transformer-1:Join |







