var source = $("#some-template").html();
var template = Handlebars.compile(source);

var data = {
    users: [{
        person: {
            firstName: "Garry",
            lastName: "Finch"
        },
        jobTitle: "Front End Technical Lead",
        twitter: "gazraa"
    }, {
        person: {
            firstName: "Garry",
            lastName: "Finch"
        },
        jobTitle: "Photographer",
        twitter: "photobasics"
    }, {
        person: {
            firstName: "Garry",
            lastName: "Finch"
        },
        jobTitle: "LEGO Geek",
        twitter: "minifigures"
    }]
};

Handlebars.registerHelper('fullName', function(person) {
    return person.firstName + " " + person.lastName;
});

$('body').append(template(data));

function makeImgfromJson() {

    var inner = document.getElementById('inner');
    if (inner) {
        inner.parentNode.removeChild(inner);
    }

    var cssLink = '<link rel="stylesheet" type="text/css" href="../stylesheets/style.css" />';

    var imgWidth = document.getElementById("i_width").value;
    var imgHeight = document.getElementById("i_height").value;
    var iframe = document.createElement('iframe');

    iframe.id = 'inner';
    iframe.srcdoc = cssLink + template(data);
    iframe.width = imgWidth;
    iframe.height = imgHeight;
    document.body.appendChild(iframe);


    // Set up the canvas dimensions

    var canvas = document.getElementById('canvas'),
        context = canvas.getContext('2d');
    canvas.width = imgWidth;
    canvas.height = imgHeight;

    // Grab the iframe
    var inner = document.getElementById('inner');

    iframe2image(inner, function(err, img) {
        // If there is an error, log it
        if (err) { return console.error(err); }

        // Otherwise, add the image to the canvas
        context.drawImage(img, 0, 0);
        postImage();
    });


}

function postImage() {

    console.log('here');

    var canvas = document.getElementById('canvas');
    var dataURL = canvas.toDataURL();
    $.ajax({
        type: "POST",
        url: "/img",
        data: {
            imgBase64: dataURL,
            width: canvas.width,
            height: canvas.height
        }
    }).done(function(o) {

    });
}