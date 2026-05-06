import React from 'react'
import { Link } from 'react-router'
import '../footer.scss'

const Footer = () => {
    const currentYear = new Date().getFullYear()
    
    return (
        <footer className="footer">
            <div className="footer-top">
                <div className="footer-brand">
                    <Link to="/" className="brand-logo">
                        <span className="logo-icon">◆</span>
                        <span className="brand-name">InterviewAI</span>
                    </Link>
                    <p className="brand-description">Professional interview preparation powered by AI.</p>
                </div>

                <div className="footer-links">
                    <div className="links-group">
                        <h5>Resources</h5>
                        <ul>
                            <li><Link to="#">Help Center</Link></li>
                            <li><Link to="#">Documentation</Link></li>
                            <li><Link to="#">Blog</Link></li>
                        </ul>
                    </div>

                    <div className="links-group">
                        <h5>Company</h5>
                        <ul>
                            <li><Link to="#">About</Link></li>
                            <li><Link to="#">Support</Link></li>
                            <li><Link to="#">Contact</Link></li>
                        </ul>
                    </div>
                </div>
            </div>

            <div className="footer-bottom">
                <p className="copyright">&copy; {currentYear} InterviewAI. All rights reserved.</p>
                <div className="legal-links">
                    <Link to="#">Privacy Policy</Link>
                    <Link to="#">Terms of Service</Link>
                    <Link to="#">Cookie Policy</Link>
                </div>
            </div>
        </footer>
    )
}

export default Footer
