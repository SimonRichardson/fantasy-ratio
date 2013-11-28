var daggy = require('daggy'),
    combinators = require('fantasy-combinators'),
    tuples = require('fantasy-tuples'),

    constant = combinators.constant,
    identity = combinators.identity,

    Ratio = daggy.tagged('n', 'd');

function gcd(a, b) {
    if (b <= 0) return a;
    return gcd(b, a % b);
}

// Methods
Ratio.of = function(x) {
    return Ratio(x, 1);
};
Ratio.empty = function() {
    return Ratio(0, 1);
};
Ratio.prototype.chain = function(f) {
    return f(this.n);
};

// Derived
Ratio.prototype.ap = function(x) {
    return this.chain(function(f) {
        return x.map(f);
    });
};
Ratio.prototype.concat = function(a) {
    return this.chain(function(x) {
        return a.map(function(y) {
            return x + y;
        });
    });
};
Ratio.prototype.map = function(f) {
    var ratio = this;
    return this.chain(function(x) {
        return Ratio(f(x), ratio.d);
    });
};

Ratio.prototype.simplify = function() {
    var factor = gcd(this.n * 10, this.d * 10) / 10;
    return Ratio(this.n / factor, this.d / factor);
};

// Export
if(typeof module != 'undefined')
    module.exports = Ratio;
