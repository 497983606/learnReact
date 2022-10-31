import React from 'react'
import { Button, Modal} from '@douyinfe/semi-ui';
import { OrgProps, OrgItem } from '../../typing'
import Member from '../member/Member'
import OrgDialog from './OrgDialog'

const Org = ( { treeData, members, setData }: OrgProps ) => {

  // generate org item
  let childCompontent: React.ReactNode;
  if(treeData.child.length){
    childCompontent = treeData.child.map( (item, key) => {
      return (
        <div key={key} className="org_item">
          <Org treeData={ item } members={members} setData={ setData } />
        </div>
      )
    }) 
  }

  // def a import ref from member component
  interface MemberRefType {
    visiableDialog: () => void
  }
  const MemberRef = React.useRef<MemberRefType>(null)

  // delete org
  const deleteOrg = () => {
    Modal.confirm({
      title: "Are you sure delete " + treeData.name + ", If delete it, it's child will up level, and the users was all delete",
      okText:"Ok, I'm understant, Delete now!",
      cancelText: 'No ',
      onOk: () => setData({ id: treeData.id, type: "org", action: "del", info: {} })
    })
  }

  // definition form and dialog visible data
  const [orgFormData, setRrgFormData] = React.useState<Pick<OrgItem, 'name' | 'parent'>>({  name: "", parent: "" })
  const [visible, setVisiable] = React.useState<boolean>(false)

  const visiableOrgDialog = (data: OrgItem ) => {
    setVisiable(true)
    setRrgFormData( data)
  }

  const dialogSubmit = ({ name, parent, id}: OrgItem) => {
    setData({ id, type: "org", action: "editOrg", info: { name, parent} })
    setVisiable(false)
  }
  return (
      <div className='org'>
        <div className='org_detail'>
          <p className='org_line'>
            { treeData.name }
            <span>
              <Button size="small" type="danger" onClick={deleteOrg}>Delete</Button>
              <Button 
                size="small" 
                style={{ marginLeft: 10 }} 
                onClick={() => MemberRef.current?.visiableDialog()} 
                type="secondary"
              > 
                Add Member 
              </Button>
              <Button 
                size="small" 
                style={{ marginLeft: 10 }} 
                onClick={() => visiableOrgDialog(treeData)} type="warning"
              >
                Edit
              </Button>
            </span>
          </p>
          { 
          treeData.members  && 
          <Member 
            ref={ MemberRef }
            members ={ members?.filter(i =>treeData.members.includes(i.id) )}  
            setData ={ setData } 
            treeData ={treeData}
          /> 
          }
        </div>
        { childCompontent }
        <OrgDialog
          form={orgFormData}
          currentOrgId={treeData.id}
          submit={dialogSubmit}
          title={'Edit organization'}
          visible={visible}
          closeVisiable={() => setVisiable(false)}
        />
      </div>
  )
}

export default Org