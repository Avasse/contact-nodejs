Feature: User can remove the first contact
  As a user

  Scenario: User remove the first contact
    Given REMOVE The contact list is display
    When User clicks on remove button of the first contact
    Then The first contact is removed