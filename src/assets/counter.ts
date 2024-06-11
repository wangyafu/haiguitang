interface IMessageOptions {
    message: string;
    type: string;
  }
  
  
export const userMessageCounter: {
    count: number; // 计数器初始化为0
    limit: number; // 次数限额
    timer:  number|null; // 用于存储定时器的引用
  
    // 方法：记录发送次数
    sendMessage: (theFunc: () => void) => void;
  
    // 方法：检查是否超过限额并给出警告
    checkLimitAndWarn: () => number;
  
    // 方法：重置计数器，每过一分钟调用一次
    resetCounter: () => void;
  
    // 方法：设置定时器，用于每分钟重置计数器
    setTimer: () => void;
  
    // 初始化，设置第一次定时器
    init: () => void;
  } = {
    count: 0, // 计数器初始化为0
    limit: 3, // 次数限额
    timer: null, // 用于存储定时器的引用
  
    // 方法：记录发送次数
    sendMessage: function (theFunc: () => void) {
      if (this.checkLimitAndWarn() === 0) {
        theFunc();
        this.count++;
      } // 检查是否超过限额并警告
    },
  
    // 方法：检查是否超过限额并给出警告
    checkLimitAndWarn: function (): number {
      // 输出当前次数
      
      
      if (this.count >= this.limit) {
        // 假设ElMessage是一个外部可用的函数，这里需要其定义或类型声明
        // 例如，如果它是Element Plus的消息组件，可能需要从相应的库中导入类型定义
        // 这里简单模拟一下，实际情况请根据你的环境调整
        const showMessage = (options: IMessageOptions) => console.log(options.message);
        showMessage({ message: '操作过于频繁！', type: 'warning' });
        return 1;
        // 可以在这里添加更多处理逻辑，如禁止发送等
      }
      return 0;
    },
  
    // 方法：重置计数器，每过一分钟调用一次
    resetCounter: function () {
      this.count = 0; // 重置计数器
    },
  
    // 方法：设置定时器，用于每分钟重置计数器
    setTimer: function () {
      // 如果之前有定时器在运行，先清除它，避免多个定时器同时运行
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => this.resetCounter(), 60000); // 每60000毫秒（即1分钟）执行一次resetCounter
    },
  
    // 初始化，设置第一次定时器
    init: function () {
      this.setTimer();
    }
  };
  
  // 调用初始化方法
  userMessageCounter.init();
  
  
  