/*Add a button (e.g. 'click me') that when clicked console.logs 'you clicked me!'*/

const btn = document.querySelector("button");

function loadingHackYourFutureData(){
    console.log("You clicked me!")
    fetchJsonData(hackYourFutureAmsterdamUrl, printJsonData);
    btn.style="display:none";
};

btn.addEventListener("click",loadingHackYourFutureData);

/*Create a function that fetches from The Github API. For example from [this page] (https://api.github.com/orgs/HackYourFuture/repos).*/

function fetchJsonData(url, callBackFunction) {
    const request = new XMLHttpRequest();
    request.addEventListener('load', function(data) {
         if (this.status === 200) {
            console.log("Data loaded");
            const responseText = request.responseText;
            callBackFunction(JSON.parse(request.responseText));
        } else {
            console.log("Can't load data !");
        }
    });
    
    request.addEventListener('error',function(){
        console.log("Server error !")
    });

    request.open('get', url);
    request.send();
};

const printJsonData = function(data) {
    console.log(data);
    displayHackYourFutureInfo(data);
};

const hackYourFutureAmsterdamUrl = 'https://api.github.com/orgs/HackYourFuture/repos';

/*Display the data that you get from the Github API on your web page.*/

const list = document.querySelector("ul");
const listItem = document.createElement("li");
list.appendChild(listItem);

function displayHackYourFutureInfo(data){
    for(let i = 0 ; i < data.length ; i++){
        listItem.innerHTML = data[i].name;
    }
};

/*Now link the two together: When you click the button -> get the data from the Github API and display it on your website*/

/*Make a function which takes a single argument. The function should make an XHR request to https://api.github.com/search/repositories?q=user:HackYourFuture+[SearchTerm] where the search term will be the argument. This argument will be the input the user has given you, so make sure that when the user clicks the button you call this function with the argument.*/
const searchBtn = document.getElementById("search");

searchBtn.addEventListener("click",repoSearchByName);
                           
function repoSearchByName(){
    console.log("search");
    const searchElement = document.querySelector("input");
    const inputValue = searchElement.value.toLowerCase();
    console.log(inputValue);
    const userSearchUrl = "https://github.com/HackYourFuture/" + inputValue;
    listItem.innerHTML = `<a href=${userSearchUrl} target="_blank">` + userSearchUrl + `</a>`;
};


/**/
/**/
/**/
/**/
/**/
/**/
/**/