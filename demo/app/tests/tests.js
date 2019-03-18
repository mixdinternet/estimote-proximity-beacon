var EstimoteProximityBeacon = require("nativescript-estimote-beacon").EstimoteProximityBeacon;
var estimoteBeacon = new EstimoteProximityBeacon();

describe("greet function", function() {
    it("exists", function() {
        expect(estimoteBeacon.greet).toBeDefined();
    });

    it("returns a string", function() {
        expect(estimoteBeacon.greet()).toEqual("Hello, NS");
    });
});