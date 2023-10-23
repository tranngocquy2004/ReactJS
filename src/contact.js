import React, { useState } from 'react'
import './contact.css'
import { useAuth0 } from "@auth0/auth0-react";
const Contact = () => {
    const { loginWithRedirect, logout, user, isAuthenticated} = useAuth0();
    const [users, setUser] = useState(
        {
            Name: '', Email: '', Subject: '', Message: ''
        }
    )
    let name, value
    const data = (e) => 
    {
        name = e.target.name;
        value = e.target.value;
        setUser({...users, [name]: value})
    }
    const senddata = async (e) => 
    {
        const{ Name, Email, Subject, Message} = users
        e.preventDefault();
        const options = {
            method: 'POST',
            headers: {
                'Content-Type' : 'aplication/json'
            },
            body: JSON.stringify({
                Name, Email, Subject, Message
            })
        }
        const res = await fetch('https://e-commerce-contact-ba862-default-rtdb.firebaseio.com/Message.json', options)
        console.log(res)
        if(res)
        {
            alert("Cảm ơn bạn đã gửi khiếu nại")
        }
        else
        {
            alert("Đã xảy ra lỗi")
        }
    }
  return (
    <>
    <div className='contact_container'>
        <div className='contant'>
            <h2># Liên hệ với chúng tôi</h2>
            <div className='form'>
                <form method='POST'>
                    <input type='text' name='Name' value={users.Name} placeholder='Họ và tên' required autoComplete='off' onChange={data}></input>
                    <input type='email' name='Email' value={users.Email} placeholder='Email'  autoComplete='off' onChange={data}></input>
                    <input type='text' name='Subject' value={users.Subject} placeholder='Chủ đề của bạn'  autoComplete='off' onChange={data}></input>
                    <textarea name='Message' value={users.Message} placeholder='Tin nhắn'  autoComplete='off' onChange={data}></textarea>
                    {
                        isAuthenticated ? 
                        <button type='submit' onClick={senddata}>Gửi</button>
                        : <button type='submit' onClick={() => loginWithRedirect()}>Đăng nhập để gửi</button>
                    }
                </form>
            </div>
        </div>
    </div>
    </>
  )
}

export default Contact