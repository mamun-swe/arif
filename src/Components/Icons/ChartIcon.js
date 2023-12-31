 const ChartIcon = (props) => {
    return(
        <svg stroke="currentColor" style={{color:props.color}} fill="currentColor" strokeWidth="0" viewBox="0 0 16 16" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
            <path d="M0 0h1v16H0V0zm1 15h15v1H1v-1z"></path>
            <path fillRule="evenodd" d="M14.39 4.312L10.041 9.75 7 6.707l-3.646 3.647-.708-.708L7 5.293 9.959 8.25l3.65-4.563.781.624z" clipRule="evenodd"></path>
            <path fillRule="evenodd" d="M10 3.5a.5.5 0 01.5-.5h4a.5.5 0 01.5.5v4a.5.5 0 01-1 0V4h-3.5a.5.5 0 01-.5-.5z" clipRule="evenodd"></path>
        </svg>
    )
}
export default ChartIcon
