var daggy = require('daggy'),
    combinators = require('fantasy-combinators'),
    tuples = require('fantasy-tuples'),

    constant = combinators.constant,
    identity = combinators.identity,

    Ratio = daggy.tagged('n', 'd');

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

// Export
if(typeof module != 'undefined')
    module.exports = Ratio;
