Feature: Road
  @only
  Scenario: Snapping a road segment to another
    Given I have a scene with:
      | TYPE   | ID       | PARENT | POS   |
      | road-1 | road-1-1 | -      | 1,0,0 |
    When I select tool 'add'
    And I set next uuids to:
      | UUID     | TYPE   |
      | road-1-2 | road-1 |
      | road-3-1 | road-3 |
      | road-2-1 | road-2 |
    And I select template 'road-1'
    And I hover over block 'road-1-1' and part 'EndNorth'
    And I press pointer
    And I wait mesh 'road-1-2' to exist
    # Then my current scene is
    #   | BLOCK         | TYPE   | POSITION                             |
    #   | road-1-1      | road-1 | 1,0,0                                |
    #   | road-1-2      | road-1 | road-1-1:EndNorth->road-1-2:EndSouth |
    And I select template 'road-3'
    And I hover over block 'road-1-2' and part 'EndNorth'
    And I press pointer
    And I wait mesh 'road-3-1' to exist
    And I select template 'road-2'
    And I hover over block 'road-3-1' and part 'EndSouth'
    And I press pointer
    And I wait mesh 'road-2-1' to exist
    Then my current scene is
      | BLOCK    | TYPE   | POSITION                             |
      | road-1-1 | road-1 | 1,0,0                                |
      | road-1-2 | road-1 | road-1-1:EndNorth->road-1-2:EndNorth |
      | road-3-1 | road-3 | road-1-2:EndSouth->road-3-1:EndNorth |
      | road-2-1 | road-2 | road-3-1:EndSouth->road-2-1:EndNorth |
    # And I move pointer to '5,0,0'
    # And I press pointer
    # And I hover over block 'road-1-id' and part '#4'
    # And I press pointer
    # Then I have a block 'road-1' at estimated position 5,0.005,4
