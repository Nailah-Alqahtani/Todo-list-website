
//current date in the header
var today = new Date();
var date = "Today's date is:"+today.getDate()+"/"+(today.getMonth()+1)+"/"+today.getFullYear();
document.getElementById("date").innerHTML =date; 


//add a task 
const Name = document.querySelector('#TaskName');
const TDate = document.querySelector('#TaskDate');
const btn = document.querySelector('#add');

btn.addEventListener('click', addTask);
Name.addEventListener('keyup', (e)=>{
    (e.keyCode === 13 ? addTask(e) : null);
})

function addTask(e){

  //first check the form input 
  const validForm = document.getElementById("TaskForm");

  //1.missing input field!
  if (!validForm.checkValidity()) 
  {
    alert("Missing input field, Fill all the form and Try again please :)");
    return;
  }

  //2.task name with only digits! 
  if(!(/[a-zA-Z]/.test(Name.value)))
  {
    alert("Task Name must include at least one letter :)");
    return;
  }


  //select and Creat the needed elements 
  const ToDo = document.querySelector('.ToDo');
  const completed = document.querySelector('.completed');
  const newTask = document.createElement('li');
  const checkBtn = document.createElement('button');
  const warning = document.createElement('i'); 
  const Late = document.createElement('i');
  const done = document.createElement('i');


  //add some icons
  warning.innerHTML= '<i id="icons" class="fas fa-exclamation-triangle"></i>';
  checkBtn.innerHTML = '<i class="fa fa-check"></i>';
  Late.innerHTML= '<i id="icons" class="fa fa-window-close"></i>';
  done.innerHTML= '<i id="icons" class="fa fa-check-square"></i>';
   

  newTask.innerHTML=' '+ Name.value + '<br>'+ TDate.value;

  //check the date
  var deadDate = new Date(document.getElementById("TaskDate").value);
  let D1 = deadDate.getTime();
  let D2 = today.getTime();
  var timing = D1-D2;
  var calc=parseInt(timing/(1000*3600*24));

  //1.late!
  if (calc==1 || calc==0) 
  {
    newTask.insertBefore(warning,newTask.firstChild);
  }

  //2.warning!
  else
    if(calc<0)
    {
      newTask.insertBefore(Late,newTask.firstChild);
    
    }


  //change the color based i=on the task priority 
  Task_colors = 
  {
    'hi': 'hiPriority',
    'med': 'medPriority',
    'low': 'lowPriority'
  }
  var radiosBtn = document.getElementsByName('priority');
  for (var i = 0, length = radiosBtn.length; i < length; i++) {
    if (radiosBtn[i].checked) {
      Task_selected = (Task_colors[radiosBtn[i].value]);
      break;
    }
  }
  newTask.className = Task_selected;


  //Add task to the to do list 
  ToDo.appendChild(newTask);
  newTask.appendChild(checkBtn);
  
  //clear the form after adding
  document.getElementById("TaskForm").reset();

  //check a task and move it to the completed section
  checkBtn.addEventListener('click', function()
  {
    const completedTask = this.parentNode;
    completedTask.insertBefore(done,completedTask.firstChild);
    completedTask.remove();
    completed.appendChild(completedTask);
    checkBtn.style.display = 'none';
    warning.style.display = 'none';
    Late.style.display = 'none';
  });

}




