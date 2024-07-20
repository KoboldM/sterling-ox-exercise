'use client'

export default function Button(props) {
    console.log('#### props', props)
    return(
        <div
            className='hover:cursor-pointer'
            onClick={() => props.onClick()}>
                {props.text}
        </div>
    )
}