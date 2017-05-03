module.exports = {
    invokeFunc: function(func, ...param) {
        if (typeof func == 'function') {
            func.apply(this, param);
        }

    }

}