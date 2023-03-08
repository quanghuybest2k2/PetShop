import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="py-4 bg-light mt-auto">
            <div className="container-fluid px-4">
                <div className="d-flex align-items-center justify-content-between small">
                    <div className="text-muted">Copyright &copy; Đoàn Quang Huy - {new Date().getFullYear()}</div>
                    <div>
                        <Link to="#">Chính sách bảo mật</Link>
                        &middot;
                        <Link to="#">Điều khoản &amp; Điều kiện sử dụng</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default Footer;