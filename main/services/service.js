var app = angular.module("myApp");
app.service("conv", function() {
    this.env = "http://" + "192.168.0.18" + ":8080/";

    this.url = function(path) {
        return this.env + path;
    }

    this.cookieSessionKey = "cookieSessionKey";

    this.isNull = function(a) {
        if (typeof a == 'undefined' || a == null || a == "") {
            return true;
        } else {
            return false;
        }
    }

});