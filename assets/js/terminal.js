var bind = Function.prototype.bind,
    $append = bind.call(Element.prototype.appendChild, document.querySelector("output")),
    $new = bind.call(Document.prototype.createElement, document),
    $text = bind.call(Document.prototype.createTextNode, document),
    $rnd = function() { return (Math.random() * 125 + 0) | 0; }, 
    $promise = function(thenFn) {
        var args, promise, wait, slice = Array.prototype.slice, isResolved = false;
        var promise = {
            wait: function(ms) {
                wait = ms;
                return promise;
            },
            then: function() {
                args = slice.call(arguments);
                return promise = $promise(thenFn);
            },
            resolve: function() {
                isResolved = true;
                if(args) {
                    var next = Function.prototype.bind.apply(thenFn, [undefined].concat(args).concat([promise]));
                    wait ? setTimeout(next, wait) : next();
                }
            }
        };

        return promise;
    };

function process(target, chars, promise)
{
    let first = chars[0], rest = chars.slice(1);
    if(!first) {
        promise.resolve();
        return;
    }

    target.appendChild(first);
    setTimeout(process.bind(undefined, target, rest, promise), $rnd());
}

function type(text, promise)
{
    if (typeof text === "function") {
        text();
        return;
    }

    let chars = text.split("").map($text);
    promise = promise || $promise(type);
    $append($new("br"));
    process($append($new("q")), chars, promise);

    return promise;
}

function knight()
{
    window.location.href = 'file://///wsl.localhost/Ubuntu-22.04/home/mart/projects/Website/pages/home.html';
}

// type("IBM Personal System/2 Model 90/95 and Server 95")
//   .then("Reference Diskette")
//   .then("Version 1.34")
//   .wait(8000)
//   .then("")
//   .then("")
//   .then("Licensed Material - Property of IBM")
//   .then("(C) Copyright IBM Corp. 1981, 1995")
//   .then("All Rights Reserved.")
//   .wait(1000)
//   .then("U.S. Government Users Restricted Rights")
//   .then("- Use, duplication or disclosure restricted by GSA ADP Schedule Contract with IBM Corp.")
//   .wait(8000)
//   .then("")
//   .then("")
//   .then("Starting Knight...")
//   .then("Knight Version 1.0")
//   .then("(C) Copyright Knight 2024.")
//   .wait(1500)
//   .then(knight);

type("Hello and welcome to my personal webpage!")
    .wait(2000)
    .then("I'm excited to share some important details with you.")
    .wait(2000)
    .then("First, this website is optimized for screens with a minimum width of 700px and a height of 650px.")
    .wait(2000)
    .then("For a fullscreen experience, simply toggle the on/off button located on the frame of the computer on the site.")
    .wait(2000)
    .then("Thank you for visiting, and I hope you enjoy exploring my site!")
    .wait(3500)
    .then("")
    .then("")
    .then("Starting Knight...")
    .then("Knight Version 1.0")
    .then("(C) Copyright Knight 2024.")
    .wait(1500)
    .then(knight);
