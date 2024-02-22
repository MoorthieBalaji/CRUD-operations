import { useState, useEffect } from 'react';
import './App.css';
import axios from "axios";
import {Row,Col} from "react-bootstrap"
import { MdEdit } from "react-icons/md";
import { MdDelete } from 'react-icons/md';
import Formtable from './Component/Formtable';
import 'bootstrap/dist/css/bootstrap.min.css';
import  {Button}  from 'react-bootstrap';
import Table from 'react-bootstrap/Table';
axios.defaults.baseURL = "http://localhost:9090/";

function App() {
  const [addSection, setAddSection] = useState(false);
  const [editSection, setEditSection] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
  
  });

  const [formDataEdit, setFormDataEdit] = useState({
    name: "",
  
    _id: ""
  });

  const [dataList, setDataList] = useState([]);

  const handleOnChange = (e) => {
    const { value, name } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await axios.post("/create", formData);
    console.log(data);
    if (data.data.success) {
      setAddSection(false);
      // alert(data.data.message);
      getFetchData();
      setFormData({
        name: "",
        email:"",
        mobile:""
      });
    }
  };

  const getFetchData = async () => {
    const data = await axios.get("/");
    if (data.data.success) {
      console.log(data);
      setDataList(data.data.data);
    }
  };

  useEffect(() => {
    getFetchData();
  }, []);

  const handleDelete = async (id) => {
    const data = await axios.delete("/delete/" + id);
    if (data.data.success) {
      getFetchData();
      // alert(data.data.message);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    const data = await axios.put("/update", formDataEdit);
    if (data.data.success) {
      getFetchData();
      // alert(data.data.message);
      setEditSection(false);
    }
  };

  const handleEditOnChange = (e) => {
    const { value, name } = e.target;
    setFormDataEdit(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleEdit = (el) => {
    setFormDataEdit(el);
    setEditSection(true);
  };

  return (
    <>
    <div>
     <Row className='mt-5 mb-5'></Row>
     <Row>
      <Col className='col-2 text-center'><Button  variant='primary' onClick={() => setAddSection(true)} className='mt-5 text-center  '>Add</Button>  </Col>
      <Col className='col-8'>
      {addSection && (<Formtable
          handleSubmit={handleSubmit}
          handleOnChange={handleOnChange}
          handleclose={() => setAddSection(false)}
          rest={formData}
        />)}
        {editSection && (<Formtable
          handleSubmit={handleUpdate}
          handleOnChange={handleEditOnChange}
          handleclose={() => setEditSection(false)}
          rest={formDataEdit}
        />)}

        {/* <div className='tableContainer'> */}
        <Table striped bordered hover>
      <thead className='bb   '>
        <tr >
          <th>NAME</th>
          <th>EMAIL</th>
          <th>MOBILE</th>
          
          
         
        </tr>
      </thead>
      <tbody>
      {dataList.length > 0 ? (
                dataList.map((el, index) => (
                  <tr key={index}>
                    <td>{el.name}</td>
                    <td>{el.email}</td>
                    <td>{el.mobile}</td>
                   
                    <td style={{}}>
                      <button className='btn btn-edit' onClick={() => handleEdit(el)}><MdEdit className='edit-icon'/></button>
                      <button className='btn btn-delete' onClick={() => handleDelete(el._id)}> <MdDelete className="delete-icon" /></button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center' }}>NO DATA</td>
                </tr>
              )}
        
      </tbody>
    </Table>
      </Col>
     </Row>
    </div>
      
      {/* <div className="container"> */}
      
     
        
        {/* </div> */}

      {/* </div> */}
    </>
  );
}

export default App;
