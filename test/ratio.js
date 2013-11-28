var λ = require('fantasy-check/src/adapters/nodeunit'),
    applicative = require('fantasy-check/src/laws/applicative'),
    functor = require('fantasy-check/src/laws/functor'),
    monad = require('fantasy-check/src/laws/monad'),
    monoid = require('fantasy-check/src/laws/monoid'),

    Identity = require('fantasy-identities'),
    Ratio = require('../fantasy-ratios');

function show(a) {
    return a.n + '/' + a.d;
}

function run(a) {
    return Identity.of(show(a));
}

exports.list = {

    // Applicative Functor tests
    'All (Applicative)': applicative.laws(λ)(Ratio, run),
    'Identity (Applicative)': applicative.identity(λ)(Ratio, run),
    'Composition (Applicative)': applicative.composition(λ)(Ratio, run),
    'Homomorphism (Applicative)': applicative.homomorphism(λ)(Ratio, run),
    'Interchange (Applicative)': applicative.interchange(λ)(Ratio, run),

    // Functor tests
    'All (Functor)': functor.laws(λ)(Ratio.of, run),
    'Identity (Functor)': functor.identity(λ)(Ratio.of, run),
    'Composition (Functor)': functor.composition(λ)(Ratio.of, run),

    // Monad tests
    'All (Monad)': monad.laws(λ)(Ratio, run),
    'Left Identity (Monad)': monad.leftIdentity(λ)(Ratio, run),
    'Right Identity (Monad)': monad.rightIdentity(λ)(Ratio, run),
    'Associativity (Monad)': monad.associativity(λ)(Ratio, run),

    // Monoid tests
    'All (Monoid)': monoid.laws(λ)(Ratio, run),
    'leftIdentity (Monoid)': monoid.leftIdentity(λ)(Ratio, run),
    'rightIdentity (Monoid)': monoid.rightIdentity(λ)(Ratio, run),
    'associativity (Monoid)': monoid.associativity(λ)(Ratio, run),

    // Manual tests
    'when testing simplify should return correct value': function(test) {
        test.equal(show(Ratio.of(0.2).simplify()), '1/5');
        test.done();
    }
};
