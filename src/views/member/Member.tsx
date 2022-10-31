import React from "react"
import { UserProps, UserItem } from "../../typing"
import { Checkbox, Button, Radio, Modal } from '@douyinfe/semi-ui';
import MemberDialog from "./MemberDialog";
import './style.scss'

const Member = ({ members, setData, treeData} : UserProps, ref: any) => {
  // default form data
  const defFormData = {  name: "", age: "", org: treeData.id, status: ""}
  // definition form and dialog visible data
  const [userFormData, setUserFormData] = React.useState<UserItem>(JSON.parse( JSON.stringify( defFormData)) )
  const [visible, setVisiable] = React.useState<boolean>(false)
  const [dialogTitle, setDialogTitle] = React.useState<string>("Add member")

  // definition column keys to easy iteration 
  const col = [ "name", "age", "actived", "representation" ]

  const handleStatus= (checked: any, id: string) => {
    setData({ id, type: "member", action: "actived", info: { check: checked } })
  }
  
  // 
  const handleRepresentation = (checked: any, id: string, orgId: string) => {
    setData({ id, type: "member", action: "representation", info: { orgId } })
  }

  // handle delete member function
  const handleDelete = (id: string, name: string) => {
    Modal.confirm({
      title: "Are you sure delete " + name,
      okText:"Ok, Delete!",
      cancelText: 'No ',
      onOk: () => setData({ id, type: "member", action: "del", info: {} })
    })
  }

  const visiableDialog = (data?: UserItem ) => {
    if(data && data.id){
      setVisiable(true)
      setDialogTitle('Edit member')
    }else{
      setVisiable(true)
      setDialogTitle('Add member')
    }
    setUserFormData( data || JSON.parse(JSON.stringify(defFormData)) )
  }

  React.useImperativeHandle(ref, () => ({
    visiableDialog: visiableDialog
  }))

  const dialogSubmit = ({ name, org, age, id}: UserItem) => {
    if(id){
      setData({ id, type: "member", action: "editMember", info: { name, org, age} })
    }else{
      setData({ type: "member", action: "addMember", info: { name, org, age, status: "inactivated"} })
    }
    setVisiable(false)
  }

  return(
    <div className="members">
      <ul className="_title"> 
        {
          col.map((i, index) => {
            return <li key={index} >{ i }</li>
          })
        }
      </ul>
      <div className="_detail">
        <ul>
          { 
            members.map(({ name, age, status, id }, index) => {
              return <ol key={index}>
                <li>{ name }</li>
                <li>{ age }</li>
                <li>
                  <Checkbox 
                    onChange={checked => handleStatus(checked.target.checked, id)}
                    checked={status === 'activated'}
                  >
                  </Checkbox>
                </li>
                <li>
                  <Radio 
                    onChange={checked => handleRepresentation(checked.target.checked, id, treeData.id)} 
                    checked={id === treeData.representation }
                  >
                  </Radio> 
                </li>
                <span className="btns">
                  <Button size="small" type="danger" onClick={() => handleDelete(id, name)}>Delete</Button>
                  <Button size="small" onClick={() => visiableDialog({ id, name, age, org: treeData.id, status })}>Edit</Button>
                </span>
              </ol>
            })
          }
        </ul>
      </div>
      {/* member dialog */}
      <MemberDialog
        form={userFormData}
        submit={dialogSubmit}
        title={dialogTitle}
        visible={visible}
        closeVisiable={() => setVisiable(false)}
      />
    </div>
  )
}

export default React.forwardRef(Member)
