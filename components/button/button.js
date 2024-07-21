'use client'

export default function Button(props) {
    // console.log('#### props', props)
    return(
        <button
            {...props}
            className='hover:cursor-pointer'
            >
                {console.log(props)}
                {props.text}
        </button>
    )
}