import React from 'react'
import { Link } from 'react-router-dom';
// rfce

function Footer() {
    return (
        <div className="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <p className="col-md-4 mb-0 text-muted">&copy; {new Date().getFullYear()} Nhóm 12 Phát triển ứng dụng web nâng cao</p>
                <a href="https://github.com/quanghuybest2k2/PetShop" rel="noopener noreferrer" target="_blank">
                    <i class="bi bi-github text-secondary fs-2"></i>
                </a>
                <ul className="nav col-md-4 justify-content-end">
                    <li className="nav-item"><Link to={"/"} className="nav-link px-2 text-muted">Trang chủ</Link></li>
                    <li className="nav-item"><Link to={"/about"} className="nav-link px-2 text-muted">Giới thiệu</Link></li>
                    <li className="nav-item"><Link to={"/album"} className="nav-link px-2 text-muted">Album</Link></li>
                    <li className="nav-item"><Link to={"/contact"} className="nav-link px-2 text-muted">Liên hệ</Link></li>
                </ul>
            </footer>
        </div >
    )
}

export default Footer