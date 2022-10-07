import { useState } from "react";

function ImgContent({ img }){

    let [imgPreview, setImg ] = useState(img);
    let [ count, setCount ] = useState(0);

    const previewAftter = () => {
        if(count > 0){
            setCount(--count);  
        }
    };
    const previewBefore = () => {
        if(count < img.length - 1){
            setCount(++count);
        }
    };

    return(
        <div className="product-imgContent">
            <img className="product-img" src={imgPreview[count] } alt="" />
            <div className='product-bthChangeContain'>
                <button className="product-btnChangeImg" onClick={ previewAftter } >{'<'}</button>
                <button className="product-btnChangeImg" onClick={ previewBefore } >{'>'}</button>
            </div>
            <div className="product-imgContent-imgs">
                {
                    img.map((img , i) => (
                        <img src={ img  } alt="" className="product-imgPreview" 
                        style={i === count ? { border: 'solid 2px #ff5b4f' } : { border: 'solid 1px #062a5a' }}   onClick={ () =>{ console.log(i); setCount(count = i)} }  key={ `Em$${Math.random()}`  } />
                    ))
                }
            </div>
        </div>
    );
}

export default ImgContent;