import React,{useEffect, useState} from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Navbar from "./component/navbar";
import axios from "axios";
import { ContanerCreateSRB } from "./component/conCreateSRB";

export const PageRows = () => {
    const location = useLocation();
    const [ boxCreateRow, setBoxCreateRow ] = useState(false);
    const [ capacityBlock, setCapacityBlock ] = useState();
    const [ rows, setRows] = useState([]);
    const [ alertKoutaHabis, setAlertkoutaHabis ] = useState(false);
    const [ messageAlert, setMessageAlert ] = useState();
    const {id_shelf, kapasitas_barangs, nama_shelf, total_barangs, kapasitas_row} = location.state;
    const navigate = useNavigate();
    
    const handleToBlocks = (id_row, kapasitas, namaShelf, nomor_row) => {
        navigate("/warehouse/rows/blocks", {
            state: {
                id_row: id_row,
                capacity_block: kapasitas,
                nama_shelf: namaShelf,
                nomor_row: nomor_row
            }
        }
        )
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const params = {
                    id_shelf: id_shelf 
                };
                const response = await axios.post("http://localhost:8080/warehouse/shelf/rows", id_shelf, {
                    params,
                    withCredentials: true,
                });
                console.log(response.data);
                setRows(response.data);
            } catch(error) {
                console.error(error)
            }
        }
        fetchData();
    }, [])

    console.log(rows)

    const createRow = async (nameNumber) => {
        try {
            const config = {
                headers : {
                    "Content-Type": "application/json"
                },
                withCredentials: true,
            }

            const formData = {
                id_shelf : Number(id_shelf),
                number_row: Number(nameNumber),
                capacity_block: Number(capacityBlock),
                capacity_row: Number(kapasitas_row)
            }

            await axios.post("http://localhost:8080/warehouse/shelf/row/add", formData, config)
            window.location.reload();
        } catch(error) {
            console.error(error);
            if (error.response.data.qoutaHabis) {
                setBoxCreateRow(false);
                setCapacityBlock(0);
                setAlertkoutaHabis(true);
                setMessageAlert(error.response.data.qoutaHabis);
            }
            setTimeout(() => {
                setAlertkoutaHabis(false);
            }, 2500)
        }
    }

    const handleInputValue = (e) => {
        const value = e.target.value;
        setCapacityBlock(value);
    }

    const handleCreateRow = () => {
        if (capacityBlock === 0 || capacityBlock === "") {
            return
        }
        const nameNumber = rows.length + 1;
        createRow(nameNumber);
    }

    const handleOpenBoxCreate = () => {
        setBoxCreateRow(true);
    }

    const handleCloseBoxCreate = () => {
        setBoxCreateRow(false);
        setCapacityBlock(0);
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
            marginRight: '50px'
        }
    }

    return (
        <div>
            <div style={{ zIndex: '999', position:'relative' }}>
                <Navbar/>
            </div>
            <div className="size-page">
                { alertKoutaHabis && (
                    <div class="alert alert-primary d-flex align-items-center" role="alert" style={{width: '50%', margin: 'auto', position: 'fixed', left: '50%', transform: 'translateX(-50%)', top: '11%', zIndex: '9999'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{width: '18px', height: '18px'}} class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                        <div>
                            { messageAlert }
                        </div>
                    </div>
                )}
                <div className="box-create-shelf">
                    <div>
                        <img src={require("./images/rows.png")} style={{height: '60px', width: '60px', marginRight: '5px'}}/>
                        <h8 style={{fontSize: '18px'}}>{rows.length} Row</h8>
                    </div>
                    <div style={{display: 'flex'}}>
                        <div style={style.boxCreateInfo}>
                            <div style={{ marginRight: '10px', color: 'red', fontSize: '22.5px', fontWeight: 'bold', textTransform: 'uppercase'}}>{nama_shelf}</div>
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
                    <div className="capacity-create-box">
                        <h8 style={{marginRight: '10px'}}>Capacity :</h8>
                        <h8>{kapasitas_row} Row</h8>
                    </div>
                    <div className="button-create-shelf">
                        <a onClick={handleOpenBoxCreate}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16" style={{marginBottom: '2.5px'}}>
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg>
                            <h7 style={{fontSize: "18px", marginLeft: '5px'}}>Create Row</h7>
                        </a>
                    </div>
                </div>
                {rows.map((row, index) => (
                    <a key={index} onClick={() => handleToBlocks(row.ID, row.kapasitas, nama_shelf, row.nomor_row)}>
                        <div style={{display: 'block', padding: '10px 50px', marginBottom: '10px', backgroundColor: 'white', zIndex: '99999', borderRadius: '4px', boxShadow: '7px 7px 4px 0 rgb(0, 0, 0, 0.5)', alignItems: 'center', cursor: 'pointer' }}>
                            <div className="container-shelf" style={{display: 'flex', justifyContent: 'space-between', margin: 'auto', alignItems: 'center'}}>
                                <div style={{ width: '15%' }}>
                                    <img src={require("./images/rows.png")} style={{ height: '80px', width: '80px'}}/>
                                </div>
                                <div style={{width: '100%', textAlign: 'start', alignItems: 'center'}}>
                                    <di style={{ display: 'flex', marginBottom: '2px', alignItems: 'center'}}>
                                        <h5 style={{width: '20%'}}>Capacity :</h5>
                                        <div style={{ display: 'flex', alignItems: 'center', width: '75%'}}>
                                            <div style={{display: 'flex', width: '30%'}}>
                                                <img src={require("./images/block.png")} style={style.imageDetail}/>
                                                <h6 style={{alignItems: 'center'}}>{row.kapasitas} Blok</h6>
                                            </div>
                                            <div style={{display: 'flex', width: '40%'}}>
                                                <img src={require("./images/boxs.png")} style={style.imageDetail}/>
                                                <h6 style={{alignItems: 'center'}}>{row.total_capacity_barang} Barang</h6>
                                            </div>
                                        </div>
                                    </di>
                                </div>
                                <div style={{display: 'flex', justifyContent: 'space-between', width: '20%'}}>
                                    <div style={{ textAlign: 'center'}}>
                                        <h5>Shelf</h5>
                                        <h1 style={{color: 'red', fontSize: '50px', marginTop: '-5px', textTransform: 'uppercase'}}>{nama_shelf}</h1>
                                    </div>
                                    <div style={{ textAlign: 'center'}}>
                                        <h5>Row</h5>
                                        <h1 style={{color: '#32CD32', fontSize: '50px', marginTop: '-5px', textTransform: 'uppercase'}}>{row.nomor_row}</h1>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </a>
                ))}
            </div>
            {/* { boxCreateRow && (
                <div style={{position: 'fixed', right: '40%', alignItems: 'center', textAlign: 'center', top:'40%', backgroundColor: '#f8ba1e', borderRadius: '10px', padding: '40px 40px 20px 40px'}}>
                    <button onClick={handleCloseBoxCreate} type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close" style={{position: 'absolute', top: '5px', right: '5px'}}></button>
                        <div  style={{ textAlign: 'start', color: 'white'}}>
                            <h5>Capacity Blok</h5>
                            <input type="number" value={capacityBlock} required onChange={(e) => handleInputValue(e)} style={{border: 'none', height: '35px', borderRadius: '5px', outline: 'none'}}/>
                        </div>
                        <button onClick={handleCreateRow} style={{outline: 'none', border: 'none', borderRadius: '5px', padding: '7px 14px', marginTop: '15px', backgroundColor: 'red', color: 'white'}}>Create Row</button>
                </div>
            )} */}
            { boxCreateRow && (
                <div style={{backgroundColor: 'rgb(0,0,0,0.5)', height: '100vh', marginTop: '90px', position: 'absolute', width: '100%', top: '0', zIndex: '99'}}>
                    <button onClick={handleCloseBoxCreate} style={{position: 'absolute', right: '10px', top: '15px', zIndex: '99999'}} type="button" class="btn-close text-light" aria-label="Close"></button>
                    <ContanerCreateSRB component={"Row"} capacityName={"Blok"} capacityAmount={handleInputValue} handleSubmit={handleCreateRow}/>
                </div>
            )}
        </div>
    )
}