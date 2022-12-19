
import './App.css';
import {useEffect, useState} from 'react'
import Axios from 'axios'

function App() {
  const [name,setName]=useState('')
  const [age,setAge]=useState(0)
  const [listOfFriends,setListOfFriends]=useState([])

  const updateFriend=(id)=>{
    const newAge=prompt("Enter New Age:");
    Axios.put('http://localhost:3001/update',{newAge:newAge,id:id}).then(()=>{
      setListOfFriends(listOfFriends.map((elem)=>{
                  return elem._id===id ? {_id:id,name:elem.name, age:newAge} : elem
      }))
    })

  }

  const addFriend=()=>{
    Axios.post('http://localhost:3001/addFriend',{
      name:name,age:age
    }).then((response)=>{
      console.log('Success')
      setListOfFriends([...listOfFriends,{_id:response.data.id,name:name,age:age}])
    }).catch(()=>{
      console.log('Failed')
    })
  }

  const deleteFriend=(id)=>{
    Axios.delete(`http://localhost:3001/delete/${id}`).then(()=>{
           setListOfFriends(
            listOfFriends.filter((elem)=>{
                   return elem._id!==id;   
            })
          )
          })
        }
    
  

  useEffect(()=>{
        Axios.get('http://localhost:3001/read',{

        }).then((response)=>{
          setListOfFriends(response.data)

        }).catch(()=>{
          console.log('error')
        })
  },[])
  return (
    <div className="App">
      <div className='inputs'>
      <input type="text" placeholder='Friend name....'
       onChange={(e)=>{setName(e.target.value)}}></input>
     <input type="number" placeholder='Friend Age....'
     onChange={(e)=>setAge(e.target.value)}
     ></input>
     <button onClick={addFriend}>Add friend</button>
      </div>
      <div className='listOfFriends'>
      {
        listOfFriends.map((elem)=>{
          return (
            <div key={elem._id} className='friendContainer'>
            <div className='friend'>
            <h3>Name : {elem.name}</h3>
            <h3>Age : {elem.age}</h3>
           
             
            </div>
             <button  onClick={()=>updateFriend(elem._id)}>Update</button>
             <button onClick={()=>deleteFriend(elem._id)} id='removeBtn'>Delete</button>
             </div>
          )
        })
      }

      </div>
      
     
    </div>
  );
}

export default App;
