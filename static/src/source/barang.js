import React, { useEffect, useState } from "react";
import Navbar from "./component/navbar";
import { useLocation } from "react-router-dom";
import axios from "axios";


export const Barang = () => {
    const location = useLocation();
    const state = location.state || {};
    const { id_block, nama_shelf, nomor_row, nomor_block, capacity_barang} = state;
    const [ dataBarang, setDataBarang ] = useState([]);
    const [ boxInputForm, setBoxInputForm ] = useState(false);
    const [ formData, setFormData ] = useState({
        id_block: id_block,
        capacity_barang: capacity_barang,
        current_capacity_barang: dataBarang,
        kode: ``,
        nama_barang: '',
        amount_barang: ``,
        diameter: '',
        material: '',
        fitur: '',
        image: null
    });

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

    console.log(dataBarang);
    const handleCreateBarang = async (event) => {
        event.preventDefault()
        const formData = new FormData(event.target)
        formData.append("id_block", id_block);
        formData.append("capacity_barang", capacity_barang);
        formData.append("current_capacity_barang", 100);
        
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
        }
    }

    const handleInputForm = (e) => {
        const { name, value } = e.target;
        
        if (name === "amount_barang" && value < 0 ) {
            return
        }

        setFormData({
            ...formData,
            [name] : value
        });

    };

    const handleInputImage = (e) => {
        const file = e.target.file;
        if (file) {
            const imageUrl = URL.createObjectURL(file);
            setFormData({
                image : imageUrl
            })
        }
    }

    const handleOpenInputForm = () => {
        setBoxInputForm(true);
    }

    const handleCloseInputForm = () => {
        setBoxInputForm(false);
        setFormData({
            ...formData,
            kode: ``,
            nama_barang: '',
            amount_barang: ``,
            diameter: '',
            material: '',
            fitur: '',
            image: null
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
            border: '2px solid white'
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
            <Navbar/>
            <div className="size-page">
                <div className="box-create-shelf">
                    <div >
                        <img src={require("./images/boxs.png")} style={{height: '60px', width: '60px', marginRight: '5px'}}/>
                        <h8 style={{fontSize: '18px'}}>{dataBarang.length} Barang</h8>
                    </div>
                    <div style={{display: 'flex'}}>
                        <div style={style.boxCreateInfo}>
                            <div style={{ marginRight: '10px', color: 'red', fontSize: '22.5px', fontWeight: 'bold', textTransform: 'uppercase'}}>{nama_shelf}</div>
                            <h8>Shelf</h8>
                        </div>
                        <div style={style.boxCreateInfo}>
                            <div style={{ marginRight: '10px', color: '#00BFFF', fontSize: '22.5px', fontWeight: 'bold', textTransform: 'uppercase'}}>{nomor_row}</div>
                            <h8>Row</h8>
                        </div>
                        <div style={style.boxCreateInfo}>
                            <div style={{ marginRight: '10px', color: '#9400D3', fontSize: '22.5px', fontWeight: 'bold', textTransform: 'uppercase'}}>{nomor_block}</div>
                            <h8>Block</h8>
                        </div>
                        <div  style={{ display: 'flex',  alignItems: 'center'}}>
                            <div style={{backgroundColor: '#4B0082', marginRight: '10px', width: '10px', height: '10px', borderRadius: '10px'}}/>
                            <h8>Barang</h8>
                        </div>
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
                                        <button className="button-keluar-barang">KELUAR</button>
                                    </div>
                                </div>
                            </div>
                        </a>
                    ))
                ): (<div></div>)}
            </div>
            { boxInputForm && (
                <div style={{ position: 'fixed', height: '100vh', paddingTop: '3vh', top: '0', width: '100%', backgroundColor: 'rgba(0, 0, 0, 0.2)'}}>
                    <div style={style.containerForm}>
                        <button onClick={handleCloseInputForm}  type="button" class="btn-close" aria-label="Close" style={{ position: 'absolute', top: '25px', right: '25px' }}></button>
                        <h2>Data Barang</h2>
                        <form onSubmit={handleCreateBarang} style={{ marginTop: '30px'}}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px'}}>
                                <div style={{ width: '48%'}}>
                                    <label for="formFile" class="form-label">Kode Barang</label>
                                    <input type="text" value={formData.kode} name="kode" onChange={handleInputForm} required style={style.inputFormTwoo}/>
                                </div>
                                <div style={{ width: '48%'}}>
                                    <label for="formFile" class="form-label">Total Barang</label>
                                    <input type="number" value={formData.amount_barang} name="amount_barang" onChange={handleInputForm} required style={style.inputFormTwoo}/>
                                </div>
                            </div>
                            <div style={style.containerInput}>
                            <label for="formFile" class="form-label">Nama Barang</label>
                                <input type="text" value={formData.nama_barang} name="nama_barang" required onChange={handleInputForm} style={style.input}/>
                            </div>
                            <div style={style.containerInput}>
                            <label for="formFile" class="form-label">Diameter</label>
                                <input type="text" value={formData.diameter} name="diameter" required onChange={handleInputForm} style={style.input}/>
                            </div>
                            <div style={style.containerInput}>
                            <label for="formFile" class="form-label">Material</label>
                                <input type="text" value={formData.material} name="material" required onChange={handleInputForm} style={style.input}/>
                            </div>
                            <div style={style.containerInput}>
                                <label for="formFile" class="form-label">Fitur</label>
                                <input type="text" value={formData.fitur} name="fitur" required onChange={handleInputForm} style={style.input}/>
                            </div>
                            <div style={{ marginBottom: '25px'}}>
                                <label for="formFile" class="form-label">Image Barang</label>
                                <input name="image"  value={formData.image} required onChange={handleInputForm} class="form-control" type="file" id="formFile" />
                            </div>
                            <div style={{ textAlign: 'center', marginTop: '20px'}}>
                                <button type="submit" class="btn btn-success" style={{ fontWeight: 'bold', padding: '10px 40px' }}>Submit</button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    )
}