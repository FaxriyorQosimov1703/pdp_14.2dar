import React,{useEffect, useState, useRef} from 'react';
import Modal from './Components/Modala';
import EditModal from './Components/EditModal';

export default function App() {
    const [count, setCount] = useState([0])
    const [users, setUsers] = useState([]);
    const [visible, setVisible] = useState(false);
    const [search, setSearch] = useState('');
    const [completed, setCompleted] = useState(true);
    const [editVizible, setEditVizible] = useState(false);
    const [editUsers, setEditUsers] = useState({})


    function save(event) {
        event.preventDefault()
        const fname = event.target[0].value;
        const lname = event.target[1].value;
        const uname = event.target[2].value;
        let a = users.push({id: users.length, firstname: fname, lastname: lname, username: uname, isActive: true})
        setVisibled();
        count.push(0)
        setCount([...count])
    }
    function addCount(id) {
        count[id]++
        setCount([...count])
    }   
     function removeCount(id) {
        count[id]--
        setCount([...count])
    }
    function getSearch(event) {
         const searchValue = event.target.value;
         setSearch(searchValue)

    }



    function removeItem(itemId) {
       users.splice(itemId, 1)
        setUsers([...users])
    }

    function onChecked(event) {
        const checked = event.target.checked;
        setCompleted(checked)

    }
    function openEditModal(id) {
        setEditVizible(prev=>!prev)
        let sum= users.filter(item=>item.id == id)
        setEditUsers(sum[0]);
       console.log(sum[0]);
    }

    function setVisibled() {
        setVisible(prev=>!prev)
    }

    function editSave() {
        let num = users.map(item=>item.id===editUsers.id?editUsers:item)
        setUsers(num)
        setEditVizible(false)
    }
    return (
        <div className="container">
            <div className="row my-4">
                <div className="col-md-6">
                    <input   onChange={getSearch} className="form-control" placeholder="search..." type="text" name="" id=""/>
                </div>
                <div  className="col-md-4"><input checked={completed} onChange={onChecked} style={{transform: 'scale(2)'}} type="checkbox" name="" id=""/></div>
                <div className="col-md-2 ">
                    <button onClick={setVisibled} className="btn btn-dark">Add</button>
                </div>
            </div>
            <div className="row">
                <div className="col-md-12">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th>#</th>
                                <th>FistName</th>
                                <th>LastName</th>
                                <th>UserName</th>
                                <th>Count</th>
                                <th>Active</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                users.length !== 0?users.filter(summ=>{
                                    if(search === ""){
                                        return summ
                                    }else if(
                                        summ.firstname.toLowerCase().includes(search.toLowerCase()) ||
                                        summ.lastname.toLowerCase().includes(search.toLowerCase()) ||
                                        summ.username.toLowerCase().includes(search.toLowerCase())
                                    ){
                                        return summ
                                    }
                                }).filter(item=>item.isActive == completed && item.isActive === true).map((item,index) => 
                                    
                                    <tr className="text-center" key={item.id}>
                                        <td>{item.id+1}</td>
                                        <td>{item.firstname}</td>
                                        <td>{item.lastname}</td>
                                        <td>{item.username}</td>
                                        <td>
 
                                            <button onClick={()=>addCount(item.id)} className="btn btn-dark mx-2">+</button>
                                            <h5 className='d-inline'>{count[item.id]}</h5>
                                            <button onClick={() =>removeCount(item.id)} className="btn btn-dark mx-2">-</button>

                          
                                            </td>
                                        <td><input 
                                        style={{transform: 'scale(2)'}}
                                         type="checkbox" 
                                         defaultChecked={item.isActive}  
                                         />
                                         </td>
                                        <td>
                                            <button onClick={()=>openEditModal(item.id)} className="btn btn-dark mx-2">edit</button>
                                            <button onClick={() => removeItem(index)} className="btn btn-dark mx-2">&times;</button>
                                        </td>
                                    </tr>
                                    
                                    ):  <h3 className="text-danger">Add tugmasini bosing</h3>
                            }
                        </tbody>
                    </table>
                </div>
            </div>
            <Modal visible={visible}  setVisibled={setVisibled} save={save} />
            <EditModal 
            editSave={editSave}
            editVizible={editVizible}
            openEditModal={openEditModal}
            editUsers={editUsers}
            setEditUsers={setEditUsers} />
        </div>
    )
}
