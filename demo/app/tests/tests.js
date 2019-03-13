var EstimoteBeacon = require("nativescript-estimote-beacon").EstimoteBeacon;
var estimoteBeacon = new EstimoteBeacon();

describe("greet function", function() {
    it("exists", function() {
        expect(estimoteBeacon.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(estimoteBeacon.greet()).toEqual("Hello, NS");
    });
});