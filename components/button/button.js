'use client'

export default function Button(props) {
    return(
        <button
            {...props}
            className='hover:cursor-pointer'
            >
                {/* {console.log(props)} */}
                {props.text}
        </button>
    )
}