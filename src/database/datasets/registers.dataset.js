const factory = require('../../../__tests__/factories');

function repeat(func, times) {
    func();
    times && --times && repeat(func, times);
}

function rand() { return Math.floor(Math.random() * 10); }
function randValue() { return Math.floor(Math.random() * 100) + 1; }

repeat(function () {
    factory.create('registers', {
        register_name: "Linus Torvalds",
        register_company: "Linux",
        register_value: randValue()
    })
}, rand());

repeat(function () {
    factory.create('registers', {
        register_name: "Larry Page",
        register_company: "Google",
        register_value: randValue()
    });
}, rand());

repeat(function () {
    factory.create('registers', {
        register_name: "Mark Zuckerberg",
        register_company: "Facebook",
        register_value: randValue()
    });
}, rand());

repeat(function () {
    factory.create('registers', {
        register_name: "Bill Gates",
        register_company: "Microsoft",
        register_value: randValue()
    });
}, rand());
