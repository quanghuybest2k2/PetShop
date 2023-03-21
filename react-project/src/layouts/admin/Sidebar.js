import React from 'react';
import { Link } from 'react-router-dom';

const Sidebar = () => {
    return (
        <nav className="sb-sidenav accordion sb-sidenav-dark" id="sidenavAccordion">
            <div className="sb-sidenav-menu">
                <div className="nav">
                    <div className="sb-sidenav-menu-heading">Menu</div>
                    <Link className="nav-link" to="/admin/dashboard">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Dashboard
                    </Link>
                    <Link className="nav-link" to="/admin/add-category">
                        <div className="sb-nav-link-icon"><i class="bi bi-file-earmark-plus-fill"></i></div>
                        Thêm danh mục
                    </Link>
                    <Link className="nav-link" to="/admin/view-category">
                        <div className="sb-nav-link-icon"><i className="fas fa-tachometer-alt"></i></div>
                        Xem danh mục
                    </Link>
                </div>
            </div>
        </nav>
    );
}

export default Sidebar;
