Feature: Lamp
  Scenario: A lamp is initially turned off
    Given I have an empty canvas
    When I select tool 'add'
    And I select template 'lamp-1'
    And I move pointer to 0,0.1,5
    And I press pointer
    And I examine block at 0,0.1,5
    Then The device 'examined' is turned 'off'
    And part '#3' of block 'examined' is hidden
    And part '#2' of block 'examined' is visible

  Scenario: A lamp can be turned on/off
    Given I have an empty canvas
    When I select tool 'add'
    And I select template 'lamp-1'
    And I move pointer to 0,0.1,5
    And I press pointer
    And I examine block at 0,0.1,5
    And I turn on device 'examined'
    Then The device 'examined' is turned 'on'
    And part '#3' of block 'examined' is visible
    And part '#2' of block 'examined' is hidden
    And I turn off device 'examined'
    Then The device 'examined' is turned 'off'
    And part '#3' of block 'examined' is hidden
    And part '#2' of block 'examined' is visible
