import React, { useState, useEffect } from 'react';

function BackToTopButton() {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        document.addEventListener('scroll', toggleVisibility);
        return () => {
            document.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    const toggleVisibility = () => {
        if (window.pageYOffset > 300) {
            setIsVisible(true);
        } else {
            setIsVisible(false);
        }
    };

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    };

    return (
        <div>
            {isVisible && (
                <button
                    type="button"
                    className="btn btn-primary btn-floating btn-sm float-end"
                    id="back-to-top"
                    onClick={scrollToTop}
                >
                    <i className="fa fa-arrow-up"></i>
                </button>
            )}
        </div>
    );
}

export default BackToTopButton;
