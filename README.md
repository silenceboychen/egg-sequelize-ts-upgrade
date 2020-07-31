# egg-sequelize-ts-upgrade

## 说明
该项目只是对[egg-sequelize-ts]('https://github.com/stone-lyl/egg-sequelize-ts')的一个升级，由于[egg-sequelize-ts]('https://github.com/stone-lyl/egg-sequelize-ts')使用的sequelize和sequelize-typescript版本太低，导致无法使用BelongsTo等关联装饰器。给[egg-sequelize-ts]('https://github.com/stone-lyl/egg-sequelize-ts')提的PR一直没人处理（看起来没人维护了），所以做了一下升级并重新发布到npm使用。

## 更改
插件只是将 `egg-sequelize` 中的 sequelize 替换为 sequelize-typescript, 同时保证用户在 egg.js 创建的项目中使用 `egg-sequelize` 的方法尽量一致，在使用时的不同，我将下面一一阐述。 其他内容部分请查看 [egg-sequelize]('https://github.com/eggjs/egg-sequelize')。
此插件已在生产项目中得到实践。

## 目的
能让使用 `typescript` 编写的 egg.js 项目中能够使用 sequelize方法，并同时得到egg.js所赋予的功能。

## 安装
```bash
$ npm i --save egg-sequelize-ts-upgrade
$ yarn add egg-sequelize-ts-upgrade
```

## 配置
- Enable plugin in `config/plugin.js`
- 在 `config/plugin.js` 文件中引入 `egg-sequelize-ts-upgrade` 组件

``` js
exports.sequelize = {
    enable: true,
    package: 'egg-sequelize-ts-upgrade'
}
```

- Edit your own configurations in `conif/config.{env}.js`
在 `conif/config.{env}.js` 中编写 sequelize 配置

```js
    config.sequelize = {
        dialect: 'mysql',
        host: '127.0.0.1',
        port: 3306,
        database: 'database'
    };
```

## 例子
分别以 model/user.js 和 service/user.js 举例说明
> note 注意我们都是从 `sequelize-typescript` 中导出类名，方法，属性等。

```js
// app/model/user.js

/**
 * @desc 用户表
 */
import { AutoIncrement, Column, DataType, Model, PrimaryKey, Table } from 'sequelize-typescript';
@Table({
    modelName: 'user'
})
export class User extends Model<User> {

    @PrimaryKey
    @AutoIncrement
    @Column({
        type: DataType.INTEGER(11),
        comment: '用户ID',
        comment: 'user id'
    })
    id: number;

    @Column({
        comment: '用户姓名',
    })
    name: string;

    @Column({
        comment: '用户邮箱'
    })
    email: string;

    @Column({
        comment: '用户手机号码'
    })
    phone: string;

    @Column({
        field: 'created_at'
    })
    createdAt: Date;

    @Column({
        field: 'updated_at'
    })
    updatedAt: Date;
};
export default () => User;

```

```js
// app/service/user.js
import { Service } from 'egg';
import { Sequelize } from 'sequelize-typescript';

class UserService extends Service {
  async index() {
    const { or } = Sequelize.Op;
    const users = await this.ctx.model.User.findOne({
        where: {
            [or]: [
                { name, phone },
                { id }
            ]
        }
    });
    this.ctx.body = users;
  }
}
```

