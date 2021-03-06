'use strict';
const program = require('commander')
const Table2 = require('cli-table2')
const toolsInfo = require('./package.json')
const ZingFetch = require('./fetch')
const ZingGit = require('./git')
const ZingSQL = require('./sql')

function ZingCMD() {}

let table2 = new Table2({
  head: ['功能', '命令', '缩写', '例子'],
  colWidths: [35, 15, 10, 80]
})

table2.push(
  ['查看帮助', 'help', '-h', 'zgit -h 或 zgit --help'],
  ['查看 「 wekan 」列表 (敬请期待)', 'feature', 'f', 'zgit f 或 zgit feature'],
  ['查看 「 禅 道 」bug列表 ', 'bug', 'b', 'zgit b 或 zgit bug 后面可以跟自定义名称:zgit b xxx「一般用于没 bug 的情况」'],
  ['查看 「 禅 道 」任务列表 ', 'task', 't', 'zgit t 或 zgit task 后面可以跟自定义名称:zgit t xxx「一般用于没 bug 的情况」'],
  ['初始化 zgit 用户配置 ', 'clear', 'cr', 'zgit cr 或 zgit clear '],
  ['可以自动填写 commit 信息', 'commit', 'c', 'zgit c 或 zgit commit 后面可跟 msg:「zgit c 这是一次提交」 '],
  ['自动 push', 'push', 'p', 'zgit p 或 zgit push'],
  ['切换分支', 'checkout', 'co', 'zgit co 或 zgit checkout'],
  ['流产上次的merge', 'mergeAbort', 'ma', 'zgit ma 或 zgit mergeAbort  等同于 git merge --abort']
)

ZingCMD.prototype.listening = function () {
  // 初始化commander
  program
    .version(toolsInfo.version, '-v, --version')
    .usage('<cmd> [option]');

  program.on('--help', function () {
    console.info('')
    console.info('命令列表:' + toolsInfo.version)
    console.info(table2.toString())
  });


  if (program.fontend) {
    console.log('-fontend')
  }

  // 添加可选指令
  program
    .option('b bug')
    .option('t task')
    .option('f feature')
    .option('c commit')
    .option('cr clear')
    .option('p push')
    .option('co checkout')
    .option('ma mergeAbort')
    .parse(process.argv)

  if (program.bug) { // bug 命令
    let branchName = null;
    if (program.args.length > 0) {
      branchName = program.args[0]
      ZingGit.checkoutBranch(`fix-bug-${branchName}`, null);
      console.log("您自定义的分支名称：fix-bug-%s \n", branchName)
      return;
    }
    ZingFetch.bug({})
  }

  if (program.task) { // task 命令
    let branchName = null;
    if (program.args.length > 0) {
      branchName = program.args[0]
      ZingGit.checkoutBranch(`fix-task-${branchName}`, null);
      console.log("您自定义的分支名称：fix-bug-%s \n", branchName)
      return;
    }
    ZingFetch.task({})
  }

  if (program.feature) { // feature 命令
    ZingFetch.feature({})
  }

  if (program.commit) { // 提交 命令
    let msg = null;
    if (program.args.length > 0) {
      msg = program.args[0]
    }
    ZingGit.checkAndCommit(msg)
  }

  if (program.push) { // 提交 命令
    ZingGit.pushZinglabsRules()
  }

  if (program.mergeAbort) { // 提交 命令
    ZingGit.mergeAbort()
  }

  if (program.checkout) { // 提交 命令
    ZingGit.showAndCheckout()
  }

  if (program.clear) { // 清除配置
    ZingSQL.initDB()
  }






  program.parse(process.argv)



}

module.exports = new ZingCMD();