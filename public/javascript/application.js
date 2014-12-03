$(function() {

  // See: http://docs.jquery.com/Tutorials:Introducing_$(document).ready()
  $('#populateContacts').on('click', contactsHandler.getContacts);
  $('#addNewContactButton').on('click', function(){
    $('#addNewContactFormContainer').show();
  });

  $('#addNewContactForm').on('submit', function(e){
    e.preventDefault();
    var data = $('#addNewContactForm').serializeArray();
    contactsHandler.addContact(data);
  });

  $('#searchContactForm').on('submit', function(e){
    e.preventDefault();
    var data = $('#searchContactForm').serializeArray();
    contactsHandler.searchContact(data);
  })

});
