let node;
window.onload = function WindowLoad(event) {
    node = document.getElementsByTagName('li')[0];
    node = node.cloneNode(true);
}

function addTodoItem(event) {
    event.preventDefault();
    let inputs = document.querySelector(".input-group").getElementsByTagName("input");
    node = node.cloneNode(true);
    node.querySelector("input").checked = false;

    if(inputs[0].value === "") {
        alert("You did not add anything.");
    } else {
        node.querySelector("#content").textContent = inputs[0].value;
        if(inputs[1].value == "") {
            var today = new Date();
            var tzoffset = today.getTimezoneOffset() * 60000; //offset in milliseconds
            var localISOTime = (new Date(Date.now() - tzoffset)).toISOString().slice(0,10);
            inputs[1].value = localISOTime;
        }
        node.querySelector("#date").textContent = inputs[1].value.replaceAll("-","/");
        document.querySelector('ul').appendChild(node);
    }
}

function editTask(event) {
    let prevText = event.target.parentNode.parentNode.querySelector("#content").innerHTML;
    console.log(prevText);

    event.target.parentNode.parentNode.querySelector(".data").removeChild(event.target.parentNode.parentNode.querySelector("#content"));
    
    let editInputBox = document.createElement("input");
    editInputBox.value = prevText;
    editInputBox.addEventListener("keydown",(event) => {if(event.key == "Enter"){ replace(event); }});
    event.target.parentNode.parentNode.append(editInputBox)
}

function replace(event) {
    let newContent = event.target.value;
    let newSpan = document.createElement("span");
    newSpan.id = "content";
    newSpan.innerHTML = newContent;
    event.target.parentNode.querySelector(".data").append(newSpan);
    event.target.parentNode.removeChild(event.target.parentNode.getElementsByTagName("input")[1]);
}

function checkIfChecked(event) {
    if(event.target.checked) {
        let checked = new Audio('checksound.mp3');
        checked.play()
    }
}