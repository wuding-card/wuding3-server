### 无定牌标准译名表及其约定
**和 client 中的取并集**
#### 游戏进程

回合: turn
  一名玩家占据主动的一段时间。
阶段: stage
  分割回合的单位。
步骤: step
  分割阶段的单位。
轮: round
  两名玩家各执一回合后完成一轮。

游戏开始步骤: gameStart step
准备阶段: prepare stage
  重置步骤: untap step (C)
  回合开始步骤: turnStart step
  修炼步骤: practice step
行动阶段: action stage
  行动开始步骤: actionStart step
  自由行动步骤: freeAction step
  行动结束步骤: actionEnd step
结束阶段
  结束步骤: turnEnd step
  弃牌步骤: discard step
游戏结束步骤: gameEnd step

#### 游戏内容

命火: health
灵力: mana
修为: level 
法术: sorcery
法器: equipment
法阵: zisurru
优先权: priority
先手玩家: Alice
后手玩家: Bob
行动：
  - 修炼: practice
    修炼动作，玩家需要在两项中选择其一：摸 2 张牌，或是增加 1 修为。
  - 行动: action
    行动动作，玩家可以进行以下动作中的任意多个:
      从手牌中选择 1 张可用的即时法术牌，支付其释放费用，并依照牌面要求选择合法目标。若法术牌不可用，或无法支付其释放费用，或支付其释放费用后无法选择合法目标，则不能进行这个动作。
事件: 
  - 疲劳: exuast
    当你试图抽 1 张牌而灵犀瓶里没有牌时，你失去 1 点命火。

### 无定牌标准id列表
门派: 通用,奔雷,焚金,焚天,光华,飘渺,天灵,万法,元力
类别: 万物,即时,触发,持续,法阵,攻击,防御,法器
修为: 凡人,炼气,筑基,金丹,元神,炼虚,涅槃,逍遥