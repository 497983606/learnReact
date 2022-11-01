import { renderHook, act } from '@testing-library/react-hooks';
import UseApiHook from './useApiHook'

const memberMockData = { name: 'testMember', id: 'm-1', status: "activated", age: "12" }
const orgMockData = { name: 'testOrg', id: 'o-1', representation: "m-1", type: "organization", child: [], parent: "null", "members": []}

describe("UseApiHook unit test", () => {
  it("Test setMmber", () => {
    const { result } = renderHook(() => UseApiHook())
    act(() => { result.current.setMembers([memberMockData]) } )
    expect(result.current.members.length).toBeGreaterThan(0)
  })

  it("Test setOrList", () => {
    const { result } = renderHook(() => UseApiHook())
    act(() => { result.current.setOrgList([orgMockData]) } )
    expect(result.current.orgList.length).toBeGreaterThan(0)
  })

  it("Test setOrList to orgTree", () => {
    const { result } = renderHook(() => UseApiHook())
    const childOrg = JSON.parse(JSON.stringify(orgMockData))
          childOrg.id = "o-2"
          childOrg.parent = "o-1"
          childOrg.members = []
    act(() => { result.current.setOrgList([orgMockData, childOrg]) } )
    expect(result.current.orgTree[0].child[0].id).toBe("o-2")
  })

  it("Test add member", async () => {
    const { result, waitForNextUpdate} = renderHook(() => UseApiHook())
    const info = { org: "o-2", name: "test", age: "11"}
    const childOrg = JSON.parse(JSON.stringify(orgMockData))
          childOrg.id = "o-2"
          childOrg.parent = "o-1"
          childOrg.members = []
    act(() => { 
      result.current.setOrgList([orgMockData, childOrg])
      setTimeout(() => result.current.setData( {type: "member", action: "addMember", info} ));
    })
    await waitForNextUpdate()
    expect(result.current.orgTree[0].child[0].members.length).toBeGreaterThan(0)
  })

  it("Test delete member", async () => {
    const info = { org: "o-1", name: "test", age: "11"}
    const { result, waitForNextUpdate} = renderHook(() => UseApiHook())
    act(() => { 
      result.current.setOrgList([ orgMockData ])
      result.current.setMembers( [memberMockData] )
      setTimeout(() => result.current.setData( {type: "member", id: "m-1", action: "del", info: {}} ));
    })
    await waitForNextUpdate()
    expect(result.current.orgTree).toEqual([ orgMockData ])
  })

  it("Test move org", async () => {
    const { result, waitForNextUpdate} = renderHook(() => UseApiHook())
    const childOrg = JSON.parse(JSON.stringify(orgMockData))
          childOrg.id = "o-2"
          childOrg.parent = "o-1"
          childOrg.members = []
    act(() => { 
      result.current.setOrgList([orgMockData, childOrg])
      setTimeout(() => result.current.setData( { type: "org", id: "o-2", action: "editOrg", info: { name: childOrg.name, parent: "null" }} ));
    })
    await waitForNextUpdate()
    expect(result.current.orgTree.length).toBe(2)
  })

})