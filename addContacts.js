var index;

document.getElementById("contacts").addEventListener('submit', addContacts)
document.getElementById('editContacts').addEventListener('submit', updateTheContact)
document.getElementById('deleteContact').addEventListener('click', deleteTheContact)
document.getElementById('search').addEventListener('submit', searchContact)

function addContacts(e) {

    var name = document.getElementById("name").value;
    var phno = document.getElementById("Num").value;

    var values = {
        contactName: name,
        PhoneNo: phno
    }

    if (localStorage.getItem('arr') == null) {
        var arr = [];
        arr.push(values);
        localStorage.setItem('arr', JSON.stringify(arr));
    } else {
        var prevValues = JSON.parse(localStorage.getItem('arr'));
        prevValues.push(values);
        localStorage.setItem('arr', JSON.stringify(prevValues));
    }
    $("#contacts")[0].reset();
    load();
}

function load() {
    document.getElementById("contactslist").innerHTML = '';
    var tmp;
    tmp = JSON.parse(localStorage.getItem('arr'));
    if (tmp != null) {
        for (i = 0; i < tmp.length; i++) {
            document.getElementById("contactslist").innerHTML += "<li data-index='" + i + "'><span>" + tmp[i].contactName + "</span><span>" + tmp[i].PhoneNo + "</span></li></br>";
        }
    }
    return false;
};

function updateTheContact() {
    tmp = JSON.parse(localStorage.getItem('arr'));
    tmp[index].contactName = document.getElementById('editName').value;
    tmp[index].PhoneNo = document.getElementById('editNum').value;
    localStorage.setItem('arr', JSON.stringify(tmp));
    $("#editContacts")[0].reset();
    load();
    $('#myModal').modal('hide');
}

function deleteTheContact() {
    tmp = JSON.parse(localStorage.getItem('arr'));
    tmp.splice(index, 1);
    if (tmp.length >= 1)
        localStorage.setItem('arr', JSON.stringify(tmp));
    else
        localStorage.setItem('arr', '[]');
    load();
}

function searchContact(){
    var searchText = $("#search input").val();
    var found = -1;
    tmp = JSON.parse(localStorage.getItem('arr'));
    for(i=0; i < tmp.length; i++){
        if( tmp[i].contactName == searchText)
        {
            found = i;
            break;
        }
    }
    if(found == -1)
        console.log("false")
    else{
        console.log("true")
        found = -1;
    }
    $("#search")[0].reset();
}

$(document).ready(function() {
    //get the index of the list
    $('#contactslist').on('click', 'li', function(e) {
        index = $(this).attr('data-index');
        var tmpName = $("#contactslist li:eq(" + index + ") span:first").text();
        var tmpNumb = $("#contactslist li:eq(" + index + ") span").last().text();
        $('#editName').val(tmpName);
        $('#editNum').val(tmpNumb);
    });
});


//css selectors