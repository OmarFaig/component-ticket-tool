import React from "react"

function Footer(){
    return(
        <footer className="page-footer ">
            <div className="container-fluid ">
                <p>Here you can use rows and columns to organize your footer content.</p>
        

            <div className="footer-copyright text-center py-3">
            © {new Date().getFullYear()} Copyright: 
            <a href="https://mdbootstrap.com/"> MDBootstrap.com</a>
            </div>
            </div>
        </footer>
    );
} 

export default Footer