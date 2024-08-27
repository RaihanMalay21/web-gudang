import React,{ createContext, useState } from "react";


export const ContainerBarangOut = ({id_barang, handleSubmit}) =>  {

    const style = {
        form: {
            position: 'absolute',
            zIndex: '9999999',
            backgroundColor: 'white',
            padding: '30px 70px',
            borderRadius: '10px',
            left: '50%',
            transform: 'translateX(-50%)',
            top: '120px',
            border: '3px solid  #198754',
            boxShadow: '2px 4px 2px 0 rgb(0,0,0,0.5)'
        }
    }

    return(
        <div>
            <div style={style.form}>
                <h3 style={{ textAlign: 'center'}}>Barang Keluar</h3>
                <form onSubmit={handleSubmit} style={{paddingTop: '25px'}}>
                    <div> 
                        <label style={{fontSize: '20px'}}>Jumlah Barang</label>
                        <div style={{ margin: '10px 0 35px 0'}}>
                            <input name="id_barang" value={id_barang} style={{display: 'none'}}/>
                            <input name="barang_keluar" required type="number" style={{ width: '280px', height: '35px', backgroundColor: 'rgb(0,0,0,0.1)', borderRadius: '2px', outline: 'none', border: '1px solid  #198754', marginBottom: '3px'}}/>
                            <p style={{fontFamily: 'emoji', fontSize: '15px', color: 'rgb(0,0,0,0.5)'}}>Please click here to fill</p>
                        </div>
                    </div>
                    <div style={{display: 'flex', justifyContent: 'center'}}>
                        <button type="submit" class="btn btn-success" style={{padding: '5px 30px'}}>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}