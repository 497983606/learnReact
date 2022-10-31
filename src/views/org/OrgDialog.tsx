import React from "react"
import rootContext from "../../model/busStore";
import { OrgItem, OrgDialogProps} from "../../typing"
import { Form,  Modal } from '@douyinfe/semi-ui';
import './style.scss'
const Member =  ({ submit, form, currentOrgId, title, visible, closeVisiable} : OrgDialogProps) => {

  let _formApi: any = null
  const { Select, Select: { Option },  Input} = Form;

  // inject root store data : member
  const { orgList } = React.useContext(rootContext)

  // submit form data to parent
  const dialogSubmit = () => {
    _formApi.validate().then( (values: OrgItem) => {
      submit(values)
    })
  }

  // use semi-ui FormApi hook get Form context
  const getFormApi = (formApi: {}) => {
    _formApi = formApi
  }
  
  const isFather = (id: string, pid: string): boolean => {
    let item = orgList.find((i: OrgItem) => i.id === id)
    if(item.parent === pid || id === pid) return false
    if(item.parent === "null") return true
    if(item.parent !== pid) return isFather(item.parent, pid)
    return false
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
      <Input field='name' label='Organization name' rules={ [ required ] }/>
      <Select field="parent" label='Parent'>
        <Option value={"null"} >root </Option>
        {
          orgList.filter( (i: OrgItem) => isFather(i.id, currentOrgId) ).map((i: OrgItem, index: number) => {
            return <Option value={i.id} key={ index }>{ i.name }</Option>
          })
        }
      </Select>
    </Form>
</Modal>
}

export default Member