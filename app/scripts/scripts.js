//crystals code
$(document).ready(function() { //initializes jQuery code when document loads

$('#newTaskForm').hide();  //hides newTaskForm  when the document loads

var advanceTask = function(task) { //we added this about 3/4 through the exercise. 
  var modified = task.innerText.trim()
  for (var i = 0; i < listo.length; i++) {
    if (listo[i].task === modified) {
      if (listo[i].id === 'new') {
        listo[i].id = 'inProgress';
      } else if (listo[i].id === 'inProgress') {
        listo[i].id = 'archived';
      } else {
        listo.splice(i, 1);
      }
      break;
    }
  }
  task.remove();
};
var listo = []; //this is our main array for storing tasks
  
  var Task = function(task) { //our task constructor
    this.task = task;
    this.id = 'new';
}  
  var addTask = function(task) { //pushes object made by user into our Listo array
    if(task) { //checks to make sure a blank task doesnt push by using truthy
      task = new Task(task);      
      listo.push(task);
      
        $('#newItemInput').val(''); //clears input form after submitted 
          $('#newList').append(
            '<a href="#finish" class="" id="item">' +
            '<li class="list-group-item">' +
            '<h3>' + task.task + '</h3>'+
            '<span class="arrow pull-right">' +
            '<i class="glyphicon glyphicon-arrow-right">' +
            '</span>' +
            '</li>' +
            '</a>'
          );

    }
     $('#newTaskForm').slideToggle('fast', 'linear'); //our New button will hide and show the input form at the same time.
};
  $('#saveNewItem').on('click', function (e) {
    e.preventDefault();
    var task = $('#newItemInput').val().trim();
    addTask(task);
});    
//Opens form
  $('#add-todo').on('click', function () {
      $('#newTaskForm').fadeToggle('fast', 'linear');
  });
  //closes form
  $('#cancel').on('click', function (e) {
      e.preventDefault();
      $('#newTaskForm').fadeToggle('fast', 'linear');
  }); 
////////////////////////////////////////////////////////// here we create a way for our tasks to be moved from new, to in progress, to archived, and eventually deleted.  
  $(document).on('click', '#item', function(e) { 
    e.preventDefault();//Prevents the default action to
    var task = this;  //trigger
    advanceTask(task);
    this.id = 'inProgress'; 
    $('#currentList').append(this.outerHTML);
  });
  $(document).on('click', '#inProgress', function(e) {
    e.preventDefault();
    var task = this;
    task.id = "archived";
    var changeIcon = task.outerHTML.replace('glyphicon-arrow-right', 'glyphicon-remove');
    advanceTask(task);
    $('#archivedList').append(changeIcon);
  });
  $(document).on('click', '#archived', function(e) {
    e.preventDefault();
    var task = this;
    advanceTask(task);
  });
});
























