import React from 'react';
import Button from './Button';
import emailjs from 'emailjs-com';
import EmailButton from './EmailButton';

function EmailForm({isActive, closeFunc}) {
    
    function sendEmail(e) {
        e.preventDefault();    
    
        emailjs.sendForm('service_vz9u1yn', 'template_b9w3nl5', e.target, '59a33wolidn06SCU1')
          .then((result) => {
              window.location.reload()  //This is if you still want the page to reload (since e.preventDefault() cancelled that behavior) 
          }, (error) => {
              console.log(error.text);
          });
      }
    
    function submitMail(e) {
        sendEmail(e);
        closeFunc();
    }

    if(isActive){
        return(
            <form className='flex flex-col h-72 w-3/4 md:w-1/2 lg:w-1/4 items-center justify-evenly ' onSubmit={submitMail}>
                <div className='flex flex-col h-72 w-full items-center justify-evenly '>
                    <div className='w-full'>
                        <label htmlFor="email" className='font-semibold' >E-Mail Address</label>
                        <input name='from_email' className='h-fit bg-slate-100 w-full flex items-center justify-center rounded border-2 border-black px-1 py-1' type="email" id='email' placeholder='Enter Your E-Mail Here' />
                    </div>
                    <div className='w-full'>
                        <label htmlFor="subject" className='font-semibold'>Subject</label>
                        <input name='subject' className='h-fit bg-slate-100 w-full flex items-center justify-center rounded border-2 border-black px-1 py-1' type="text" id='subject' placeholder='Enter Your Subject Here'/>
                    </div>
                    <div className='w-full'>
                        <label htmlFor="content" className='font-semibold'>Content</label>
                        <input name='content' className='h-24 bg-slate-100 w-full flex items-center justify-center rounded border-2 border-black px-1 py-1' type="text" id='content' placeholder='Enter Your Content Here'/>
                    </div>
                    <div className='flex flex-row w-full items-center justify-center'>
                        <div className='w-1/2 ml-1'>
                            <Button href={"#"} text={'Close'} japText={'閉じる'} passFunc={closeFunc}></Button> 
                        </div>
                        <div className='w-1/2 ml-1'>
                            <EmailButton text={'Submit'} japText={'差し出す'}></EmailButton>
                        </div>
                    </div>
                </div>
            </form>
        );
    }else{
        return(
            <>
            </>
        );
    }
}

export default EmailForm; 