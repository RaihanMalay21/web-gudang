import React, { useState, useEffect, useContext, CreateContext, useRef} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./component/navbar";
import axios from "axios"
import { ContanerCreateSRB } from "./component/conCreateSRB";

function Home() {
    const [ dataShelf, setDataShelf ] = useState([]);
    const [ amountShelf, setAmountShelf ] = useState(0);
    const [ capacityRow, setCapacityRow ] = useState(0);
    const [ boxInputCapacityRow, setBoxInputCapacityRow] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        setAmountShelf(dataShelf.length);
    }, [dataShelf]);

    useEffect(() => {
        const fetchData = async () => {
            try {  
                const response = await axios.get("http://localhost:8080/warehouse/shelfs")
                console.log(response.data);
                setDataShelf(response.data);
            } catch(error) {
                console.error(error);
            }
        }
        fetchData()
    }, []);


    const CreateShelf = async (nama_shelf) => {
        if (capacityRow === 0) {
            return
        }

        try{
            const config = {
                headers : {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            }

            const formData = {
                nama_shelf : nama_shelf,
                kapasitas_row : Number(capacityRow),
            }

            console.log(formData)
            const response = await axios.post("http://localhost:8080/warehouse/add/shelf", formData, config);

            console.log(response.data);
            setCapacityRow(0);
            window.location.reload();
        } catch(error) {
            console.error(error);
        }
    } 

    const handleCreateShelf = () => {
        const namaShelf = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "p", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"];
        const index = dataShelf.length;
        const Name = namaShelf[index];
        CreateShelf(Name);
    }

    const handleOpenInputCapacityRow = () => {
        setBoxInputCapacityRow(true);
    }

    const handleCloseInputCapacityRow = () => {
        setCapacityRow(0);
        setBoxInputCapacityRow(false);
    }

    const handleInputValue = (e) => {
        const value = e.target.value;
        if (value < 0) {
            return
        }
        setCapacityRow(value);
    } 

    // handle untuk redirect ke fitur rows, sekaligus datanya menggunakan uselocation
    const handleToRows = (id_shelf, kapasitas_barangs, nama_shelf, total_barangs, kapasitas_row) => {
        navigate('/warehouse/rows', {
            state: {
                id_shelf,
                kapasitas_barangs,
                nama_shelf,
                total_barangs,
                kapasitas_row
            }

        })
    } 

    const style = {
        containerFillDetail: {
            display: 'flex',
            marginRight: '20px'
        },
        imageDetail: {
            height: '25px',
            width: '25px',
            marginRight: '10px'
        },
        font: {
            fontSize: '15px',
            color: 'rgb(0, 0, 0, 0.4)',
            fontWeight: 'bold',
            marginRight: '10px',
            fontFamily: 'arial,sans-serif'
        },
        boxCreateInfo: {
            display: 'flex', 
            alignItems: 'center', 
            marginRight: '20px',
        },
        boxShelf: {
            display: 'flex',
            alignItems: 'center',
            marginRight: '50px',
            marginBottom: '10px'
        }
    }
    return(
        <div style={{fontFamily: 'arial, sans-serif', minHeight: '100vh'}}>
            <div style={{ zIndex: '99999', position:'relative' }}>
                <Navbar/>
            </div>
            <div className="size-page">
                <div className="box-create-shelf">
                    <div >
                        <img src={require("./images/shelf.png")} style={{height: '60px', width: '60px', marginRight: '5px'}}/>
                        <h8 style={{fontSize: '18px'}}>{amountShelf} Shelf</h8>
                    </div>
                    <div style={{display: 'flex'}}>
                        <div style={style.boxCreateInfo}>
                            <div style={{backgroundColor: 'red', marginRight: '10px', width: '10px', height: '10px', borderRadius: '10px'}}/>
                            <h8>Shelf</h8>
                        </div>
                        <div style={style.boxCreateInfo}>
                            <div style={{backgroundColor: '#32CD32', marginRight: '10px', width: '10px', height: '10px', borderRadius: '10px'}}/>
                            <h8>Row</h8>
                        </div>
                        <div style={style.boxCreateInfo}>
                            <div style={{backgroundColor: '#9400D3', marginRight: '10px', width: '10px', height: '10px', borderRadius: '10px'}}/>
                            <h8>Blok</h8>
                        </div>
                        <div  style={{ display: 'flex',  alignItems: 'center'}}>
                            <div style={{backgroundColor: '#4B0082', marginRight: '10px', width: '10px', height: '10px', borderRadius: '10px'}}/>
                            <h8>Barang</h8>
                        </div>
                    </div>
                    <div className="button-create-shelf">
                        <a onClick={handleOpenInputCapacityRow}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16" style={{marginBottom: '2.5px'}}>
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg>
                            <h7 style={{fontSize: "18px", marginLeft: '5px'}}>Create Shelf</h7>
                        </a>
                    </div>
                </div>
                {dataShelf.map((shelf, index) => (
                    <a key={index} onClick={() => handleToRows(shelf.ID, shelf.kapasitas_barangs, shelf.nama_shelf, shelf.total_barangs, shelf.kapasitas_row)}>
                        <div style={{display: 'block', padding: '10px 50px', marginBottom: '10px', backgroundColor: 'white', zIndex: '99999', borderRadius: '4px', boxShadow: '7px 7px 4px 0 rgb(0, 0, 0, 0.5)', alignItems: 'center', cursor: 'pointer' }}>
                            <div className="container-shelf" style={{display: 'flex', justifyContent: 'space-between', margin: 'auto', alignItems: 'center'}}>
                                <div style={{ width: '15%' }}>
                                    <img src={require("./images/shelf.png")} style={{ height: '80px', width: '80px'}}/>
                                </div>
                                <div style={{width: '80%', textAlign: 'start', alignItems: 'center'}}>
                                    <div style={{ display: 'flex', marginBottom: '2px', alignItems: 'center'}}>
                                        <h5 style={{width: '20%'}}>Capacity :</h5>
                                        <div style={{ display: 'flex', alignItems: 'center', width: '75%'}}>
                                            <div style={{display: 'flex', width: '30%'}}>
                                                <img src={require("./images/rows.png")} style={style.imageDetail}/>
                                                <h6 style={{alignItems: 'center'}}>{shelf.kapasitas_row} Row</h6>
                                            </div>
                                            <div style={{display: 'flex', width: '30%'}}>
                                                <img src={require("./images/block.png")} style={style.imageDetail}/>
                                                <h6 style={{alignItems: 'center'}}>{shelf.kapasitas_block} Blok</h6>
                                            </div>
                                            <div style={{display: 'flex', width: '40%'}}>
                                                <img src={require("./images/boxs.png")} style={style.imageDetail}/>
                                                <h6 style={{alignItems: 'center'}}>{shelf.kapasitas_barangs} Barang</h6>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div style={{ textAlign: 'center'}}>
                                    <h5>Shelf</h5>
                                    <h1 style={{color: 'red', fontSize: '50px', marginTop: '-5px', textTransform: 'uppercase'}}>{shelf.nama_shelf}</h1>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
            {/* { boxInputCapacityRow && (
                <div style={{position: 'fixed', right: '40%', alignItems: 'center', textAlign: 'center', top:'40%', backgroundColor: '#f8ba1e', borderRadius: '10px', padding: '40px 40px 20px 40px'}}>
                    <button onClick={handleCloseInputCapacityRow} type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" style={{position: 'absolute', top: '5px', right: '5px'}}></button>
                        <div  style={{ textAlign: 'start', color: 'white'}}>
                            <h5>Capacity Row</h5>
                            <input type="number" value={capacityRow} required onChange={(e) => handleInputValue(e)} style={{border: 'none', height: '35px', borderRadius: '5px', outline: 'none'}}/>
                        </div>
                        <button onClick={handleCreateShelf} style={{outline: 'none', border: 'none', borderRadius: '5px', padding: '7px 14px', marginTop: '15px', backgroundColor: 'red', color: 'white'}}>Create Shelf</button>
                </div>
            )} */}
            { boxInputCapacityRow && (
                <div style={{backgroundColor: 'rgb(0,0,0,0.5)', height: '100vh', marginTop: '90px', position: 'absolute', width: '100%', top: '0', zIndex: '9999'}}>
                    <button onClick={handleCloseInputCapacityRow} style={{position: 'absolute', right: '10px', top: '15px', zIndex: '99999'}} type="button" class="btn-close text-light" aria-label="Close"></button>
                    < ContanerCreateSRB component={"Shelf"} capacityName={"Row"} capacityAmount={handleInputValue} handleSubmit={handleCreateShelf}/>
                </div>
            )}
        </div>
    )
}

export default Home;