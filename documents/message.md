### Client 至 Server 的消息整理

#### 用户信息
``user-login`` 给予当前链接一个名字。

#### 房间信息
``join-room name`` 加入名为 ``name`` 的房间。
``room-start-game`` 使当前房间游戏开始。
``swap-room-user`` 交换两个玩家的先后手。
``leave-room`` 离开房间。
``get-deck-list interval[]`` 获取 ``intervel[0]`` 至 ``interval[1]`` 之间页码的卡组列表。

#### 游戏内通讯
``player-signal-ingame playerSignal``  发送内容为 ``playerSignal`` 的信号，并让 Room 尝试将其传入自动机。

### Server 至 Client 的消息整理
