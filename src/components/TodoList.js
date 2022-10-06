import React, { useEffect, useState } from "react";
import { Button, Form, Input, Modal, Select, Table } from "antd";
import { Option } from "antd/lib/mentions";
import FormItem from "antd/lib/form/FormItem";

const selectOptions = {
  YENI: 0,
  CALISIYOR: 1,
  BITTI: 2,
}

const TodoList = () => {
  const [buttonActive, setButtonActive] = useState(true)
  const [name, setName] = useState("");
  const [spenttime, setSpenttime] = useState(0);
  //   const [newtime, setNewtime] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editUser, setEditUser] = useState({});
  const [tableId, setTableId] = useState(uuidv4());
//uuid key yaratıyor
  function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
      (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
  }


  
  const [data, setData] = useState([
    {
      name: "Ebru",
      spenttime: 0,
      key: uuidv4(),
      status:1,
    },
    {
      name: "Buse",
      spenttime: 0,
      key: uuidv4(),
      status:2,
    },
  ]);
  

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Spent Time",
      dataIndex: "spenttime",
      key: "spenttime",
    },
    {
      title: "Time",
      key: "time",
      render: (record) => {
        return (
          <span>{record?.time}</span>
        );
      }
    },
    {
      title: "button",
      render: (record) => {
        return (
          <Button
            type="primary"
            style={{ right: "0", display: "flex" }}
            onClick={()=>{
              setEditUser({ ...record });
              showModal()
            }
              }
            disabled={record.status!==selectOptions.CALISIYOR?true:false}
          >
            Time
          </Button>
        );
      },
    }, 
    {
      title: "Actions",
      render: (record) => {
        return (
          <>
            <Select
              onChange={(value) => 
                {
                  record.status=value
                  const arr=data.filter(el=>el.key!=record.key)
                  setData([...arr,record])
                }
                 
               
              
            } 
              value={record.status} 
              style={{ width: "200px" }}
              key="actionsselect"
            >
              <Select.Option value={selectOptions.YENI}>Yeni</Select.Option>
              <Select.Option value={selectOptions.CALISIYOR}>Çalışıyor</Select.Option>
              <Select.Option value={selectOptions.BITTI}>Bitti</Select.Option>
            </Select>
          </>
        );
      },
    },
  ];
  const sortData=(unsorteddata)=>{
   return unsorteddata.sort((a,b)=>(a.name > b.name) ? 1 : ((b.name > a.name) ? -1 : 0))
    
  }

  useEffect(() => {
    setTableId(uuidv4())
  }, [data]);

  const addUser = () => {
    const newuser={name,spenttime,key:uuidv4(), status:0}
    Modal.confirm({
      title: "kaydedilsin mi?",
      okText: "Evet",
      okType: "primary",
      onOk: () => {
        setData((pre) => {
          return [...pre, newuser];
        });
      },
    });
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  const hideModal = () => {
    setIsModalOpen(false);
  };

  const handleTime = () => {
    data.map((e) => {
      e.time = e.key === editUser.key ? editUser.time : e.time;
    
    });
    console.log(data)
    console.log(editUser)
}

//   useEffect(() => {
//     handleTime();
//     console.log(data);
//   }, [editUser]);

  const renderModal = () => {
    return (
      <Modal
        title="Time"
        open={isModalOpen}
        okText="Kaydet"
        onCancel={hideModal}
        onOk={() =>{
            handleTime()
             setIsModalOpen(false)}}
      >
        <Form layout="vertical">
          <FormItem label="Süre giriniz">
            <Input
              type="number"
              onChange={(a) =>
                setEditUser((pre) => {
                  return {
                    ...pre,
                    time: Number(a.target.value) + Number(spenttime),
                  };
                })
              }
            />
          </FormItem>
        </Form>
      </Modal>
    );
  };
  
  return (
    <>
      <div>
        <>
        <label id="namelabel">Name:</label>
        <Input onChange={(a) => setName(a.target.value)} id="inputname" />
        </>
        <br></br>
        <>
        <label id="spentlabel">Spent Time:</label>
        <Input
          value={0}
          disabled
          onChange={(a) => setSpenttime(a.target.value)}
          id="inputspent"
        />
        </>
        {/* <Button type='primary' style={{right: '0', display: 'flex'}} onClick={showModal}>Time</Button> */}
        <Button
        id="savebtn"
          type="primary"
          style={{ right: "0", display: "flex",fontsize:"60px" }}
          onClick={addUser}
        >
          Save
        </Button>
      </div>
      {renderModal()}

      <Table id={tableId} columns={columns} dataSource={sortData(data)} />
    </>
  );
};

export default React.memo(TodoList);
