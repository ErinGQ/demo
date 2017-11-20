let states = require("../states").states;

/**
 * 用于处理邮件与用户的交互
 * @param {*} socket 
 */
function Mail(socket) {
    this.title = '';
    this.body = [];
    this.address = '';

    socket.on(states.MAIL_WRITE, (machine, socket, data) => {
        this.stateWrite(machine, socket, data);
    })
}

/**
 * 邮件写状态下，基本的接收入口
 * @param {*} machine 
 * @param {*} socket 
 * @param {*} data 
 */
Mail.prototype.stateWrite = function (machine, socket, data) {
    console.log("state write");
    if (!machine.action) {
        console.log("state write home");
        this.stateWriteHome(machine, socket, data);
    } else {
        console.log("inside not login else");
        switch (machine.action) {
            case 'wait':
                console.log("inside not login wait");
                this.stateWriteWait(machine, socket, data);
                break;
        }
    }
}

/**
 * 写邮件的主页面
 * @param {*} machine 
 * @param {*} socket 
 * @param {*} data 
 */
Mail.prototype.stateWriteHome = function (machine, socket, data) {
    socket.write('\n请输入你要修改的内容，\n\t1.收件人地址\n\t2.标题\n\t3.正文内容\n\t4.发送邮件\n');
    machine.action = 'wait';
}


/**
 * 主页面接收用户输入的函数
 * @param {*} machine 
 * @param {*} socket 
 * @param {*} data 
 */
Mail.prototype.stateWriteWait = function (machine, socket, data) {
    console.log("state write");
    let input = machine.getCleanedString(socket, data);
    console.log("input = " + input);
    switch (input) {
        case '1':
            this.stateWriteAddressWait(machine, socket, data);
            break;
        case '2':
            this.stateWriteTitleWait(machine, socket, data);
            break;
        case '3':
            this.stateWriteBodyWait(machine, socket, data);
            break;
        case '4':
            break;
        default:
            console.log("inside not login wait default");
            break;
    }
}
/**
 * 写邮件时，接收地址输入的函数
 * @param {*} machine 
 * @param {*} socket 
 * @param {*} data 
 */
Mail.prototype.stateWriteAddressWait = function (machine, socket, data) {
    socket.write("请输入接收用户的地址:\n")
    machine.action = 'address';
};


/**
 * 写邮件时，接收标题输入的函数
 * @param {*} machine 
 * @param {*} socket 
 * @param {*} data 
 */
Mail.prototype.stateWriteTitleWait = function (machine, socket, data) {
    socket.write("请输入标题:\n")
    machine.action = 'title';
};

/**
 * 写邮件时，接收正文输入的函数
 * @param {*} machine 
 * @param {*} socket 
 * @param {*} data 
 */
Mail.prototype.stateWriteBodyWait = function (machine, socket, data) {
    socket.write("请输入邮件内容:\n")
    machine.action = 'body';
};


exports.Mail = Mail;