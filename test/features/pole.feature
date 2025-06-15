Feature: Pole
  Scenario: Moving the cursor on the grid shows the pole preview
    Given I have a scene with:
      | TYPE   | ID       | GRIDPOS |
      | pole-1 | pole-1-1 | 5,0     |
      | pole-1 | pole-1-2 | 5,5     |
    And I set next uuids to:
      | UUID      | TYPE    |
      | cable-1-1 | cable-1 |
      | cable-1-2 | cable-1 |
      | cable-1-3 | cable-1 |
      | cable-1-4 | cable-1 |
    When I select tool 'select'
    And I move pointer to grid position '1,1'
    And I press pointer
    And I hover over block 'pole-1-1'
    And I press pointer
    And I execute action 'join-cable-action'
    And I move pointer to grid position '5,1'
    And I wait block 'cable-1-1' to exist
    Then I have cables with properties
      | CABLE     | END1                | END2     |
      | cable-1-1 | block:pole-1-1,L1 | grid:5,1 |
      | cable-1-2 | block:pole-1-1,L2 | grid:5,1 |
      | cable-1-3 | block:pole-1-1,L3 | grid:5,1 |
      | cable-1-4 | block:pole-1-1,N  | grid:5,1 |
    When I move pointer to grid position '5,2'
    Then I have cables with properties
      | CABLE     | END1                | END2     |
      | cable-1-1 | block:pole-1-1,L1 | grid:5,2 |
      | cable-1-2 | block:pole-1-1,L2 | grid:5,2 |
      | cable-1-3 | block:pole-1-1,L3 | grid:5,2 |
      | cable-1-4 | block:pole-1-1,N  | grid:5,2 |
    When I move pointer to grid position '5,5'
    Then I have cables with properties
      | CABLE     | END1                | END2                |
      | cable-1-1 | block:pole-1-1,L1 | block:pole-1-2,L1 |
      | cable-1-2 | block:pole-1-1,L2 | block:pole-1-2,L2 |
      | cable-1-3 | block:pole-1-1,L3 | block:pole-1-2,L3 |
      | cable-1-4 | block:pole-1-1,N  | block:pole-1-2,N  |

  Scenario: Moving the cursor between empty tile and tile with house changes preview style 
    Given I have a scene with:
      | TYPE              | ID        | GRIDPOS |
      | pole-1            | pole-1-1  | 5,0     |
      | two-story-house-1 | house-1-1 | 6,0     |
    And I set next uuids to:
      | UUID             | TYPE                  |
      | cable-1-1        | cable-1               |
      | cable-1-2        | cable-1               |
      | cable-1-3        | cable-1               |
      | cable-1-4        | cable-1               |
      | cable-1-5        | cable-1               |
      | weather-head-1-1 | weather-head-1        |
    When I select tool 'select'
    And I hover over block 'pole-1-1'
    And I press pointer
    And I execute action 'join-cable-action'
    And I move pointer to grid position '5,5'
    And I wait mesh 'cable-1-1' to exist
    Then I have cables with properties
      | CABLE     | END1              | END2     |
      | cable-1-1 | block:pole-1-1,L1 | grid:5,5 |
      | cable-1-2 | block:pole-1-1,L2 | grid:5,5 |
      | cable-1-3 | block:pole-1-1,L3 | grid:5,5 |
      | cable-1-4 | block:pole-1-1,N  | grid:5,5 |
    When I move pointer to grid position '6,0'
    And I wait mesh 'cable-1-5' to exist
    Then I have cables with properties
      | CABLE     | END1                             | END2                               |
      | cable-1-5 | block:pole-1-1,TransformerHolder | block:weather-head-1-1,CableAnchor |
    When I select tool 'add'
    And I wait block 'cable-1-5' not to exist  
    Then my current scene is
      | BLOCK     | TYPE              |
      | pole-1-1  | pole-1            |
      | house-1-1 | two-story-house-1 |

  Scenario: Exiting cabling tool removes the cable previews
    Given I have a scene with:
      | TYPE   | ID       | PARENT | GRIDPOS |
      | pole-1 | pole-1-1 | -      | 5,0     |
    When I select tool 'select'
    And I set next uuids to:
      | UUID      | TYPE    |
      | cable-1-1 | cable-1 |
      | cable-1-2 | cable-1 |
      | cable-1-3 | cable-1 |
      | cable-1-4 | cable-1 |
    And I hover over block 'pole-1-1'
    And I press pointer
    And I execute action 'join-cable-action'
    And I move pointer to grid position '5,1'
    And I wait block 'cable-1-1' to exist
    Then my current scene is
      | BLOCK     | TYPE    |
      | pole-1-1  | pole-1  |
      | cable-1-1 | cable-1 |
      | cable-1-2 | cable-1 |
      | cable-1-3 | cable-1 |
      | cable-1-4 | cable-1 |
    When I select tool 'add'
    And I wait block 'cable-1-1' not to exist
    Then my current scene is
      | BLOCK     | TYPE    |
      | pole-1-1  | pole-1  |

  Scenario: Submitting cabling action makes connection to another poles
    Given I have a scene with:
      | TYPE   | ID       | PARENT | GRIDPOS |
      | pole-1 | pole-1-1 | -      | 5,0     |
      | pole-1 | pole-1-2 | -      | 6,0     |
    When I select tool 'select'
    And I set next uuids to:
      | UUID      | TYPE    |
      | cable-1-1 | cable-1 |
      | cable-1-2 | cable-1 |
      | cable-1-3 | cable-1 |
      | cable-1-4 | cable-1 |
    And I hover over block 'pole-1-1'
    And I press pointer
    And I execute action 'join-cable-action'
    And I move pointer to grid position '6,0'
    And I wait mesh 'cable-1-1' to exist
    Then I have cables with properties
      | CABLE     | END1              | END2              |
      | cable-1-1 | block:pole-1-1,L1 | block:pole-1-2,L1 |
      | cable-1-2 | block:pole-1-1,L2 | block:pole-1-2,L2 |
      | cable-1-3 | block:pole-1-1,L3 | block:pole-1-2,L3 |
      | cable-1-4 | block:pole-1-1,N  | block:pole-1-2,N  |
    And I press pointer
    When I select tool 'add'
    Then my current scene is
      | BLOCK     | TYPE    |
      | pole-1-1  | pole-1  |
      | pole-1-2  | pole-1  |
      | cable-1-1 | cable-1 |
      | cable-1-2 | cable-1 |
      | cable-1-3 | cable-1 |
      | cable-1-4 | cable-1 |

  Scenario: Submitting cabling action makes connection to a house
    Given I have a scene with:
      | TYPE              | ID        | GRIDPOS |
      | pole-1            | pole-1-1  | 5,0     |
      | two-story-house-1 | house-1-1 | 6,0     |
    When I select tool 'select'
    And I set next uuids to:
      | UUID             | TYPE           |
      | cable-1-1        | cable-1        |
      | weather-head-1-1 | weather-head-1 |
    And I hover over block 'pole-1-1'
    And I press pointer
    And I execute action 'join-cable-action'
    And I move pointer to grid position '6,0'
    And I wait mesh 'cable-1-1' to exist
    And I press pointer
    And I select tool 'add'
    Then my current scene is
      | BLOCK            | TYPE              |
      | pole-1-1         | pole-1            |
      | house-1-1        | two-story-house-1 |
      | weather-head-1-1 | weather-head-1    |
      | cable-1-1        | cable-1           |

  # Scenario: Adding a pole auto-rotates it to align with the neigbours
  #   Given I have a scene with:
  #     | TYPE   | ID       | PARENT | POS    |
  #     | pole-1 | pole-1-1 | -      | 1,0,0  |
  #     | pole-1 | pole-1-2 | -      | 10,0,0 |
  #   And I wait block 'cable-1-1' to exist
  #   And I wait block 'cable-1-2' to exist
  #   And I wait block 'cable-1-3' to exist
  #   Then I have blocks with properties
  #     | BLOCK    | ROTATION |
  #     | pole-1-1 | 0,0,0    |
  #     | pole-1-2 | 0,0,0    |
  #   When I select tool 'add'
  #   And I select template 'pole-1'
  #   And I set next uuids to:
  #     | UUID     | TYPE     |
  #     | pole-1-3  | pole-1  |
  #     | cable-1-x | cable-1 |
  #     | cable-1-y | cable-1 |
  #     | cable-1-z | cable-1 |
  #   And I move pointer to '10,0,10'
  #   And I press pointer
  #   And I wait block 'pole-1-3' to exist
  #   Then I have blocks with properties
  #     | BLOCK    | POSITION    |
  #     | pole-1-3 | 6.28,0,6.32 |
  #   And I wait block 'cable-1-x' to exist
  #   Then I have blocks with properties
  #     | BLOCK    | ROTATION    |
  #     | pole-1-1 | 0,0,0       |
  #     | pole-1-2 | 0,-45,0     |
  #     | pole-1-3 | 0,-90,0     |

  Scenario: Drawing preview cables and then finalizing it
    Given I have a scene with:
      | TYPE   | ID       | GRIDPOS |
      | pole-1 | pole-1-1 | 5,0     |
      | pole-1 | pole-1-2 | 6,0     |
    When I select tool 'cable'
    And I select template 'cable-1'
    And I move pointer to grid position '5,0'
    And I press pointer
    And I move pointer to grid position '6,0'
    And I wait mesh 'cable-1-1' to exist
    Then my current scene contains
      | BLOCK     | TYPE    | IS_PREVIEW |
      | cable-1-1 | cable-1 | true       |
      | cable-1-2 | cable-1 | true       |
      | cable-1-3 | cable-1 | true       |
      | cable-1-4 | cable-1 | true       |
    And I release pointer
    And I click finish in cable drawing panel
    Then my current scene contains
      | BLOCK     | TYPE    | IS_PREVIEW |
      | cable-1-1 | cable-1 | false      |
      | cable-1-2 | cable-1 | false      |
      | cable-1-3 | cable-1 | false      |
      | cable-1-4 | cable-1 | false      |
      
  Scenario: Removing a pole removes the associated cables as well
    Given I have a scene with:
      | TYPE   | ID       | GRIDPOS |
      | pole-1 | pole-1-1 | 5,0     |
      | pole-1 | pole-1-2 | 6,0     |
      | pole-1 | pole-1-3 | 7,0     |
    When I select tool 'cable'
    And I select template 'cable-1'
    And I move pointer to grid position '5,0'
    And I press pointer
    And I move pointer to grid position '6,0'
    And I wait mesh 'cable-1-1' to exist
    And I release pointer
    And I click finish in cable drawing panel
    When I select tool 'cable'
    And I select template 'cable-1'
    And I move pointer to grid position '7,0'
    And I press pointer
    And I move pointer to grid position '6,0'
    And I wait mesh 'cable-1-5' to exist
    And I release pointer
    And I click finish in cable drawing panel
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
      | cable-1-7 | cable-1 |
      | cable-1-8 | cable-1 |
    When I select tool 'erase'
    And I hover over block 'pole-1-1'
    And I press pointer
    Then my current scene is
      | BLOCK     | TYPE    |
      | pole-1-2  | pole-1  |
      | pole-1-3  | pole-1  |
      | cable-1-5 | cable-1 |
      | cable-1-6 | cable-1 |
      | cable-1-7 | cable-1 |
      | cable-1-8 | cable-1 |
    And I hover over block 'pole-1-2'
    And I press pointer
    Then my current scene is
      | BLOCK     | TYPE    |
      | pole-1-3  | pole-1  |

  Scenario: Adding a transformer to a pole
    Given I have a scene with:
      | TYPE   | ID       | PARENT | POS   |
      | pole-2 | pole-2-1 | -      | 1,0,0 |
    And I set next uuids to:
        | UUID          | TYPE                              |
        | transformer-1 | pole-mounted-transformer-1 |
    When I select tool 'add'
    And I select template 'pole-mounted-transformer-1'
    And I hover over block 'pole-2-1' and part 'TransformerHolder'
    And I press pointer
    And I wait mesh 'transformer-1' to exist
    And my current scene is
      | BLOCK         | TYPE                       | POSITION                                         |
      | pole-2-1      | pole-2                     | -1.22, 0, -1.17                                  |
      | transformer-1 | pole-mounted-transformer-1 | pole-2-1:TransformerHolder->transformer-1:Holder |







