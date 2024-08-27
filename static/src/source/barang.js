import React, { useEffect, useState } from "react";
import Navbar from "./component/navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { ContainerBarangOut } from "./component/conBarangKeluar";


export const Barang = () => {
    const location = useLocation();
    const state = location.state || {};
    const { id_block, nama_shelf, nomor_row, nomor_block, capacity_barang} = state;
    const [ dataBarang, setDataBarang ] = useState([]);
    const [ currentCapacity, setCurrentCapacity ] = useState(0);
    const [ boxInputForm, setBoxInputForm ] = useState(false);
    const [ alertFailed, setAlertFailed ] = useState(false);
    const [ messageRespose, setMessageResponse ] = useState("");
    const [ openContainerBarangOut, setOpenContainerBarangOut ] = useState(false);
    const [ idBarang, setIdBarang ] = useState();
    // const [ formData, setFormData ] = useState({
    //     id_block: id_block,
    //     capacity_barang: capacity_barang,
    //     current_capacity_barang: dataBarang,
    //     kode: ``,
    //     nama_barang: '',
    //     amount_barang: ``,
    //     diameter: '',
    //     material: '',
    //     fitur: '',
    //     image: null
    // });

    useEffect(() => {
        let value = 0;
        for (let i = 0; i < dataBarang.length; i++) {
            value = value + dataBarang[i].amount_barang;
        };
        console.log(value);
        setCurrentCapacity(value);
    }, [dataBarang]);

    useEffect(() => {
        const fetchData = async () => {
            try{
                const params = {
                    id_block: id_block 
                };

                const response = await axios.post("http://localhost:8080/warehouse/shelf/row/block/barangs", id_block, {
                    params,
                    withCredentials: true
                })

                setDataBarang(response.data);
            } catch(error) {
                console.error(error);
            }
        }
        fetchData();
    }, [])

    
    const handleCreateBarang = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        formData.append("id_block", id_block);
        formData.append("capacity_barang", capacity_barang);
        formData.append("current_capacity_barang", currentCapacity);
        
        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true
            }

            const response = await axios.post("http://localhost:8080/warehouse/shelf/row/block/barang/add", formData, config)
            console.log(response.data);
            window.location.reload();
        } catch(error) {
            console.log(error);
            if (error.response.data.messageBarang) {
                setAlertFailed(true);
                setMessageResponse(error.response.data.messageBarang);
                setBoxInputForm(false);
            }

            setTimeout(() => {
                setAlertFailed(false);
                setMessageResponse("");
            }, 2500);
        }
    }

    const handleOpenInputForm = () => {
        setBoxInputForm(true);
    }

    const handleCloseInputForm = () => {
        setBoxInputForm(false);
    }

    const handleContainerBarangOut = (barang_id) => {
        setOpenContainerBarangOut(true);
        setIdBarang(barang_id);
    }

    const handleCloseContainerBarangOut = () => {
        setIdBarang(null);
        setOpenContainerBarangOut(false);
    }

    const handleSubmitBarangKeluar = async (e) => {
        e.preventDefault()
        try {
            const formData = new FormData(e.target);

            const config = {
                header: {
                    "Content-Type": "multipart/form-data"
                },
                withCredentials: true,
            }

             const response = await axios.post("http://localhost:8080/warehouse/shelf/row/block/barang/out", formData, config)
             console.log(response.data);
             window.location.reload();
        } catch(error) {
            console.error(error);
        }
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
        }, 
        containerForm: {
            display: 'block', 
            backgroundColor: ' #f8ba1e', 
            width: '50%',
            paddingTop: '3vh', 
            margin: 'auto', 
            borderRadius: '20px',
            zIndex: '99999',
            fontFamily: 'arial, sans-serif',
            padding: '25px 100px',
            position: 'relative', 
            border: '2px solid #4B0082'
        }, 
        containerInput: {
            marginBottom: '10px'
        },
        input: {
            width: '100%',
            zIndex: '99999',
            borderRadius: '5px',
            border: 'none',
            height: '35px',
            outline: 'none'
        }, 
        inputFormTwoo: {
            borderRadius: '5px', 
            height: '35px', 
            outline: 'none', 
            border: 'none',
            width: '100%'
        }
    }

    return(
        <div>
            <div style={{ position: 'relative', zIndex: '999'}}>
                <Navbar/>
            </div>
            <div className="size-page">
                { alertFailed && (
                    <div class="alert alert-primary d-flex align-items-center" role="alert" style={{width: '50%',  margin: 'auto', position: 'fixed', left: '26%', top: '11%', zIndex: '9999'}}>
                        <svg xmlns="http://www.w3.org/2000/svg" style={{width: '18px', height: '18px'}} class="bi bi-exclamation-triangle-fill flex-shrink-0 me-2" viewBox="0 0 16 16" role="img" aria-label="Warning:">
                            <path d="M8.982 1.566a1.13 1.13 0 0 0-1.96 0L.165 13.233c-.457.778.091 1.767.98 1.767h13.713c.889 0 1.438-.99.98-1.767L8.982 1.566zM8 5c.535 0 .954.462.9.995l-.35 3.507a.552.552 0 0 1-1.1 0L7.1 5.995A.905.905 0 0 1 8 5zm.002 6a1 1 0 1 1 0 2 1 1 0 0 1 0-2z"/>
                        </svg>
                        <div>
                            { messageRespose }
                        </div>
                    </div>
                )}
                <div className="box-create-shelf">
                    <div >
                        <img src={require("./images/boxs.png")} style={{height: '60px', width: '60px', marginRight: '5px'}}/>
                        <h8 style={{fontSize: '18px'}}>{currentCapacity} Barang</h8>
                    </div>
                    <div style={{display: 'flex'}}>
                        <div style={style.boxCreateInfo}>
                            <div style={{ marginRight: '10px', color: 'red', fontSize: '22.5px', fontWeight: 'bold', textTransform: 'uppercase'}}>{nama_shelf}</div>
                            <h8>Shelf</h8>
                        </div>
                        <div style={style.boxCreateInfo}>
                            <div style={{ marginRight: '10px', color: '#32CD32', fontSize: '22.5px', fontWeight: 'bold', textTransform: 'uppercase'}}>{nomor_row}</div>
                            <h8>Row</h8>
                        </div>
                        <div style={style.boxCreateInfo}>
                            <div style={{ marginRight: '10px', color: '#9400D3', fontSize: '22.5px', fontWeight: 'bold', textTransform: 'uppercase'}}>{nomor_block}</div>
                            <h8>Blok</h8>
                        </div>
                        <div  style={{ display: 'flex',  alignItems: 'center'}}>
                            <div style={{backgroundColor: '#4B0082', marginRight: '10px', width: '10px', height: '10px', borderRadius: '10px'}}/>
                            <h8>Barang</h8>
                        </div>
                    </div>
                    <div className="capacity-create-box">
                        <h8 style={{marginRight: '10px'}}>Capacity :</h8>
                        <h8>{capacity_barang} Barang</h8>
                    </div>
                    <div className="button-create-shelf">
                        <a onClick={handleOpenInputForm}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" class="bi bi-plus-square" viewBox="0 0 16 16" style={{marginBottom: '2.5px'}}>
                            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z"/>
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4"/>
                            </svg>
                            <h7 style={{fontSize: "18px", marginLeft: '5px'}}>Create Barang</h7>
                        </a>
                    </div>
                </div>
                {dataBarang.length > 0  ? (
                    dataBarang.map((barang, index) => (
                        <a key={index}>
                            <div style={{display: 'block', fontFamily: 'arial, sans-serif', padding: '10px 50px', marginBottom: '10px', backgroundColor: 'white', zIndex: '99999', borderRadius: '4px', boxShadow: '7px 7px 4px 0 rgb(0, 0, 0, 0.5)', alignItems: 'center'}}>
                                <div className="container-shelf" style={{display: 'flex', justifyContent: 'space-between', margin: 'auto', alignItems: 'center'}}>
                                    <div style={{ width: '12.5%' }}>
                                        <img src={require(`./images/${barang.image}`)} style={{ height: '90px', width: '90px'}}/>
                                    </div>
                                    <div style={{ display: 'flex', width: '30%', justifyContent: 'start' }}>
                                        <div style={{ marginRight: '2rem'}}>
                                            <h6>Kode</h6>
                                            <h6>Nama Barang</h6>
                                            <h6>Total Barang</h6>
                                        </div>
                                        <div style={{ color: 'rgb(0, 0, 0, 0.5)'}}>
                                            <h6>{barang.kode}</h6>
                                            <h6>{barang.nama_barang}</h6>
                                            <h6>{barang.amount_barang}</h6>
                                        </div>
                                    </div>
                                    <div style={{ display: 'flex', width: '50%', justifyContent: 'start' }}>
                                        <div style={{ marginRight: '2rem'}}>
                                            <h6>Diameter</h6>
                                            <h6>Material</h6>
                                            <h6>Fitur</h6>
                                        </div>
                                        <div style={{ color: 'rgb(0, 0, 0, 0.5)'}}>
                                            <h6>{barang.diameter}</h6>
                                            <h6>{barang.material}</h6>
                                            <h6>{barang.Fitur}</h6>
                                        </div>
                                    </div>
                                    <div style={{width: '7.5%'}}>
                                        <button onClick={() => handleContainerBarangOut(barang.ID)} className="button-keluar-barang">KELUAR</button>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))
                ): (<div></div>)}
            </div>
            { boxInputForm && (
                <div style={{ position: 'absolute', height: '100vh', paddingTop: '3vh', top: '0', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.2)', zIndex: '9999999'}}>
                    <div style={style.containerForm}>
                        <button onClick={handleCloseInputForm}  type="button" class="btn-close" aria-label="Close" style={{ position: 'absolute', top: '25px', right: '25px' }}></button>
                        <h2>Data Barang</h2>
                        <form onSubmit={handleCreateBarang} style={{ marginTop: '30px'}}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                                <div style={{ width: '48%'}}>
                                    <label for="formFile" class="form-label">Kode Barang</label>
                                    <input type="text" name="kode"  required style={style.inputFormTwoo}/>
                                </div>
                                <div style={{ width: '48%'}}>
                                    <label for="formFile" class="form-label">Total Barang</label>
                                    <input type="number" name="amount_barang" required style={style.inputFormTwoo}/>
                                </div>
                            </div>
                            <div style={style.containerInput}>
                            <label for="formFile" class="form-label">Nama Barang</label>
                                <input type="text" name="nama_barang" required style={style.input}/>
                            </div>
                            <div style={style.containerInput}>
                            <label for="formFile" class="form-label">Diameter</label>
                                <input type="text" name="diameter" required style={style.input}/>
                            </div>
                            <div style={style.containerInput}>
                            <label for="formFile" class="form-label">Material</label>
                                <input type="text" name="material" required style={style.input}/>
                            </div>
                            <div style={style.containerInput}>
                                <label for="formFile" class="form-label">Fitur</label>
                                <input type="text" name="fitur" required style={style.input}/>
                            </div>
                            <div style={{ marginBottom: '25px'}}>
                            <label for="formFile" class="form-label">Image Barang</label>
                            <input name="image" required  class="form-control" type="file" id="formFile" />
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '20px'}}>
                                <button type="submit" class="btn" className="button-create-barang" style={{ padding: '10px 40px', backgroundColor: '#4B0082', color: 'white'}}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
            { openContainerBarangOut && (
                <div style={{backgroundColor: 'rgb(0,0,0,0.5)', height: '100vh', marginTop: '20px', position: 'absolute', width: '100%', top: '0', zIndex: '99'}}>
                    <button onClick={handleCloseContainerBarangOut} style={{position: 'absolute', right: '10px', top: '12.5%', zIndex: '99999'}} type="button" class="btn-close text-light" aria-label="Close"></button>
                    <ContainerBarangOut id_barang={idBarang} handleSubmit={handleSubmitBarangKeluar}/>
                </div>
            )}
        </div>
    )
}