function Progress (title, total, cur) {
  this.total = total
  this.cur = cur || 1
  this.title = title
}

Progress.prototype.log = function (msg, cur) {
  if (cur) this.cur = cur
  else cur = this.cur++
  console.log(this.title + `---(${(cur/this.total * 100).toFixed(1)}%)---${msg}`)
}
Progress.prototype.doing = function (msg) {
  console.log(`正在抓取--${msg}`)
}
Progress.prototype.complate =function(msg){
    console.log(`完成--${msg}`)
}

module.exports = Progress
