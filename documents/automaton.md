### 作为自动机的无定牌

无定牌的局面可以视为一个自动机。对于服务端而言，自动机总是稳定在我们称之为计算态的状态。
对于每个状态而言，自动机有接收的指令集合。和数学意义上的自动机不同，输入一个非法的指令仅仅是会被拒绝而已。
这一自动机有终止态。
关于自动机的详细状态设计，详见 standard.md 的游戏进程一节。