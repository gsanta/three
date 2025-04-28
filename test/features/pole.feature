Feature: Pole
  Scenario: Adding a pole joins it to the nearest pole
    Given I have a scene with:
      | TYPE   | ID       | PARENT | POS   |
      | pole-1 | pole-1-1 | -      | 1,0,0 |
    When I select tool 'add'
    And I select template 'pole-1'
    And I set next uuids to:
      | UUID      |
      | pole-1-2  |
      | cable-1-1 |
      | cable-1-2 |
      | cable-1-3 |
    And I move pointer to '5,0,0'
    And I press pointer
    Then I have blocks with properties
      | BLOCK    | POSITION |
      | pole-1-2 | 5,0,0    |
    And I wait block 'cable-1-1' to exist
    Then I have cables with properties
      | CABLE     | PARENT   | POSITION          |
      | cable-1-1 | pole-1-1 | 0.087,7.154,0.011 |
      | cable-1-1 | pole-1-2 | 4.087,7.154,0.011 |
      | cable-1-2 | pole-1-1 | 0.622,7.154,0.011 |
      | cable-1-2 | pole-1-2 | 4.622,7.154,0.011 |
      | cable-1-3 | pole-1-1 | 1.865,7.154,0.011 |
      | cable-1-3 | pole-1-2 | 5.865,7.154,0.011 |

  @only
  Scenario: Adding a pole auto-rotates it to align with the neigbours
    Given I have a scene with:
      | TYPE   | ID       | PARENT | POS   |
      | pole-1 | pole-1-1 | -      | 1,0,0 |
      | pole-1 | pole-1-2 | -      | 5,0,0 |
    And I wait block 'cable-1-1' to exist
    Then I have blocks with properties
      | BLOCK    | ROTATION |
      | pole-1-1 | 0,0,0    |
      | pole-1-2 | 0,0,0    |
    When I select tool 'add'
    And I select template 'pole-1'
    And I set next uuids to:
      | UUID      |
      | pole-1-3  |
      | cable-1-x |
      | cable-1-y |
      | cable-1-z |
    And I move pointer to '5,0,5'
    And I press pointer
    Then I have blocks with properties
      | BLOCK    | POSITION |
      | pole-1-3 | 5,0,5 |
    And I wait block 'cable-1-x' to exist
    Then I have blocks with properties
      | BLOCK    | ROTATION |
      | pole-1-1 | 0,0,0    |
      | pole-1-2 | 0,0,0    |

  # Scenario: Joining poles with cables
  #   Given I have a scene with:
  #     | TYPE            | ID        | PARENT | POS   |
  #     | pole-1          | pole-1-1  | -      | 1,0,0 |
  #     | pole-1          | pole-1-2  | -      | 5,0,0 |
  #   When I select tool 'add'
  #   And I select template 'pole-1'
  #   And I set next uuids to: 'pole-1-3'
  #   And I move pointer to '10,0,0'
  #   And I press pointer
  #   Then I have a block 'pole-1-3' with properties
  #     | POSITION |
  #     | 10,0,0  |
    # And I select tool 'select'
    # And I press pointer at 0,0.1,5
    # And I press pointer at 0,0.1,10
    # And I select tool 'cable'
    # And I execute tool
    # And I examine block at 0,0.1,5
    # Then cable for block 'examined' and pin '#2' ends at position '-0.913,7.254,5.011'
    # And cable for block 'examined' and pin '#3' ends at position '-0.378,7.254,5.011'
    # And cable for block 'examined' and pin '#4' ends at position '0.865,7.254,5.01'
    # When I examine block at 0,0.1,10
    # Then cable for block 'examined' and pin '#2' ends at position '-0.913,7.254,10.011'
    # And cable for block 'examined' and pin '#3' ends at position '-0.378,7.254,10.011'
    # And cable for block 'examined' and pin '#4' ends at position '0.865,7.254,10.011'

  # Scenario: Removing a pole
  #   Given I have an empty canvas
  #   When I select tool 'add'
  #   And I select template 'pole-1'
  #   And I move pointer to '0,0.1,5'
  #   And I press pointer
  #   And I move pointer to '0,0.1,10'
  #   And I press pointer
  #   When I select tool 'erase'
  #   And I press pointer at 0,0.1,5
  #   Then block at 0,0.1,5 does not exist
  #   When I examine block at 0,0.1,10
  #   Then pin '#2' of block 'examined' is empty
  #   Then pin '#3' of block 'examined' is empty
  #   Then pin '#4' of block 'examined' is empty

  # Scenario: Moving a pole joined to two other poles
  #   Given I have a scene with:
  #     | TYPE            | ID         | POS                     |
  #     | pole-1          | pole-1-id  | 5,0,0                   |
  #     | pole-1          | pole-2-id  | 6,0,0                   |
  #     | pole-1          | pole-3-id  | 7,0,0                   |
  #     | cable-1         | cable-1-id | pole-1-id#2:pole-2-id#2 |
  #     | cable-1         | cable-2-id | pole-1-id#3:pole-2-id#3 |
  #     | cable-1         | cable-3-id | pole-1-id#4:pole-2-id#4 |
  #     | cable-1         | cable-4-id | pole-3-id#2:pole-2-id#2 |
  #     | cable-1         | cable-5-id | pole-3-id#3:pole-2-id#3 |
  #     | cable-1         | cable-6-id | pole-3-id#4:pole-2-id#4 |
  #   When I select tool 'select'
  #   And I select a block at position 100,0,0
  #   And I select a block at position 6,0,0
  #   And I drag pointer with delta '0,0,3'
  #   And I end drag
  #   And I wait for dirty blocks to update
  #   Then I have block 'pole-2-id' at estimated position '6,0,3'
  #   When I store world position for part '#2' of block 'pole-2-id'
  #   Then cable 'cable-1-id' ends at position 'stored'
  #   Then cable 'cable-4-id' ends at position 'stored'
  #   When I store world position for part '#3' of block 'pole-2-id'
  #   Then cable 'cable-2-id' ends at position 'stored'
  #   Then cable 'cable-5-id' ends at position 'stored'
  #   When I store world position for part '#4' of block 'pole-2-id'
  #   Then cable 'cable-3-id' ends at position 'stored'
  #   Then cable 'cable-6-id' ends at position 'stored'







