'ue strict';

const isObject = data => {
    const inspect = Object.prototype.toString;
    return inspect.call(data) === '[object Object]';
}

function FactoryFuta() {
    const __dict__ = {};
    Object.defineProperty(this, '__dict__', {
        enumerable: false,
        get: () => { return __dict__ },
        set: args => (Object.assign(__dict__, args))
    });
    const define = (name, attrs, ...associates) => {
        if (!name || typeof name !== "string") throw Error("name must be present string");
        if (!attrs || !isObject(attrs)) throw Error("attrs must be present object");
        Object.defineProperty(this.__dict__, name, {
            enumerable: true,
            get: () => ({
                attrs: attrs,
                associates: associates
            })
        })
    };
    this.define = define;
};


FactoryFuta.export = ()=> (
    require('./module')({
        format: '.futa.js',
        deps: [new FactoryFuta()],
        dir: require('path').resolve(__dirname, '../spec/factories')
    }).__meta__
)

module.exports = FactoryFuta;
