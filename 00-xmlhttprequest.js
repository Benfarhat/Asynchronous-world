//
console.clear(); 
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
		    console.error("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
		}
	}

	return xhr;
}


var testGet = (url) => {
	var xhr = NewXMLHttpRequest()
	xhr.onload = function(event){
		if (this.readyState == 4 && this.status == 200) {
			console.log(this.responseText);
		} else {
			console.log("Erreur")
		}
	}

	xhr.open('GET', url, true);
	xhr.send();
}

var url = "https://jsonplaceholder.typicode.com/users";

testGet(url);