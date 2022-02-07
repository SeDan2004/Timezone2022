
backet_scripts_url = '/Modules/Shop/backet/backet_scripts.php';

function DeleteFunc() {
  current_elem = this.parentNode.parentNode;
  Clock_Id = current_elem.getAttribute('id');

  $.ajax({
    method: 'POST',
    url: backet_scripts_url,
    data: {callfunc: "Delete", id: Clock_Id}
  })

  current_elem.parentNode.children.length > 1 ?
    current_elem.parentNode.removeChild(current_elem) :
    location.reload();
}

function UpdateCount() {

  if (this.nextElementSibling !== null) {
    
    h2_count = this.previousElementSibling.innerText;

    

  } else {
    


  }

}

function AddEvent() {
  $('.DeleteButton').each((ind, elem) => {
    elem.addEventListener('click', DeleteFunc);
  })

  $('.buttonsDiv').each((ind, elem) => {
    [...elem.querySelectorAll('svg')].forEach((elem) => {
      elem.addEventListener('click', UpdateCount);
    })
  })
}

AddEvent();