window.onload = function() 
{
    $(function()
    { 
        //alert("jQuery + DOM loaded."); 
    });
}


/* Toggle between adding and removing the "responsive" class to topnav when the user clicks on the icon */
function myFunction() {
    var x = document.getElementById("myTopnav");
    if (x.className === "topnav") {
      x.className += " responsive";
    } else {
      x.className = "topnav";
    }
  }


/***************************************************************************** SHOW PASSWORD BUTTON *****************/
function myClick() {
  var x = document.getElementById("password");
  if (x.type === "password") {
    x.type = "text";
  } else {
    x.type = "password";
  }
}



/***************************************************************************** CONTACT PAGE *****************/
function validateForm() {
  var fname = document.getElementById("fname").value;
  if (fname == "") {
      alert("Please enter first name");
      return false;
  }

  var lname = document.getElementById("lname").value;
  if (lname == "") {
      alert("Please enter last name");
      return false;
  }

  var email = document.getElementById("email").value;
  if (email == "") {
      alert("Email must be filled out");
      return false;
  }

  var country = document.getElementById("country").value;
  if (country == "") {
      alert("Country must be filled out");
      return false;
  }

  var message = document.getElementById("subject").value;
  if (message == "") {
      alert("Message must be filled out");
      return false;
  }

  submitContact(fname, lname, email, country, message);

  // Clear the form fields
  document.getElementById("fname").value = "";
  document.getElementById("lname").value = "";
  document.getElementById("email").value = "";
  document.getElementById("country").value = "";
  document.getElementById("subject").value = "";

  // Display a success message
  alert("Form submitted successfully!");

  return false;
}


/********************* */

function submitContact(fname, lname, email, country, message){

  jQuery.ajax(
    {
        url: '../contact/create',
        error: function(){
            console.log("OMG! This would never happen according to the functional consultant!");
        },
        success: function(response){  
            
        },
        data:{
          'fname':fname, 'lname':lname, 'email':email, 'country':country, 'message':message,
         
        },
        type: "POST",
    })

}



/***************************************************************************** CHECKOUT PAGE *****************/
function validateCheckoutForm(e) {
  e.preventDefault()
  fullname = document.getElementById('fullname').value
  email = document.getElementById('email').value
  cardName = document.getElementById('cardName').value
  address = document.getElementById('address').value
  cardNo = document.getElementById('cardNo').value
  city = document.getElementById('city').value
  month = document.getElementById('month').value
  county = document.getElementById('county').value
  zip = document.getElementById('zip').value
  exYear = document.getElementById('exYear').value
  cvv = document.getElementById('cvv').value

  if(fullname == '' || email == '' || cardName == '' || address == '' || cardNo == '' 
  || city == '' || month == '' || county=='' || zip=="" || exYear == '' || cvv == '')
  {
    alert('Can not submit (one or more field(s) is empty')
    return
  }
  else {
    submitToPayment(fullname, email, cardName, address, cardNo, city, month, county, zip, exYear, cvv)
  }
};



/************************************************************************** Login PAGE ************************************/
function loginSubmit(){
  
  var validRegex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

  password = document.getElementById('password').value
  username = document.getElementById('username').value
  

  if(password =='' || username=="") {
    alert("Incorrect Username or Password!")
    return false
  }

  if (username.match(validRegex)) {
    
  } 
  else {
    alert("Incorrect Username or Password!");
    return false;
  };

  jQuery.ajax(
    {
        url: '../login/create',
        error: function(){
            console.log("OMG! This would never happen according to the functional consultant!");
        },
        success: function(response){
          if(response.length == 0){
            console.log('well')
            window.location.href = '../register'
          }else{
            console.log("Holy moly! It works!");
            window.location.href = '../welcome?id='+username
        }
        },
        data:
        {email :username, pass:password},
        type: "POST",
    })

}


/****************************************************************** SIGNUP / REGISTRATION PAGE ***************************/
function RegSubmit() {
  var username = document.getElementById('username').value;
  var email = document.getElementById('email').value;
  var password = document.getElementById('password').value;
  var password2 = document.getElementById('password2').value;

  var emailRegex = /^[a-zA-Z0-9.!#$%&'+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)$/;

  if (username === '' || password === '') {
      alert('Enter correct username/email and password');
      return false;
  }

  if (password !== password2) {
      alert('Passwords do not match');
      return false;
  }

  if (!email.match(emailRegex)) {
      alert('Invalid email address!');
      return false;
  }




  jQuery.ajax({
      url: '../register/create',
      type: 'POST',
      data: { username: username, email: email, pass: password },
      success: function() {
          console.log('Account created successfully');
          window.location.href = '../welcome?id=' + encodeURIComponent(username);
      },
      error: function() {
          console.log('Error during registration');
      }
  });

     // Display a success message
     alert("Form submitted successfully!");
}


/********************************************************************************* CART PAGE ******** */

function addToCart(autoId){
  jQuery.ajax(
    {
        url: '../cart/create',
        error: function(){
            console.log("OMG! This would never happen according to the functional consultant!");
        },
        success: function(response){
            console.log(response);
            window.location.href = '../cart'
        },
        data:
        {id:autoId},
        type: "POST",
    })
}

/********************************************************************************* PAYMENT PAGE ******** */

function submitToPayment(fullname, email, cardName, address, cardNo, city, month, county, zip, exyear, cvv){

  jQuery.ajax(
    {
        url: '../payment',
        error: function(){
            console.log("OMG! This would never happen according to the functional consultant!");
        },
        success: function(response){  
            
        },
        data:{
          'fullname':fullname, 'email':email, 'cardName':cardName,
          'address':address, 'cardNo':cardNo, 'city':city, 'month':month,
          'county':county, 'zip':zip, 'exyear':exyear, 'cvv':cvv
        },
        type: "POST",
    })
}


/********************************************************************************* SEARCH PAGE ******** */

function search(){
  const keyword = document.getElementById('search').value
  console.log(keyword)
  window.location.href = '../search?keyword='+keyword
}


/********************************************************************************* LOGOUT PAGE ******** */

function logout(){
  jQuery.ajax(
    {
        url: '../logout/action',
        error: function(){
            console.log("OMG! This would never happen according to the functional consultant!");
        },
        success: function(response){  
            window.location.href='login'
        },
      
        type: "GET",
    })

}



/************************************************************************************* NEW CUSTOMER ********  */

function updateCustomer(customer) {
  var pass = document.getElementById('pass').value;
  var email = customer;

  // Check if the password field is empty
  if (pass.trim() === '') {
      alert('Password cannot be empty');
      return false;
  }

  // Send the AJAX request to update the user's password
  jQuery.ajax({
      url: '../welcome/update-user',
      type: 'PATCH',
      data: {
          email: email,
          newPass: pass
      },
      success: function(response) {
          // Handle success: show a message to the user
          alert('Password changed successfully');
          // You can also redirect the user to another page if needed
          window.location.href = '/login'; // Redirect to the login page
      },
      error: function(xhr, status, error) {
          // Handle errors: show an error message in the console
          console.error('Error updating password:', error);
          alert('Failed to change password. Please try again.');
      }
  });
}
