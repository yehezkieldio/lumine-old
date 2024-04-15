const mathjs = require("mathjs");

const { all } = require("mathjs");

const limitedmath = mathjs.create(all);

limitedmath.import(
    {
        import: function () {
            throw new Error("Function import is disabled");
        },
        createUnit: function () {
            throw new Error("Function createUnit is disabled");
        },
        simplify: function () {
            throw new Error("Function simplify is disabled");
        },
        derivative: function () {
            throw new Error("Function derivative is disabled");
        },
    },
    {
        override: true,
    }
);

Number.prototype.toFixedSpecial = function (number) {
    let str = this.toFixed(number);
    if (str.indexOf("e+") === -1) {
        return str;
    }

    str = str
        .replace(".", "")
        .split("e+")
        .reduce(function (p, b) {
            return p + Array(b - p.length + 2).join(0);
        });

    if (number > 0) {
        str += "." + Array(number + 1).join(0);
    }

    return str;
};

function limitedcalculate(values) {
    return limitedmath.evaluate(values).toString();
}

function calculate(values) {
    return mathjs.evaluate(values).toString();
}

function pangkat(hasil, pangkat) {
    return mathjs.pow(hasil, pangkat).toFixedSpecial();
}

function sederhanakan(values) {
    return mathjs.simplify(values).toString();
}

module.exports = {
    limitedcalculate,
    calculate,
    pangkat,
    sederhanakan,
};
