import { SET_PROJECT_DATA } from "../../actionTypes";

export const handleSearchType = (getData, search, setSearchResult, setUpcoming) => {
    getData = getData.filter(item => Object.values(item).join(" ").toLowerCase().includes(search.toLowerCase()))
    if (getData.length > 0) {
        setSearchResult(getData)
    } else {
        return 'Sorry your project not found!';
    }
    setUpcoming(getData)
    return getData;
}
const changeForwardSlashToComma = (date) => {
    // const newDate = new Date()
    // console.log('line 14', date)
    let month = date.split('/')[0];
    let day = date.split('/')[1];
    let year = date.split('/')[2];
    return new Date(`${month}, ${day}, ${year}`)
    // 
}
const millisecondToDate = (date) => {
    return (new Date(date).toLocaleDateString())
}
export const handleSearchByDate = (getData, startDate, endDate, setUpcoming) => {
    getData.filter(item => {
        if (changeForwardSlashToComma(startDate) <= changeForwardSlashToComma(millisecondToDate(item.launchDate * 1000)) && changeForwardSlashToComma(endDate) >= changeForwardSlashToComma(millisecondToDate(item.launchDate * 1000))) {
            console.log('Line 29', item)
        }
    })


    getData = getData.filter(item => changeForwardSlashToComma(startDate) <= changeForwardSlashToComma(millisecondToDate(item.launchDate * 1000)) && changeForwardSlashToComma(endDate) >= changeForwardSlashToComma(millisecondToDate(item.launchDate * 1000)))

    if (getData.length > 0) {
        setUpcoming(getData)
    } else {
        // dispatch({ type: SET_PROJECT_DATA, payload: getData })
        // return 'Sorry your project not found!';
    }
    setUpcoming(getData)

    return getData;
}

export const handleSearchByPegged = (getData, forkValue, setUpcoming) => {
    console.log('Line 47', getData.filter(item => item.fork === forkValue))


    getData = getData.filter(item => item.fork === forkValue)

    if (getData.length > 0) {
        setUpcoming(getData)
    } else {
        // dispatch({ type: SET_PROJECT_DATA, payload: getData })
        // return 'Sorry your project not found!';
    }
    setUpcoming(getData)

    return getData;
}

export const handleSearchByNetwork = (getData, networkValue, setUpcoming) => {
    console.log('Line 64', getData.filter(item => item.network === networkValue))


    getData = getData.filter(item => item.network === networkValue)

    if (getData.length > 0) {
        setUpcoming(getData)
    } else {
        // dispatch({ type: SET_PROJECT_DATA, payload: getData })
        // return 'Sorry your project not found!';
    }
    setUpcoming(getData)

    return getData;
}

export const today = (type) => {
    var today = new Date();
    var dd = String(type === 'end' ? today.getDate() : today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0');
    var yyyy = today.getFullYear();

    today = mm + '/' + dd + '/' + yyyy;
    return (today)

}