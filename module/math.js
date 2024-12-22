function add (a,b) {
    return a+b;
}

function subs(a,b){
    return a-b;
}

//exporting the module to be used by another file or module
module.exports = {
    add,
    subs,
}