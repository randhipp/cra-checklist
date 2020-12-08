import React, { useState, useEffect } from "react";
import ky from "ky";
import { getToken } from "../../Utils/Common";
import Pagination from "react-js-pagination";
import Loader from "react-loader-spinner";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Table from "react-bootstrap/Table";

import Card from "react-bootstrap/Card";
import { CustomModal } from "./customModal";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";

function GetChecklists(props) {
  const [checklists, setChecklists] = useState([]);
  const [dataCount, setdataCount] = useState(0);
  const [pageCount, setpageCount] = useState(0);
  const [isLoaded, setisLoaded] = useState(false);
  const [currentPage, setcurrentPage] = useState(1);

  const handlePageChange = (pageNumber) => {
    setisLoaded(false);
    setcurrentPage(pageNumber);
  };

  async function fetchData(currentPage) {
    const headers = {
        authorization: "Bearer " + getToken(),
      };
  
      let URL = `https://checklists.wafvel.com/api/v1/checklists?page=${currentPage}&page_limit=10&include=items`;
    try {
      let result = await ky.get(URL, { headers: headers }).json();
      console.log(result.data);
      setChecklists(result.data);
      setdataCount(result.meta.total);
      setpageCount(result.meta.total / 10);
      setisLoaded(true);
    } catch (error) {
      setChecklists([]);
      setisLoaded(true);
    }
  }

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage]);

  return isLoaded ? (
    <div>
      <Card.Title>
        Checklist <small>Page Count : {Math.ceil(pageCount)}</small>
      </Card.Title>
      <br></br>
      <Pagination
        activePage={currentPage}
        itemsCountPerPage={10}
        totalItemsCount={dataCount}
        pageRangeDisplayed={3}
        onChange={handlePageChange}
        itemClass="page-item"
        linkClass="page-link"
      />

      <Table bordered hover>
        <thead>
          <tr>
            <th>Description</th>
            <th>Urgency</th>
            <th>Items</th>
          </tr>
        </thead>
        <tbody>
          {checklists.map((checklist) => {
            return (
              <CustomModal
                data={checklist}
                url={checklist.links.self}
                description={checklist.attributes.description}
                urgency={checklist.attributes.urgency}
                items={checklist.attributes.items}
                key={checklist.id}
              />
            );
          })}
        </tbody>
      </Table>
    </div>
  ) : (
    <Container fluid>
      <Row className="align-items-center">
        <Col>
          <Loader
            type="ThreeDots"
            color="#00BFFF"
            height={100}
            width={100}
            timeout={2000} // 2 secs
          />
        </Col>
      </Row>
    </Container>
  );
}

export default GetChecklists;
