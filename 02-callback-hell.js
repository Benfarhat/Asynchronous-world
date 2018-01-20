//
console.clear(); 
console.log("Starting Callback Hell");
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

var testGet = (url, success, error) => { // success and error are our callbacks
	var xhr = NewXMLHttpRequest()
	// ONLOAD
	xhr.onload = (evt) => {
		if (debug) console.log("onload event, after successfully fecthing and receiving data...");
		success(xhr.responseText); 
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
		error(evt);
	}

	xhr.open('GET', url, true);
	xhr.send();
}

var url1 = "https://jsonplaceholder.typicode.com/users";
var url2 = "https://jsonplaceholder.typicode.com/posts?userId=";
var url3 = "https://jsonplaceholder.typicode.com/comments?postId=";

// -----------------------------------------------------------
/* START GETTING USERS */
testGet(url1, (response) => { // Implementing success callback
	console.log(`
		*****************
		     SUCCESS 
		   FIRST USER
		*****************`);
	var users = JSON.parse(response);
	console.log("First user> id: " + users[0].id + ' - Name:' + users[0].name + ' - Username: ' + users[0].username);

	// -----------------------------------------------------------
	/* START GETTING POSTS */
	testGet(url2 + users[0].id, (response) => { // Implementing success callback
		console.log(`
			*****************
			     SUCCESS 
		    FIRST USER'S POSTS
			*****************`);
		var posts = JSON.parse(response);
		console.log("\tFirst Post from first user> Postid: " + posts[0].id + ' - Title : ' + posts[0].title);


		// -----------------------------------------------------------
		/* START GETTING COMMENTS */
		testGet(url3 + posts[0].id, (response) => { // Implementing success callback
			console.log(`
				*****************
				     SUCCESS 
				POSTS'S COMMENTS 
				 FROM FIRST USER
				*****************`);
			var comments = JSON.parse(response);
			comments.forEach((v,i) => {
				console.log("\t\t-" + i + "- " + v.body.replace(/(\r\n|\n|\r)/gm,"").substring(0,20) + ' ...');
			});


		},(e) => { // Implementing error callback
			console.log(`
				*****************
				  ERROR COMMENTS
				*****************`);
			console.log(`ReadyState: ${e.target.readyState} - Status: ${e.target.status}`);
		});
		/* END GETTING COMMENTS */
		// -----------------------------------------------------------




	},(e) => { // Implementing error callback
		console.log(`
			*****************
			    ERROR POST
			*****************`);
		console.log(`ReadyState: ${e.target.readyState} - Status: ${e.target.status}`);
	});
	/* END GETTING POSTS */
	// -----------------------------------------------------------

},(e) => { // Implementing error callback
	console.log(`
		*****************
		   ERROR USER
		*****************`);
	console.log(`ReadyState: ${e.target.readyState} - Status: ${e.target.status}`);
});
/* END GETTING USERS */
// -----------------------------------------------------------