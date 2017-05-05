function Progress(title, total, cur) {

    this.total = total;
    this.cur = cur || 1;
    this.title = title;

}

Progress.prototype.log = function(msg, cur) {
    if (cur) this.cur = cur;
    else cur = this.cur++;
    console.log(this.title + `---(${(cur/this.total * 100).toFixed(1)}%)---${msg}`);
}


module.exports = Progress