import React from 'react'
import { Link } from 'react-router-dom';
// rfce

function Footer() {
    return (
        <div className="container">
            <footer className="d-flex flex-wrap justify-content-between align-items-center py-3 my-4 border-top">
                <p className="col-md-4 mb-0 text-muted">&copy; {new Date().getFullYear()} Nhóm 12 Phát triển ứng dụng web nâng cao</p>
                <Link to="#">
                    <i class="bi bi-github text-secondary fs-2"></i>
                </Link>
                <ul className="nav col-md-4 justify-content-end">
                    <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">Home</Link></li>
                    <li className="nav-item"><Link href="#" className="nav-link px-2 text-muted">Features</Link></li>
                    <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">Pricing</Link></li>
                    <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">FAQs</Link></li>
                    <li className="nav-item"><Link to="#" className="nav-link px-2 text-muted">About</Link></li>
                </ul>
            </footer>
        </div >
    )
}

export default Footer