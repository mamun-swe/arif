 const MenuArrow = (props) => {
    return(
        <svg stroke="currentColor" style={{fontColor:props.color, transform: props.rotation}} className="arrow ml-auto arrow" fill="none" strokeWidth="2" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round"  height="1em" width="1em" xmlns="http://www.w3.org/2000/svg">
            <polyline points="9 18 15 12 9 6">
            </polyline>
        </svg>
    )
}
export default MenuArrow
