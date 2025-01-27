function Footer(){
    return(
        <footer className="page-footer ">
            <div className="container-fluid ">   
            <div className="footer-copyright text-center py-3">
            © {new Date().getFullYear()} Copyright: 
            <a href="https://github.com/OmarFaig/component-ticket-tool" target="_blank"style={{padding:"10px"}}>
          
              <img 
                  src="https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png" 
                  alt="GitHub" 
                  width="30" 
                  height="30"
                  />
                  </a>
            </div>
            </div>
        </footer>
    );
} 

export default Footer