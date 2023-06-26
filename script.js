
//recreate the  tag elements
//div cointainer
let container = document.createElement("div");
container.className = "container";

//title
let head = document.createElement("h1");
head.innerHTML = "DICTIONARY";
//div
let div_row = document.createElement("div");
div_row.className = "row";
//div col
let div_col8 = document.createElement("div");
div_col8.className = "col-8";
//form
let form = document.createElement("form");
form.className = "form-inline dictform";
//div
let div = document.createElement("div");
div.className = "form-group";

//input tag  
let wordInput = document.createElement("input");
wordInput.setAttribute("type", "search");
wordInput.className="form-control wordinput";
wordInput.setAttribute("placeholder", "Enter the word  to search...");
//create searchbutton div col
let searchButton = document.createElement("div");
searchButton.className = "col-4";
searchButton.innerHTML =`<button type="submit" class="btn btn-info searchButton" >Search</button>`

//create div row-2

let div_row2 = document.createElement("div");
div_row2.className= "row";
let wordInfo = document.createElement("div");
wordInfo.className = "col-12 meaningforwrd mt-4";


//appending
div_row2.append(wordInfo);
div.append(wordInput);
div_row.append(div_col8, searchButton);

div_col8.append(form);
form.append(div);
container.append(head,div_row,div_row2 );
document.body.append(container);



async function getmeaning(word) {
    // make a api request with the word
    try {

        let response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}
`);

        // get the meaning
        // parse the json to js object
        let data = await response.json();

        // show the details below the input box
        // create a paragraph
        let paragraph = document.createElement('p');

        // reset the div_col12
        wordInfo.innerHTML = '';

        // get the audio data
        let audioSource = data[0].phonetics[0].audio;

        // set the content of the paragraph element
        paragraph.innerHTML = `
        <span class='fas fa-volume-up audio-icon'></span>
        <audio class='audio'>
            <source src=${audioSource} type='audio/mpeg'>
        </audio>
        Word: <b>${data[0].word}</b>`;

        // append the created paragraph to the div_col12
        wordInfo.appendChild(paragraph);

        document.querySelector('.audio-icon').addEventListener('click', event => {
            document.querySelector('.audio').play();
        });

        // create a list
        let list = document.createElement('ul');
        list.style.listStyleType = 'none';

        let meanings = data[0].meanings;

        for (let meaning of meanings) {
            // create a list item
            let listItem = document.createElement('li');

            // set the content of the list item
            listItem.innerHTML = `${meaning.partOfSpeech}`;

            // create a sublist to display the meanings in every 
            // category
            let subList = document.createElement('ul');
            subList.style.listStyleType = 'disc';

            // get the definitions
            let definitions = meaning.definitions;

            for (let definition of definitions) {
                // create a list item
                let subListItem = document.createElement('li');

                // set the content of the list item
                subListItem.innerHTML = `<em>${definition.definition}</em>`;

                // append the list item to the list
                subList.appendChild(subListItem);
            }

            listItem.appendChild(subList);
            // append the list item to the list
            list.appendChild(listItem);
        }

        wordInfo.appendChild(list);

    } catch (error) {
        console.error('error fetching the meaning of the word');
    }
}

function handleSubmit(event) {
    event.preventDefault();

    let word = wordInput.value;

    
    getmeaning(word);
}


form.addEventListener('submit', handleSubmit);
searchButton.addEventListener('click', handleSubmit);
