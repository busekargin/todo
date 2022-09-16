import React, { useState } from "react";
import {Button, Input, Modal, Select, Table} from "antd";
import { Option } from "antd/lib/mentions";

const TodoList = () =>{
    

    const [name,setName]=useState("");
    const [estimatedtime,setEstimatedtime]=useState("");
    const [spenttime,setSpenttime]=useState("");


    const [data, setData] =useState([
        {
            name:"Ebru",
            estimatedtime:25,
            spenttime:10,
        },
        {
            name:"buse",
            estimatedtime:15,
            spenttime:45,
        }
    ])

    
   const columns=[
    {
        title:'Name',
        dataIndex:'name',
        key:'name',
    },
    {
        title:'Estimated Time',
        key:'estimatedtime',
        dataIndex:'estimatedtime',
        
    },
    {
        title:'Spent Time',
        dataIndex:'spenttime',
        key:'spenttime',
    },
    {
        title:'Time',
        key:'time',
        render:(record) =>{
            return record.estimatedtime-record.spenttime
        }
    },
    {
        title:'Actions',
        render:(record) =>{
            return(
                <>
                <Select style={{width:'200px'}}>
                    <Option value="yeni">Yeni</Option>
                    <Option value="çalişiyor">Çalışıyor</Option>
                    <Option value="bitti">Bitti</Option>
                </Select>
                </>
            )
        }
    }
   ];

   const addUser=(record)=>{
    Modal.confirm({
        title:"kaydedilsin mi?",
        okText:"Evet",
        okType:"primary",
        onOk:() =>{
            setData((pre) =>{
                return[...pre,newuser];
            });
        }
    })
   }

    const newuser={
        name:name,
        estimatedtime:estimatedtime,
        spenttime:spenttime
    };




   return(
    <>
    <div>
            Name
            <Input onChange={(a)=>setName(a.target.value)} />
            Estimated Time
            <Input onChange={(a) => setEstimatedtime(a.target.value)}/>
            Spent Time
            <Input onChange={(a) => setSpenttime(a.target.value)}/>

            <Button type='primary' style={{right: '0', display: 'flex'}} onClick={addUser}>Save</Button>
              </div>
        
    
        <Table columns={columns} dataSource={data} />
   
       
    </>
   )
}



export default React.memo(TodoList)














