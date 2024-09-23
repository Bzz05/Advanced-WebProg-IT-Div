import React, { useState } from 'react';
import './SupportPage.css';
import { Link } from 'react-router-dom';

const SupportTicketForm: React.FC = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [helpTopic, setHelpTopic] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [ticketNum, setTicketNum] = useState<string>('');

  const sub = () => {
    setIsSubmitted(true);
    const ticket = (Math.floor(Math.random() * 10000) + 1);
    const formattedTicketNum = ticket.toString().padStart(4, '0');
    setTicketNum(formattedTicketNum);
  }

  const check = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return firstName && lastName && emailRegex.test(email) && helpTopic; 
  };

  return (
    <>
      {!isSubmitted? (
      <div className="container">
        <div className = "top">
          <h1>Support Ticket Form</h1>
        </div>
        <div className ="mid">
          <div className="left">
            <div className="left-top">
              <p className="label">Name <span className="required">*</span></p>
              <div className="half-box">
                <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                <span className="sub-label">First</span>
              </div>
              <div className="half-box">
                <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)}/>
                <span className="sub-label">Last</span>
              </div>
            </div>
            <div className="left-mid">
            <p className="label">Email <span className="required">*</span></p>
              <div className="email-box">
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)}/>
              </div>
            </div>
            <div className="left-bot">
            <p className="label">Topic <span className="required">*</span></p>
              <div className="dotted-box">
                <p>What can we help with today?</p>
                <label>
                  <input type="radio" name="helpTopic" value="General" onChange={() => setHelpTopic("General")}/>
                  General
                </label>
                <label>
                  <input type="radio" name="helpTopic" value="Bug" onChange={() => setHelpTopic("Bug")}/>
                  Bug
                </label>
              </div>
            </div>
          </div>
          <div className="right">
            <div className ="container2">
              <p className="description">Description</p>
              <p className="optional">optional</p>
            </div>
            <textarea className="description-box" placeholder="Description report"></textarea>
          </div>
        </div>
        <div className = "bot">
          <button className={`submit-btn ${check() ? 'orange-bg' : 'gray-bg'}`} disabled={!check()} type = "submit" onClick={sub}>
              SEND
            </button>
          </div>        
        </div>
    ): (
      <div className="container">
          <div className = "top">
            <h1>Support Ticket Form</h1>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '89%', textAlign: 'center'}}>
            <p style={{fontWeight: 'bold', color:'orange', fontSize: '40px', wordWrap: 'break-word'}}>Thank you for sending us your report, we will track the problem now</p>
            <p style={{color: 'gray', fontWeight: 'bold'}}>ticket number: <span style={{color: 'white'}}>{ticketNum}</span></p>
            <button style={{backgroundColor: 'orange', height: '50px',width: '100px', borderRadius: '25px', border: 'none', fontWeight: 'bold'}}><Link to = "/" className="link-btn">BACK</Link></button>
          </div>     
      </div>
    )}
    </>
  );
};

export default SupportTicketForm;
