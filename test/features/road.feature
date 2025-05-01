Feature: Road
  #    _ ___ _
  # 3 /   2   \3
  # 1|        |1 
  # 1|
  @only
  Scenario: Attaching road segments to each other
    Given I have a scene with:
      | TYPE   | ID       | PARENT | POS   |
      | road-1 | road-1-1 | -      | 5,0,0 |
    When I select tool 'add'
    And I set next uuids to:
      | UUID     | TYPE   |
      | road-1-2 | road-1 |
      | road-3-1 | road-3 |
      | road-2-1 | road-2 |
      | road-3-2 | road-3 |
      | road-1-3 | road-1 |
    And I select template 'road-1'
    And I hover over block 'road-1-1' and part 'EndNorth'
    And I press pointer
    And I wait mesh 'road-1-2' to exist
    And I select template 'road-3'
    And I hover over block 'road-1-2' and part 'EndNorth'
    And I press pointer
    And I wait mesh 'road-3-1' to exist
    And I select template 'road-2'
    And I hover over block 'road-3-1' and part 'EndNorth'
    And I press pointer
    And I wait mesh 'road-2-1' to exist
    And I select template 'road-3'
    And I hover over block 'road-2-1' and part 'EndEast'
    And I press pointer
    And I wait mesh 'road-3-2' to exist
    And I select template 'road-1'
    And I hover over block 'road-3-2' and part 'EndNorth'
    And I press pointer
    And I wait mesh 'road-1-3' to exist
    Then my current scene is
      | BLOCK    | TYPE   | POSITION                             |
      | road-1-1 | road-1 | 5,0,0                                |
      | road-1-2 | road-1 | road-1-1:EndNorth->road-1-2:EndSouth |
      | road-3-1 | road-3 | road-1-2:EndNorth->road-3-1:EndSouth |
      | road-2-1 | road-2 | road-3-1:EndNorth->road-2-1:EndWest  |
      | road-3-2 | road-3 | road-2-1:EndEast->road-3-2:EndSouth |
      | road-1-3 | road-1 | road-3-2:EndNorth->road-1-3:EndNorth |
