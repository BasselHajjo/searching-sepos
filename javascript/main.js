/*Add a button (e.g. 'click me') that when clicked console.logs 'you clicked me!'*/

const btn = document.querySelector("button");

function loadingHackYourFutureData(){
    //console.log("You clicked me!")
    fetchJsonData(hackYourFutureAmsterdamUrl, printJsonData);
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
    //console.log(data);
    displayHackYourFutureInfo(data);
};

const hackYourFutureAmsterdamUrl = 'https://api.github.com/orgs/HackYourFuture/repos';

/*Display the data that you get from the Github API on your web page.*/

function displayHackYourFutureInfo(data){
    const list = document.querySelector("ul");
    for(let i = 0 ; i < data.length ; i++){
        const listItem = document.createElement("li");
        list.appendChild(listItem);
        listItem.innerHTML = data[i].name;
    }

};

/*Now link the two together: When you click the button -> get the data from the Github API and display it on your website*/

/*Make a function which takes a single argument. The function should make an XHR request to https://api.github.com/search/repositories?q=user:HackYourFuture+[SearchTerm] where the search term will be the argument. This argument will be the input the user has given you, so make sure that when the user clicks the button you call this function with the argument.*/
const userSearch = document.querySelector("input");
const warningMsg = document.querySelector("p");
        userSearch.addEventListener("keyup",function(e){
            const list = document.querySelector("ul");
            list.innerHTML="";
            warningMsg.innerHTML = "";
            if (e.keyCode === 13) {
                searchResult();
  }
    });

const searchBtn = document.getElementById("search");

searchBtn.addEventListener("click",searchResult);

function searchResult(){
    const inputValue = userSearch.value.toLowerCase();
    
/*Make sure you handle user input well. That means you need to think about empty input, and input that doesn't yield any results.*/
    
    if(inputValue==""){  //this part still need work!
        alert("Enter a valid name please !");
    }else{
    repoSearchByName(inputValue);
        }
};

//function takes single argument(searchTerm).
function repoSearchByName(input){
    const searchedUrl = "https://api.github.com/search/repositories?q=user:HackYourFuture+" + input;
    function displaySearchedRepo(data){
    const list = document.querySelector("ul");
    //console.log(searchedUrl);
    for(let i = 0 ; i < data.items.length;i++){
        const listItem = document.createElement("li");
        list.appendChild(listItem);
        
/*Make all the repositories link their own page in Github. Use the value of the key: name to make this work (hint: Github urls always look like this https://api.github.com/repos/HackYourFuture/[repositoryName] where [repositoryName] would be replaced by the actual name of the repository, for example CommandLine). Make sure the link opens in a new tab.*/  
        

        listItem.innerHTML = '<a href="https://api.github.com/repos/HackYourFuture/' + data.items[i].name + '" target="_blanck">' + data.items[i].name + '</a>';
        const contributorUrl = '"https://api.github.com/repos/HackYourFuture/' + data.items[i].name + '/contributors"';
        //console.log(contributorUrl);
        listItem.addEventListener("click",function(){
           fetchJsonData(data.items[i].contributors_url,displayContibutors); 
        });
        
        //commits
        const commitsUrl = "https://api.github.com/repos/HackYourFuture/" + data.items[i].name + "/commits"
        const commitsList = document.createElement("ul");
        const contributor = document.querySelector("ol");
        list.appendChild(commitsList);
        //I didn't know how to appand this ul to the contributor ol since i create it in a diffrent function !
        fetchJsonData(commitsUrl,displayCommits);
        function displayCommits(data){
            console.log(data);
            for(let i = 0 ; i < data.length; i++){
           const commitsListItems = document.createElement("li");
           commitsList.appendChild(commitsListItems);
           commitsListItems.innerHTML= data[i].commit.message;
           }
        }
        
        
        function displayContibutors(data){
            //console.log(data);
          const contributor = document.querySelector("ol"); 
            for(let i = 0 ; i < data.length ; i++){
                 const contributorImage = document.createElement("img");
                 contributor.appendChild(contributorImage);
                 contributorImage.src= data[i].avatar_url;
                 const contributorLogin = document.createElement("li");
                 contributor.appendChild(contributorLogin);
                 contributorLogin.innerHTML = '<a href="' + data[i].html_url + '" target="_blanck">' + data[i].login + '</a>';
            }
        }
       }
};

    fetchJsonData(searchedUrl, displaySearchedRepo);
}

/*For each repository, show (in the right column) who the contributers are. You will need to use the contributors_url for this.*/

/**/
/**/
/**/
/**/