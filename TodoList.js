import readline from "readline";

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const todos = [];

const showMenu = () => {
    console.log('\nAdd your work to remember.');
    console.log('1: Add a task.');
    console.log('2: View Your task.');
    console.log('3: Exit.');
    rl.question("Choose an option: ",handleInput);
}

const handleInput = (option) =>{
    if (option == 1){
        rl.question('\nEnter your task: ', (task) =>{
            todos.push(task);
            console.log("Task Added: ", task)
            showMenu();
        })
    }
    else if (option == 2){
        console.log("\nYour Todo List.");

        todos.forEach((task, index)=>{
            console.log(`${index+1}. ${task}`);
        })
        showMenu();
    }
    else if(option == 3){
        console.log("Good Bye You have a good day.");

        rl.close();
    }
    else{
        console.log("\nInvalid Option");
        showMenu()
    }
}

showMenu();