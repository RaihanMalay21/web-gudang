import "../../App.css";
import { useNavigate } from "react-router-dom";
import React,{ useState, useContext, useEffect } from "react";
import axios from "axios";
import { ContainerBarangOut } from "./conBarangKeluar";

function Navbar() {
    const navigate = useNavigate();
    const [ resultSearch, setResultSearch ] = useState(false);
    const [ dataBarang, setDataBarang ] = useState({});
    const [ keyValue, setKeyValue ] = useState("");
    const [ openConBarangOut, setOpenConBarangOut ] = useState(false);
    const [ idBarang, setIdBarang ] = useState();

    const handleNavigateHomePage = () => {
        navigate("/warehouse");
    };

    const handleClose = () => {
        setIdBarang(null);
        setOpenConBarangOut(false);
        setResultSearch(false);
        setDataBarang(null);
        setKeyValue("");
    };

    const handleSubmitBarangkeluar = async (e) => {
        e.preventDefault();
        try {
            const formData = new FormData(e.target);
            
            const config = {
                headers: {
                    "Content-Type" : "multipart/form-data"
                },
                withCredentials: true
            }

            const response = await axios.post("http://localhost:8080/warehouse/shelf/row/block/barang/out", formData, config);
            console.log(response.data);
            handleSearchBarang(keyValue);
            setOpenConBarangOut(false);
        } catch(error) {
            console.error(error);
        }
    }

    const handleSearchBarang = async (key_value) => {
        try {
            const params = {
                key_value: key_value
            }
            console.log(keyValue)
            const response = await axios.post("http://localhost:8080/warehouse/search/barang", key_value, {
                params, 
                withCredentials: true,
            })

            console.log(response.data);
            setDataBarang(response.data);
            setResultSearch(true);
            setOpenConBarangOut(false);
        } catch(error) {
            console.error(error);
        }
    } 

    const handleOpenContainerBarangOut = (id_barang) => {
        setIdBarang(id_barang);
        setOpenConBarangOut(true);
    };

    const style = {
        headResultContainer: {
            top: '7px', 
            display: 'flex', 
            padding: '10px 50px 2px 50px',
            fontFamily: 'arial, sans-serif',
            zIndex: '99999px',
            width: '100%',
            backgroundColor: 'rgb(0,0,0,0.1)',
        },
        nameOFHeadResultContai: {
            marginRight: '10px',
            fontFamily: 'Times, "Times New Roman", Georgia, serif'
        }
    }

    return(
        <div style={{ backgroundColor: '#f8ba1e', zIndex: '99999'}}>
            <div className="navbar">
                <div onClick={handleNavigateHomePage} >
                    <img src={require("../images/warehouse.jpg")} style={{width: '80px', height: '80px', borderRadius: '5px', cursor: 'pointer'}}/>
                </div>
                <div className="search-barang">
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" value={keyValue} onChange={(e) => setKeyValue(e.target.value)} type="search" placeholder="Search" aria-label="Search"/>
                        <button onClick={() => handleSearchBarang(keyValue)} class="btn btn-outline-success" type="button">Search</button>
                    </form>
                </div>
                <div>
                    <h5 style={{color: 'white', fontSize: '40px', fontWeight: 'bold'}}>WareHouse</h5>
                </div>
            </div>
            { resultSearch && (
                <div style={{ width: '100%', height: '100vh', backgroundColor: 'rgb(0, 0, 0, 0.5)', position: 'absolute'}}>
                    <button onClick={handleClose} style={{ position: 'absolute', right: '10px', top: '10px'}} type="button" class="btn-close text-light" aria-label="Close"></button>
                    <div style={{ paddingTop: '32px'}}>
                        <div style={{display: 'block', position: 'relative', width: '80%', margin: 'auto', fontFamily: 'arial, sans-serif', backgroundColor: 'white', zIndex: '99999', borderRadius: '4px', boxShadow: '7px 7px 4px 0 rgb(0, 0, 0, 0.5)', alignItems: 'center'}}>
                            <div style={style.headResultContainer}>
                                <div style={{ display: 'flex', marginRight: '20px' }}>
                                    <h5 style={style.nameOFHeadResultContai}>Shelf</h5>
                                    <h5 style={{ fontWeight: 'bold', color: 'red'}}>{dataBarang.block.row.shelf.nama_shelf}</h5>
                                </div>
                                <div style={{ display: 'flex', marginRight: '20px'}}>
                                    <h5 style={style.nameOFHeadResultContai}>Row</h5>
                                    <h5 style={{ fontWeight: 'bold', color: '#32CD32'}}>{dataBarang.block.row.nomor_row}</h5>
                                </div>
                                <div style={{ display: 'flex'}}>
                                    <h5 style={style.nameOFHeadResultContai}>Blok</h5>
                                    <h5 style={{ fontWeight: 'bold', color: '#9400D3'}}>{dataBarang.block.nomor_block}</h5>
                                </div>
                            </div>
                            <div className="container-shelf" style={{display: 'flex', padding: '10px 50px', justifyContent: 'space-between', margin: 'auto', alignItems: 'center'}}>
                                <div style={{ width: '12.5%' }}>
                                    <img src={require(`../images/${dataBarang.image}`)} style={{ height: '90px', width: '90px'}}/>
                                </div>
                                <div style={{ display: 'flex', width: '30%', justifyContent: 'start' }}>
                                    <div style={{ marginRight: '2rem'}}>
                                        <h6>Kode</h6>
                                        <h6>Nama Barang</h6>
                                        <h6>Total Barang</h6>
                                    </div>
                                    <div style={{ color: 'rgb(0, 0, 0, 0.5)'}}>
                                        <h6>{dataBarang.kode}</h6>
                                        <h6>{dataBarang.nama_barang}</h6>
                                        <h6>{dataBarang.amount_barang}</h6>
                                    </div>
                                </div>
                                <div style={{ display: 'flex', width: '50%', justifyContent: 'start' }}>
                                    <div style={{ marginRight: '2rem'}}>
                                        <h6>Diameter</h6>
                                        <h6>Material</h6>
                                        <h6>Fitur</h6>
                                    </div>
                                    <div style={{ color: 'rgb(0, 0, 0, 0.5)'}}>
                                        <h6>{dataBarang.diameter}</h6>
                                        <h6>{dataBarang.material}</h6>
                                        <h6>{dataBarang.Fitur}</h6>
                                    </div>
                                </div>
                                <div style={{width: '7.5%'}}>
                                    <button className="button-keluar-barang" onClick={() => handleOpenContainerBarangOut(dataBarang.ID)}>KELUAR</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            { openConBarangOut && (
                <div>
                    <ContainerBarangOut id_barang={idBarang}  handleSubmit={handleSubmitBarangkeluar}/>
                </div>
            )}
        </div>
    )
}

export default Navbar;