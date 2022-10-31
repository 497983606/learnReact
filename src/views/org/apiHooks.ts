import { useState, useEffect } from 'react'
import { UserItem, OrgItem, OrgObj, setParams} from '../../typing'
import axios from 'axios'

const useApiHooks = () => {

  // make a axios instance
  const http = axios.create({
    headers:{ 'Content-Type':'application/json;charset=UTF-8' }
  })

  // use tree data, because inerface OrgProps is recursive, so need Partial to change
  const [orgTree, setOrgTree] = useState< OrgItem[] >([])
  const [members, setMembers] = useState< UserItem[] >([])
  const [orgList, setOrgList] = useState< OrgItem[] >([])


  // list transform tree
  const list2Tree = ( org: OrgItem[]): OrgItem[] => {
    const treeData: OrgObj = {}
    org = JSON.parse(JSON.stringify(org))
    org.forEach( item => {
        treeData[item.id] = item
        treeData[item.id].child = []
    })
    return org.filter(item => {
        if (item.parent !== "null") {
            treeData[item.parent].child.push(item)
            return false
        }
        return true
    })
  }

  // save data to localStorage
  const saveDataToLocalStorage = () => {
    localStorage.setItem('data', JSON.stringify({ members, orgList }) )
  }

  // fetch member and org data from json || locstorge
  const fetchData = async (): Promise<void> => {
    let res = await Promise.all([
      await http.get('./data/orgs.json'),
      await http.get('./data/members.json')
    ])
    if(res.every(i => i.status === 200)){
      res[0].data.map((i: OrgItem) => {
        i.members = i.members || []
        i.parent === null && (i.parent = "null")
      })

      setMembers( res[1].data )
      setOrgList( res[0].data )

      localStorage.removeItem('data')
    }
  }
  
  // fetch and handle data acceptable for "OrgProps"
  useEffect(() => {
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

  // watch orgList to render tree
  useEffect(() => setOrgTree( list2Tree(orgList) ), [orgList])

  // set treeData and mumber from params
  const setData = ({ type, id, info, action }: setParams) => {
    
    // clone members and org data
    const cloneMembers: UserItem[] = JSON.parse(JSON.stringify( members )),
          cloneOrg: OrgItem[] = JSON.parse(JSON.stringify( orgList ))
          
    // match action to compose handle function
    switch(true){
      case action === 'del': id && handleDelete(type, id, cloneMembers, cloneOrg); 
           break;
      case action === 'addMember': addMember(info, cloneMembers, cloneOrg);
           break;
      case action === 'addOrg': addOrg(info, cloneOrg);
           break;
      case action === 'editMember': id && editMember(id, info, cloneMembers, cloneOrg);
           break;
      case action === 'editOrg': id && editOrg(id, info, cloneOrg);
           break;
      case action === 'actived': id && activedUser(id, info.check, cloneMembers);
           break;
      case action === 'representation': id && representationUser(info.orgId, id, cloneOrg);
           break;
    }

    // reset members and tree
    setMembers(cloneMembers)
    setOrgList(cloneOrg)
  }

  // delete Member or Org by id
  const handleDelete = (type: string, id: string, users: Array<UserItem>, orgs: Array<OrgItem> ) => {
    const list = type === 'user' ? users : orgs
    if(type === 'org'){
      let item = orgs.find(i => i.id === id)
      let itemChild = orgs.find(i => i.parent === id)
      if( item && itemChild) itemChild.parent = item.parent
      if( item ) item.members.map((i: string) => handleDelete( 'member', i, users, orgs))
    }
    if(type === 'member'){
      orgs.forEach(i => {
        let _index = i.members.indexOf(id)
        if(_index > -1) i.members.splice(_index, 1)
      })
    }
    for(let i = 0; i < list.length; i++){
      if(list[i].id === id){
        list.splice(i, 1)
        break;
      }
    }
    return list
  }

  // add menber
  const addMember = ({ name, age, status, org }: UserItem, users: Array<UserItem>, orgs: Array<OrgItem> )=> {
    let id = 'member-' + new Date().getTime() 
    users.unshift({ name, age, status, id })
    org && moveUser(id, org, orgs)
    return users
  }

  // add org
  const addOrg = ({ name, members, type, representation, parent, child }: OrgItem, orgs: Array<OrgItem> )=> {
    let id = 'member-' + new Date().getTime() 
    orgs.unshift({ name, members, id, type, representation, parent, child })
    return orgs
  }

  // edit Member
  const editMember = ( id: string, { name, age, org }: UserItem, users: Array<UserItem>, orgs: Array<OrgItem>  ) => {
    users.forEach(i => {
      if(i.id === id){
        i.name = name
        i.age = age
      }
    })
    org && moveUser(id, org, orgs)
    return users
  }

  // edit Org
  const editOrg = (id: string, { name, parent }: Pick<OrgItem, 'name'|'parent'|'id'>, orgs: Array<OrgItem>  ) => {
    let item = orgs.find(i => i.id === id)
    if(item){    
      item.name = name
      item.parent = parent
    }
    return orgs
  }

  // move user to org and delete from old org
  const moveUser = (id: string, orgId: string, orgs: Array<OrgItem>) => {
    orgs.forEach(i => {
      let _index = i.members.indexOf(id)
      if(i.id === orgId && _index < 0 ) i.members.unshift(id)
      if(i.id !== orgId && _index > -1 ) i.members.splice(_index, 1)
    })
    return orgs
  }

  // actived user
  const activedUser = (id: string, check: boolean, users: Array<UserItem>) => {
    users.forEach(i => {
      if(i.id === id ) i.status = check ? 'activated' : 'inactivated' 
    })
    return users
  }

  // edit org representation member
  const representationUser = (id: string, userId: string, orgs: Array<OrgItem>) => {
    orgs.forEach(i => {
      if(i.id === id ) i.representation = userId
    })
    return orgs
  }

  return {
    orgTree,
    members,
    orgList,
    setData,
    fetchData,
    saveDataToLocalStorage
  }
}

export default useApiHooks