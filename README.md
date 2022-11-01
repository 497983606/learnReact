# learnReact

Demo https://497983606.github.io/learnReact/
## Describe 
> 因为平常主要是在开发一些 Threejs + Canvas + Svg 的图形化界面，使用 Vue 比较多，所以没有实际接触过一个生产环境的 React 项目，应该是第一比较完整的应用 React + Typescript，耗时三个晚上累计 5+ 小时，在 UI 库的选择上也是比较仓促，一切都比较仓促（最近在 997，但是答应了提交 !!-_- ），整体还有很高的提升空间，比如组织层级在可视化上看起来并没有特别直观，组织的改变可以做到更好，比如使用拖拽等，其他一些因为时间原因和新知识刚接触的缘故，对项目中有待提高的点做了如下记录：


* 成员不支持加入多个组织
* 成员、组织名称没有做重复校验
* 删除组织之后连同成员一起删除
* 没有使用线条丰富层级关系（可以使用 before 和 after 等为元素实现，但比较繁琐，还是时间问题）
* 单元测试复用性不太好

项目使用了 create-react-app typrscript template，依赖 douyinfe 的 semi-ui，由于库针对 React 的版本问题，console 会有一些警告。 
## Test case ( normal )
  完成了部分测试用例
  * [x] 设置成员
  * [x] 设置组织
  * [x] 设置树结构
  * [x] 新增用户
  * [x] 删除用户
  * [x] 移动组织
  * [ ] 持久化数据
  * [ ] 修改组织名称
  * [ ] 修改用户
  * [ ] 刷新数据 
  * [ ] 修改用户状态
  * [ ] 设置 representation 成员

## Components Tree
```bash
Index.tsx

|--Org.tsx
  |--OrgItem.tsx
    |--OrgDialog.tsx
    |--Member.tsx
      |--MemberDialog.tsx
```

## 另外的一些独立做的东西
* https://www.youtube.com/watch?v=5VMF5osqMWY&t=157s 
* https://taiwutech.com/
* https://wangyesheji.cn/
* https://wangyesheji.cn/images/me/

## Useage

### Install
```bash
npm install
```
### Build
```bash
npm run build
```
### Test
```bash
npm run test
```
### Launch
```bash
npm run start
```

