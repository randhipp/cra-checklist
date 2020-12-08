import React, { useState } from "react";
import ky from "ky";
import { getToken } from "../../Utils/Common";
import Pagination from "react-js-pagination";

const NewsCard = (props) => {
	return (
		<div style={{ padding: '20' }}>
			<a href={props.url}>
				{props.description}
			</a>
		</div>
	);
};

function GetChecklists(props) {
    const [checklists, setChecklists] = useState([]);
    const [dataCount, setdataCount] = useState(0); 
    const [pageCount, setpageCount] = useState(0); 
    const [isLoaded, setisLoaded] = useState(false);
    const [currentPage, setcurrentPage] = useState(1);

    const headers = {
        authorization: "Bearer " + getToken(),
    };

    const handlePageChange = (pageNumber) => {
        console.log(`active page is ${pageNumber}`);
        setcurrentPage(pageNumber);
        setisLoaded(false)
        // handleFetch();
    }   

    let URL = `https://checklists.wafvel.com/api/v1/checklists?page=${currentPage}&page_limit=10`;

    async function handleFetch() {
        try {
            setisLoaded(true);
            let result = await ky.get(URL, {headers: headers}).json();
            setChecklists(result.data);
            setdataCount(result.meta.total);
            setpageCount(result.meta.total/10);
        } catch (error) {
            setChecklists([]);
            setisLoaded(true);
        }       
    }

    const loadData = () => {
        setisLoaded(true);
        handleFetch();
    }

    // if(!isLoaded && currentPage === 1){
    //     handleFetch();
    //     setisLoaded(true);
    // }
    
    return (
        <div>
           <label>Checklist</label>

			{isLoaded ? (
				checklists.map((checklist) => {
					return (
						<NewsCard
                            url={checklist.links.self}
                            description={checklist.attributes.description}
							key={checklist.id}
						/>
					);
				})
			) : loadData()}    
                       
			{isLoaded ? (
				<Pagination
                activePage={currentPage}
                itemsCountPerPage={10}
                totalItemsCount={dataCount}
                pageRangeDisplayed={3}
                onChange={handlePageChange}
              />
			) : <div></div>
            } 
        </div>
      );
}

export default GetChecklists;
