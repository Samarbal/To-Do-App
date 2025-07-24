 // ================================
        // JAVASCRIPT BREAKDOWN & TUTORIAL
        // ================================

        /* 
        1. DOM SELECTION - Getting HTML elements to work with
        This is like giving JavaScript a way to "grab" HTML elements
        */
        const inputBox = document.getElementById('input-box');
        const listContainer = document.getElementById('list-container');

        // Get stat elements for our new features
        const totalTasksEl = document.getElementById('total-tasks');
        const completedTasksEl = document.getElementById('completed-tasks');
        const pendingTasksEl = document.getElementById('pending-tasks');

        /* 
        2. FUNCTION to ADD TASKS
        This function runs when user clicks "Add" button
        */
        function addTask() {
            // INPUT VALIDATION - Check if user actually typed something
            if (inputBox.value === '') {
                alert('You must write something!');
                return; // Stop the function here if input is empty
            }

            // ELEMENT CREATION - Create new HTML elements
            let li = document.createElement('li'); // Create <li> element
            li.innerHTML = inputBox.value; // Put user's text inside the <li>
            listContainer.appendChild(li); // Add the <li> to our list

            // CREATE DELETE BUTTON - Create a button to delete the task
            let span = document.createElement('span'); 
            span.innerHTML = '\u00d7'; // Unicode for × symbol
            li.appendChild(span); // Add delete button to the task

            // CLEAR INPUT - Reset the input field
            inputBox.value = '';
            
            // SAVE & UPDATE - Save to storage and update stats
            saveData();
            updateStats();
        }

        /* 
        3. EVENT LISTENER for CLICK EVENTS
        This listens for clicks anywhere on the task list
        */
        listContainer.addEventListener("click", function(e) {
            // e.target tells us exactly what was clicked
            
            if (e.target.tagName === 'LI') {
                // User clicked on a task - toggle completed state
                e.target.classList.toggle('checked');
                saveData();
                updateStats();
            }
            else if (e.target.tagName === 'SPAN') {
                // User clicked on delete button (×)
                e.target.parentElement.remove(); // Remove the entire task
                saveData();
                updateStats();
            }
        });

        /* 
        4. ENTER KEY SUPPORT
        Let users press Enter to add tasks (better UX!)
        */
        inputBox.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                addTask();
            }
        });

        /* 
        5. LOCAL STORAGE FUNCTIONS
        These save your tasks so they persist when you refresh the page
        */
        function saveData() {
            // Convert our task list HTML into text and save it
            localStorage.setItem('todoData', listContainer.innerHTML);
        }

        function showTasks() {
            // Get saved data and put it back in our list
            const savedData = localStorage.getItem('todoData');
            if (savedData) {
                listContainer.innerHTML = savedData;
            }
        }

        /* 
        6. STATISTICS FUNCTIONS -
        */
        function updateStats() {
            const allTasks = listContainer.getElementsByTagName('li');
            const completedTasks = listContainer.getElementsByClassName('checked');
            
            const total = allTasks.length;
            const completed = completedTasks.length;
            const pending = total - completed;

            // Update the display
            totalTasksEl.textContent = total;
            completedTasksEl.textContent = completed;
            pendingTasksEl.textContent = pending;
        }

        /* 
        7. CLEAR ALL FUNCTION 
        */
        function clearAllTasks() {
            if (confirm('Are you sure you want to delete all tasks?')) {
                listContainer.innerHTML = '';
                saveData();
                updateStats();
            }
        }

        /* 
        8. INITIALIZATION
        When the page loads, show saved tasks and update stats
        */
        showTasks(); // Load saved tasks
        updateStats(); // Update statistics

        // ================================
        // JAVASCRIPT CONCEPTS EXPLAINED:
        // ================================

        /*
        🎯 KEY CONCEPTS YOU'RE LEARNING:

        1. DOM MANIPULATION:
           - document.getElementById() - Find elements
           - createElement() - Make new elements
           - appendChild() - Add elements to page
           - innerHTML - Change content inside elements

        2. EVENT HANDLING:
           - addEventListener() - Listen for user interactions
           - onclick - Handle button clicks
           - Event object (e) - Get info about the event

        3. CONDITIONAL LOGIC:
           - if/else statements - Make decisions
           - Validation - Check user input

        4. DATA PERSISTENCE:
           - localStorage - Save data in browser
           - JSON - Convert data for storage

        5. ARRAY/COLLECTION METHODS:
           - getElementsByTagName() - Get multiple elements
           - getElementsByClassName() - Get elements by class

        6. STRING MANIPULATION:
           - textContent vs innerHTML
           - Unicode characters (\u00d7)

        🚀 REAL-WORLD APPLICATIONS:
        - Form validation
        - Dynamic content creation
        - User interaction handling
        - Data persistence
        - UI state management
        */

        // ================================
        // DEBUGGING TIPS:
        // ================================

        /*
        🐛 COMMON MISTAKES & FIXES:

        1. Your Original Bug:
           ❌ document.createElement(span) 
           ✅ document.createElement('span')
           → Always use quotes for tag names!

        2. Syntax Errors:
           ❌ Missing semicolons, brackets
           ✅ Use console.log() to debug
           ✅ Check browser Developer Tools

        3. Event Handling:
           ❌ Forgetting to prevent default behavior
           ✅ Understanding event bubbling
           ✅ Using correct event names

        4. DOM Selection:
           ❌ Selecting elements before they exist
           ✅ Wait for DOM to load
           ✅ Check if elements exist before using

       
        */