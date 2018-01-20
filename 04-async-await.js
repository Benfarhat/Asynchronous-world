//
console.clear(); 
console.log("Starting Promise");
var debug = false;
var NewXMLHttpRequest = () => {
	let xhr = null;
	if(typeof window === 'undefined'){ // Node.js env
		// Need to install xmlhttprequest module
		// npm i -g xhr2
		var XMLHttpRequest = require("xhr2").XMLHttpRequest;
		xhr = new XMLHttpRequest();

	} else { // Browser env

		if (window.XMLHttpRequest || window.ActiveXObject) {
		    if (window.ActiveXObject) {
		        try {
		            xhr = new ActiveXObject("Msxml2.XMLHTTP");
		        } catch(e) {
		            xhr = new ActiveXObject("Microsoft.XMLHTTP");
		        }
		    } else {
		        xhr = new XMLHttpRequest(); 
		    }
		} else {
		    console.error("Your browser do not support XMLHTTPRequest object...");
		}	
	}

	return xhr;
}

var testGet = (url) => {
	return new Promise((resolve, reject) => {		
		var xhr = NewXMLHttpRequest()
		// ONLOAD
		xhr.onload = (evt) => {
			if (debug) console.log("onload event, after successfully fecthing and receiving data...");
			resolve(xhr.responseText); 
		}
		// ONLOADSTART
		xhr.onloadstart = (evt) => {
			if (debug) console.log("onloadstart event, Start of data transfer...");
		}
		// ONLOADEND
		xhr.onloadend = (evt) => {
			if (debug) console.log("onloadend event, End of data transfer...");
		}
		// ONERROR
		xhr.onerror = (evt) => {
			if (debug) console.log("error event...");
			reject(evt);
		}

		xhr.open('GET', url, true);
		xhr.send();
	});
}


var url1 = "https://jsonplaceholder.typicode.com/users";
var url2 = "https://jsonplaceholder.typicode.com/posts?userId=";
var url3 = "https://jsonplaceholder.typicode.com/comments?postId="; 

var catchError = (e) => console.error("Ajax Error: ", e);
var smulateError = false;
var getcomments = async () => {
	var response = await testGet(url1)
	var users = JSON.parse(response);
	response = await testGet(url2 + users[0].id);
	var posts = JSON.parse(response);
	response = await testGet(url3 + posts[0].id);
	var comments = JSON.parse(response);
	return comments;
};


getcomments().then((response) => {
	response.forEach((v,i) => {
		console.log("\t\t-" + i + "- " + v.body.replace(/(\r\n|\n|\r)/gm,"").substring(0,20) + ' ...');
	});
}).catch(catchError).then(() => console.log("Finished!"))
