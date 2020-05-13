import React from 'react';
import style from './CommentsCard.module.css'


const CommentsCard = ({inputCommentText, inputAuthor, commentSubmit, toggleComment}) => {
    return (
        <div>
            <form className="form-comment">
            <input type="text" placeholder="Author" name="author" className={style.author} onChange={inputAuthor}></input>
            <input type="text" placeholder="Input text" name='comment' className={style.infoText} onChange={inputCommentText}></input>
            <div className="elements-area">
            <button onClick={toggleComment}>Закрити</button>
            <button  onClick={commentSubmit}>Відправити</button>
            </div>
            </form>          
        </div>
    );
};

export default CommentsCard;