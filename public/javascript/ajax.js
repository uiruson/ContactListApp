var contactsHandler = {
  getContacts: function(){
    $.getJSON('/contacts', contactsHandler.populateContacts);
  },
  populateContacts: function(data){
    var table = $('.contactListTable').find('tbody').empty();
    $.each(data, function(index, user){
      var tr = $("<tr>").appendTo(table);
      $("<td>").text(user.firstname).appendTo(tr);
      $("<td>").text(user.lastname).appendTo(tr);
      $("<td>").text(user.email).appendTo(tr);
      $("<td>").text(user.phone).appendTo(tr);
    });

    $('#contactList').removeClass('hide'); 
  },
  addContact: function(data){
    var newContact = {
      firstname: data[0].value,
      lastname: data[1].value,
      email: data[2].value,
      phone: data[3].value
    }
   
    $.post('/contacts/create', newContact, contactsHandler.addContactToList, 'json');
  },
  addContactToList: function(data){
    if (data.result){
      contactsHandler.getContacts();
      $('#addNewContactForm').addClass('hide');
      $('#successMessage').html("Successfully added new contact")
      setTimeout(function(){ 
         $('#successMessage').fadeOut();
         contactsHandler.getContacts;
      }, 8000);
    }else{
      $('#errorMessage').html("Error: " + data.error)
      setTimeout(function(){ 
         $('#errorMessage').fadeOut();
      }, 8000);
    }
  },
  searchContact: function(data){
    var searchKeyword = {
      keyword: data[0].value
    }
    $.post('/contacts/search', searchKeyword, contactsHandler.displaySearchResult, 'json');
  },
  displaySearchResult: function(data){
    console.log("I AM IN")
    if(data.result){
      console.log("data.searchresult.length = " + data.searchresult.length)
      var table = $('.searchResultTable').find('tbody').empty();
      $.each(data.searchresult, function(index, user){
        console.log("I am in again");
        console.log("user.firstname = "+ user.firstname);
        var tr = $("<tr>").appendTo(table);
        $("<td>").text(user.firstname).appendTo(tr);
        $("<td>").text(user.lastname).appendTo(tr);
        $("<td>").text(user.email).appendTo(tr);
        $("<td>").text(user.phone).appendTo(tr);
      });
      $('#searchResult').show()
      setTimeout(function(){ 
        $('#searchResult').fadeOut() 
      }, 5000);
     
    }else{
      $('#searchResult').show();
      $('#noMatchesMessage').html("" + data.error).show();
       setTimeout(function(){ 
         $('#searchResult').fadeOut() 
         $('#noMatchesMessage').fadeOut() 
       }, 5000);
    }
  }
};


