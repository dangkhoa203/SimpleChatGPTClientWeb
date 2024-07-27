import { useEffect, useState, useRef } from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap-icons/font/bootstrap-icons.css'
function App() {

    const history = JSON.parse(localStorage.getItem("History"))
    const [message, setMessage] = useState([]);
    const [prompt, setPrompt] = useState("");
    const [btnstate, setBtn] = useState(false)
    const [modalstate, setModalstate] = useState(false)
    const messagesEndRef = useRef(null)
    useEffect(() => {
        if (history !== null) {
            setMessage(history)
        }
        document.body.addEventListener("pointermove", (e) => {
            const { currentTarget: el, clientX: x, clientY: y } = e;
            const { top: t, left: l, width: w, height: h } = el.getBoundingClientRect();
            el.style.setProperty('--posX', x - l - w / 2);
            el.style.setProperty('--posY', y - t - h / 2);
        })
    }, [])
    useEffect(() => {
        if (message.length !== 0) {
            localStorage.setItem("History", JSON.stringify(message))
        }
        handleScrollToBottom()
    }, [message])
    const changePrompt = (e) => {
        setPrompt(e.target.value)
    }
    const clear = () => {
        setMessage([])
        localStorage.clear()
        setModalstate(false)
    }
    const enter = (e) => {
        if (e.key === 'Enter' && btnstate === false) {
            SendChat()
        }
    }
    const handleScrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
    };

    return (
        <>
            <div className='background'></div>
            <p className='intro text-center'>Simple ChatGPT client</p>
            <div className='chatWrapper'>
                <div className='chatContainer'>
                    {
                        message.map((c, i) =>
                            <>
                                <div key={i}>
                                    <pre className=' text-primary'>({new Date(c.timeOfPrompt).toLocaleString('En-GB', { hour12: false })}) User: {c.prompt}</pre>
                                    <pre className=' text-success'>({new Date(c.timeOfMessage).toLocaleString('En-GB', { hour12: false })}) Bot: {c.message}</pre>
                                </div>
                            </>
                        )}
                    <div ref={messagesEndRef} />
                </div>
            </div>
            <div className='container-fluid d-flex gap-3 p-0 flex-column mt-3  m-0'>
                <input className='rounded-pill text-warning' placeholder='Enter your prompt here' onKeyDown={enter} value={prompt} type="text" onChange={changePrompt} />
                <div className='d-flex justify-content-end gap-3'>
                    <a className='btn btn-danger w-50' onClick={() => { setModalstate(true) }}> <p className='acttext'>Clear history</p> </a>
                    <a className={'btn btn-success w-50 ' + (btnstate ? "disabled" : "")} onClick={SendChat} disabled={btnstate}> <p className='acttext'>{btnstate ? <>
                        <span className="spinner-grow spinner-grow-sm ms-1" role="status" aria-hidden="true"></span>
                        <span className="spinner-grow spinner-grow-sm ms-1" role="status" aria-hidden="true"></span>
                        <span className="spinner-grow spinner-grow-sm ms-1" role="status" aria-hidden="true"></span>
                        <span className='ms-1'>Loading...</span>
                    </> : "Send prompt"} </p> </a>
                </div>
            </div>


            <div className={'modalpanel ' + (modalstate ? "modal-active" : "")}>
                <div className='modalpanel-content  bg-warning m-auto d-flex justify-content-between flex-column'>
                    <div className='container-fluid d-flex justify-content-end'>
                        <a className='link-dark' onClick={() => { setModalstate(false) }}><i className="bi bi-x-lg"></i></a>
                    </div>
                    <div className='modalpanel-content-text p-3'>
                        Are you sure you want to delete your chat log ?
                    </div>
                    <div className='align-bottom d-flex gap-3 justify-content-end p-2'>
                        <button className='btn btn-light w-50 ' onClick={() => { setModalstate(false) }}>Back</button>
                        <button className='btn btn-danger w-50' onClick={clear}>Clear</button>
                    </div>
                </div>
            </div>

        </>
    );

    async function SendChat() {
        if (prompt.length == 0) {
            alert("Please enter your prompt!")
            return false
        }
        try {

            setBtn(true)
            const response = await fetch('api/ChatAPI/chat', {
                method: "POST",
                body: JSON.stringify({ prompt }),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const data = await response.json();
            setMessage(c => c = [...message, data])
            console.log(data)
            setPrompt("")

        } catch (error) {

        } finally {
            setBtn(false)
        }
    }
}

export default App;