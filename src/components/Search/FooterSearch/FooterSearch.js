import React from "react";

const FooterSearch = () => {
    return(
        <footer className="text-center text-lg-start text-muted mt-5 border-top">
            <section
                className="d-flex justify-content-center justify-content-lg-between p-3 border-bottom">
                <div className="me-5 d-none d-lg-block blockquote">
                    <span>Get connected with us on social networks:</span>
                </div>

                <div>
                    <a href="https://www.facebook.com/profile.php?id=100075734144558" className="me-4 text-reset mr-3">
                        <i className="fab fa-facebook-f fa-2x"/>
                    </a>
                    <a href="mailto:propositumtop@gmail.com" className="me-4 text-reset mr-3">
                        <i className="fab fa-google fa-2x"/>
                    </a>
                    <a href="https://t.me/findneighbour" className="me-4 text-reset mr-3">
                        <i className="fab fa-telegram-plane fa-2x"/>
                    </a>
                </div>
            </section>


            <div className="text-center p-5 lead" >
                2021 IoT © Made By Propositum
            </div>
        </footer>
    );
}

export default FooterSearch;
