# learnReact

Demo https://497983606.github.io/learnReact/

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

