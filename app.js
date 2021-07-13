async function getArr(url) {
   const res = await fetch(url);
  
   const data = await res.json();
   
   return data;
}
let arr ;
getArr('http://localhost:8080/H2HBABBA2473/getCustomers').then( data => {
   arr = Array.from(data);
   displayList(arr,ul,rows,current_page);
   SetupPagination(arr, pagination, rows);
   // console.log(arr.length)
})


const ul = document.getElementById('append-here');
const pagination = document.getElementById('pagination');

let current_page = 1;
let rows = 12; //no of rows we want to display

// Display Data rows
function displayList (items, wrapper,rows, current_page) {
	current_page--; //since array is 0 index based so to get first element we need to give 0

	let start = rows * current_page;
	let end = start + rows;
	let paginatedItems = items.slice(start, end);

   let output = '';
	for (let i = 0; i < paginatedItems.length; i++) {
		let item = paginatedItems[i];
      let string = paginatedItems[i].invoice_amount.split('.')[0];
      let x = string.slice(-2)
      let y = string.slice(0,string.length-2)
      let amount = y+'.'+x

      output += `
      <li class="list">
            <div class="list-container list-items">
               <div class="customer-name"><input  type="checkbox" name=${paginatedItems[i].invoice_no} value=${paginatedItems[i].invoice_no} class="check">${paginatedItems[i].customer_name}</div>
               <div class="customer-id">${paginatedItems[i].customer_no}</div>
               <div class="invoice">${paginatedItems[i].invoice_no.split('.')[0]}</div>
               <div class="invoice-amount">${amount}k</div>
               <div class="due-date ${paginatedItems[i].delay>0 ? 'red': ''}">${paginatedItems[i].due_date}</div>
               <div class="ppd">${paginatedItems[i].clear_date ?paginatedItems[i].clear_date : '--'}</div>
               <div class="notes">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi, accusamus?</div>

            </div>
         </li> `
         
         ;
      }
      wrapper.innerHTML = output;
}
function SetupPagination (items, wrapper, rows_per_page) {
	

	let page_count = Math.ceil(items.length / rows_per_page);

		PaginationButton(1, items,page_count);

}
function PaginationButton (page, items,page_count) {

   let btnRight = document.querySelector('.table-next'); 
	btnRight.addEventListener('click', function () {
      if (current_page<page_count) {
      
         current_page += 1;
         displayList(arr, ul, rows, current_page);
      } 
	});
   let btnLeft = document.querySelector('.table-prev'); 
	btnLeft.addEventListener('click', function () {
      if (current_page>1) {
       
         current_page -= 1;
         displayList(arr, ul, rows, current_page);
      } 
	});

}







// ***********************************************************************


//  Button Section
const selectAll = document.getElementById('check-all');
const addBtn = document.getElementById('add');
const editBtn = document.getElementById('edit');
const deleteBtn = document.getElementById('delete');

const formBody = document.querySelector('.form-container');
let val;
// Event Listeners
// 1 add btn event listeners
addBtn.addEventListener('click', e => {
   openForm(addBtn,1);
   
   const formCloseBtn = document.getElementById('form-close');
   formCloseBtn.addEventListener('click',closeForm);
   
   createButtons('add-form');
   document.querySelector('.form-container').addEventListener('mouseover', e => {
      if(document.getElementById('customer-name-form').value &&document.getElementById('customer-number-form').value &&document.getElementById('invoice-number-form').value &&document.getElementById('invoice-amount-form').value &&document.getElementById('due-date-form').value &&document.getElementById('notes-form').value) {
         document.getElementById('form-add').classList.remove('form-btn-disable');
      } else {
         document.getElementById('form-add').classList.add('form-btn-disable');

      }
      e.preventDefault();
   })
   document.getElementById('form-clear').addEventListener('click', e => {
      document.getElementById('customer-name-form').value = '';
      document.getElementById('customer-number-form').value = '';
      document.getElementById('invoice-number-form').value = '';
      document.getElementById('invoice-amount-form').value = '';
      document.getElementById('due-date-form').value = '';
      document.getElementById('notes-form').value = '';
   });
   document.getElementById('form-cancel').addEventListener('click', closeForm);
   document.querySelector('.form-container').classList.remove('form-add')
})

editBtn.addEventListener('click', e => {
   openForm(editBtn,0);
   invoiceNumber = setInput(1);
   setInvoiceNumber(invoiceNumber,1);
   createButtons('edit-form');
   const formCloseBtn = document.getElementById('form-close');
   formCloseBtn.addEventListener('click',closeForm);

   document.querySelector('.form-container').addEventListener('mouseover', e => {
      if(document.getElementById('invoice-amount-form').value &&document.getElementById('notes-form').value) {
         document.getElementById('form-save').classList.remove('form-btn-disable');
      } else {
         document.getElementById('form-save').classList.add('form-btn-disable');

      }
      e.preventDefault();
   })

   document.getElementById('form-reset').addEventListener('click', e => {
      document.getElementById('invoice-amount-form').value = '';
      document.getElementById('notes-form').value = '';
      e.preventDefault();
   });
   document.getElementById('form-edit-cancel').addEventListener('click', closeForm);
})

deleteBtn.addEventListener('click', e => {
   openForm(deleteBtn,2);
   invoiceNumber = setInput();
   setInvoiceNumber(invoiceNumber,0);
   createButtons('delete-form');
   const formCloseBtn = document.getElementById('form-close');
   formCloseBtn.addEventListener('click',closeForm);
   document.getElementById('form-delete-cancel').addEventListener('click', closeForm);
   if(checkedArr.length>0) {
      document.getElementById('invoice-no-delete').value = checkedArr
   }
})




// single change
document.body.addEventListener('change', e => {

   // We only want to select single one. 
   // cant use querySelector as it will select only first li and also querySelectorAll as it will select all. 
   // thus using event bubbling to select the li
   if( e.target.parentElement.parentElement.classList.contains('list-items') ) {
      let counter = 0;
      let listItems = document.querySelectorAll('.check');

      listItems.forEach( (list,position)=> {
         if(list.checked ) counter++;
      })
         if(e.target.checked) {
            
            deleteBtn.classList.remove('btn-disabled');
            deleteBtn.disabled = false;
            if(counter<2) {
               editBtn.classList.remove('btn-disabled');
               editBtn.disabled = false;
               addBtn.classList.remove('btn-disabled');
               addBtn.disabled = false;
            }  else {
               editBtn.classList.add('btn-disabled'); //if greater than 1 then disabling the edit btn
               editBtn.disabled = true;
               addBtn.classList.add('btn-disabled'); //if greater than 1 then disabling the edit btn
               addBtn.disabled = true;
            }
           
            if( counter==1 ){
               addBtn.classList.add('btn-disabled');
               addBtn.disabled = true;
            }
         } 
       
         else {
            editBtn.classList.add('btn-disabled');
            editBtn.disabled = true;
            if(counter<1){

               deleteBtn.classList.add('btn-disabled');
               deleteBtn.disabled = true;
               addBtn.classList.remove('btn-disabled');
               addBtn.disabled = false;
            }
            if(counter==1){
               // addBtn.classList.remove('btn-disabled');
               editBtn.classList.remove('btn-disabled');
               editBtn.disabled = false;
            }
               
         }

   }



   
})
function setArr(array) {
   return array
}
let checkedArr = []
selectAll.addEventListener('change', e => {   
   let all = document.querySelectorAll('.check') //returns NodeList which allows us to use forEach without converting it to Array
   // if cehckbox selected to check all the rows and enable delte btn and disable add btn
   
   if(selectAll.checked) {
      deleteBtn.classList.remove('btn-disabled');
      deleteBtn.disabled = false;
      addBtn.classList.add('btn-disabled');
      addBtn.disabled = true;
      all.forEach( item => item.checked=true);
      all.forEach(checked => {
         checkedArr.push(checked.value);
      })
      
   } 
   // unchecking and disabling delete btn
   else {
      deleteBtn.classList.add('btn-disabled');
      deleteBtn.disabled = true;
      addBtn.classList.remove('btn-disabled');
      addBtn.disabled = false;
      all.forEach( item => item.checked=false);
      checkedArr = []
   }
});
// prevent default behaviiour
document.getElementById('search').addEventListener('focus', e => e.preventDefault())

// Opening Form
function openForm(btn,formState) {
   // enable editing of all input area if state iks 1
   if( formState==0 ) {
      let form = document.createElement('form');
      let body = document.getElementsByTagName('body')[0];
      let header = document.getElementById('insert-before');
      form.setAttribute('autocomplete','off');
      form.setAttribute('action','editCustomer');
      form.classList.add('form')
 
      form.innerHTML = `    
            <div class="body-background">
               <div class="form-container ">
                  <div class="form-place">

                     <div class="form-heading">
                        <h3>Edit Invoice</h3>
                        <a id="form-close" href="#"><img id="form-cross" src="./images/baseline-close-24px.svg" ></a>
                        
                     </div>
                  </div>
                  <hr>
                  <div class="form-place">

                     <div class="form-details form-edit-adjust">
                        <div class="form-center">
                           <div class="form-group">
                              <input type="hidden" name="invoice-no-edit" id="invoice-no-edit">
                              <label class="is-required" for="">Invoice Amount</label>
                              <input class="form-input" name="invoice-amount-edit" id="invoice-amount-form" type="text" required>
                           </div>
                           <div class="form-group">
                              <label for="">Notes</label>
                              <textarea class="form-input" id="notes-form" cols="10" rows="10" ></textarea>
                           </div>  
                        </div>
                     </div>
                  </div>
                  <hr>
                  <div class="form-buttons-section ">
                  </div>
               </div>
             </div> 
      `;
      body.insertBefore(form,header);
   } else if(formState==1){
      let form = document.createElement('form');
      let body = document.getElementsByTagName('body')[0];
      let header = document.getElementById('insert-before');
      form.setAttribute('autocomplete','off');
      form.setAttribute('action','insertCustomer');
      form.classList.add('form')
      form.innerHTML = `
         <div class="body-background">
            <div class="form-container ">
               <div class="form-place">

                  <div class="form-heading">
                     <h3>Add Invoice</h3>
                     <a id="form-close" href="#"><img id="form-cross" src="./images/baseline-close-24px.svg" ></a>
                     
                  </div>
               </div>
               <hr>
               <div class="form-place">

                  <div class="form-details">
                     <div class="form-left">
                        <div class="form-group">
                           <label class="is-required " for="">Customer Name</label>
                           <input class="form-input editable" name="customer-name-form" id="customer-name-form" type="text" required>
                        </div>
                        <div class="form-group">
                           <label class="is-required " for="">Customer No.</label>
                           <input class="form-input editable" name="customer-number-form" id="customer-number-form" type="text" required>
                        </div>
                        <div class="form-group">
                           <label class="is-required " for="">Invoice No.</label>
                           <input class="form-input editable" name="invoice-number-form" id="invoice-number-form" type="text"  required>
                        </div>
                        <div class="form-group">
                           <label class="is-required " for="">Invoice Amount</label>
                           <input class="form-input" name="invoice-amount-form" id="invoice-amount-form" type="text" required>
                        </div>
                     </div>
                     <div class="form-right">
                        <div class="form-group">
                           <label class="is-required " for="">Due Date</label>
                           <input class="form-input editable" name="due-date-form" id="due-date-form" type="date" required>
                        </div>
                        <div class="form-group">
                           <label for="">Notes</label>
                           <textarea class="form-input" id="notes-form" cols="10" rows="10" ></textarea>
                        </div>                    
                     </div>
                  </div>
               </div>
               <hr>
               <div class="form-buttons-section ">
               </div>
            </div>
         </div>
      `;
      body.insertBefore(form,header);
   } else if(formState==2) {
      let form = document.createElement('form');
      let body = document.getElementsByTagName('body')[0];
      let header = document.getElementById('insert-before');
      form.setAttribute('autocomplete','off');
      form.setAttribute('action','deleteCustomer');
      form.classList.add('form')

      form.innerHTML = `    
            <div class="body-background">
               <div class="form-container ">
                  <div class="form-place">

                     <div class="form-heading">
                        <h3>Delete record(s) ?</h3>
                        <a id="form-close" href="#"><img id="form-cross" src="./images/baseline-close-24px.svg" ></a>
                        
                     </div>
                  </div>
                  <hr>
                  <div class="form-place">

                     <div class="form-details form-adjustY">
                        <div class="form-center form-delete">
                        <input type="hidden" name="invoice-no-delete" id="invoice-no-delete">
                           <p>You'll lose your record(s) after this action. We can't recover them once you delete</p>
                           <br>
                           <p>Are you sure you want to <span class="red">permanently delete</span> them?</p>  

                        </div>
                     </div>
                  </div>
                  <hr>
                  <div class="form-buttons-section ">
                  </div>
               </div>
             </div> 
      `;
      body.insertBefore(form,header);
   }

}
function setInvoiceNumber(invoiceNumber,formState) {

   if (formState==1) {

      document.getElementById('invoice-no-edit').setAttribute('value',invoiceNumber);
   } else {
      
      document.getElementById('invoice-no-delete').setAttribute('value',invoiceNumber);
   }

}
function closeForm(e) {
   let formCenter = document.querySelector('.form');
   formCenter.remove();

    
   e.preventDefault();
}

function createButtons(formState) {
   let formBtnSection = document.querySelector('.form-buttons-section');
   if(formState==='add-form') {
      if(formBtnSection.classList.contains('two-btns')) formBtnSection.classList.remove('two-btns');
      formBtnSection.classList.add('three-btns');
      formBtnSection.innerHTML = `
         <button class="btn form-btn" id="form-cancel">Cancel</button>
         <button class="btn form-btn" id="form-clear">Clear</button>
         <button class="btn form-btn primary-btn" type="submit" id="form-add">Add</button>
      `;

   }else if(formState==='edit-form') {
      if(formBtnSection.classList.contains('two-btns')) formBtnSection.classList.remove('two-btns');
      formBtnSection.classList.add('three-btns');
      formBtnSection.innerHTML = `
         <button class="btn form-btn" id="form-edit-cancel">Cancel</button>
         <button class="btn form-btn" id="form-reset">Reset</button>
         <button class="btn form-btn primary-btn" type="submit" id="form-save">Save</button>
      `;
   } else if(formState==='delete-form') {
      if(formBtnSection.classList.contains('three-btns')) formBtnSection.classList.remove('three-btns');
      formBtnSection.classList.add('two-btns');
      formBtnSection.innerHTML = `
         <button class="btn form-btn form-delete-btn" id="form-delete-cancel">Cancel</button>
         <button class="btn form-btn primary-btn form-delete-btn" type="submit" id="form-delete">Delete</button>
      `;
   }
}

function setInput(formState=0) {
   let all = document.querySelectorAll('.check');
   let len = all.length;
   let i=0;
   let invoiceAmount;
   let notes;
   while( i<len ) {
      if( all[i].checked==true ) {
         invoiceNumber = all[i].parentElement.nextElementSibling.nextElementSibling.textContent;
         invoiceAmount = all[i].parentElement.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
         notes= all[i].parentElement.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.nextElementSibling.textContent;
         break;
      }
      i++
   }
   if(formState==1){
   document.getElementById('invoice-amount-form').value = invoiceAmount;
   document.getElementById('notes-form').value = notes;
   }
   return invoiceNumber;
}

//  ******************************************************************
// Search functionality

document.getElementById('search-img').addEventListener('click', function(e) {
   let result = String(document.getElementById('search').value)
   str = ".0"
   let newStr = result.concat(str);

   let counter = -1;
   
   arr.forEach((list,index) => {
      if(list.invoice_no===newStr) {
         counter=index;
         console.log(index)
      } 
   })
  
   if(counter>=0) {

      let item = arr[counter];
      let string = item.invoice_amount.split('.')[0];
      let x = string.slice(-2)
      let y = string.slice(0,string.length-2)
      let amount = y+'.'+x
      let div = document.getElementById('append-here');
      let output = `
      <li class="list">
            <div class="list-container list-items">
               <div class="customer-name"><input  type="checkbox" name=${item.invoice_no} value=${item.invoice_no} class="check">${item.customer_name}</div>
               <div class="customer-id">${item.customer_no}</div>
               <div class="invoice">${item.invoice_no.split('.')[0]}</div>
               <div class="invoice-amount">${amount}k</div>
               <div class="due-date ${item.delay>0 ? 'red': ''}">${item.due_date}</div>
               <div class="ppd">${item.clear_date ?item.clear_date : '--'}</div>
               <div class="notes">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Quasi, accusamus?</div>
   
            </div>
         </li> `
         
         ;
      div.innerHTML = output;
   } else {
         let output = `
         <div class="no-results">
            <img id="no-result-img" src="./images/error_outline-24px.svg">
            <h2>No results found</h2>
            <p>Try adjusting your search to find out what you are looking for.</p>
            <a href="index.html" class="primary">Clear Search</a>
         </div>
         
         `;
         ul.innerHTML = output;
   }
   document.querySelector('.table-next').remove()
   document.querySelector('.table-prev').remove()
   
})

