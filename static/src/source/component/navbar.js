import "../../App.css"

function Navbar() {
    return(
        <div style={{ backgroundColor: '#f8ba1e', zIndex: '99999'}}>
            <div className="navbar">
                <div>
                    <img src={require("../images/warehouse.jpg")} style={{width: '80px', height: '80px', borderRadius: '5px'}}/>
                </div>
                <div className="search-barang">
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
                        <button class="btn btn-outline-success" type="submit">Search</button>
                    </form>
                </div>
                <div>
                    <h5 style={{color: 'white', fontSize: '40px', fontWeight: 'bold'}}>WareHouse</h5>
                </div>
            </div>
        </div>
    )
}

export default Navbar;