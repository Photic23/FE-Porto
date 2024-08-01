import React from 'react';
import Button from '../components/Button';
import EmailForm from '../components/EmailForm';

function Contact({isSmall}) {

    const [mailForm, setMailForm] = React.useState(false);

    function toggleMail(){
        setMailForm(prevMailForm => !prevMailForm);
    };

    function dummyFunc() {
        
    };

    if(isSmall){
        return(
            <>
                <div class="bg-transparent h-svh w-full px-8 py-8">
                    <div class="h-full w-full flex items-center justify-center rounded border-2 border-black px-1 py-1 bg-[#B5DFCA]">
                        <div className='flex w-full items-center justify-center'>
                            {!mailForm && (
                                <div className='flex flex-col h-72 w-3/4 md:w-1/2 lg:w-1/4 items-start justify-evenly mr-5'>
                                    <div className='w-full border-b-4 border-black'>
                                        <h1 className='text-5xl font-bold' >Contact Me!</h1>
                                    </div>
                                    <div className='w-full items-center'>
                                        <Button href={"#"} text={'E-Mail'} japText={'メール'} passFunc={toggleMail} isActive={mailForm}></Button>
                                        <Button target={"_blank"} href={"https://wa.me/+6281907398637"} text={'Whatsapp'} japText={'ワッツアップ'} passFunc={dummyFunc} isMail={false}></Button>
                                        <Button target={"_blank"} href={"https://www.instagram.com/photic___/"} text={'Instagram'} japText={'インスタグラム'} passFunc={dummyFunc} isMail={false}></Button>
                                        <Button href={"#"} text={'Twitter'} japText={'ツイッター'} passFunc={dummyFunc} isMail={false}></Button>                                    
                                    </div>
                                </div>
                            )}
                            {mailForm && (
                                <EmailForm isActive={mailForm} closeFunc={toggleMail}></EmailForm>
                            )}
                            
                        </div>
                  
                    </div>
                </div>          
            </>
        );
    }else{
        return(
            <>
                <div class="bg-transparent h-svh w-full px-8 py-8">
                    <div class="h-full w-full flex items-center justify-center rounded border-2 border-black px-1 py-1 bg-[#B5DFCA]">
                        <div className='flex w-full items-center justify-center'>
                            <div className='flex flex-col h-72 w-1/4 items-start justify-evenly mr-5'>
                                <div className='w-full border-b-4 border-black'>
                                    <h1 className='text-5xl font-bold' >Contact Me!</h1>
                                </div>
                                <div className='w-full items-center'>
                                    <Button href={"#"} text={'E-Mail'} japText={'メール'} passFunc={toggleMail} isActive={mailForm}></Button>
                                    <Button target={"_blank"} href={"https://wa.me/+6281907398637"} text={'Whatsapp'} japText={'ワッツアップ'} passFunc={dummyFunc} isMail={false}></Button>
                                    <Button target={"_blank"} href={"https://www.instagram.com/photic___/"} text={'Instagram'} japText={'インスタグラム'} passFunc={dummyFunc} isMail={false}></Button>
                                    <Button href={"#"} text={'Twitter'} japText={'ツイッター'} passFunc={dummyFunc} isMail={false}></Button>                                    
                                </div>
                            </div>
                            <EmailForm isActive={mailForm} closeFunc={toggleMail}></EmailForm>
                        </div>
                  
                    </div>
                </div>            
            </>
        );
    }

}

export default Contact;