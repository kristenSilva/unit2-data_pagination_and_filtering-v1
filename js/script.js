/*
Treehouse Techdegree:
FSJS Project 2 - Data Pagination and Filtering
*/

/*
For assistance:
   Check out the "Project Resources" section of the Instructions tab: https://teamtreehouse.com/projects/data-pagination-and-filtering#instructions
   Reach out in your Slack community: https://treehouse-fsjs-102.slack.com/app_redirect?channel=unit-2
*/
const perPage = 9;


/*
Create the `showPage` function
This function will create and insert/append the elements needed to display a "page" of nine students
list param = student data
page param = page number which will determine the 9 students selected from list
*/
function showPage(list, page){
   const startIndex = (page*perPage) - perPage;
   const endIndex = page*perPage;
   const ulStudentList = document.querySelector('.student-list');
   ulStudentList.innerHTML = '';

   for(let i = 0; i < list.length; i++) {
      if(i >= startIndex && i < endIndex){
         ulStudentList.insertAdjacentHTML('beforeend',
         `<li class="student-item cf">
            <div class="student-details">
               <img class="avatar" src=${list[i].picture.large} alt="Profile Picture">
               <h3>${list[i].name.first} ${list[i].name.last}</h3>
               <span class="email">${list[i].email}</span>
            </div>
            <div class="joined-details">
            <span class="date">Joined ${list[i].registered.date}</span>
            </div>
         </li>`);
      }
   }
   console.log(startIndex);
   console.log(endIndex);
}


/*
Create the `addPagination` function
This function will create and insert/append the elements needed for the pagination buttons
list param = student data
*/
function addPagination(list){
   const numButtons = Math.ceil(list.length/perPage);
   const linkList = document.querySelector('.link-list');
   linkList.innerHTML = '';

   for(let i = 1; i < numButtons+1; i++){
      linkList.insertAdjacentHTML('beforeend',
         `<li>
            <button type="button">${i}</button>
         </li>`);
   }

   const firstButton = linkList.firstElementChild.firstElementChild;
   firstButton.className = 'active';

   linkList.addEventListener('click', (e) => {
      if(e.target.tagName ==='BUTTON'){
         const activeButtons = document.getElementsByClassName('active');
         for(let i = 0; i < activeButtons.length; i++){
            activeButtons[i].classList.remove('active');
         }
         e.target.className= 'active';
         showPage(list, e.target.textContent);
         console.log(e.target.textContent);
      }
   });
}


// Call functions
showPage(data, 1);
addPagination(data);