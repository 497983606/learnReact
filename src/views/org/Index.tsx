import React from 'react'
import { Button, Modal} from '@douyinfe/semi-ui';
import { OrgItem } from '../../typing'
import rootContext from '../../model/busStore';
import Org from './OrgItem';
import useApiHook from './useApiHook'
import OrgDialog from './OrgDialog'

import './style.scss'

export default () => {
  const { orgTree, setData, members, orgList, setOrgList, setMembers ,fetchData, saveDataToLocalStorage } = useApiHook()

  const [visible, setVisiable] = React.useState<boolean>(false)
  const addVisiableOrgModel = () => {
    setVisiable(true)
  }

  // fetch and handle data acceptable for "OrgProps"
  React.useEffect(() => {
    let data = localStorage.getItem('data')
    if(!data) fetchData()
    try{
      if(!data) throw 'data is not a json string'
      let res = JSON.parse(data)
      setMembers( res.members )
      setOrgList( res.orgList )
    }catch(err){
      fetchData()
    }
  }, [])

  const dialogSubmit = ({ name, parent }: OrgItem) => {
    setData({ type: "org", action: "addOrg", info: { name, parent, members: [], representation: "", type: "organization", child:[]} })
    setVisiable(false)
  }
  // savedata to localStorage
  const saveData = () => {
    Modal.confirm({
      title: "Save operation will save data (member and org) at localStorage.",
      okText:"Ok, I'm understant",
      cancelText: 'No, thanks',
      onOk: () => saveDataToLocalStorage()
    })
  }
  // savedata to localStorage
  const cancel = () => {
    Modal.confirm({
      title: "this operation will reset from data json file.",
      okText:"Ok, Go!",
      cancelText: 'No ',
      onOk: () => fetchData()
    })
  }

  return (
    <rootContext.Provider value={{ orgList }}>
      <div className='wrap'>
        <h2>Org Mangement 
          <span>
            <Button theme='solid' type='secondary' onClick={addVisiableOrgModel} style={{ marginRight: 8 }}>Add Org</Button>
            <Button onClick={cancel}> Cancel </Button>
            <Button theme='solid' onClick={saveData} type='primary'> Save </Button>
          </span>
        </h2>
        {
          orgTree.map( (item, key)  =>{
            return  <div key={key} className="org_box">
                      <Org treeData={item} members={members} setData={setData}/>
                    </div>
          })
        }
      </div>
      <OrgDialog
        form={{ name: "", parent: "null" }}
        currentOrgId={""}
        submit={dialogSubmit}
        title={"Add"}
        visible={visible}
        closeVisiable={() => setVisiable(false)}
      />
    </rootContext.Provider>
  ) 
}