document.getElementById("inputGroupFile01").addEventListener("click", function(){
    document.getElementById("base64").innerHTML = "Hello World";
  });
if (window.File && window.FileReader && window.FileList && window.Blob) {
    document.getElementById("inputGroupFile01").addEventListener('change', handleFileSelect, false);
  } else {
    alert('The File APIs are not fully supported in this browser.');
  }
  
  function handleFileSelect(evt) {
      alert ('je susi dans ma fonction')
    var f = evt.target.files[0]; // FileList object
    var reader = new FileReader();
    // Closure to capture the file information.
    reader.onload = (function(theFile) {
      return function(e) {
        var binaryData = e.target.result;
        //Converting Binary Data to base 64
        var base64String = window.btoa(binaryData);
     
        var xhr = new XMLHttpRequest();
        xhr.open("POST", 'https://2c196fyq6b.execute-api.eu-west-3.amazonaws.com/prod/upload-audio', true);
        //Envoie les informations du header adaptées avec la requête
        xhr.setRequestHeader("Content-Type", "application/javascript");
        xhr.onreadystatechange = function() { //Appelle une fonction au changement d'état.
            if (this.readyState === XMLHttpRequest.DONE && this.status === 200) {
        // Requête finie, traitement ici.
            }
        }
        data = {"body": base64String,
                "file_name": f.name.split(".")[0]
        }
        xhr.send(JSON.stringify(data));
        alert(f.File)
      };
    })(f);
    // Read in the image file as a data URL.
    reader.readAsBinaryString(f);
  }

  var request = new XMLHttpRequest()

  request.open('GET', 'https://2c196fyq6b.execute-api.eu-west-3.amazonaws.com/prod/files', true)
  request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    console.log(request.status);
    files = document.getElementById("files");
    dataObj = JSON.parse(data.body);
    alert(dataObj);
    dataObj.forEach(el => {
        var element = document.createElement("a");
        element.setAttribute('class', "list-group-item list-group-item-action");
        element.setAttribute('href', '#');
        element.setAttribute('id', el.split('.')[0]);
        element.setAttribute('value', el.split('.')[0]);
        element.setAttribute('onclick', "transcrib(this.id);");
        element.innerHTML = el;
        files.appendChild(element);
    });
  }
  request.send();

function transcrib(obj){
  var xhr = new XMLHttpRequest();
  var url = 'https://2c196fyq6b.execute-api.eu-west-3.amazonaws.com/prod/upload-audio';
  var param = '?myParam='+obj+'&myParam1='+obj;
  xhr.open('GET', url+param, true);

  xhr.onload = function () {
    alert("fin")
  };

  xhr.send();
}

function show_trans(){
  var request = new XMLHttpRequest()

  request.open('GET', 'https://2c196fyq6b.execute-api.eu-west-3.amazonaws.com/prod/files/transcrib', true)
  request.onload = function() {
    // Begin accessing JSON data here
    var data = JSON.parse(this.response);
    console.log(request.status);
    files = document.getElementById("files_trans");
    dataObj = JSON.parse(data.body);
    alert(dataObj);
    dataObj.forEach(el => {
        var element = document.createElement("a");
        element.setAttribute('class', "list-group-item list-group-item-action");
        element.setAttribute('href', '#');
        element.setAttribute('id', el.split('.')[0]);
        element.setAttribute('value', el.split('.')[0]);
        element.setAttribute('onclick', "detail(this.id);");
        element.innerHTML = el.split('.')[0];
        files.appendChild(element);
    });
  }
  request.send();
}

function detail(obj){
  var request = new XMLHttpRequest()
  
  var url = 'https://2c196fyq6b.execute-api.eu-west-3.amazonaws.com/prod/files/transcrib/detail';
  var param = '?myParam='+obj;
  request.open('GET', url+param, true);
  request.onload = function() {
    var data = JSON.parse(this.response);
    console.log(request.status);
    files = document.getElementById("detail");
    dataObj = JSON.parse(data.body);
    alert(dataObj);
  }
  request.send();
}

  