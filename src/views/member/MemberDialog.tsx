import React from "react"
import rootContext from "../../model/busStore";
import { OrgItem, UserItem, UserDialogProps} from "../../typing"
import { Form,  Modal } from '@douyinfe/semi-ui';
import './style.scss'
const Member =  ({ submit, form, title, visible, closeVisiable} : UserDialogProps) => {

  let _formApi: any = null
  const { Select, Select: { Option }, InputNumber,  Input} = Form;

  // inject root store data : member
  const { orgList } = React.useContext(rootContext)

  // submit form data to parent
  const dialogSubmit = () => {
    _formApi.validate().then( (values: UserItem) => {
      submit(values)
    })
  }

  // use semi-ui FormApi hook get Form context
  const getFormApi = (formApi: {}) => {
    _formApi = formApi
  }

  // common verify required rulus
  const required = { required: true, message: "required error" }

  return <Modal
    title={title}
    visible={visible}
    onOk={ dialogSubmit }
    afterClose={() => closeVisiable()} 
    onCancel={() => closeVisiable()}
    closeOnEsc={false}
  >
    <Form 
      initValues={JSON.parse(JSON.stringify(form))}
      getFormApi={getFormApi}
    >
      <Input field='name' label='Member name' rules={ [ required ] }/>
      <InputNumber min={0} field='age' label='Member age' rules={ [ required ] }/>
      <Select field="org" label='Org'  disabled={form.id ? false : true}>
        {
          orgList.map((i: OrgItem, index: number) => {
            return <Option value={i.id} key={ index }>{ i.name }</Option>
          })
        }
      </Select>
    </Form>
</Modal>
}

export default Member