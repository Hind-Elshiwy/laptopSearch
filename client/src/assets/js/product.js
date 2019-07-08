

  // Get the elements with class="column"
  var elements = document.getElementById("column");
  
  // Declare a loop variable
  var i;
  var width = window.innerWidth;
  var height = window.innerHeight;

  // List View for smart phones
  if(width < 800 && height <= 700) {
    for (i = 0; i < elements.length; i++) {
      elements[i].style.width = "50%";
    }
  }
      // Grid View tablet
  if(width >= 800 && height >= 1280) {
    for (i = 0; i < elements.length; i++) {
      elements[i].style.width = "50%";
      var ul = document.getElementById("list");
      var li = document.createElement("li");
    //   li.setAttribute('id',"hind");
      li.appendChild(document.createTextNode("Price   :  "));
      ul.appendChild(li);
    }
  }
  
  var ul = document.getElementById("list");
  var candidate = document.getElementById("candidate");
  var item = document.getElementById(candidate.value);
  ul.removeChild(item);
  // Grid View pc
 if(width>=1280 && height >= 1024){
    for (i = 0; i < elements.length; i++) {
      elements[i].style.width = "33.333333333%";
     

    }
  }
  
