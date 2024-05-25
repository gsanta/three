Feature: Road
  Scenario: Snapping a road segment to another
    Given I have an empty canvas
    When I add template 'road-1' at position 5,0,0
    And I select a block at position 5,0,0 with part 'end-south'
    And I add template 'road-1' to the selected part
    Then I have a block 'road-1' at estimated position 5,0.005,4
